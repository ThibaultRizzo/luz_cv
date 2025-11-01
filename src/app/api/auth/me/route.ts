import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyAuthToken } from '@/lib/auth/middleware';
import { ERROR_MESSAGES } from '@/lib/constants/errors';
import { logger } from '@/lib/logger';
import { ApiResponse } from '@/lib/types/api';

interface CurrentUserResponse {
  id: string;
  username: string;
  role: string;
  lastLogin: string | null;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization');
    const decoded = verifyAuthToken(authHeader);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.TOKEN_EXPIRED },
        { status: 401 }
      );
    }

    // Get user from database
    const userResult = await db
      .select({
        id: users.id,
        username: users.username,
        role: users.role,
        lastLogin: users.lastLogin,
      })
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    const user = userResult[0];

    if (!user) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    const response: ApiResponse<{ user: CurrentUserResponse }> = {
      success: true,
      data: { 
        user: {
          ...user,
          lastLogin: user.lastLogin?.toISOString() ?? null,
        }
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Get current user error:', error);
    return NextResponse.json(
      { success: false, message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
