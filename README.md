# QA Portfolio E2E

![Playwright Tests](https://github.com/poky-villafuerte/qa-portfolio-e2e/actions/workflows/playwright.yml/badge.svg)

End-to-end test automation portfolio built with **Playwright** and **TypeScript**, testing [saucedemo.com](https://www.saucedemo.com/).

## Tech stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- TypeScript
- Page Object Model (POM) design pattern
- GitHub Actions for CI

## Project structure

```
├── pages/          # Page Objects — locators and actions (the "how")
├── tests/          # Test specs — data and scenarios (the "what")
├── playwright.config.ts
└── .github/workflows/  # CI pipeline
```

Locators and UI interactions live in `pages/`; assertions about expected
behavior live in `verify*` methods on each page object. Tests choose the
data and call those methods — they don't know how the UI works internally.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# 1. Install dependencies
npm ci

# 2. Install browsers
npx playwright install chromium

# 3. Configure environment variables
cp .env.example .env
# then fill in .env with valid/invalid Sauce Demo credentials
```

### Running tests

```bash
npm test              # run all tests headless
npm run test:headed   # run with the browser visible
npm run report        # open the last HTML report
```

## Test scenarios

Currently covers the login flow (valid/invalid credentials, empty fields) —
see `tests/` for the up-to-date list of specs.
