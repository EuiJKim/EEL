'use client';

import { useState, useEffect } from 'react';
import { STUDIO } from '@/data/studio';

interface Props {
  /** Visual size — sm (default), lg, or xl (Porto Rocha-style hero clock). */
  size?: 'sm' | 'lg' | 'xl';
  /** @deprecated kept for caller compatibility; clock is always 2 lines now. */
  compact?: boolean;
}

/**
 * Real-time clock for the studio city. Renders nothing on SSR to avoid
 * hydration mismatch (server and client clocks would differ). After mount,
 * updates every second. Time digits use tabular-nums so the colon position
 * doesn't shift as seconds tick.
 */
export default function LiveClock({ size = 'sm' }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sizeClass =
    size === 'xl'
      ? 'text-[16px] md:text-[18px] leading-[1.4]'
      : size === 'lg'
      ? 'text-lg leading-[1.6]'
      : 'text-sm leading-[1.6]';

  if (!now) {
    return (
      <div
        className={`opacity-0 select-none ${sizeClass}`}
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <div>Seoul · Thursday, May 19</div>
        <div>00:00:00</div>
      </div>
    );
  }

  const opts: Intl.DateTimeFormatOptions = { timeZone: STUDIO.timezone };
  const day = now.toLocaleDateString('en-US', { ...opts, weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { ...opts, month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { ...opts, hour12: false });

  return (
    <div
      className={`text-[#F2EDE4] ${sizeClass}`}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <div>{STUDIO.city} · {day}, {date}</div>
      <div>{time}</div>
    </div>
  );
}
