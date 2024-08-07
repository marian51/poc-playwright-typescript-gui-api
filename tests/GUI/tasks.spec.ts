import { test } from "@playwright/test";
import { ExpandableTopBarPage } from "../../page-objects/expandableTopBar";
import { CreateTaskModalPage } from "../../page-objects/modals/createTaskModal";
import { ProjectMainView } from "../../page-objects/projectMainView";
import { TaskConextMenu } from "../../page-objects/context-menus/taskContextMenu";
import { EditTaskModal } from "../../page-objects/modals/editTaskModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";
import { LeftMenu } from "../../page-objects/leftMenu";
import { SETUP } from "../../resources/constants";

test.describe(
  "Tasks feature tests",
  {
    tag: "@task",
  },
  () => {
    let projectMainView: ProjectMainView;
    let leftMenu: LeftMenu;
    let setupListId: string;

    const taskName = faker.word.verb();
    const changedTaskName = faker.word.noun();
    const taskDescription = faker.lorem.sentence();

    test.beforeAll("Create a Space with one List", async ({ request }) => {
      await ApiHooks.createSpaceByName(request, SETUP.SPACE);
      const response = await ApiHooks.createFolderlessList(request, SETUP.SPACE, SETUP.LIST);
      const responseJson = await response.json();
      setupListId = responseJson.id;
    });

    test.afterAll("Remove the setup Space", async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, SETUP.SPACE);
    });

    test.beforeEach("Navigate to setup list", async ({ page }) => {
      projectMainView = new ProjectMainView(page);
      leftMenu = new LeftMenu(page);
      await page.goto("/");

      leftMenu.clickOnElement(SETUP.SPACE);
      leftMenu.clickOnElement(SETUP.LIST);
    });

    test("Create new task", async ({ page, request }) => {
      const expandableTopBarPage = new ExpandableTopBarPage(page);
      const createTaskModalPage = new CreateTaskModalPage(page);

      await projectMainView.waitForTaskList();
      await expandableTopBarPage.clickAddTaskButton();
      await createTaskModalPage.fillTaskNameField(taskName);
      await createTaskModalPage.fillDescriptionField(taskDescription);
      await createTaskModalPage.clickCreateTaskButton();

      await projectMainView.assertTaskIsVisible(taskName);

      await ApiHooks.deleteAllTasksFromList(request, setupListId);
    });

    test.describe("Editing existing tasks", () => {
      let editTaskModal: EditTaskModal;
      let taskId: string;

      test.beforeEach(async ({ page, request }) => {
        editTaskModal = new EditTaskModal(page);
        const response = await ApiHooks.createNewTask(request, taskName, setupListId);
        const responseJson = await response.json();
        taskId = responseJson.id;
      });

      test.afterEach(async ({ request }) => {
        await ApiHooks.deleteTaskById(request, taskId);
      });

      test("Mark task as completed", async () => {
        await projectMainView.openTaskModal(taskName);
        await editTaskModal.markTaskAsCompleted();
        await editTaskModal.close();

        await projectMainView.assertTaskIsNotVisible(taskName);
      });

      test("Change task name", async () => {
        await projectMainView.openTaskModal(taskName);
        await editTaskModal.changeTaskName(changedTaskName);
        await editTaskModal.close();

        await projectMainView.assertTaskIsVisible(changedTaskName);
      });
    });

    test("Delete a task", async ({ page, request }) => {
      await ApiHooks.createNewTask(request, taskName, setupListId);

      const taskContextMenuButton = new TaskConextMenu(page);

      await projectMainView.openTaskContextMenu(taskName);
      await taskContextMenuButton.clickDeleteButton();

      await projectMainView.assertTaskIsNotVisible(taskName);
    });
  }
);
