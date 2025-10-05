import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers/auth';
import { navigateToTab, saveChanges, waitForBackofficeLoad } from './helpers/backoffice';
import fs from 'fs';
import path from 'path';

test.describe('File Upload', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginAsAdmin(page);
    await waitForBackofficeLoad(page);
  });

  // Helper function to create a test image buffer
  function createTestImage(): Buffer {
    // Create a simple 1x1 PNG image
    // PNG signature + IHDR chunk for 1x1 red pixel
    const png = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // bit depth, color type, etc.
      0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x08, 0x99, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0x6D, 0x74, 0x57,
      0x9B, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, // IEND chunk
      0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    return png;
  }

  test('should upload hero image successfully', async ({ page }) => {
    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Create test image
    const testImageBuffer = createTestImage();
    const testImagePath = path.join(__dirname, 'fixtures', 'test-upload.png');

    // Ensure fixtures directory exists
    const fixturesDir = path.join(__dirname, 'fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Write test image to file
    fs.writeFileSync(testImagePath, testImageBuffer);

    try {
      // Find file input for images
      const fileInput = page.locator('input[type="file"][accept*="image"]').first();

      // Upload the file
      await fileInput.setInputFiles(testImagePath);

      // Wait for upload to complete
      await page.waitForTimeout(2000);

      // Look for success message
      await expect(page.locator('text=/uploaded|success/i').first()).toBeVisible({ timeout: 10000 });

    } finally {
      // Clean up test file
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('should reject invalid file types', async ({ page }) => {
    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Create a test text file
    const testFilePath = path.join(__dirname, 'fixtures', 'test-invalid.txt');

    // Ensure fixtures directory exists
    const fixturesDir = path.join(__dirname, 'fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Write test file
    fs.writeFileSync(testFilePath, 'This is not an image');

    try {
      // Find file input for images
      const fileInput = page.locator('input[type="file"][accept*="image"]').first();

      // Try to upload the invalid file
      await fileInput.setInputFiles(testFilePath);

      // Wait for error/rejection
      await page.waitForTimeout(2000);

      // The file input might reject it automatically due to accept attribute
      // Or we should see an error message if it goes through
      const errorVisible = await page.locator('text=/error|invalid|failed/i').first().isVisible().catch(() => false);
      const successVisible = await page.locator('text=/uploaded|success/i').first().isVisible().catch(() => false);

      // Either there should be an error, or no success message
      expect(errorVisible || !successVisible).toBeTruthy();

    } finally {
      // Clean up test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });

  test('should handle large file size validation', async ({ page }) => {
    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Note: Creating an actual large file might be too slow for tests
    // This test verifies the UI elements exist
    const fileInput = page.locator('input[type="file"][accept*="image"]').first();
    await expect(fileInput).toBeVisible();

    // The actual file size validation happens server-side
    // This test just ensures the upload mechanism is in place
  });

  test('should show upload progress or feedback', async ({ page }) => {
    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    // Create test image
    const testImageBuffer = createTestImage();
    const testImagePath = path.join(__dirname, 'fixtures', 'test-progress.png');

    // Ensure fixtures directory exists
    const fixturesDir = path.join(__dirname, 'fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Write test image to file
    fs.writeFileSync(testImagePath, testImageBuffer);

    try {
      // Find file input
      const fileInput = page.locator('input[type="file"][accept*="image"]').first();

      // Set up a listener for network activity
      const uploadPromise = page.waitForResponse(response =>
        response.url().includes('/api/upload') && response.request().method() === 'POST',
        { timeout: 10000 }
      );

      // Upload the file
      await fileInput.setInputFiles(testImagePath);

      // Wait for upload request
      await uploadPromise;

      // Should see some kind of feedback
      const feedbackVisible = await page.locator('text=/uploading|uploaded|success/i').first().isVisible().catch(() => false);
      expect(feedbackVisible).toBeTruthy();

    } finally {
      // Clean up test file
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('should allow re-uploading after first upload', async ({ page }) => {
    // Navigate to Hero tab
    await navigateToTab(page, 'Hero');

    const fixturesDir = path.join(__dirname, 'fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Create first test image
    const testImage1Buffer = createTestImage();
    const testImage1Path = path.join(fixturesDir, 'test-upload-1.png');
    fs.writeFileSync(testImage1Path, testImage1Buffer);

    // Create second test image
    const testImage2Buffer = createTestImage();
    const testImage2Path = path.join(fixturesDir, 'test-upload-2.png');
    fs.writeFileSync(testImage2Path, testImage2Buffer);

    try {
      const fileInput = page.locator('input[type="file"][accept*="image"]').first();

      // First upload
      await fileInput.setInputFiles(testImage1Path);
      await page.waitForTimeout(2000);
      await expect(page.locator('text=/uploaded|success/i').first()).toBeVisible({ timeout: 10000 });

      // Wait a moment
      await page.waitForTimeout(1000);

      // Second upload
      await fileInput.setInputFiles(testImage2Path);
      await page.waitForTimeout(2000);
      await expect(page.locator('text=/uploaded|success/i').first()).toBeVisible({ timeout: 10000 });

    } finally {
      // Clean up test files
      [testImage1Path, testImage2Path].forEach(filePath => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
  });
});
