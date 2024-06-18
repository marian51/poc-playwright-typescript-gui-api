import { Locator, Page } from "@playwright/test";

export class SpaceContextMenu {
  private readonly page: Page;
  private readonly menuContainer: Locator

  private menuOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuContainer = this.page.getByTestId('project-menu__controls')
  }

  async clickOnOption(optionName: string) {
    this.menuOption = this.menuContainer.getByRole('link', { name: optionName })
    await this.menuOption.click();
  }
}
