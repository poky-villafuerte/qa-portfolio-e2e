import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage"
import { CheckoutInformationPage} from "../pages/CheckoutInformationPage"
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage"
import { test } from "@playwright/test"


test('Checkout Flow', async ({page})=>{
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutInformationPage = new CheckoutInformationPage(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    const checkoutCompletePage = new CheckoutCompletePage(page)

    const productName = 'Sauce Labs Backpack'
    const firstName= 'Tracy'
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
    await checkoutInformationPage.fillAllFields(firstName, lastName, zipCode)
    await checkoutInformationPage.clickContinueButton()
    await checkoutOverviewPage.verifyItemIsInCart(productName)
    await checkoutOverviewPage.clickFinishButton()
    await checkoutCompletePage.verifyCheckoutWasCompleted()
})