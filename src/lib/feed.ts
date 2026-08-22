/** Sample dispatch-rail entries for the header ticker. Ported from
 * hyperporter-3.html, with the IATA codes (NBO, MRK, CUZ, ...) spelled out
 * as city names -- the rail is illustrative marketing copy, so a reader
 * should not need to know airport codes to parse it. */
export const FEED: [city: string, from: string, to: string, human: 0 | 1][] = [
  ['Nairobi', 'Quotation', 'Confirmation', 0], ['Marrakesh', 'driver relay', 'masked', 0],
  ['Cusco', 'voucher', 'requested', 0], ['Hanoi', 'availability', 're-verified', 0],
  ['Cape Town', 'payment', 'marked manually', 1], ['Bangkok', 'thread', 'archived', 0],
  ['Lima', 'Inquiry', 'Planning', 0], ['Zanzibar', 'urgent flag', 'escalated', 1],
  ['Riyadh', 'margin', 'applied', 0], ['Kathmandu', 'Ready', 'Traveling', 0],
  ['Ho Chi Minh City', 'Post-Trip', 'Completed', 0], ['Rio de Janeiro', 'backup operator', 'sourced', 0],
];
