import { Locator, Page, expect } from "@playwright/test";

export class CreateSpaceModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly nameInput: Locator;
  private readonly continueButton: Locator;
  private readonly sameNameErrorMessage: Locator;

  private button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.nameInput = this.page.getByTestId("create-space-details__input").first();
    this.continueButton = this.page.getByTestId("create-space-details__continue-button");
    this.sameNameErrorMessage = this.page.getByText("Space name already exists");
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

  async assertNameInputHasError() {
    await this.nameInput.waitFor();
    await expect(this.nameInput).toHaveClass(/error/);
    await expect(this.nameInput).toHaveCSS("border-color", "rgb(211, 61, 68)");
  }

  async assertErrorMessageIsDisplayed() {
    await this.sameNameErrorMessage.waitFor();
    await expect(this.sameNameErrorMessage).toBeVisible();
    await expect(this.sameNameErrorMessage).toHaveCSS("color", "rgb(177, 58, 65)");
  }

  async assertModalWindowIsVisible() {
    await this.modalContainer.waitFor();
    await expect(this.modalContainer).toBeVisible();
  }
}
