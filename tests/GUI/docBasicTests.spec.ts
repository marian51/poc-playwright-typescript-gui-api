import test from "@playwright/test";
import { LeftMenu } from "../../page-objects/leftMenu";
import { SpaceContextMenu } from "../../page-objects/context-menus/spaceContextMenu";
import { SpacePlusMenu } from "../../page-objects/context-menus/spacePlusMenu";
import { ApiHooks } from "../../api-utils/apiHooks";
import { DocView } from "../../page-objects/docView";
import { faker } from "@faker-js/faker";
import { ApiUtils } from "../../api-utils/apiUtils";
import { DocContextMenu } from "../../page-objects/context-menus/docContextMenu";
import waitForPageLoad from "../../utils/GlobalGuiUtils";

test.describe(
  "UI tests for checking basic doc functionalities",
  {
    tag: ["@doc", "@one"],
    annotation: {
      type: "test type",
      description: "One basic test",
    },
  },
  async () => {
    const newSpaceName = "GUI TEST new space";
    let leftMenu: LeftMenu;
    let newDocName = faker.commerce.productName();

    test.beforeAll("Prepare environment before tests", async ({ request }) => {
      await ApiHooks.createSpaceByName(request, newSpaceName);
    });

    test.afterAll("Prepare environment before tests", async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, newSpaceName);
    });

    test.beforeEach(async ({ page }) => {
      leftMenu = new LeftMenu(page);
    });

    test.describe("Tests creating or deleting doc", async () => {
      test(
        "Basic test for creating new doc in existing space",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page, request }) => {
          const spaceContextMenu = new SpaceContextMenu(page);
          const spacePlusMenu = new SpacePlusMenu(page);
          const docView = new DocView(page);

          await page.goto("/");
          await waitForPageLoad(page);

          await leftMenu.rightClickOnElement(newSpaceName);
          await spaceContextMenu.clickOnOption("Create new");
          await spacePlusMenu.clickOnOption("Doc");
          await docView.typeDocTitle(newDocName);
          await docView.clickKeyBoardKey("Enter");

          await leftMenu.assertElementIsVisible(newDocName);

          await ApiHooks.deleteDocsByName(request, newDocName);
        }
      );

      test(
        "Basic test for deleting existing doc in existing space",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page, request }) => {
          const docContextMenu = new DocContextMenu(page);

          await ApiHooks.createNewDocInSpace(request, newDocName, await ApiUtils.getSpaceIdByName(request, newSpaceName));

          await page.goto("/");
          await waitForPageLoad(page);

          await leftMenu.clickOnElement(newSpaceName);
          await leftMenu.rightClickOnElement(newDocName);
          await docContextMenu.clickOnOption("Delete");

          await leftMenu.assertElementIsNotVisible(newDocName);
        }
      );
    });

    test.describe("Tests running on existing doc", async () => {
      test.beforeEach("Prepare doc for test and go to website", async ({ page, request }) => {
        await ApiHooks.createNewDocInSpace(request, newDocName, await ApiUtils.getSpaceIdByName(request, newSpaceName));
        await page.goto("/");
        await waitForPageLoad(page);
      });

      test.afterEach("Remove doc after test", async ({ request }) => {
        await ApiHooks.deleteDocsByName(request, newDocName);
      });

      test(
        "Basic test for renaming existing doc in existing space",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page }) => {
          const docContextMenu = new DocContextMenu(page);
          const renamedDocName = faker.commerce.productName();

          await leftMenu.clickOnElement(newSpaceName);
          await leftMenu.rightClickOnElement(newDocName);
          await docContextMenu.clickOnOption("Rename");
          await leftMenu.typeIntoRenameDocInput(renamedDocName);
          await leftMenu.clickKeyBoardKey("Enter");

          await leftMenu.assertElementIsVisible(renamedDocName);
          newDocName = renamedDocName;
        }
      );

      test(
        "Test for checking if changing doc title changes doc name",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page }) => {
          const docView = new DocView(page);
          const renamedDocTitle = faker.commerce.productName();

          await leftMenu.clickOnElement(newSpaceName);
          await page.getByRole("button", { name: "Add List" }).waitFor();
          await leftMenu.clickOnElement(newDocName);
          await docView.typeDocTitle(renamedDocTitle);
          await docView.clickKeyBoardKey("Enter");

          await leftMenu.assertElementIsVisible(renamedDocTitle);
          await leftMenu.assertElementIsNotVisible(newDocName);
          newDocName = renamedDocTitle;
        }
      );

      test(
        "Basic test for creating new doc with the same name",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page }) => {
          const spaceContextMenu = new SpaceContextMenu(page);
          const spacePlusMenu = new SpacePlusMenu(page);
          const docView = new DocView(page);

          await leftMenu.rightClickOnElement(newSpaceName);
          await spaceContextMenu.clickOnOption("Create new");
          await spacePlusMenu.clickOnOption("Doc");
          await docView.typeDocTitle(newDocName);
          await docView.clickKeyBoardKey("Enter");

          await leftMenu.assertVisibleElementsNumber(newDocName, 2);
        }
      );

      test(
        "Basic test for duplicating existing doc in existing space",
        {
          annotation: {
            type: "issue",
            description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
          },
        },
        async ({ page, request }) => {
          const docContextMenu = new DocContextMenu(page);

          await leftMenu.clickOnElement(newSpaceName);
          await leftMenu.rightClickOnElement(newDocName);
          await docContextMenu.clickOnOption("Duplicate");

          await leftMenu.assertElementIsVisible(newDocName + " (copy)");

          await ApiHooks.deleteDocsByName(request, newDocName + " (copy)");
        }
      );
    });
  }
);
