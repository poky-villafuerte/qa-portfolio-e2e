import { Locator, Page, expect } from '@playwright/test'

export class CheckoutInformationPage {
  readonly page: Page
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly zipCodeField: Locator
  readonly continueButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameField = page.getByTestId('firstName')
    this.lastNameField = page.getByTestId('lastName')
    this.zipCodeField = page.getByTestId('postalCode')
    this.continueButton = page.getByTestId('continue')
    this.errorMessage = page.getByTestId('error')
  }

  async verifyUserIsInInformationSection() {
    await expect(this.page).toHaveURL('/checkout-step-one.html')
    await expect(this.firstNameField).toBeVisible()
    await expect(this.lastNameField).toBeVisible()
    await expect(this.zipCodeField).toBeVisible()
  }

  async fillAllFields(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.zipCodeField.fill(zipCode)
  }

  async verifyFieldsAreFilled(
    firstName: string,
    lastName: string,
    zipCode: string,
  ) {
    await expect(this.firstNameField).toHaveValue(firstName)
    await expect(this.lastNameField).toHaveValue(lastName)
    await expect(this.zipCodeField).toHaveValue(zipCode)
  }

  async clickContinueButton() {
    await this.continueButton.click()
  }

  async verifyErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toHaveText(message)
  }
}
