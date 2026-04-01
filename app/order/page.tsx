import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import BTOBuilder from '@/components/BTOBuilder';

export default function OrderPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Sidebar />
      <div className="lg:ml-[15%]">
        <Suspense>
          <BTOBuilder />
        </Suspense>
      </div>
    </main>
  );
}
