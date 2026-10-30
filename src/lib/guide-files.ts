import { readdirSync } from 'node:fs';

export const GUIDES_DIR = './src/content/panduan';

// Files and folders starting with "_" (e.g. _TEMPLATE.md) are ignored.
export const GUIDES_PATTERN = '**/[^_]*.md';

/** True once at least one guide file exists. Lets the build skip the empty collection without warnings. */
export const hasGuideFiles = readdirSync(GUIDES_DIR, { recursive: true, encoding: 'utf8' }).some(
  (path) => path.endsWith('.md') && !path.split(/[\\/]/).some((part) => part.startsWith('_')),
);
