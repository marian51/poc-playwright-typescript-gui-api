import test from "@playwright/test";
import { LeftMenu } from "../page-objects/leftMenu";
import { CreateSpaceModal } from "../page-objects/modals/createSpaceModal";

test.only(
    "Basic test for checking if creating new space works correct",
    {
        tag: "@space",
    },
    async ({ page }) => {
        const leftMenu = new LeftMenu(page)
        const createSpaceModal = new CreateSpaceModal(page)
        const newSpaceName = "GUI TEST new space"

        await page.goto("/")

        await leftMenu.clickOnElement("Create Space")
        await createSpaceModal.typeSpaceName(newSpaceName)
        await createSpaceModal.clickOnContinueButton()
        await createSpaceModal.clickOnButton("Create Space")
        await leftMenu.assertElementIsVisible(newSpaceName)
    }
);
