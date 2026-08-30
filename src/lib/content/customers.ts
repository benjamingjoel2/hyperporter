/**
 * Customers — the two sides of a booking, and the segments inside each.
 *
 * Resellers (agencies, advisors, creators) source suppliers and run the full
 * ladder. Suppliers (DMCs, tour operators) are the ones being sourced and
 * skip straight from Showcase to Intelligence. The `side` field drives both
 * the nav grouping and which pricing ladder a segment page shows.
 */

export type Side = 'reseller' | 'supplier';

export interface SegmentFeature {
  n: string;
  name: string;
  body: string;
}

export interface Reason {
  title: string;
  body: string;
}

export interface SegmentTier {
  name: string;
  kicker: string;
  amount: string;
  note: string;
  line: string;
}

export interface Segment {
  slug: string;
  side: Side;
  /** Nav and index label. */
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  reasons: Reason[];
  features: SegmentFeature[];
  pricingTitle: string;
  tiers: SegmentTier[];
}

/**
 * The two overview pages. They sit above the segments and are what the
 * homepage points at, so they carry their own copy rather than being
 * generated from the segment list.
 */
export interface Overview {
  slug: string;
  side: Side;
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  sectionEyebrow: string;
  sectionTitle: string;
  /** Only Supplier OS carries this — the honest "why now" framing. */
  note?: string;
  features: SegmentFeature[];
  pricingHref: string;
  pricingLabel: string;
}

export const OVERVIEWS: Overview[] = [
  {
    slug: 'agent-os',
    side: 'reseller',
    name: 'Agent OS',
    eyebrow: 'Solutions — For Resellers',
    title: 'Built for the agency stuck between two inboxes.',
    lede: 'Travel agencies, independent advisors, content creators — coordinate your traveler and your supplier in one thread, not three apps.',
    sectionEyebrow: 'What changes',
    sectionTitle: 'Everything you already do, minus the manual chasing.',
    features: [
      {
        n: '01',
        name: 'One inquiry form, everywhere',
        body: 'LinkedIn, email signature, Instagram bio — every submission lands directly in your CRM.',
      },
      {
        n: '02',
        name: 'Source across Horizon',
        body: 'Search, quote, and book across the full network of DMCs and suppliers — not a locked directory.',
      },
      {
        n: '03',
        name: 'Automate the back-and-forth',
        body: 'From Autopilot up — reprice loops, confirmation chasing, and status updates run themselves.',
      },
      {
        n: '04',
        name: 'Your own branded presence',
        body: 'Logo, domain, and a proposal generator that looks like your agency, not a template.',
      },
    ],
    pricingHref: '/pricing',
    pricingLabel: 'See Reseller pricing',
  },

  {
    slug: 'supplier-os',
    side: 'supplier',
    name: 'Supplier OS',
    eyebrow: 'Solutions — For Suppliers',
    title: 'A free workflow tool, built for how DMCs already reply.',
    lede: 'Organize inbound requests and quote from one place — Showcase is free, useful on day one, not contingent on network size. Intelligence is there when you want AI-assisted quoting from your own rates.',
    sectionEyebrow: 'Why Showcase, why now',
    sectionTitle: 'Useful today, not just once the network is bigger.',
    note: 'The value isn’t “get discovered” — that takes volume we don’t have yet. It’s a free CRM for the requests you’re already getting, and a real upgrade path to Intelligence when you want AI-assisted quoting from your own rates.',
    features: [
      {
        n: '01',
        name: 'Free CRM & quoting, on Showcase',
        body: 'Organize inbound requests and quote directly through your own workflow — no cost, ever.',
      },
      {
        n: '02',
        name: 'Integrated with WhatsApp & email, from Intelligence',
        body: 'Reply from the same inbox and WhatsApp thread you already use — no new app to check, requests parsed straight into the CRM.',
      },
      {
        n: '03',
        name: 'Intelligence, when you’re ready',
        body: 'Atlas-assisted quoting from your own contracted rates — a custom build, on your terms.',
      },
      {
        n: '04',
        name: 'Listed on Horizon',
        body: 'A bonus, not the pitch — discoverable by agencies as the network grows, still no fee to appear.',
      },
    ],
    pricingHref: '/pricing',
    pricingLabel: 'See Supplier pricing',
  },
];

export const SEGMENTS: Segment[] = [
  {
    slug: 'travel-agencies',
    side: 'reseller',
    name: 'Travel agencies',
    eyebrow: 'Customers — Resellers — Travel agencies',
    title: 'Multi-agent teams, one shared CRM and brand.',
    lede: 'Every agent on the same stage engine, the same Horizon list, the same client-facing brand — not a spreadsheet each agent manages alone.',
    reasons: [
      {
        title: 'One CRM, every agent',
        body: 'Every inquiry, every agent, tracked through the same stage engine — nothing lives in a personal inbox.',
      },
      {
        title: 'One brand, every touchpoint',
        body: 'Logo, domain, and every client-facing link consistent, no matter which agent sent it.',
      },
      {
        title: 'Shared Horizon access',
        body: 'The whole team sources from the same vetted supplier list — no agent working off an outdated contact sheet.',
      },
    ],
    features: [
      { n: '01', name: 'CRM access', body: 'Every agent, every trip, one stage engine.' },
      {
        n: '02',
        name: 'Logo & branding toggle',
        body: "One brand identity across the whole team's client-facing links.",
      },
      {
        n: '03',
        name: 'Horizon network access',
        body: 'Shared sourcing across 130+ countries of DMCs and suppliers.',
      },
      {
        n: '04',
        name: 'Stage-based automation',
        body: 'Once volume grows past a few agents, Autopilot removes the manual chasing.',
      },
    ],
    pricingTitle: 'Pricing for travel agencies',
    tiers: [
      { name: 'Showcase', kicker: 'Get every agent set up', amount: '$0', note: '20 trips/mo', line: 'Good for testing with 1–2 agents' },
      { name: 'Autopilot', kicker: 'Where most agencies land', amount: '€49 /mo', note: 'Unlimited bookings', line: 'Automation scales with team size' },
      { name: 'Intelligence', kicker: 'For established agencies', amount: 'Custom', note: 'Tailored per business', line: 'Atlas trained on years of agency contracts' },
    ],
  },

  {
    slug: 'travel-agents',
    side: 'reseller',
    name: 'Travel agents',
    eyebrow: 'Customers — Resellers — Travel agents',
    title: 'Run your book of clients from one thread.',
    lede: 'Every client, every trip, tracked in one place — magic links instead of email chains, payment instructions instead of chasing.',
    reasons: [
      {
        title: 'One CRM for your book',
        body: 'Every client tracked through the same stage engine, not scattered across inboxes.',
      },
      {
        title: 'Magic links, not email chains',
        body: 'One link per trip, customer-facing and supplier-facing, always in sync.',
      },
      {
        title: 'Get paid without chasing',
        body: 'Structured payment instructions on every magic link, all tiers.',
      },
    ],
    features: [
      { n: '01', name: 'CRM access', body: 'Your whole client book, one stage engine.' },
      { n: '02', name: 'Magic link creation', body: 'Proposal and itinerary links, sent to travelers or suppliers.' },
      { n: '03', name: 'Payment instructions', body: 'Structured payment info on every link, all tiers.' },
      {
        n: '04',
        name: 'Public inquiry form link',
        body: 'Shareable anywhere — every submission lands directly in your CRM.',
      },
    ],
    pricingTitle: 'Pricing for travel agents',
    tiers: [
      { name: 'Showcase', kicker: 'Most agents start here', amount: '$0', note: '20 trips/mo', line: 'Enough for a growing solo book' },
      { name: 'Autopilot', kicker: 'When your book grows', amount: '€49 /mo', note: 'Unlimited bookings', line: 'Stop manually chasing every confirmation' },
      { name: 'Intelligence', kicker: 'For high-volume agents', amount: 'Custom', note: 'Tailored per business', line: 'AI-assisted quoting from your own rates' },
    ],
  },

  {
    slug: 'independent-advisors',
    side: 'reseller',
    name: 'Independent advisors',
    eyebrow: 'Customers — Resellers — Independent advisors',
    title: 'Look like a full agency, without the overhead.',
    lede: "Your own brand on every client touchpoint, a supplier network you didn't have to build yourself, and nothing that requires a team to run.",
    reasons: [
      {
        title: 'Your own brand, not a template',
        body: 'Logo, name, and eventually your own domain — never looks like a shared tool.',
      },
      {
        title: 'A supplier network without a team',
        body: 'Source across 130+ countries without ever having built those relationships yourself.',
      },
      {
        title: 'Solo-scale automation',
        body: 'Autopilot does the coordination work a small team would otherwise handle.',
      },
    ],
    features: [
      {
        n: '01',
        name: 'Logo & branding toggle',
        body: 'Your identity on every client-facing link, from day one.',
      },
      {
        n: '02',
        name: 'Proposal generator',
        body: 'A branded itinerary document that looks like your business, not a template.',
      },
      {
        n: '03',
        name: 'Horizon network access',
        body: 'Full sourcing access without needing your own supplier relationships.',
      },
      {
        n: '04',
        name: 'Remove “Powered by Hyperporter”',
        body: 'Usually the first upgrade — nothing undercuts “your own brand” like someone else’s badge.',
      },
    ],
    pricingTitle: 'Pricing for independent advisors',
    tiers: [
      { name: 'Showcase', kicker: 'Test the brand, free', amount: '$0', note: '20 trips/mo', line: 'Full branding toggle included' },
      { name: 'Autopilot', kicker: 'Drop the badge, go solo-scale', amount: '€49 /mo', note: 'Unlimited bookings', line: 'Remove “Powered by Hyperporter”' },
      { name: 'Intelligence', kicker: 'Full white-label', amount: 'Custom', note: 'Tailored per business', line: 'Custom domain, fully your own' },
    ],
  },

  {
    slug: 'creators',
    side: 'reseller',
    name: 'Creators',
    eyebrow: 'Customers — Resellers — Creators',
    title: 'Turn your audience into bookings.',
    lede: 'One link in your bio instead of a flooded DM inbox — every submission becomes a real, trackable trip inquiry.',
    reasons: [
      {
        title: 'One link, not a DM inbox',
        body: 'Drop it in your bio, your caption, your link-in-bio page — every submission lands in a real CRM.',
      },
      { title: 'Looks like your brand', body: 'Your logo and name on every proposal your followers see.' },
      {
        title: 'Free, with real room to grow',
        body: 'Most creators never need to leave Showcase — 20 trips/mo goes a long way.',
      },
    ],
    features: [
      {
        n: '01',
        name: 'Public inquiry form link',
        body: 'Shareable anywhere — Instagram bio, TikTok, a community post.',
      },
      { n: '02', name: 'Logo & branding toggle', body: 'Your name on every proposal, from the free tier.' },
      { n: '03', name: 'CRM access', body: 'Every inquiry tracked, nothing lost in your DMs.' },
    ],
    pricingTitle: 'Pricing for creators',
    tiers: [
      { name: 'Showcase', kicker: 'Where almost every creator stays', amount: '$0', note: '20 trips/mo, forever', line: 'No card, no upgrade pressure' },
      { name: 'Autopilot', kicker: 'If volume ever outgrows Showcase', amount: '€49 /mo', note: 'Unlimited bookings', line: 'Automation for real volume' },
      { name: 'Intelligence', kicker: 'Rarely needed at creator scale', amount: 'Custom', note: 'Tailored per business', line: 'Full white-label, if you go full agency' },
    ],
  },

  {
    slug: 'dmcs',
    side: 'supplier',
    name: 'DMCs',
    eyebrow: 'Customers — Suppliers — DMCs',
    title: 'Reply your way, get discovered as the network grows.',
    lede: "A free CRM for the requests you're already getting — not a pitch about discovery, since that takes volume we don't have yet.",
    reasons: [
      {
        title: 'Free CRM, no cost ever',
        body: 'Organize inbound requests and quote directly through your own workflow.',
      },
      {
        title: 'Listed on Horizon',
        body: 'A bonus, not the pitch — discoverable by agencies as the network grows, at no cost to appear.',
      },
      {
        title: 'Intelligence, when ready',
        body: 'Atlas-assisted quoting from your own contracted rates, on your terms.',
      },
    ],
    features: [
      { n: '01', name: 'CRM access', body: 'Organize every inbound request in one place, free.' },
      { n: '02', name: 'Listed on Horizon', body: 'Discoverable by every agency searching the network.' },
      {
        n: '03',
        name: 'WhatsApp & email integration',
        body: 'From Intelligence — reply from the inbox you already use.',
      },
      {
        n: '04',
        name: 'AI-assisted quoting',
        body: 'From Intelligence — drafts from your real contracted rates.',
      },
    ],
    pricingTitle: 'Pricing for DMCs',
    tiers: [
      { name: 'Showcase', kicker: 'Free, forever, no upgrade pressure', amount: '$0', note: 'Reply to requests as usual', line: 'CRM, quoting, listed on Horizon' },
      { name: 'Intelligence', kicker: 'When you want AI-assisted quoting', amount: 'Custom', note: 'Tailored to your operation', line: 'Atlas trained on your own rates' },
    ],
  },

  {
    slug: 'tour-operators',
    side: 'supplier',
    name: 'Tour operators',
    eyebrow: 'Customers — Suppliers — Tour operators',
    title: 'Build and quote packages from your own rates.',
    lede: 'The same free CRM as any supplier, with the itinerary tooling built for packaged, multi-day trips.',
    reasons: [
      {
        title: 'Free CRM, no cost ever',
        body: 'Organize inbound requests and quote directly through your own workflow.',
      },
      {
        title: 'Built for packaged trips',
        body: 'The itinerary/proposal generator handles multi-day packages, not just single bookings.',
      },
      {
        title: 'Listed on Horizon',
        body: 'Discoverable by agencies sourcing packaged tours, at no cost.',
      },
    ],
    features: [
      { n: '01', name: 'CRM access', body: 'Every request and quote, tracked in one place.' },
      {
        n: '02',
        name: 'Itinerary / proposal generator',
        body: 'Build a branded, multi-day package document.',
      },
      { n: '03', name: 'Listed on Horizon', body: 'Discoverable by agencies, at no cost to appear.' },
      {
        n: '04',
        name: 'AI-assisted quoting',
        body: 'From Intelligence — draft packages from your own real rates.',
      },
    ],
    pricingTitle: 'Pricing for tour operators',
    tiers: [
      { name: 'Showcase', kicker: 'Free, forever, no upgrade pressure', amount: '$0', note: 'Build and quote packages as usual', line: 'CRM, itinerary generator, listed on Horizon' },
      { name: 'Intelligence', kicker: 'When you want AI-assisted quoting', amount: 'Custom', note: 'Tailored to your operation', line: 'Atlas trained on your own package rates' },
    ],
  },
];

export const bySegment = (slug: string): Segment => {
  const s = SEGMENTS.find((x) => x.slug === slug);
  if (!s) throw new Error(`No customer segment "${slug}"`);
  return s;
};

export const byOverview = (slug: string): Overview | undefined =>
  OVERVIEWS.find((x) => x.slug === slug);

export const SIDE_LABEL: Record<Side, string> = {
  reseller: 'For Resellers',
  supplier: 'For Suppliers',
};

export const SIDE_SUB: Record<Side, string> = {
  reseller: 'Travel agencies & advisors',
  supplier: 'DMCs & tour operators',
};
