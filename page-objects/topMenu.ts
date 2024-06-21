import { Locator, Page } from "@playwright/test";

export class TopMenu {
  private readonly page: Page;
  private readonly avatarIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarIcon = this.page.getByTestId("avatar");
  }

  async clickAvatarIcon() {
    await this.avatarIcon.click();
  }
}
