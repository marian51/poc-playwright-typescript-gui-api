import { Locator, Page, expect } from "@playwright/test";
import { logClicking, logHoveringOverElement, logTyping, retryDecorator } from "../utils/decorators";
import { retry } from "../utils/GlobalGuiUtils"

export class LeftMenu {
  private readonly page: Page;
  private readonly leftSideBar: Locator;
  private readonly renameInput: Locator;

  private menuElement: Locator;
  private spaceElement: Locator;
  private menuContainer: string;

  constructor(page: Page) {
    this.page = page;
    this.leftSideBar = this.page.locator("cu-simple-bar");
    this.renameInput = this.leftSideBar.getByTestId("nav-editor__input");
    this.menuContainer = "[data-test='dropdown__menu__sidebar']";
  }

  private getMenuContainer() {
    return this.menuContainer;
  }

  @logClicking("left menu option")
  async clickOnElement(elementName: string, button: "left" | "right" = "left") {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.click({ button });
  }

  async retryClick(elementName: string, button: "left" | "right" = "left") {
    await retry(() => this.clickOnElement(elementName, button), this.menuContainer, this.page, 4, 2000);
  }

  async retryClickEllipsis(elementName: string) {
    await retry(() => this.clickOnFolderEllipsis(elementName), this.menuContainer, this.page, 4, 2000);
  }

  @retryDecorator(4, 2000, (context) => context.getMenuContainer())
  @logClicking("left menu option", "Right")
  async rightClickOnElement(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.click({ button: "right" });
  }

  @logTyping("Rename doc")
  async typeIntoRenameDocInput(newDocName: string) {
    await this.renameInput.fill(newDocName);
  }

  @logClicking("keyboard key")
  async clickKeyBoardKey(keyboardKey: string) {
    await this.leftSideBar.press(keyboardKey);
  }

  @logClicking("left menu space create button")
  async clickOnSpacePlusButton(spaceName: string) {
    await this.hoverOverSpaceElement(spaceName);
    await this.spaceElement.getByTestId(`project-row__ellipsis_icon-${spaceName}`).click();
  }

  @logClicking("left menu folder ellipsis")
  async clickOnFolderEllipsis(folderName: string) {
    await this.hoverOverElement(folderName);
    await this.menuElement.getByTestId(`category-row__ellipsis-folder-name__${folderName}`).click();
  }

  @logHoveringOverElement("'Space' element")
  async hoverOverSpaceElement(spaceName: string) {
    this.spaceElement = this.page.getByTestId(`project-list-bar-item__link__${spaceName}`);
    await this.spaceElement.hover();
  }

  @logHoveringOverElement("Left menu element")
  async hoverOverElement(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.hover();
  }

  @logTyping("Folder name")
  async typeFolderName(renamedFolderName: string) {
    await this.renameInput.fill(renamedFolderName);
    await this.renameInput.blur();
  }

  async assertElementIsVisible(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await expect(this.menuElement).toBeVisible();
  }

  async assertVisibleElementsNumber(elementsName: string, elementsNumber: number) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementsName });
    await expect(this.menuElement).toHaveCount(elementsNumber);
  }

  async assertElementIsNotVisible(elementName: string) {
    this.menuElement = this.leftSideBar.getByRole("treeitem", { name: elementName });
    await this.menuElement.waitFor({ state: "detached" });
    await expect(this.menuElement).toBeHidden();
  }
}
