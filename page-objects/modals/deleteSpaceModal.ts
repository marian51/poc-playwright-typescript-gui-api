import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping, logWaiting } from "../../utils/decorators";

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

  @logTyping("Space name")
  async typeSpaceName(spaceName: string) {
    await this.spaceNameInput.fill(spaceName);
  }

  @logClickingOnElement("'Delete' button")
  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }

  @logWaiting("Deleting space")
  async waitForDeleting() {
    await this.modalContainer.waitFor({ state: "detached" });
  }
}
