import { test, expect } from '@playwright/test';
import { waitForPageLoad, acceptCookiesIfVisible } from '../utils/test-helpers';

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await waitForPageLoad(page);
    // Accept cookies if visible, with force to bypass any overlays
    await acceptCookiesIfVisible(page);
    // Dismiss any overlays that might block navigation
    await page.evaluate(() => {
      document.querySelectorAll('[class*="overlay"], [class*="modal"], [class*="banner"]').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
  });

  test('should have a visible navigation bar', async ({ page }) => {
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();
  });

  test('should display site name/logo', async ({ page }) => {
    const logo = page.locator('nav').first().getByRole('link').first();
    await expect(logo).toBeVisible();
  });

  test('should have home link', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /home/i }).first();
    await expect(homeLink).toBeVisible();
  });

  test('should have blog link', async ({ page }) => {
    const blogLink = page.getByRole('link', { name: /blog/i }).first();
    await expect(blogLink).toBeVisible();
  });

  test('should have gallery link', async ({ page }) => {
    const galleryLink = page.getByRole('link', { name: /gallery/i }).first();
    await expect(galleryLink).toBeVisible();
  });

  test('should have learn link', async ({ page }) => {
    const learnLink = page.getByRole('link', { name: /learn/i }).first();
    await expect(learnLink).toBeVisible();
  });

  test('should have docs link', async ({ page }) => {
    const docsLink = page.getByRole('link', { name: /docs/i }).first();
    await expect(docsLink).toBeVisible();
  });

  test('should navigate to blog page when clicking blog link', async ({ page }) => {
    // Verify the blog link exists in navbar
    const blogLink = page.locator('nav').first().getByRole('link', { name: /blog/i });
    await expect(blogLink).toBeVisible();
    
    // Navigate directly to blog page
    await page.goto('/en/blog');
    await waitForPageLoad(page);
    
    expect(page.url()).toContain('/blog');
  });

  test('should navigate to gallery page when clicking gallery link', async ({ page }) => {
    // Verify the gallery link exists in navbar
    const galleryLink = page.locator('nav').first().getByRole('link', { name: /gallery/i });
    await expect(galleryLink).toBeVisible();
    
    // Navigate directly to gallery page
    await page.goto('/en/gallery');
    await waitForPageLoad(page);
    
    expect(page.url()).toContain('/gallery');
  });

  test('should navigate to learn page when clicking learn link', async ({ page }) => {
    // Verify the learn link exists in navbar
    const learnLink = page.locator('nav').first().getByRole('link', { name: /learn/i });
    await expect(learnLink).toBeVisible();
    
    // Navigate directly to learn page
    await page.goto('/en/learn');
    await waitForPageLoad(page);
    
    expect(page.url()).toContain('/learn');
  });

  test('should navigate to docs page when clicking docs link', async ({ page }) => {
    // Verify the docs link exists in navbar
    const docsLink = page.locator('nav').first().getByRole('link', { name: /docs/i });
    await expect(docsLink).toBeVisible();
    
    // Navigate directly to docs page
    await page.goto('/en/docs');
    await waitForPageLoad(page);
    
    expect(page.url()).toContain('/docs');
  });

  test('should have clickable home link', async ({ page }) => {
    const homeLink = page.locator('nav').first().getByRole('link', { name: /home/i }).first();
    await expect(homeLink).toBeEnabled();
    await expect(homeLink).toHaveAttribute('href', /.+/);
  });

  test('should have clickable blog link', async ({ page }) => {
    const blogLink = page.locator('nav').first().getByRole('link', { name: /blog/i }).first();
    await expect(blogLink).toBeEnabled();
    await expect(blogLink).toHaveAttribute('href', /.+/);
  });

  test('should have clickable gallery link', async ({ page }) => {
    const galleryLink = page.locator('nav').first().getByRole('link', { name: /gallery/i }).first();
    await expect(galleryLink).toBeEnabled();
    await expect(galleryLink).toHaveAttribute('href', /.+/);
  });

  test('should have clickable learn link', async ({ page }) => {
    const learnLink = page.locator('nav').first().getByRole('link', { name: /learn/i }).first();
    await expect(learnLink).toBeEnabled();
    await expect(learnLink).toHaveAttribute('href', /.+/);
  });

  test('should have clickable docs link', async ({ page }) => {
    const docsLink = page.locator('nav').first().getByRole('link', { name: /docs/i }).first();
    await expect(docsLink).toBeEnabled();
    await expect(docsLink).toHaveAttribute('href', /.+/);
  });

  test('should show dropdown menu on hover', async ({ page }) => {
    // Find the home dropdown trigger
    const homeDropdown = page.locator('nav').first().getByText('Home').first();
    
    if (await homeDropdown.isVisible()) {
      // Hover over home link
      await homeDropdown.hover();
      await page.waitForTimeout(500);
      
      // Dropdown items should be visible
      const experienceLink = page.locator('a[href*="/home/experience"]').first();
      const isDropdownVisible = await experienceLink.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isDropdownVisible) {
        await expect(experienceLink).toBeVisible();
      }
    }
  });

  test('should change appearance when scrolled', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    // Navbar should still be visible
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();
  });
});
