import test, { Page } from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import tasks from "../../resources/tasks-import.json";
import { ApiHooks } from "../../api-utils/apiHooks";
import { ProjectMainView } from "../../page-objects/projectMainView";

let leftMenu: LeftMenu;
let projectMainView: ProjectMainView;

let page: Page;

test.describe(
  "UI tests for checking if sorting list works correct",
  {
    tag: ["@list", "@sorting"],
    annotation: {
      type: "issue",
      description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/85",
    },
  },
  async () => {
    test.beforeAll(async ({ browser, request }) => {
      page = await browser.newPage();
      for (const task of tasks) {
        await ApiHooks.createNewTaskWithData(request, task);
        console.log("Created task: " + task.name)
      }
    });

    [
      { key: "Due date", direction: "Ascending" },
      { key: "Due date", direction: "Descending" },
      { key: "Priority", direction: "Ascending" },
      { key: "Priority", direction: "Descending" },
      { key: "Task Name", direction: "Ascending" },
      { key: "Task Name", direction: "Descending" },
    ].forEach(({ key, direction }) => {
      test(`Test of sorting tasks list by '${key}' column in '${direction}' direction`, async () => {
        leftMenu = new LeftMenu(page);
        projectMainView = new ProjectMainView(page);

        await page.goto("/");
        await page.locator("cu-web-push-notification-banner").waitFor();

        await leftMenu.clickOnElement("Project 1");
        await projectMainView.sortListBy(key, direction);
        await projectMainView.assertTasksOrder(key, direction);
      });
    });

    test.afterAll(async () => {
      await projectMainView.deleteAllTasks();
    });
  }
);
