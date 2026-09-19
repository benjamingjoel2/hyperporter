---
version: alpha
name: Hyperporter-v2
description: "A warm off-white travel-operations canvas (#F4F5F1) banded against near-black (#0B0C0B), with Instrument Serif set large and tight for display and Archivo carrying every piece of UI. Moss green is the only chromatic accent — #2E7D6B on light ground, #5FBFA8 on dark — and amber (#8A5409 / #D79A3E) is never decorative: it marks a step a person has to take. Page rhythm is alternating full-bleed bands, each opening on a monospace eyebrow with a dot, then a two-tone serif heading whose second line sits back at 40% opacity. Product is shown as invented interface drawn in markup — one frosted panel at legible size on a coloured or photographic ground — never a whole application shrunk into a tile."

colors:
  primary: "#2E7D6B"
  primary-hover: "#3A9480"
  primary-dark-ground: "#5FBFA8"
  on-primary: "#ffffff"
  manual: "#8A5409"
  manual-dark-ground: "#D79A3E"
  canvas: "#F4F5F1"
  surface-1: "#EDEFE9"
  surface-2: "#E8EAE4"
  surface-raised: "#FBFCF8"
  canvas-dark: "#0B0C0B"
  surface-dark-1: "#121413"
  surface-dark-2: "#1B1E1C"
  ink: "#141715"
  ink-muted: "#4A544E"
  ink-subtle: "#7C857F"
  ink-on-dark: "#EDEFE9"
  ink-on-dark-muted: "#A3ADA7"
  ink-on-dark-subtle: "#6E7873"
  hairline: "#E1E5DB"
  hairline-strong: "#D3D8CE"
  hairline-on-dark: "rgba(237,239,233,.13)"

typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: clamp(34px, 5.1vw, 66px)
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: -0.018em
  display-lg:
    fontFamily: Instrument Serif
    fontSize: clamp(27px, 3.8vw, 48px)
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: -0.018em
  display-sm:
    fontFamily: Instrument Serif
    fontSize: clamp(22px, 2.4vw, 30px)
    fontWeight: 400
    letterSpacing: -0.02em
  figure:
    fontFamily: Instrument Serif
    fontSize: clamp(40px, 5.6vw, 70px)
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.04em
  lede:
    fontFamily: Archivo
    fontSize: 15.5px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: Archivo
    fontSize: 14.5px
    fontWeight: 400
    lineHeight: 1.62
  ui:
    fontFamily: Archivo
    fontSize: 14.5px
    fontWeight: 500
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 10.5px
    fontWeight: 400
    letterSpacing: 0.14em
    textTransform: uppercase
  quote:
    fontFamily: Newsreader
    fontSize: clamp(18px, 2vw, 26px)
    fontWeight: 400
    lineHeight: 1.42
    letterSpacing: -0.015em

spacing:
  band: clamp(58px, 7.4vw, 112px)
  band-tight: clamp(34px, 4vw, 60px)
  band-adjacent: clamp(30px, 3.4vw, 52px)
  gutter: clamp(20px, 4vw, 64px)
  measure: 1640px
  card: clamp(22px, 2.6vw, 32px)
  grid-gap: clamp(20px, 2.6vw, 34px)

rounded:
  pill: 999px
  card: 10px
  panel: 8px
  frame: 6px
  control: 8px

motion:
  ease: cubic-bezier(.2,.8,.2,1)
  ease-out: cubic-bezier(.16,1,.3,1)
  reveal: 850ms
  ui: 220ms
---

## Overview

Hyperporter is travel-operations infrastructure. The canvas is warm off-white
`{colors.canvas}` (#F4F5F1) — not white, and the greys are warm with it, because a
neutral grey secondary on this ground reads as dirty. The page is built from
alternating full-bleed **bands**: light on `{colors.canvas}`, dark on
`{colors.canvas-dark}` (#0B0C0B). A band is the unit of the page; there is no
half-band and no floating section.

Display type is **Instrument Serif** set large with negative tracking
(-0.018em) and 1.06 leading — a serif at 66px wants less tracking than a
grotesque, not more. Every display heading is **two-tone**: the statement on
one line, the part that qualifies it on the next at 40% opacity. The break is
taken where the sentence already breaks (a second sentence first, then a
comma); a heading with neither stays on one line.

**Archivo** carries body copy and every control. **IBM Plex Mono** carries
eyebrows, labels and any figure that lines up or ticks over
(`font-variant-numeric: tabular-nums`). **Newsreader** is the occasional
secondary serif — pull quotes and the operating strip.

The single chromatic accent is **moss** — `{colors.primary}` (#2E7D6B) on light
ground, `{colors.primary-dark-ground}` (#5FBFA8) on dark, because the darker
green disappears against near-black. **Amber** (`{colors.manual}` /
`{colors.manual-dark-ground}`) is not a second accent: it is the mark for a
step a person has to take, and it appears nowhere else.

**Key Characteristics:**
- Alternating light/dark bands carry the whole page rhythm. No shadows do the work of a band.
- Two-tone serif display headings; the second tone sits back at 40%.
- Every band opens on a monospace eyebrow preceded by a 5px dot.
- One accent (moss), used structurally. One state colour (amber), used only for human/manual.
- Product is drawn interface, never a screenshot and never a diagram: one frosted panel, one idea, at legible size.
- Buttons are pills. The primary button on a light ground is ink, not the accent.
- Content and the navigation bar share one measure (1640px) and one gutter, so the wordmark and the first headline start on the same pixel.

## Colors

### Brand & Accent
- **Moss** (`{colors.primary}`): the structural accent on light ground — links, focus rings, the active state of a control. Never decorative.
- **Moss Hover** (`{colors.primary-hover}`): hovered accent.
- **Moss on dark** (`{colors.primary-dark-ground}`): the same role on `{colors.canvas-dark}`. #2E7D6B is unreadable there; this is not a second brand colour.

### State
- **Amber** (`{colors.manual}` light / `{colors.manual-dark-ground}` dark): a step that needs a person — a payment to mark, a document to chase, an escalation. It is the site's one promise made visible: automation stops where judgement starts. Using amber for emphasis, for a category, or for a third accent breaks the system.

### Surface
- **Canvas** (`{colors.canvas}`): the default page ground.
- **Surface 1** (`{colors.surface-1}`): cards on the light band.
- **Surface 2** (`{colors.surface-2}`): a card inside a card; the featured tile.
- **Raised** (`{colors.surface-raised}`): the navigation bar and anything that floats over the canvas.
- **Canvas Dark** (`{colors.canvas-dark}`): the dark band, the closing band, the footer.
- **Surface Dark 1 / 2** (`{colors.surface-dark-1}`, `{colors.surface-dark-2}`): cards and panels on a dark band.

### Text
- **Ink** (`{colors.ink}`): headings and body on light ground.
- **Ink Muted** (`{colors.ink-muted}`): secondary copy, descriptions.
- **Ink Subtle** (`{colors.ink-subtle}`): eyebrows, labels, captions.
- **Ink on dark** (`{colors.ink-on-dark}`, `-muted`, `-subtle`): the same three steps on a dark band.

### Lines
- **Hairline** (`{colors.hairline}`) and **Hairline Strong** (`{colors.hairline-strong}`) on light; **Hairline on dark** (`{colors.hairline-on-dark}`) on dark. Rules separate; they never decorate.

> Token naming: the design's own palette is under `--sheet`, `--type`, `--disp-f`
> in the stylesheet, deliberately avoiding `--paper` and `--ink`, which the site's
> older components use for the opposite roles. Do not reintroduce a name that
> means one thing in one file and its opposite in another.

## Typography

### Font Family
All four faces are Google-hosted.
- **Instrument Serif** — display only. Weight 400; there is no bold.
- **Archivo** — body, UI, buttons. 400 / 500 / 600.
- **IBM Plex Mono** — eyebrows, labels, figures, anything tabular.
- **Newsreader** — pull quotes, the operating strip. Light weights (200–400).

### Hierarchy
| Role | Token | Notes |
|---|---|---|
| Page headline | `{typography.display-xl}` | Two-tone, one per page |
| Band heading | `{typography.display-lg}` | Two-tone |
| Card heading | `{typography.display-sm}` | Single tone |
| Figure | `{typography.figure}` | Tabular numerals, -0.04em |
| Lede | `{typography.lede}` | Max 44–52ch |
| Body | `{typography.body}` | Max 62ch |
| Eyebrow | `{typography.eyebrow}` | Uppercase, dot before |
| Quote | `{typography.quote}` | Newsreader |

### Principles
- Display headings get `text-wrap: balance`; a heading never leaves one word alone on the last line.
- Running copy is capped by a `ch` measure, never left to the width of the band.
- Eyebrows are uppercase with 0.14em tracking and carry a 5px dot at 60% opacity before the text.
- Anything with digits that line up or tick over takes `font-variant-numeric: tabular-nums`.

## Layout

### Spacing System
- A band is `{spacing.band}` top and bottom.
- Two bands of the **same** ground meeting take `{spacing.band-adjacent}` each and a hairline between them — full band padding on both sides adds up to 224px of nothing.
- A band carrying one short statement takes `{spacing.band-tight}`.
- The gutter is `{spacing.gutter}`, applied once, on the wrapper.

### Grid & Container
- One measure: `{spacing.measure}` with the gutter either side. **The navigation bar sits on the same measure**, so the wordmark, the headline and the first card all start on the same pixel. A wider bar measure pushes the wordmark inside the page and nothing lines up with anything.
- Cards in a row share a top edge and a height. Text that can outgrow its track wraps; it does not get clipped.
- A section's first heading starts at the gutter. Copy inset from the gutter needs a container that justifies it — a card's padding is a reason, a grid column is a reason, "it looked better" is not.

### Whitespace Philosophy
Generous, but earned: 139–392px between bands, measured off the design this
system was drawn from. Dead space beside a column is a layout error, not
breathing room — pair a short column with something, or let it take the width.

## Elevation & Depth

Hierarchy comes from **ground**, not shadow. A card is a step of surface, not a
lifted box. Shadow is reserved for something genuinely floating over a
photograph: the mock-up panel and the phone.

- Panels over a photograph: `0 44px 90px rgba(0,0,0,.6)`.
- Frosted product panel: `rgba(255,255,255,.82)` with `backdrop-filter: blur(20px) saturate(1.4)`, an inset hairline, and a soft drop.
- Everything else: a 1px hairline and a change of ground.

## Shapes

### Border Radius Scale
| Token | Value | Used for |
|---|---|---|
| `{rounded.pill}` | 999px | Every button, every chip |
| `{rounded.card}` | 10px | Cards on a band |
| `{rounded.panel}` | 8px | Panels, slabs, inputs |
| `{rounded.frame}` | 6px | The mock-up frame |

Never mix a pill and a square corner in the same control group.

## Components

### Buttons
One geometry across the whole site: 12px/24px padding, 14.5px Archivo 500,
pill radius, ~46px tall. A filled and an outline variant on each ground.
- **On dark**: filled is `{colors.ink-on-dark}` ground with `{colors.canvas-dark}` text; outline is a hairline with light text.
- **On light**: filled is **ink**, not the accent; outline is a hairline with ink text.
- Hover lifts 1px and returns on `:active`. No colour change on the outline variant beyond the border.

### Bands
`eyebrow → two-tone heading → lede → optional button`, left-aligned, or the
same centred for a dark band that introduces something. A band declares its
ground with one class and sets `data-chrome="dark"` when dark, so the
navigation bar inverts over it.

### Cards
A row of cards of one kind: same padding, same radius, same ground, one top
edge. The recurring element (an eyebrow, an icon, a figure) sits in the same
place on each. Card copy is capped at ~42ch.

### Rows
For a list where one column is what the reader scans — a feature and the tier
it lands on — use a row with a hairline under it, not a card. The scanned
column holds one right-hand edge all the way down.

### Product mock-ups
Invented interface drawn in markup. One frosted panel with a single idea in
it, floating at legible size on a coloured or photographic ground, sometimes
a faded sheet behind for depth, and a small chip in the corner naming the
layer. Everything inside is measured in `em` off a font-size that is a
fraction of the frame width, so a screen scales like a photograph of itself.
**Never a whole application shrunk into a tile — that reads as a diagram.**

### Pinned section
A section may pin for as many screens as it has panels, swapping one panel
per screen of scroll, with a progress rail across the top of the band. Below
1000px and under reduced motion it unpins and the panels stack.

## Motion

- One curve, `{motion.ease}`, for everything that moves.
- Reveal on scroll: `{motion.reveal}`, opacity and a 22px rise. Display headings reveal by line, masked.
- UI transitions: `{motion.ui}`.
- The dropdown drops from under the bar and its rows arrive a beat apart; it plays a closing animation rather than vanishing.
- Between pages: a native cross-document view transition. No client-side router.
- Every rule above is off under `prefers-reduced-motion: reduce`. An animation that never starts never ends — any code that waits on `animationend` needs a timer behind it.

## Do's and Don'ts

### Do
- Alternate the ground band by band, and put a hairline where two of the same ground meet.
- Break a display heading where the sentence already breaks.
- Use amber, and only amber, for a step a person takes.
- Cap every run of copy with a `ch` measure.
- Keep the bar and the content on one measure.
- Give a screen the room to be read.

### Don't
- Don't use amber decoratively, for a category, or as a second accent.
- Don't use moss for anything ornamental.
- Don't show a supplier logged into Horizon — Horizon is a network agencies search, not software a supplier signs into.
- Don't show Atlas answering from anything but the account's own Vault.
- Don't present SOC 2 or GDPR as held. They are targeted post-pilot.
- Don't shrink a whole application into a tile.
- Don't add a third typeface, a gradient behind text, or a shadow where a hairline would do.
- Don't let a column sit beside dead space.

## Responsive Behavior

### Breakpoints
- `≤1000px` — the pinned section unpins; two-column panels stack; side rails become a horizontal scroller.
- `≤900px` — three-up grids go to one column.
- `≤700px` — the nav collapses to the drawer; mock-up frames square up from 4:3 to 1:1, because a 4:3 box 340px wide leaves a screen nothing to sit in.

### Touch Targets
Minimum 44px. Buttons are already 46.

### Collapsing Strategy
Bands never become narrower; their padding shrinks with the clamp. Grids go to
one column rather than shrinking cards. A dense table inside a mock-up keeps
its columns and truncates with an ellipsis; it never scrolls the page sideways.

## Iteration Guide

When adding a section, answer these before writing markup:
1. Which ground is it on, and does that alternate from the band above?
2. What is the eyebrow?
3. Does the heading have a natural second tone, or is it one line?
4. Is this a row of cards, a list of rows, or one statement?
5. Does it need a screen, and is there one that is actually about this section?
6. Where does the copy end — which `ch`?

## Known Gaps

- Destination pages (137 of them) are not yet in this system and are `noindex`.
- Three About bios are `Name pending` placeholders, carried visibly.
- The public country figure says "130+"; the dataset holds 137. Unresolved.
- Award badges are removed pending verification.
- SOC 2 / GDPR are targeted, not certified — this must never be softened.
