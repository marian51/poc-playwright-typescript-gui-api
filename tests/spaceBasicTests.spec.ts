import test from "@playwright/test";
import { LeftMenu } from "../page-objects/leftMenu";
import { CreateSpaceModal } from "../page-objects/modals/createSpaceModal";
import { ApiHooks } from "../api-utils/apiHooks";
import { DeleteSpaceModal } from "../page-objects/modals/deleteSpaceModal";
import { SpaceContextMenu } from "../page-objects/context-menus/spaceContextMenu";
import { EditSpaceNameModal } from "../page-objects/modals/editSpaceNameModal";

test(
  "Basic test for checking if creating new space works correct",
  {
    tag: "@space",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page);
    const createSpaceModal = new CreateSpaceModal(page);
    const newSpaceName = "GUI TEST new space";

    await page.goto("/");
    await page.locator("cu-web-push-notification-banner").waitFor();

    await leftMenu.clickOnElement("Create Space");
    await createSpaceModal.typeSpaceName(newSpaceName);
    await createSpaceModal.clickOnContinueButton();
    await createSpaceModal.clickOnButton("Create Space");
    await leftMenu.assertElementIsVisible(newSpaceName);

    await ApiHooks.deleteSpaceByName(request, newSpaceName);
  }
);

test(
  "Basic test for checking if deleting existing space works correct",
  {
    tag: "@space",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page);
    const deleteSpaceModal = new DeleteSpaceModal(page);
    const spaceContextMenu = new SpaceContextMenu(page);
    const newSpaceName = "GUI TEST new space";

    await ApiHooks.createSpaceByName(request, newSpaceName);
    await page.goto("/");
    await page.locator("cu-web-push-notification-banner").waitFor();

    await leftMenu.rightClickOnElement(newSpaceName);
    await spaceContextMenu.clickOnOption('Delete')
    await deleteSpaceModal.typeSpaceName(newSpaceName);
    await deleteSpaceModal.clickOnDeleteButton();
    await deleteSpaceModal.waitForDeleting();
    await leftMenu.assertElementIsNotVisible(newSpaceName);
  }
);

test(
  "Basic test for checking if renaming existing space works correct",
  {
    tag: "@space",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page);
    const spaceContextMenu = new SpaceContextMenu(page);
    const editSpaceNameModal = new EditSpaceNameModal(page);
    const newSpaceName = "GUI TEST new space";
    const renamedSpaceName = "RENAMED GUI TEST new space";

    await ApiHooks.createSpaceByName(request, newSpaceName);
    await page.goto("/");
    await page.locator("cu-web-push-notification-banner").waitFor();

    await leftMenu.rightClickOnElement(newSpaceName);
    await spaceContextMenu.clickOnOption("Rename");
    await editSpaceNameModal.typeSpaceName(renamedSpaceName);
    await editSpaceNameModal.clickOnSaveButton();
    await leftMenu.assertElementIsVisible(renamedSpaceName);

    await ApiHooks.deleteSpaceByName(request, renamedSpaceName);
  }
);

test(
  "Basic test for checking if creating new space with the same name is not allowed",
  {
    tag: "@space",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page);
    const createSpaceModal = new CreateSpaceModal(page);
    const newSpaceName = "GUI TEST new space";

    await ApiHooks.createSpaceByName(request, newSpaceName);
    await page.goto("/");
    await page.locator("cu-web-push-notification-banner").waitFor();

    await leftMenu.clickOnElement("Create Space");
    await createSpaceModal.typeSpaceName(newSpaceName);
    await createSpaceModal.assertNameInputHasError();
    await createSpaceModal.assertErrorMessageIsDisplayed();
    await createSpaceModal.clickOnContinueButton();
    await createSpaceModal.assertModalWindowIsVisible();

    await ApiHooks.deleteSpaceByName(request, newSpaceName);
  }
);

test(
  "Basic test for checking if duplicating existing space works correct",
  {
    tag: "@space @this",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page);
    const spaceContextMenu = new SpaceContextMenu(page);
    const duplicateSpaceModal = new DuplicateSpaceModal(page);
    const newSpaceName = "GUI TEST new space";
    const duplicatedSpaceName = "GUI TEST duplicated space";

    await ApiHooks.createSpaceByName(request, newSpaceName);
    await page.goto("/");
    await page.locator("cu-web-push-notification-banner").waitFor();

    await leftMenu.rightClickOnElement(newSpaceName);
    await spaceContextMenu.clickOnOption("Duplicate");
    await duplicateSpaceModal.typeSpaceName(duplicatedSpaceName);
    await duplicateSpaceModal.clickOnDuplicateButton();
    await leftMenu.assertElementIsVisible(duplicatedSpaceName);

    await ApiHooks.deleteSpaceByName(request, newSpaceName);
    await ApiHooks.deleteSpaceByName(request, duplicatedSpaceName);
  },
);
