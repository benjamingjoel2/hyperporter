# Hyperporter — website

Context for any Claude Code session working in this repo. Read this first.

## What Hyperporter is

Travel-tech company. **Four product layers**, and they are not interchangeable:

- **OS** — the *platform*. CRM, magic links, public inquiry form, proposal generator.
  Free on every tier, for both sides. This is the software; when you mean "the platform",
  the word is **OS**, not Autopilot.
- **Autopilot** — the *automation layer* on top of OS. The nine-stage engine, Inquiry
  through Post-Trip, with human escalation points by design.
- **Intelligence** — the *AI layer* on top of Autopilot. Atlas is the assistant, Vault is
  where an account's own contracts and rates live. Trained on the account's own data only.
- **Horizon** — the *supplier network*. A vetted list of DMCs and suppliers across 130+
  countries that agencies search. Not software, and suppliers never log into it.

Two sides of the market:

- **Resellers** — travel agencies, travel agents, independent advisors, creators. They
  source suppliers and run the full ladder: Showcase → Autopilot → Intelligence.
- **Suppliers** — DMCs and tour operators. They are the ones being sourced, and skip the
  middle tier: Showcase → Intelligence.

Tiers are **Showcase** (free), **Autopilot** (€49/mo), **Intelligence** (custom). Note the
tier names collide with two of the product-layer names; that is the founder's naming.

### Terminology rules — do not break these

- Never describe Horizon as software, and never as something a supplier logs into.
- Never call Autopilot the platform. OS is the platform; Autopilot is automation on top.
- Intelligence trains on the account's own Vault only — never on anyone else's data.
  This claim appears on /intelligence and /security and must stay identical on both.
- Do not overstate automation. Escalation to a human is a designed feature, not a gap.
- The Autopilot before/after figures are **pilot targets, not results**. The sentence
  saying so must stay next to the table.
- Horizon's fee is 10%, and the supplier always receives their full quoted rate.
- Security: SOC 2 and GDPR are **not** certified — "targeted post-pilot". Never soften this.

## Current state of the code

`hyperporter.html` — single file, ~420KB. No build step. This is a **prototype to migrate from**,
not the long-term architecture. It contains:

- Inline CSS (custom properties, no framework) and inline JS (no dependencies).
- Google Fonts: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels/eyebrows).
- A client-side router: `go(id)` toggles `.view.on` across sections `#view-{id}`.
  **There are no real URLs.** This is the single biggest problem with the current build.

### Views

`home`, `autopilot`, `horizon`, `destinations`, `region`, `dest`, `how`, `about`, `signup`,
`blog`, `post`

### Data structures in the script block

- `POSTS` — 7 blog articles, full HTML bodies.
- `STAGES` — 9 pipeline stages, drives the Autopilot zigzag and How-It-Works spine.
- `REGIONS` — 6 entries, drives the Horizon radial diagram.
- `FEED` — 12 entries for the dispatch marquee.
- `DEST` — 7 regions containing 137 countries total.
- `DESC` — one-line description per country (all 137 covered).
- `LM` — country -> `[landmark archetype, base hue]`.
- `A` — 50 landmark illustration builders (`A.flame`, `A.savanna`, `A.taj`, …).
- `SERVICES`, `GUARANTEE` — destination page content blocks.
- `DEST_IMG` — **empty by design.** Set `DEST_IMG['Azerbaijan']='https://…'` and that
  destination uses a real photo instead of the generated illustration, in both hero and tile.

### Design system

- Dark throughout. `--void #07080A`, `--signal #46C6B9` (teal), `--amber #E8A33C`.
- Amber is reserved for human-touchpoint / manual states. Do not use it decoratively.
- Reveal-on-scroll: elements get `.rv`, IntersectionObserver adds `.in`. Re-armed on route change.
- Animations: `march` (marquees), `fly` (hero flight arcs), `run`, `spin`, `blip`.
- Full `prefers-reduced-motion` kill switch exists. Keep it.

### Illustrations

Destination artwork is **generated SVG**, not photography — 50 hand-built landmark scenes
(Flame Towers for Azerbaijan, Tiger's Nest for Bhutan, Belém Tower for Portugal, and so on),
seeded per country for palette variation. These are placeholders standing in until real
photography is licensed. Keep them as the fallback when `DEST_IMG` has no entry.

## Site structure (Aug 2026)

Built from the founder's content file — 26 views, ~4,900 words.

- `/` · `/product` · `/os` · `/autopilot` · `/intelligence` · `/horizon`
- `/solutions` + `/solutions/[slug]` — six categories, tier shown per feature
- `/customers` + `/customers/[slug]` — the two overviews (agent-os, supplier-os)
  and six segments, all on one route
- `/pricing` (two ladders, one switch) · `/security` · `/blog` (as Resources)
- `/destinations` and the 137 country pages are unchanged and still noindex
- `/how` is gone; its nine stages live on `/autopilot`. The route 301s there.

Content lives in `src/lib/content/{products,solutions,customers,pricing}.ts`, not in
the page files. Pages are thin; edit the content modules.

## Known gaps — these need doing

1. **No URLs.** All 137 destinations, 7 regions, and 7 blog posts are unindexable. This is why
   the migration matters more than any feature.
2. **No SEO.** No per-page title, meta description, canonical, OG tags, sitemap, robots.txt,
   structured data, or image alt text anywhere.
3. **Thin content risk.** 137 destination pages currently share near-identical copy apart from
   the country name. Google penalises this. Each page needs genuinely unique material before
   the SEO play is worth anything.
4. **About page** has three `Name pending` placeholder bios.
5. **Footer** Terms / Privacy / FAQ buttons have no handlers.
6. **Country count** — site says "130+ countries", the dataset holds 137, and a founder brief
   said "100+". Unresolved. Confirm the real number before publishing.
7. **Award badges** — "Hospitality B2B Travel Partner" and "UN Tourism Winner" have been
   REMOVED from all 137 destination pages pending confirmation. Restore only once verified.


## Design direction (current)

Light base with teal as the accent. Reverted (Aug 2026) to the pre-Harvey
direction at commit `28d708a` at the founder's instruction — the harvey.ai /
starlink.com rebuild is preserved in git history at `d05cc73` if it is ever
wanted back.

- **Type**: Hyperlocal ROM throughout — display, body and labels — with Inter
  as the single fallback. PT Serif and IBM Plex Mono were dropped (Aug 2026)
  at the founder's instruction; the only Google Fonts request left is Inter.
  Labels and eyebrows stay in capitals with their wide tracking.
  Two things the switch needed: display sizes carry `-.022em` tracking (the
  serif wanted `+.006em`; a grotesque at 108px wants the opposite), and
  anything with digits that line up or tick over gets
  `font-variant-numeric:tabular-nums`, since the labels are no longer
  monospaced. Hyperlocal ROM ships real `tnum` figures.
- **Accent**: `--signal` is teal `#1B747E`. Amber `#9A5F0B` is still reserved
  for human-touchpoint / manual states — never decorative.
- Homepage opens on the photo band with the flight-arc overlay, as it did
  before the rebuild.
- `WorldMap.astro` + `lib/worldMap.ts` survived the revert: real Natural Earth
  geometry projected to SVG at build time. 110m shapes plus centroid dots for
  the 13 island states 110m drops. Two states only — covered or not. The build
  **fails** if any destination has no geometry, so the map can never
  under-report. It lives on `/destinations` and keeps its own dark ground;
  hover green is deliberately not `--signal`.
- **Software mock-ups, not illustrations** (Sep 2026, founder's instruction).
  Every page hero and the four homepage product cards show a screen of
  Hyperporter's own interface — OS, Autopilot, Atlas and Vault, and the
  supplier's side of a Horizon request — drawn in markup and composed the way
  the reference composes its product shots: one frosted panel with a single
  idea in it, floating at legible size on a coloured or photographic ground,
  sometimes a faded sheet behind it for depth, and a small chip in the corner
  naming the layer. Never a whole application shrunk into a tile — that reads
  as a diagram. The frame is
  `components/Mockup.astro`; the screens are `components/mockups/*.astro`,
  named in `mockups/index.ts`; the primitives are `styles/mockup.css`. All
  measurements inside a screen are in em off a font-size that is a fraction
  of the frame width, so a screen scales like a photograph of itself.
  Everything in them is invented, and the caption under each says so. The
  rules that hold inside a screen are the site's: amber only on human /
  manual states, suppliers never shown inside Horizon, Atlas answering from
  the account's own Vault, the supplier receiving their full quoted rate,
  SOC 2 / GDPR shown as targeted. The line-drawn `pageArt.ts` and
  `legoraArt.ts` families they replaced are at `1848a30`.
- An Apple / Liquid Glass restyle was tried and rejected (`039fad9`,
  reverted at `1848a30`). Do not bring it back.
- Removed with the earlier revert: `AppShot.astro` and `lib/counts.ts`, both
  recoverable from `d05cc73`.

### Font licence — outstanding
Hyperlocal ROM was supplied under a **desktop** licence, whose terms forbid
"storing on publicly available servers". It is live on hyperporter.com at the
founder's explicit instruction. A Dinamo **web** licence is still required.

## Migration target

Astro (unless the CTO prefers otherwise). What it must produce:

- Content collections: `src/content/destinations/*.md`, `src/content/blog/*.md`.
  Frontmatter carries `title`, `description`, `heroImage`, `heroAlt`, `region`, `slug`.
- Real routes: `/destinations/azerbaijan`, `/regions/asia`, `/blog/{slug}`.
- Astro's image pipeline for responsive AVIF/WebP. Alt text required on every image.
- SEO component: title, meta description, canonical, OG/Twitter, JSON-LD
  (`Organization`, `TouristDestination`, `BlogPosting`).
- Auto `sitemap.xml` and `robots.txt`.
- Deploy: Cloudflare Pages or Vercel, on push to `main`.

Port the design system and the landmark SVG generator across as-is. They work.

## Working style

- Terse and direct. Explain reasoning *before* implementing, not after.
- One decision at a time; wait for confirmation before moving to the next.
- Make targeted edits. Do not rebuild or "improve" things that weren't asked about.
- Push back on overstatement, wordiness, and visual clutter.
- Short punchy lines for positioning copy. Cleanly structured prose for spec documents.

### Always preview before merging

**Any visual change gets a preview link before the PR is merged, not after.**
Build the site, inline the page into a single self-contained file, and publish
it as an artifact so it can be opened in a browser without cloning, installing
or running anything locally.

This is not optional politeness — it is how the review actually works here.
Screenshots taken by the agent are a poor substitute: several faults in this
site's history were invisible in a screenshot and obvious the moment a person
clicked something. A dropdown that renders under the ticker, a hero whose CTA
falls below the fold on a shorter screen, an entire missing `<script>` block —
all shipped past agent-side checks, all would have been caught in ten seconds
of clicking.

So: preview link first, merge second, deploy third. Never reverse that order,
and never ask for a merge without a link to look at.

    npm run build && python3 scripts/build-preview.py preview-site.html

That bundles all 181 routes into one self-contained file — every route
browsable through its real links, at phone, tablet or full width. Publish it
as an artifact. Preview the whole site, not the one page you changed: several
of the faults in this site's history were on a page nobody thought to look at.
The generator drops `/how` (a redirect stub) and `/preview/*` (design studies),
and leaves `/photos/*` unresolved because that photography is still
unlicensed — those tiles are blank in the preview exactly as they are live.
