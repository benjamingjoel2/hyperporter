/**
 * Pricing, transcribed from the founder's content file.
 *
 * Two ladders off the same three tiers. Resellers climb all three; Suppliers
 * skip the middle and go straight from Showcase to Intelligence.
 *
 * Cell values are strings rather than booleans because several of them are
 * neither yes nor no — "€19/mo" is a paid add-on on that tier and "Add-on"
 * is metered usage. `YES` and `NO` are the two symbols; anything else prints
 * as written.
 *
 * The figures are the founder's, published at their instruction. Note the
 * free tier is quoted in dollars and the paid tiers in euros; that is how
 * the source copy reads and has been flagged rather than silently changed.
 */
import type { Side } from './customers';

export const YES = '✓';
export const NO = '—';

export interface Tier {
  name: string;
  kind: string;
  amount: string;
  note: string;
  features: string[];
  cta: string;
  href: string;
}

export interface MatrixRow {
  feature: string;
  cells: string[];
}

export interface MatrixGroup {
  group: string;
  rows: MatrixRow[];
}

export interface Ladder {
  side: Side;
  label: string;
  intro: string;
  tiers: Tier[];
  columns: string[];
  matrix: MatrixGroup[];
}

export const LADDERS: Ladder[] = [
  {
    side: 'reseller',
    label: 'Resellers',
    intro: 'For Resellers — all three tiers',
    tiers: [
      {
        name: 'Showcase',
        kind: 'Workflow',
        amount: '$0',
        note: '20 trips/mo',
        features: [
          'Public inquiry form link',
          'CRM, proposal generator, magic links',
          'Full Horizon network access',
        ],
        cta: 'Get started',
        href: '/signup',
      },
      {
        name: 'Autopilot',
        kind: 'Workflow + Automation',
        amount: '€49 /mo',
        note: 'Unlimited bookings',
        features: [
          'Everything in Showcase',
          'Full stage-based automation',
          'Remove “Powered by Hyperporter”',
        ],
        cta: 'Get started',
        href: '/signup',
      },
      {
        name: 'Intelligence',
        kind: 'Workflow + Automation + Intelligence',
        amount: 'Custom',
        note: 'Tailored per business',
        features: [
          'Everything in Autopilot',
          'Atlas — the internal brain',
          'Custom domain, included',
        ],
        cta: 'Talk to us',
        href: '/signup',
      },
    ],
    columns: ['Showcase', 'Autopilot', 'Intelligence'],
    matrix: [
      {
        group: 'Inquiry',
        rows: [{ feature: 'Public inquiry form link', cells: [YES, YES, YES] }],
      },
      {
        group: 'Operations',
        rows: [
          { feature: 'CRM access', cells: [YES, YES, YES] },
          { feature: 'Magic link creation', cells: [YES, YES, YES] },
          { feature: 'Horizon network access', cells: [YES, YES, YES] },
          { feature: 'Itinerary / proposal generator', cells: [YES, YES, YES] },
          { feature: 'Stage-based automation', cells: [NO, YES, YES] },
        ],
      },
      {
        group: 'Branding',
        rows: [
          { feature: 'Logo & branding toggle', cells: [YES, YES, YES] },
          { feature: 'Remove “Powered by Hyperporter”', cells: [NO, YES, YES] },
          { feature: 'Domain masking', cells: [NO, '€19/mo', YES] },
          { feature: 'Custom domain', cells: [NO, NO, YES] },
          { feature: 'Modern website', cells: [NO, '€19/mo', YES] },
        ],
      },
      {
        group: 'Communication',
        rows: [
          { feature: 'Inquire directly inside Portal', cells: [YES, YES, YES] },
          { feature: 'Email integration', cells: [NO, YES, YES] },
          { feature: 'WhatsApp integration', cells: [NO, 'Add-on', 'Add-on'] },
          { feature: 'WhatsApp Support Orchestrator', cells: [NO, 'Add-on', 'Add-on'] },
        ],
      },
      {
        group: 'Payments',
        rows: [
          { feature: 'Payment instructions', cells: [YES, YES, YES] },
          { feature: 'Payment gateway processing', cells: [NO, NO, YES] },
          { feature: 'Payment automation', cells: [NO, NO, YES] },
        ],
      },
      {
        group: 'Marketing',
        rows: [{ feature: 'Email marketing', cells: [NO, NO, YES] }],
      },
      {
        group: 'Atlas — the internal brain',
        rows: [
          { feature: 'Vault', cells: [NO, NO, YES] },
          { feature: 'AI chat over your own data', cells: [NO, NO, YES] },
          { feature: 'AI-assisted quoting', cells: [NO, NO, YES] },
          { feature: 'AI itinerary suggestions', cells: [NO, NO, YES] },
        ],
      },
    ],
  },

  {
    side: 'supplier',
    label: 'Suppliers',
    intro: 'For Suppliers — skip straight to Intelligence',
    tiers: [
      {
        name: 'Showcase',
        kind: 'Workflow',
        amount: '$0',
        note: 'Forever, no upgrade pressure',
        features: ['CRM access and quoting', 'Listed on Horizon, at no cost', 'Itinerary / proposal generator'],
        cta: 'Get started',
        href: '/signup',
      },
      {
        name: 'Intelligence',
        kind: 'Workflow + Automation + Intelligence',
        amount: 'Custom',
        note: 'Tailored to your operation',
        features: ['Everything in Showcase', 'Atlas — the internal brain', 'WhatsApp & email integration'],
        cta: 'Talk to us',
        href: '/signup',
      },
    ],
    columns: ['Showcase', 'Intelligence'],
    matrix: [
      {
        group: 'Inquiry',
        rows: [{ feature: 'Public inquiry form link', cells: [YES, YES] }],
      },
      {
        group: 'Operations',
        rows: [
          { feature: 'CRM access', cells: [YES, YES] },
          { feature: 'Magic link creation', cells: [YES, YES] },
          { feature: 'Listed on Horizon', cells: [YES, YES] },
          { feature: 'Itinerary / proposal generator', cells: [YES, YES] },
          { feature: 'Stage-based automation', cells: [NO, YES] },
        ],
      },
      {
        group: 'Branding',
        rows: [
          { feature: 'Logo & branding toggle', cells: [YES, YES] },
          { feature: 'Custom domain', cells: [NO, YES] },
        ],
      },
      {
        group: 'Communication',
        rows: [
          { feature: 'Inquire directly inside Portal', cells: [YES, YES] },
          { feature: 'WhatsApp & email integration', cells: [NO, YES] },
        ],
      },
      {
        group: 'Payments',
        rows: [{ feature: 'Payment instructions', cells: [YES, YES] }],
      },
      {
        group: 'Atlas — the internal brain',
        rows: [
          { feature: 'Vault', cells: [NO, YES] },
          { feature: 'AI-assisted quoting', cells: [NO, YES] },
        ],
      },
    ],
  },
];

export const byLadder = (side: Side): Ladder => {
  const l = LADDERS.find((x) => x.side === side);
  if (!l) throw new Error(`No pricing ladder for "${side}"`);
  return l;
};

/** Security page content — practices, controls and the FAQ. */
export const SECURITY = {
  eyebrow: 'Always on. Always secure.',
  title: 'Your data is in safe hands.',
  lede: "From encryption to access control, Hyperporter is built to the standard travel businesses' contracts, rates, and traveler data actually deserve.",
  practicesEyebrow: 'Built on strong foundations',
  practicesTitle: 'The practices, in place from day one.',
  practices: [
    {
      title: 'Encryption everywhere',
      body: 'TLS in transit, AES-256 at rest — contracts, rates, and traveler data protected the same way, on every tier.',
    },
    {
      title: 'Zero standing access',
      body: 'No engineer sees your data by default — access is logged, time-limited, and only granted with a specific support reason.',
    },
    {
      title: 'Isolated by account',
      body: "One DMC's rates never leak into another's Vault, even on the same tier, even on the same network.",
    },
    {
      title: 'No training on your data',
      body: 'Atlas is trained on your own Vault, for you — your contracts and rates are never used to train a model for anyone else.',
    },
  ],
  controlEyebrow: 'Your data. Your decisions.',
  controlTitle: 'You maintain control at all times.',
  controls: [
    {
      title: 'Data retention',
      body: 'Set how long your data is kept, aligned to how your business actually operates.',
    },
    {
      title: 'Full export',
      body: 'Your contracts, rates, and trip history — exportable on request, at any time.',
    },
    {
      title: 'Deletion on request',
      body: 'Once your contract ends, your data — and any dedicated storage — is permanently deleted.',
    },
  ],
  faq: [
    {
      q: 'Does Atlas train on my contracts and rates?',
      a: 'No. Your Vault is used to answer questions and draft quotes for your account only — never to train a shared or public model.',
    },
    {
      q: 'Can another DMC or agency see my data?',
      a: "No. Every account's Vault, CRM, and rates are isolated — visibility across accounts happens only through Horizon's intended search, quote, and book flow, never by browsing another account's data directly.",
    },
    {
      q: 'What happens to my data if I stop using Hyperporter?',
      a: 'You can request a full export at any time. Once your contract ends, your data and any dedicated storage tied to your account are permanently deleted.',
    },
    {
      q: 'Are you SOC 2 or GDPR certified?',
      a: 'Not formally, not yet. SOC 2 and GDPR-formal compliance are targeted post-pilot, once real usage volume justifies the audit — the practices above are already how the platform is built, ahead of the paperwork.',
    },
  ],
};

/** Homepage FAQ. */
export const HOME_FAQ = [
  {
    q: 'Is Showcase actually free?',
    a: 'Yes — free forever for Suppliers, and free up to 20 trips/mo for Resellers. No card required, no upgrade pressure.',
  },
  {
    q: 'Do I need a supplier list to get started?',
    a: 'No. Horizon gives every account a vetted list of DMCs and suppliers to search, on any tier, from day one.',
  },
  {
    q: 'What’s the difference between Reseller and Supplier?',
    a: 'Resellers (agencies, advisors) run the full ladder — Showcase, Autopilot, Intelligence. Suppliers (DMCs, tour operators) skip straight from Showcase to Intelligence.',
  },
];
