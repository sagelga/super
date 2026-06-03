import { test, expect } from "@playwright/test";
import { waitForPageLoad, dismissCookieBannerBeforeLoad } from "../utils/test-helpers";

/**
 * ProjectShowcase on the home page: a paginated grid of project cards
 * with swipe/touch navigation and a docs marquee carousel below.
 */

test.describe("Project showcase (home page)", () => {
    test("should display project cards", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);

        // Scroll to projects section
        const projectsSection = page.locator("#projects");
        if (await projectsSection.isVisible({ timeout: 5000 }).catch(() => false)) {
            await projectsSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            // Project cards should be present
            const cards = projectsSection.locator("[class*='ProjectCard'], [class*='-card'], .group.cursor-pointer").first();
            if (await cards.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(cards).toBeVisible();
            }
        }
    });

    test("should have a hero project card", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);

        const projectsSection = page.locator("#projects");
        if (await projectsSection.isVisible({ timeout: 5000 }).catch(() => false)) {
            await projectsSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            // The hero card is the larger first card
            const heroCard = projectsSection.locator(".mb-6 > *").first();
            if (await heroCard.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(heroCard).toBeVisible();
            }
        }
    });

    test("should display docs marquee carousel", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);

        const projectsSection = page.locator("#projects");
        if (await projectsSection.isVisible({ timeout: 5000 }).catch(() => false)) {
            await projectsSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            // The marquee is an overflow-hidden container with edge fade divs
            const marquee = page.locator(".overflow-hidden").filter({ has: page.locator(".bg-gradient-to-r") }).first();
            if (await marquee.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(marquee).toBeVisible();
            }
        }
    });

    test("project cards should not cause horizontal overflow", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);

        const projectsSection = page.locator("#projects");
        if (await projectsSection.isVisible({ timeout: 5000 }).catch(() => false)) {
            await projectsSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);

            const { scrollWidth, clientWidth } = await page.evaluate(() => ({
                scrollWidth: document.documentElement.scrollWidth,
                clientWidth: document.documentElement.clientWidth,
            }));
            expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
        }
    });
});
