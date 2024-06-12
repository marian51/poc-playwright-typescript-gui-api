import { Locator, Page } from "@playwright/test";

export class ExpandableTopBarPage {
  readonly page: Page;
  readonly addTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTaskButton = page.locator('[data-test=create-task-menu__new-task-button][cu3-size=small]');
  }

  async clickAddTaskButton() {
    this.addTaskButton.click();
  }
}