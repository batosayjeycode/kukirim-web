// Social preview images (1200 × 630) for guides: public/og/panduan/<slug>.png, one per
// published guide in src/content/panduan/ (files starting with "_" are skipped).
// Guides without an image fall back to /og-default.png, so this is optional for new guides.
// Re-run after adding a guide or changing a guide title:
//   npm run images:guides
// Uses sharp (installed with Astro), like scripts/generate-images.mjs.
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = 'src/content/panduan';
const OUT = 'public/og/panduan';
const accent = '#0b6e4f';

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word wrap by character count (titles are ≤ 70 characters). */
function wrap(text, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && `${line} ${word}`.length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

const mark = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s / 32})">
    <rect width="32" height="32" rx="6" fill="${accent}"/>
    <g fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round">
      <path d="M8 11l8-4 8 4v10l-8 4-8-4z"/><path d="M8 11l8 4 8-4M16 15v10"/>
    </g>
  </g>`;

function svg(title) {
  const lines = wrap(title, 26);
  const size = lines.length > 3 ? 56 : 64;
  const lineHeight = Math.round(size * 1.2);
  const top = 300; // first title baseline; the block grows downward, clear of the logo
  const text = lines
    .map((l, i) => `<text x="96" y="${top + i * lineHeight}" font-size="${size}" font-weight="700" fill="#1b2420">${escapeXml(l)}</text>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" font-family="Helvetica, Arial, sans-serif">
  <rect width="1200" height="630" fill="#f5f7f6"/>
  <rect y="606" width="1200" height="24" fill="${accent}"/>
  ${mark(96, 72, 64)}
  <text x="176" y="118" font-size="44" font-weight="800" fill="#1b2420">Kukirim</text>
  <text x="96" y="220" font-size="30" font-weight="700" fill="${accent}" letter-spacing="2">PANDUAN</text>
  ${text}
  <text x="96" y="550" font-size="30" fill="#55615b">kukirim.com/panduan</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
for (const file of files) {
  const source = readFileSync(join(SRC, file), 'utf8');
  if (/^draft:\s*true/m.test(source)) continue;
  const title = source.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1];
  if (!title) throw new Error(`${file}: no title`);
  const slug = file.replace(/\.md$/, '');
  await sharp(Buffer.from(svg(title))).png({ compressionLevel: 9, palette: true }).toFile(join(OUT, `${slug}.png`));
  console.log(`Generated ${OUT}/${slug}.png`);
}
