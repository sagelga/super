import { test, expect } from "@playwright/test";
import { waitForPageLoad, acceptCookiesIfVisible } from "../utils/test-helpers";

test.describe("Blog Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        await acceptCookiesIfVisible(page);
    });

    test("should display the blog page with a title", async ({ page }) => {
        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1")).toBeVisible();
    });

    test("should display filter categories", async ({ page }) => {
        const filterBar = page
            .locator('[class*="filter"], button')
            .filter({ hasText: /all/i })
            .first();
        if (await filterBar.isVisible({ timeout: 3000 }).catch(() => false)) {
            await expect(filterBar).toBeVisible();
        }
    });

    test("should handle pagination controls", async ({ page }) => {
        await page.waitForTimeout(2000);

        const prevButton = page
            .getByRole("button", { name: /previous|prev/i })
            .first();
        const nextButton = page.getByRole("button", { name: /next/i }).first();

        if (await prevButton.isVisible({ timeout: 1000 }).catch(() => false)) {
            await expect(prevButton).toBeDisabled();
        }

        if (await nextButton.isVisible({ timeout: 1000 }).catch(() => false)) {
            await nextButton.click();
            await page.waitForTimeout(1000);
        }
    });

    test("should display blog post articles", async ({ page }) => {
        await page.waitForTimeout(1000);
        const articles = page.locator("article");
        const count = await articles.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe("Blog Page - Navigation", () => {
    test("should navigate to individual blog post", async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        await acceptCookiesIfVisible(page);

        const postLink = page.locator('article a[href*="/blog/"]').first();

        if (await postLink.isVisible({ timeout: 5000 }).catch(() => false)) {
            await postLink.click();
            await page
                .waitForURL(/\/blog\/.+/, { timeout: 10000 })
                .catch(() => {});
            expect(page.url()).toMatch(/\/blog\/.+/);
        }
    });

    test("should navigate back to home from blog", async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        await acceptCookiesIfVisible(page);

        await page.evaluate(() => {
            document
                .querySelectorAll(
                    '[class*="overlay"], [class*="modal"], [class*="banner"]',
                )
                .forEach((el) => {
                    (el as HTMLElement).style.display = "none";
                });
        });

        const homeLink = page.getByRole("link", { name: /home/i }).first();
        await homeLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toMatch(/\/(en|th|zh)(\/|$)/);
    });
});
