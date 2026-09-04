/**
 * Navigation, including the two mega-menu panels.
 *
 * Product and Customers each open a panel with a rail of tabs on the left
 * and the rows for the selected tab on the right — the arrangement in the
 * founder's content file.
 *
 * Solutions is a tab inside the Product panel rather than a top-level item,
 * as in that file. Having it in both places would give the same six pages
 * two entry points in the same bar.
 *
 * Rows are numbered rather than iconed: the site already numbers its
 * ladders, stages and feature lists, so a number reads as part of the same
 * system where a tinted icon tile would read as borrowed from elsewhere.
 */

export interface MegaRow {
  label: string;
  desc: string;
  href: string;
}

export interface MegaTab {
  id: string;
  label: string;
  /** Small caps heading above the rows. */
  heading: string;
  rows: MegaRow[];
  /** The strip closing the panel — one concrete next step, never filler. */
  footLabel: string;
  footCta: string;
  footHref: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  tabs?: MegaTab[];
}

export const NAV: NavItem[] = [
  {
    id: 'product',
    label: 'Product',
    href: '/product',
    tabs: [
      {
        id: 'products',
        label: 'Products',
        heading: 'The four capabilities',
        rows: [
          { label: 'Overview', desc: 'All four products, one connected system', href: '/product' },
          { label: 'Portal', desc: 'The foundation everyone gets, free forever', href: '/portal' },
          { label: 'Autopilot', desc: 'Automation that still knows when to stop', href: '/autopilot' },
          { label: 'Intelligence', desc: 'An AI layer trained on your own data', href: '/intelligence' },
          { label: 'Horizon', desc: 'A vetted list of DMCs and suppliers', href: '/horizon' },
        ],
        footLabel: 'Every tier is strictly additive',
        footCta: 'See what each one costs',
        footHref: '/pricing',
      },
      {
        id: 'solutions',
        label: 'Solutions',
        heading: 'Every feature, by category',
        rows: [
          { label: 'Overview', desc: 'Six categories, from inquiry to getting paid', href: '/solutions' },
          { label: 'Inquiry', desc: 'How a new lead enters the CRM', href: '/solutions/inquiry' },
          { label: 'Operations', desc: 'CRM and stage automation', href: '/solutions/operations' },
          { label: 'Branding', desc: 'Your identity on everything customers see', href: '/solutions/branding' },
          { label: 'Communication', desc: 'Talking to travelers and partners, everywhere', href: '/solutions/communication' },
          { label: 'Payments', desc: 'Money in, money out, fully automated', href: '/solutions/payments' },
          { label: 'Marketing', desc: 'Outbound reach beyond a single trip', href: '/solutions/marketing' },
        ],
        footLabel: 'Every feature, with the tier it lands on',
        footCta: 'Compare all six',
        footHref: '/solutions',
      },
    ],
  },

  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    tabs: [
      {
        id: 'reseller',
        label: 'Resellers',
        heading: 'For Resellers',
        rows: [
          { label: 'Agent Portal', desc: 'The full walkthrough, for agencies', href: '/customers/agent-portal' },
          { label: 'Travel agencies', desc: 'Multi-agent teams, one shared CRM and brand', href: '/customers/travel-agencies' },
          { label: 'Travel agents', desc: 'Run your book of clients from one thread', href: '/customers/travel-agents' },
          { label: 'Independent advisors', desc: 'Look like a full agency, without the overhead', href: '/customers/independent-advisors' },
          { label: 'Creators', desc: 'Turn your audience into bookings', href: '/customers/creators' },
        ],
        footLabel: 'Resellers run the full ladder',
        footCta: 'Showcase, Autopilot, Intelligence',
        footHref: '/pricing',
      },
      {
        id: 'supplier',
        label: 'Suppliers',
        heading: 'For Suppliers',
        rows: [
          { label: 'Supplier Portal', desc: 'The full walkthrough, for suppliers', href: '/customers/supplier-portal' },
          { label: 'DMCs', desc: 'Reply your way, get discovered as the network grows', href: '/customers/dmcs' },
          { label: 'Tour operators', desc: 'Build and quote packages from your own rates', href: '/customers/tour-operators' },
        ],
        footLabel: 'Suppliers skip straight to Intelligence',
        footCta: 'Free on Showcase, forever',
        footHref: '/pricing',
      },
    ],
  },

  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'destinations', label: 'Destinations', href: '/destinations' },
  { id: 'security', label: 'Security', href: '/security' },
  { id: 'blog', label: 'Resources', href: '/blog' },
];

/**
 * The drawer, for screens with no hover. It lists every link the panels
 * hold, grouped — flattened alone would give two bare "Overview" rows with
 * nothing to tell them apart.
 */
export interface DrawerGroup {
  heading: string | null;
  links: { label: string; href: string }[];
}

export const DRAWER: DrawerGroup[] = [
  ...NAV.filter((n) => n.tabs).flatMap((n) =>
    n.tabs!.map((t) => ({
      heading: `${n.label} — ${t.label}`,
      links: t.rows.map((r) => ({ label: r.label, href: r.href })),
    }))
  ),
  {
    heading: null,
    links: NAV.filter((n) => !n.tabs).map((n) => ({ label: n.label, href: n.href })),
  },
];
