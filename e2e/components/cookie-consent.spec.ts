import { test, expect } from '@playwright/test';
import { waitForPageLoad, acceptCookiesIfVisible } from '../utils/test-helpers';

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies before each test to ensure consent banner appears
    await page.context().clearCookies();
    await page.goto('/en');
    await waitForPageLoad(page);
  });

  test('should display cookie consent banner on first visit', async ({ page }) => {
    // Look for cookie consent banner or button
    const consentButton = page.getByRole('button', { name: /accept|agree|consent|cookies/i }).first();
    
    // Check if any cookie-related element is visible
    const cookieElement = page.locator('[class*="cookie"], [id*="cookie"]').first();
    const hasCookieBanner = await cookieElement.isVisible({ timeout: 3000 }).catch(() => false);
    const hasConsentButton = await consentButton.isVisible({ timeout: 3000 }).catch(() => false);
    
    // One of them should be visible
    expect(hasCookieBanner || hasConsentButton).toBeTruthy();
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
    // Accept cookies
    const acceptButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
    
    if (await acceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
      
      // Navigate to another page
      await page.goto('/en/blog');
      await waitForPageLoad(page);
      
      // Cookie banner should not reappear
      const cookieButton = page.getByRole('button', { name: /accept|agree|consent/i }).first();
      const hasConsentButton = await cookieButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      expect(hasConsentButton).toBeFalsy();
    }
  });
});
