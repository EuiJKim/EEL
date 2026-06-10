import type { FeedEntry } from '@/types/journal';

/**
 * Journal entries — sourced from real product data in
 * `app/products/page.tsx`. Add new entries to the TOP.
 *
 * Three categories surfaced on /journal: furniture, object, painting.
 */
export const JOURNAL_ENTRIES: FeedEntry[] = [
  // ── FURNITURE ──────────────────────────────────────────────
  {
    id: 'table-first',
    category: 'furniture',
    title: 'Turquoise Resin Table',
    image: '/products/table-first/1.jpg',
    year: '2025',
    size: 'Ø 74 - 76 cm  /  H 76 cm',
    price: '₩ 1,500,000',
    status: 'sold_out',
    gallery: [
      '/products/table-first/1.jpg',
      '/products/table-first/2.jpg',
      '/products/table-first/3.jpg',
      '/products/table-first/4.jpg',
    ],
  },
  {
    id: 'cabinet-black',
    category: 'furniture',
    title: 'Glacier Blue Resin Table',
    image: '/products/cabinet-black/1.jpg',
    year: '2026',
    size: 'Ø 73 - 77 cm  /  H 72 cm',
    price: '₩ 1,800,000',
    status: 'available',
    gallery: [
      '/products/cabinet-black/1.jpg',
      '/products/cabinet-black/2.jpg',
      '/products/cabinet-black/3.jpg',
      '/products/cabinet-black/4.jpg',
      '/products/cabinet-black/5.jpg',
      '/products/cabinet-black/6.jpg',
      '/products/cabinet-black/7.jpg',
    ],
  },
  {
    id: 'black-table',
    category: 'furniture',
    title: 'Black Coated Table',
    image: '/products/black-table/blacktable1.jpg',
    year: '2026',
    size: 'W 80 cm  /  D 80 cm  /  H 44 cm',
    price: '₩ 1,220,000',
    status: 'sold_out',
    gallery: [
      '/products/black-table/blacktable1.jpg',
      '/products/black-table/blacktable2.jpg',
      '/products/black-table/blacktable3.jpg',
      '/products/black-table/blacktable4.jpg',
      '/products/black-table/blacktable5.jpg',
    ],
  },
  {
    id: 'tile-table',
    category: 'furniture',
    title: 'Ceramic Tile Table',
    image: '/products/tile-table/1.jpg',
    year: '2026',
    size: 'W 92.5 cm  /  D 64.5 cm  /  H 35.3 cm',
    price: '₩ 750,000',
    status: 'sold_out',
    gallery: [
      '/products/tile-table/1.jpg',
      '/products/tile-table/2.jpg',
      '/products/tile-table/3.jpg',
      '/products/tile-table/4.jpg',
    ],
  },
  {
    id: 'deep-green-table',
    category: 'furniture',
    title: 'Deep Green Resin Table',
    image: '/products/deep-green-table/deepgreen1.jpg',
    year: '2026',
    size: 'Ø 38 - 48 cm  /  H 54.5 cm',
    price: '₩ 410,000',
    status: 'sold_out',
    gallery: [
      '/products/deep-green-table/deepgreen1.jpg',
      '/products/deep-green-table/deepgreen2.jpg',
      '/products/deep-green-table/deepgreen3.jpg',
      '/products/deep-green-table/deepgreen4.jpg',
      '/products/deep-green-table/deepgreen5.jpg',
      '/products/deep-green-table/deepgreen6.jpg',
      '/products/deep-green-table/deepgreen7.jpg',
      '/products/deep-green-table/deepgreen8.jpg',
      '/products/deep-green-table/deepgreen9.jpg',
    ],
  },
  {
    id: 'white-table',
    category: 'furniture',
    title: 'White Resin Coffee Table',
    image: '/products/white-table/1.jpg',
    year: '2026',
    size: 'Ø 48 - 54 cm  /  H 41.8 cm',
    price: '₩ 350,000',
    status: 'available',
    gallery: [
      '/products/white-table/1.jpg',
      '/products/white-table/2.jpg',
      '/products/white-table/3.jpg',
      '/products/white-table/4.jpg',
    ],
  },
  {
    id: 'table-second',
    category: 'furniture',
    title: 'Light Cabinet',
    image: '/products/table-second/1.jpg',
    year: '2026',
    size: 'W 76 cm  /  D 42 cm  /  H 46 cm',
    price: '₩ 700,000',
    status: 'sold_out',
    gallery: [
      '/products/table-second/1.jpg',
      '/products/table-second/2.jpg',
      '/products/table-second/3.jpg',
      '/products/table-second/4.jpg',
      '/products/table-second/5.jpg',
    ],
  },
  {
    id: 'acrylic-blue-leg',
    category: 'furniture',
    title: 'Acrylic Table',
    image: '/products/acrylic-blue-leg/1.jpg',
    year: '2026',
    size: 'W 38 cm  /  D 40 cm  /  H 52 cm',
    price: '₩ 200,000',
    status: 'available',
    gallery: [
      '/products/acrylic-blue-leg/1.jpg',
      '/products/acrylic-blue-leg/2.jpg',
      '/products/acrylic-blue-leg/3.jpg',
      '/products/acrylic-blue-leg/4.jpg',
    ],
  },

  // ── OBJECT (15 pieces) ─────────────────────────────────────
  ...Array.from({ length: 15 }, (_, i) => {
    const n = i + 1;
    const num = String(n).padStart(2, '0');
    return {
      id: `object-${n}`,
      category: 'object' as const,
      title: `Object ${num}`,
      year: '2024',
      image: `/products/object-${n}/1.jpg`,
      gallery: [`/products/object-${n}/1.jpg`],
    };
  }),

  // ── PAINTING (8 pieces) ────────────────────────────────────
  ...Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    const num = String(n).padStart(2, '0');
    return {
      id: `painting-${n}`,
      category: 'painting' as const,
      title: `Painting ${num}`,
      year: '2024',
      image: `/products/painting-${n}/1.jpg`,
      gallery: [`/products/painting-${n}/1.jpg`],
    };
  }),
];
