import { NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { content, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_CONTENT } from '@/lib/constants/defaultContent';
import { ERROR_MESSAGES } from '@/lib/constants/errors';
import { logger } from '@/lib/logger';
import { ContentResponse } from '@/lib/types/api';

export async function POST(): Promise<Response> {
  try {
    // Check if content already exists
    const existingContent = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    if (existingContent.length > 0) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.CONTENT.NOT_INITIALIZED },
        { status: 400 }
      );
    }

    // Get admin user
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.username, 'mia'))
      .limit(1);

    if (adminUser.length === 0) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.CONTENT.ADMIN_NOT_FOUND },
        { status: 404 }
      );
    }

    // Insert default content
    const newContent = await db
      .insert(content)
      .values({
        ...DEFAULT_CONTENT,
        version: 1,
        isActive: true,
        lastModifiedBy: adminUser[0].id,
      })
      .returning();

    const response: ContentResponse = {
      success: true,
      message: 'Content initialized successfully',
      data: newContent[0],
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Content initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL.INTERNAL_ERROR;
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
