import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) notFound();

  const [{ data: images }, { data: specs }] = await Promise.all([
    supabase.from('product_images').select('*').eq('product_id', id).order('sort_order'),
    supabase.from('product_specs').select('*').eq('product_id', id).order('sort_order'),
  ]);

  return (
    <ProductDetailClient
      product={product}
      images={images ?? []}
      specs={specs ?? []}
    />
  );
}
