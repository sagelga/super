import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Privacy Policy Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/privacy-policy");
        await waitForPageLoad(page);
    });

    test("should load with a title", async ({ page }) => {
        await expect(page).toHaveTitle(/.*/);
    });

    test("should display the h1 page title", async ({ page }) => {
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        await expect(h1).toContainText(/privacy/i);
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

test.describe("Privacy Policy Page - Language Support", () => {
    test("should be accessible in English at /en/privacy-policy", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/privacy-policy");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should be accessible in Thai at /privacy-policy (default locale)", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/privacy-policy");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should be accessible in Chinese at /zh/privacy-policy", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/zh/privacy-policy");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });
});
