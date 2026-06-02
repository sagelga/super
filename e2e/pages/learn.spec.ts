import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Learn Index Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
    });

    test("learn index loads with topic links", async ({ page }) => {
        await page.goto("/en/learn");
        await waitForPageLoad(page);

        await expect(page.locator("h1").first()).toBeVisible();

        const topicLinks = page.locator('a[href^="/learn/"]');
        const count = await topicLinks.count();
        expect(count).toBeGreaterThan(0);
    });
});

test.describe("Learn Detail Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
    });

    test("a learn topic page loads with content layout", async ({ page }) => {
        await page.goto("/en/learn");
        await waitForPageLoad(page);

        const firstTopicLink = page.locator('a[href^="/learn/"]').first();
        const href = await firstTopicLink.getAttribute("href");
        expect(href).toBeTruthy();
        expect(href!).toMatch(/^\/learn\/[^/]+$/);

        await page.goto(href!);
        await waitForPageLoad(page);

        // The ContentLayout renders a <main> with a DocNav accordion.
        // Topic READMEs vary widely — some are just frontmatter — so we
        // assert on the layout shell, not on heading text.
        const main = page.locator("main").first();
        await expect(main).toBeVisible();

        const toggle = page.getByRole("button", {
            name: "Toggle page navigation",
        });
        await expect(toggle).toBeVisible();
    });

    test("learn sub-page (topic + slug) loads with content", async ({
        page,
    }) => {
        // Walk the topic listing and find a sub-page that 200s. We try
        // the first few topic links because the DocNav sidebar is not
        // always rendered server-side in dev mode.
        await page.goto("/en/learn");
        await waitForPageLoad(page);

        const topicLinks = page.locator('a[href^="/learn/"]');
        const topicCount = await topicLinks.count();
        const candidates: string[] = [];
        for (let i = 0; i < Math.min(topicCount, 5); i++) {
            const href = await topicLinks.nth(i).getAttribute("href");
            if (href && /^\/learn\/[^/]+$/.test(href)) {
                candidates.push(href);
            }
        }

        // Known sub-pages per topic — hard-coded based on the content
        // directory so the test does not depend on the sidebar render.
        const KNOWN_SUBPAGES: Record<string, string> = {
            "/learn/python": "/learn/python/variable",
            "/learn/sql": "/learn/sql/intro/command",
            "/learn/git": "/learn/git/intro",
            "/learn/spss": "/learn/spss/intro",
            "/learn/data-structures": "/learn/data-structures/intro",
        };

        let subPageHref: string | null = null;
        for (const topicHref of candidates) {
            const candidate = KNOWN_SUBPAGES[topicHref];
            if (!candidate) continue;
            const resp = await page.goto(candidate, { waitUntil: "domcontentloaded" });
            if (resp && resp.status() === 200) {
                subPageHref = candidate;
                break;
            }
        }

        expect(subPageHref).not.toBeNull();

        await waitForPageLoad(page);

        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        const title = (await h1.textContent())?.trim();
        expect(title?.length ?? 0).toBeGreaterThan(0);
    });

    test("BackToTop button works on learn detail pages (if present)", async ({
        page,
    }) => {
        await page.goto("/en/learn/python/variable");
        await waitForPageLoad(page);

        const backToTop = page.getByRole("button", { name: "Back to top" });
        const exists = await backToTop.count();

        if (exists > 0) {
            await expect(backToTop).toBeAttached();

            const initialClass = await backToTop.getAttribute("class");
            expect(initialClass ?? "").toContain("opacity-0");

            await page.evaluate(() => window.scrollTo(0, 600));
            await page.waitForTimeout(300);

            const visibleClass = await backToTop.getAttribute("class");
            expect(visibleClass ?? "").toContain("opacity-100");

            await backToTop.click();
            await page.waitForFunction(
                () => window.scrollY < 10,
                undefined,
                { timeout: 3000 },
            );
        } else {
            test.skip(
                true,
                "BackToTop button is not rendered on learn detail pages",
            );
        }
    });
});
