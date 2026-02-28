import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import ProductsCatalogClient from './ProductsCatalogClient';

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('index');

  const productIds = (products ?? []).map((p) => p.id);

  const { data: images } = productIds.length
    ? await supabase
        .from('product_images')
        .select('*')
        .in('product_id', productIds)
        .order('sort_order')
    : { data: [] };

  return (
    <main className="bg-black">
      <Header />
      <ProductsCatalogClient products={products ?? []} images={images ?? []} />
    </main>
  );
}
