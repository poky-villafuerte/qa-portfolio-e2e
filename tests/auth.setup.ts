import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

setup('Authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!,
  )
  await loginPage.verifyLoginSuccess()
  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
