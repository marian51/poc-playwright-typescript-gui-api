import { Locator, Page, expect } from "@playwright/test"

export class ProjectMainView {
  private readonly page: Page
  private readonly dashboard: Locator;

  private expectedTask: Locator;
  private taskRowContainer: Locator;
  private taskContextMenuButton: Locator;
  private taskLink: Locator;
  private taskStatus: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.dashboard = page.getByTestId('dashboard-table-list-group__body');
  }

  async openTaskModal(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId('task-row__container__' + taskName);
    this.taskLink = this.taskRowContainer.getByTestId("task-row-main__link");
    await this.taskLink.click();
  }

  async openTaskContextMenu(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId('task-row__container__' + taskName);
    this.taskContextMenuButton = this.taskRowContainer.getByTestId('task-row-menu__ellipsis-v3-button');
    await this.taskContextMenuButton.waitFor();
    await this.taskContextMenuButton.click();
  }

  async assertTaskIsVisible(taskName: string) {
    this.expectedTask = this.dashboard.getByRole('link', { name: taskName });
    await this.expectedTask.waitFor();
    await expect(this.expectedTask).toBeVisible();
  }
  
  async assertTaskIsNotVisible(taskName: string) {
    this.expectedTask = this.dashboard.getByRole('link', { name: taskName });
    await this.expectedTask.waitFor({ state: 'detached' });
    await expect(this.expectedTask).toBeHidden();
  }

  async assertTaskIsInProgress(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId('task-row__container__' + taskName);
    this.taskStatus = this.taskRowContainer.getByTestId('task-row-status__badge');

    // TODO: expected dictionary
    await expect(this.taskStatus).toHaveText('in progress')
  }
}