import type { APIRoute } from 'astro';

/**
 * robots.txt, generated so the Sitemap line always carries the real
 * deployed origin rather than a hardcoded domain (SITE_URL is still a
 * staging placeholder — see astro.config.mjs).
 *
 * Deliberately no Disallow rules for the noindex pages (all 137
 * destinations, /about, /terms, /privacy): a crawler has to fetch a page
 * to see its robots meta tag, so disallowing them here would prevent the
 * noindex from ever being read. Crawl-blocking and index-blocking are
 * different mechanisms and combining them is counterproductive. The
 * noindex tag plus sitemap exclusion is the correct pairing; this file
 * only needs to point at the sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
