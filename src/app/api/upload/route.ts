import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alelunapaint-super-secure-jwt-secret-key-2024-development';

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
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      maxSize = 5 * 1024 * 1024; // 5MB
      const ext = file.name.split('.').pop() || 'jpg';
      fileName = `hero.${ext}`;
    } else {
      // PDF upload (for CV)
      allowedTypes = ['application/pdf'];
      maxSize = 10 * 1024 * 1024; // 10MB
      fileName = 'cv.pdf';
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: `Only ${fileType === 'image' ? 'image files (JPG, PNG, WebP)' : 'PDF files'} are allowed` },
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public directory
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: { path: `/uploads/${fileName}` }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
