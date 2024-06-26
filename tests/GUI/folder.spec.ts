import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { SpaceCreateContextMenu } from "../../page-objects/context-menus/spaceCreateContextMenu";
import { CreateFolderModal } from "../../page-objects/modals/createFolderModal";

test.describe("Folder tests", { tag: "@folder", annotation: { type: "test type", description: "basic test" } }, () => {
  test("Test for checking if creating new folder works correctly", async ({ page }) => {
    const newFolderName = "GUI TEST folder";
    const leftMenu = new LeftMenu(page);
    const spaceCreateContextMenu = new SpaceCreateContextMenu(page);
    const createFolderModal = new CreateFolderModal(page);

    await page.goto("/");

    await leftMenu.clickOnSpacePlusButton("Team Space");
    await spaceCreateContextMenu.clickOnOption("category");
    await createFolderModal.typeFolderName(newFolderName);
    await createFolderModal.clickOnCreateFolderButton();
    await leftMenu.assertElementIsVisible(newFolderName);
  });
});
