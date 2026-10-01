import { Locator, Page, expect } from '@playwright/test'
import { ProductList } from '../components/ProductList'

export type SortOrder = 'asc' | 'desc' //Only accepts these two values

export class InventoryPage {
  readonly page: Page
  readonly productList: ProductList
  readonly cartIcon: Locator
  readonly sortDropdown: Locator
  readonly productNames: Locator
  readonly productPrices: Locator

  constructor(page: Page) {
    this.page = page
    this.productList = new ProductList(page)
    this.cartIcon = page.getByTestId('shopping-cart-link')
    this.sortDropdown = page.getByTestId('product-sort-container')
    this.productNames = page.getByTestId('inventory-item-name')
    this.productPrices = page.getByTestId('inventory-item-price')
  }

  async addProductToCart(productName: string) {
    const item = this.productList.getItem(productName)
    const addButton = item.getByRole('button', { name: 'Add to cart' })
    await addButton.click()
  }

  async clickCartIcon() {
    await this.cartIcon.click()
  }

  async verifyProductAddedToCart(productName: string) {
    const item = this.productList.getItem(productName)
    const removeButton = item.getByRole('button', { name: 'Remove' })
    await expect(removeButton).toBeVisible()
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option)
  }

  async verifyNamesAreSorted(order: SortOrder) {
    const names = await this.productNames.allTextContents() //Capture all Product Names after selecting the sort option
    expect(names.length).toBeGreaterThanOrEqual(2) // to compare we need at least 2

    const expected = [...names].sort((a, b) => a.localeCompare(b)) // making a copy of all products and sorting them out alphabetically
    if (order === 'desc') expected.reverse() //if asked from Z-> A it will sort it in reverse

    expect(names).toEqual(expected) // After all it should be the same
  }

  async verifyPricesAreSorted(order: SortOrder) {
    const texts = await this.productPrices.allTextContents() //Capture all Product Prices after selecting the sort option
    const prices = texts.map((text) => parseFloat(text.replace('$', ''))) // this will transform every text in number and will remove the $, so they are just numbers
    expect(prices.length).toBeGreaterThanOrEqual(2) // At least two prices in order to compare

    const expected = [...prices].sort((a, b) => a - b) // comparing and sorting prices out
    if (order === 'desc') expected.reverse() //if high to low is selected, it will sort it in reverse

    expect(prices).toEqual(expected) // After all they should be equal
  }
}
