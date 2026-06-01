import type { Metadata } from 'next';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import MobileFooter from '@/components/journal/MobileFooter';
import MobileStickyCTA from '@/components/journal/MobileStickyCTA';
import GridLayout from '@/components/journal/GridLayout';
import type { Category } from '@/types/journal';
import { LanguageProvider } from '@/lib/language-context';

export const metadata: Metadata = {
  title: 'EEL — Seoul resin atelier',
  description:
    'Furniture, objects, and paintings from a Seoul resin atelier. Made-to-order, cured over 21 days.',
  openGraph: {
    title: 'EEL — Seoul resin atelier',
    description: 'Furniture, objects, and paintings from a Seoul resin atelier.',
    images: ['/og-image.jpg'],
  },
};

type Active = 'all' | Category;
const VALID: Active[] = ['all', 'furniture', 'object', 'painting'];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active: Active =
    category && (VALID as string[]).includes(category)
      ? (category as Active)
      : 'all';

  return (
    <LanguageProvider>
      {/* SEO h1 — visually hidden, present for search engines & a11y */}
      <h1 className="sr-only">
        EEL — Seoul resin atelier. Handmade furniture, objects, and paintings.
        Made-to-order, cured over 21 days.
      </h1>
      <div className="min-h-screen bg-[#2e3330] text-[#e8ebe8] flex flex-col md:flex-row pb-11 md:pb-0">
        <Sidebar />
        <MobileHeader />
        <div className="flex-1 flex flex-col">
          <GridLayout category={active} />
          <MobileFooter />
        </div>
        <MobileStickyCTA />
      </div>
    </LanguageProvider>
  );
}
