/**
 * Application Limits and Constants
 * Centralized configuration for size limits, validation constraints, etc.
 */

export const LIMITS = {
  RATE_LIMIT: {
    MAX_EMAILS: 3,
    WINDOW_MS: 10 * 60 * 1000, // 10 minutes
  },
  UPLOAD: {
    IMAGE_MAX_MB: 5,
    IMAGE_MAX_BYTES: 5 * 1024 * 1024,
    PDF_MAX_MB: 10,
    PDF_MAX_BYTES: 10 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'],
    ALLOWED_PDF_TYPES: ['application/pdf'],
  },
  FORM: {
    NAME_MIN: 2,
    NAME_MAX: 100,
    MESSAGE_MIN: 10,
    MESSAGE_MAX: 5000,
    COMPANY_MAX: 100,
  },
} as const;
