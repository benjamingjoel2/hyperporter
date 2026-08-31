/**
 * Navigation, and the three mega-menu panels.
 *
 * Rebuilt on the harvey.ai arrangement: a panel is a full-bleed band flush
 * under the bar, holding columns of links and one featured cell on the
 * right. No tab rail, no numbers, no icons — a name in ink and a line of
 * description under it, with a lot of air.
 *
 * That arrangement is why Solutions is a top-level item again rather than a
 * tab inside Product: the reference gives every group its own trigger, and
 * without a rail there is nowhere for a second group to live.
 */

export interface MegaRow {
  label: string;
  desc: string;
  href: string;
}

export interface MegaColumn {
  /** Small caps heading. Only used where a panel holds two distinct groups. */
  heading?: string;
  rows: MegaRow[];
}

/**
 * The cell on the right of a panel. Illustration rather than a product
 * screenshot: the landmark artwork is ours and already carries the
 * destination pages, where a fabricated interface shot would not be.
 */
export interface MegaFeature {
  /** Country name, passed to the landmark generator. */
  art: string;
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  columns?: MegaColumn[];
  feature?: MegaFeature;
}

export const NAV: NavItem[] = [
  {
    id: 'product',
    label: 'Product',
    href: '/product',
    columns: [
      {
        rows: [
          { label: 'Overview', desc: 'All four products, one connected system.', href: '/product' },
          { label: 'OS', desc: 'The foundation everyone gets, free forever.', href: '/os' },
          { label: 'Autopilot', desc: 'Automation that still knows when to stop.', href: '/autopilot' },
        ],
      },
      {
        rows: [
          { label: 'Intelligence', desc: 'An AI layer trained on your own data, not anyone else’s.', href: '/intelligence' },
          { label: 'Horizon', desc: 'A vetted list of DMCs and suppliers, ready to quote.', href: '/horizon' },
          { label: 'Pricing', desc: 'Three tiers, strictly additive. Showcase is free.', href: '/pricing' },
        ],
      },
    ],
    feature: {
      art: 'Peru',
      eyebrow: 'Where the network reaches',
      title: '130+ countries on Horizon',
      desc: 'Vetted DMCs and suppliers you can search, quote and book from inside the CRM — on every tier, including free.',
      href: '/horizon',
    },
  },

  {
    id: 'solutions',
    label: 'Solutions',
    href: '/solutions',
    columns: [
      {
        rows: [
          { label: 'Overview', desc: 'Six categories, from inquiry to getting paid.', href: '/solutions' },
          { label: 'Inquiry', desc: 'How a new lead enters the CRM.', href: '/solutions/inquiry' },
          { label: 'Operations', desc: 'CRM and stage automation.', href: '/solutions/operations' },
          { label: 'Branding', desc: 'Your identity on everything customers see.', href: '/solutions/branding' },
        ],
      },
      {
        rows: [
          { label: 'Communication', desc: 'Talking to travelers and partners, everywhere.', href: '/solutions/communication' },
          { label: 'Payments', desc: 'Money in, money out, fully automated.', href: '/solutions/payments' },
          { label: 'Marketing', desc: 'Outbound reach beyond a single trip.', href: '/solutions/marketing' },
        ],
      },
    ],
    feature: {
      art: 'Japan',
      eyebrow: 'Every feature, with its tier',
      title: 'What you get, and where',
      desc: 'Each category lists exactly what is included and which tier it lands on — no feature hidden behind a sales call.',
      href: '/pricing',
    },
  },

  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    columns: [
      {
        heading: 'For Resellers',
        rows: [
          { label: 'Agent OS', desc: 'The full walkthrough, for agencies.', href: '/customers/agent-os' },
          { label: 'Travel agencies', desc: 'Multi-agent teams, one shared CRM and brand.', href: '/customers/travel-agencies' },
          { label: 'Travel agents', desc: 'Run your book of clients from one thread.', href: '/customers/travel-agents' },
          { label: 'Independent advisors', desc: 'Look like a full agency, without the overhead.', href: '/customers/independent-advisors' },
          { label: 'Creators', desc: 'Turn your audience into bookings.', href: '/customers/creators' },
        ],
      },
      {
        heading: 'For Suppliers',
        rows: [
          { label: 'Supplier OS', desc: 'The full walkthrough, for suppliers.', href: '/customers/supplier-os' },
          { label: 'DMCs', desc: 'Reply your way, get discovered as the network grows.', href: '/customers/dmcs' },
          { label: 'Tour operators', desc: 'Build and quote packages from your own rates.', href: '/customers/tour-operators' },
        ],
      },
    ],
    feature: {
      art: 'Kenya',
      eyebrow: 'Two sides, one product',
      title: 'Whichever side you are on',
      desc: 'Resellers run the full ladder and source suppliers. Suppliers are the ones being sourced, and go free on Showcase forever.',
      href: '/customers',
    },
  },

  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'destinations', label: 'Destinations', href: '/destinations' },
  { id: 'security', label: 'Security', href: '/security' },
  { id: 'blog', label: 'Resources', href: '/blog' },
];

/**
 * The drawer, for screens with no hover. Every link the panels hold,
 * grouped — flattened it would give three bare "Overview" rows with
 * nothing to tell them apart.
 */
export interface DrawerGroup {
  heading: string | null;
  links: { label: string; href: string }[];
}

export const DRAWER: DrawerGroup[] = [
  ...NAV.filter((n) => n.columns).map((n) => ({
    heading: n.label,
    links: n.columns!.flatMap((c) => c.rows.map((r) => ({ label: r.label, href: r.href }))),
  })),
  {
    heading: null,
    links: NAV.filter((n) => !n.columns).map((n) => ({ label: n.label, href: n.href })),
  },
];
