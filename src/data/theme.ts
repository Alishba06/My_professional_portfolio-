/**
 * Visual Theme Design Tokens
 * Source of Truth: specs/001-immersive-ai-portfolio/data-model.md
 * Part of Base Architecture (T007)
 */

import type { VisualTheme } from '@/types/portfolio';

export const visualTheme: VisualTheme = {
  palette: {
    bgPrimary: '#0b0f2b',
    bgSecondary: '#11173d',
    bgTertiary: '#171f4f',
    bgElevated: '#1f2a63',
    fgPrimary: '#f8fafc',
    fgSecondary: '#cbd5e1',
    fgTertiary: '#94a3b8',
    accentPrimary: '#00f0ff',
    accentSecondary: '#ff5ca8',
    accentGlow: 'rgba(255, 92, 168, 0.5)',
    border: 'rgba(0, 240, 255, 0.25)',
    error: '#ff5ca8',
    success: '#00f0ff',
  },
  typography: {
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    textHero: 'clamp(2.5rem, 8vw, 6rem)',
    textH1: 'clamp(2rem, 5vw, 3.5rem)',
    textH2: 'clamp(1.5rem, 3vw, 2.25rem)',
    textBody: '1rem',
    textSmall: '0.875rem',
  },
  effects: {
    glowSm: '0 0 10px rgba(0, 240, 255, 0.45)',
    glowMd: '0 0 20px rgba(255, 92, 168, 0.45)',
    glowLg: '0 0 35px rgba(188, 108, 255, 0.55)',
    gradientFuturistic: 'linear-gradient(135deg, #00f0ff 0%, #ff5ca8 50%, #bc6cff 100%)',
    gradientDark: 'linear-gradient(180deg, #11173d 0%, #0b0f2b 100%)',
    shadowCard: '0 8px 32px rgba(0, 0, 0, 0.65)',
    backdropBlur: 'blur(12px) saturate(180%)',
  },
  motion: {
    easeCinematic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    durationFast: '200ms',
    durationNormal: '400ms',
    durationSlow: '800ms',
    durationHero: '8000ms',
  },
};
