'use client';

import { useRef } from 'react';
import TableHero from '@/components/TableHero';
import CraftBridge from '@/components/CraftBridge';
import BTOBuilder from '@/components/BTOBuilder';
import Header from '@/components/Header';

export default function Home() {
  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-black">
      <Header />
      <TableHero onBuildClick={scrollToBuilder} />
      <CraftBridge />
      <div ref={builderRef}>
        <BTOBuilder />
      </div>
    </main>
  );
}
