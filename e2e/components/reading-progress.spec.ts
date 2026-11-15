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
        const bar = page.locator(".navbar-progress");
        await expect(bar).toHaveCount(0);
    });

    test("should NOT appear on blog listing", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        const bar = page.locator(".navbar-progress");
        await expect(bar).toHaveCount(0);
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
        const bar = page.locator(".navbar-progress");
        await expect(bar).toHaveCount(1);
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

        const bar = page.locator(".navbar-progress");
        await expect(bar).toHaveCount(1);

        // Nothing to measure if the post fits in one viewport.
        const scrollable = await page.evaluate(
            () =>
                document.documentElement.scrollHeight - window.innerHeight
        );
        if (scrollable <= 0) {
            test.skip(true, "Blog post is not scrollable");
            return;
        }

        const widthOf = async () =>
            parseFloat(
                await bar.evaluate((el) => getComputedStyle(el).width)
            );
        const initialWidth = await widthOf();

        // Scroll down halfway and wait for the scroll handler to run.
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight / 2)
        );
        await expect
            .poll(() => page.evaluate(() => window.scrollY))
            .toBeGreaterThan(0);

        // Width after scrolling should be greater (or at least different).
        const scrolledWidth = await widthOf();
        expect(scrolledWidth).toBeGreaterThanOrEqual(initialWidth);

        // Should be between 1% and 100% of the viewport.
        const viewportW = await page.evaluate(() => window.innerWidth);
        await expect
            .poll(async () => ((await widthOf()) / viewportW) * 100)
            .toBeGreaterThan(0);
        expect((scrolledWidth / viewportW) * 100).toBeLessThan(100);
    });
});
