import { Locator, Page, expect } from "@playwright/test";

export class ProjectMainView {
  private readonly page: Page;
  private readonly dashboard: Locator;

  private expectedTask: Locator;
  private taskRowContainer: Locator;
  private taskContextMenuButton: Locator;
  private taskLink: Locator;
  private taskStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = page.getByTestId("dashboard-table-list-group__body");
  }

  async openTaskModal(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId("task-row__container__" + taskName);
    this.taskLink = this.taskRowContainer.getByTestId("task-row-main__link");
    await this.taskLink.click();
  }

  async openTaskContextMenu(taskName: string) {
    this.taskRowContainer = this.dashboard.getByTestId("task-row__container__" + taskName);
    this.taskContextMenuButton = this.taskRowContainer.getByTestId("task-row-menu__ellipsis-v3-button");
    await this.taskContextMenuButton.click();
  }

  async getElementByRole(elementRole, elementName: string): Promise<Locator> {
    return this.dashboard.getByRole(elementRole, { name: elementName });
  }

  async getElementByTestId(dataTestId: string, elementName: string = ""): Promise<Locator> {
    return this.dashboard.getByTestId(dataTestId + elementName);
  }
}
