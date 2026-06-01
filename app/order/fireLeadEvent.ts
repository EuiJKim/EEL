import { getStoredUTM } from '@/components/UTMTracker';

/**
 * Fires Meta Pixel 'Lead' conversion event. Safe to call when fbq is not loaded
 * (ad blockers, Pixel not initialized yet) — silently no-ops.
 *
 * Value defaults to 1,500,000 KRW (typical EEL commission average) for Meta's
 * Conversion Value optimization. Attaches the session's first-touch UTM
 * attribution so Ads Manager can credit the right campaign.
 */
export function fireLeadEvent(value: number = 1_500_000): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  const utm = getStoredUTM();

  window.fbq('track', 'Lead', {
    value,
    currency: 'KRW',
    ...utm,
  });
}
