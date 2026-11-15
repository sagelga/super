import { Page, Locator, expect } from '@playwright/test';

/**
 * Navigate to the home page
 */
export async function navigateToHome(page: Page, lang: string = 'en'): Promise<void> {
  await page.goto(`/${lang}`);
  await expect(page).toHaveTitle(/.*/);
}

/**
 * Wait for the page to be fully loaded
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  // `networkidle` never settles on pages with long-tail requests (external
  // images, analytics beacons), which made navigation tests time out. `load`
  // plus a couple of animation frames is enough for hydration to finish.
  await page.waitForLoadState("load");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      )
  );
}

/**
 * Check if an element is visible
 */
export async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  return await element.isVisible().catch(() => false);
}

/**
 * Click on a link by its text
 */
export async function clickLinkByText(page: Page, text: string): Promise<void> {
  const link = page.getByRole('link', { name: text, exact: false });
  await link.first().click();
}

/**
 * Check if the navigation is present - targets the main navbar (not breadcrumb)
 */
export async function expectNavigationToBeVisible(page: Page): Promise<void> {
  const navbar = page.getByRole('navigation').filter({ hasText: /home/i }).first();
  await expect(navbar).toBeVisible();
}

/**
 * Check if the footer is present
 */
export async function expectFooterToBeVisible(page: Page): Promise<void> {
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
}

/**
 * Get all navigation links from main navbar
 */
export async function getNavigationLinks(page: Page): Promise<Locator[]> {
  const navbar = page.locator('nav').first();
  return navbar.getByRole('link').all();
}

/**
 * Check for broken images on the page.
 *
 * Remote images are skipped: next/image proxies them through /_next/image,
 * and CI runners frequently time out reaching the upstream CDN, which would
 * otherwise look like a broken image in this app.
 */
export async function checkForBrokenImages(page: Page): Promise<string[]> {
  // Scroll to trigger lazy-loaded images then scroll back
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));

  return page.evaluate(() => {
    const isRemote = (src: string | null): boolean => {
      if (!src) return true;
      try {
        const url = new URL(src, window.location.href);
        if (url.pathname === "/_next/image") {
          return /^https?:/i.test(url.searchParams.get("url") ?? "");
        }
        return url.origin !== window.location.origin;
      } catch {
        return false;
      }
    };

    return Array.from(document.querySelectorAll("img"))
      .filter((img) => !isRemote(img.getAttribute("src")))
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute("src") ?? "unknown");
  });
}

/**
 * Accept all cookies if the consent banner is visible
 */
export async function acceptCookiesIfVisible(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
  if (await acceptButton.isVisible({ timeout: 2000 }).catch(() => false)) {
    await acceptButton.click();
    await page.waitForTimeout(500);
  }
}

/**
 * Pre-set cookie consent in localStorage BEFORE the page loads. This prevents
 * the cookie consent bottom-sheet (which uses an overlay) from blocking clicks
 * on other interactive elements like the settings button.
 *
 * Must be called BEFORE page.goto() so the addInitScript runs at navigation.
 *
 * Note: The app invalidates stored preferences if `consentVersion` doesn't
 * match the current CONSENT_VERSION constant. If the version string in
 * src/types/index.ts is bumped, update the value below.
 */
const CONSENT_VERSION = "2026-04-19";

export async function dismissCookieBannerBeforeLoad(page: Page): Promise<void> {
  await page.addInitScript(
    ({ version }) => {
      // Only set defaults if the user hasn't already made a choice.
      // This lets tests toggle a preference and verify persistence
      // across page.reload() without our defaults clobbering the
      // persisted state.
      try {
        if (localStorage.getItem("cookie_consent")) return;
        const prefs = {
          functional: true,
          analytics: false,
          consentGiven: true,
          consentTimestamp: Date.now(),
          consentVersion: version,
        };
        localStorage.setItem("cookie_consent", JSON.stringify(prefs));
      } catch {
        // localStorage may not be available; ignore
      }
    },
    { version: CONSENT_VERSION }
  );
}
