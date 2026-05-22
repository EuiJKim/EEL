'use client';

import { useEffect, useState } from 'react';

export default function PageIntro() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 120);
    const t2 = setTimeout(() => setGone(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#1a1d1b] pointer-events-none"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 1.4s ease',
      }}
    />
  );
}
