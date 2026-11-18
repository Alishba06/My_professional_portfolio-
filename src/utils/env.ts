/**
 * Environment Configuration and Validation
 * Part of Base Architecture (T009)
 * Provides type-safe access to environment variables.
 */

export interface PublicEnv {
  siteUrl: string;
  enableAudio: boolean;
  enableAnalytics: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  recaptchaSiteKey?: string;
  web3FormsAccessKey?: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

export interface ServerEnv extends PublicEnv {
  resendApiKey?: string;
  contactEmail?: string;
  recaptchaSecretKey?: string;
  geminiApiKey?: string;
  web3FormsAccessKey?: string;
}

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

function parseBoolean(val: string | undefined, defaultVal = false): boolean {
  if (!val) return defaultVal;
  return val.toLowerCase() === 'true' || val === '1';
}

/**
 * Public client-safe environment variables
 */
export const publicEnv: PublicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  enableAudio: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_AUDIO, false),
  enableAnalytics: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS, false),
  logLevel:
    (process.env.NEXT_PUBLIC_LOG_LEVEL?.toLowerCase() as PublicEnv['logLevel']) ||
    (isProduction ? 'info' : 'debug'),
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  web3FormsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
  isProduction,
  isDevelopment,
};

/**
 * Server-only environment variables accessor.
 * Throws an error if attempted on the client side to protect secrets.
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== 'undefined') {
    throw new Error('getServerEnv() cannot be called in client-side code.');
  }

  return {
    ...publicEnv,
    resendApiKey: process.env.RESEND_API_KEY,
    contactEmail: process.env.CONTACT_EMAIL || 'alishbainteligent46@gmail.com',
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    web3FormsAccessKey: process.env.WEB3FORMS_ACCESS_KEY,
  };
}

/**
 * Unified env export for general consumption
 */
export const env = publicEnv;
