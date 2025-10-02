import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db/connection';
import { content, contentBackups, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'alelunapaint-super-secure-jwt-secret-key-2024-development';

function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// GET - Retrieve content (public)
export async function GET() {
  try {
    const contentResult = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .orderBy(desc(content.updatedAt))
      .limit(1);

    if (contentResult.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No content found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contentResult[0],
    });
  } catch (error) {
    console.error('Content retrieval error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve content' },
      { status: 500 }
    );
  }
}

// PUT - Update content (admin only)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const decoded = verifyToken(authHeader);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updates = await request.json();

    // Get current content for backup
    const currentContentResult = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    let currentContent = currentContentResult[0];
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
          ...updates,
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
          ...updates,
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

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      data: responseData,
    });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update content' },
      { status: 500 }
    );
  }
}