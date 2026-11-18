'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Moon, Sparkles, Terminal } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

export type ThemeMode = 'cyber' | 'deep-space' | 'matrix';

interface ThemeOption {
  id: ThemeMode;
  name: string;
  colorClass: string;
  icon: React.ReactNode;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cyber',
    name: 'Virtual World',
    colorClass: 'bg-cyan-400',
    icon: <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />,
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    colorClass: 'bg-indigo-400',
    icon: <Moon className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />,
  },
  {
    id: 'matrix',
    name: 'Matrix Core',
    colorClass: 'bg-emerald-400',
    icon: <Terminal className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />,
  },
];

export interface ThemeToggleProps {
  inline?: boolean;
}

/**
 * Theme Toggle & HUD Switcher Component
 * Supports both inline (Navbar) and floating positions with cyber glassmorphic dropdown
 */
export function ThemeToggle({ inline = false }: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('cyber');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('alishba_theme') as ThemeMode) || 'cyber';
    if (['cyber', 'deep-space', 'matrix'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleSelectTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('alishba_theme', theme);
    setIsOpen(false);

    window.dispatchEvent(
      new CustomEvent('alishba:theme-change', {
        detail: { theme },
      })
    );

    trackEvent('theme_switched', { theme });
  };

  if (!mounted) return null;

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <div className={`relative ${inline ? 'inline-flex' : 'fixed right-4 top-4 z-50 flex flex-col items-end'}`}>
      {/* HUD Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-[#060c22]/80 px-3 py-1.5 backdrop-blur-xl transition-all hover:border-cyan-400 hover:bg-cyan-500/15 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Toggle theme palette menu"
        aria-expanded={isOpen}
      >
        <Palette className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:rotate-45" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
          {currentThemeObj.name}
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Select theme palette"
          className="animate-in fade-in zoom-in-95 absolute right-0 top-full mt-2 z-50 flex min-w-[150px] flex-col gap-1 rounded-2xl border border-cyan-500/30 bg-[#060c22]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl duration-150"
        >
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              onClick={() => handleSelectTheme(option.id)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left font-mono text-xs transition-colors ${
                currentTheme === option.id
                  ? 'border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 font-medium'
                  : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {option.icon}
              <span>{option.name}</span>
              {currentTheme === option.id && (
                <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
