/**
 * Structured Logging Infrastructure
 * Part of Base Architecture (T008)
 * Safe for both Client and Server environments.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getActiveLogLevel(): LogLevel {
  const envLevel = process.env.NEXT_PUBLIC_LOG_LEVEL?.toLowerCase() as LogLevel | undefined;
  if (envLevel && envLevel in LOG_LEVEL_PRIORITY) {
    return envLevel;
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

function shouldLog(level: LogLevel): boolean {
  const currentPriority = LOG_LEVEL_PRIORITY[getActiveLogLevel()];
  const messagePriority = LOG_LEVEL_PRIORITY[level];
  return messagePriority >= currentPriority;
}

function formatPrefix(level: LogLevel): string {
  const timestamp = new Date().toISOString();
  return `[ALISHBA-AI] [${timestamp}] [${level.toUpperCase()}]`;
}

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (shouldLog('debug')) {
      console.debug(formatPrefix('debug'), message, ...args);
    }
  },

  info(message: string, ...args: unknown[]): void {
    if (shouldLog('info')) {
      console.info(formatPrefix('info'), message, ...args);
    }
  },

  warn(message: string, ...args: unknown[]): void {
    if (shouldLog('warn')) {
      console.warn(formatPrefix('warn'), message, ...args);
    }
  },

  error(message: string, error?: unknown, ...args: unknown[]): void {
    if (shouldLog('error')) {
      console.error(formatPrefix('error'), message, error ?? '', ...args);
    }
  },
};
