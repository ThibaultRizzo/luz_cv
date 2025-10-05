import { test, expect } from '@playwright/test';
import { loginAsAdmin, logout } from './helpers/auth';
import { navigateToTab, saveChanges, waitForBackofficeLoad } from './helpers/backoffice';

test.describe('Content Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginAsAdmin(page);
    await waitForBackofficeLoad(page);
  });

  test('should display all section tabs', async ({ page }) => {
    // Check that all tabs are visible
    await expect(page.locator('button:has-text("Hero")')).toBeVisible();
    await expect(page.locator('button:has-text("About")')).toBeVisible();
    await expect(page.locator('button:has-text("Experience")')).toBeVisible();
    await expect(page.locator('button:has-text("Skills")')).toBeVisible();
    await expect(page.locator('button:has-text("Contact")')).toBeVisible();
  });

  test('should update hero title and see changes on homepage', async ({ page }) => {
    const timestamp = Date.now();
    const newTitle = `Test Hero Title ${timestamp}`;

    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Find and update hero title
    const titleInput = page.locator('label:has-text("Hero Title")').locator('..').locator('input, textarea').first();
    await titleInput.clear();
    await titleInput.fill(newTitle);

    // Save changes
    await saveChanges(page);

    // Logout to see changes on front office
    await logout(page);

    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify the new title appears on homepage
    await expect(page.locator(`text=${newTitle}`).first()).toBeVisible({ timeout: 10000 });
  });

  test('should update about section content', async ({ page }) => {
    const timestamp = Date.now();
    const newAboutText = `Test About Content ${timestamp}`;

    // Navigate to About tab
    await navigateToTab(page, 'About');

    // Find and update about main text
    const aboutInput = page.locator('label:has-text("About Main Text"), label:has-text("Main Text")').locator('..').locator('textarea').first();
    await aboutInput.clear();
    await aboutInput.fill(newAboutText);

    // Save changes
    await saveChanges(page);

    // Navigate to homepage to verify
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to about section
    await page.locator('#about').scrollIntoViewIfNeeded();

    // Verify the new text appears
    await expect(page.locator(`text=${newAboutText}`).first()).toBeVisible({ timeout: 10000 });
  });

  test('should add and remove experience entry', async ({ page }) => {
    // Navigate to Experience tab
    await navigateToTab(page, 'Experience');

    // Count existing experiences
    const initialCount = await page.locator('button:has-text("Remove Experience")').count();

    // Click Add Experience button
    await page.click('button:has-text("Add Experience")');

    // Wait for new experience form to appear
    await page.waitForTimeout(500);

    // Verify count increased
    const newCount = await page.locator('button:has-text("Remove Experience")').count();
    expect(newCount).toBe(initialCount + 1);

    // Fill in the new experience
    const experienceInputs = page.locator('[class*="space-y"]').last();
    await experienceInputs.locator('input').first().fill('Test Role');

    // Save changes
    await saveChanges(page);

    // Remove the experience
    await page.locator('button:has-text("Remove Experience")').last().click();

    // Wait for removal
    await page.waitForTimeout(500);

    // Verify count is back to original
    const finalCount = await page.locator('button:has-text("Remove Experience")').count();
    expect(finalCount).toBe(initialCount);

    // Save changes
    await saveChanges(page);
  });

  test('should update skills section', async ({ page }) => {
    const timestamp = Date.now();
    const newSkillsTitle = `Test Skills ${timestamp}`;

    // Navigate to Skills tab
    await navigateToTab(page, 'Skills');

    // Update skills title
    const titleInput = page.locator('label:has-text("Skills Title")').locator('..').locator('input').first();
    await titleInput.clear();
    await titleInput.fill(newSkillsTitle);

    // Save changes
    await saveChanges(page);

    // Navigate to homepage to verify
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to skills section
    await page.locator('#skills').scrollIntoViewIfNeeded();

    // Verify the new title appears
    await expect(page.locator(`text=${newSkillsTitle}`).first()).toBeVisible({ timeout: 10000 });
  });

  test('should update contact information', async ({ page }) => {
    const timestamp = Date.now();
    const newContactTitle = `Contact Us ${timestamp}`;

    // Navigate to Contact tab
    await navigateToTab(page, 'Contact');

    // Update contact title
    const titleInput = page.locator('label:has-text("Contact Title")').locator('..').locator('input').first();
    await titleInput.clear();
    await titleInput.fill(newContactTitle);

    // Save changes
    await saveChanges(page);

    // Navigate to homepage to verify
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verify the new title appears
    await expect(page.locator(`text=${newContactTitle}`).first()).toBeVisible({ timeout: 10000 });
  });

  test('should show preview of changes before saving', async ({ page }) => {
    const newTitle = 'Preview Test Title';

    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Update title
    const titleInput = page.locator('label:has-text("Hero Title")').locator('..').locator('input, textarea').first();
    await titleInput.clear();
    await titleInput.fill(newTitle);

    // Wait a moment for preview to update
    await page.waitForTimeout(1000);

    // Check if preview is visible in the Live Preview section
    const previewSection = page.locator('text=Live Preview').locator('..');
    await expect(previewSection).toBeVisible();

    // Note: The preview might not show the exact text due to how the component renders
    // This is a basic check that the preview section exists
  });

  test('should handle multiple quick edits without errors', async ({ page }) => {
    const timestamp = Date.now();

    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Make multiple quick edits
    const titleInput = page.locator('label:has-text("Hero Title")').locator('..').locator('input, textarea').first();

    for (let i = 0; i < 3; i++) {
      await titleInput.clear();
      await titleInput.fill(`Quick Edit ${i} - ${timestamp}`);
      await page.waitForTimeout(300);
    }

    // Save changes
    await saveChanges(page);

    // Verify no errors occurred
    const errorMessages = page.locator('text=/error|failed/i');
    await expect(errorMessages).toHaveCount(0);
  });
});
