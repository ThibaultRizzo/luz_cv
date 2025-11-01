/**
 * API Response Types
 * Generic types for consistent API responses across the application
 */

/**
 * Generic API Response wrapper
 * @template T The type of data in the response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ msg: string; param?: string }>;
}

export type ApiErrorResponse = ApiResponse<never>;

// Auth types
export interface AuthUser {
  id: string;
  username: string;
  role: string;
  lastLogin?: string;
}

export interface AuthData {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export type AuthResponse = ApiResponse<AuthData>;

// Content types
export type ContentData = Record<string, unknown>;
export type ContentResponse = ApiResponse<ContentData>;

// Upload types
export interface UploadData {
  path: string;
}

export type UploadResponse = ApiResponse<UploadData>;

// Contact types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export type ContactResponse = ApiResponse<{ success: true }>;
