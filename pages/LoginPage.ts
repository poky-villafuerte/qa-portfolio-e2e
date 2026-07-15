import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
    this.appLogo = page.getByText("Swag Labs");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.clickLoginButton();
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html",
    );
    await expect(this.appLogo).toBeVisible();
  }

  async verifyLoginFailByCredentials() {
    await this.errorMessageVisibility();
    await expect(this.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  }

  async verifyLoginFailByEmptyFields() {
    await this.errorMessageVisibility();
    await expect(this.errorMessage).toContainText(
      "Epic sadface: Username is required",
    );
  }

  private async errorMessageVisibility() {
    await expect(this.errorMessage).toBeVisible();
  }
}
