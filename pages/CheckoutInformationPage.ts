import { Page, Locator, expect } from "@playwright/test"

export class CheckoutInformationPage {
  readonly page: Page
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly zipCodeField:Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameField = page.getByTestId('firstName')
    this.lastNameField = page.getByTestId('lastName')
    this.zipCodeField = page.getByTestId("postalCode")
    this.continueButton = page.getByTestId('continue')
  }

  async fillAllFields(firstName:string, lastName:string, zipCode:string){
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.zipCodeField.fill(zipCode)
  }

  async clickContinueButton(){
    await this.continueButton.click()
  }
}