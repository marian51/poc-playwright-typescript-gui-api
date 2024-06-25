import { Locator, Page } from "@playwright/test";
import { logClickingOnElement } from "../utils/decorators";

export class AvatarDropdownMenu {
  private readonly page: Page;
  private readonly profile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profile = this.page.getByTestId("dropdown-list-item__user");
  }

  @logClickingOnElement("'Profile' menu item")
  async clickSettings() {
    await this.profile.click();
  }
}
