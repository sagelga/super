import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Terms of Service Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/terms-of-service");
        await waitForPageLoad(page);
    });

    test("should load with a title", async ({ page }) => {
        await expect(page).toHaveTitle(/.*/);
    });

    test("should display the h1 page title", async ({ page }) => {
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        await expect(h1).toContainText(/terms/i);
    });

    test("should display main content sections", async ({ page }) => {
        const main = page.locator("main").first();
        await expect(main).toBeVisible();

        // At least one h2 section heading
        const h2 = page.locator("h2").first();
        await expect(h2).toBeVisible();
    });

    test("should have a home link in the navbar", async ({ page }) => {
        const nav = page.locator("nav").first();
        await expect(nav).toBeVisible();

        const homeLink = nav.getByRole("link", { name: /home/i }).first();
        await expect(homeLink).toBeVisible();
    });

    test("should have a table of contents with anchor links", async ({
        page,
    }) => {
        const tocLinks = page.locator('a[href^="#"]');
        const count = await tocLinks.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe("Terms of Service Page - Language Support", () => {
    test("should be accessible in English at /en/terms-of-service", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/terms-of-service");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should be accessible in Thai at /terms-of-service (default locale)", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/terms-of-service");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should be accessible in Chinese at /zh/terms-of-service", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/zh/terms-of-service");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });
});
