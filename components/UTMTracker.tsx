'use client';

import { useEffect } from 'react';

/**
 * Captures utm_* (and gclid, fbclid) parameters from the landing URL into
 * sessionStorage on first page load of a session. Subsequent page navigations
 * within the same session keep the original attribution — so the first-touch
 * source is preserved through to conversion (Lead event, piece inquiry).
 *
 * Companion: `getStoredUTM()` helper reads them back for Pixel events and
 * inquiry API payloads.
 */
export default function UTMTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const STORAGE_KEY = 'eel_utm';
    const ATTR_KEYS = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid',
      'fbclid',
    ] as const;

    // If already stored this session, don't overwrite (first-touch wins).
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    let hasAny = false;
    for (const key of ATTR_KEYS) {
      const value = params.get(key);
      if (value) {
        captured[key] = value;
        hasAny = true;
      }
    }
    // Always also stamp the landing path + referrer so we know how they arrived
    // even when no utm is present (organic, direct).
    captured.landing_path = window.location.pathname;
    captured.referrer = document.referrer || 'direct';
    captured.landed_at = new Date().toISOString();

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));

    // If we captured UTM params, also fire a Pixel custom event so it's
    // associated with the user from the start of the session.
    if (hasAny && typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'AdLanding', captured);
    }
  }, []);

  return null;
}

/**
 * Reads UTM/attribution data from sessionStorage. Safe on server (returns {}).
 */
export function getStoredUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem('eel_utm');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
