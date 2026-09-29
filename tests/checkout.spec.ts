import { test } from '../fixtures/pages'

test('Checkout Flow', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  const productName = 'Sauce Labs Backpack'
  const firstName = 'Tracy'
  const lastName = 'Villafuerte'
  const zipCode = '11801B'

  await loginPage.goto()
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!,
  )

  await loginPage.verifyLoginSuccess()
  await inventoryPage.addProductToCart(productName)
  await inventoryPage.clickCartIcon()
  await cartPage.verifyItemIsInCart(productName)
  await cartPage.clickCheckoutButton()
  await checkoutInformationPage.verifyUserIsInInformationSection()
  await checkoutInformationPage.fillAllFields(firstName, lastName, zipCode)
  await checkoutInformationPage.verifyFieldsAreFilled(
    firstName,
    lastName,
    zipCode,
  )
  await checkoutInformationPage.clickContinueButton()
  await checkoutOverviewPage.verifyProductIsInOverview(productName)
  await checkoutOverviewPage.clickFinishButton()
  await checkoutCompletePage.verifyCheckoutWasCompleted()
})
