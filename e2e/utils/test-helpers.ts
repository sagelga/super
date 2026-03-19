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
  await page.waitForLoadState('networkidle');
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
 * Check for broken images on the page
 */
export async function checkForBrokenImages(page: Page): Promise<string[]> {
  const images = page.locator('img');
  const brokenImages: string[] = [];
  
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    if (naturalWidth === 0) {
      brokenImages.push(await img.getAttribute('src') || 'unknown');
    }
  }
  
  return brokenImages;
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
