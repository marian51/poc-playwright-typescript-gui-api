import { Locator, Page } from "@playwright/test";
import { logClicking } from "../../utils/decorators";

export class DocContextMenu {
  private readonly page: Page;
  private readonly menuContainer: Locator;

  private menuOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuContainer = this.page.getByTestId("dropdown__menu__sidebar");
  }

  @logClicking("context menu option")
  async clickOnOption(optionName: string) {
    this.menuOption = this.menuContainer.getByRole("button", { name: optionName });
    await this.menuOption.click();
  }
}
