import {LoginPage} from '../pages/LoginPage'
import {test} from '@playwright/test'

test('Login Successful', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!,
    );
    await loginPage.verifyLoginSuccess()
})

test('Login Failed due to Invalid Username', async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(
      process.env.SAUCE_INVALID_USERNAME!,
      process.env.SAUCE_PASSWORD!);
    await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Invalid Password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  );
  await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Invalid Credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.SAUCE_INVALID_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  );
  await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Empty Fields", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.clickLoginButton();
  await loginPage.verifyLoginFailByEmptyFields();
});