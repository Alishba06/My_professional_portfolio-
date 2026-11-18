/**
 * Accessibility utility functions
 * Aligned with Portfolio Constitution Principle P1: Accessibility First
 */

/**
 * Checks if the user prefers reduced motion.
 * Safe for both SSR and client-side execution.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Focus helper for keyboard accessibility
 */
export function focusElement(elementId: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(elementId);
  if (el) {
    el.focus();
  }
}
