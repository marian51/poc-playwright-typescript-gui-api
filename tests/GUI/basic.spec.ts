import { test, expect } from "@playwright/test";

test.describe("first test", () => {
  test("first test", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Project 1 | Base Workspace (List)");
  });
});
