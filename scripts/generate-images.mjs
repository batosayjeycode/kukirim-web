// One-off generator for raster brand assets in public/. Re-run after changing the brand colour:
//   node scripts/generate-images.mjs
import sharp from 'sharp';

const accent = '#0b6e4f';
const mark = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s / 32})">
    <rect width="32" height="32" rx="6" fill="${accent}"/>
    <g fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round">
      <path d="M8 11l8-4 8 4v10l-8 4-8-4z"/><path d="M8 11l8 4 8-4M16 15v10"/>
    </g>
  </g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f5f7f6"/>
  <rect y="606" width="1200" height="24" fill="${accent}"/>
  ${mark(96, 96, 96)}
  <text x="216" y="164" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#1b2420">Kukirim</text>
  <text x="96" y="360" font-family="Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#1b2420">Satu brand.</text>
  <text x="96" y="448" font-family="Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="${accent}">Banyak solusi digital.</text>
  <text x="96" y="530" font-family="Helvetica, Arial, sans-serif" font-size="32" fill="#55615b">Tools online praktis untuk Indonesia</text>
</svg>`;

const square = (size, pad) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${pad ? accent : 'none'}"/>${mark(0, 0, size)}</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
await sharp(Buffer.from(square(512))).png().toFile('public/logo.png');
await sharp(Buffer.from(square(180, true))).png().toFile('public/apple-touch-icon.png');
console.log('Generated public/og-default.png, public/logo.png, public/apple-touch-icon.png');
