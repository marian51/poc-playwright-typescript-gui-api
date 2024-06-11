import { Locator, Page } from "@playwright/test"
import user from "../playwright/.auth/user.json"

export class LoginPage {
  readonly page: Page
  readonly loginButton: Locator
  readonly emailField: Locator
  readonly passwordField: Locator

  constructor (page: Page) {
    this.page = page
    this.emailField = page.locator('[data-test="login-email-input"]')
    this.passwordField = page.locator('[data-test="login-password-input"]')
    this.loginButton = page.locator('[data-test="login-submit"]')
  }

  async loginAsUser() {
    await this.emailField.fill(user.username)
    await this.passwordField.fill(user.password)
    await this.loginButton.click({ force: true })
  }
}