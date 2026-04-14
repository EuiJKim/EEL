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

  // Override table-first images: 1.jpg=thumbnail(greentable3), 2-5=detail(greentable1-4)
  const otherImages = (allImages ?? []).filter(
    (img) => img.product_id !== 'table-first' && img.product_id !== 'table-second' && img.product_id !== 'acrylic-blue-leg' && img.product_id !== 'cabinet-black'
  );
  const tableFirstImages = [
    { id: 9901, product_id: 'table-first', url: '/products/table-first/1.jpg', sort_order: 0 }, // greentable3 — thumbnail
    { id: 9902, product_id: 'table-first', url: '/products/table-first/2.jpg', sort_order: 1 }, // greentable1
    { id: 9903, product_id: 'table-first', url: '/products/table-first/3.jpg', sort_order: 2 }, // greentable2
    { id: 9904, product_id: 'table-first', url: '/products/table-first/1.jpg', sort_order: 3 }, // greentable3
    { id: 9905, product_id: 'table-first', url: '/products/table-first/4.jpg', sort_order: 4 }, // greentable4
  ];
  const tableSecondImages = [
    { id: 9911, product_id: 'table-second', url: '/products/table-second/1.jpg', sort_order: 0 }, // thumbnail — cabinet1
    { id: 9912, product_id: 'table-second', url: '/products/table-second/1.jpg', sort_order: 1 }, // cabinet1
    { id: 9913, product_id: 'table-second', url: '/products/table-second/2.jpg', sort_order: 2 }, // cabinet2
    { id: 9914, product_id: 'table-second', url: '/products/table-second/3.jpg', sort_order: 3 }, // cabinet3
    { id: 9915, product_id: 'table-second', url: '/products/table-second/4.jpg', sort_order: 4 }, // cabinet4
    { id: 9916, product_id: 'table-second', url: '/products/table-second/5.jpg', sort_order: 5 }, // cabinet5
  ];
  const acrylicImages = [
    { id: 9921, product_id: 'acrylic-blue-leg', url: '/products/acrylic-blue-leg/1.jpg', sort_order: 0 }, // thumbnail — acrylictable3
    { id: 9922, product_id: 'acrylic-blue-leg', url: '/products/acrylic-blue-leg/2.jpg', sort_order: 1 }, // acrylictable1
    { id: 9923, product_id: 'acrylic-blue-leg', url: '/products/acrylic-blue-leg/3.jpg', sort_order: 2 }, // acrylictable2
    { id: 9924, product_id: 'acrylic-blue-leg', url: '/products/acrylic-blue-leg/4.jpg', sort_order: 3 }, // acrylictable3
  ];
  const cabinetBlackImages = [
    { id: 9931, product_id: 'cabinet-black', url: '/products/cabinet-black/1.jpg', sort_order: 0 }, // thumbnail — table2
    { id: 9932, product_id: 'cabinet-black', url: '/products/cabinet-black/2.jpg', sort_order: 1 }, // table2
    { id: 9933, product_id: 'cabinet-black', url: '/products/cabinet-black/3.jpg', sort_order: 2 }, // table3
    { id: 9934, product_id: 'cabinet-black', url: '/products/cabinet-black/4.jpg', sort_order: 3 }, // table1
    { id: 9935, product_id: 'cabinet-black', url: '/products/cabinet-black/5.jpg', sort_order: 4 }, // table4
    { id: 9936, product_id: 'cabinet-black', url: '/products/cabinet-black/6.jpg', sort_order: 5 }, // table5
    { id: 9937, product_id: 'cabinet-black', url: '/products/cabinet-black/7.jpg', sort_order: 6 }, // table6
  ];
  const tileTableImages = [
    { id: 9941, product_id: 'tile-table', url: '/products/tile-table/1.jpg', sort_order: 0 }, // thumbnail — tiletable2
    { id: 9942, product_id: 'tile-table', url: '/products/tile-table/2.jpg', sort_order: 1 }, // tiletable1
    { id: 9943, product_id: 'tile-table', url: '/products/tile-table/3.jpg', sort_order: 2 }, // tiletable2
    { id: 9944, product_id: 'tile-table', url: '/products/tile-table/4.jpg', sort_order: 3 }, // tiletable3
  ];
  const objectImages = [
    { id: 9951, product_id: 'object-1', url: '/products/object-1/1.jpg', sort_order: 0 },
    { id: 9952, product_id: 'object-2', url: '/products/object-2/1.jpg', sort_order: 0 },
    { id: 9953, product_id: 'object-3', url: '/products/object-3/1.jpg', sort_order: 0 },
    { id: 9954, product_id: 'object-4', url: '/products/object-4/1.jpg', sort_order: 0 },
    { id: 9955, product_id: 'object-5',  url: '/products/object-5/1.jpg',  sort_order: 0 },
    { id: 9956, product_id: 'object-6',  url: '/products/object-6/1.jpg',  sort_order: 0 },
    { id: 9957, product_id: 'object-7',  url: '/products/object-7/1.jpg',  sort_order: 0 },
    { id: 9958, product_id: 'object-8',  url: '/products/object-8/1.jpg',  sort_order: 0 },
    { id: 9959, product_id: 'object-9',  url: '/products/object-9/1.jpg',  sort_order: 0 },
    { id: 9960, product_id: 'object-10', url: '/products/object-10/1.jpg', sort_order: 0 },
    { id: 9961, product_id: 'object-11', url: '/products/object-11/1.jpg', sort_order: 0 },
    { id: 9961, product_id: 'object-11', url: '/products/object-11/2.jpg', sort_order: 1 },
    { id: 9962, product_id: 'object-12', url: '/products/object-12/1.jpg', sort_order: 0 },
    { id: 9962, product_id: 'object-12', url: '/products/object-12/2.jpg', sort_order: 1 },
    { id: 9963, product_id: 'object-13', url: '/products/object-13/1.jpg', sort_order: 0 },
    { id: 9964, product_id: 'object-14', url: '/products/object-14/1.jpg', sort_order: 0 },
    { id: 9965, product_id: 'object-15',  url: '/products/object-15/1.jpg',  sort_order: 0 },
  ];
  const paintingImages = [
    { id: 9971, product_id: 'painting-1', url: '/products/painting-1/1.jpg', sort_order: 0 },
    { id: 9972, product_id: 'painting-2', url: '/products/painting-2/1.jpg', sort_order: 0 },
    { id: 9973, product_id: 'painting-3', url: '/products/painting-3/1.jpg', sort_order: 0 },
    { id: 9974, product_id: 'painting-4', url: '/products/painting-4/1.jpg', sort_order: 0 },
    { id: 9975, product_id: 'painting-5', url: '/products/painting-5/1.jpg', sort_order: 0 },
    { id: 9976, product_id: 'painting-6', url: '/products/painting-6/1.jpg', sort_order: 0 },
    { id: 9977, product_id: 'painting-7', url: '/products/painting-7/1.jpg', sort_order: 0 },
    { id: 9978, product_id: 'painting-8', url: '/products/painting-8/1.jpg', sort_order: 0 },
  ];
  const patchedImages = [...otherImages, ...tableFirstImages, ...tableSecondImages, ...acrylicImages, ...cabinetBlackImages, ...tileTableImages, ...objectImages, ...paintingImages];

  // Hardcoded extra products (not in DB)
  const extraProducts = [
    { id: 'tile-table', index: 5, name: 'Ceramic Tile Table', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-1', index: 1, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-2', index: 2, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-3', index: 3, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-4', index: 4, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-5',  index: 5,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-6',  index: 6,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-7',  index: 7,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-8',  index: 8,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-9',  index: 9,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-10', index: 10, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-11', index: 11, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-12', index: 12, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-13', index: 13, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-14', index: 14, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'object-15',  index: 15, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-1', index: 1,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-2', index: 2,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-3', index: 3,  name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-4', index: 4, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-5', index: 5, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-6', index: 6, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-7', index: 7, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
    { id: 'painting-8', index: 8, name: '', subtitle: '', description: '', glow: '', accent: '', gradient: '' },
  ];

  // Override product data
  const patchedProducts = [...(products ?? []), ...extraProducts].map((p) => {
    if (p.id === 'table-first') return { ...p, name: 'Turquoise Resin Table' };
    if (p.id === 'table-second') return { ...p, name: 'Leaking Light Cabinet' };
    if (p.id === 'acrylic-blue-leg') return { ...p, name: 'Acrylic Table' };
    if (p.id === 'cabinet-black') return { ...p, name: 'Glacier Blue Resin Table' };
    return p;
  });
  const otherSpecs = (allSpecs ?? []).filter(
    (s) => s.product_id !== 'table-first' && s.product_id !== 'table-second' && s.product_id !== 'acrylic-blue-leg' && s.product_id !== 'cabinet-black'
  );
  const patchedSpecs = [
    ...otherSpecs,
    { id: 9001, product_id: 'table-first', label: 'Size',   value: 'Ø 74 - 76 cm  /  H 76 cm',  sort_order: 0 },
    { id: 9002, product_id: 'table-first', label: 'Price',  value: '₩ 1,500,000',            sort_order: 1 },
    { id: 9003, product_id: 'table-first', label: 'Status', value: 'SOLD OUT',               sort_order: 2 },
    { id: 9011, product_id: 'table-second', label: 'Size',  value: 'W 76 cm  /  D 42 cm  /  H 46 cm', sort_order: 0 },
    { id: 9012, product_id: 'table-second', label: 'Price', value: '₩ 700,000',              sort_order: 1 },
    { id: 9021, product_id: 'acrylic-blue-leg', label: 'Size',  value: 'W 38 cm  /  D 40 cm  /  H 52 cm', sort_order: 0 },
    { id: 9022, product_id: 'acrylic-blue-leg', label: 'Price', value: '₩ 200,000',                sort_order: 1 },
    { id: 9031, product_id: 'cabinet-black', label: 'Size',  value: 'Ø 73 - 77 cm  /  H 72 cm',      sort_order: 0 },
    { id: 9032, product_id: 'cabinet-black', label: 'Price', value: '₩ 1,800,000',                sort_order: 1 },
    { id: 9041, product_id: 'tile-table', label: 'Size',  value: 'W 92.5 cm  /  D 64.5 cm  /  H 35.3 cm', sort_order: 0 },
    { id: 9042, product_id: 'tile-table', label: 'Price', value: '₩ 750,000',                    sort_order: 1 },
  ];

  return (
    <WorksPageClient
      category={cat}
      products={patchedProducts}
      images={patchedImages}
      specs={patchedSpecs}
    />
  );
}
