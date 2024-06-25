import { Locator, Page } from "@playwright/test";
import { logClicking } from "../../utils/decorators";

export class SpacePlusMenu {
  private readonly page: Page;
  private readonly menuContainer: Locator;

  private menuOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuContainer = this.page.locator("cu-nav-menu-create-new").first();
  }

  @logClicking("menu option")
  async clickOnOption(optionName: string) {
    this.menuOption = this.menuContainer.getByRole("button", { name: optionName });
    await this.menuOption.click();
  }
}
