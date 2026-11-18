import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/3d/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card-bg, rgba(18, 18, 22, 0.7))',
          foreground: 'var(--foreground, #ffffff)',
        },
        muted: {
          DEFAULT: 'var(--background-secondary, #0a0a0c)',
          foreground: 'var(--foreground-muted, #a1a1aa)',
        },
        border: 'var(--card-border, rgba(255, 255, 255, 0.08))',
        obsidian: {
          DEFAULT: '#030303',
          darker: '#000000',
          surface: '#0a0a0c',
          card: '#121216',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(255, 255, 255, 0.12)',
        },
        cyber: {
          dark: '#030303',
          darker: '#000000',
          card: '#0a0a0c',
          elevated: '#121216',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#ffffff',
          cyan: '#f4f4f5',
          pink: '#e4e4e7',
          violet: '#a1a1aa',
          orange: '#d4d4d8',
          glow: '#ffffff',
          neon: '#ffffff',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(255, 255, 255, 0.06)',
        'glow-md': '0 0 25px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 45px rgba(255, 255, 255, 0.14)',
        'glow-cyan': '0 0 25px rgba(255, 255, 255, 0.08)',
        'glow-pink': '0 0 25px rgba(255, 255, 255, 0.08)',
        'glow-violet': '0 0 25px rgba(255, 255, 255, 0.08)',
        'glow-orange': '0 0 25px rgba(255, 255, 255, 0.08)',
        'card-cyber': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 50%, #52525b 100%)',
        'gradient-platinum': 'linear-gradient(180deg, #ffffff 0%, #71717a 100%)',
        'gradient-silver': 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
        'gradient-synthwave': 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 50%, #71717a 100%)',
        'gradient-cyber-card':
          'linear-gradient(180deg, rgba(18, 18, 22, 0.8) 0%, rgba(10, 10, 12, 0.95) 100%)',
        'gradient-glow-radial':
          'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
