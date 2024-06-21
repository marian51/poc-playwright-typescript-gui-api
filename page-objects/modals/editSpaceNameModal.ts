import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping, logWaiting } from "../../utils/decorators";

export class EditSpaceNameModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly spaceNameInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.spaceNameInput = this.modalContainer.getByTestId("create-project-modal__form-input");
    this.saveButton = this.modalContainer.getByTestId("create-project-modal__next-step-create-new-space");
  }

  @logTyping("Space name")
  async typeSpaceName(spaceName: string) {
    await this.spaceNameInput.clear();
    await this.spaceNameInput.fill(spaceName);
  }

  @logClickingOnElement("'Save' button")
  async clickOnSaveButton() {
    await this.saveButton.click();
  }

  @logWaiting("Closing modal window")
  async waitForModalClosing() {
    await this.modalContainer.waitFor({ state: "detached" });
  }
}
