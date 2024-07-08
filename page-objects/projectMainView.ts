import { Locator, Page, expect } from "@playwright/test";
import tasksOrder from "../resources/tasks-order.json";

export class ProjectMainView {
  private readonly page: Page;
  private readonly dashboard: Locator;
  private readonly addTaskLineButton: Locator;
  private readonly dashboardToolbar: Locator;

  private expectedTask: Locator;
  private taskRowContainer: Locator;
  private taskContextMenuButton: Locator;
  private taskLink: Locator;
  private taskStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = page.getByTestId("dashboard-table-list-group__body");
    this.addTaskLineButton = this.dashboard.getByTestId("create-menu-task__inline");
    this.dashboardToolbar = this.page.locator("cu-dashboard-table-toolbar > div");
  }

  async openTaskModal(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId("task-row__container__" + taskName);
    this.taskLink = this.taskRowContainer.getByTestId("task-row-main__link");
    await this.taskLink.click();
  }

  async openTaskContextMenu(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId("task-row__container__" + taskName);
    this.taskContextMenuButton = this.taskRowContainer.getByTestId("task-row-menu__ellipsis-v3-button");
    await this.taskContextMenuButton.click();
  }

  async sortListBy(column: string, direction: string) {
    await this.addTaskLineButton.waitFor();

    const columnSelector = column === "Task Name" ? "task-list-header-field" : `task-list-header_column__${column}`;
    const columnHeader = this.dashboard.getByTestId(columnSelector);
    const sortButton = columnHeader.locator("use");
    await columnHeader.hover();
    await sortButton.click();
    if (!(await sortButton.getAttribute("href"))?.includes(direction)) await sortButton.click();

    await this.addTaskLineButton.waitFor();
  }

  async getTasksNames(): Promise<string[]> {
    const taskLinks = this.dashboard.getByTestId("task-row-main__link");
    return await taskLinks.allInnerTexts();
  }

  async deleteAllTasks() {
    await this.dashboard.locator("button.cu-task-list-header__row-toggle").click();
    await this.dashboardToolbar.getByTestId("dashboard-table-toolbar-delete-tasks").click();
  }

  async waitForTaskList(): Promise<void> {
    // Waits for the list to be ready to accept new input (placed as the last row in task list)
    await this.page.getByTestId("task-row-new__input").waitFor();
  }

  async assertTaskIsVisible(taskName: string) {
    this.expectedTask = this.dashboard.getByRole("link", { name: taskName });
    await expect(this.expectedTask).toBeVisible();
  }

  async assertTaskIsNotVisible(taskName: string) {
    this.expectedTask = this.dashboard.getByRole("link", { name: taskName });
    await this.expectedTask.waitFor({ state: "detached" });
    await expect(this.expectedTask).toBeHidden();
  }

  async assertTaskIsInProgress(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId("task-row__container__" + taskName);
    this.taskStatus = this.taskRowContainer.getByTestId("task-row-status__badge");

    // TODO: expected dictionary
    await expect(this.taskStatus).toHaveText("in progress");
  }

  async assertTasksOrder(column: string, direction: string) {
    expect.soft(await this.getTasksNames()).toMatchObject(tasksOrder[column][direction]);
  }
}
