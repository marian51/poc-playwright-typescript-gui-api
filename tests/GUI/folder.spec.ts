import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { SpaceCreateContextMenu } from "../../page-objects/context-menus/spaceCreateContextMenu";
import { CreateFolderModal } from "../../page-objects/modals/createFolderModal";
import { FolderContextMenu } from "../../page-objects/context-menus/folderContextMenu";
import { DeleteFolderModal } from "../../page-objects/modals/deleteFolderModal";
import { ApiHooks } from "../../api-utils/apiHooks";

test.describe(
  "Folder tests",
  { tag: "@folder", annotation: { type: "issue", description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/87" } },
  () => {
    const newFolderName = "GUI TEST folder";
    const spaceName = "Team Space";
    let leftMenu: LeftMenu;

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      leftMenu = new LeftMenu(page);
    });

    test("Test for checking if creating new folder works correctly", async ({ page, request }) => {
      const spaceCreateContextMenu = new SpaceCreateContextMenu(page);
      const createFolderModal = new CreateFolderModal(page);

      await leftMenu.clickOnSpacePlusButton(spaceName);
      await spaceCreateContextMenu.clickOnOption("category");
      await createFolderModal.typeFolderName(newFolderName);
      await createFolderModal.clickOnCreateFolderButton();
      await leftMenu.assertElementIsVisible(newFolderName);

      await ApiHooks.deleteFolderByName(request, spaceName, newFolderName);
    });

    test.describe("Tests on existing folder", () => {
      test.beforeEach(async ({ request }) => {
        await ApiHooks.createFolderByName(request, spaceName, newFolderName);
      });

      test("Test for checking if deleting existing folder works correctly", async ({ page, request }) => {
        const folderContextMenu = new FolderContextMenu(page);
        const deleteFolderModal = new DeleteFolderModal(page);

        await leftMenu.rightClickOnElement(newFolderName);
        await folderContextMenu.clickOnOption("Delete");
        await deleteFolderModal.typeFolderName(newFolderName);
        await deleteFolderModal.clickOnDeleteButton();
        await leftMenu.assertElementIsNotVisible(newFolderName);
      });

      test("Test for checking if renaming existing folder works correctly", async ({ page, request }) => {
        const renamedFolderName = "Renamed GUI TEST folder";
        const folderContextMenu = new FolderContextMenu(page);

        await leftMenu.rightClickOnElement(newFolderName);
        await folderContextMenu.clickOnOption("Rename");
        await leftMenu.typeFolderName(renamedFolderName);

        await leftMenu.assertElementIsVisible(renamedFolderName);

        await ApiHooks.deleteFolderByName(request, spaceName, renamedFolderName);
      });
    });
  }
);
