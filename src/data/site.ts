export const site = {
  name: 'Kukirim',
  url: 'https://kukirim.com',
  tagline: 'Satu brand. Banyak solusi digital.',
  description:
    'Kukirim menghadirkan tools online praktis untuk kebutuhan digital sehari-hari di Indonesia, dimulai dari tools gratis untuk seller online.',
  // Verified: published on https://tools.kukirim.com (checked 2026-10-29).
  email: 'halo@kukirim.com',
  // Brand name shown in the footer. Not a statement of the legal operator, which is unresolved.
  footerName: 'Kukirim Digital',
  locale: 'id_ID',
  themeColor: '#0b6e4f',
} as const;

// Pages that still contain placeholders awaiting owner review.
// They render a draft banner, get `noindex`, and are excluded from the sitemap.
// Remove a path here once its content is confirmed.
export const draftPages: string[] = [];
