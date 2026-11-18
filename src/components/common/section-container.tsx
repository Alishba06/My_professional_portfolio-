'use client';

import React from 'react';
import { AppErrorBoundary } from '@/components/common/error-boundary';

export interface SectionContainerProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  ambientColor?: 'cyan' | 'purple' | 'emerald' | 'blue';
  componentName?: string;
}

export function SectionContainer({
  id,
  className = '',
  children,
  ambientColor = 'cyan',
  componentName,
}: SectionContainerProps) {
  const ambientGlowClass =
    ambientColor === 'purple'
      ? 'bg-purple-600/10'
      : ambientColor === 'emerald'
        ? 'bg-emerald-500/10'
        : ambientColor === 'blue'
          ? 'bg-blue-600/10'
          : 'bg-cyan-500/10';

  return (
    <AppErrorBoundary componentName={componentName || id} fallbackTitle={`Section [${id}] Offline`}>
      <section
        id={id}
        className={`relative z-10 w-full overflow-hidden border-t border-slate-800/40 bg-[#02050c] px-4 py-24 sm:px-6 lg:px-8 ${className}`}
      >
        {/* Ambient glow accent */}
        <div
          className={`pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full blur-[160px] ${ambientGlowClass}`}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">{children}</div>
      </section>
    </AppErrorBoundary>
  );
}
