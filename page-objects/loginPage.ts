import { Locator, Page } from "@playwright/test";
import { PASSWORD, USER_NAME } from "../resources/constants";

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('[data-test="login-email-input"]');
    this.passwordField = page.locator('[data-test="login-password-input"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
  }

  async loginAsUser() {
    await this.emailField.fill(USER_NAME);
    await this.passwordField.fill(PASSWORD);
    await this.loginButton.click({ force: true });
  }
}
