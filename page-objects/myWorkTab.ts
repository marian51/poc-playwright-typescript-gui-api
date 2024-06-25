import { Locator, Page, expect } from "@playwright/test";
import { logClickingOnElement, logHoveringOverElement } from "../utils/decorators";

export class MyWorkTab {
  private readonly page: Page;
  private readonly todayListTitle: Locator;
  private readonly createReminderButton: Locator;

  private reminder: Locator;
  private reminderContainer: Locator;
  private removeReminderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todayListTitle = this.page.getByTestId("inbox-list__title__Today");
    this.createReminderButton = this.page.getByTestId("inbox-list__header-Today").getByTestId("inbox-list__create-reminder");
  }

  async setReminder(reminderName: string) {
    this.reminderContainer = this.page.getByTestId(`reminder-row__container__${reminderName}`);
    this.reminder = this.page.getByTestId(`reminder-row__title__${reminderName}`);
  }

  @logHoveringOverElement("'Today' list title")
  async hoverTodayListTitle() {
    await this.todayListTitle.hover();
  }

  @logHoveringOverElement("'Reminder' item")
  async hoverReminder() {
    await this.reminder.hover();
  }

  @logClickingOnElement("'Create reminder' button")
  async clickCreateReminderButton() {
    await this.createReminderButton.click();
  }

  @logClickingOnElement("'Remove reminder' button")
  async clickRemoveReminderButton() {
    this.removeReminderButton = this.reminderContainer.getByTestId("reminder-row__remove");
    await this.removeReminderButton.click();
  }

  async assertReminderIsVisible() {
    await expect(this.reminder, "New reminder should be visible").toBeVisible();
  }

  async assertReminderIsNotVisible() {
    await expect(this.reminder, "Deleted reminder should not be visible").toBeHidden();
  }
}
