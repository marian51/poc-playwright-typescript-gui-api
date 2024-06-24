import { Locator, Page, expect } from "@playwright/test";

export class MyWorkTab {
  private readonly page: Page;
  private readonly todayListTitle: Locator;
  private readonly createReminderButton: Locator;

  private reminder: Locator;

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

  async assertReminderIsVisible(reminderName: string) {
    this.reminder = this.page.getByTestId(`reminder-row__title__${reminderName}`);
    await expect(this.reminder).toBeVisible();
  }
}
