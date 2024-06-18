import { Locator, Page } from "@playwright/test";

export class CreateTaskModalPage {
  readonly page: Page;
  readonly modalContainer: Locator;
  readonly taskNameInput: Locator;
  readonly addDescriptionButton: Locator;
  readonly taskDescriptionInput: Locator;
  readonly createTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = page.getByTestId('modal__dialog');
    this.taskNameInput = page.getByTestId('draft-view__title-task');
    this.addDescriptionButton = page.getByTestId('dropdown-list-item__blank');
    this.taskDescriptionInput = page.locator('.ql-editor');
    this.createTaskButton = page.getByTestId('draft-view__quick-create-create');
  }

  async fillTaskNameField(taskName: string) {
    await this.taskNameInput.fill(taskName);
  }

  async fillDescriptionField(taskDescription: string) {
    await this.addDescriptionButton.click();
    await this.taskDescriptionInput.fill(taskDescription);
  }

  async clickCreateTaskButton() {
    await this.createTaskButton.click();
  }
}