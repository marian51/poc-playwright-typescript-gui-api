import { Locator, Page } from "@playwright/test";

export class CreateSpaceModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly nameInput: Locator;
  private readonly continueButton: Locator;

  private button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.nameInput = this.page.getByTestId("create-space-details__input").first();
    this.continueButton = this.page.getByTestId("create-space-details__continue-button");
  }

  async typeSpaceName(newSpaceName: string) {
    await this.nameInput.waitFor();
    await this.nameInput.fill(newSpaceName);
  }

  async clickOnContinueButton() {
    await this.continueButton.waitFor();
    await this.continueButton.click();
  }

  async clickOnButton(buttonName: string) {
    this.button = this.modalContainer.getByRole("button", { name: buttonName });
    await this.button.waitFor();
    await this.button.click();
  }
}
