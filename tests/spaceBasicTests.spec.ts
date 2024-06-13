import test from "@playwright/test";
import { LeftMenu } from "../page-objects/leftMenu";
import { CreateSpaceModal } from "../page-objects/modals/createSpaceModal";
import { ApiHooks } from "../api-utils/apiHooks";
import { DeleteSpaceModal } from "../page-objects/modals/deleteSpaceModal";
import { SpaceContextMenu } from "../page-objects/contextMenus/spaceContextMenu";

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

    await leftMenu.rightClickOnElement(newSpaceName);
    await spaceContextMenu.clickOnOption('Delete')
    await deleteSpaceModal.typeSpaceName(newSpaceName);
    await deleteSpaceModal.clickOnDeleteButton();
    await deleteSpaceModal.waitForDeleting();
    await leftMenu.assertElementIsNotVisible(newSpaceName);
  }
);
