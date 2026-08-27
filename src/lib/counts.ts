/**
 * Single source of truth for how many countries and regions the network
 * covers, read from the destinations collection.
 *
 * Before this, "130+" was hard-coded into the Horizon page's copy, meta
 * description and diagram while the homepage said 137 — two different
 * numbers live on the same site. Every page now derives the figure, so it
 * cannot drift again: add or remove a destination entry and the whole site
 * follows.
 *
 * The public figure is still an open question (a founder brief said
 * "100+"); this at least guarantees one answer everywhere.
 */
import { getCollection } from 'astro:content';
import { REGIONS } from '../content.config';

export async function networkCounts() {
  const destinations = await getCollection('destinations');
  const regions = REGIONS.filter((r) => destinations.some((d) => d.data.region === r));
  return { countries: destinations.length, regions, regionCount: regions.length };
}
