import { defineConfig, devices } from "@playwright/test";
import { UI_URL, API_URL } from "./tests/utils/env";

// Two projects: browser tests against the shop UI, and plain API tests against its backend.
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // it's a public demo site, so let's not hammer it
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "ui-chromium",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
        baseURL: UI_URL,
        // the Toolshop uses data-test instead of the default data-testid
        testIdAttribute: "data-test",
      },
    },
    {
      name: "api",
      testDir: "./tests/api",
      use: { baseURL: API_URL },
    },
  ],
});
