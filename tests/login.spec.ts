import {LoginPage} from '../pages/LoginPage'
import {test} from '@playwright/test'

let loginPage: LoginPage

test.beforeEach(async({page})=>{
  loginPage = new LoginPage(page)
  await loginPage.goto()
})

test('Login Successful', async()=>{
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    );
    await loginPage.verifyLoginSuccess()
})

test('Login Failed due to Invalid Username', async()=>{
    await loginPage.login(
      process.env.SAUCE_INVALID_USERNAME!,
      process.env.SAUCE_PASSWORD!);
    await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Invalid Password", async () => {
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  );
  await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Invalid Credentials", async () => {
  await loginPage.login(
    process.env.SAUCE_INVALID_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  );
  await loginPage.verifyLoginFailByCredentials();
})

test("Login Failed due to Empty Fields", async () => {
  await loginPage.clickLoginButton();
  await loginPage.verifyLoginFailByEmptyFields();
});