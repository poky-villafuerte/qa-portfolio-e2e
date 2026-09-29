import { test } from "../fixtures/pages"

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto()
})

test("Login Successful", async ({ loginPage }) => {
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!,
  )
  await loginPage.verifyLoginSuccess()
})

test("Login Failed due to Invalid Username", async ({ loginPage }) => {
  await loginPage.login(
    process.env.SAUCE_INVALID_USERNAME!,
    process.env.SAUCE_PASSWORD!,
  )
  await loginPage.verifyLoginFailByCredentials()
})

test("Login Failed due to Invalid Password", async ({ loginPage }) => {
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  )
  await loginPage.verifyLoginFailByCredentials()
})

test("Login Failed due to Invalid Credentials", async ({ loginPage }) => {
  await loginPage.login(
    process.env.SAUCE_INVALID_USERNAME!,
    process.env.SAUCE_INVALID_PASSWORD!,
  )
  await loginPage.verifyLoginFailByCredentials()
})

test("Login Failed due to Empty Fields", async ({ loginPage }) => {
  await loginPage.clickLoginButton()
  await loginPage.verifyLoginFailByEmptyFields()
})
