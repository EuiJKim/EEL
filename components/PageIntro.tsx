'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageIntro() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 600);
    const t2 = setTimeout(() => setGone(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 1.2s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: fading ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 1.2s ease',
        }}
      >
        <Image
          src="/blue.jpg"
          alt="EEL intro"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[64px] md:text-[112px] font-normal tracking-[0.04em]"
          style={{ fontFamily: "var(--font-gravitas), serif", color: '#f0ede6' }}
        >
          EEL
        </span>
      </div>
    </div>
  );
}
