import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  const [images, specs] = await Promise.all([
    prisma.productImage.findMany({
      where: { productId: id },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.productSpec.findMany({
      where: { productId: id },
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  // Map Prisma camelCase to snake_case shape expected by ProductDetailClient
  const mappedImages = images.map((img) => ({
    id: img.id,
    url: img.url,
    sort_order: img.sortOrder,
  }));

  const mappedSpecs = specs.map((s) => ({
    id: s.id,
    label: s.label,
    value: s.value,
    sort_order: s.sortOrder,
  }));

  return (
    <ProductDetailClient
      product={product}
      images={mappedImages}
      specs={mappedSpecs}
    />
  );
}
