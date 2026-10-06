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

const emptyFieldScenarios = [
  {
    description: 'First Name is empty',
    firstName: '',
    lastName: 'Villafuerte',
    zipCode: '11801B',
    expectedError: 'Error: First Name is required',
  },
  {
    description: 'Last Name is empty',
    firstName: 'Tracy',
    lastName: '',
    zipCode: '11801B',
    expectedError: 'Error: Last Name is required',
  },
  {
    description: 'Postal Code is empty',
    firstName: 'Tracy',
    lastName: 'Villafuerte',
    zipCode: '',
    expectedError: 'Error: Postal Code is required',
  },
  {
    description: 'all fields are empty',
    firstName: '',
    lastName: '',
    zipCode: '',
    expectedError: 'Error: First Name is required',
  },
]
for (const scenario of emptyFieldScenarios) {
  test(`Checkout fails when ${scenario.description}`, async ({
    loggedInInventoryPage,
    cartPage,
    checkoutInformationPage,
  }) => {
    const productName = 'Sauce Labs Backpack'
    await loggedInInventoryPage.addProductToCart(productName)
    await loggedInInventoryPage.clickCartIcon()
    await cartPage.clickCheckoutButton()
    await checkoutInformationPage.verifyUserIsInInformationSection()

    await checkoutInformationPage.fillAllFields(
      scenario.firstName,
      scenario.lastName,
      scenario.zipCode,
    )
    await checkoutInformationPage.clickContinueButton()
    await checkoutInformationPage.verifyErrorMessage(scenario.expectedError)
  })
}

test('Order totals are calculated correctly', async ({
  loggedInInventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
}) => {
  const products = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Onesie',
  ]
  const taxRate = 0.08

  for (const product of products) {
    await loggedInInventoryPage.addProductToCart(product)
  }
  await loggedInInventoryPage.clickCartIcon()
  await cartPage.clickCheckoutButton()
  await checkoutInformationPage.fillAllFields('Tracy', 'Villafuerte', '11801')
  await checkoutInformationPage.clickContinueButton()

  for (const product of products) {
    await checkoutOverviewPage.verifyProductIsInOverview(product)
  }
  await checkoutOverviewPage.verifyTotalsAreCorrect(taxRate)
})
