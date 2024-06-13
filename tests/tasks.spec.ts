import { test } from '@playwright/test'
import { ExpandableTopBarPage } from '../page-objects/expandableTopBarPage';
import { CreateTaskModalPage } from '../page-objects/modals/createTaskModalPage';
import { ProjectMainView } from '../page-objects/projectMainView';
import { TaskConextMenu } from '../page-objects/context-menus/taskContextMenu';

test.describe.serial('Tasks feature tests', () => {
  // TODO: implement faker
  const taskName = 'Test Task';
  
  test('Create new task', async ({ page }) => {
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

  test('Delete a task', async ({ page }) =>{
    await page.goto('/');

    const projectMainView = new ProjectMainView(page);
    await projectMainView.openTaskContextMenu(taskName);

    const taskContextMenuButton = new TaskConextMenu(page);
    await taskContextMenuButton.clickDeleteButton();

    await projectMainView.assertTaskIsNotVisible(taskName);
  });
});