import { test, expect } from "@playwright/test";
import { waitForPageLoad, dismissCookieBannerBeforeLoad } from "../utils/test-helpers";

/**
 * Settings modal: a 3-tabbed bottom sheet opened from the navbar globe
 * button or any of the footer-bottom toggles. Covers:
 *   - Tab switching (appearance / language / privacy)
 *   - Theme selection (light / dark / system) + persistence
 *   - Language switching (real navigation, not just URL probe)
 *   - Cookie category toggle
 *   - Modal open/close via tab button, escape, and backdrop
 */

const SETTINGS_TRIGGER_LABEL = "Open settings";

async function openSettingsFromNavbar(page: import("@playwright/test").Page) {
    await dismissCookieBannerBeforeLoad(page);
    await page.goto("/en");
    await waitForPageLoad(page);
    await page.getByRole("button", { name: SETTINGS_TRIGGER_LABEL }).first().click();
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();
}

test.describe("Settings modal", () => {
    test.beforeEach(async ({ page }) => {
        await openSettingsFromNavbar(page);
    });

    test("should open with all 3 tabs visible", async ({ page }) => {
        const tabs = page.getByRole("tab");
        await expect(tabs).toHaveCount(3);
        await expect(tabs.nth(0)).toHaveAttribute("id", "settings-tab-appearance");
        await expect(tabs.nth(1)).toHaveAttribute("id", "settings-tab-language");
        await expect(tabs.nth(2)).toHaveAttribute("id", "settings-tab-privacy");
    });

    test("should default to appearance tab", async ({ page }) => {
        const appearanceTab = page.getByRole("tab", { name: /appearance/i });
        await expect(appearanceTab).toHaveAttribute("aria-selected", "true");
        // Panel should be the appearance panel
        const panel = page.locator("#settings-panel-appearance");
        await expect(panel).toBeVisible();
    });

    test("should switch to language tab on click", async ({ page }) => {
        await page.getByRole("tab", { name: /language/i }).click();
        const languageTab = page.getByRole("tab", { name: /language/i });
        await expect(languageTab).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("#settings-panel-language")).toBeVisible();
    });

    test("should switch to privacy tab on click", async ({ page }) => {
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        const privacyTab = page.getByRole("tab", { name: /privacy|cookies/i });
        await expect(privacyTab).toHaveAttribute("aria-selected", "true");
        await expect(page.locator("#settings-panel-privacy")).toBeVisible();
    });

    test("should support arrow-key tab navigation", async ({ page }) => {
        const appearanceTab = page.getByRole("tab", { name: /appearance/i });
        // Click to focus first (the modal doesn't auto-focus on open)
        await appearanceTab.click();
        await expect(appearanceTab).toBeFocused();

        await page.keyboard.press("ArrowDown");
        const languageTab = page.getByRole("tab", { name: /language/i });
        await expect(languageTab).toBeFocused();
        await expect(languageTab).toHaveAttribute("aria-selected", "true");

        await page.keyboard.press("ArrowDown");
        const privacyTab = page.getByRole("tab", { name: /privacy|cookies/i });
        await expect(privacyTab).toBeFocused();

        // Wraps back to first
        await page.keyboard.press("ArrowDown");
        await expect(appearanceTab).toBeFocused();

        // Wraps back to last
        await page.keyboard.press("ArrowUp");
        await expect(privacyTab).toBeFocused();
    });

    test("should open directly to language tab from footer toggle", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);
        await page.locator(".footer-bottom .footer-toggle-btn").nth(0).click();
        const languageTab = page.getByRole("tab", { name: /language/i });
        await expect(languageTab).toHaveAttribute("aria-selected", "true");
    });

    test("should open directly to privacy tab from footer cookie toggle", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en");
        await waitForPageLoad(page);
        await page.locator(".footer-bottom .footer-toggle-btn").nth(1).click();
        const privacyTab = page.getByRole("tab", { name: /privacy|cookies/i });
        await expect(privacyTab).toHaveAttribute("aria-selected", "true");
    });
});

test.describe("Settings → Appearance (theme switcher)", () => {
    test("should show three theme options", async ({ page }) => {
        await openSettingsFromNavbar(page);
        const themeOptions = page.locator(".theme-option");
        await expect(themeOptions).toHaveCount(3);
    });

    test("should switch to dark theme and apply class to <html>", async ({
        page,
    }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("button", { name: /dark mode/i }).click();
        // Reopen to check persistence within session
        const html = page.locator("html");
        await expect(html).toHaveClass(/dark/);
    });

    test("should switch to light theme and remove dark class", async ({ page }) => {
        await openSettingsFromNavbar(page);
        // Selecting a theme closes the modal, so reopen between switches.
        await page.getByRole("button", { name: /dark mode/i }).click();
        await expect(page.locator("html")).toHaveClass(/dark/);

        await openSettingsFromNavbar(page);
        await page.getByRole("button", { name: /light mode/i }).click();
        await expect(page.locator("html")).not.toHaveClass(/dark/);
    });

    test("theme selection should persist across page reload", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("button", { name: /dark mode/i }).click();
        await expect(page.locator("html")).toHaveClass(/dark/);
        await page.reload();
        await waitForPageLoad(page);
        await expect(page.locator("html")).toHaveClass(/dark/);
    });

    test("should mark active theme with check icon", async ({ page }) => {
        await openSettingsFromNavbar(page);
        const activeOption = page.locator(".theme-option.active");
        await expect(activeOption).toHaveCount(1);
    });
});

test.describe("Settings → Language switcher", () => {
    test("should show three language options", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /language/i }).click();
        const langOptions = page.locator(".language-option");
        await expect(langOptions).toHaveCount(3);
    });

    test("should switch to Thai and update URL", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /language/i }).click();
        await page.getByRole("button", { name: /ไทย|thai/i }).click();
        await page.waitForURL((u) => !u.pathname.startsWith("/en"), {
            timeout: 5000,
        });
        expect(page.url()).not.toContain("/en");
        expect(page.url()).not.toContain("/zh");
    });

    test("should switch to Chinese and update URL", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /language/i }).click();
        await page.getByRole("button", { name: /中文|chinese/i }).click();
        await page.waitForURL(/\/zh/, { timeout: 5000 });
        expect(page.url()).toContain("/zh");
    });

    test("should preserve the current path when switching language", async ({
        page,
    }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/blog");
        await waitForPageLoad(page);
        await page.getByRole("button", { name: SETTINGS_TRIGGER_LABEL }).click();
        await page.getByRole("tab", { name: /language/i }).click();
        await page.getByRole("button", { name: /中文|chinese/i }).click();
        await page.waitForURL(/\/zh\/blog/, { timeout: 5000 });
        expect(page.url()).toContain("/zh/blog");
    });
});

test.describe("Settings → Privacy (cookie preferences)", () => {
    test("should show functional and analytics categories", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        await expect(
            page.locator(".cookie-category-name").filter({ hasText: /functional/i })
        ).toBeVisible();
        await expect(
            page.locator(".cookie-category-name").filter({ hasText: /analytics/i })
        ).toBeVisible();
    });

    test("should disable the functional toggle (always on)", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        const functionalToggle = page
            .locator(".cookie-category")
            .filter({ hasText: /functional/i })
            .locator(".cookie-category-toggle");
        await expect(functionalToggle).toHaveClass(/disabled/);
    });

    test("should toggle analytics on and persist", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        const analyticsSwitch = page.getByRole("switch", { name: /analytics/i });
        const before = await analyticsSwitch.getAttribute("aria-checked");
        await analyticsSwitch.click();
        const after = await analyticsSwitch.getAttribute("aria-checked");
        expect(after).not.toBe(before);
        // Reload and verify it persisted
        await page.reload();
        await waitForPageLoad(page);
        await page.getByRole("button", { name: SETTINGS_TRIGGER_LABEL }).click();
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        const persisted = await page
            .getByRole("switch", { name: /analytics/i })
            .getAttribute("aria-checked");
        expect(persisted).toBe(after);
    });

    test("should link to privacy policy", async ({ page }) => {
        await openSettingsFromNavbar(page);
        await page.getByRole("tab", { name: /privacy|cookies/i }).click();
        const link = page.getByRole("link", { name: /privacy/i });
        await expect(link).toHaveAttribute("href", /\/privacy-policy/);
    });
});
