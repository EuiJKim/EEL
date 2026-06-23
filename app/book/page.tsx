import { redirect } from 'next/navigation';

/**
 * Legacy route. The "Book" section was renamed to "Projects". Keep this path
 * working (old links / bookmarks) by redirecting to the W Magazine project.
 */
export default function BookPage() {
  redirect('/projects/w-magazine-2026');
}
