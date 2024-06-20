import { expect, test } from "@playwright/test";
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
    let taskName = faker.word.verb();
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

      await expect(await projectMainView.getElementByRole("link", taskName)).toBeVisible();

      await ApiHooks.deleteTask(request, taskName);
    });

    test.describe("Editing existing tasks", () => {
      test.beforeEach(async ({ page, request }) => {
        await ApiHooks.createNewTask(request, taskName);
        await page.goto("/");
      });

      test.afterEach(async ({ request }) => {
        await ApiHooks.deleteTask(request, taskName);
        // await ApiHooks.deleteTask(request, changedTaskName);
      });

      test("Change task status to in progress", async ({ page }) => {
        const projectMainView = new ProjectMainView(page);
        const editTaskModal = new EditTaskModal(page);

        await projectMainView.openTaskModal(taskName);
        await editTaskModal.changeTaskStatusToInProgress();
        await editTaskModal.close();

        const taskStatus = (await projectMainView.getElementByTestId("task-row__container__", taskName)).getByTestId("task-row-status__badge");
        await expect(taskStatus).toHaveText("in progress");
      });

      test("Change task name", async ({ page }) => {
        const projectMainView = new ProjectMainView(page);
        const editTaskModal = new EditTaskModal(page);

        await projectMainView.openTaskModal(taskName);
        taskName = changedTaskName;
        await editTaskModal.changeTaskName(taskName);
        await editTaskModal.close();

        await expect(await projectMainView.getElementByRole("link", taskName)).toBeVisible();
      });
    });

    test("Delete a task", async ({ page, request }) => {
      await ApiHooks.createNewTask(request, taskName);
      await page.goto("/");

      const projectMainView = new ProjectMainView(page);
      const taskContextMenuButton = new TaskConextMenu(page);

      await projectMainView.openTaskContextMenu(taskName);
      await taskContextMenuButton.clickDeleteButton();

      await expect(await projectMainView.getElementByRole("link", taskName)).toBeHidden();
    });
  }
);
