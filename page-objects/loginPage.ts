import { Locator, Page } from "@playwright/test"

export class LoginPage {
  readonly page: Page
  readonly loginButton: Locator
  readonly emailField: Locator
  readonly passwordField: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.locator('[data-test="login-email-input"]')
    this.passwordField = page.locator('[data-test="login-password-input"]')
    this.loginButton = page.locator('[data-test="login-submit"]')
  }

  async loginAsUser() {
    let username: string = process.env.USER_NAME as string;
    let password: string = process.env.PASSWORD as string;;

    await this.emailField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click({ force: true })
  }
}