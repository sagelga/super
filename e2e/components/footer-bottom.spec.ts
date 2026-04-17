import { test, expect } from '@playwright/test';

test.describe('FooterBottom', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en');
    });

    test('should display copyright text', async ({ page }) => {
        const footerBottom = page.locator('.footer-bottom');
        await expect(footerBottom).toBeVisible();
        
        const copyrightText = footerBottom.locator('span').first();
        await expect(copyrightText).toContainText(/© 2021–\d{4} Kunanon Srisuntiroj/);
    });

    test('should display language button', async ({ page }) => {
        const languageButton = page.locator('.footer-toggle-btn').first();
        await expect(languageButton).toBeVisible();
    });

    test('should display cookie settings button', async ({ page }) => {
        const cookieButton = page.locator('.footer-toggle-btn').nth(1);
        await expect(cookieButton).toBeVisible();
    });

    test('should display theme button', async ({ page }) => {
        const themeButton = page.locator('.footer-toggle-btn').nth(2);
        await expect(themeButton).toBeVisible();
    });

    test('should have three toggle buttons in footer bottom', async ({ page }) => {
        const buttons = page.locator('.footer-bottom .footer-toggle-btn');
        await expect(buttons).toHaveCount(3);
    });

    test('should have correct CSS classes applied', async ({ page }) => {
        const footerBottom = page.locator('.footer-bottom');
        await expect(footerBottom).toHaveClass('footer-bottom');
        
        const buttons = page.locator('.footer-toggle-btn');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await expect(buttons.nth(i)).toHaveClass(/footer-toggle-btn/);
        }
    });
});