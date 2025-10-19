import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alequintanarpaint-super-secure-jwt-secret-key-2024-development';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'cv' or 'image'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    let fileName: string;
    let allowedTypes: string[];
    let maxSize: number;

    if (fileType === 'image') {
      // Image upload (for hero section)
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
      maxSize = 5 * 1024 * 1024; // 5MB
      // Use a timestamp to make filenames unique
      fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    } else {
      // PDF upload (for CV)
      allowedTypes = ['application/pdf'];
      maxSize = 10 * 1024 * 1024; // 10MB
      fileName = `cv-${Date.now()}.pdf`;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: `Only ${fileType === 'image' ? 'image files (JPG, PNG, WebP, SVG)' : 'PDF files'} are allowed` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: `File size must be less than ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: { path: blob.url }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
