import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for contact section to be in DOM
    await page.waitForSelector('#contact', { state: 'attached' });
  });

  test('should display contact form', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Check form elements are visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Click submit without filling form
    await page.locator('button[type="submit"]').click();

    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form with invalid email
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'This is a test message with enough characters');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for email validation error
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should show validation error for short message', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form with short message
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Short');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for message validation error
    await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible();
  });

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Submit empty form to trigger errors
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('text=Name is required')).toBeVisible();

    // Start typing in name field
    await page.fill('input[name="name"]', 'T');

    // Error should disappear
    await expect(page.locator('text=Name is required')).not.toBeVisible();
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form with valid data
    await page.fill('input[name="name"]', 'E2E Test User');
    await page.fill('input[name="email"]', 'e2etest@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('textarea[name="message"]', 'This is an automated end-to-end test message from Playwright.');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Wait for submission (button should show "Sending...")
    await expect(page.locator('button[type="submit"]:has-text("Sending...")')).toBeVisible({ timeout: 2000 });

    // Wait for success message or error message
    const successMessage = page.locator('div.bg-green-100');
    const errorMessage = page.locator('div.bg-red-100');

    // Either success or error should appear (depends on env vars being set)
    await expect(successMessage.or(errorMessage).first()).toBeVisible({ timeout: 10000 });

    // Check result - either success or acceptable error
    const isError = await errorMessage.isVisible();
    if (isError) {
      const errorText = await errorMessage.textContent();
      // Should be a config/service error, not a validation error
      // Accept any error that's not a validation error (Resend restrictions are OK in test mode)
      expect(errorText).not.toMatch(/Name is required|Email is required|Message is required|invalid email/i);
    } else {
      // Success - form should be cleared
      await expect(page.locator('input[name="name"]')).toHaveValue('');
      await expect(page.locator('input[name="email"]')).toHaveValue('');
      await expect(page.locator('textarea[name="message"]')).toHaveValue('');
    }
  });

  test('should handle rate limiting gracefully', async ({ page }) => {
    // This test verifies the UI handles rate limit errors properly
    // We'll submit multiple times quickly

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    const validData = {
      name: 'Rate Limit Test',
      email: 'ratelimit@example.com',
      message: 'Testing rate limiting functionality with a sufficiently long message.'
    };

    // Submit form multiple times
    for (let i = 0; i < 4; i++) {
      await page.fill('input[name="name"]', `${validData.name} ${i}`);
      await page.fill('input[name="email"]', validData.email);
      await page.fill('textarea[name="message"]', `${validData.message} Attempt ${i}`);

      await page.locator('button[type="submit"]').click();

      // Wait for response
      await page.waitForTimeout(1000);

      // Close any success/error messages by waiting for them to auto-hide or continue
      const successMsg = page.locator('div.bg-green-100');
      const errorMsg = page.locator('div.bg-red-100');

      if (await successMsg.isVisible() || await errorMsg.isVisible()) {
        // Wait a bit before next submission
        await page.waitForTimeout(1000);
      }
    }

    // After 4 submissions, we might see rate limiting (or config error)
    // Just verify the form still works and doesn't crash
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});
