import { test as setup } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { disableConnectedSearchPopup } from "../utils/GlobalGuiUtils";

const authFile = "playwright/.auth/user-session.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPageDynamicUrl = /https:\/\/app.clickup.com\/\d+\/*/;

  await page.goto("/login");
  await loginPage.loginAsUser();
  await page.waitForURL(mainPageDynamicUrl);
  await disableConnectedSearchPopup(page);

  await page.context().storageState({ path: authFile });
});
