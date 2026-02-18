import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {

    private readonly _loginLink = this.page.locator('//a[.="Login"]');
    private readonly _emailInput = this.page.locator('[name="Input.Email"]');
    private readonly _passwordInput = this.page.locator('[name="Input.Password"]');
    private readonly _loginBtn = this.page.locator('#login-submit');

    constructor(page: Page) {
        super(page);
    }

    async clickLoginLink() {
        await this.clickOnElement(this._loginLink);
    }

    async login(email: string, password: string) {
        await this.enterTxt(this._emailInput, email);
        await this.enterTxt(this._passwordInput, password);
        await this.clickOnElement(this._loginBtn);
    }

}