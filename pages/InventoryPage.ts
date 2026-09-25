import {Page, Locator, expect} from '@playwright/test'

export class InventoryPage {
    readonly page: Page
    readonly inventoryItems: Locator
    readonly cartIcon: Locator

    constructor(page: Page){
        this.page = page
        this.inventoryItems = page.getByTestId('inventory-item')
        this.cartIcon = page.getByTestId('shopping-cart-link')
    }

    async addProductToCart(productName: string){
        const item = this.inventoryItems.filter({hasText: productName})
        const addButton = item.getByRole('button', { name: 'Add to cart' }) 
        await addButton.click()
    }

    async clickCartIcon(){
        await this.cartIcon.click()
    }
    
    async verifyProductAddedToCart(productName: string){
        const item = this.inventoryItems.filter({hasText: productName})
        const removeButton = item.getByRole('button', { name: 'Remove' }) 
        await expect(removeButton).toBeVisible()    
    }


}