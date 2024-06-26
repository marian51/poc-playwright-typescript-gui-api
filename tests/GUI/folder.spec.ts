import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { SpaceCreateContextMenu } from "../../page-objects/context-menus/spaceCreateContextMenu";
import { CreateFolderModal } from "../../page-objects/modals/createFolderModal";
import { FolderContextMenu } from "../../page-objects/context-menus/folderContextMenu";
import { DeleteFolderModal } from "../../page-objects/modals/deleteFolderModal";

test.describe("Folder tests", { tag: "@folder", annotation: { type: "test type", description: "basic test" } }, () => {
  test("Test for checking if creating new folder works correctly", async ({ page }) => {
    const spaceName = "Team Space";
    const newFolderName = "GUI TEST folder";
    const leftMenu = new LeftMenu(page);
    const spaceCreateContextMenu = new SpaceCreateContextMenu(page);
    const createFolderModal = new CreateFolderModal(page);

    await page.goto("/");

    await leftMenu.clickOnSpacePlusButton(spaceName);
    await spaceCreateContextMenu.clickOnOption("category");
    await createFolderModal.typeFolderName(newFolderName);
    await createFolderModal.clickOnCreateFolderButton();
    await leftMenu.assertElementIsVisible(newFolderName);
  });

  test("Test for checking if deleting existing folder works correctly", async ({ page }) => {
    const newFolderName = "GUI TEST folder";
    const leftMenu = new LeftMenu(page);
    const folderContextMenu = new FolderContextMenu(page);
    const deleteFolderModal = new DeleteFolderModal(page);

    await page.goto("/");

    await leftMenu.rightClickOnElement(newFolderName);
    await folderContextMenu.clickOnOption("Delete");
    await deleteFolderModal.typeFolderName(newFolderName);
    await deleteFolderModal.clickOnDeleteButton();
    await leftMenu.assertElementIsNotVisible(newFolderName);
  });
});
