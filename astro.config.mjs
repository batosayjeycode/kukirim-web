// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site, draftPages } from './src/data/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  output: 'static',
  // Inline the small stylesheet so it is not a render-blocking request
  // (allowed by style-src 'unsafe-inline' in public/_headers).
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Draft pages (noindex) and the 404 page stay out of the sitemap.
      filter: (page) => {
        const path = new URL(page).pathname;
        return !draftPages.includes(path) && !path.startsWith('/404');
      },
    }),
  ],
});
