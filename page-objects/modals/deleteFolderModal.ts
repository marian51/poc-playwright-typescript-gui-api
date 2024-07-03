import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping } from "../../utils/decorators";

export class DeleteFolderModal {
  private readonly page: Page;
  private readonly modalContainer: Locator;
  private readonly folderNameInput: Locator;
  private readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__body");
    this.folderNameInput = this.modalContainer.getByRole("textbox");
    this.deleteButton = this.modalContainer.getByTestId("confirmation-modal__confirm-button");
  }

  @logTyping("Folder name")
  async typeFolderName(folderName: string) {
    await this.folderNameInput.fill(folderName);
  }

  @logClickingOnElement("'Delete' button")
  async clickOnDeleteButton() {
    await this.deleteButton.click();
  }
}
