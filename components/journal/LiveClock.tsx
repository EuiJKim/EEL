'use client';

import { useState, useEffect } from 'react';
import { STUDIO } from '@/data/studio';

/**
 * Real-time clock for the studio city. Renders nothing on SSR to avoid
 * hydration mismatch (server and client clocks would differ). After mount,
 * updates every second.
 */
export default function LiveClock({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const styles =
    size === 'lg'
      ? 'text-lg leading-[1.6]'
      : 'text-sm leading-[1.6]';

  if (!now) {
    // Reserve space, hide content to prevent layout shift
    return (
      <div className={`opacity-0 select-none ${styles}`} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <div>Thursday</div>
        <div>May 19</div>
        <div>Seoul, 00:00:00</div>
      </div>
    );
  }

  const opts: Intl.DateTimeFormatOptions = { timeZone: STUDIO.timezone };
  const day = now.toLocaleDateString('en-US', { ...opts, weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { ...opts, month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { ...opts, hour12: false });

  return (
    <div className={`text-[#e8ebe8] ${styles}`} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <div>{day}</div>
      <div>{date}</div>
      <div>
        {STUDIO.city}, {time}
      </div>
    </div>
  );
}
