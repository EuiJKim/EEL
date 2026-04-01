import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Sidebar from '@/components/Sidebar';
import ProductsCatalogClient from './ProductsCatalogClient';

export default async function ProductsPage() {
  const supabase = await createClient();

  const [products, { data: allImages }] = await Promise.all([
    prisma.product.findMany({ orderBy: { index: 'asc' } }),
    supabase
      .from('product_images')
      .select('id, product_id, url, sort_order')
      .order('sort_order', { ascending: true }),
  ]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Sidebar />
      <div className="lg:ml-[15%] lg:min-w-0">
        <ProductsCatalogClient products={products} images={allImages ?? []} />
      </div>
    </main>
  );
}
