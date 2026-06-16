import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import WorksDetailClient from './WorksDetailClient';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ENTRIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) return { title: 'Not Found — EEL' };
  return {
    title: `${entry.title} — EEL`,
    description: entry.size ?? 'EEL — Seoul resin atelier',
    openGraph: {
      title: `${entry.title} — EEL`,
      images: [entry.image],
    },
  };
}

export default async function JournalDetailPage({ params }: RouteParams) {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) notFound();

  return <WorksDetailClient entry={entry} />;
}
