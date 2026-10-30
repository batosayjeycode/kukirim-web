// Launch gate for the deploy job: fails while any page is a draft or contains a placeholder.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { draftPages } from '../src/data/site.ts';

const problems = [];

if (draftPages.length) problems.push(`draftPages is not empty: ${draftPages.join(', ')}`);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

for (const file of walk('src/pages').filter((f) => f.endsWith('.astro') || f.endsWith('.md'))) {
  if (readFileSync(file, 'utf8').includes('<Placeholder')) problems.push(`${file} still uses <Placeholder>`);
}

if (problems.length) {
  problems.forEach((p) => console.log(`  BLOCKED ${p}`));
  process.exit(1);
}
console.log('check:launch: OK');
