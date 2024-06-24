import test from "@playwright/test";
import { LeftMenu } from "../page-objects/leftMenu";
import { SpaceContextMenu } from "../page-objects/context-menus/spaceContextMenu";
import { SpacePlusMenu } from "../page-objects/context-menus/spacePlusMenu";
import { ApiHooks } from "../api-utils/apiHooks";
import { DocView } from "../page-objects/docView";
import { faker } from "@faker-js/faker";
import { ApiUtils } from "../api-utils/apiUtils";
import { DocContextMenu } from "../page-objects/context-menus/docContextMenu";

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
    const newDocName = faker.commerce.productName();

    test.beforeEach("Prepare environment before tests", async ({ request }) => {
      await ApiHooks.createSpaceByName(request, newSpaceName);
    });

    test.afterEach("Prepare environment before tests", async ({ request }) => {
      await ApiHooks.deleteSpaceByName(request, newSpaceName);
    });

    test(
      "Basic test for creating new doc in existing space",
      {
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
        },
      },
      async ({ page }) => {
        const leftMenu = new LeftMenu(page);
        const spaceContextMenu = new SpaceContextMenu(page);
        const spacePlusMenu = new SpacePlusMenu(page);
        const docView = new DocView(page);

        await page.goto("/");
        await page.locator("cu-web-push-notification-banner").waitFor();

        await leftMenu.rightClickOnElement(newSpaceName);
        await spaceContextMenu.clickOnOption("Create new");
        await spacePlusMenu.clickOnOption("Doc");
        await docView.typeDocTitle(newDocName);
        await docView.clickKeyBoardKey("Enter");

        await leftMenu.assertElementIsVisible(newDocName);
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
        const leftMenu = new LeftMenu(page);
        const docContextMenu = new DocContextMenu(page);

        await ApiHooks.createNewDocInSpace(request, newDocName, await ApiUtils.getSpaceIdByName(request, newSpaceName));

        await page.goto("/");
        await page.locator("cu-web-push-notification-banner").waitFor();

        await leftMenu.clickOnElement(newSpaceName);
        await leftMenu.rightClickOnElement(newDocName);
        await docContextMenu.clickOnOption("Delete");

        await leftMenu.assertElementIsNotVisible(newDocName);
      }
    );

    test(
      "@this Basic test for duplicating existing doc in existing space",
      {
        annotation: {
          type: "issue",
          description: "https://github.com/marian51/poc-playwright-typescript-gui-api/issues/68",
        },
      },
      async ({ page, request }) => {
        const leftMenu = new LeftMenu(page);
        const docContextMenu = new DocContextMenu(page);

        await ApiHooks.createNewDocInSpace(request, newDocName, await ApiUtils.getSpaceIdByName(request, newSpaceName));

        await page.goto("/");
        await page.locator("cu-web-push-notification-banner").waitFor();

        await leftMenu.clickOnElement(newSpaceName);
        await leftMenu.rightClickOnElement(newDocName);
        await docContextMenu.clickOnOption("Duplicate");

        await leftMenu.assertElementIsVisible(newDocName + " (copy)");
      }
    )
  }
);
