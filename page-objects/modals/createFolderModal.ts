import { Locator, Page } from "@playwright/test";
import { logClickingOnElement, logTyping } from "../../utils/decorators";

export class CreateFolderModal {
    private readonly page: Page;
    private readonly modalContainer: Locator;

    private readonly nameInput: Locator;
    // private readonly createFolderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = this.page.getByTestId("modal__dialog");
    this.nameInput = this.page.getByTestId("create-category__form-input");
    // this.createFolderButton = this.page.getByRole("button", {name: "Create"});
  }

  @logTyping("Folder name")
  async typeFolderName(newFolderName: string) {
    await this.nameInput.fill(newFolderName);
  }

  @logClickingOnElement("'Create Folder' button")
  async clickOnCreateFolderButton() {
    await this.modalContainer.getByRole("button", {name: "Create"}).click();
  }
}