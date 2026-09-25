import { Page, Locator, expect } from "@playwright/test"

export class CheckoutCompletePage {
  readonly page: Page
  readonly completeMessage: Locator
  readonly backToHomeButton: Locator
  readonly pdfButton:Locator

  constructor(page: Page) {
    this.page = page
    this.completeMessage = page.getByTestId("complete-header")
    this.backToHomeButton = page.getByTestId("back-to-products")
    this.pdfButton = page.getByTestId("generate-pdf-order")
  }

  async verifyCheckoutWasCompleted(){
    await expect(this.completeMessage).toBeVisible()
    await expect(this.completeMessage).toHaveText("Thank you for your order!")
    await expect(this.backToHomeButton).toBeVisible()
    await expect(this.pdfButton).toBeVisible()
  }
}