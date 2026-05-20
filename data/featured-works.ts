import type { FeaturedWork } from '@/types/journal';

/**
 * Featured Works — sidebar (desktop) + mobile top section.
 * Curated mix across categories. Update when a new flagship piece lands.
 * Data accurate as of products/page.tsx source of truth.
 */
export const FEATURED_WORKS: FeaturedWork[] = [
  {
    id: 'cabinet-black',
    title: 'Glacier Blue Resin Table',
    status: '₩ 1,800,000',
    thumbnail: '/products/cabinet-black/1.jpg',
    href: '/journal/cabinet-black',
  },
  {
    id: 'table-first',
    title: 'Turquoise Resin Table',
    status: 'Sold Out',
    thumbnail: '/products/table-first/1.jpg',
    href: '/journal/table-first',
  },
  {
    id: 'deep-green-table',
    title: 'Deep Green Resin Table',
    status: '₩ 410,000',
    thumbnail: '/products/deep-green-table/deepgreen1.jpg',
    href: '/journal/deep-green-table',
  },
  {
    id: 'tile-table',
    title: 'Ceramic Tile Table',
    status: '₩ 750,000',
    thumbnail: '/products/tile-table/1.jpg',
    href: '/journal/tile-table',
  },
  {
    id: 'painting-1',
    title: 'Painting 01',
    status: 'Archive',
    thumbnail: '/products/painting-1/1.jpg',
    href: '/journal/painting-1',
  },
];
