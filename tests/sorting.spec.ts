import { test } from '../fixtures/pages'
import { SortOrder } from '../pages/InventoryPage'

const nameSortScenarios: {
  startFrom: string
  option: string
  description: string
  order: SortOrder
}[] = [
  {
    startFrom: 'za',
    option: 'az',
    description: 'Name (A to Z)',
    order: 'asc',
  },
  {
    startFrom: 'az',
    option: 'za',
    description: 'Name (Z to A)',
    order: 'desc',
  },
]
const priceSortScenarios: {
  option: string
  description: string
  order: SortOrder
}[] = [
  { option: 'lohi', description: 'Price (low to high)', order: 'asc' },
  { option: 'hilo', description: 'Price (high to low)', order: 'desc' },
]

for (const scenario of nameSortScenarios) {
  test(`Sort products by ${scenario.description}`, async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.sortBy(scenario.startFrom)
    await loggedInInventoryPage.sortBy(scenario.option)
    await loggedInInventoryPage.verifyNamesAreSorted(scenario.order)
  })
}

for (const scenario of priceSortScenarios) {
  test(`Sort products by ${scenario.description}`, async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.sortBy(scenario.option)
    await loggedInInventoryPage.verifyPricesAreSorted(scenario.order)
  })
}
