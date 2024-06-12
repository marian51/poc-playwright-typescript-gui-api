import { test, expect } from '@playwright/test'
import { ExpandableTopBarPage } from '../page-objects/expandableTopBarPage';
import { CreateTaskModalPage } from '../page-objects/modals/createTaskModalPage';

test.describe('Tasks feature tests', () => {
  test.only('Create new task', async ({ page }) => {
    const expandableTopBarPage = new ExpandableTopBarPage(page);
    await page.goto('/');
    await page.waitForSelector('[data-test=create-task-menu__new-task-button][cu3-size=small]');
    
    await expandableTopBarPage.clickAddTaskButton();
    const createTaskModalPage = new CreateTaskModalPage(page);

    await createTaskModalPage.fillTaskNameField('Test Task');
    await createTaskModalPage.fillDescriptionField('My description');
    await createTaskModalPage.clickCreateTaskButton();
  });
});