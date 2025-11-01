/**
 * Logger Utility
 * Structured logging for development and production debugging
 */

export const logger = {
  /**
   * Log informational message
   */
  info: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data || '');
    }
  },

  /**
   * Log warning message
   */
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data || '');
  },

  /**
   * Log error message
   */
  error: (message: string, error?: unknown) => {
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
    console.error(`[ERROR] ${message}`, errorDetails || '');
  },

  /**
   * Log debug message (only in development)
   */
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
} as const;
