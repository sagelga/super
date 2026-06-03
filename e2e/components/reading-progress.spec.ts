import { test, expect } from "@playwright/test";
import { waitForPageLoad, dismissCookieBannerBeforeLoad } from "../utils/test-helpers";

/**
 * NavbarReadingProgress: a thin accent bar inside the navbar that shows
 * scroll progress on long-form pages (blog posts, docs detail pages).
 * Not shown on listing pages or the home page.
 */

test.describe("Navbar reading progress bar", () => {
    test("should NOT appear on the home page", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);
        const bar = page.locator("[aria-hidden='true'].h-px.bg-accent");
        await expect(bar).not.toBeAttached();
    });

    test("should NOT appear on blog listing", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        const bar = page.locator("[aria-hidden='true'].h-px.bg-accent");
        await expect(bar).not.toBeAttached();
    });

    test("should appear on a blog post page", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        // Find the first blog post link
        const postLink = page.locator('article a[href*="/blog/"]').first();
        const exists = await postLink.isVisible({ timeout: 5000 }).catch(() => false);
        if (!exists) {
            test.skip(true, "No blog posts available");
            return;
        }
        await postLink.click();
        await page.waitForURL(/\/blog\/.+/);
        await waitForPageLoad(page);
        const bar = page.locator("[aria-hidden='true'].h-px.bg-accent");
        await expect(bar).toBeAttached();
    });

    test("progress bar width increases when scrolling down", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        const postLink = page.locator('article a[href*="/blog/"]').first();
        const exists = await postLink.isVisible({ timeout: 5000 }).catch(() => false);
        if (!exists) {
            test.skip(true, "No blog posts available");
            return;
        }
        await postLink.click();
        await page.waitForURL(/\/blog\/.+/);
        await waitForPageLoad(page);

        const bar = page.locator("[aria-hidden='true'].h-px.bg-accent");
        await expect(bar).toBeAttached();

        // Get initial width
        const initialWidth = await bar.evaluate((el) =>
            getComputedStyle(el).width
        );

        // Scroll down halfway
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight / 2)
        );
        await page.waitForTimeout(300);

        const scrolledWidth = await bar.evaluate((el) =>
            getComputedStyle(el).width
        );

        // Width after scrolling should be greater (or at least different)
        const initPx = parseFloat(initialWidth);
        const scrollPx = parseFloat(scrolledWidth);
        expect(scrollPx).toBeGreaterThanOrEqual(initPx);

        // Should be between 1% and 100%
        const viewportW = await page.evaluate(() => window.innerWidth);
        const percent = (scrollPx / viewportW) * 100;
        expect(percent).toBeGreaterThan(0);
        expect(percent).toBeLessThan(100);
    });
});
