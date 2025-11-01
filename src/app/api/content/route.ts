import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { content, contentBackups, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyAuthToken, isAdmin } from '@/lib/auth/middleware';
import { ERROR_MESSAGES } from '@/lib/constants/errors';
import { logger } from '@/lib/logger';
import { ContentResponse } from '@/lib/types/api';

// GET - Retrieve content (public)
export async function GET(): Promise<Response> {
  try {
    const contentResult = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .orderBy(desc(content.updatedAt))
      .limit(1);

    if (contentResult.length === 0) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.CONTENT.NOT_FOUND },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: contentResult[0],
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    logger.error('Content retrieval error:', error);
    return NextResponse.json(
      { success: false, message: ERROR_MESSAGES.CONTENT.RETRIEVAL_FAILED },
      { status: 500 }
    );
  }
}

// PUT - Update content (admin only)
export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization');
    const decoded = verifyAuthToken(authHeader);

    if (!decoded || !isAdmin(decoded)) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.ADMIN_REQUIRED },
        { status: 401 }
      );
    }

    const updates = await request.json();

    // Filter out metadata fields that shouldn't be updated
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, version: __, isActive: ___, lastModifiedBy: ____, createdAt: _____, updatedAt: ______, ...contentUpdates } = updates;

    // Get current content for backup
    const currentContentResult = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    const currentContent = currentContentResult[0];
    let contentId: string;

    if (currentContent) {
      // Create backup before updating
      await db.insert(contentBackups).values({
        contentId: currentContent.id,
        backupData: currentContent,
        version: currentContent.version,
        createdBy: decoded.userId,
      });

      // Update existing content
      const updatedContent = await db
        .update(content)
        .set({
          ...contentUpdates,
          version: currentContent.version + 1,
          lastModifiedBy: decoded.userId,
          updatedAt: new Date(),
        })
        .where(eq(content.id, currentContent.id))
        .returning();

      contentId = updatedContent[0].id;
    } else {
      // Create new content if none exists
      const newContent = await db
        .insert(content)
        .values({
          ...contentUpdates,
          version: 1,
          lastModifiedBy: decoded.userId,
          isActive: true,
        })
        .returning();

      contentId = newContent[0].id;
    }

    // Get updated content with user info
    const updatedContentResult = await db
      .select({
        content,
        user: {
          id: users.id,
          username: users.username,
        },
      })
      .from(content)
      .leftJoin(users, eq(content.lastModifiedBy, users.id))
      .where(eq(content.id, contentId))
      .limit(1);

    const result = updatedContentResult[0];
    const responseData = {
      ...result.content,
      lastModifiedBy: result.user,
    };

    const response: ContentResponse = {
      success: true,
      message: 'Content updated successfully',
      data: responseData,
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Content update error:', error);
    const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.CONTENT.UPDATE_FAILED;
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}