/**
 * Navigation: five top-level items, three of which open a panel.
 *
 * The panels follow the reference's format — items with a one-line
 * description, in labelled columns, and a feature card on the right — and
 * the founder's own grouping (Sep 2026): Tools, Automations, Solutions,
 * Pricing, Resources.
 *
 * Every item links to a real place. Tools that are features of a product
 * page link to that feature's anchor (ProductPage gives each numbered
 * feature an id from its name); automations link to their stage on
 * /autopilot, whose pills carry `stage-N` ids and open on arrival.
 *
 * Terminology holds inside the menu as everywhere: Portal is the platform,
 * Horizon is a list and not software, payment marking is a human step even
 * where the request is automatic.
 */

export interface MegaItem {
  label: string;
  desc: string;
  href: string;
}

export interface MegaGroup {
  /** Small caps label above the group. Empty when a group continues the
      previous one into a second column, as the pipeline does. */
  heading: string;
  items: MegaItem[];
  /** Lay the group's rows across two of the panel's columns. */
  span?: 2;
}

export type FeatureCard = 'whatsapp' | 'escalation' | 'horizon' | 'reading';

export interface MegaFeature {
  card: FeatureCard;
  title: string;
  badge?: string;
  desc: string;
  href: string;
}

export interface NavItem {
  id: 'tools' | 'automations' | 'solutions' | 'pricing' | 'resources';
  label: string;
  href: string;
  groups?: MegaGroup[];
  feature?: MegaFeature;
}

export const NAV: NavItem[] = [
  {
    id: 'tools',
    label: 'Tools',
    href: '/product',
    groups: [
      {
        heading: '',
        span: 2,
        items: [
          { label: 'Portal', desc: 'The platform underneath everything — team, trips, and contacts.', href: '/portal' },
          { label: 'Atlas AI', desc: 'Builds trips, looks up trip details, answers questions on request.', href: '/intelligence' },
          { label: 'CRM workflow', desc: 'The client and supplier database, connected to trip staging.', href: '/portal#crm' },
          { label: 'Inquiry form', desc: 'Your public lead-capture link — every submission lands in the CRM.', href: '/solutions/inquiry' },
          { label: 'Quotation Board', desc: 'Organises supplier quotes side by side, and adds your margin.', href: '/autopilot#stage-2' },
          { label: 'Proposal Share', desc: 'Share itineraries and quotes as a link, a PDF, or a text message.', href: '/portal#proposal-generator' },
          { label: 'Client + Supplier Dashboard', desc: 'Each side gets their own view to manage the trip.', href: '/customers' },
          { label: '3-way inbox', desc: 'Client-side and supplier-side conversation, managed in one place.', href: '/solutions/communication' },
        ],
      },
      {
        heading: 'More tools',
        items: [
          { label: 'Document vault', desc: 'Stores every contract and rate sheet, and makes them queryable.', href: '/intelligence#vault' },
          { label: 'Itinerary generator', desc: 'Builds itineraries automatically from what is in the vault.', href: '/intelligence#ai-itinerary-suggestions' },
          { label: 'Payments & Invoicing', desc: 'Collect deposits and balances, and generate invoices tied to the booking.', href: '/solutions/payments' },
          { label: 'Support relay', desc: 'Multiple ground-team contacts, live support on the ground.', href: '/solutions/communication' },
          { label: 'WhatsApp integration', desc: 'Real WhatsApp Business API, connected straight into your relay.', href: '/solutions/communication' },
        ],
      },
    ],
  },

  {
    id: 'automations',
    label: 'Automations',
    href: '/autopilot',
    groups: [
      {
        heading: 'Pipeline',
        items: [
          { label: 'Overview', desc: 'The full scope of Automation, end to end.', href: '/autopilot' },
          { label: 'Automated Inquiry', desc: 'Parses an incoming message into a structured lead automatically.', href: '/autopilot#stage-0' },
          { label: 'Automated Quotation', desc: 'Sends the inquiry to your supplier list, manages every reply.', href: '/autopilot#stage-2' },
          { label: 'Automated Follow-up', desc: 'Reminds clients, sends nudges, wins back leads gone quiet.', href: '/autopilot#stage-7' },
        ],
      },
      {
        heading: '',
        items: [
          { label: 'Automated Confirmation', desc: 'Confirms dates, intent, and availability with both sides.', href: '/autopilot#stage-3' },
          { label: 'Automated Collection', desc: 'Gathers traveller documents and supplier booking confirmations.', href: '/autopilot#stage-5' },
          { label: 'Automated Payment', desc: 'Sends deposit and balance requests on schedule — marking money received stays yours.', href: '/autopilot#stage-4' },
        ],
      },
    ],
    feature: {
      card: 'escalation',
      title: 'Introducing Human escalation',
      badge: 'New',
      desc: 'The moment something needs a person, it is flagged and organised by what action to take — not a flat alert feed.',
      href: '/autopilot',
    },
  },

  {
    id: 'solutions',
    label: 'Solutions',
    href: '/customers',
    groups: [
      {
        heading: 'For resellers',
        items: [
          { label: 'Travel agencies', desc: 'Coordinate your traveller and your supplier in one thread.', href: '/customers/travel-agencies' },
          { label: 'Advisors & Agents', desc: 'Run your whole book of clients, or the relationship yourself, inquiry to payment, without a shared inbox.', href: '/customers/independent-advisors' },
          { label: 'Creators', desc: 'Turn a following into bookings without becoming an agency.', href: '/customers/creators' },
        ],
      },
      {
        heading: 'For suppliers',
        items: [
          { label: 'DMCs', desc: 'A free CRM for the requests you are already getting.', href: '/customers/dmcs' },
          { label: 'Tour operators', desc: 'Reply to agency requests without changing how you work.', href: '/customers/tour-operators' },
        ],
      },
    ],
    feature: {
      card: 'horizon',
      title: 'Horizon: Supplier network',
      badge: 'New',
      desc: 'A live, vetted list of DMCs and suppliers across 130+ countries — see who you can source before you quote.',
      href: '/horizon',
    },
  },

  { id: 'pricing', label: 'Pricing', href: '/pricing' },

  {
    id: 'resources',
    label: 'Resources',
    href: '/blog',
    groups: [
      {
        heading: 'Learn',
        items: [
          { label: 'Blog', desc: 'Notes on running trips without the inbox.', href: '/blog' },
          { label: 'Destinations', desc: 'Every country the network reaches, with a page for each.', href: '/destinations' },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'About', desc: 'Who built this, and why by hand was never going to scale.', href: '/about' },
          { label: 'Security', desc: 'Encryption, isolation, and what is not yet certified.', href: '/security' },
        ],
      },
    ],
    feature: {
      card: 'reading',
      title: 'Nine stages: a shared vocabulary for trip operations',
      desc: 'Why every trip goes through the same nine steps, and what naming them changes.',
      href: '/blog/nine-stages-building-a-shared-vocabulary-for-trip-operations',
    },
  },
];

/**
 * The drawer, for screens with no hover. Every link the panels hold,
 * grouped under the top-level item and the group label.
 */
export interface DrawerGroup {
  heading: string | null;
  links: { label: string; href: string }[];
}

export const DRAWER: DrawerGroup[] = [
  ...NAV.filter((n) => n.groups).map((n) => ({
    heading: n.label,
    links: n.groups!.flatMap((g) => g.items.map((r) => ({ label: r.label, href: r.href }))),
  })),
  {
    heading: null,
    links: NAV.filter((n) => !n.groups).map((n) => ({ label: n.label, href: n.href })),
  },
];
