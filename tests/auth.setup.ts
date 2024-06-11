import { test as setup, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

const authFile = 'playwright/.auth/user-session.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  const pm = new PageManager(page)
  await pm.loginPage.loginAsUser()

  // TODO: use something better
  await page.waitForURL('https://app.clickup.com/9015725111/v/l/8cp231q-375')

  await page.context().storageState({ path: authFile })
})