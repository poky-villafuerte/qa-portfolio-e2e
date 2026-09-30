import { test } from '../fixtures/pages'

test('Checkout Flow', async ({
  loggedInInventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  const productName = 'Sauce Labs Backpack'
  const firstName = 'Tracy'
  const lastName = 'Villafuerte'
  const zipCode = '11801B'

  await loggedInInventoryPage.addProductToCart(productName)
  await loggedInInventoryPage.clickCartIcon()
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
