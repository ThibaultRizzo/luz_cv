import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';
import { waitForBackofficeLoad } from './helpers/backoffice';

test.describe('Content Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginAsAdmin(page);
    await waitForBackofficeLoad(page);
  });

  test('should display all section tabs', async ({ page }) => {
    // Check that all tabs are visible
    await expect(page.locator('button:has-text("Hero")').first()).toBeVisible();
    await expect(page.locator('button:has-text("About")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Experience")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Skills")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Contact")').first()).toBeVisible();
  });
});
