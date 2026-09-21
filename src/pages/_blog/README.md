# The blog, held back until v2

These two pages build `/blog` and `/blog/{slug}` from the seven articles in
`src/content/blog`. The directory is named `_blog` rather than `blog` because
Astro ignores a route folder whose name starts with an underscore — so nothing
here is built or published, and the articles stay in the repository untouched.

Held back at the founder’s instruction (Sep 2026): the blog goes live with v2
of the site, not before.

**To bring it back:** rename this folder to `blog`, then put the links back —
`lib/content/nav.ts` (a Blog item under Resources, and the two feature cards
that used to point at a post), `components/Footer.astro` (a link in the Company
column) and `pages/404.astro`. Nothing else was removed.
