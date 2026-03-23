export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import TableHero from '@/components/TableHero';
import CraftBridge from '@/components/CraftBridge';
import BTOBuilder from '@/components/BTOBuilder';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <TableHero />
      <CraftBridge />
      <div id="build">
        <Suspense>
          <BTOBuilder />
        </Suspense>
      </div>
    </main>
  );
}
