import { Page, expect } from '@playwright/test';

/**
 * Navigate to a specific tab in the back office
 */
export async function navigateToTab(page: Page, tabName: string) {
  // Click on the tab
  await page.click(`button:has-text("${tabName}")`);

  // Wait for content to load
  await page.waitForTimeout(500);
}

/**
 * Save changes in the back office
 */
export async function saveChanges(page: Page) {
  // Click Save Changes button
  await page.click('button:has-text("Save Changes")');

  // Wait for save to complete
  await page.waitForTimeout(1000);

  // Check for success indication
  await expect(page.locator('text=/saved|success/i').first()).toBeVisible({ timeout: 10000 });
}

/**
 * Update a text field in the back office
 */
export async function updateTextField(page: Page, label: string, value: string) {
  // Find input by label
  const input = page.locator(`label:has-text("${label}") + input, label:has-text("${label}") + textarea`).first();

  // Clear and fill
  await input.clear();
  await input.fill(value);
}

/**
 * Get the current tab name
 */
export async function getCurrentTab(page: Page): Promise<string> {
  const activeTab = await page.locator('[role="tab"][aria-selected="true"], button.bg-brand-gold').first();
  return await activeTab.textContent() || '';
}

/**
 * Wait for back office to be fully loaded
 */
export async function waitForBackofficeLoad(page: Page) {
  // Wait for main content area
  await expect(page.locator('text=Back Office').first()).toBeVisible();

  // Wait for tabs to be visible
  await expect(page.locator('button:has-text("Hero")').first()).toBeVisible();

  // Wait for network idle
  await page.waitForLoadState('networkidle');
}
