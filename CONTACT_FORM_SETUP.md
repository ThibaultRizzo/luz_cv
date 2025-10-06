# Contact Form Setup Guide

## Overview

The contact form now uses **Resend** to send emails securely with proper validation and rate limiting.

## Features ✨

- **Real email sending** via Resend API
- **Client-side validation** with instant feedback
- **Server-side validation** to prevent malicious input
- **Rate limiting** (3 emails per 10 minutes per IP)
- **Spam protection** via input sanitization
- **Professional email templates** with HTML formatting
- **Error handling** with user-friendly messages
- **Loading states** during submission

## Setup Instructions

### 1. Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Create an API key from the dashboard
4. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Resend Email Service (for contact form)
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL_FROM=Contact Form <onboarding@resend.dev>
CONTACT_EMAIL_TO=your-email@example.com
```

**Important:**
- `RESEND_API_KEY`: Your API key from Resend
- `CONTACT_EMAIL_FROM`: The sender email (use Resend's default or your verified domain)
- `CONTACT_EMAIL_TO`: Where you want to receive contact form submissions

### 3. Verify Domain (Optional but Recommended)

For production, verify your domain in Resend:
1. Go to Resend dashboard → Domains
2. Add your domain
3. Add the DNS records to your domain provider
4. Update `CONTACT_EMAIL_FROM` to use your domain:
   ```
   CONTACT_EMAIL_FROM=Contact Form <contact@yourdomain.com>
   ```

## Testing the Contact Form

### Local Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000#contact`

3. Fill out the form with:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Message**: This is a test message (min 10 characters)

4. Click "Send Message"

5. Check:
   - Success message appears
   - Form clears automatically
   - Email arrives at `CONTACT_EMAIL_TO` address

### Rate Limiting Test

Try submitting more than 3 times in 10 minutes - you should see:
```
Too many requests. Please try again later.
```

### Validation Tests

Try these to test validation:

| Field | Test | Expected Result |
|-------|------|----------------|
| Name | Empty | "Name is required" |
| Name | "A" | "Name must be at least 2 characters" |
| Email | Empty | "Email is required" |
| Email | "invalid" | "Please enter a valid email address" |
| Message | Empty | "Message is required" |
| Message | "short" | "Message must be at least 10 characters" |

## Security Features

### Input Sanitization
- Strips HTML/script tags from all inputs
- Prevents XSS attacks
- Validates email format
- Enforces length limits

### Rate Limiting
- 3 emails per 10 minutes per IP address
- In-memory storage (for production, use Redis)
- Prevents spam and abuse

### Server-Side Validation
- All validation runs on both client AND server
- Prevents bypassing client validation
- Returns detailed error messages

## Troubleshooting

### Email not sending

**Check:**
1. Is `RESEND_API_KEY` set correctly?
2. Is the API key active in Resend dashboard?
3. Check server logs for errors: `npm run dev` (look for "Resend error:")
4. Verify `CONTACT_EMAIL_TO` is a valid email

### "Email service is not configured" error

**Solution:**
Ensure these env vars are set in `.env.local`:
- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO`

### Rate limit too strict

**Adjust in:** `src/app/api/contact/route.ts`

```typescript
const RATE_LIMIT_MAX = 5;  // Change from 3 to 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;  // Change to 15 minutes
```

### Validation too strict

**Adjust in:** `src/components/Contact.tsx` and `src/app/api/contact/route.ts`

Example - allow shorter messages:
```typescript
// In Contact.tsx and route.ts
if (message.trim().length < 5) {  // Change from 10 to 5
```

## Email Template

Emails are sent with:
- **HTML format** with professional styling
- **Plain text fallback** for email clients that don't support HTML
- **Metadata** (IP address, timestamp) for security
- **Reply-to** set to sender's email

## Production Considerations

### For Production Deployment:

1. **Verify your domain** in Resend (avoids spam filters)
2. **Use Redis for rate limiting** instead of in-memory storage
3. **Add CAPTCHA** (Google reCAPTCHA or hCaptcha) for extra spam protection
4. **Monitor** email sending in Resend dashboard
5. **Set up email alerts** for failed deliveries

### Recommended: Add CAPTCHA

For production, consider adding reCAPTCHA:

```bash
npm install react-google-recaptcha
```

Then update the form to include CAPTCHA verification before submission.

## API Endpoint

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",  // optional
  "message": "Hello, I'd like to connect..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "Error description here"
}
```

## Support

For issues or questions:
1. Check Resend dashboard for email logs
2. Check server console for error messages
3. Verify all environment variables are set
4. Test with Resend's test mode first

---

**Last Updated:** 2025-01-06
**Resend Version:** 6.1.2
