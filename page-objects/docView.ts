import { Locator, Page } from "@playwright/test";
import { logClicking, logTyping } from "../utils/decorators";

export class DocView {
  private readonly page: Page;
  private readonly mainView: Locator;
  private readonly docTitleInput: Locator;
  private readonly docTitleEditableInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainView = this.page.getByTestId("dashboard-doc-main__container");
    this.docTitleInput = this.mainView.getByTestId("dashboard-doc-title__doc-title-text__");
    this.docTitleEditableInput = this.mainView.getByTestId("editable__input");
  }

  @logTyping("Doc title")
  async typeDocTitle(newDocTitle: string) {
    await this.docTitleEditableInput.fill(newDocTitle);
  }

  @logClicking("'Enter' keyboard key")
  async clickKeyBoardKey(keyboardKey: string) {
    await this.docTitleEditableInput.press(keyboardKey);
  }
}
