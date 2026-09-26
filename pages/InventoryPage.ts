import {Page, Locator, expect} from '@playwright/test'
import { ProductList } from '../components/ProductList'

export class InventoryPage {
  readonly page: Page
  readonly productList: ProductList
  readonly cartIcon: Locator

  constructor(page: Page) {
    this.page = page
    this.productList = new ProductList(page)
    this.cartIcon = page.getByTestId("shopping-cart-link")
  }

  async addProductToCart(productName: string) {
    const item = this.productList.getItem(productName)
    const addButton = item.getByRole("button", { name: "Add to cart" })
    await addButton.click()
  }

  async clickCartIcon() {
    await this.cartIcon.click()
  }

  async verifyProductAddedToCart(productName: string) {
    const item = this.productList.getItem(productName)
    const removeButton = item.getByRole("button", { name: "Remove" })
    await expect(removeButton).toBeVisible()
  }
}