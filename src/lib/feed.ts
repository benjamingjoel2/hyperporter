/**
 * Dispatch-rail entries for the header ticker.
 *
 * The rail used to hold twelve entries, which looped back around in a few
 * seconds and made the "live activity" read as a short recording. It now
 * holds fifty times that, composed from a matrix of cities and events
 * rather than written out by hand — 600 lines of literal would be
 * unreadable and impossible to keep varied.
 *
 * Composition, not repetition: each city is paired with a different slice
 * of the event list, so no two entries in the strip are identical and the
 * same city never appears twice in a row.
 *
 * `human` marks the entries that describe something a person did. Those
 * render in amber, which on this site means exactly one thing: a human
 * touchpoint. Keep that mapping — do not colour anything else with it.
 *
 * This is illustrative marketing copy, not live data, and the sample-tag
 * under the hero thread says so.
 */

/** Cities the network actually reaches — all present in the destinations set. */
const CITIES = [
  'Nairobi', 'Marrakesh', 'Cusco', 'Hanoi', 'Cape Town', 'Bangkok',
  'Lima', 'Zanzibar', 'Riyadh', 'Kathmandu', 'Ho Chi Minh City', 'Rio de Janeiro',
  'Lisbon', 'Amman', 'Colombo', 'Antigua', 'Ubud', 'Quito',
  'Muscat', 'Tbilisi', 'La Paz', 'Dakar', 'Luang Prabang', 'Cartagena',
  'Windhoek', 'Kyoto', 'Porto', 'Arusha', 'Samarkand', 'Valletta',
  'Bogotá', 'Siem Reap', 'Reykjavík', 'Salalah', 'Mendoza', 'Chiang Mai',
  'Essaouira', 'Kigali', 'Yerevan', 'Split', 'Bariloche', 'Malé',
  'Pokhara', 'Tulum', 'Zermatt', 'Gaborone', 'Bukhara', 'Ushuaia',
  'Hoi An', 'Livingstone',
] as const;

/**
 * What happened. `human` is set only where a person is genuinely in the
 * loop — payment marking, escalations, manual overrides — because that is
 * what amber means everywhere else on the site.
 */
const EVENTS: [from: string, to: string, human: 0 | 1][] = [
  ['Quotation', 'Confirmation', 0],
  ['driver relay', 'masked', 0],
  ['voucher', 'requested', 0],
  ['availability', 're-verified', 0],
  ['payment', 'marked manually', 1],
  ['thread', 'archived', 0],
  ['Inquiry', 'Planning', 0],
  ['urgent flag', 'escalated', 1],
  ['margin', 'applied', 0],
  ['Ready', 'Traveling', 0],
  ['Post-Trip', 'Completed', 0],
  ['backup operator', 'sourced', 0],
  ['rooming list', 'confirmed', 0],
  ['reprice', 'approved by agent', 1],
  ['transfer window', 'adjusted', 0],
  ['supplier RFP', 'sent', 0],
  ['deposit', 'reconciled', 1],
  ['itinerary v3', 'published', 0],
  ['guide roster', 'locked', 0],
  ['permit', 'issued', 0],
  ['date change', 'absorbed', 0],
  ['refund', 'authorised by hand', 1],
  ['arrival window', 'narrowed', 0],
  ['DMC quote', 'parsed', 0],
];

export type FeedEntry = [city: string, from: string, to: string, human: 0 | 1];

/**
 * 600 entries: the city advances on every single one, and the event strides
 * by 7 through a 24-long list so the pairing keeps changing.
 *
 * The obvious construction — for each city, list twelve events — groups all
 * twelve of a city's entries together, which reads as "NAIROBI, NAIROBI,
 * NAIROBI" scrolling past. Walking one flat index and taking the city
 * modulo 50 rotates through all fifty before any of them repeats.
 *
 * 7 and 24 share no factors, so the event index cycles through all 24
 * before repeating; 50 and 24 likewise, so a city meets a different event
 * each time round.
 */
export const FEED: FeedEntry[] = Array.from({ length: 600 }, (_, i) => {
  const [from, to, human] = EVENTS[(i * 7) % EVENTS.length];
  return [CITIES[i % CITIES.length], from, to, human] as FeedEntry;
});
