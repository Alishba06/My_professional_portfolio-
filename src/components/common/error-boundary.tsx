'use client';

/**
 * Reusable React Component Error Boundary
 * Part of Base Architecture (T008)
 * Designed for isolating 3D scenes, Canvas elements, and interactive widgets.
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  componentName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error(
      `Component error boundary [${this.props.componentName ?? 'Anonymous'}] caught an unhandled exception:`,
      error,
      errorInfo
    );
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="polite"
          className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-gray-950/60 p-6 text-center backdrop-blur-md"
        >
          <div className="mb-2 font-mono text-xs uppercase tracking-wider text-rose-400">
            {this.props.fallbackTitle ?? 'Component Offline'}
          </div>
          <p className="mb-4 max-w-md text-xs text-gray-400">
            {this.props.fallbackMessage ??
              'This interactive module encountered a visual anomaly. Core portfolio content remains unaffected.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-2 font-mono text-xs text-cyan-300 transition hover:bg-cyan-900/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
