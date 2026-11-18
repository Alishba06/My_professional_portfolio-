'use client';

/**
 * App Router Error Boundary
 * Part of Base Architecture (T008)
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/utils/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error('Application runtime exception caught by root error boundary:', error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="dark-futuristic-grid flex min-h-screen flex-col items-center justify-center p-6 text-center text-white"
    >
      <div className="relative z-10 max-w-lg rounded-2xl border border-rose-500/30 bg-gray-950/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 font-mono text-xs text-rose-400">
          <span className="h-2 w-2 animate-ping rounded-full bg-rose-500" />
          SYSTEM ANOMALY DETECTED
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Neural Interface Interruption
        </h1>

        <p className="mb-6 text-sm text-gray-400">
          A disruption occurred in the digital matrix stream. The system state has been captured and
          isolated for diagnostics.
        </p>

        {error.digest && (
          <p className="mb-6 font-mono text-xs text-gray-500">Error Digest: {error.digest}</p>
        )}

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 font-mono text-sm font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:w-auto"
          >
            Recalibrate System
          </button>
          <Link
            href="/"
            className="w-full rounded-xl border border-gray-800 bg-gray-900/60 px-6 py-3 font-mono text-sm text-gray-300 transition-colors duration-200 hover:border-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 sm:w-auto"
          >
            Return to Nexus
          </Link>
        </div>
      </div>
    </div>
  );
}
