import { Locator, Page } from "@playwright/test";
import { logClicking } from "../../utils/decorators";

export class SpaceCreateContextMenu {
  private readonly page: Page;

  private menuOption: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  @logClicking("menu option")
  async clickOnOption(optionName: string) {
    this.menuOption = this.page.getByTestId(`dropdown-list-item__${optionName}`);
    await this.menuOption.click();
  }
}
