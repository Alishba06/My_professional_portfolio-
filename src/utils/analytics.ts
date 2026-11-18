/**
 * Client-Side Interaction & Analytics Event Tracker
 * Part of Contact Hub & User Story 5 (Task: T063)
 */

import { publicEnv } from '@/utils/env';
import { logger } from '@/utils/logger';

export interface AnalyticsEventProps {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Dispatches an event to analytics systems or logs it when analytics is enabled.
 */
export function trackEvent(eventName: string, properties?: AnalyticsEventProps): void {
  try {
    if (!publicEnv.enableAnalytics) {
      logger.debug(`[Analytics Track (Disabled)] ${eventName}:`, properties);
      return;
    }

    logger.info(`[Analytics Track] ${eventName}:`, properties);

    // Browser standard event dispatch
    if (typeof window !== 'undefined') {
      // 1. Dispatch custom DOM event for custom listeners
      window.dispatchEvent(
        new CustomEvent('alishba:analytics', {
          detail: { eventName, properties, timestamp: Date.now() },
        })
      );

      // 2. Google Tag Manager / GA4 dataLayer integration if present
      const win = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: eventName,
          ...properties,
        });
      }
    }
  } catch (error) {
    logger.warn('Failed to dispatch analytics event:', error);
  }
}
