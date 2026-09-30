import { test } from '../fixtures/pages'

test('Add Product to Cart', async ({ loggedInInventoryPage }) => {
  const productName = 'Sauce Labs Onesie'
  await loggedInInventoryPage.addProductToCart(productName)
  await loggedInInventoryPage.verifyProductAddedToCart(productName)
})
