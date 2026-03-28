import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import ProductsCatalogClient from './ProductsCatalogClient';

export default async function ProductsPage() {
  const supabase = await createClient();
  // Auth session kept alive via Supabase server client
  await supabase.auth.getUser();

  const products = await prisma.product.findMany({
    orderBy: { index: 'asc' },
  });

  const productIds = products.map((p) => p.id);

  // Use Supabase directly — Prisma schema declares product_images.id as String
  // but DB stores it as integer, causing P2032 on findMany. Supabase bypasses this.
  const { data: mappedImages } = productIds.length
    ? await supabase
        .from('product_images')
        .select('id, product_id, url, sort_order')
        .in('product_id', productIds)
        .order('sort_order', { ascending: true })
    : { data: [] };

  return (
    <main className="bg-black">
      <Header />
      <ProductsCatalogClient products={products} images={mappedImages ?? []} />
    </main>
  );
}
