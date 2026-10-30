// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site, draftPages } from './src/data/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  output: 'static',
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
