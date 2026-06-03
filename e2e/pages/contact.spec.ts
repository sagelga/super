import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Contact Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/contact");
        await waitForPageLoad(page);
    });

    test("should load with a title", async ({ page }) => {
        await expect(page).toHaveTitle(/.*/);
    });

    test("should display a visible h1 with a period", async ({ page }) => {
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();

        const text = (await h1.textContent()) ?? "";
        expect(text.trim().length).toBeGreaterThan(0);
        expect(text).toContain(".");
    });

    test("should display the email mailto link", async ({ page }) => {
        const emailLink = page.locator('a[href^="mailto:"]').first();
        await expect(emailLink).toBeVisible();

        const href = await emailLink.getAttribute("href");
        expect(href).toMatch(/^mailto:.+@.+\..+/);
    });

    test("should render the 3 social links with correct hrefs", async ({
        page,
    }) => {
        // Scope to the socials list <ul> to disambiguate from the footer
        const socialsList = page.locator("ul.border-t");

        const githubLink = socialsList.locator(
            'a[href="https://github.com/sagelga"]',
        );
        const linkedinLink = socialsList.locator(
            'a[href="https://www.linkedin.com/in/kunanon/"]',
        );
        const trailblazerLink = socialsList.locator(
            'a[href="https://www.salesforce.com/trailblazer/sagelga"]',
        );

        await expect(githubLink).toBeVisible();
        await expect(linkedinLink).toBeVisible();
        await expect(trailblazerLink).toBeVisible();
    });

    test("social links should open in a new tab with noopener noreferrer", async ({
        page,
    }) => {
        const socialHrefs = [
            "https://github.com/sagelga",
            "https://www.linkedin.com/in/kunanon/",
            "https://www.salesforce.com/trailblazer/sagelga",
        ];

        // Use the socials list <ul> to avoid matching the footer links
        const socialsList = page.locator("ul.border-t");

        for (const href of socialHrefs) {
            const link = socialsList.locator(`a[href="${href}"]`);
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", /noopener/);
            await expect(link).toHaveAttribute("rel", /noreferrer/);
        }
    });

    test("social links have accessible text labels", async ({ page }) => {
        const githubLink = page.getByRole("link", { name: /github/i });
        const linkedinLink = page.getByRole("link", { name: /linkedin/i });
        const trailblazerLink = page.getByRole("link", {
            name: /salesforce|trailblazer/i,
        });

        await expect(githubLink.first()).toBeVisible();
        await expect(linkedinLink.first()).toBeVisible();
        await expect(trailblazerLink.first()).toBeVisible();
    });
});

test.describe("Contact Page - Language Support", () => {
    test("should be accessible in English at /en/contact", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/contact");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should be accessible in Thai at /contact (default locale)", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/contact");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();

        // Email link still present regardless of locale
        await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
    });

    test("should be accessible in Chinese at /zh/contact", async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/zh/contact");
        await waitForPageLoad(page);

        await expect(page).toHaveTitle(/.*/);
        await expect(page.locator("h1").first()).toBeVisible();
    });
});
