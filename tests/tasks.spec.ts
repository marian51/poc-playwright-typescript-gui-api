import { test } from '@playwright/test'
import { ExpandableTopBarPage } from '../page-objects/expandableTopBarPage';
import { CreateTaskModalPage } from '../page-objects/modals/createTaskModalPage';
import { ProjectMainView } from '../page-objects/projectMainView';

test.describe('Tasks feature tests', () => {
  test.only('Create new task', async ({ page }) => {
    const taskName = 'Test Task';
    await page.goto('/');

    const expandableTopBarPage = new ExpandableTopBarPage(page);
    await expandableTopBarPage.clickAddTaskButton();
    
    const createTaskModalPage = new CreateTaskModalPage(page);
    await createTaskModalPage.fillTaskNameField('Test Task');
    await createTaskModalPage.fillDescriptionField('My description');
    await createTaskModalPage.clickCreateTaskButton();

    const projectMainView = new ProjectMainView(page);
    await projectMainView.assertTaskIsVisible(taskName);
  });
});