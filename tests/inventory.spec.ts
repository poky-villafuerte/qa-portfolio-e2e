import {LoginPage} from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'
import {test} from '@playwright/test'

test('Add Product to Cart', async ({page})=>{
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)

    await loginPage.goto()
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!)

    await loginPage.verifyLoginSuccess()

    await inventoryPage.addProductToCart('Sauce Labs Onesie')
    await inventoryPage.verifyProductAddedToCart('Sauce Labs Onesie')

})