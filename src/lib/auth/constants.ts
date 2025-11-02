/**
 * JWT Configuration Constants
 * Centralized JWT and refresh token configuration
 */

// Validate required secrets are set
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    'JWT_SECRET environment variable is required. ' +
    'Set it in your .env file for development or in Vercel environment variables for production.'
  );
}

if (!REFRESH_TOKEN_SECRET) {
  throw new Error(
    'REFRESH_TOKEN_SECRET environment variable is required. ' +
    'Set it in your .env file for development or in Vercel environment variables for production.'
  );
}

export const JWT_CONFIG = {
  secret: JWT_SECRET,
  refreshSecret: REFRESH_TOKEN_SECRET,
  expiresIn: (process.env.JWT_EXPIRE || '24h') as string,
  refreshExpiresIn: (process.env.REFRESH_TOKEN_EXPIRE || '7d') as string,
  audience: 'alequintanarpaint-frontend',
  issuer: 'alequintanarpaint-backend',
} as const;
