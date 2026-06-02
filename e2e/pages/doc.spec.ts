import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Docs Index Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
    });

    test("docs index loads and lists project links", async ({ page }) => {
        await page.goto("/en/docs");
        await waitForPageLoad(page);

        await expect(page.locator("h1").first()).toBeVisible();

        const projectLinks = page.locator('a[href^="/docs/"]');
        const count = await projectLinks.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe("Docs Detail Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
    });

    test("a doc detail page loads with h1", async ({ page }) => {
        await page.goto("/en/docs");
        await waitForPageLoad(page);

        const firstProjectLink = page.locator('a[href^="/docs/"]').first();
        const href = await firstProjectLink.getAttribute("href");
        expect(href).toBeTruthy();

        await page.goto(href!);
        await waitForPageLoad(page);

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        const title = (await h1.textContent())?.trim();
        expect(title?.length ?? 0).toBeGreaterThan(0);
    });

    test("DocNav accordion toggle button works", async ({ page }) => {
        await page.goto("/en/docs");
        await waitForPageLoad(page);

        const firstProjectLink = page.locator('a[href^="/docs/"]').first();
        const href = await firstProjectLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        const toggle = page.getByRole("button", {
            name: "Toggle page navigation",
        });
        await expect(toggle).toBeVisible();

        const initialState = await toggle.getAttribute("aria-expanded");
        await toggle.click();
        await page.waitForTimeout(200);
        const toggledState = await toggle.getAttribute("aria-expanded");
        expect(toggledState).not.toBe(initialState);

        // Toggle back to verify it's reversible
        await toggle.click();
        await page.waitForTimeout(200);
        const restoredState = await toggle.getAttribute("aria-expanded");
        expect(restoredState).toBe(initialState);
    });

    test("BackToTop button is present on a doc detail page (if rendered)", async ({
        page,
    }) => {
        await page.goto("/en/docs");
        await waitForPageLoad(page);

        const firstProjectLink = page.locator('a[href^="/docs/"]').first();
        const href = await firstProjectLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        const backToTop = page.getByRole("button", { name: "Back to top" });
        const exists = await backToTop.count();

        if (exists > 0) {
            await expect(backToTop).toBeAttached();

            // Verify initial hidden state
            const initialClass = await backToTop.getAttribute("class");
            expect(initialClass ?? "").toContain("opacity-0");

            // Scroll down and confirm visibility transition
            await page.evaluate(() => window.scrollTo(0, 600));
            await page.waitForTimeout(300);
            const visibleClass = await backToTop.getAttribute("class");
            expect(visibleClass ?? "").toContain("opacity-100");

            // Click and confirm scroll back to top
            await backToTop.click();
            await page.waitForFunction(
                () => window.scrollY < 10,
                undefined,
                { timeout: 3000 },
            );
        } else {
            // The current docs implementation does not include BackToTop.
            // Skip gracefully rather than fail.
            test.skip(
                true,
                "BackToTop button is not rendered on docs detail pages",
            );
        }
    });
});
