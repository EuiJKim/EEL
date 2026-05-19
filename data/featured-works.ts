import type { FeaturedWork } from '@/types/journal';

/**
 * Featured Works — sidebar + mobile top section
 * Curate 4~6 best representative pieces. Update as new works finish.
 */
export const FEATURED_WORKS: FeaturedWork[] = [
  {
    id: 'turquoise',
    title: 'Turquoise Resin Table',
    status: 'Day 14 / 21',
    thumbnail: '/products/table-first/1.jpg',
    href: '#entry-turquoise-day-14',
  },
  {
    id: 'deep-green',
    title: 'Deep Green Resin Table',
    status: 'Completed',
    thumbnail: '/products/deep-green-table/deepgreen1.jpg',
    href: '#entry-deep-green-completed',
  },
  {
    id: 'black-coated',
    title: 'Black Coated Table',
    status: 'Sold Out',
    thumbnail: '/products/black-table/blacktable1.jpg',
    href: '#entry-black-coated',
  },
  {
    id: 'tile',
    title: 'Ceramic Tile Table',
    status: 'Sold Out',
    thumbnail: '/products/tile-table/1.jpg',
    href: '#entry-tile-table',
  },
  {
    id: 'white',
    title: 'White Resin Coffee Table',
    status: 'Sold Out',
    thumbnail: '/products/white-table/1.jpg',
    href: '#entry-white-coffee',
  },
];
