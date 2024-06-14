import { Locator, Page } from "@playwright/test";

export class EditTaskModal {
  private readonly page: Page;
  private readonly taskNameInput: Locator;
  private readonly taskStatusButton: Locator;
  private readonly statusInProgress: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskStatusButton = page.getByTestId("status-button-badge__body");
    this.statusInProgress = page.getByTestId("status-list__type__custom");
    this.closeButton = page.getByTestId("task-close-v3");
  }

  async changeTaskStatusToInProgress() {
    // TODO: handle multiple tasks with the same name
    await this.taskStatusButton.click();
    await this.statusInProgress.click();
  }

  async close() {
    await this.closeButton.click();
  }
}