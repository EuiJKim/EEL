import type { Metadata } from 'next';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import GridLayout from '@/components/journal/GridLayout';

export const metadata: Metadata = {
  title: 'Journal — EEL',
  description:
    'A living record from a Seoul resin atelier. Works in progress, completed pieces, materials, and notes.',
  openGraph: {
    title: 'Journal — EEL',
    description: 'A living record from a Seoul resin atelier.',
    images: ['/og-image.jpg'],
  },
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#2e3330] text-[#e8ebe8] flex flex-col md:flex-row">
      <Sidebar />
      <MobileHeader />
      <GridLayout />
    </div>
  );
}
