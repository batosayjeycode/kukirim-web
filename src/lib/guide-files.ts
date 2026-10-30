import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const GUIDES_DIR = './src/content/panduan';

// Files and folders starting with "_" (e.g. _TEMPLATE.md) are ignored.
export const GUIDES_PATTERN = '**/[^_]*.md';

/** True once at least one guide file exists. Lets the build skip the empty collection without warnings. */
export const hasGuideFiles = readdirSync(GUIDES_DIR, { recursive: true, encoding: 'utf8' }).some(
  (path) => path.endsWith('.md') && !path.split(/[\\/]/).some((part) => part.startsWith('_')),
);

/**
 * Sitemap `lastmod` (YYYY-MM-DD) for each published guide, from `updatedAt` or `publishedAt` in its frontmatter,
 * plus `/panduan/` with the newest of them. Read from the files directly because astro.config.mjs runs before
 * content collections are available.
 */
export function guideLastmods(): Map<string, string> {
  const dates = new Map<string, string>();
  const files = readdirSync(GUIDES_DIR, { recursive: true, encoding: 'utf8' }).filter(
    (path) => path.endsWith('.md') && !path.split(/[\\/]/).some((part) => part.startsWith('_')),
  );
  for (const file of files) {
    const frontmatter = readFileSync(join(GUIDES_DIR, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const field = (name: string) => frontmatter.match(new RegExp(`^${name}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
    if (/^draft:\s*true\b/m.test(frontmatter)) continue;
    const date = field('updatedAt') ?? field('publishedAt');
    if (date) dates.set(`/panduan/${file.replace(/\\/g, '/').replace(/\.md$/, '')}/`, date);
  }
  if (dates.size > 0) dates.set('/panduan/', [...dates.values()].sort().at(-1)!);
  return dates;
}
