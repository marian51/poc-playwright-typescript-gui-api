import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { CreateSpaceModal } from "../../page-objects/modals/createSpaceModal";
import { ApiHooks } from "../../api-utils/apiHooks";
import { DeleteSpaceModal } from "../../page-objects/modals/deleteSpaceModal";
import { SpaceContextMenu } from "../../page-objects/context-menus/spaceContextMenu";
import { EditSpaceNameModal } from "../../page-objects/modals/editSpaceNameModal";
import { DuplicateSpaceModal } from "../../page-objects/modals/duplicateSpaceModal";
import { waitForPageLoad } from "../../utils/GlobalGuiUtils";
import { ELEMENT, OPTION, SETUP } from "../../resources/constants";

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
    let leftMenu: LeftMenu;
    let newSpaceName: string;

    test.beforeEach("Prepare variables before test", async ({ page }) => {
      leftMenu = new LeftMenu(page);
    });

    test.describe("Tests creating or deleting space", async () => {
      test(
        "Basic test for checking if creating new space works correct",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/13",
          },
        },
        async ({ page, request }) => {
          const createSpaceModal = new CreateSpaceModal(page);

          await page.goto("/");
          await waitForPageLoad(page);

          await leftMenu.clickOnElement(ELEMENT.CREATE_SPACE);
          await createSpaceModal.typeSpaceName(SETUP.NEW_SPACE);
          await createSpaceModal.clickOnContinueButton();
          await createSpaceModal.clickOnButton(ELEMENT.CREATE_SPACE);
          await leftMenu.assertElementIsVisible(SETUP.NEW_SPACE);

          await ApiHooks.deleteSpaceByName(request, SETUP.NEW_SPACE);
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
          const deleteSpaceModal = new DeleteSpaceModal(page);
          const spaceContextMenu = new SpaceContextMenu(page);

          await ApiHooks.createSpaceByName(request, SETUP.NEW_SPACE);
          await page.goto("/");
          await waitForPageLoad(page);

          await leftMenu.rightClickOnElement(SETUP.NEW_SPACE);
          await spaceContextMenu.clickOnOption(OPTION.DELETE);
          await deleteSpaceModal.typeSpaceName(SETUP.NEW_SPACE);
          await deleteSpaceModal.clickOnDeleteButton();
          await deleteSpaceModal.waitForDeleting();
          await leftMenu.assertElementIsNotVisible(SETUP.NEW_SPACE);
        }
      );
    });

    test.describe("Tests running on exiting space", async () => {
      test.beforeEach("Prepare space for test and go to website", async ({ page, request }) => {
        await ApiHooks.createSpaceByName(request, SETUP.NEW_SPACE);
        await page.goto("/");
        await waitForPageLoad(page);
      });

      test.afterEach("Remove space after test", async ({ request }) => {
        await ApiHooks.deleteSpaceByName(request, SETUP.NEW_SPACE);
      });

      test(
        "Basic test for checking if renaming existing space works correct",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/31",
          },
        },
        async ({ page }) => {
          const spaceContextMenu = new SpaceContextMenu(page);
          const editSpaceNameModal = new EditSpaceNameModal(page);

          await leftMenu.rightClickOnElement(SETUP.NEW_SPACE);
          await spaceContextMenu.clickOnOption(OPTION.RENAME);
          await editSpaceNameModal.typeSpaceName(SETUP.RENAMED_SPACE);
          await editSpaceNameModal.clickOnSaveButton();
          await leftMenu.assertElementIsVisible(SETUP.RENAMED_SPACE);
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
        async ({ page }) => {
          const createSpaceModal = new CreateSpaceModal(page);

          await leftMenu.clickOnElement(ELEMENT.CREATE_SPACE);
          await createSpaceModal.typeSpaceName(SETUP.NEW_SPACE);
          await createSpaceModal.assertNameInputHasError();
          await createSpaceModal.assertErrorMessageIsDisplayed();
          await createSpaceModal.clickOnContinueButton();
          await createSpaceModal.assertModalWindowIsVisible();
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
          const spaceContextMenu = new SpaceContextMenu(page);
          const duplicateSpaceModal = new DuplicateSpaceModal(page);

          await leftMenu.rightClickOnElement(SETUP.NEW_SPACE);
          await spaceContextMenu.clickOnOption(OPTION.DUPLICATE);
          await duplicateSpaceModal.typeSpaceName(SETUP.DUPLICATED_SPACE);
          await duplicateSpaceModal.clickOnDuplicateButton();
          await leftMenu.assertElementIsVisible(SETUP.DUPLICATED_SPACE);

          await ApiHooks.deleteSpaceByName(request, SETUP.DUPLICATED_SPACE);
        }
      );
    });
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

        await page.goto("/");
        await waitForPageLoad(page);

        await test.step("Step: Create new space", async () => {
          await leftMenu.clickOnElement(ELEMENT.CREATE_SPACE);
          await createSpaceModal.typeSpaceName(SETUP.NEW_SPACE);
          await createSpaceModal.clickOnContinueButton();
          await createSpaceModal.clickOnButton(ELEMENT.CREATE_SPACE);

          await leftMenu.assertElementIsVisible(SETUP.NEW_SPACE);
        });

        await test.step("Step: Rename existing space", async () => {
          await leftMenu.rightClickOnElement(SETUP.NEW_SPACE);
          await spaceContextMenu.clickOnOption(OPTION.RENAME);
          await editSpaceNameModal.typeSpaceName(SETUP.RENAMED_SPACE);
          await editSpaceNameModal.clickOnSaveButton();

          await leftMenu.assertElementIsVisible(SETUP.RENAMED_SPACE);
        });

        await test.step("Step: Delete renamed space", async () => {
          await leftMenu.rightClickOnElement(SETUP.RENAMED_SPACE);
          await spaceContextMenu.clickOnOption(OPTION.DELETE);
          await deleteSpaceModal.typeSpaceName(SETUP.RENAMED_SPACE);
          await deleteSpaceModal.clickOnDeleteButton();
          await deleteSpaceModal.waitForDeleting();

          await leftMenu.assertElementIsNotVisible(SETUP.RENAMED_SPACE);
        });
      }
    );
  }
);
