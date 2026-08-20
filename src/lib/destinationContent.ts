/**
 * Shared boilerplate blocks for the destination-page "End-to-End Services"
 * and "Hyperporter Guarantee" sections. Ported verbatim from
 * hyperporter-3.html's SERVICES / GUARANTEE constants — identical copy on
 * every destination page except for the `{C}` country-name substitution
 * in GUARANTEE. That sameness is the thin-content problem flagged
 * separately (see the migration plan); porting it unchanged here is a
 * faithful copy of the prototype, not a fix for it.
 */

export const SERVICES: [title: string, body: string][] = [
  ['Popular Itineraries', 'Access our library of pre-made packages that you can start selling right away.'],
  ['Bespoke Trips', "Simply forward us your client's inquiry and we'll execute every detail."],
  ['Transportation', 'Airport pickups, trusted drivers, intercity transfers and flexible car hire.'],
  ['Accommodation', 'Special B2B rates and partner perks from our curated list of hotels.'],
  ['Concierge', 'Dedicated end-to-end support for your VIPs, handled over WhatsApp.'],
  ['DMC', 'Large-scale arrangements for enterprises, groups and MICE.'],
];

export const GUARANTEE: [title: string, body: string][] = [
  [
    'Signature packages',
    'Ready-to-sell itineraries for {C}, already priced and operable — start selling without building a product from scratch.',
  ],
  [
    'Lowest B2B pricing',
    'Net rates negotiated directly with operators in {C}. Your margin sits on top, and the operator never sees what you charge your client.',
  ],
  [
    'Revenue tools',
    'Quote faster and keep your markup consistent across every trip — margin is applied automatically, before the client sees a number.',
  ],
  [
    'Seamless logistics',
    'Pickups, transfers, drivers and guides coordinated as one chain in {C}, not six separate email threads.',
  ],
  [
    'Standardized service',
    'The same brief, the same checks and the same handover in {C} as in every other destination on the Horizon network.',
  ],
  [
    'On-the-ground support',
    'A local team in {C} during the trip. Routine questions are handled quietly; a real problem reaches a human immediately.',
  ],
];
