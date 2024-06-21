import { Locator, Page } from "@playwright/test";

export class MyWorkTab {
  private readonly page: Page;
  private readonly todayListTitle: Locator;
  private readonly createReminderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todayListTitle = this.page.getByTestId("inbox-list__title__Today");
    this.createReminderButton = this.page.getByTestId("inbox-list__header-Today").getByTestId("inbox-list__create-reminder");
  }

  async hoverTodayListTitle() {
    await this.todayListTitle.hover();
  }

  async clickCreateReminderButton() {
    await this.createReminderButton.click();
  }
}
