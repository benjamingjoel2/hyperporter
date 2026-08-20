import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import matter from 'gray-matter';

const destinationsDir = new URL('./src/content/destinations/', import.meta.url);

// Destinations are noindex-by-default (see src/content/config.ts). This reads
// each destination's frontmatter directly — content collections aren't
// queryable from astro.config.mjs — to build the set of slugs that opted in
// via `index: true`, so the sitemap only ever lists those.
function indexableDestinationSlugs() {
  const slugs = new Set();
  if (!fs.existsSync(destinationsDir)) return slugs;
  for (const file of fs.readdirSync(destinationsDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const { data } = matter(fs.readFileSync(new URL(file, destinationsDir), 'utf8'));
    if (data.index === true) {
      slugs.add(data.slug ?? file.replace(/\.mdx?$/, ''));
    }
  }
  return slugs;
}

const indexableDestinations = indexableDestinationSlugs();

// The production domain isn't decided yet — build against a staging
// placeholder and override with SITE_URL once it is, rather than hardcoding
// hyperporter.com.
const site = process.env.SITE_URL ?? 'https://staging.hyperporter.pages.dev';

export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        const match = pathname.match(/^\/destinations\/([^/]+)\/?$/);
        if (!match) return true;
        return indexableDestinations.has(match[1]);
      },
    }),
  ],
});
