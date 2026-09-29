import { test } from "../fixtures/pages"

test("Add Product to Cart", async ({ loginPage, inventoryPage }) => {
  await loginPage.goto()
  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!,
  )

  await loginPage.verifyLoginSuccess()

  await inventoryPage.addProductToCart("Sauce Labs Onesie")
  await inventoryPage.verifyProductAddedToCart("Sauce Labs Onesie")
})
