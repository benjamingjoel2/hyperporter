/**
 * One line icon per nav item, keyed by the item's label. 24-unit grid, a
 * single 1.5 stroke, round caps and joins, no fills — the same construction
 * kit as the site's chevrons and marks, so they read as one family. Rendered
 * beside every item in the panels and the phone drawer.
 */
const P = (d: string): string => `<path d="${d}"/>`;
const C = (cx: number, cy: number, r: number): string => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
const R = (x: number, y: number, w: number, h: number, rx = 2): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;

/** The automation mark: a small A⁺ at the top right, where a degree sign
    would sit, over the icon drawn a little smaller in the bottom left. */
const AUTO = (inner: string): string =>
  `<g transform="translate(0 4.5) scale(.78)">${inner}</g>` +
  P('M14.8 8.2l2.1-5 2.1 5') + P('M15.6 6.4h2.6') + P('M21 2.2v3') + P('M19.5 3.7h3');

export const NAV_ICONS: Record<string, string> = {
  // Tools — Core
  'Portal': R(3, 4, 18, 16) + P('M3 9h18') + P('M7 6.5h.01'),
  'Atlas AI': P('M12 3c.6 5 4 8.4 9 9-5 .6-8.4 4-9 9-.6-5-4-8.4-9-9 5-.6 8.4-4 9-9z'),
  // A kanban board: three columns, each as tall as its stack of cards.
  'CRM workflow': R(3, 3, 5, 12, 1.5) + R(9.5, 3, 5, 18, 1.5) + R(16, 3, 5, 8, 1.5),
  'Inquiry form': R(5, 3, 14, 18) + P('M9 8h6') + P('M9 12h6') + P('M9 16h3'),
  'Quotation Board': P('M5 20V11') + P('M12 20V5') + P('M19 20v-8') + P('M3 20h18'),
  'Proposal Share': P('M21 3 10 14') + P('M21 3 14 21l-4-7-7-4z'),
  // Tools — Collaboration
  'Client + Supplier Dashboard': R(3, 4, 8, 16) + R(13, 4, 8, 16) + P('M6 8h2') + P('M16 8h2'),
  // Three speech bubbles: two parties above, the third answering below.
  '3-way inbox': P('M5 3h4a2 2 0 012 2v2a2 2 0 01-2 2H6l-3 2V5a2 2 0 012-2z') + P('M15 3h4a2 2 0 012 2v6l-3-2h-1a2 2 0 01-2-2V5a2 2 0 012-2z') + P('M9 12.5h6a2 2 0 012 2v3a2 2 0 01-2 2h-5l-3 2v-7a2 2 0 012-2z'),
  // Tools — More tools
  'Document vault': R(4, 10, 16, 11) + P('M8 10V7a4 4 0 018 0v3') + P('M12 15v2'),
  'Itinerary generator': C(5, 6, 2) + C(19, 18, 2) + P('M7 6h6a4 4 0 010 8h-4a4 4 0 000 8h8') ,
  'Payments & Invoicing': R(3, 6, 18, 12) + P('M3 10h18') + P('M7 15h3'),
  'Support relay': P('M4 14v-2a8 8 0 0116 0v2') + R(3, 13, 4, 6, 1) + R(17, 13, 4, 6, 1) + P('M19 19a3 3 0 01-3 2h-3'),
  // Integrations
  'WhatsApp': P('M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z') + P('M9 10h6') + P('M9 13.5h4'),
  'Email': P('M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z') + P('M3.4 6.5l8.6 6 8.6-6'),
  // Automations
  // The A⁺ mark on its own, full size.
  'Overview': P('M4 19.5l6.5-15 6.5 15') + P('M6.6 13.5h7.8') + P('M20 3v5') + P('M17.5 5.5h5'),
  // A letter lifted out of its envelope.
  'Automated Inquiry': AUTO(R(6, 2.5, 12, 11, 1) + P('M9 6.5h6') + P('M9 9.5h4') + P('M3 13l9 5 9-5v6a2 2 0 01-2 2H5a2 2 0 01-2-2z')),
  'Automated Quotation': AUTO(P('M3 12l7-7h8v8l-7 7z') + C(15, 8, 1)),
  'Automated Follow-up': AUTO(P('M6 16V11a6 6 0 0112 0v5l2 2H4z') + P('M10 21h4')),
  'Automated Confirmation': AUTO(C(12, 12, 9) + P('M8 12l3 3 5-6')),
  'Automated Collection': AUTO(P('M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z') + P('M12 10v6') + P('M9.5 13.5 12 16l2.5-2.5')),
  'Automated Payment': AUTO(R(3, 6, 18, 12) + P('M3 10h18') + P('M7 14.5h4')),
  // Solutions
  'Travel agencies': P('M3 21h18') + P('M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17') + P('M9.5 7h1.5') + P('M13 7h1.5') + P('M9.5 11h1.5') + P('M13 11h1.5') + P('M9.5 15h1.5') + P('M13 15h1.5') + P('M10.5 21v-3h3v3'),
  'Advisors & Agents': C(12, 8, 4) + P('M4 21a8 8 0 0116 0'),
  'Creators': P('M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'),
  'DMCs': P('M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z') + C(12, 10, 2.5),
  'Tour operators': C(12, 12, 9) + P('M15.5 8.5l-2 5-5 2 2-5z'),
  // Resources
  'Blog': P('M3 5a2 2 0 012-2h4a3 3 0 013 3v15a2 2 0 00-2-2H3z') + P('M21 5a2 2 0 00-2-2h-4a3 3 0 00-3 3v15a2 2 0 012-2h7z'),
  'Destinations': C(12, 12, 9) + P('M3 12h18') + P('M12 3c3 3 3 15 0 18') + P('M12 3c-3 3-3 15 0 18'),
  'About': C(12, 12, 9) + P('M12 11v5') + P('M12 8h.01'),
  'Security': P('M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z') + P('M9 12l2 2 4-4'),
};

/** The icon as an inline SVG element, sized by the CSS around it. */
export const navIcon = (label: string): string => {
  const body = NAV_ICONS[label];
  return body
    ? `<svg class="mega-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
    : '';
};
