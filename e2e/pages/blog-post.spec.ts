import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Blog Post Detail Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
    });

    test("blog post page loads with h1 title", async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        const firstPostLink = page
            .locator('article a[href*="/blog/"]')
            .first();
        const href = await firstPostLink.getAttribute("href");
        expect(href).toBeTruthy();
        expect(href!).toMatch(/\/blog\/.+/);

        await page.goto(href!);
        await waitForPageLoad(page);

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        const title = (await h1.textContent())?.trim();
        expect(title?.length ?? 0).toBeGreaterThan(0);
    });

    test("reading time is shown on the post page", async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        const firstPostLink = page
            .locator('article a[href*="/blog/"]')
            .first();
        const href = await firstPostLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        const readingTime = page.getByText(/\d+\s*min\s*read/i).first();
        await expect(readingTime).toBeVisible();
    });

    test("BackToTop button is initially hidden then visible after scrolling", async ({
        page,
    }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        const firstPostLink = page
            .locator('article a[href*="/blog/"]')
            .first();
        const href = await firstPostLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        const backToTop = page.getByRole("button", { name: "Back to top" });
        await expect(backToTop).toBeAttached();

        // Initial state — should be opacity-0
        const initialClass = await backToTop.getAttribute("class");
        expect(initialClass ?? "").toContain("opacity-0");

        // Scroll past 400px to make it visible
        await page.evaluate(() => window.scrollTo(0, 600));
        await page.waitForTimeout(300);

        const visibleClass = await backToTop.getAttribute("class");
        expect(visibleClass ?? "").toContain("opacity-100");
    });

    test("clicking BackToTop scrolls back to top", async ({ page }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        const firstPostLink = page
            .locator('article a[href*="/blog/"]')
            .first();
        const href = await firstPostLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 800));
        await page.waitForTimeout(300);

        const scrollBefore = await page.evaluate(() => window.scrollY);
        expect(scrollBefore).toBeGreaterThan(0);

        const backToTop = page.getByRole("button", { name: "Back to top" });
        await backToTop.click();

        // Wait for smooth scroll to complete
        await page.waitForFunction(
            () => window.scrollY < 10,
            undefined,
            { timeout: 3000 },
        );

        const scrollAfter = await page.evaluate(() => window.scrollY);
        expect(scrollAfter).toBeLessThan(10);
    });

    test("TableOfContents has links to headings when present", async ({
        page,
    }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        // Walk through posts to find one with a TOC (≥2 headings).
        const links = page.locator('article a[href*="/blog/"]');
        const linkCount = await links.count();
        let foundToc = false;

        for (let i = 0; i < linkCount && !foundToc; i++) {
            const href = await links.nth(i).getAttribute("href");
            if (!href) continue;

            await page.goto(href);
            await waitForPageLoad(page);

            const toc = page.getByRole("navigation", {
                name: "Table of contents",
            });
            if (await toc.isVisible({ timeout: 1000 }).catch(() => false)) {
                const tocLinks = toc.locator("a[href^='#']");
                const numTocLinks = await tocLinks.count();
                if (numTocLinks >= 2) {
                    foundToc = true;
                    // Verify each link points to an existing heading
                    for (let j = 0; j < numTocLinks; j++) {
                        const anchorHref = await tocLinks
                            .nth(j)
                            .getAttribute("href");
                        expect(anchorHref).toMatch(/^#.+/);
                        const id = anchorHref!.slice(1);
                        const heading = page.locator(`#${id}`);
                        await expect(heading).toHaveCount(1);
                    }
                }
            }
        }

        // If no post has a TOC, skip — but at least one should given the
        // corpus includes long-form articles.
        if (!foundToc) {
            test.skip(true, "No blog post in listing has a TableOfContents");
        }
    });

    test("prev/next article nav is present (either prev or next)", async ({
        page,
    }) => {
        await page.goto("/en/blog");
        await waitForPageLoad(page);

        const firstPostLink = page
            .locator('article a[href*="/blog/"]')
            .first();
        const href = await firstPostLink.getAttribute("href");
        await page.goto(href!);
        await waitForPageLoad(page);

        const articleNav = page.getByRole("navigation", {
            name: "Article navigation",
        });
        await expect(articleNav).toBeVisible();

        const prevLink = articleNav.getByText(/previous/i);
        const nextLink = articleNav.getByText(/next/i);

        const hasPrev = await prevLink
            .isVisible({ timeout: 1000 })
            .catch(() => false);
        const hasNext = await nextLink
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        // Either prev or next should exist (any blog post in the middle
        // of the corpus has at least one neighbour). The first and last
        // posts will only have one.
        expect(hasPrev || hasNext).toBe(true);
    });
});
