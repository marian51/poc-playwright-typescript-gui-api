import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping } from "../../utils/decorators";

export class CreateReminderModal {
  private readonly page: Page;
  private readonly nameInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByTestId("reminder-row-new__input");
    this.saveButton = this.page.getByText("Save");
  }

  @logTyping("Reminder text")
  async typeNameInput(reminderName: string) {
    await this.nameInput.fill(reminderName);
  }

  @logClickingOnElement("'Save' button")
  async clickSaveButton() {
    await this.saveButton.click();
  }
}
