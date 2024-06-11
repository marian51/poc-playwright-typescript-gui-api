import { test, expect } from '@playwright/test'

test.describe('first test', () => {
  test.only('first test', async ({ page }) => {
    await page.goto('https://app.clickup.com/')

    // console.log(await page.context().storageState())

    await expect(page).toHaveTitle('Project 1 | Base Workspace (List)')
  })
})