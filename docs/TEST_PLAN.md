# Test plan - Toolshop (Practice Software Testing)

## Scope
| Area | In scope | Tool |
|------|----------|------|
| Catalog (list, search, sort) | Yes | Playwright UI, Postman, Playwright API |
| Login / profile | Yes | Playwright UI, Postman, Playwright API |
| Cart | Yes | Playwright UI |
| Checkout & payment | Not covered (needs stateful test data) | - |
| Performance of read endpoints | Yes | JMeter |

## Approach
- **UI**: Playwright with Page Object Model, custom fixtures, `data-test` locators, no hard waits.
- **API**: Postman collection (run in CI through Newman) and Playwright `request` tests. Postman is used for readable exploratory/regression checks, Playwright API tests live next to the UI tests and share the same reporting.
- **Hybrid**: one UI test compares what the page shows with what the API returns.
- **Performance**: JMeter, 5 virtual users, 10 s ramp-up, 2 loops by default. Assertions on status code, JSON shape and a 3 s response time budget.

## Risks and assumptions
- The site is a shared public demo, so data can change and the site can be slow. Tests avoid asserting exact product counts or prices.
- Load is kept deliberately small out of respect for the host. Never raise it without permission from the site owner.

## Exit criteria
- 100% of @smoke tests pass.
- No API check fails. JMeter error rate below 1% and 95th percentile under 3 s.
