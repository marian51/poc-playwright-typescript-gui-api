import { Locator, Page, expect } from "@playwright/test";

export class DuplicateSpaceModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly nameInput: Locator;
  private readonly duplicateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.nameInput = this.modalContainer.getByTestId("form-field__box").getByRole("textbox");
    this.duplicateButton = this.modalContainer.getByRole("button", { name: "Duplicate" });
  }

  async typeSpaceName(newSpaceName: string) {
    await this.nameInput.fill(newSpaceName);
  }

  async clickOnDuplicateButton() {
    await this.duplicateButton.click();
  }
}
