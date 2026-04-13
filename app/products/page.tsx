import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import WorksPageClient from './WorksPageClient';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cat = category || 'furniture';

  const supabase = await createClient();

  const [products, { data: allImages }] = await Promise.all([
    prisma.product.findMany({ orderBy: { index: 'asc' } }),
    supabase
      .from('product_images')
      .select('id, product_id, url, sort_order')
      .order('sort_order', { ascending: true }),
  ]);

  const { data: allSpecs } = await supabase
    .from('product_specs')
    .select('id, product_id, label, value, sort_order')
    .order('sort_order', { ascending: true });

  return (
    <WorksPageClient
      category={cat}
      products={products}
      images={allImages ?? []}
      specs={allSpecs ?? []}
    />
  );
}
