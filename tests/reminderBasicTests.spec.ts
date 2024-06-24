import test from "@playwright/test";
import { faker } from "@faker-js/faker";
import { TopMenu } from "../page-objects/topMenu";
import { AvatarDropdownMenu } from "../page-objects/avatarDropdownMenu";
import { Profile } from "../page-objects/profile";
import { MyWorkTab } from "../page-objects/myWorkTab";
import { CreateReminderModal } from "../page-objects/modals/createReminderModal";

test.describe(
  "Reminder feature basic tests",
  {
    tag: "@reminder",
  },
  () => {
    const reminderName = faker.word.noun();

    test("Create new reminder", async ({ page }) => {
      const topMenu = new TopMenu(page);
      const avatarDropdownMenu = new AvatarDropdownMenu(page);
      const profile = new Profile(page);
      const myWorkTab = new MyWorkTab(page);
      const createReminderModal = new CreateReminderModal(page);

      await page.goto("/");

      await topMenu.clickAvatarIcon();
      await avatarDropdownMenu.clickSettings();
      await profile.clickMyWorkTab();
      await myWorkTab.hoverTodayListTitle();
      await myWorkTab.clickCreateReminderButton();
      await createReminderModal.typeNameInput(reminderName);
      await createReminderModal.clickSaveButton();

      await myWorkTab.assertReminderIsVisible(reminderName);
    });
  }
);
