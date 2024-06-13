import { Locator, Page, expect } from "@playwright/test"

export class ProjectMainView {
  readonly page: Page
  readonly dashboard: Locator;
  readonly tasksList: Locator;

  private expectedTask: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.dashboard = page.locator('[data-test="dashboard-table-list-group__body"]');
  }

  async assertTaskIsVisible(taskName: string) {
    this.expectedTask = this.dashboard.getByRole('link', { name: taskName });
    await this.expectedTask.waitFor();
    await expect(this.expectedTask).toBeVisible();
  }
}