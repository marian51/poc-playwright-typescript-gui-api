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

export async function retry(action: () => Promise<void>, selector: string, page: Page, attempts: number, delay: number): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await action();

      await page.waitForSelector(selector, { timeout: delay });
      console.log(`Attempt ${attempt}: Selector appeared`);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === attempts) {
        console.error("All attempts failed.");
        throw error;
      }
      console.log(`Retrying after ${delay} ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}