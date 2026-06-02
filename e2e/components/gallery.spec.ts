import { test, expect } from "@playwright/test";
import {
    waitForPageLoad,
    dismissCookieBannerBeforeLoad,
} from "../utils/test-helpers";

test.describe("Gallery Page", () => {
    test.beforeEach(async ({ page }) => {
        await dismissCookieBannerBeforeLoad(page);
        await page.goto("/en/gallery");
        await waitForPageLoad(page);
    });

    test("should load with a visible title", async ({ page }) => {
        const heading = page.locator("h1");
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText(/Visual Work/);
    });

    test("should display all four category filter buttons", async ({ page }) => {
        const filterContainer = page.locator("div.flex.flex-wrap.gap-2");

        const allButton = filterContainer.getByRole("button", { name: /^All/ });
        const projectsButton = filterContainer.getByRole("button", { name: /Projects/ });
        const photographyButton = filterContainer.getByRole("button", { name: /Photography/ });
        const designButton = filterContainer.getByRole("button", { name: /Design/ });

        await expect(allButton).toBeVisible();
        await expect(projectsButton).toBeVisible();
        await expect(photographyButton).toBeVisible();
        await expect(designButton).toBeVisible();
    });

    test("should show all 15 items by default", async ({ page }) => {
        const items = page.locator("div.group.cursor-pointer");
        await expect(items).toHaveCount(15);
    });

    test("should filter to projects only when 'Projects' is clicked", async ({ page }) => {
        const projectsButton = page.getByRole("button", { name: /Projects/ });
        await projectsButton.click();

        const items = page.locator("div.group.cursor-pointer");
        // 5 items in the projects category
        await expect(items).toHaveCount(5);
    });

    test("should filter to photography only when 'Photography' is clicked", async ({ page }) => {
        const photographyButton = page.getByRole("button", { name: /Photography/ });
        await photographyButton.click();

        const items = page.locator("div.group.cursor-pointer");
        // 6 items in the photography category
        await expect(items).toHaveCount(6);
    });

    test("should filter to design only when 'Design' is clicked", async ({ page }) => {
        const designButton = page.getByRole("button", { name: /Design/ });
        await designButton.click();

        const items = page.locator("div.group.cursor-pointer");
        // 4 items in the design category
        await expect(items).toHaveCount(4);
    });

    test("should restore all items when 'All' is clicked after a filter", async ({ page }) => {
        const designButton = page.getByRole("button", { name: /Design/ });
        await designButton.click();

        const allButton = page.getByRole("button", { name: /^All/ });
        await allButton.click();

        const items = page.locator("div.group.cursor-pointer");
        await expect(items).toHaveCount(15);
    });

    test("should open the lightbox when an image is clicked", async ({ page }) => {
        const firstItem = page.locator("div.group.cursor-pointer").first();
        await firstItem.click();

        const closeButton = page.getByRole("button", { name: "Close" });
        await expect(closeButton).toBeVisible();
    });

    test("lightbox should expose Previous, Next, and Close buttons", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const prevButton = page.getByRole("button", { name: "Previous", exact: true });
        const nextButton = page.getByRole("button", { name: "Next", exact: true });
        const closeButton = page.getByRole("button", { name: "Close", exact: true });

        await expect(prevButton).toBeVisible();
        await expect(nextButton).toBeVisible();
        await expect(closeButton).toBeVisible();
    });

    test("should close the lightbox when the Close button is clicked", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const closeButton = page.getByRole("button", { name: "Close" });
        await expect(closeButton).toBeVisible();

        await closeButton.click();

        await expect(closeButton).not.toBeVisible();
    });

    test("should close the lightbox when the Escape key is pressed", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const closeButton = page.getByRole("button", { name: "Close" });
        await expect(closeButton).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(closeButton).not.toBeVisible();
    });

    test("should close the lightbox when the backdrop overlay is clicked", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const closeButton = page.getByRole("button", { name: "Close" });
        await expect(closeButton).toBeVisible();

        // Backdrop is the outer fixed overlay; click in a corner away from image/buttons
        await page.mouse.click(10, 10);

        await expect(closeButton).not.toBeVisible();
    });

    test("should navigate to next image when ArrowRight is pressed", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const counter = page.locator("p.font-sans.text-xs.text-muted").last();
        await expect(counter).toHaveText(/1 \/ 15/);

        await page.keyboard.press("ArrowRight");
        await expect(counter).toHaveText(/2 \/ 15/);
    });

    test("should navigate to previous image when ArrowLeft is pressed", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").nth(1).click();

        const counter = page.locator("p.font-sans.text-xs.text-muted").last();
        await expect(counter).toHaveText(/2 \/ 15/);

        await page.keyboard.press("ArrowLeft");
        await expect(counter).toHaveText(/1 \/ 15/);
    });

    test("should wrap around when navigating past the last image", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").last().click();

        const counter = page.locator("p.font-sans.text-xs.text-muted").last();
        await expect(counter).toHaveText(/15 \/ 15/);

        await page.keyboard.press("ArrowRight");
        await expect(counter).toHaveText(/1 \/ 15/);
    });

    test("should wrap around when navigating before the first image", async ({ page }) => {
        await page.locator("div.group.cursor-pointer").first().click();

        const counter = page.locator("p.font-sans.text-xs.text-muted").last();
        await expect(counter).toHaveText(/1 \/ 15/);

        await page.keyboard.press("ArrowLeft");
        await expect(counter).toHaveText(/15 \/ 15/);
    });

    test("lightbox counter should reflect filtered count when a category is active", async ({ page }) => {
        const designButton = page.getByRole("button", { name: /Design/ });
        await designButton.click();

        await page.locator("div.group.cursor-pointer").first().click();

        const counter = page.locator("p.font-sans.text-xs.text-muted").last();
        await expect(counter).toHaveText(/1 \/ 4/);
    });
});
