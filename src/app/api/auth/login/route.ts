import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { db } from '@/lib/db/connection';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { JWT_CONFIG } from '@/lib/auth/constants';
import { ERROR_MESSAGES } from '@/lib/constants/errors';
import { logger } from '@/lib/logger';
import { AuthResponse } from '@/lib/types/api';

function generateTokenPair(user: { id: string; username: string; role: string | null }) {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role || 'admin',
    },
    JWT_CONFIG.secret,
    {
      expiresIn: JWT_CONFIG.expiresIn,
      audience: JWT_CONFIG.audience,
      issuer: JWT_CONFIG.issuer,
    } as SignOptions
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    JWT_CONFIG.refreshSecret,
    {
      expiresIn: JWT_CONFIG.refreshExpiresIn,
      audience: JWT_CONFIG.audience,
      issuer: JWT_CONFIG.issuer,
    } as SignOptions
  );

  return { accessToken, refreshToken };
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.CONTACT.REQUIRED_FIELDS },
        { status: 400 }
      );
    }

    // Find user
    const userResult = await db.select().from(users).where(eq(users.username, username)).limit(1);
    const user = userResult[0];

    if (!user) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS },
        { status: 401 }
      );
    }

    // Generate tokens
    const tokens = generateTokenPair(user);

    // Update refresh tokens and last login
    const currentRefreshTokens = Array.isArray(user.refreshTokens) ? user.refreshTokens : [];
    const updatedRefreshTokens = [...currentRefreshTokens, tokens.refreshToken];

    await db
      .update(users)
      .set({
        refreshTokens: updatedRefreshTokens,
        lastLogin: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          lastLogin: new Date().toISOString(),
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: JWT_CONFIG.expiresIn,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}