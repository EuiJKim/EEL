import { Suspense } from 'react';
import Header from '@/components/Header';
import BTOBuilder from '@/components/BTOBuilder';

export const dynamic = 'force-dynamic';

export default function OrderPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Header />
      <Suspense>
        <BTOBuilder />
      </Suspense>
    </main>
  );
}
