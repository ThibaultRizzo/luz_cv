/**
 * Validation Utilities
 * Centralized validation functions and regex patterns
 */

// Email validation regex - used across API routes and components
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param email The email address to validate
 * @returns true if email format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Sanitize string input to remove potential HTML/script tags
 * @param input The input string to sanitize
 * @returns Sanitized string with HTML tags removed
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate string length
 * @param value The string to validate
 * @param min Minimum length (inclusive)
 * @param max Maximum length (inclusive)
 * @returns true if length is within bounds, false otherwise
 */
export function validateStringLength(value: string, min: number, max: number): boolean {
  const trimmed = value.trim();
  return trimmed.length >= min && trimmed.length <= max;
}
