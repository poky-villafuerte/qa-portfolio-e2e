import { Page, Locator, expect } from "@playwright/test"

export class CheckoutOverviewPage {
  readonly page: Page
  readonly inventoryItems: Locator
  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryItems = page.getByTestId("inventory-item")
    this.finishButton = page.getByTestId("finish")
  }

  async verifyItemIsInCart(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName })

    await expect(item).toBeVisible()
  }
  async clickFinishButton() {
    await this.finishButton.click()
  }
}