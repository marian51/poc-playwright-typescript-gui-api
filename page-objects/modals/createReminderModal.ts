import { Locator, Page } from "@playwright/test";

export class CreateReminderModal {
  private readonly page: Page;
  private readonly nameInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByTestId("avatar");
    this.saveButton = this.page.getByText("Save");
  }

  async typeNameInput(reminderName: string) {
    await this.nameInput.fill(reminderName);
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }
}
