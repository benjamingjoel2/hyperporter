/**
 * A page's own photograph, if one has been supplied: public/photos/<slug>.jpg,
 * dropped in by the founder and named for the page. Anything without one
 * opens on the shared hero photo, graded down; a supplied one is shown as
 * supplied (`own`), dimmed only enough for white type.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface Photo {
  src: string;
  own: boolean;
}

export const photoFor = (...slugs: string[]): Photo => {
  for (const slug of slugs) {
    if (existsSync(join(process.cwd(), 'public/photos', `${slug}.jpg`))) {
      return { src: `/photos/${slug}.jpg`, own: true };
    }
  }
  return { src: '/hero.jpg', own: false };
};
