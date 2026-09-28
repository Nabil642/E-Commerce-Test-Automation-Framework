# Toolshop QA Suite

End-to-end QA automation for the public demo shop [Practice Software Testing](https://practicesoftwaretesting.com) and its API.

| Layer | Tool | What it covers |
|-------|------|----------------|
| UI automation | Playwright + TypeScript | Search, sorting, login, cart (Page Object Model + fixtures) |
| API automation | Playwright `request` + Postman/Newman | Products, search, brands, categories, login, profile |
| Performance | Apache JMeter | Browse + login journey under light load, with assertions and HTML dashboard |
| CI | GitHub Actions | Runs everything on every push and stores reports |

## Project layout
```
tests/
  pages/       page objects (HomePage, ProductPage, CartPage, LoginPage)
  ui/          browser specs
  api/         API specs
  fixtures.ts  shared fixtures
postman/       collection + environment (runs with Newman)
jmeter/        test plan, CSV data, run scripts
docs/          test plan
```

## Setup
Requirements: Node.js 18+, Java 8+ and [Apache JMeter 5.6.x](https://jmeter.apache.org/download_jmeter.cgi) on your PATH.

```bash
npm install
npx playwright install chromium
```

## Run it
```bash
npm test               # all Playwright tests (UI + API)
npm run test:ui        # browser tests only
npm run test:api       # API tests only
npm run test:headed    # watch the browser
npm run report         # open the HTML report

npm run postman        # Postman collection through Newman -> reports/postman/report.html

./jmeter/run-load-test.sh 5 10 2      # Linux / macOS  (users, ramp-up seconds, loops)
jmeter\run-load-test.bat 5 10 2       # Windows
```
Open `jmeter/results/report/index.html` for the JMeter dashboard.

To use Postman's app instead, import both files from `postman/`, pick the environment, and run the collection.

## Design decisions worth talking about
- **Page Object Model + fixtures** keep specs short and locators in one place.
- **No `sleep`** anywhere. Tests wait on network responses (`waitForResponse`) or use auto-retrying assertions (`toPass`).
- **Stable locators**: `getByTestId` with the site's `data-test` attribute, plus roles/text where it makes sense.
- **Hybrid check** compares UI output with API output to catch front/back-end drift.
- **JMeter** uses CSV-driven data, JSON extraction for the auth token, response/JSON/duration assertions and property-based parameters (`-Jusers=`), so the same plan works locally and in CI.

## If a locator fails
The demo site is updated from time to time. Run `npx playwright codegen https://practicesoftwaretesting.com` and copy the new locator into the matching page object.


