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

// Production domain. Canonicals, OG URLs, the sitemap and robots.txt all
// derive from this, so it must match how the site is actually served —
// nginx serves https://hyperporter.com (see DEPLOY.md). Override with
// SITE_URL for a staging or preview origin.
const site = process.env.SITE_URL ?? 'https://hyperporter.com';

// Pages that render a noindex robots tag and so must not be listed in the
// sitemap either: About until the "Name pending" bios are real, Terms and
// Privacy until counsel has reviewed the drafts.
const noindexPaths = new Set(['/about/', '/terms/', '/privacy/', '/404/']);

export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        if (noindexPaths.has(pathname)) return false;
        const match = pathname.match(/^\/destinations\/([^/]+)\/?$/);
        if (!match) return true;
        return indexableDestinations.has(match[1]);
      },
    }),
  ],
});
