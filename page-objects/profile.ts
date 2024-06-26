import { Locator, Page } from "@playwright/test";
import { logClickingOnElement } from "../utils/decorators";

export class Profile {
  private readonly page: Page;
  private readonly myWorkTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myWorkTab = this.page.getByTestId("user-profile-header__tabs").getByText("My Work");
  }

  @logClickingOnElement("'My work' tab")
  async clickMyWorkTab() {
    await this.myWorkTab.click();
  }
}
