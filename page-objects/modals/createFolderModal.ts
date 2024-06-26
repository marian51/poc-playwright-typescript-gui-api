import { Page } from "@playwright/test";
import { logClickingOnElement, logTyping } from "../../utils/decorators";

export class CreateFolderModal {
    private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @logTyping("Folder name")
  async typeFolderName(newFolderName: string) {
    await this.page.getByTestId("create-category__form-input").fill(newFolderName);
  }

  @logClickingOnElement("'Create Folder' button")
  async clickOnCreateFolderButton() {
    await this.page.getByTestId("create-category__create-folder").click();
  }
}