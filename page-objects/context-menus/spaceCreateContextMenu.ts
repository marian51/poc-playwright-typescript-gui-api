import { Page } from "@playwright/test";
import { logClicking } from "../../utils/decorators";

export class SpaceCreateContextMenu {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @logClicking("menu option")
  async clickOnOption(optionName: string) {
    await this.page.getByTestId(`dropdown-list-item__${optionName}`).click();
  }
}
