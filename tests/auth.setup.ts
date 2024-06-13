import { test as setup, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

const authFile = 'playwright/.auth/user-session.json';

setup('authenticate', async ({ page }) => {
  const pm = new PageManager(page);
  const mainPageDynamicUrl = /https:\/\/app.clickup.com\/\d+\/*/;

  await page.goto('/login');
  await pm.loginPage.loginAsUser();
  await page.waitForURL(mainPageDynamicUrl);

  await page.context().storageState({ path: authFile });
});