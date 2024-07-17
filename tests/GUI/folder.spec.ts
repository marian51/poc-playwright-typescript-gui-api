import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { CreateFolderModal } from "../../page-objects/modals/createFolderModal";
import { FolderContextMenu } from "../../page-objects/context-menus/folderContextMenu";
import { DeleteFolderModal } from "../../page-objects/modals/deleteFolderModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { SpacePlusMenu } from "../../page-objects/context-menus/spacePlusMenu";
import { waitForPageLoad } from "../../utils/GlobalGuiUtils";

test.describe(
  "Folder tests",
  { tag: "@folder", annotation: { type: "issue", description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/87" } },
  () => {
    const newFolderName = "GUI TEST folder";
    const spaceName = "Space for Folder tests";
    let leftMenu: LeftMenu;

    test.beforeAll(async ({ request }) => {
      await ApiHooks.createSpaceByName(request, spaceName);
    });

    test.afterAll(async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, spaceName);
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

        await leftMenu.clickOnSpacePlusButton(spaceName);
        await spacePlusMenu.clickOnOption("Folder");
        await createFolderModal.typeFolderName(newFolderName);
        await createFolderModal.clickOnCreateFolderButton();
        await leftMenu.clickOnElement(spaceName);
        await leftMenu.assertElementIsVisible(newFolderName);

        await ApiHooks.deleteFolderByName(request, spaceName, newFolderName);
      });
    });

    test.describe("Tests on existing folder", () => {
      test.beforeEach(async ({ page, request }) => {
        await ApiHooks.createFolderByName(request, spaceName, newFolderName);
        await page.goto("/");
        await waitForPageLoad(page);
        leftMenu = new LeftMenu(page);
      });

      test("Test for checking if deleting existing folder works correctly", async ({ page, request }) => {
        const folderContextMenu = new FolderContextMenu(page);
        const deleteFolderModal = new DeleteFolderModal(page);

        await leftMenu.clickOnElement(spaceName);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.rightClickOnElement(newFolderName);
        await folderContextMenu.clickOnOption("Delete");
        await deleteFolderModal.typeFolderName(newFolderName);
        await deleteFolderModal.clickOnDeleteButton();
        await leftMenu.assertElementIsNotVisible(newFolderName);
      });

      test("Test for checking if deleting existing folder through ellipsis works correctly", async ({ page, request }) => {
        const folderContextMenu = new FolderContextMenu(page);
        const deleteFolderModal = new DeleteFolderModal(page);

        await leftMenu.clickOnElement(spaceName);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.clickOnFolderEllipsis(newFolderName);
        await folderContextMenu.clickOnOption("Delete");
        await deleteFolderModal.typeFolderName(newFolderName);
        await deleteFolderModal.clickOnDeleteButton();
        await leftMenu.assertElementIsNotVisible(newFolderName);
      });

      test("Test for checking if renaming existing folder works correctly", async ({ page, request }) => {
        const renamedFolderName = "Renamed GUI TEST folder";
        const folderContextMenu = new FolderContextMenu(page);

        await leftMenu.clickOnElement(spaceName);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.rightClickOnElement(newFolderName);
        await folderContextMenu.clickOnOption("Rename");
        await leftMenu.typeFolderName(renamedFolderName);
        await leftMenu.assertElementIsVisible(renamedFolderName);

        await ApiHooks.deleteFolderByName(request, spaceName, renamedFolderName);
      });

      test("Test for checking if renaming existing folder through ellipsis works correctly", async ({ page, request }) => {
        const renamedFolderName = "Renamed GUI TEST folder";
        const folderContextMenu = new FolderContextMenu(page);

        await leftMenu.clickOnElement(spaceName);
        await page.getByRole("button", { name: "Add List"}).waitFor();
        await leftMenu.clickOnFolderEllipsis(newFolderName);
        await folderContextMenu.clickOnOption("Rename");
        await leftMenu.typeFolderName(renamedFolderName);
        await leftMenu.assertElementIsVisible(renamedFolderName);

        await ApiHooks.deleteFolderByName(request, spaceName, renamedFolderName);
      });
    });
  }
);
