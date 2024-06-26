import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping } from "../../utils/decorators";

export class CreateFolderModal {
    private readonly page: Page;

    private readonly nameInput: Locator;
    private readonly createFolderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByTestId("create-category__form-input");
    this.createFolderButton = this.page.getByTestId("create-category__create-folder");
  }

  @logTyping("Folder name")
  async typeFolderName(newFolderName: string) {
    await this.nameInput.fill(newFolderName);
  }

  @logClickingOnElement("'Create Folder' button")
  async clickOnCreateFolderButton() {
    await this.createFolderButton.click();
  }
}