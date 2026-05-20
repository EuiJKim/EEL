import type { Metadata } from 'next';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import GridLayout from '@/components/journal/GridLayout';
import type { Category } from '@/types/journal';

export const metadata: Metadata = {
  title: 'Journal — EEL',
  description:
    'A living record from a Seoul resin atelier. Furniture, objects, and paintings.',
  openGraph: {
    title: 'Journal — EEL',
    description: 'A living record from a Seoul resin atelier.',
    images: ['/og-image.jpg'],
  },
};

type Active = 'all' | Category;
const VALID: Active[] = ['all', 'furniture', 'object', 'painting'];

export default async function JournalPage({
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
    <div className="min-h-screen bg-[#2e3330] text-[#e8ebe8] flex flex-col md:flex-row">
      <Sidebar />
      <MobileHeader />
      <GridLayout category={active} />
    </div>
  );
}
