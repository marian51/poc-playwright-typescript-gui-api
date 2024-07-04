import { test } from "@playwright/test";
import { ExpandableTopBarPage } from "../../page-objects/expandableTopBar";
import { CreateTaskModalPage } from "../../page-objects/modals/createTaskModal";
import { ProjectMainView } from "../../page-objects/projectMainView";
import { TaskConextMenu } from "../../page-objects/context-menus/taskContextMenu";
import { EditTaskModal } from "../../page-objects/modals/editTaskModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";

test.describe(
  "Tasks feature tests",
  {
    tag: "@task",
  },
  () => {
    let projectMainView: ProjectMainView;
    let setupListId: string;

    const taskName = faker.word.verb();
    const changedTaskName = faker.word.noun();
    const taskDescription = faker.lorem.sentence();

    test.beforeAll("Create a Space with one List", async ({ request }) => {
      // TODO: dictionary
      const spaceName = "SETUP_SPACE";
      const listName = "SETUP_LIST";
      await ApiHooks.createSpaceByName(request, spaceName);
      const response = await ApiHooks.createFolderlessList(request, spaceName, listName);
      const responseJson = await response.json();

      console.log(responseJson); // TODO: remove

      setupListId = responseJson.id;
    });

    test.afterAll("Remove the setup Space", async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, "SETUP_SPACE");
    });

    test.beforeEach("Navigate to setup list", async ({ page }) => {
      projectMainView = new ProjectMainView(page);
      await page.goto("/");
      await page.locator('[data-test="views-dashboard-nux-modal__skip"]').click();
      await page.getByTestId("project-list-bar-item__link__SETUP_SPACE").getByRole("link", { name: "SETUP_SPACE" }).click();
      await page.getByRole("link", { name: "SETUP_LIST" }).click();
    });

    test("Create new task", async ({ page, request }) => {
      const expandableTopBarPage = new ExpandableTopBarPage(page);
      const createTaskModalPage = new CreateTaskModalPage(page);

      await expandableTopBarPage.clickAddTaskButton();
      await createTaskModalPage.fillTaskNameField(taskName);
      await createTaskModalPage.fillDescriptionField(taskDescription);
      await createTaskModalPage.clickCreateTaskButton();

      await projectMainView.assertTaskIsVisible(taskName);
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
