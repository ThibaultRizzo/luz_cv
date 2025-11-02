import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifyAuthToken } from '@/lib/auth/middleware';
import { LIMITS } from '@/lib/constants/limits';
import { ERROR_MESSAGES } from '@/lib/constants/errors';
import { logger } from '@/lib/logger';
import { UploadResponse } from '@/lib/types/api';

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const decoded = verifyAuthToken(authHeader);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.AUTH.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'cv' or 'image'

    if (!file) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.UPLOAD.NO_FILE },
        { status: 400 }
      );
    }

    let fileName: string;
    let allowedTypes: readonly string[];
    let maxSize: number;

    if (fileType === 'image') {
      // Image upload (for hero section)
      allowedTypes = LIMITS.UPLOAD.ALLOWED_IMAGE_TYPES;
      maxSize = LIMITS.UPLOAD.IMAGE_MAX_BYTES;
      fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    } else {
      // PDF upload (for CV)
      allowedTypes = LIMITS.UPLOAD.ALLOWED_PDF_TYPES;
      maxSize = LIMITS.UPLOAD.PDF_MAX_BYTES;
      fileName = `cv-${Date.now()}.pdf`;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: ERROR_MESSAGES.UPLOAD.INVALID_TYPE },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxMB = fileType === 'image' ? LIMITS.UPLOAD.IMAGE_MAX_MB : LIMITS.UPLOAD.PDF_MAX_MB;
      return NextResponse.json(
        { success: false, message: `File size must be less than ${maxMB}MB` },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    const response: UploadResponse = {
      success: true,
      message: 'File uploaded successfully',
      data: { path: blob.url },
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: ERROR_MESSAGES.UPLOAD.UPLOAD_FAILED, 
        errors: error instanceof Error ? [{ msg: error.message }] : undefined 
      },
      { status: 500 }
    );
  }
}
