import { test } from '@playwright/test'
import { ExpandableTopBarPage } from '../page-objects/expandableTopBar';
import { CreateTaskModalPage } from '../page-objects/modals/createTaskModal';
import { ProjectMainView } from '../page-objects/projectMainView';
import { TaskConextMenu } from '../page-objects/context-menus/taskContextMenu';
import { EditTaskModal } from '../page-objects/modals/editTaskModal';

test.describe.serial(
  'Tasks feature tests',
  {
    tag: "@task",
  },
  () => {
  // TODO: implement faker
  const taskName = 'Test Task';
  const changedTaskName = 'Changed task name';
  const taskDescription = 'My description';
  
  test('Create new task', async ({ page }) => {
    await page.goto('/');

    const expandableTopBarPage = new ExpandableTopBarPage(page);
    const createTaskModalPage = new CreateTaskModalPage(page);
    const projectMainView = new ProjectMainView(page);
    
    await expandableTopBarPage.clickAddTaskButton();
    await createTaskModalPage.fillTaskNameField(taskName);
    await createTaskModalPage.fillDescriptionField(taskDescription);
    await createTaskModalPage.clickCreateTaskButton();

    await projectMainView.assertTaskIsVisible(taskName);
  });

  test('Change task status to in progress', async ({ page }) => {
    await page.goto('/');

    const projectMainView = new ProjectMainView(page);
    const editTaskModal = new EditTaskModal(page);

    await projectMainView.openTaskModal(taskName);
    await editTaskModal.changeTaskStatusToInProgress();
    await editTaskModal.close();

    await projectMainView.assertTaskIsInProgress(taskName);
  });

  test('Change task name', async ({ page }) => {
    await page.goto('/');

    const projectMainView = new ProjectMainView(page);
    const editTaskModal = new EditTaskModal(page);

    await projectMainView.openTaskModal(taskName);
    await editTaskModal.changeTaskName(changedTaskName);
    await editTaskModal.close();

    await projectMainView.assertTaskIsVisible(changedTaskName);
  });

  test('Delete a task', async ({ page }) => {
    await page.goto('/');

    const projectMainView = new ProjectMainView(page);
    const taskContextMenuButton = new TaskConextMenu(page);
    
    await projectMainView.openTaskContextMenu(changedTaskName);
    await taskContextMenuButton.clickDeleteButton();

    await projectMainView.assertTaskIsNotVisible(changedTaskName);
  });
});