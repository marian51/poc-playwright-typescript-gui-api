import { Locator, Page } from "@playwright/test";

export class TaskConextMenu {
  readonly page: Page;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.getByTestId("quick-actions-menu__delete-task");
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }
}
