'use client';

import { useRef } from 'react';
import TableHero from '@/components/TableHero';
import BTOBuilder from '@/components/BTOBuilder';

export default function Home() {
  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-black">
      <TableHero onBuildClick={scrollToBuilder} />
      <div ref={builderRef}>
        <BTOBuilder />
      </div>
    </main>
  );
}
