import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { CreateSpaceModal } from "../../page-objects/modals/createSpaceModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { DeleteSpaceModal } from "../../page-objects/modals/deleteSpaceModal";
import { SpaceContextMenu } from "../../page-objects/context-menus/spaceContextMenu";
import { EditSpaceNameModal } from "../../page-objects/modals/editSpaceNameModal";
import { DuplicateSpaceModal } from "../../page-objects/modals/duplicateSpaceModal";

test.describe(
  "UI tests for checking basic space functionalities",
  {
    tag: ["@space", "@one"],
    annotation: [
      {
        type: "test type",
        description: "One basic test",
      },
    ],
  },
  async () => {
    test(
      "Basic test for checking if creating new space works correct",
      {
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/13",
        },
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
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/22",
        },
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
        await spaceContextMenu.clickOnOption("Delete");
        await deleteSpaceModal.typeSpaceName(newSpaceName);
        await deleteSpaceModal.clickOnDeleteButton();
        await deleteSpaceModal.waitForDeleting();
        await leftMenu.assertElementIsNotVisible(newSpaceName);
      }
    );

    test(
      "Basic test for checking if renaming existing space works correct",
      {
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/31",
        },
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
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/33",
        },
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
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/48",
        },
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
      }
    );
  }
);

test.describe(
  "Basic UI end-to-end tests of space functionalities",
  {
    tag: ["@space", "@e2e"],
    annotation: [
      {
        type: "test type",
        description: "End-to-end basic test",
      },
    ],
  },
  async () => {
    test(
      "Basic End-2-End test for checking if creating, renaming and deleting existing space works correct",
      {
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/52",
        },
      },
      async ({ page }) => {
        const leftMenu = new LeftMenu(page);
        const createSpaceModal = new CreateSpaceModal(page);
        const spaceContextMenu = new SpaceContextMenu(page);
        const editSpaceNameModal = new EditSpaceNameModal(page);
        const deleteSpaceModal = new DeleteSpaceModal(page);
        const newSpaceName = "GUI TEST new space";
        const renamedSpaceName = "RENAMED GUI TEST new space";

        await page.goto("/");
        await page.locator("cu-web-push-notification-banner").waitFor();

        await test.step("Step: Create new space", async () => {
          await leftMenu.clickOnElement("Create Space");
          await createSpaceModal.typeSpaceName(newSpaceName);
          await createSpaceModal.clickOnContinueButton();
          await createSpaceModal.clickOnButton("Create Space");

          await leftMenu.assertElementIsVisible(newSpaceName);
        });

        await test.step("Step: Rename existing space", async () => {
          await leftMenu.rightClickOnElement(newSpaceName);
          await spaceContextMenu.clickOnOption("Rename");
          await editSpaceNameModal.typeSpaceName(renamedSpaceName);
          await editSpaceNameModal.clickOnSaveButton();

          await leftMenu.assertElementIsVisible(renamedSpaceName);
        });

        await test.step("Step: Delete renamed space", async () => {
          await leftMenu.rightClickOnElement(renamedSpaceName);
          await spaceContextMenu.clickOnOption("Delete");
          await deleteSpaceModal.typeSpaceName(renamedSpaceName);
          await deleteSpaceModal.clickOnDeleteButton();
          await deleteSpaceModal.waitForDeleting();

          await leftMenu.assertElementIsNotVisible(renamedSpaceName);
        });
      }
    );
  }
);
