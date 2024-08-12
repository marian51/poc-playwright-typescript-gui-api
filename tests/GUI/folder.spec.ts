import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { CreateFolderModal } from "../../page-objects/modals/createFolderModal";
import { FolderContextMenu } from "../../page-objects/context-menus/folderContextMenu";
import { DeleteFolderModal } from "../../page-objects/modals/deleteFolderModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { SpacePlusMenu } from "../../page-objects/context-menus/spacePlusMenu";
import { waitForPageLoad } from "../../utils/GlobalGuiUtils";
import { OPTION, SETUP } from "../../resources/constants";

test.describe(
  "Folder tests",
  { tag: "@folder", annotation: { type: "issue", description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/87" } },
  () => {
    let leftMenu: LeftMenu;

    test.beforeAll(async ({ request }) => {
      await ApiHooks.createSpaceByName(request, SETUP.SPACE_FOR_FOLDERS);
    });

    test.afterAll(async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, SETUP.SPACE_FOR_FOLDERS);
    });

    test.describe("Tests that create folder", () => {
      test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await waitForPageLoad(page);
        leftMenu = new LeftMenu(page);
      });

      test("Test for checking if creating new folder works correctly", async ({ page, request }) => {
        const spacePlusMenu = new SpacePlusMenu(page);
        const createFolderModal = new CreateFolderModal(page);

        await leftMenu.clickOnSpacePlusButton(SETUP.SPACE_FOR_FOLDERS);
        await spacePlusMenu.clickOnOption(OPTION.FOLDER);
        await createFolderModal.typeFolderName(SETUP.FOLDER);
        await createFolderModal.clickOnCreateFolderButton();
        await leftMenu.clickOnElement(SETUP.SPACE_FOR_FOLDERS);
        await leftMenu.assertElementIsVisible(SETUP.FOLDER);

        await ApiHooks.deleteFolderByName(request, SETUP.SPACE_FOR_FOLDERS, SETUP.FOLDER);
      });
    });

    test.describe("Tests on existing folder", () => {
      test.beforeEach(async ({ page, request }) => {
        await ApiHooks.createFolderByName(request, SETUP.SPACE_FOR_FOLDERS, SETUP.FOLDER);
        await page.goto("/");
        await waitForPageLoad(page);
        leftMenu = new LeftMenu(page);
      });

      test("Test for checking if deleting existing folder works correctly", async ({ page }) => {
        const folderContextMenu = new FolderContextMenu(page);
        const deleteFolderModal = new DeleteFolderModal(page);

        await leftMenu.clickOnElement(SETUP.SPACE_FOR_FOLDERS);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.rightClickOnElement(SETUP.FOLDER);
        await folderContextMenu.clickOnOption(OPTION.DELETE);
        await deleteFolderModal.typeFolderName(SETUP.FOLDER);
        await deleteFolderModal.clickOnDeleteButton();
        await leftMenu.assertElementIsNotVisible(SETUP.FOLDER);
      });

      test("Test for checking if deleting existing folder through ellipsis works correctly", async ({ page }) => {
        const folderContextMenu = new FolderContextMenu(page);
        const deleteFolderModal = new DeleteFolderModal(page);

        await leftMenu.clickOnElement(SETUP.SPACE_FOR_FOLDERS);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.clickOnFolderEllipsis(SETUP.FOLDER);
        await folderContextMenu.clickOnOption(OPTION.DELETE);
        await deleteFolderModal.typeFolderName(SETUP.FOLDER);
        await deleteFolderModal.clickOnDeleteButton();
        await leftMenu.assertElementIsNotVisible(SETUP.FOLDER);
      });

      test("Test for checking if renaming existing folder works correctly", async ({ page, request }) => {
        const folderContextMenu = new FolderContextMenu(page);

        await leftMenu.clickOnElement(SETUP.SPACE_FOR_FOLDERS);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.rightClickOnElement(SETUP.FOLDER);
        await folderContextMenu.clickOnOption(OPTION.RENAME);
        await leftMenu.typeFolderName(SETUP.RENAMED_FOLDER);
        await leftMenu.assertElementIsVisible(SETUP.RENAMED_FOLDER);

        await ApiHooks.deleteFolderByName(request, SETUP.SPACE_FOR_FOLDERS, SETUP.RENAMED_FOLDER);
      });

      test("Test for checking if renaming existing folder through ellipsis works correctly", async ({ page, request }) => {
        const folderContextMenu = new FolderContextMenu(page);

        await leftMenu.clickOnElement(SETUP.SPACE_FOR_FOLDERS);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.clickOnFolderEllipsis(SETUP.FOLDER);
        await folderContextMenu.clickOnOption(OPTION.RENAME);
        await leftMenu.typeFolderName(SETUP.RENAMED_FOLDER);
        await leftMenu.assertElementIsVisible(SETUP.RENAMED_FOLDER);

        await ApiHooks.deleteFolderByName(request, SETUP.SPACE_FOR_FOLDERS, SETUP.RENAMED_FOLDER);
      });
    });
  }
);
