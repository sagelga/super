import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Not Found Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/this-does-not-exist-12345");
        await waitForPageLoad(page);
    });

    test("should respond with 404 status code", async ({ page }) => {
        const response = await page.goto("/en/this-does-not-exist-12345");
        expect(response?.status()).toBe(404);
    });

    test("should display the 404 numeral", async ({ page }) => {
        const numeral = page.locator("p", { hasText: /^404$/ });
        await expect(numeral).toBeVisible();
    });

    test("should show a 'back to home' link pointing to /en", async ({ page }) => {
        const homeLink = page.locator("a[href='/en']").filter({ hasText: /Go to homepage/i });
        await expect(homeLink).toBeVisible();
    });

    test("clicking the back-to-home link navigates to the home page", async ({ page }) => {
        const homeLink = page.locator("a[href='/en']").filter({ hasText: /Go to homepage/i });
        await homeLink.click();

        await waitForPageLoad(page);
        await expect(page).toHaveURL(/\/en\/?$/);

        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible();
    });
});
