/**
 * The four product layers, from the founder's content file.
 *
 * This supersedes the two-product model the site carried before. The
 * platform is now **OS** — not Autopilot. Autopilot is only the automation
 * layer that sits on top of it, Intelligence is the AI layer above that, and
 * Horizon is still the supplier network, never software.
 *
 * `tier` is the tier a layer becomes available on, which is not always the
 * layer's own name: Horizon is on every tier including free.
 */

export interface Feature {
  n: string;
  name: string;
  body: string;
}

export interface Case {
  kind: string;
  title: string;
  body: string;
}

export interface NextUp {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export interface Product {
  slug: string;
  /** Order in the ladder, as shown on /product. */
  n: string;
  name: string;
  eyebrow: string;
  /** Short line for the ladder on /product. */
  summary: string;
  availability: string;
  title: string;
  lede: string;
  featuresTitle?: string;
  features: Feature[];
  casesTitle?: string;
  cases: Case[];
  next: NextUp;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'os',
    n: '01',
    name: 'OS',
    eyebrow: 'Product — OS',
    availability: 'Always included',
    summary:
      'The modern operating system and toolkit — CRM, quote builder, itinerary tool, a clean interface replacing spreadsheets and email threads. Every tier starts here.',
    title: 'The foundation everyone gets.',
    lede: 'CRM, quote builder, itinerary tool — a clean, modern interface replacing spreadsheets and email threads. Free, forever, on every tier.',
    features: [
      {
        n: '01',
        name: 'CRM',
        body: 'Every inquiry, quote, and confirmation tracked through the same stage engine, not scattered across inboxes.',
      },
      {
        n: '02',
        name: 'Magic links',
        body: "The core of how trips move — a single link per trip that's customer-facing on one side and supplier-facing on the other, always in sync, no manual duplication.",
      },
      {
        n: '03',
        name: 'Public inquiry form link',
        body: 'Shareable anywhere — LinkedIn, email signature, Instagram bio — every submission lands directly in your CRM.',
      },
      {
        n: '04',
        name: 'Proposal generator',
        body: 'A branded itinerary document, built from the same data already in your CRM.',
      },
    ],
    casesTitle: 'Two segments, the same foundation.',
    cases: [
      {
        kind: 'Case — Travel agency',
        title: 'Coordinating a trip without a shared inbox.',
        body: "An agent runs everything through the CRM — inquiry in, magic link out to both the traveler and the DMC, proposal generated straight from the same data. No spreadsheet, no copy-pasting between three apps. Once volume picks up, the manual back-and-forth is the bottleneck — that's what Autopilot automates. And if the agency doesn't have a supplier list yet, Horizon gives them one, free, on Showcase.",
      },
      {
        kind: 'Case — Supplier / DMC',
        title: 'Replying to requests without changing how you work.',
        body: 'A DMC gets a magic link, quotes directly through the same CRM, no new inbox to check. Free, on Showcase, whether or not Horizon has sent them any volume yet.',
      },
    ],
    next: {
      eyebrow: 'Up next',
      title: 'Ready to automate the back-and-forth?',
      desc: 'Autopilot layers stage-based automation on top of everything OS already does — same CRM, same magic links, less manual chasing.',
      cta: 'See Autopilot',
      href: '/autopilot',
    },
  },

  {
    slug: 'autopilot',
    n: '02',
    name: 'Autopilot',
    eyebrow: 'Product — Autopilot',
    availability: 'From Autopilot',
    summary:
      "Communication automation — inquiry through booking, automated based on what's actually being said. Two-sided workflows only, with human escalation built in.",
    title: 'Automation that still knows when to stop.',
    lede: 'Full nine-stage automation, from Inquiry through Post-Trip — with human escalation points built in by design, not bolted on.',
    /* No feature list: /autopilot renders all nine stages off STAGES in the
       band below its hero. This was a five-item retelling of the same
       thing, a screen further down the same page. */
    features: [],
    casesTitle: 'Same agency, three weeks later.',
    cases: [
      {
        kind: 'Case — Travel agency',
        title: 'Same agency, three weeks later.',
        body: "An agency running 20 trips a month on OS alone hits a ceiling — every reprice, every confirmation chase, every status update is a human doing it manually. Autopilot doesn't change what they offer travelers, it changes how much of it one person can run at once.",
      },
    ],
    next: {
      eyebrow: 'Up next',
      title: 'Want your own contracts and rates queryable too?',
      desc: 'Intelligence adds Atlas on top of Autopilot — an AI layer trained on your own data, not generic knowledge.',
      cta: 'See Intelligence',
      href: '/intelligence',
    },
  },

  {
    slug: 'intelligence',
    n: '03',
    name: 'Intelligence',
    eyebrow: 'Product — Intelligence',
    availability: 'From Intelligence',
    summary:
      'Your own contracts, rates, and history become queryable, quotable, and able to suggest full itineraries — an AI layer built specifically for travel.',
    title: 'An AI layer trained on your data. Not anyone else’s.',
    lede: 'Built specifically for travel — defensible because it knows your contracts, your rates, your history, not generic knowledge.',
    features: [
      {
        n: '01',
        name: 'Vault',
        body: 'Contracts and rates, securely held and queryable — the foundation everything else reads from.',
      },
      {
        n: '02',
        name: 'Memory',
        body: "Carries forward your quoting style, preferred suppliers, and traveler preferences — so Atlas isn't re-taught from scratch on every trip.",
      },
      {
        n: '03',
        name: 'AI chat over your own data',
        body: 'Ask questions directly against your own contracts and rates in Vault.',
      },
      {
        n: '04',
        name: 'AI-assisted quoting',
        body: 'Drafts a quote from your real contracted rates — not a generic estimate.',
      },
      {
        n: '05',
        name: 'AI itinerary suggestions',
        body: "Proposes day-by-day structure from your own suppliers and past itineraries, and Memory of what's worked before.",
      },
      {
        n: '06',
        name: 'Yours first',
        body: 'Your own Vault reads from your own data before anything else does — Atlas is trained on it, not on anyone else’s.',
      },
    ],
    casesTitle: 'Two segments, the same Vault.',
    cases: [
      {
        kind: 'Case — Travel agency',
        title: 'Quoting from your own negotiated rates, not a guess.',
        body: "An agency with years of DMC contracts stops re-reading PDFs for every quote — Atlas drafts from the actual contracted rate, remembers the agency's preferred suppliers, and proposes itineraries structured like the ones that already worked.",
      },
      {
        kind: 'Case — Supplier / DMC',
        title: 'AI-assisted quoting, from rates only you have.',
        body: "A DMC's own rate sheets and seasonal pricing become the source Atlas quotes from — not a generic estimate, and not visible to any other DMC on the network.",
      },
    ],
    next: {
      eyebrow: 'Up next',
      title: 'Need suppliers to quote against in the first place?',
      desc: 'Horizon is the vetted list of DMCs and suppliers Atlas and Autopilot both draw from.',
      cta: 'See Horizon',
      href: '/horizon',
    },
  },

  {
    slug: 'horizon',
    n: '04',
    name: 'Horizon',
    eyebrow: 'Product — Horizon, for agencies',
    availability: 'For Resellers, every tier',
    summary:
      'A vetted list of DMCs and suppliers across 130+ countries, built for agencies to search — fully actionable at every tier, including free: search, quote, and book, not a locked teaser.',
    title: 'A vetted list of DMCs and suppliers, ready to quote.',
    lede: '130+ countries of DMCs and suppliers, already vetted — search, quote, and book directly from your CRM. Built for agencies sourcing suppliers, not a directory they manage themselves.',
    features: [
      {
        n: '01',
        name: 'Search by destination',
        body: 'Filter vetted DMCs and suppliers by country and specialty before you ever send an inquiry.',
      },
      {
        n: '02',
        name: 'Quote directly',
        body: 'Send an RFP through the same thread your CRM already tracks — no separate app.',
      },
      {
        n: '03',
        name: 'Every tier, including free',
        body: 'Full network access on Showcase — not a locked preview that upgrades unlock.',
      },
    ],
    cases: [],
    next: {
      eyebrow: 'Up next',
      title: 'All of this, directly inside OS — even on Showcase.',
      desc: 'No separate app, no upgrade required to search the network. See what each tier actually costs.',
      cta: 'See pricing',
      href: '/pricing',
    },
  },
];

export const byProduct = (slug: string): Product => {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`No product "${slug}"`);
  return p;
};

/** Supplier types Horizon covers. */
export const HORIZON_SUPPLIER_TYPES = [
  'DMC',
  'Transportation',
  'Hotels',
  'Activity providers',
];

/**
 * Autopilot's pilot targets. Labelled as targets everywhere they appear —
 * the founder's copy is explicit that these are not results, and that
 * wording must survive any edit.
 */
export const AUTOPILOT_TARGETS: { metric: string; before: string; after: string }[] = [
  { metric: 'Trip capacity per agent', before: 'Baseline', after: '2–3x' },
  { metric: 'DMC quote turnaround', before: 'Multi-day chains', after: '<24h' },
  { metric: 'Inquiry-to-booking conversion', before: 'Baseline', after: '+15–20%' },
  { metric: 'Manual errors, reprice & confirmation', before: 'Human-paced', after: '<5%' },
  { metric: 'Headcount for same volume', before: 'Baseline', after: '–30%' },
];

/**
 * The homepage's system overview — the whole thing in four moves, above the
 * nine stages rather than instead of them. Horizon supplies operators; it is
 * not software and nobody logs into it, so the move is what the agency gets
 * from it, not a product they open.
 */
export const MOVES: { name: string; body: string }[] = [
  { name: 'Inquiry received', body: 'Any channel — form, email or WhatsApp — arrives as one structured brief.' },
  { name: 'Autopilot runs it', body: 'Planning, quoting, booking and live support, with escalation points built in.' },
  { name: 'Horizon fills gaps', body: 'A vetted operator wherever the trip is going, on any tier including free.' },
  { name: 'Trip goes live', body: 'Relay handled end to end; only the exceptions reach a person.' },
];
