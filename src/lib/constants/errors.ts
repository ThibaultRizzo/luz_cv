/**
 * Error Messages
 * Centralized error messages used across the application
 */

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    TOKEN_REQUIRED: 'Access token required',
    TOKEN_EXPIRED: 'Invalid or expired token',
    UNAUTHORIZED: 'Unauthorized',
    USER_NOT_FOUND: 'User not found',
    ADMIN_REQUIRED: 'Admin access required',
  },
  CONTACT: {
    RATE_LIMIT: 'Too many requests. Please try again later.',
    REQUIRED_FIELDS: 'Name, email, and message are required.',
    INVALID_INPUT: 'Please check your input and try again.',
    SEND_FAILED: 'Failed to send email. Please try again later.',
    SERVICE_UNAVAILABLE: 'Email service is not configured. Please contact the administrator.',
  },
  UPLOAD: {
    NO_FILE: 'No file uploaded',
    INVALID_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File size exceeds limit',
    UPLOAD_FAILED: 'Failed to upload file',
  },
  CONTENT: {
    NOT_FOUND: 'No content found',
    UPDATE_FAILED: 'Failed to update content',
    RETRIEVAL_FAILED: 'Failed to retrieve content',
    BACKUP_FAILED: 'Failed to create backup',
    RESTORE_FAILED: 'Failed to restore backup',
    NOT_INITIALIZED: 'Content already initialized',
    ADMIN_NOT_FOUND: 'Admin user not found',
  },
  GENERAL: {
    INTERNAL_ERROR: 'Internal server error',
    INVALID_REQUEST: 'Invalid request',
    NOT_FOUND: 'Resource not found',
    METHOD_NOT_ALLOWED: 'Method not allowed',
  },
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;
