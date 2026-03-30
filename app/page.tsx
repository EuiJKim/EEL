import { Suspense } from 'react';
import Header from '@/components/Header';
import TableHero from '@/components/TableHero';
import HomeProductsSection from '@/components/HomeProductsSection';
import CraftBridge from '@/components/CraftBridge';
import BTOBuilder from '@/components/BTOBuilder';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Header />
      <TableHero />
      <HomeProductsSection />
      <CraftBridge />
      <Suspense>
        <section id="build">
          <BTOBuilder />
        </section>
      </Suspense>
      <Footer />
    </main>
  );
}
