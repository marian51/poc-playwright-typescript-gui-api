import { Locator, Page } from "@playwright/test";

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

  async typeSpaceName(spaceName: string) {
    await this.modalContainer.waitFor();
    await this.spaceNameInput.waitFor();
    await this.spaceNameInput.clear();
    await this.spaceNameInput.fill(spaceName);
  }

  async clickOnSaveButton() {
    await this.modalContainer.waitFor();
    await this.saveButton.waitFor();
    await this.saveButton.click();
  }

  async waitForModalClosing() {
    await this.modalContainer.waitFor({ state: "detached" });
  }
}
