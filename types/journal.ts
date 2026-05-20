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
