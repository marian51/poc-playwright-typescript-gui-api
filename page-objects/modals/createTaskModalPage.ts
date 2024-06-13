import { Locator, Page } from "@playwright/test";

export class CreateTaskModalPage {
  readonly page: Page;
  readonly modalDialog: Locator;
  readonly taskNameField: Locator;
  readonly addDescriptionButton: Locator;
  readonly taskDescriptionField: Locator;
  readonly createTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalDialog = page.locator('[data-test="modal__dialog"]');
    this.taskNameField = page.locator('[data-test="draft-view__title-task"]');
    this.addDescriptionButton = page.locator('[data-test="dropdown-list-item__blank"]');
    this.taskDescriptionField = page.locator('.ql-editor');
    this.createTaskButton = page.locator('[data-test="draft-view__quick-create-create"]');
  }

  async fillTaskNameField(taskName: string) {
    await this.taskNameField.waitFor();
    await this.taskNameField.fill(taskName);
  }

  async fillDescriptionField(taskDescription: string) {
    await this.addDescriptionButton.waitFor();
    await this.addDescriptionButton.click();
    
    await this.taskDescriptionField.waitFor();
    await this.taskDescriptionField.fill(taskDescription);
  }

  async clickCreateTaskButton() {
    await this.createTaskButton.waitFor();
    await this.createTaskButton.click();
  }
}