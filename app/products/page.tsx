import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import ProductsCatalogClient from './ProductsCatalogClient';

export default async function ProductsPage() {
  const supabase = await createClient();

  // Fetch products and images in parallel
  const [products, { data: allImages }] = await Promise.all([
    prisma.product.findMany({ orderBy: { index: 'asc' } }),
    supabase
      .from('product_images')
      .select('id, product_id, url, sort_order')
      .order('sort_order', { ascending: true }),
  ]);

  const mappedImages = allImages;

  return (
    <main className="bg-black">
      <Header />
      <ProductsCatalogClient products={products} images={mappedImages ?? []} />
    </main>
  );
}
