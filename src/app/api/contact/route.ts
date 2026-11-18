import { NextResponse } from 'next/server';
import { logger } from '@/utils/logger';
import { getServerEnv } from '@/utils/env';

/**
 * Contact API Route Handler
 *
 * Validates submissions, verifies optional bot prevention (reCAPTCHA),
 * and requires an actual Resend API key + verified CONTACT_EMAIL to send mail.
 * Never returns fake success when email delivery is unconfigured or fails.
 */

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
}

function isPlaceholderEmail(email?: string): boolean {
  if (!email) return true;
  const trimmed = email.trim().toLowerCase();
  return !trimmed || trimmed.endsWith('@example.com');
}

function isEmailServiceConfigured(): boolean {
  const serverEnv = getServerEnv();
  const hasKey = Boolean(serverEnv.resendApiKey?.trim()) || Boolean(serverEnv.web3FormsAccessKey?.trim());
  return hasKey && !isPlaceholderEmail(serverEnv.contactEmail);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function GET() {
  return NextResponse.json(
    {
      configured: isEmailServiceConfigured(),
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactRequestBody>;

    // 1. Input validation
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message must be between 10 and 5000 characters.',
        },
        { status: 400 }
      );
    }

    const serverEnv = getServerEnv();
    const recipient = (serverEnv.contactEmail?.trim() || 'alishbainteligent46@gmail.com');

    // 2. Check whether real email delivery is configured
    if (!isEmailServiceConfigured()) {
      logger.warn('Contact form submission blocked: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is configured.');
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error:
            'Direct automated email delivery is not configured yet. Please use the "Send via Email App" button or configure RESEND_API_KEY in .env.local.',
        },
        { status: 503 }
      );
    }

    // 3. Optional reCAPTCHA verification
    if (serverEnv.recaptchaSecretKey) {
      const token = body.recaptchaToken;
      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Bot protection verification token required.' },
          { status: 400 }
        );
      }

      try {
        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: serverEnv.recaptchaSecretKey,
            response: token,
          }),
        });

        const verifyData = (await verifyRes.json()) as { success?: boolean; score?: number };
        if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
          logger.warn(`reCAPTCHA check failed for contact submission: ${email}`);
          return NextResponse.json(
            { success: false, error: 'Anti-bot verification failed. Please retry.' },
            { status: 403 }
          );
        }
      } catch (recaptchaErr) {
        logger.error('Error verifying reCAPTCHA with Google service:', recaptchaErr);
        return NextResponse.json(
          { success: false, error: 'Unable to verify anti-bot check. Please try again.' },
          { status: 502 }
        );
      }
    }

    // 4. Send email via Web3Forms (if configured)
    if (serverEnv.web3FormsAccessKey) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: serverEnv.web3FormsAccessKey,
            name,
            email,
            message,
            subject: `[Portfolio Contact] New message from ${name}`,
            from_name: 'Alishba Portfolio',
          }),
        });

        const web3Data = (await web3Res.json().catch(() => ({}))) as {
          success?: boolean;
          message?: string;
        };

        if (web3Res.ok && web3Data.success !== false) {
          logger.info(`Contact message dispatched to ${recipient} via Web3Forms.`);
          return NextResponse.json(
            {
              success: true,
              message: 'Your message has been sent successfully. Thank you for reaching out!',
              receivedAt: new Date().toISOString(),
            },
            { status: 200 }
          );
        } else {
          logger.warn('Web3Forms returned failure:', web3Data);
          return NextResponse.json(
            {
              success: false,
              error: web3Data.message || 'Web3Forms service was unable to deliver message.',
            },
            { status: 502 }
          );
        }
      } catch (web3Err) {
        logger.error('Web3Forms dispatch error:', web3Err);
      }
    }

    // 5. Send email via Resend (if configured)
    if (serverEnv.resendApiKey) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message);

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${serverEnv.resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Alishba Portfolio <onboarding@resend.dev>',
            to: [recipient],
            reply_to: email,
            subject: `[Portfolio Contact] New message from ${name}`,
            html: `
              <div style="font-family: monospace, sans-serif; background: #070b18; color: #e2e8f0; padding: 24px; border-radius: 8px; border: 1px solid #00d4ff;">
                <h2 style="color: #00d4ff; margin-top: 0;">New Portfolio Contact Message</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
                <h3 style="color: #a855f7;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
              </div>
            `,
          }),
        });

        if (!emailRes.ok) {
          const errData = await emailRes.json().catch(() => ({}));
          logger.error('Resend delivery error:', errData);
          return NextResponse.json(
            {
              success: false,
              error: 'Email service could not deliver the message. Please try again later.',
            },
            { status: 502 }
          );
        }

        logger.info(`Contact email successfully dispatched to ${recipient} via Resend.`);
        return NextResponse.json(
          {
            success: true,
            message: 'Your message has been sent successfully. Thank you for reaching out!',
            receivedAt: new Date().toISOString(),
          },
          { status: 200 }
        );
      } catch (emailErr) {
        logger.error('Failed to communicate with Resend API:', emailErr);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to reach email delivery service. Please try again later.',
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Email service provider was unable to send message.' },
      { status: 502 }
    );
  } catch (error) {
    logger.error('Failed to process contact submission in API route:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request payload or server error.' },
      { status: 400 }
    );
  }
}
