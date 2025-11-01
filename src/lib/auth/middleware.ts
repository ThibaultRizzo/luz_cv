/**
 * Authentication Middleware
 * Centralized token verification and auth utilities
 */

import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from './constants';

export interface JwtPayload {
  userId: string;
  username: string;
  role: string;
}

/**
 * Extract Bearer token from Authorization header
 * @param authHeader The Authorization header value
 * @returns The token without "Bearer " prefix, or null if invalid
 */
export function extractBearerToken(authHeader: string | null | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Verify JWT token and return decoded payload
 * @param token The JWT token
 * @returns Decoded JWT payload or null if verification fails
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_CONFIG.secret) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Extract and verify Bearer token from Authorization header
 * @param authHeader The Authorization header value
 * @returns Decoded JWT payload or null if extraction/verification fails
 */
export function verifyAuthToken(authHeader: string | null | undefined): JwtPayload | null {
  const token = extractBearerToken(authHeader);
  if (!token) {
    return null;
  }
  return verifyJwt(token);
}

/**
 * Check if user has admin role
 * @param decoded The decoded JWT payload
 * @returns true if user is admin, false otherwise
 */
export function isAdmin(decoded: JwtPayload | null): boolean {
  return decoded?.role === 'admin';
}
