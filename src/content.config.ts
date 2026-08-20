import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Canonical region taxonomy — the 7 groups the old DEST array used.
 * Locked in as the single source of truth: Horizon's radial diagram (which
 * used a different, overlapping 6-label set) gets rebuilt on this list
 * rather than keeping its own.
 */
export const REGIONS = [
  'Africa',
  'Asia',
  'Australia & Oceania',
  'Europe',
  'Middle East',
  'North & Central America',
  'South America',
] as const;

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/destinations' }),
  schema: z
    .object({
      title: z.string(),
      region: z.enum(REGIONS),
      description: z.string(),
      heroImage: z.string().optional(),
      heroAlt: z.string().optional(),
      // Destinations are noindex + excluded from the sitemap by default
      // (see astro.config.mjs) until the page carries real, unique content.
      // Set true per-page to opt in once that's done.
      index: z.boolean().default(false),
    })
    .refine((data) => !data.heroImage || !!data.heroAlt, {
      message: 'heroAlt is required whenever heroImage is set',
      path: ['heroAlt'],
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    cat: z.string(),
    date: z.coerce.date(),
    // Single company byline for now — revisit if named authorship is wanted.
    author: z.string().default('Hyperporter'),
  }),
});

export const collections = { destinations, blog };
