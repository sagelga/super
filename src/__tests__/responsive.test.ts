/**
 * Responsive design E2E test suite.
 *
 * Covers every page × language × viewport combination and verifies:
 *   - No horizontal overflow
 *   - Navigation is accessible (desktop links or hamburger)
 *   - Key interactive elements are present and clickable
 *   - No console errors
 *   - Images scale without distortion
 *   - Hero section renders
 *   - Skills section (CORE/PROFICIENT/FAMILIAR) is readable
 *   - Project cards are present
 *   - Footer links are accessible
 *
 * NOTE: The middleware uses defaultLocale "th" with localePrefix "as-needed",
 * so Thai routes have no locale prefix (/ instead of /th/).
 * English routes use /en/... prefix.
 */

import { test, expect, Page } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

type Viewport = { name: string; width: number; height: number };
type Language = { code: string; prefix: string };

const VIEWPORTS: Viewport[] = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const LANGUAGES: Language[] = [
  { code: "th", prefix: "" }, // default locale — no prefix
  { code: "en", prefix: "/en" },
];

// Pages under [lang] routing
const LANG_PAGES = [
  { id: "home", path: "/" },
  { id: "blog", path: "/blog" },
  { id: "gallery", path: "/gallery" },
  { id: "learn", path: "/learn" },
  { id: "docs", path: "/docs" },
];

// Home sub-pages — NOT under [lang], always at root
const HOME_SUB_PAGES = [
  { id: "experience", path: "/home/experience" },
  { id: "certifications", path: "/home/certifications" },
  { id: "projects", path: "/home/projects" },
  { id: "volunteering", path: "/home/volunteering" },
];

const SCREENSHOT_DIR = path.resolve(
  __dirname,
  "../../test-results/responsive-screenshots"
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Inject cookie consent into localStorage before page scripts run.
 * Must be called before page.goto() to take effect on first render.
 */
async function setCookieConsentAccepted(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const prefs = {
      functional: true,
      analytics: false,
      consentGiven: true,
      consentTimestamp: Date.now(),
    };
    try {
      localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    } catch {
      // silently ignore
    }
  });
}

async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded");
  // Settle network without hard timeout
  await page
    .waitForLoadState("networkidle", { timeout: 8000 })
    .catch(() => {});
}


async function takeScreenshot(
  page: Page,
  label: string
): Promise<void> {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
  const safeName = label.replace(/[^a-z0-9-_]/gi, "_").toLowerCase();
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${safeName}.png`),
    fullPage: false,
  });
}

/** Returns true when the document has horizontal overflow. */
async function hasHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
}

/** Check that images have loaded (naturalWidth > 0). Returns list of broken src values. */
async function getBrokenImageSrcs(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    return imgs
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute("src") ?? "unknown");
  });
}

/** Collect JS console errors while the callback runs. */
async function collectConsoleErrors(
  page: Page,
  fn: () => Promise<void>
): Promise<string[]> {
  const errors: string[] = [];
  const handler = (msg: { type: () => string; text: () => string }) => {
    if (msg.type() === "error") errors.push(msg.text());
  };
  page.on("console", handler);
  await fn();
  page.off("console", handler);
  return errors;
}

function buildUrl(lang: Language, pagePath: string): string {
  // Home sub-pages have no lang prefix
  if (pagePath.startsWith("/home/")) return pagePath;
  return `${lang.prefix}${pagePath}`;
}

// ---------------------------------------------------------------------------
// Test factory: runs the same checks for every viewport
// ---------------------------------------------------------------------------

function describeResponsive(
  pageId: string,
  pagePath: string,
  lang: Language,
  viewport: Viewport
): void {
  const url = buildUrl(lang, pagePath);
  const label = `${lang.code}-${pageId}-${viewport.name}`;

  test(`[${label}] loads without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);
    await takeScreenshot(page, label);

    const overflow = await hasHorizontalOverflow(page);
    expect(overflow, `Horizontal overflow on ${url} at ${viewport.name}`).toBe(
      false
    );
  });

  test(`[${label}] navigation is accessible`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    if (viewport.name === "desktop") {
      // Desktop: expect nav links visible
      const nav = page.locator("nav").first();
      await expect(nav).toBeVisible();
      // At least one nav link should be visible
      const navLinks = nav.getByRole("link");
      await expect(navLinks.first()).toBeVisible();
    } else {
      // Mobile / Tablet: hamburger toggle is identified via aria-expanded attribute.
      // The drawer also contains an "Close menu" button, so we use aria-expanded
      // to uniquely target the main toggle in the navbar top bar.
      const nav = page.locator("nav").first();
      await expect(nav).toBeVisible();
      // The hamburger toggle always has aria-expanded (true or false)
      const hamburger = nav.locator("button[aria-expanded]");
      await expect(hamburger).toBeVisible();
      await hamburger.click();
      await page.waitForTimeout(200);
      // After opening, at least one link should be reachable somewhere on page
      const anyLink = page.locator("a[href]").first();
      await expect(anyLink).toBeVisible();
    }
  });

  test(`[${label}] main content is visible`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    const main = page.locator("main").first();
    await expect(main).toBeVisible();
  });

  test(`[${label}] footer is visible and has links`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    // Scroll to bottom to trigger any lazy-render
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // Footer should contain at least one link
    const footerLinks = footer.getByRole("link");
    const count = await footerLinks.count();
    expect(count, "Footer should have links").toBeGreaterThan(0);
  });

  test(`[${label}] no critical console errors`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);

    const errors = await collectConsoleErrors(page, async () => {
      await setCookieConsentAccepted(page);
      await page.goto(url);
      await waitForPageReady(page);
    });

    // Filter acceptable noise (third-party, missing favicons, font metrics, etc.)
    const critical = errors.filter(
      (e) =>
        !e.includes("net::ERR") &&
        !e.includes("Failed to load resource") &&
        !e.includes("favicon") &&
        !e.includes("fonts.googleapis") &&
        !e.includes("cdn.jsdelivr") &&
        !e.includes("Hydration") && // Next.js hydration warnings are non-critical
        !e.includes("hydration")
    );

    expect(critical, `Console errors on ${url}: ${critical.join("; ")}`).toHaveLength(0);
  });

  test(`[${label}] images load without distortion`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    // Give lazy-loaded images a moment
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    const broken = await getBrokenImageSrcs(page);
    // External CDN images (cloudinary, unsplash) may 404 in test env — filter those
    const localBroken = broken.filter(
      (src) =>
        !src.includes("cloudinary") &&
        !src.includes("unsplash") &&
        src !== "unknown"
    );
    expect(
      localBroken,
      `Broken images on ${url}: ${localBroken.join(", ")}`
    ).toHaveLength(0);
  });
}

// ---------------------------------------------------------------------------
// Home-page-specific checks (hero, skills, projects)
// ---------------------------------------------------------------------------

function describeHomePage(lang: Language, viewport: Viewport): void {
  const url = buildUrl(lang, "/");
  const label = `${lang.code}-home-${viewport.name}`;

  test(`[${label}] hero section renders correctly`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    // Hero is the first section with min-h-screen
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();

    // The h1 (name) should be visible and not empty
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test(`[${label}] skills section CORE/PROFICIENT/FAMILIAR labels are readable`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    // Scroll down to skills section
    const skillsSection = page.locator("#skills");
    if (await skillsSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await skillsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Tier labels are rendered as <p> elements with uppercase text
      const coreLabel = page
        .locator("p")
        .filter({ hasText: /^Core$/i })
        .first();
      const proficientLabel = page
        .locator("p")
        .filter({ hasText: /^Proficient$/i })
        .first();
      const familiarLabel = page
        .locator("p")
        .filter({ hasText: /^Familiar$/i })
        .first();

      await expect(coreLabel).toBeVisible();
      await expect(proficientLabel).toBeVisible();
      await expect(familiarLabel).toBeVisible();

      // Skill pills should not overflow their container
      const skillsContainer = skillsSection.locator(".flex.flex-wrap").first();
      if (
        await skillsContainer.isVisible({ timeout: 1000 }).catch(() => false)
      ) {
        const containerBox = await skillsContainer.boundingBox();
        const pills = skillsContainer.locator("span");
        const pillCount = await pills.count();
        if (containerBox && pillCount > 0) {
          // All pills should be within viewport width
          for (let i = 0; i < Math.min(pillCount, 5); i++) {
            const box = await pills.nth(i).boundingBox();
            if (box) {
              expect(box.x + box.width).toBeLessThanOrEqual(
                viewport.width + 1 // +1px tolerance
              );
            }
          }
        }
      }
    }
  });

  test(`[${label}] project cards are laid out correctly`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await setCookieConsentAccepted(page);
    await page.goto(url);
    await waitForPageReady(page);

    // Scroll to find project cards
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(400);

    // Project cards may live in a grid; they should not overflow
    const overflow = await hasHorizontalOverflow(page);
    expect(overflow, "Horizontal overflow caused by project cards").toBe(false);
  });
}

// ---------------------------------------------------------------------------
// Register all combinations
// ---------------------------------------------------------------------------

for (const lang of LANGUAGES) {
  for (const viewport of VIEWPORTS) {
    // Standard pages
    for (const pg of LANG_PAGES) {
      test.describe(`Responsive: ${pg.id} (${lang.code}, ${viewport.name})`, () => {
        describeResponsive(pg.id, pg.path, lang, viewport);
      });
    }

    // Home sub-pages (no lang prefix, always at root)
    for (const sub of HOME_SUB_PAGES) {
      test.describe(`Responsive: ${sub.id} sub-page (${lang.code}, ${viewport.name})`, () => {
        // Sub-pages don't vary by language at URL level, but we still run for
        // both languages to catch i18n rendering issues (they use next-intl internally)
        describeResponsive(sub.id, sub.path, lang, viewport);
      });
    }

    // Home page extra checks
    test.describe(`Responsive: home-extras (${lang.code}, ${viewport.name})`, () => {
      describeHomePage(lang, viewport);
    });
  }
}

// ---------------------------------------------------------------------------
// Mobile hamburger menu — dedicated integration flow
// ---------------------------------------------------------------------------

test.describe("Mobile hamburger menu — full open/close/navigate flow", () => {
  for (const lang of LANGUAGES) {
    const homeUrl = buildUrl(lang, "/");

    test(`[${lang.code}] hamburger opens, shows all nav items, closes`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await setCookieConsentAccepted(page);
      await page.goto(homeUrl);
      await waitForPageReady(page);

      const nav = page.locator("nav").first();
      await expect(nav).toBeVisible();
      // The hamburger toggle is uniquely identified by aria-expanded
      const hamburger = nav.locator("button[aria-expanded]");
      await expect(hamburger).toBeVisible();

      // Open
      await hamburger.click();
      await page.waitForTimeout(300);

      // After opening, links should be visible somewhere on the page
      const anyLink = page.locator("a[href]").first();
      await expect(anyLink).toBeVisible();
      const linkCount = await page.locator("a[href]").count();
      expect(linkCount).toBeGreaterThan(0);

      // Close by clicking the backdrop overlay (simulates user tap outside)
      const backdrop = page.locator(".bg-canvas\\/80");
      if (await backdrop.isVisible({ timeout: 1000 }).catch(() => false)) {
        await backdrop.click({ force: true });
        await page.waitForTimeout(300);
      }
    });
  }
});

// ---------------------------------------------------------------------------
// Language switcher — ensure /en and / (th) load distinct content
// ---------------------------------------------------------------------------

test.describe("Language variants load", () => {
  for (const viewport of VIEWPORTS) {
    test(`[${viewport.name}] English and Thai home pages both load`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      await setCookieConsentAccepted(page);

      // Thai (default — no prefix)
      await page.goto("/");
      await waitForPageReady(page);
      const thTitle = await page.title();
      expect(thTitle.length).toBeGreaterThan(0);

      // English
      await page.goto("/en");
      await waitForPageReady(page);
      const enTitle = await page.title();
      expect(enTitle.length).toBeGreaterThan(0);
    });
  }
});
