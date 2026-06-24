import type { Metadata } from 'next';
import { PROJECTS } from '@/data/projects';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import MobileFooter from '@/components/journal/MobileFooter';
import MobileStickyCTA from '@/components/journal/MobileStickyCTA';
import ProjectsGrid from '@/components/journal/ProjectsGrid';
import { LanguageProvider } from '@/lib/language-context';

export const metadata: Metadata = {
  title: 'Projects — EEL',
  description:
    'Editorial, set design, and rental work featuring EEL pieces. W Magazine 2026 and more.',
  openGraph: {
    title: 'Projects — EEL',
    description: 'Editorial and set design work featuring EEL pieces.',
    images: [PROJECTS[0]?.cover ?? '/og-image.jpg'],
  },
};

export default function ProjectsPage() {
  return (
    <LanguageProvider>
      <h1 className="sr-only">
        EEL Projects — set design, editorial, and rental work featuring EEL
        resin pieces, including the 2026 W Magazine digital cover.
      </h1>
      <div className="min-h-screen bg-[#110D1C] text-[#F2EDE4] flex flex-col md:flex-row pb-11 md:pb-0">
        <Sidebar />
        <MobileHeader />
        <div className="flex-1 flex flex-col">
          <ProjectsGrid />
          <MobileFooter />
        </div>
        <MobileStickyCTA />
      </div>
    </LanguageProvider>
  );
}
