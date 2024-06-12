import { Locator, Page } from "@playwright/test";

export class CreateTaskModalPage {
  readonly page: Page;
  readonly taskNameField: Locator;
  readonly taskDescriptionField: Locator;
  readonly createTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskNameField = page.locator('[data-test="draft-view__title-task"]');
    this.taskDescriptionField = page.locator('.ql-editor');
    this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
  }

  async fillTaskNameField(taskName: string) {
    await this.taskNameField.fill(taskName);
  }

  async fillDescriptionField(taskDescription: string) {
    await this.taskDescriptionField.fill(taskDescription);
  }

  async clickCreateTaskButton() {
    await this.createTaskButton.click();
  }
}