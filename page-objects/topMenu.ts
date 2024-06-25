import { Locator, Page } from "@playwright/test";
import { logClickingOnElement } from "../utils/decorators";

export class TopMenu {
  private readonly page: Page;
  private readonly avatarIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarIcon = this.page.getByTestId("avatar");
  }

  @logClickingOnElement("'Avatar' icon")
  async clickAvatarIcon() {
    await this.avatarIcon.click();
  }
}
