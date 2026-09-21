# Hyperporter — website

Context for any Claude Code session working in this repo. Read this first.

## What Hyperporter is

Travel-tech company. **Four product layers**, and they are not interchangeable:

- **Portal** — the *platform*. CRM, magic links, public inquiry form, proposal generator.
  Free on every tier, for both sides. This is the software; when you mean "the platform",
  the word is **Portal**, not Autopilot.
- **Autopilot** — the *automation layer* on top of Portal. The nine-stage engine, Inquiry
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
- Never call Autopilot the platform. Portal is the platform; Autopilot is automation on top.
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
- `/pricing` (two ladders, one switch) · `/security`
- **The blog is held back until v2** (founder, Sep 2026). The pages live at
  `src/pages/_blog/` — the underscore keeps Astro from building them — and the
  seven articles stay in `src/content/blog`. Resources now opens on
  Destinations. See `src/pages/_blog/README.md` for what to put back.
- `/destinations` and the 137 country pages are unchanged and still noindex
- `/how` is gone; its nine stages live on `/autopilot`. The route 301s there.

Content lives in `src/lib/content/{products,solutions,customers,pricing}.ts`, not in
the page files. Pages are thin; edit the content modules.

The bar (Sep 2026, founder's grouping) is Tools · Automations · Solutions ·
Pricing · Resources, with the wordmark on the left and Log in / Get started
on the right, both pointing at portal.hyperporter.com. Tools, Automations,
Solutions and Resources open a full-width panel in the harvey.ai format:
described items in labelled columns and a feature card on the right. It is
all data in `src/lib/content/nav.ts`. Every Tools item has a page of its
own at `/tools/[slug]` and every Automation at `/automations/[slug]` (Sep
2026, founder's ask — the anchors on the layer pages read as "the same page
again" from the menu). Both collections are `src/lib/content/detail.ts`,
rendered through `components/DetailPage.astro` in the founder's sequence
(after harvey.ai): hero, text only, on the photograph; the overview band
under it on the same photograph, with the page's own screen as the
card, and the screen works — `lib/live.ts` makes its buttons, rows,
cards, fields and chat boxes respond (`DemoCard.astro`); three points with icons (`Points.astro`,
icons guessed from the point's title in `lib/pointIcons.ts`); "How it
works" as the list-and-snippet accordion (`lib/accordion.ts`, CSS in
global.css, shared with the homepage); the step a person always takes
(automations, amber); the closing statement band (`CtaBand.astro`).
`/tools` and `/automations` are the indexes.

The solutions pages (`/customers/[slug]`) follow the reference's solutions
sequence: a light hero with the headline left, the lede and button right
and one wide photograph under both; three points with icons; "How X use
Hyperporter" as the accordion on a dark ground with the screen beside;
the closing band. The pricing ladder they used to end on is /pricing. The layer pages `/portal`, `/autopilot`, `/intelligence`,
`/horizon` stay as they were; Overview in the Automations menu is
`/autopilot`.

## Known gaps — these need doing

1. **No URLs.** All 137 destinations, 7 regions, and 7 blog posts are unindexable. This is why
   the migration matters more than any feature.
2. **No SEO.** No per-page title, meta description, canonical, OG tags, sitemap, robots.txt,
   structured data, or image alt text anywhere.
3. **Thin content risk.** 137 destination pages currently share near-identical copy apart from
   the country name. Google penalises this. Each page needs genuinely unique material before
   the SEO play is worth anything.
4. **About page team section** — the three `Name pending` placeholder bios are
   no longer rendered. `src/pages/about.astro` holds a `TEAM` array, empty; fill
   in the three real people and the section returns, heading and all. The page
   ends on the mission statement until then.
5. **Footer** Terms / Privacy / FAQ buttons have no handlers.
6. **Country count** — site says "130+ countries", the dataset holds 137, and a founder brief
   said "100+". Unresolved. Confirm the real number before publishing.
7. **Award badges** — "Hospitality B2B Travel Partner" and "UN Tourism Winner" have been
   REMOVED from all 137 destination pages pending confirmation. Restore only once verified.


## Design direction (current)

### What "v2" means — and that the site is not on it
Two design files, both the founder's, both kept in the repo (Sep 2026):
`public/preview/v2.html` — the dark serif design — and
`public/preview/v2-figma.html` — the Figma-style study. When the founder says
"v2", it is these two, not one of them. **They are reference files, not the
site.** The site is v1, the design described below, and that is what the live
build serves.

A v2 rebuild — the two designs carried across every page, then restyled on
Shopify's design system from awesome-design-md — was built and then reverted
at the founder's instruction (Sep 2026): "back to our main main site, that's
the v1". It is whole in git history at `ee24deb`, with its own `v2.css`,
`V2Hero.astro`, `lib/v2.js` and `DESIGN.md`, if it is ever wanted back. Do not
reintroduce any of it piecemeal.

### Closing bands — the before/after rule
Every closing band states the same comparison and nothing else (founder,
Sep 2026): **how the work was done traditionally, then how it is done here.**
No tier, no price, no "free", no "Start on Showcase" — the close sells the
feature, never the plan. `components/CtaBand.astro` takes `before` and
`after`; the before clause sits back in grey and the after clause carries the
white on its own line under it. Keep each clause under about 40 characters so
it holds one line on the band's 34ch measure. The copy is each page's own:
`close: { before, after }` on every entry in `lib/content/detail.ts` and
`lib/content/customers.ts`; the six index pages (`/tools`, `/automations`,
`/integrations`, `/solutions`, `/customers`, `/product`) carry theirs inline.
Every one of those pages ends on the band. The layer pages keep their "Up
next" bands, which are navigation to the next layer, not closes.


**Palette — cool graphite and an electric accent** (Sep 2026, founder's
choice). The warm paper and the teal are gone: ground `--void #F5F7F8`,
ink `--paper #0A0C0E`, body grey `--muted #5E666E`, label grey
`--dim #5F666F`. Amber `#9E5308` still means a human / manual state and
nothing else.

The accent is split, and the split is not optional:

- `--signal #0A63F0` is the FILL blue. White on it measures 5.16:1, so a
  button label clears the floor. The #0A6CFF first tried measured 4.49:1.
- `--signal-ink #0B57D0` is the TEXT blue. The fill blue on the light
  ground is 4.16:1 — under the floor — so every `color:var(--signal)` on
  the site was repointed to this. Putting the bright one back on small
  text reintroduces a measured failure.
- Inside `[data-chrome="dark"]` the greys and the accent invert
  (`--dim #9BA4AE`, `--muted #B9C0C8`, `--signal-ink #6FA8FF`), because the
  light-ground values measured 2.3-3.7:1 there. A mock-up inside a dark
  band is a LIGHT window on that ground, so it resets back — but a
  `.mk.dark` screen keeps mockup.css's own inverted set, which is why the
  reset is written `.mk:not(.dark)`.

**Liquid, not merely frosted** (Sep 2026, founder's ask). Two things beyond
the frost, and they are costed separately:

- The SPECULAR EDGE — light landing on the top-left corner of a raised
  sheet. One gradient, no filter, no layer, so it goes on every surface
  that carries the material, cards included.
- The EDGE LENS — a ring of extra blur just inside the border, masked out
  of the middle, which is what the eye reads as thickness. It is a second
  `backdrop-filter`, so it goes ONLY on surfaces that already pay for one:
  the bar, the menus, the drawer, the mock-up panels. Never the cards.

Both are pseudo-elements wired in `global.css` rather than classes in the
templates. Do not add the surfaces to a blanket `position:relative` list:
`.mega` is absolute, `.drawer` is fixed and `.mk-panel` is absolute, and
declaring `relative` over them tore the mega panel off its anchor.

Light base with teal as the accent. Reverted (Aug 2026) to the pre-Harvey
direction at commit `28d708a` at the founder's instruction — the harvey.ai /
starlink.com rebuild is preserved in git history at `d05cc73` if it is ever
wanted back.

- **Type (v2, Sep 2026)**: Instrument Serif for display, Archivo for body and
  UI, IBM Plex Mono for labels and figures, Newsreader for the occasional
  secondary serif. All four are Google-hosted, which **ends the Hyperlocal ROM
  licence problem** — that face is no longer requested anywhere. Display sizes
  carry `-.018em` tracking and 1.06 leading: a serif at 70px wants less
  tracking than the grotesque did, not more. Labels and eyebrows stay in
  capitals with wide tracking, and an eyebrow carries a small dot before it.
  Anything with digits that line up or tick over keeps
  `font-variant-numeric:tabular-nums`.
- **Accent**: `--signal` is moss `#2E7D6B` on light grounds, `--moss #5FBFA8`
  on dark ones. Amber `#8A5409` (`--amber-hi #D79A3E` on dark) is still
  reserved for human-touchpoint / manual states — never decorative.
- **Ground**: `--void #F4F5F1` light, `--black #0B0C0B` dark, in alternating
  bands. Buttons are pills (`--pill`); the primary one on a light ground is
  ink, not the accent.
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
  Hyperporter's own interface — Portal, Autopilot, Atlas and Vault, and the
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
- **Apple Liquid Glass, from Portal's own stylesheet** (Sep 2026, founder's
  instruction: "we used apple metal glass"). The materials are ported value
  for value out of the Portal app so the site and the product are made of
  the same thing rather than two interpretations of it — see the MATERIALS
  block at the top of `global.css`. An earlier Apple restyle was tried and
  rejected (`039fad9`, reverted at `1848a30`); this is not that one. That
  was a restyle of the whole site's look. This is a material layer under an
  unchanged design: Instrument Serif, Archivo, teal and amber all stay
  exactly as they were, because the HIG's own rule is that a house style
  beats Apple defaults. No SF Pro, no system blue.

  **The metal is the rim, not the blur.** `--lg-rim` is three inset
  shadows — a hairline, a bright top edge, a dark bottom edge — and that is
  what makes a panel read as a machined surface catching light rather than
  as frosted plastic. `--lg-blur` carries `saturate(180%)`: blur on its own
  desaturates what is behind it and the panel goes grey and dead.

  **Where the material goes**: everywhere the site has a surface — the bar,
  the mega panels, the drawer, the ticker's label, `.mk-panel`, and the
  card families (`.rel .tier .side .ccard .zcard .svc article .panel`,
  Sep 2026, founder's ask). Not on section grounds.

  **Where the *blur* goes is a separate question, and the answer is: only
  where there is something to refract.** The bar, the menus and the
  mock-up panels sit over photographs and live content, so they blur. The
  cards sit on `--wash`, a smooth gradient — and blurring a smooth
  gradient returns the same gradient. Measured on one card, blur on
  against blur off: at most 4/255 on any channel, 0.7% of pixels differing
  by more than 2. Invisible, and not free: best of three runs, same page,
  blur toggled, /tools 43→51fps, /pricing 39→48, /customers 39→56. So the
  cards carry the sheen and the rim and no `backdrop-filter`. Add one only
  after checking there is something behind it worth blurring.

  **The legibility comes from the scrim, not the opacity.** A menu opening
  over a 70px display headline leaves that headline readable through
  anything translucent enough to still look like glass. `.mega-scrim` dims
  and blurs the page instead, which is what lets the panel stay properly
  translucent. Measured off the composited pixels, not computed: the
  panel's 13.5px secondary text sits at 4.96–5.38:1.

  **`.mega-scrim` must stay outside `<header>`.** An ancestor with a
  `backdrop-filter` becomes the containing block for its `position:fixed`
  descendants — inside the glass header the scrim collapsed from the
  viewport to the 72px bar and silently stopped dimming anything. The flag
  is toggled on `<html>` so a selector can still reach it.

  Every glass surface ships all three fallbacks: `@supports not
  (backdrop-filter)`, `prefers-reduced-transparency`, and
  `prefers-contrast:more`, which flattens the wash and gives every surface
  a real edge. Reduce Transparency is a first-class accessibility setting —
  for some readers translucency makes text unreadable.

  `--wash` is the canvas under the light bands, lifted from Portal too. A
  glass panel over one flat tone refracts nothing and reads as a
  translucent white box; it needs variation behind it. It is
  `background-attachment:fixed`, because a 700px wash stretched down a
  14,000px page is a smear.

  **`--dim` is a label grey, not a body grey.** Set as body copy on a card
  it measures about 3.1:1, under the 4.5:1 floor. `--muted` measures 5.5:1
  in the same place. Eyebrows, column heads and captions keep `--dim`;
  anything read as a sentence takes `--muted`.

- **The screens read as current software, not as a 2005 data grid** (Sep
  2026, founder: "showcase a modern screenshot please, this is 2000"). The
  changes are all in `styles/mockup.css`, on the shared primitives, so all
  38 screens moved together: tabs are a segmented control on a tertiary
  fill rather than an underlined rail; table rows are separated by space
  and a faint inset rule, not a hairline under every row; column heads are
  sentence case with no tracking; statuses are tinted pills (the dot stays
  — colour alone never carries a state); buttons, panes, metrics and form
  fields sit on `--fill` with pill or soft-radius shapes instead of 1px
  boxes; the window itself takes `--lg-rim` and a 1.1em corner.

  The two homepage sides screens are a pair and must stay one size. They
  are not the same height on their own — the reseller's is a trip record
  with two panes and a log, the supplier's a single request list — and the
  40px difference read as one card being bigger. `.lg-side-shot` stretches
  both to the frame; keep the stage's inset padding, or the window covers
  the photograph it is meant to float on.
- Removed with the earlier revert: `AppShot.astro` and `lib/counts.ts`, both
  recoverable from `d05cc73`.

### Font licence — resolved in the build, outstanding in git history
Hyperlocal ROM was supplied under a **desktop** licence, whose terms forbid
"storing on publicly available servers".

This note used to say the problem was resolved. It was — in v2. **The revert
to v1 brought it straight back**, and it went unnoticed until the Sep 2026
audit: `global.css` still carried the `@font-face`, all three family tokens
still led with `'Hyperlocal ROM'`, and every build was copying the `.woff2`
into `dist/fonts/` and serving it. The file is deleted and the `@font-face`
is gone, so no build serves it any more.

That also fixed a second thing hiding behind it: `--display`, `--body` and
`--mono` all held the *same* stack, so the site had no display / body / mono
distinction at all — one face was doing all three jobs. They are now
Instrument Serif, Archivo and IBM Plex Mono, Google-hosted, which is the
type system this file has described all along.

**Still outstanding**: the `.woff2` remains in git history and the
repository is public, so deleting it from the working tree does not remove
it. Settle it with Dinamo, make the repository private, or rewrite the
history.

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
- A request for a section includes its heading and sub-line, unless told otherwise.
  Draft the copy; do not ship the section headless and wait to be asked.
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

**Deploying is never automatic** (founder, Sep 2026). A push to `main` builds
and checks the site and stops there. The live site changes only when the
founder says so and the Deploy workflow is run deliberately — Actions →
Deploy → Run workflow. The server picks the new build up within a minute of
that (`scripts/enable-auto-deploy.sh`). Do not run it unasked.

    npm run build && python3 scripts/build-preview.py preview-site.html

That bundles all 181 routes into one self-contained file — every route
browsable through its real links, at phone, tablet or full width. Publish it
as an artifact. Preview the whole site, not the one page you changed: several
of the faults in this site's history were on a page nobody thought to look at.
The generator drops `/how` (a redirect stub) and `/preview/*` (design studies),
and leaves `/photos/*` unresolved because that photography is still
unlicensed — those tiles are blank in the preview exactly as they are live.
