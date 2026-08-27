/**
 * World map geometry for the coverage map.
 *
 * Real Natural Earth data (via world-atlas), projected and turned into SVG
 * paths at build time. Nothing ships to the browser but the finished
 * paths — no mapping library, no runtime projection, no tiles.
 *
 * Resolution is a deliberate trade. The 110m set is 119KB of path data and
 * omits small island states; the 50m set includes them but costs 1.1MB of
 * paths, far too heavy for a marketing page. So: 110m for the shapes, plus
 * a dot per covered country that 110m drops.
 *
 * Those dot positions are the real 50m centroids, but computed once and
 * written into ISLAND_CENTROIDS below rather than derived at build time.
 * Parsing the 50m topology on every build cost ~1.5MB of JSON and a large
 * transient allocation to produce thirteen coordinate pairs, and that was
 * enough to push the production box's build over its memory limit.
 * Regenerate with scripts/island-centroids.mjs if destinations change.
 *
 * Coverage is derived from the destinations collection, so the map cannot
 * disagree with the rest of the site.
 */
import { feature } from 'topojson-client';
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import topo110 from 'world-atlas/countries-110m.json';

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

/**
 * Natural Earth abbreviates to fit its own labels. These are shown to
 * visitors in the hover bubble, so they get written out properly.
 */
const DISPLAY_NAMES: Record<string, string> = {
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'Central African Rep.': 'Central African Republic',
  'Dem. Rep. Congo': 'Democratic Republic of the Congo',
  'Eq. Guinea': 'Equatorial Guinea',
  'Falkland Is.': 'Falkland Islands',
  'Fr. S. Antarctic Lands': 'French Southern and Antarctic Lands',
  'N. Cyprus': 'Northern Cyprus',
  'S. Sudan': 'South Sudan',
  'Solomon Is.': 'Solomon Islands',
  'W. Sahara': 'Western Sahara',
  eSwatini: 'Eswatini',
  Macedonia: 'North Macedonia',
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
  /** Natural Earth's name for the shape. */
  name: string;
  /**
   * Our name for it, where we cover it. Natural Earth calls things
   * "Dominican Rep." and "United States of America"; a visitor should see
   * the name we use everywhere else on the site.
   */
  label?: string;
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

/**
 * Centroids for the covered countries that 110m geometry omits, in degrees.
 * Generated from Natural Earth 50m — see scripts/island-centroids.mjs.
 */
const ISLAND_CENTROIDS: { title: string; lon: number; lat: number }[] = [
  { title: "Antigua & Barbuda", lon: -61.7945, lat: 17.2762 },
  { title: "Bahrain", lon: 50.5425, lat: 26.0417 },
  { title: "Barbados", lon: -59.5602, lat: 13.1811 },
  { title: "Cape Verde", lon: -23.9576, lat: 15.9551 },
  { title: "Cook Islands", lon: -159.7871, lat: -21.2195 },
  { title: "French Polynesia", lon: -144.8045, lat: -14.7283 },
  { title: "Maldives", lon: 73.4573, lat: 3.7316 },
  { title: "Malta", lon: 14.405, lat: 35.9215 },
  { title: "Mauritius", lon: 57.5714, lat: -20.2779 },
  { title: "Saint Lucia", lon: -60.9696, lat: 13.8946 },
  { title: "Samoa", lon: -172.1649, lat: -13.7536 },
  { title: "Seychelles", lon: 55.476, lat: -4.6601 },
  { title: "Singapore", lon: 103.817, lat: 1.359 },
];

export interface WorldMap {
  countries: MapCountry[];
  dots: MapDot[];
  /** Any covered country with no geometry at either resolution. Should be empty. */
  missing: string[];
}

/**
 * @param covered  our destinations, as { title, slug }
 */
let cache: { key: string; value: WorldMap } | null = null;

export function buildWorldMap(covered: { title: string; slug: string }[]): WorldMap {
  // Two pages render the map. Without this the whole topology is parsed and
  // projected once per page.
  const cacheKey = covered.map((c) => c.slug).join('|');
  if (cache?.key === cacheKey) return cache.value;

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
      name: DISPLAY_NAMES[f.properties.name] ?? f.properties.name,
      label: hit?.title,
      d: trim(d),
      covered: Boolean(hit),
      slug: hit?.slug,
    });
  }

  // Anything covered that 110m does not draw gets a dot at its real centroid,
  // read from the precomputed table.
  const byTitle = new Map(ISLAND_CENTROIDS.map((c) => [c.title, c]));
  const dots: MapDot[] = [];
  const missing: string[] = [];

  for (const [key, entry] of wanted) {
    if (drawn.has(key)) continue;
    const c = byTitle.get(entry.title);
    const point = c ? projection([c.lon, c.lat]) : null;
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

  const result = { countries, dots, missing };
  cache = { key: cacheKey, value: result };
  return result;
}
