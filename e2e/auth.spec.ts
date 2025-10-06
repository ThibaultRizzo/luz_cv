import { test, expect } from '@playwright/test';
import { loginAsAdmin, logout } from './helpers/auth';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    // Navigate to login page
    await page.goto('/nadia');

    // Check that login form is visible
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check for login-related text
    await expect(page.locator('text=/login|sign in/i').first()).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/nadia');

    // Fill in invalid credentials
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message (check for the red error div)
    await expect(page.locator('div.bg-red-100').first()).toBeVisible({ timeout: 10000 });

    // Should still be on login page
    expect(page.url()).toContain('/nadia');
    expect(page.url()).not.toContain('/backoffice');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'your-password';

    await page.goto('/nadia');

    // Fill in valid credentials
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to back office
    await page.waitForURL('**/nadia/backoffice', { timeout: 10000 });

    // Check that we're on the back office page
    expect(page.url()).toContain('/nadia/backoffice');

    // Check for back office content
    await expect(page.locator('text=Content Editor').first()).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await loginAsAdmin(page);

    // Verify we're logged in
    expect(page.url()).toContain('/nadia/backoffice');

    // Logout
    await logout(page);

    // Should be redirected away from back office
    await page.waitForTimeout(1000);
    expect(page.url()).not.toContain('/backoffice');
  });

  test('should not allow direct access to back office without login', async ({ page, context }) => {
    // Clear any existing auth
    await context.clearCookies();
    await page.goto('/');

    // Try to access back office directly
    await page.goto('/nadia/backoffice');

    // Should be redirected to login
    await page.waitForURL('**/nadia', { timeout: 5000 });
    expect(page.url()).not.toContain('/backoffice');
  });

  test('should persist session after page reload', async ({ page }) => {
    // Login
    await loginAsAdmin(page);

    // Verify we're logged in
    expect(page.url()).toContain('/nadia/backoffice');

    // Reload page
    await page.reload();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Should still be logged in
    expect(page.url()).toContain('/nadia/backoffice');
    await expect(page.locator('text=Content Editor').first()).toBeVisible();
  });
});
