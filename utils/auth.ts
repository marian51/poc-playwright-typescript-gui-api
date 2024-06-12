import { PageManager } from '../page-objects/pageManager';
import { Page } from '@playwright/test';


export default class Auth {

  private static username: string = process.env.USER_NAME as string;
  private static password: string = process.env.PASSWORD as string;

  public static async loginAsUser(page: Page): Promise<void> {
    const pm = new PageManager(page);
    await pm.loginPage.emailField.fill(this.username);
    await pm.loginPage.passwordField.fill(this.password);
    await pm.loginPage.loginButton.click({ force: true })
  }

}