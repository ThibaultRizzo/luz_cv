import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting (for production, use Redis or a proper rate limiter)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 3 emails per 10 minutes per IP
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 60 * 1000);

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  // Remove any potential HTML/script tags
  return input.replace(/<[^>]*>/g, '').trim();
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, email, and message are required.'
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const company = body.company ? sanitizeInput(body.company) : '';
    const message = sanitizeInput(body.message);

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please contact the administrator.'
        },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      console.error('CONTACT_EMAIL_TO is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please contact the administrator.'
        },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #0B132B; color: #F9F5F0; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0B132B; }
              .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #C7A17A; border-radius: 4px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from your portfolio contact form.</p>
                  <p>IP Address: ${ip}</p>
                  <p>Timestamp: ${new Date().toISOString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
IP Address: ${ip}
Timestamp: ${new Date().toISOString()}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email. Please try again later.'
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
