import { Locator, Page, expect } from "@playwright/test";
import { logClicking } from "../utils/decorators";

export class LeftMenu {
  private readonly page: Page;
  private readonly leftSideBar: Locator;

  private menuElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leftSideBar = this.page.locator("cu-simple-bar");
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
