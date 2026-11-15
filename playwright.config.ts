import { defineConfig, devices } from "@playwright/test";

const CONSENT_VERSION = "2026-04-19";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Seed consent before any test runs. Without the matching consentVersion the
// app discards the stored value and shows the bottom sheet, whose overlay
// intercepts every click. The cookie-consent spec clears this explicitly.
const CONSENT_STATE = {
    cookies: [],
    origins: [
        {
            origin: new URL(BASE_URL).origin,
            localStorage: [
                {
                    name: "cookie_consent",
                    value: JSON.stringify({
                        functional: true,
                        analytics: false,
                        consentGiven: true,
                        consentTimestamp: Date.now(),
                        consentVersion: CONSENT_VERSION,
                    }),
                },
            ],
        },
    ],
};

export default defineConfig({
    testDir: "./",
    testMatch: ["e2e/**/*.spec.ts", "src/__tests__/responsive.test.ts"],
    // Build output copies the source tree (Next standalone / OpenNext), so the
    // specs exist again under .next/ and .open-next/. Without this, every spec
    // runs three times against a running production server in CI.
    testIgnore: ["**/.next/**", "**/.open-next/**", "**/node_modules/**"],
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? "100%" : undefined,
    reporter: "html",
    use: {
        baseURL: BASE_URL,
        storageState: CONSENT_STATE,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: process.env.BASE_URL
        ? undefined
        : {
              // CI: uses pre-built .next artifact from the build step in workflow.
              // Local: falls back to dev server (no build required).
              command: process.env.CI ? "npm run start" : "npm run dev",
              url: "http://localhost:3000",
              reuseExistingServer: !process.env.CI,
              timeout: 120_000,
              stdout: "pipe",
              stderr: "pipe",
          },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
        },
        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"] },
        },
    ],
});
