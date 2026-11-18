'use client';

/**
 * Root Global Error Boundary
 * Part of Base Architecture (T008)
 */

import { useEffect } from 'react';
import { logger } from '@/utils/logger';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error('Critical root-level error caught by GlobalError:', error);
  }, [error]);

  const handleReset = () => {
    if (typeof reset === 'function') {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0b0f2b] font-sans text-gray-100 antialiased">
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-screen flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-md rounded-2xl border border-rose-500/40 bg-gray-950 p-8 shadow-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 font-mono text-xs text-rose-400">
              CRITICAL SUBSYSTEM FAILURE
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white">Root System Offline</h1>
            <p className="mb-6 text-sm text-gray-400">
              An unrecoverable system exception occurred at the core layout level.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-cyan-500 bg-cyan-950/60 px-6 py-3 font-mono text-sm font-semibold text-cyan-300 transition hover:bg-cyan-900/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Reinitialize Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
