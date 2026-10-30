import { getCollection } from 'astro:content';
import { hasGuideFiles } from './guide-files';

/** Published guides, newest first. Panduan nav and sections stay hidden while this is empty. */
export async function getPublishedGuides() {
  if (!hasGuideFiles) return [];
  const guides = await getCollection('panduan', ({ data }) => !data.draft);
  return guides.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'Asia/Jakarta' }).format(date);
}
