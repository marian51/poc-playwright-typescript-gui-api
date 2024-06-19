import { Locator, Page } from "@playwright/test";

export class DeleteSpaceModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly spaceNameInput: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.spaceNameInput = this.modalContainer.getByRole("textbox");
    this.deleteButton = this.modalContainer.getByTestId("confirmation-modal__confirm-button");
  }

  async typeSpaceName(spaceName: string) {
    await this.spaceNameInput.fill(spaceName);
  }

  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }

  async waitForDeleting() {
    await this.modalContainer.waitFor({ state: "detached" });
  }
}
