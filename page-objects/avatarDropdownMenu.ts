import { Locator, Page } from "@playwright/test";

export class AvatarDropdownMenu {
  private readonly page: Page;
  private readonly profile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profile = this.page.getByTestId("dropdown-list-item__user");
  }

  async clickSettings() {
    await this.profile.click();
  }
}
