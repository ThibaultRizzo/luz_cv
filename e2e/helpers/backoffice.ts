import { Page, expect } from '@playwright/test';

/**
 * Wait for back office to be fully loaded
 */
export async function waitForBackofficeLoad(page: Page) {
  // Wait for main content area
  await expect(page.locator('text=Content Editor').first()).toBeVisible();

  // Wait for tabs to be visible
  await expect(page.locator('button:has-text("Hero")').first()).toBeVisible();

  // Wait for network idle
  await page.waitForLoadState('networkidle');
}
