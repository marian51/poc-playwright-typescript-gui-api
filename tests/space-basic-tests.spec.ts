import test from "@playwright/test";
import { LeftMenu } from "../page-objects/leftMenu";
import { CreateSpaceModal } from "../page-objects/modals/createSpaceModal";
import { ApiHooks } from "../api-utils/apiHooks";

test.only(
  "Basic test for checking if creating new space works correct",
  {
    tag: "@space",
  },
  async ({ page, request }) => {
    const leftMenu = new LeftMenu(page)
    const createSpaceModal = new CreateSpaceModal(page)
    const newSpaceName = "GUI TEST new space"

    await page.goto("/")

    await leftMenu.clickOnElement("Create Space")
    await createSpaceModal.typeSpaceName(newSpaceName)
    await createSpaceModal.clickOnContinueButton()
    await createSpaceModal.clickOnButton("Create Space")
    await leftMenu.assertElementIsVisible(newSpaceName)

    await ApiHooks.deleteSpaceByName(request, newSpaceName)
  }
);
