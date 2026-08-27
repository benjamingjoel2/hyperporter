/**
 * World map geometry for the coverage map.
 *
 * Real Natural Earth data (via world-atlas), projected and turned into SVG
 * paths at build time. Nothing ships to the browser but the finished
 * paths — no mapping library, no runtime projection, no tiles.
 *
 * Resolution is a deliberate trade. The 110m set is 119KB of path data and
 * omits small island states; the 50m set includes them but costs 1.1MB,
 * which is far too heavy for a marketing page. So: 110m for the shapes,
 * plus a dot per covered country that 110m drops, positioned from that
 * country's real 50m centroid. Accurate, and a tenth of the weight.
 *
 * Coverage is derived from the destinations collection, so the map cannot
 * disagree with the rest of the site.
 */
import { feature } from 'topojson-client';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import topo110 from 'world-atlas/countries-110m.json';
import topo50 from 'world-atlas/countries-50m.json';

export const MAP_W = 1600;
export const MAP_H = 820;

/**
 * Our country names against Natural Earth's. Only genuine naming
 * differences — never a guess at which shape someone meant.
 */
const ALIASES: Record<string, string> = {
  'Dominican Republic': 'Dominican Rep.',
  'Ivory Coast': "Côte d'Ivoire",
  'Republic of Congo': 'Congo',
  Türkiye: 'Turkey',
  'United States': 'United States of America',
  'Antigua & Barbuda': 'Antigua and Barb.',
  'Cape Verde': 'Cabo Verde',
  'Cook Islands': 'Cook Is.',
  'French Polynesia': 'Fr. Polynesia',
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export interface MapCountry {
  name: string;
  d: string;
  covered: boolean;
  slug?: string;
}

export interface MapDot {
  name: string;
  x: number;
  y: number;
  slug: string;
}

export interface WorldMap {
  countries: MapCountry[];
  dots: MapDot[];
  /** Any covered country with no geometry at either resolution. Should be empty. */
  missing: string[];
}

/**
 * @param covered  our destinations, as { title, slug }
 */
export function buildWorldMap(covered: { title: string; slug: string }[]): WorldMap {
  const projection = geoNaturalEarth1().fitSize([MAP_W, MAP_H], { type: 'Sphere' });
  const toPath = geoPath(projection);

  /** Round coordinates to one decimal — invisible at this scale, ~40% smaller. */
  const trim = (d: string) =>
    d.replace(/-?\d+\.?\d*/g, (m) => String(Math.round(parseFloat(m) * 10) / 10));

  /** normalised Natural Earth name -> our destination */
  const wanted = new Map<string, { title: string; slug: string }>();
  for (const c of covered) {
    wanted.set(norm(ALIASES[c.title] ?? c.title), c);
  }

  const fc110 = feature(
    topo110 as never,
    (topo110 as never as { objects: { countries: never } }).objects.countries
  ) as unknown as FeatureCollection<Geometry, { name: string }>;

  const countries: MapCountry[] = [];
  const drawn = new Set<string>();

  for (const f of fc110.features) {
    // Antarctica is a quarter of the map's height, is covered by nobody,
    // and is not a market. The reference map omits it too.
    if (f.properties.name === 'Antarctica') continue;
    const d = toPath(f);
    if (!d) continue;
    const key = norm(f.properties.name);
    const hit = wanted.get(key);
    if (hit) drawn.add(key);
    countries.push({
      name: f.properties.name,
      d: trim(d),
      covered: Boolean(hit),
      slug: hit?.slug,
    });
  }

  // Anything covered that 110m does not draw gets a dot at its real centroid.
  const stillWanted = [...wanted.entries()].filter(([key]) => !drawn.has(key));
  const dots: MapDot[] = [];
  const missing: string[] = [];

  if (stillWanted.length) {
    const fc50 = feature(
      topo50 as never,
      (topo50 as never as { objects: { countries: never } }).objects.countries
    ) as unknown as FeatureCollection<Geometry, { name: string }>;
    const byName = new Map(fc50.features.map((f) => [norm(f.properties.name), f]));

    for (const [key, entry] of stillWanted) {
      const f = byName.get(key);
      if (!f) {
        missing.push(entry.title);
        continue;
      }
      const point = projection(geoCentroid(f));
      if (!point) {
        missing.push(entry.title);
        continue;
      }
      dots.push({
        name: entry.title,
        slug: entry.slug,
        x: Math.round(point[0] * 10) / 10,
        y: Math.round(point[1] * 10) / 10,
      });
    }
  }

  return { countries, dots, missing };
}
