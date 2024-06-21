import test from "@playwright/test";
import { faker } from "@faker-js/faker";
import { TopMenu } from "../page-objects/topMenu";
import { AvatarDropdownMenu } from "../page-objects/avatarDropdownMenu";
import { Profile } from "../page-objects/profile";

test.describe.serial(
  "Reminder feature tests",
  {
    tag: "@reminder",
  },
  () => {
    const reminderText = faker.word.verb();

    test("Create new reminder", async ({ page }) => {
      await page.goto("/");

      const topMenuPage = new TopMenu(page);
      await topMenuPage.clickAvatarIcon();
      const avatarDropdownMenuPage = new AvatarDropdownMenu(page);
      await avatarDropdownMenuPage.clickSettings();
      const profilePage = new Profile(page);
      await profilePage.clickMyWorkTab();
    });
  }
);
