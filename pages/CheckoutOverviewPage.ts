import { Locator, Page, expect } from '@playwright/test'
import { ProductList } from '../components/ProductList'

export class CheckoutOverviewPage {
  readonly page: Page
  readonly productList: ProductList
  readonly finishButton: Locator
  readonly itemPrices: Locator
  readonly subtotalLabel: Locator
  readonly taxLabel: Locator
  readonly totalLabel: Locator

  constructor(page: Page) {
    this.page = page
    this.productList = new ProductList(page)
    this.finishButton = page.getByTestId('finish')
    this.itemPrices = page.getByTestId('inventory-item-price')
    this.subtotalLabel = page.getByTestId('subtotal-label')
    this.taxLabel = page.getByTestId('tax-label')
    this.totalLabel = page.getByTestId('total-label')
  }

  async verifyProductIsInOverview(productName: string) {
    const item = this.productList.getItem(productName)

    await expect(item).toBeVisible()
  }
  async clickFinishButton() {
    await this.finishButton.click()
  }

  async verifyTotalsAreCorrect(taxRate: number) {
    const priceTexts = await this.itemPrices.allTextContents() //take all prices in the page.
    const prices = priceTexts.map((text) => this.toAmount(text)) // we take each element from the array and make it number
    const expectedSubtotal = prices.reduce((sum, price) => sum + price, 0)

    const subtotal = this.toAmount(await this.subtotalLabel.innerText())
    const tax = this.toAmount(await this.taxLabel.innerText())
    const total = this.toAmount(await this.totalLabel.innerText())

    const expectedTax = Math.round(subtotal * taxRate * 100) / 100

    expect(subtotal).toBeCloseTo(expectedSubtotal, 2)
    expect(tax).toBeCloseTo(expectedTax, 2)
    expect(total).toBeCloseTo(subtotal + tax, 2)
  }

  private toAmount(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, '')) // get the number out of a text
  }
}
