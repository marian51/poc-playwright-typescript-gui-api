import { Locator, Page, expect } from "@playwright/test";
import { logClicking, logClickingOnElement, logTyping } from "../../utils/decorators";

export class CreateSpaceModal {
  private readonly page: Page;
  private readonly continueButton: Locator;
  public readonly modalContainer: Locator;
  public readonly nameInput: Locator;
  public readonly sameNameErrorMessage: Locator;

  private button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.nameInput = this.page.getByTestId("create-space-details__input").first();
    this.continueButton = this.page.getByTestId("create-space-details__continue-button");
    this.sameNameErrorMessage = this.page.getByText("Space name already exists");
  }

  @logTyping("Space name")
  async typeSpaceName(newSpaceName: string) {
    await this.nameInput.fill(newSpaceName);
  }

  @logClickingOnElement("'Continue' button")
  async clickOnContinueButton() {
    await this.continueButton.click();
  }

  @logClicking("button")
  async clickOnButton(buttonName: string) {
    this.button = this.modalContainer.getByRole("button", { name: buttonName });
    await this.button.click();
  }
}
