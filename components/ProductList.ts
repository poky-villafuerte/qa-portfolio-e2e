import { Page, Locator } from "@playwright/test"

export class ProductList {
    readonly page: Page
    readonly items: Locator

    constructor(page:Page){
        this.page = page
        this.items = page.getByTestId("inventory-item")
    }

    getItem(productName:string):Locator{
        const item = this.items.filter({ hasText: productName })
        return item
    }
}