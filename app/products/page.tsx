import { createClient } from '@/lib/supabase/server';
import WorksPageClient from './WorksPageClient';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cat = category || 'furniture';

  const supabase = await createClient();

  const [{ data: products }, { data: allImages }, { data: allSpecs }] =
    await Promise.all([
      supabase
        .from('products')
        .select('id, index, name, subtitle, description, glow, accent, gradient')
        .order('index', { ascending: true }),
      supabase
        .from('product_images')
        .select('id, product_id, url, sort_order')
        .order('sort_order', { ascending: true }),
      supabase
        .from('product_specs')
        .select('id, product_id, label, value, sort_order')
        .order('sort_order', { ascending: true }),
    ]);

  return (
    <WorksPageClient
      category={cat}
      products={products ?? []}
      images={allImages ?? []}
      specs={allSpecs ?? []}
    />
  );
}
