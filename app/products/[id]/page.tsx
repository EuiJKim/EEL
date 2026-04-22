import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  // Use Supabase directly for images/specs — Prisma schema declares product_images.id
  // as String but DB stores it as integer, causing P2032. Supabase bypasses this.
  const supabase = await createClient();

  const [{ data: mappedImages }, { data: mappedSpecs }] = await Promise.all([
    supabase
      .from('product_images')
      .select('id, url, sort_order')
      .eq('product_id', id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('product_specs')
      .select('id, label, value, sort_order')
      .eq('product_id', id)
      .order('sort_order', { ascending: true }),
  ]);

  return (
    <ProductDetailClient
      product={product}
      images={mappedImages ?? []}
      specs={mappedSpecs ?? []}
    />
  );
}
