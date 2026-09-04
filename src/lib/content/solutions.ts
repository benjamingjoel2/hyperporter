/**
 * Solutions — every feature grouped by what it actually does, and the tier
 * it lands on.
 *
 * `tier` is copied verbatim from the founder's content because the wording
 * carries meaning the slug would lose: "Autopilot up" means Autopilot and
 * everything above it, "€19/mo add-on" is a paid extra rather than a tier,
 * and "Add-on" alone means metered usage on top.
 */

export interface CategoryFeature {
  name: string;
  body: string;
  tier: string;
}

export interface Category {
  slug: string;
  name: string;
  /** One line, used on the Solutions index and in the nav. */
  desc: string;
  title: string;
  lede: string;
  features: CategoryFeature[];
  next: { title: string; desc: string; cta: string; href: string };
}

export const CATEGORIES: Category[] = [
  {
    slug: 'inquiry',
    name: 'Inquiry',
    desc: 'How a new lead enters the CRM.',
    title: 'How a new lead enters the CRM.',
    lede: 'One feature, available from day one, on every tier.',
    features: [
      {
        name: 'Public inquiry form link',
        body: 'A public, shareable link — LinkedIn, email signature, Instagram bio, a community group. Every submission creates a new contact and trip inquiry directly in the CRM.',
        tier: 'Showcase',
      },
    ],
    next: {
      title: 'See how the trip actually gets run.',
      desc: 'Operations covers the CRM, magic links, and stage automation that take an inquiry to a booking.',
      cta: 'See Operations',
      href: '/solutions/operations',
    },
  },

  {
    slug: 'operations',
    name: 'Operations',
    desc: 'CRM and stage automation.',
    title: 'CRM and stage automation.',
    lede: 'The core workflow — five features, from free CRM access through full stage-based automation.',
    features: [
      {
        name: 'CRM access',
        body: 'Manual, all tiers — track every trip through the stage engine.',
        tier: 'Showcase',
      },
      {
        name: 'Magic link creation',
        body: 'Proposal / itinerary link, sent to travelers or partners.',
        tier: 'Showcase',
      },
      {
        name: 'Horizon network access',
        body: 'Fully actionable — search, quote, and book across the DMC/supplier network. 10% Horizon markup applies on sourced bookings.',
        tier: 'Showcase',
      },
      {
        name: 'Itinerary / proposal generator',
        body: 'Build a branded proposal document, all tiers.',
        tier: 'Showcase',
      },
      {
        name: 'Stage-based automation (Inquiry → Post-Trip)',
        body: 'Full nine-stage automation with human escalation points.',
        tier: 'Autopilot up',
      },
    ],
    next: {
      title: 'Make it look like your business, not ours.',
      desc: 'Branding covers your logo, your domain, and removing the Hyperporter badge entirely.',
      cta: 'See Branding',
      href: '/solutions/branding',
    },
  },

  {
    slug: 'branding',
    name: 'Branding',
    desc: 'Your identity on everything a customer or partner sees.',
    title: 'Your identity on everything a customer or partner sees.',
    lede: 'Five features, from a free logo toggle through a fully white-labeled domain.',
    features: [
      {
        name: 'Logo & branding toggle',
        body: 'Upload logo, set company name on your client-facing link.',
        tier: 'Showcase',
      },
      {
        name: 'Remove “Powered by Hyperporter”',
        body: 'Floating badge, bottom-right, removable from Autopilot up.',
        tier: 'Autopilot up',
      },
      {
        name: 'Domain masking',
        body: "A taste of Intelligence's custom domain, scoped to the itinerary creator URL.",
        tier: '€19/mo add-on',
      },
      {
        name: 'Custom domain',
        body: 'Full white-label, included natively with Intelligence.',
        tier: 'Intelligence',
      },
      {
        name: 'Modern website',
        body: 'From Autopilot up — a branded website built on the same tooling as proposals and magic links.',
        tier: '€19/mo add-on',
      },
    ],
    next: {
      title: 'Talk to travelers and partners, wherever they already are.',
      desc: 'Communication covers in-platform inquiries, email, and WhatsApp.',
      cta: 'See Communication',
      href: '/solutions/communication',
    },
  },

  {
    slug: 'communication',
    name: 'Communication',
    desc: 'Talking to travelers and partners, inside and outside the platform.',
    title: 'Talking to travelers and partners, inside and outside the platform.',
    lede: 'Four features, from in-platform messaging through a full WhatsApp relay.',
    features: [
      {
        name: 'Inquire directly inside Hyperporter Portal',
        body: 'A native in-platform channel for inquiries — no email or WhatsApp round-trip needed.',
        tier: 'Showcase',
      },
      {
        name: 'Email integration',
        body: 'Structured inbox/thread parsing for inquiries and RFPs.',
        tier: 'Autopilot on',
      },
      {
        name: 'WhatsApp integration',
        body: 'Real Business API — manual setup per customer, token cost scales with usage.',
        tier: 'Add-on',
      },
      {
        name: 'WhatsApp Support Orchestrator',
        body: 'Masked three-way relay — agency / supplier / traveler, live during Traveling. Metered per active trip.',
        tier: 'Add-on',
      },
    ],
    next: {
      title: 'Money in, money out.',
      desc: 'Payments covers instructions, gateway processing, and full automation.',
      cta: 'See Payments',
      href: '/solutions/payments',
    },
  },

  {
    slug: 'payments',
    name: 'Payments',
    desc: 'Money in, money out, and the trust signal that enables usage-based pricing.',
    title: 'Money in, money out, and the trust signal that enables usage-based pricing.',
    lede: 'Three features — instructions on every tier, full processing and automation on Intelligence.',
    features: [
      {
        name: 'Payment instructions',
        body: 'Structured payment info on every magic link, all tiers.',
        tier: 'Showcase',
      },
      {
        name: 'Payment gateway processing',
        body: 'Hyperporter processes payment directly — the one tier with real payment visibility.',
        tier: 'Intelligence',
      },
      {
        name: 'Payment automation',
        body: 'Catches both sides — receiving from the customer and paying out the supplier — and moves the CRM stage automatically as each side clears.',
        tier: 'Intelligence',
      },
    ],
    next: {
      title: 'Reach beyond a single trip thread.',
      desc: 'Marketing covers outbound campaigns to your own traveler and client list.',
      cta: 'See Marketing',
      href: '/solutions/marketing',
    },
  },

  {
    slug: 'marketing',
    name: 'Marketing',
    desc: 'Outbound reach beyond a single trip thread.',
    title: 'Outbound reach beyond a single trip thread.',
    lede: 'One feature, on Intelligence — new, not yet fully scoped in detail.',
    features: [
      {
        name: 'Email marketing',
        body: 'Campaign sends to your own traveler/client list — separate from the transactional email integration in Communication.',
        tier: 'Intelligence',
      },
    ],
    next: {
      title: 'See who each of these is actually built for.',
      desc: 'Customers breaks it down by Reseller and Supplier — same features, different use.',
      cta: 'See Customers',
      href: '/customers',
    },
  },
];

export const byCategory = (slug: string): Category => {
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`No solutions category "${slug}"`);
  return c;
};
