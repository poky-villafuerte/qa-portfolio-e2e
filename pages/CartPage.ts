import { Page, Locator, expect } from "@playwright/test"

export class CartPage {
  readonly page: Page
  readonly inventoryItems: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryItems = page.getByTestId("inventory-item")
    this.checkoutButton = page.getByTestId("checkout")
  }

  async verifyItemIsInCart(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName })

    await expect(item).toBeVisible()
  }
  
  async clickCheckoutButton(){
    await this.checkoutButton.click()
  }
}