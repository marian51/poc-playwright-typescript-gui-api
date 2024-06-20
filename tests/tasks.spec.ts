import { test } from "@playwright/test";
import { ExpandableTopBarPage } from "../page-objects/expandableTopBar";
import { CreateTaskModalPage } from "../page-objects/modals/createTaskModal";
import { ProjectMainView } from "../page-objects/projectMainView";
import { TaskConextMenu } from "../page-objects/context-menus/taskContextMenu";
import { EditTaskModal } from "../page-objects/modals/editTaskModal";
import { ApiHooks } from "../api-utils/apiHooks";
import { faker } from "@faker-js/faker";

test.describe(
  "Tasks feature tests",
  {
    tag: "@task",
  },
  () => {
    const taskName = faker.word.verb();
    const changedTaskName = faker.word.noun();
    const taskDescription = faker.lorem.sentence();

    test("Create new task", async ({ page, request }) => {
      await page.goto("/");

      const expandableTopBarPage = new ExpandableTopBarPage(page);
      const createTaskModalPage = new CreateTaskModalPage(page);
      const projectMainView = new ProjectMainView(page);

      await expandableTopBarPage.clickAddTaskButton();
      await createTaskModalPage.fillTaskNameField(taskName);
      await createTaskModalPage.fillDescriptionField(taskDescription);
      await createTaskModalPage.clickCreateTaskButton();

      await projectMainView.assertTaskIsVisible(taskName);
      await ApiHooks.deleteTask(request, taskName);
    });

    test.describe("Editing existing tasks", () => {
      test.beforeEach(async ({ page, request }) => {
        await ApiHooks.createNewTask(request, taskName);
        await page.goto("/");
      });

      test.afterEach(async ({ request }) => {
        await ApiHooks.deleteTask(request, taskName);
        await ApiHooks.deleteTask(request, changedTaskName);
      });

      test("Change task status to in progress", async ({ page }) => {
        const projectMainView = new ProjectMainView(page);
        const editTaskModal = new EditTaskModal(page);

        await projectMainView.openTaskModal(taskName);
        await editTaskModal.changeTaskStatusToInProgress();
        await editTaskModal.close();

        await projectMainView.assertTaskIsInProgress(taskName);
      });

      test("Change task name", async ({ page }) => {
        const projectMainView = new ProjectMainView(page);
        const editTaskModal = new EditTaskModal(page);

        await projectMainView.openTaskModal(taskName);
        await editTaskModal.changeTaskName(taskName);
        await editTaskModal.close();

        await projectMainView.assertTaskIsVisible(taskName);
      });
    });

    test("Delete a task", async ({ page, request }) => {
      await ApiHooks.createNewTask(request, taskName);
      await page.goto("/");

      const projectMainView = new ProjectMainView(page);
      const taskContextMenuButton = new TaskConextMenu(page);

      await projectMainView.openTaskContextMenu(taskName);
      await taskContextMenuButton.clickDeleteButton();

      await projectMainView.assertTaskIsNotVisible(taskName);
    });
  }
);
