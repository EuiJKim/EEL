export type EntryType =
  | 'in_progress'
  | 'completed'
  | 'material'
  | 'archive'
  | 'announcement';

export type PieceStatus = 'available' | 'sold_out' | 'commission_only';

export interface FeedEntry {
  id: string;
  date: string; // YYYY-MM-DD
  type: EntryType;
  pieceId?: string;
  day?: { current: number; total: number };
  title: string;
  subtitle?: string;
  image: string;
  // Detail page fields:
  size?: string; // 'Ø 74 - 76 cm  /  H 76 cm'
  price?: string; // '₩ 1,500,000'
  status?: PieceStatus;
  gallery?: string[]; // additional images for detail
  // Optional, used by legacy single-column feed (kept for backwards compat):
  body?: string;
  cta?: { label: string; href: string };
}

export interface FeaturedWork {
  id: string;
  title: string;
  status: string;
  thumbnail: string;
  href?: string;
}

export interface StudioInfo {
  name: string;
  city: string;
  timezone: string;
  about: string;
  contact: {
    email: string;
    instagram: string;
    instagramUrl: string;
  };
}
