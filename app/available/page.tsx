import type { Metadata } from 'next';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import MobileFooter from '@/components/journal/MobileFooter';
import MobileStickyCTA from '@/components/journal/MobileStickyCTA';
import GridLayout from '@/components/journal/GridLayout';
import type { Category } from '@/types/journal';

export const metadata: Metadata = {
  title: 'Available Now — EEL',
  description:
    'Resin pieces ready to ship from the EEL Seoul atelier. Inquire to reserve — worldwide shipping available.',
  openGraph: {
    title: 'Available Now — EEL',
    description: 'Resin pieces ready to ship. Inquire to reserve.',
    images: ['/og-image.jpg'],
  },
};

type Active = 'all' | Category;
const VALID: Active[] = ['all', 'furniture', 'object', 'painting'];

export default async function AvailablePage({
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
    <>
      {/* SEO h1 — visually hidden */}
      <h1 className="sr-only">
        Available now at EEL — Resin pieces ready to ship from the Seoul
        atelier. Reserve one with a single inquiry.
      </h1>
      <div className="min-h-screen bg-[#2e3330] text-[#e8ebe8] flex flex-col md:flex-row pb-11 md:pb-0">
        <Sidebar />
        <MobileHeader />
        <div className="flex-1 flex flex-col">
          <GridLayout category={active} availableOnly />
          <MobileFooter />
        </div>
        <MobileStickyCTA />
      </div>
    </>
  );
}
