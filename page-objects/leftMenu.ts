import { Locator, Page, expect } from "@playwright/test";
import { logClicking, logTyping } from "../utils/decorators";

export class LeftMenu {
  private readonly page: Page;
  private readonly leftSideBar: Locator;
  private readonly renameInput: Locator;

  private menuElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leftSideBar = this.page.locator("cu-simple-bar");
    this.renameInput = this.leftSideBar.getByTestId("nav-editor__input");
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

  @logTyping("Rename doc")
  async typeIntoRenameDocInput(newDocName: string) {
    await this.renameInput.fill(newDocName);
  }

  @logClicking("keyboard key")
  async clickKeyBoardKey(keyboardKey: string) {
    await this.leftSideBar.press(keyboardKey);
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
