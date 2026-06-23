import type { Project } from '@/types/project';

/**
 * Projects — add new ones to the TOP. Each project's images live in
 * `public/<id>/` (the W Magazine shoot reuses the legacy `public/book/`
 * folder). featuredPieceIds must match ids in data/journal-entries.ts.
 */
export const PROJECTS: Project[] = [
  {
    id: 'w-magazine-2026',
    title: { en: 'W Magazine Digital Cover', ko: 'W 매거진 디지털 커버' },
    client: 'W Magazine',
    year: '2026',
    role: [
      { en: 'Set Design', ko: '세트 디자인' },
      { en: 'Prop Rental', ko: '소품 렌탈' },
    ],
    cover: '/book/1.jpg',
    summary: {
      en: 'Set design for the 2026 W Magazine digital cover, with EEL pieces placed throughout the shoot.',
      ko: '2026 W 매거진 디지털 커버 세트 디자인. 촬영 전반에 EEL 작품을 배치했습니다.',
    },
    photos: [
      '/book/2.jpg',
      '/book/3.jpg',
      '/book/4.jpg',
      '/book/5.jpg',
      '/book/6.jpg',
      '/book/7.jpg',
    ],
    featuredPieceIds: ['tile-table'],
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/** Reverse lookup: which projects featured a given piece. */
export function projectsFeaturing(pieceId: string): Project[] {
  return PROJECTS.filter((p) => p.featuredPieceIds?.includes(pieceId));
}
