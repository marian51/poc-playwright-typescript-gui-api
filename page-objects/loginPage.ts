import { Locator, Page } from "@playwright/test"
import dotenv from 'dotenv';
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
    let username: string;
    let password: string;

    process.env.USER_NAME === undefined ? username = '' : username = process.env.USER_NAME
    process.env.PASSWORD === undefined ? password = '' : password = process.env.PASSWORD
    
    await this.emailField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click({ force: true })
  }
}