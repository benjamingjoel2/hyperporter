/**
 * Kebab-case slugify, e.g. "Australia & Oceania" -> "australia-oceania".
 *
 * Apostrophes are dropped rather than treated as separators, so "don't"
 * becomes "dont" instead of "don-t". No existing destination or region name
 * contains one, so this changes no already-published slug \u2014 it only matters
 * for blog titles, which do.
 */
export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/['\u2018\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
