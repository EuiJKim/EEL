import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight } from 'lucide-react';

export default async function HomeProductsSection() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let images: { product_id: string; url: string; sort_order: number }[] | null = null;

  try {
    products = await prisma.product.findMany({
      orderBy: { index: 'asc' },
    });

    const productIds = products.map((p) => p.id);
    const supabase = await createClient();
    const { data } = productIds.length
      ? await supabase
          .from('product_images')
          .select('product_id, url, sort_order')
          .in('product_id', productIds)
          .order('sort_order', { ascending: true })
      : { data: [] };
    images = data;
  } catch {
    return null;
  }

  if (products.length === 0) {
    return (
      <section className="relative py-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">Collection</p>
            <h2 className="font-display-kr text-3xl sm:text-4xl font-semibold tracking-tight text-white">제품</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {([0, 1, 2]).map((i) => (
              <div key={i} className="rounded-2xl border border-white/6 overflow-hidden bg-zinc-900/60">
                <div className="aspect-[4/3] bg-zinc-900/60 animate-pulse" />
                <div className="p-5 space-y-2">
                  <div className="h-2 w-16 rounded bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-28 rounded bg-zinc-800 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-600">곧 만나실 수 있어요 — 준비 중입니다</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-3">
              Collection
            </p>
            <h2 className="font-display-kr text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              제품
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors group"
          >
            전체 보기
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const firstImage = (images ?? [])
              .filter((img) => img.product_id === product.id)
              .sort((a, b) => a.sort_order - b.sort_order)[0];

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative rounded-2xl overflow-hidden border border-white/6 hover:border-white/12 bg-zinc-900/60 transition-colors"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={firstImage.url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5"
                    style={{ color: product.accent }}
                  >
                    {product.subtitle}
                  </p>
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-zinc-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight size={13} className="text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile: 전체 보기 */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            전체 보기
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
