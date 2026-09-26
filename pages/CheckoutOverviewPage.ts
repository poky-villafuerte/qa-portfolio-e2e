import { Page, Locator, expect } from "@playwright/test"
import { ProductList } from "../components/ProductList"

export class CheckoutOverviewPage {
  readonly page: Page
  readonly productList: ProductList
  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.productList = new ProductList(page)
    this.finishButton = page.getByTestId("finish")
  }

  async verifyItemIsInCart(productName: string) {
    const item = this.productList.getItem(productName)

    await expect(item).toBeVisible()
  }
  async clickFinishButton() {
    await this.finishButton.click()
  }
}