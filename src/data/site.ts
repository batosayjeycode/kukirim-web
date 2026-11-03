export const site = {
  name: 'Kukirim',
  url: 'https://kukirim.com',
  tagline: 'Satu brand. Banyak solusi digital.',
  // Homepage <title> and <h1>: carry the brand and category keywords; the tagline stays as the hero eyebrow.
  homeTitle: 'Kukirim Digital — Tools Online & Panduan Seller Indonesia',
  homeHeading: 'Tools Online Praktis untuk Kebutuhan Digital Indonesia',
  description:
    'Kukirim Digital menghadirkan tools online praktis untuk kebutuhan digital di Indonesia, dimulai dari tools gratis dan panduan untuk seller online.',
  // Verified: published on https://tools.kukirim.com (checked 2026-10-29).
  email: 'halo@kukirim.com',
  // Brand name shown in the footer. Not a statement of the legal operator, which is unresolved.
  footerName: 'Kukirim Digital',
  locale: 'id_ID',
  themeColor: '#0b6e4f',
} as const;

// Sitemap `lastmod` (YYYY-MM-DD) for non-guide pages: the date their visible content last changed.
// Update the date whenever a page's content changes. Guides and /panduan/ get theirs from guide frontmatter.
export const pageLastmods: Record<string, string> = {
  '/': '2026-11-03',
  '/tentang/': '2026-11-03',
  '/kontak/': '2026-11-03',
  '/privasi/': '2026-10-26',
  '/syarat-ketentuan/': '2026-10-26',
};

// Pages that still contain placeholders awaiting owner review.
// They render a draft banner, get `noindex`, and are excluded from the sitemap.
// Remove a path here once its content is confirmed.
export const draftPages: string[] = [];
