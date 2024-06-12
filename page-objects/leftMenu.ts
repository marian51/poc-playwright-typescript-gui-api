import { Locator, Page, expect } from "@playwright/test";

export class LeftMenu {
    private readonly page: Page;
    private readonly leftSideBar: Locator;

    private menuElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.leftSideBar = this.page.locator("cu-simple-bar");
    }

    clickOnElement = async (elementName: string) => {
        this.menuElement = this.leftSideBar.getByRole('treeitem', { name: elementName })
        await this.menuElement.waitFor()
        await this.menuElement.click()
    };

    assertElementIsVisible = async (elementName: string) => {
        this.menuElement = this.leftSideBar.getByRole('treeitem', { name: elementName })
        await this.menuElement.waitFor()
        await expect(this.menuElement).toBeVisible()
    }
}
