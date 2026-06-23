import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS, getProject } from '@/data/projects';
import { LanguageProvider } from '@/lib/language-context';
import ProjectDetailClient from './ProjectDetailClient';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: 'Not Found — EEL' };
  return {
    title: `${project.title.en} — EEL`,
    description: project.summary?.en ?? `${project.client} · ${project.year}`,
    openGraph: {
      title: `${project.title.en} — EEL`,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: RouteParams) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <LanguageProvider>
      <ProjectDetailClient project={project} />
    </LanguageProvider>
  );
}
