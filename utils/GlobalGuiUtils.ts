import { Page } from "@playwright/test";

export async function waitForPageLoad(page: Page) {
  try {
    await page.locator("cu-web-push-notification-banner").waitFor({ timeout: 5000 });
    console.log("Notifications bar has been loaded.");
  } catch (error) {
    console.log("Notifications bar has NOT been loaded.");
  } finally {
    console.log("Continuing to run the test.");
  }
}

export async function disableConnectedSearchPopup(page: Page) {
  await page.evaluate(() => {localStorage.setItem("slapdash:cu-universal-search-modal-dismissed", "true");})
}