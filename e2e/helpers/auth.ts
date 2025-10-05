import { Page } from '@playwright/test';

/**
 * Login helper function
 * Logs in as admin and navigates to the back office
 */
export async function loginAsAdmin(page: Page) {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'your-password';

  // Navigate to login page
  await page.goto('/nadia');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Fill in credentials
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for navigation to back office
  await page.waitForURL('**/nadia/backoffice', { timeout: 10000 });

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
}

/**
 * Logout helper function
 */
export async function logout(page: Page) {
  // Click logout button
  await page.click('button:has-text("Logout")');

  // Wait for redirect to home or login page
  await page.waitForURL(/\/(nadia)?$/, { timeout: 5000 });
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  try {
    // Try to navigate to back office
    await page.goto('/nadia/backoffice');
    await page.waitForLoadState('networkidle');

    // If we see the back office, we're logged in
    return page.url().includes('/nadia/backoffice');
  } catch {
    return false;
  }
}
