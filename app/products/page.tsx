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

  const images = productIds.length
    ? await prisma.productImage.findMany({
        where: { productId: { in: productIds } },
        orderBy: { sortOrder: 'asc' },
      })
    : [];

  // Map Prisma camelCase to the snake_case shape expected by ProductsCatalogClient
  const mappedImages = images.map((img) => ({
    id: img.id,
    product_id: img.productId,
    url: img.url,
    sort_order: img.sortOrder,
  }));

  return (
    <main className="bg-black">
      <Header />
      <ProductsCatalogClient products={products} images={mappedImages} />
    </main>
  );
}
