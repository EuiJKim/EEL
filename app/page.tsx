import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Header />

      {/* Full-screen hero */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/products/cabinet-black/1.jpg"
          alt="Noir Cabinet"
          fill
          className="object-contain"
          priority
          loading="eager"
        />

        {/* Subtle dark vignette at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Bottom-left: product label */}
        <div className="absolute bottom-10 left-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-1">
            Storage Cabinet
          </p>
          <h1 className="text-sm tracking-[0.2em] uppercase text-white font-light">
            Noir Cabinet
          </h1>
        </div>

        {/* Bottom-right: CTA */}
        <div className="absolute bottom-10 right-10">
          <Link
            href="/order"
            className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 hover:border-white pb-0.5"
          >
            Order
          </Link>
        </div>
      </section>
    </main>
  );
}
