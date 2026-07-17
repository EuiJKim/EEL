export type Category = 'furniture' | 'object' | 'painting';

export type PieceStatus = 'available' | 'sold_out' | 'commission_only';

export interface FeedEntry {
  id: string;
  category: Category;
  title: string;
  image: string;
  // Optional metadata (furniture usually has these; objet/painting may not):
  year?: string;
  size?: string; // 'Ø 74 - 76 cm  /  H 76 cm'
  price?: string; // '₩ 1,500,000'
  status?: PieceStatus;
  gallery?: string[]; // additional images for detail page
  featured?: boolean; // hero piece on the editorial home (one piece)
  cardImagePosition?: string; // CSS object-position for the feed card thumbnail only (detail page gallery stays uncropped)
  cardAspectRatio?: string; // CSS aspect-ratio override for the feed card thumbnail only, e.g. '4 / 3'
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
