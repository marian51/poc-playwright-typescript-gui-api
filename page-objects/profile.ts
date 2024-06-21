import { Locator, Page } from "@playwright/test";

export class Profile {
  private readonly page: Page;
  private readonly myWorkTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myWorkTab = this.page.getByTestId("user-profile-header__tabs").getByText("My Work");
  }

  //TODO Swap for more generic method
  async clickMyWorkTab() {
    await this.myWorkTab.click();
  }
}
