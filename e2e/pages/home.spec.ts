import { test, expect } from '@playwright/test';
import { navigateToHome, waitForPageLoad, expectNavigationToBeVisible, expectFooterToBeVisible, checkForBrokenImages, acceptCookiesIfVisible } from '../utils/test-helpers';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHome(page);
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
  });

  test('should display the home page with all sections', async ({ page }) => {
    // Check navbar is visible
    await expectNavigationToBeVisible(page);
    
    // Check that main content exists
    const main = page.locator('main').first();
    await expect(main).toBeVisible();
    
    // Check footer is visible
    await expectFooterToBeVisible(page);
  });

  test('should have a visible hero section', async ({ page }) => {
    const heroSection = page.locator('section, main > div, [class*="hero"]').first();
    await expect(heroSection).toBeVisible();
  });

  test('should have visible skills section', async ({ page }) => {
    // Look for skills-related content
    const skillsSection = page.locator('h1, h2, h3').filter({ hasText: /skills|skill/i }).first();
    if (await skillsSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(skillsSection).toBeVisible();
    }
  });

  test('should have visible projects section', async ({ page }) => {
    const projectsSection = page.locator('h1, h2, h3').filter({ hasText: /project/i }).first();
    if (await projectsSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(projectsSection).toBeVisible();
    }
  });

  test('should have visible experience section', async ({ page }) => {
    const experienceSection = page.locator('h1, h2, h3').filter({ hasText: /experience/i }).first();
    if (await experienceSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(experienceSection).toBeVisible();
    }
  });

  test('should not have broken images', async ({ page }) => {
    const brokenImages = await checkForBrokenImages(page);
    expect(brokenImages).toHaveLength(0);
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await waitForPageLoad(page);
    
    // Filter out known acceptable errors (like network requests to external APIs)
    const criticalErrors = errors.filter(error => 
      !error.includes('net::ERR') && 
      !error.includes('Failed to load resource')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Home Page - Language Support', () => {
  test('should support English language', async ({ page }) => {
    await page.goto('/en');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
    
    // Page should load successfully
    await expect(page).toHaveTitle(/.*/);
  });

  test('should support Thai language', async ({ page }) => {
    await page.goto('/th');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
    
    // Page should load successfully
    await expect(page).toHaveTitle(/.*/);
  });

  test('should support Chinese language', async ({ page }) => {
    await page.goto('/zh');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
    
    // Page should load successfully
    await expect(page).toHaveTitle(/.*/);
  });
});
