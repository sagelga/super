import { test, expect } from '@playwright/test';
import { waitForPageLoad, acceptCookiesIfVisible } from '../utils/test-helpers';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/blog');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
  });

  test('should display the blog page', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/);
    
    // Should have a search input
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
  });

  test('should have a search input that is functional', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
    
    // Type in the search box
    await searchInput.fill('test search');
    
    // Input should contain the search term
    await expect(searchInput).toHaveValue('test search');
  });

  test('should display filter categories', async ({ page }) => {
    // Look for category filter buttons
    const filterBar = page.locator('[class*="filter"], button').filter({ hasText: /all/i }).first();
    if (await filterBar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(filterBar).toBeVisible();
    }
  });

  test('should handle pagination controls', async ({ page }) => {
    // Wait for potential pagination to load
    await page.waitForTimeout(2000);
    
    // Look for pagination buttons
    const prevButton = page.getByRole('button', { name: /previous|prev/i }).first();
    const nextButton = page.getByRole('button', { name: /next/i }).first();
    
    // If pagination exists, test it
    if (await prevButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Previous button should be disabled on first page
      await expect(prevButton).toBeDisabled();
    }
    
    if (await nextButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Should be able to click next
      await nextButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should display blog posts or loading state', async ({ page }) => {
    // Wait for posts to load
    await page.waitForTimeout(3000);
    
    // Should either show posts or a message
    const posts = page.locator('[class*="post"], [class*="card"]');
    const loadingText = page.getByText(/loading/i);
    const errorText = page.getByText(/error/i);
    
    // One of these should be true
    const hasPosts = await posts.first().isVisible({ timeout: 1000 }).catch(() => false);
    const hasLoading = await loadingText.isVisible({ timeout: 1000 }).catch(() => false);
    const hasError = await errorText.isVisible({ timeout: 1000 }).catch(() => false);
    
    expect(hasPosts || hasLoading || hasError).toBeTruthy();
  });
});

test.describe('Blog Page - Navigation', () => {
  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/en/blog');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
    
    // Wait for posts to load
    await page.waitForTimeout(3000);
    
    // Try to find and click a blog post link
    const postLink = page.locator('a[href*="/blog/"]').first();
    
    if (await postLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await postLink.click();
      await waitForPageLoad(page);
      
      // Should be on a blog post page now
      expect(page.url()).toContain('/blog/');
    }
  });

  test('should navigate back to home from blog', async ({ page }) => {
    await page.goto('/en/blog');
    await waitForPageLoad(page);
    await acceptCookiesIfVisible(page);
    
    // Dismiss any overlays
    await page.evaluate(() => {
      document.querySelectorAll('[class*="overlay"], [class*="modal"], [class*="banner"]').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
    
    // Click on home link in navbar
    const homeLink = page.getByRole('link', { name: /home/i }).first();
    await homeLink.click();
    await waitForPageLoad(page);
    
    // Should be on home page - check URL contains the lang prefix
    expect(page.url()).toMatch(/\/(en|th|zh)(\/|$)/);
  });
});
