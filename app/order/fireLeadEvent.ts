/**
 * Fires Meta Pixel 'Lead' conversion event. Safe to call when fbq is not loaded
 * (ad blockers, Pixel not initialized yet) — silently no-ops.
 *
 * Value defaults to 1,500,000 KRW (typical EEL commission average) for Meta's
 * Conversion Value optimization.
 */
export function fireLeadEvent(value: number = 1_500_000): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  window.fbq('track', 'Lead', {
    value,
    currency: 'KRW',
  });
}
