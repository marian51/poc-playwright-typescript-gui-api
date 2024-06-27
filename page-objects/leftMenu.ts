import { Locator, Page, expect } from "@playwright/test";
import { logClicking, logTyping } from "../utils/decorators";

export class LeftMenu {
  private readonly page: Page;
  private readonly leftSideBar: Locator;
  private readonly folderNameInput: Locator;

  private menuElement: Locator;
  private spaceElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leftSideBar = this.page.locator("cu-simple-bar");
    this.folderNameInput = this.page.getByTestId('nav-editor__input');
  }

  @logClicking("left menu option")
  async clickOnElement(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.click();
  }

  @logClicking("left menu option", "Right")
  async rightClickOnElement(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.click({ button: "right" });
  }

  @logClicking("left menu space create button")
  async clickOnSpacePlusButton(spaceName: string) {
    await this.hoverOverSpaceElement(spaceName);
    await this.spaceElement.getByTestId(`project-row__ellipsis_icon-${spaceName}`).click();
  }

  async hoverOverSpaceElement(spaceName: string) {
    this.spaceElement = this.page.getByTestId(`project-list-bar-item__link__${spaceName}`);
    await this.spaceElement.hover();
  }

  @logTyping("Folder name")
  async typeFolderName(renamedFolderName: string) {
    await this.folderNameInput.fill(renamedFolderName);
    await this.folderNameInput.blur();
  }

  async assertElementIsVisible(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await expect(this.menuElement).toBeVisible();
  }

  async assertElementIsNotVisible(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.waitFor({ state: "detached" });
    await expect(this.menuElement).toBeHidden();
  }
}
