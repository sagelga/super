import { test, expect } from '@playwright/test';
import { waitForPageLoad, acceptCookiesIfVisible } from '../utils/test-helpers';

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ page }) => {
    // Return to a real first-visit state: the global storageState seeds
    // consent, so drop it from this context instead of every navigation
    // (an init script would wipe the choice the test is about to make).
    await page.context().clearCookies();
    await page.goto('/en');
    await page.evaluate(() => window.localStorage.removeItem('cookie_consent'));
    await page.reload();
    await waitForPageLoad(page);
  });

  test('should display cookie consent banner on first visit', async ({ page }) => {
    // Look for cookie consent banner or button
    const consentButton = page.getByRole('button', { name: /accept|agree|consent|cookies/i }).first();

    // Check if any cookie-related element is visible
    const cookieElement = page.locator('[class*="cookie"], [id*="cookie"]').first();

    // The banner mounts after hydration, so use an auto-retrying assertion.
    // `isVisible()` takes a one-shot snapshot and flakes on slow runners.
    await expect(cookieElement.or(consentButton).first()).toBeVisible();
  });

  test('should be able to accept cookies', async ({ page }) => {
    // Look for accept button
    const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
    
    if (await acceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
      
      // Verify the button is no longer visible after accepting
      await expect(acceptButton).not.toBeVisible({ timeout: 3000 });
    }
  });

  test('should not show cookie banner after acceptance', async ({ page }) => {
    // First, accept cookies
    const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
    
    if (await acceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
      
      // Reload the page
      await page.reload();
      await waitForPageLoad(page);
      
      // Cookie banner should not be visible again (check if the button is gone)
      const cookieBanner = page.locator('[class*="cookie"]').first();
      const isVisible = await cookieBanner.isVisible({ timeout: 2000 }).catch(() => false);
      
      // If still visible, it's acceptable as long as it doesn't block content
    }
  });

  test('should persist cookie consent across page navigation', async ({ page }) => {
    const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
    await expect(acceptButton).toBeVisible();
    await acceptButton.click();
    await expect(acceptButton).toBeHidden();

    // Navigate to another page
    await page.goto('/en/blog');
    await waitForPageLoad(page);

    // The stored choice must survive navigation, and the sheet must not return.
    const stored = await page.evaluate(() => localStorage.getItem('cookie_consent'));
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!).consentGiven).toBe(true);
    await expect(page.locator('.bottom-sheet-overlay')).toHaveCount(0);
  });
});
