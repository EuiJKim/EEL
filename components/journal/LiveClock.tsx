'use client';

import { useState, useEffect } from 'react';
import { STUDIO } from '@/data/studio';

interface Props {
  /** Visual size — sm (default) for sidebar/mobile, lg for legacy large headers. */
  size?: 'sm' | 'lg';
  /** If true, render in 2 lines (day+date on one line). Otherwise 3 lines. */
  compact?: boolean;
}

/**
 * Real-time clock for the studio city. Renders nothing on SSR to avoid
 * hydration mismatch (server and client clocks would differ). After mount,
 * updates every second. Time digits use tabular-nums so the colon position
 * doesn't shift as seconds tick.
 */
export default function LiveClock({ size = 'sm', compact = false }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sizeClass = size === 'lg' ? 'text-lg leading-[1.6]' : 'text-sm leading-[1.6]';

  if (!now) {
    return (
      <div
        className={`opacity-0 select-none ${sizeClass}`}
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {compact ? (
          <>
            <div>Thursday, May 19</div>
            <div>Seoul · 00:00:00</div>
          </>
        ) : (
          <>
            <div>Thursday</div>
            <div>May 19</div>
            <div>Seoul · 00:00:00</div>
          </>
        )}
      </div>
    );
  }

  const opts: Intl.DateTimeFormatOptions = { timeZone: STUDIO.timezone };
  const day = now.toLocaleDateString('en-US', { ...opts, weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { ...opts, month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { ...opts, hour12: false });

  return (
    <div
      className={`text-[#e8ebe8] ${sizeClass}`}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {compact ? (
        <>
          <div>
            {day}. {date}
          </div>
          <div>
            {STUDIO.city} · {time}
          </div>
        </>
      ) : (
        <>
          <div>{day}</div>
          <div>{date}</div>
          <div>
            {STUDIO.city} · {time}
          </div>
        </>
      )}
    </div>
  );
}
