import { Page, Locator, expect } from "@playwright/test"
import { ProductList } from "../components/ProductList"

export class CartPage {
  readonly page: Page
  readonly productList: ProductList
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.productList = new ProductList(page)
    this.checkoutButton = page.getByTestId("checkout")
  }

  async verifyItemIsInCart(productName: string) {
    const item = this.productList.getItem(productName)

    await expect(item).toBeVisible()
  }
  
  async clickCheckoutButton(){
    await this.checkoutButton.click()
  }
}