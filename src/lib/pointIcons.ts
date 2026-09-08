/**
 * Small line icons for the three points on a tool or automation page — the
 * reference sets one above each point. Same construction kit as the nav
 * icons: 24-unit grid, a single 1.5 stroke, round caps, no fills. Generic
 * by design: a point picks the nearest shape by name in detail.ts.
 */
const P = (d: string): string => `<path d="${d}"/>`;
const C = (cx: number, cy: number, r: number): string => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
const R = (x: number, y: number, w: number, h: number, rx = 2): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;

export type PointIcon =
  | 'columns' | 'margin' | 'rate' | 'thread' | 'sides' | 'brand' | 'check' | 'bolt' | 'layers'
  | 'link' | 'shield' | 'clock' | 'users' | 'doc' | 'chat' | 'tag' | 'route' | 'eye' | 'bell'
  | 'lock' | 'hand' | 'inbox' | 'send' | 'cite' | 'draft' | 'board';

export const POINT_ICONS: Record<PointIcon, string> = {
  columns: R(3, 4, 5, 16, 1) + R(9.5, 4, 5, 16, 1) + R(16, 4, 5, 16, 1),
  margin: P('M4 18h16') + P('M4 12h10') + P('M4 6h6') + P('M18 4v6') + P('M15 7h6'),
  rate: C(12, 12, 9) + P('M12 7v10') + P('M15 9.5c0-1-1.3-1.5-3-1.5s-3 .6-3 1.6 1.3 1.4 3 1.4 3 .5 3 1.5-1.3 1.6-3 1.6-3-.6-3-1.6'),
  thread: P('M4 6h16') + P('M4 12h10') + P('M4 18h13') + C(19, 12, 1.5),
  sides: R(3, 4, 8, 16, 1.5) + R(13, 4, 8, 16, 1.5) + P('M6 9h2') + P('M16 9h2'),
  brand: P('M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'),
  check: C(12, 12, 9) + P('M8 12l3 3 5-6'),
  bolt: P('M13 2L4 14h7l-1 8 9-12h-7z'),
  layers: P('M12 3l9 5-9 5-9-5z') + P('M3 13l9 5 9-5') + P('M3 17l9 5 9-5'),
  link: P('M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1') + P('M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1'),
  shield: P('M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'),
  clock: C(12, 12, 9) + P('M12 7v5l3 2'),
  users: C(9, 8, 3.5) + P('M3 20a6 6 0 0112 0') + C(17, 9, 2.5) + P('M15.5 14.5A5 5 0 0121 19.5'),
  doc: P('M6 3h8l4 4v14H6z') + P('M14 3v4h4') + P('M9 12h6') + P('M9 16h4'),
  chat: P('M4 5h16v11H9l-5 4z') + P('M8 9h8') + P('M8 12.5h5'),
  tag: P('M3 12l7-7h8v8l-7 7z') + C(15, 8, 1),
  route: C(5, 6, 2) + C(19, 18, 2) + P('M7 6h6a4 4 0 010 8h-4a4 4 0 000 8h8'),
  eye: P('M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z') + C(12, 12, 3),
  bell: P('M6 16V11a6 6 0 0112 0v5l2 2H4z') + P('M10 21h4'),
  lock: R(4, 10, 16, 11) + P('M8 10V7a4 4 0 018 0v3') + P('M12 15v2'),
  hand: P('M7 11V5a1.5 1.5 0 013 0v6') + P('M10 10V4a1.5 1.5 0 013 0v7') + P('M13 10.5V6a1.5 1.5 0 013 0v6') + P('M16 12V9a1.5 1.5 0 013 0v6a7 7 0 01-7 7h-1a7 7 0 01-6-3.3L3 14.5a1.5 1.5 0 012.4-1.8L7 14.5'),
  inbox: P('M3 13l2.5-8h13L21 13v6H3z') + P('M3 13h5l1.5 2h5L16 13h5'),
  send: P('M21 3 10 14') + P('M21 3 14 21l-4-7-7-4z'),
  cite: P('M6 3h12v18H6z') + P('M9 8h6') + P('M9 12h6') + P('M9 16h3') + C(17, 17, 3) + P('M19.2 19.2L22 22'),
  draft: P('M4 20h4l10-10-4-4L4 16z') + P('M12.5 7.5l4 4'),
  board: R(3, 3, 5, 12, 1.5) + R(9.5, 3, 5, 18, 1.5) + R(16, 3, 5, 8, 1.5),
};

export const pointIcon = (name: PointIcon): string =>
  `<svg class="pt-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${POINT_ICONS[name]}</svg>`;

/** Pick an icon for a point from its title; the fallback cycles so three
    points never share one. */
const RULES: [RegExp, PointIcon][] = [
  [/crm|board|stage/i, 'board'],
  [/brand|logo|touchpoint|look like/i, 'brand'],
  [/horizon|network|supplier list|source|operator/i, 'route'],
  [/link|magic/i, 'link'],
  [/pay|paid|money|deposit|margin|rate|price|invoice|number/i, 'rate'],
  [/time|schedule|remind|chase|nudge|late|quiet/i, 'clock'],
  [/client|team|agent|traveller|people|everyone|book of|talent|side/i, 'users'],
  [/document|contract|vault|voucher|upload|read/i, 'doc'],
  [/message|inbox|thread|whatsapp|conversation|reply|channel|question/i, 'chat'],
  [/confirm|check|verif|nothing falls/i, 'check'],
  [/automat|autopilot|itself|parsing|sending|collecting/i, 'bolt'],
  [/private|secure|data|yours|your own|only/i, 'shield'],
  [/quote|compar|like with like|columns/i, 'columns'],
  [/escalat|person|human|decid|choose|hand|edit/i, 'hand'],
  [/cite|citation|answer/i, 'cite'],
  [/draft|itinerar|start/i, 'draft'],
  [/dashboard|two sides|each side/i, 'sides'],
  [/see|view|open|visible|show/i, 'eye'],
  [/backup|small change/i, 'layers'],
];
const FALLBACK: PointIcon[] = ['layers', 'bolt', 'users'];

export const guessIcon = (title: string, index = 0): PointIcon => {
  for (const [re, icon] of RULES) if (re.test(title)) return icon;
  return FALLBACK[index % FALLBACK.length];
};
