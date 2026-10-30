import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { GUIDES_DIR, GUIDES_PATTERN, hasGuideFiles } from './lib/guide-files';

const panduan = defineCollection({
  // Empty loader until the first guide exists, so the build doesn't warn about an empty folder.
  loader: hasGuideFiles ? glob({ base: GUIDES_DIR, pattern: GUIDES_PATTERN }) : () => [],
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(70).max(160),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { panduan };
