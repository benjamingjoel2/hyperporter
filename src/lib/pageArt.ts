/**
 * Page illustrations — one per route, drawn rather than photographed.
 *
 * These are a family, not twenty-six one-offs, and the family rules are what
 * make them read that way:
 *
 *  - One frame, 480x360, so every hero reserves the same space.
 *  - One construction kit: rectangles, circles, straight lines, simple arcs.
 *    No gradients, no shadows, no illustration flourish the rest of the site
 *    does not have.
 *  - One stroke logic: 1.25 for structure, 2 for the single path the drawing
 *    is actually about.
 *  - One colour rule, which is the site's: teal marks the subject and nothing
 *    else, amber marks a human touchpoint and nothing else, everything
 *    structural is a hairline. A drawing with two teal ideas in it is a
 *    drawing that has not decided what it is about.
 *
 * Each scene states one true thing about its page. Where a page makes a claim
 * the drawing can carry — Horizon's fee going to the supplier, SOC 2 being
 * targeted rather than held — the drawing carries it, and a dashed edge is
 * never decorative.
 */

const L1 = '#E1DFDA'; // --line, structure
const L2 = '#C8C5BF'; // --line-2, secondary structure
const INK = '#0D1016'; // --paper, the one dark mass
const SIG = '#0E4B52'; // --signal, the subject
const SIG_F = 'rgba(14,75,82,.10)';
const AMB = '#9A5F0B'; // human touchpoint only
const PAPER = '#FFFFFF';
const PANEL = '#F1F2F0';

type Opt = Record<string, string | number>;
const at = (o: Opt): string =>
  Object.entries(o)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

/** A panel: the site's card, in the site's radius. */
const card = (x: number, y: number, w: number, h: number, o: Opt = {}): string =>
  `<rect ${at({ x, y, width: w, height: h, rx: 4, fill: PAPER, stroke: L1, 'stroke-width': 1.25, ...o })}/>`;

/** A content rule inside a panel — text, standing in for itself. */
const bar = (x: number, y: number, w: number, o: Opt = {}): string =>
  `<rect ${at({ x, y, width: w, height: 5, rx: 2.5, fill: L1, ...o })}/>`;

const line = (x1: number, y1: number, x2: number, y2: number, o: Opt = {}): string =>
  `<path ${at({ d: `M${x1} ${y1}L${x2} ${y2}`, stroke: L2, 'stroke-width': 1.25, fill: 'none', ...o })}/>`;

const dot = (cx: number, cy: number, r: number, o: Opt = {}): string =>
  `<circle ${at({ cx, cy, r, fill: SIG, ...o })}/>`;

const ring = (cx: number, cy: number, r: number, o: Opt = {}): string =>
  `<circle ${at({ cx, cy, r, fill: 'none', stroke: L1, 'stroke-width': 1.25, ...o })}/>`;

/** A run of content rules, varied so a panel reads as records not a grid. */
const rows = (x: number, y: number, widths: number[], step = 18, o: Opt = {}): string =>
  widths.map((w, i) => bar(x, y + i * step, w, o)).join('');

/** The signal path: the one line each drawing is about. */
const path = (d: string, o: Opt = {}): string =>
  `<path ${at({ d, stroke: SIG, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', ...o })}/>`;

/** An orthogonal connector. Curves bunch into a smear wherever several of
    them converge, which is most of these drawings. */
const elbow = (x1: number, y1: number, x2: number, y2: number, mid: number, o: Opt = {}): string =>
  `<path ${at({ d: `M${x1} ${y1}H${mid}V${y2}H${x2}`, stroke: SIG, 'stroke-width': 1.5, fill: 'none', ...o })}/>`;

/* ------------------------------------------------------------------ */
/* Product layers                                                      */
/* ------------------------------------------------------------------ */

/** Four planes, each resting on the one below. The base is teal: OS is the
    layer everything else needs, and the only one that is always included. */

/** Four layers, each resting on the whole of the one below. Nothing narrows
    as you go up, because nothing is taken away as you go up. */
const product =
  [0, 1, 2, 3]
    .map((i) => {
      const y = 246 - i * 54;
      const base = i === 0;
      return (
        card(112, y, 296, 46, base ? { stroke: SIG, fill: SIG_F } : {}) +
        bar(134, y + 20, 78, base ? { fill: SIG } : { fill: L2 }) +
        bar(232, y + 20, 44)
      );
    })
    .join('') +
  line(92, 84, 92, 292, { stroke: L2 }) +
  line(92, 84, 104, 84, { stroke: L2 }) +
  line(92, 292, 104, 292, { stroke: L2 });

/** A record card with one link leaving it, arriving at both sides at once:
    the same magic link is customer-facing and supplier-facing. */
const os =
  card(46, 60, 210, 240) +
  `<rect ${at({ x: 46, y: 60, width: 210, height: 30, rx: 4, fill: SIG })}/>` +
  bar(64, 71, 62, { fill: PAPER, opacity: 0.85 }) +
  rows(64, 116, [150, 118, 162, 96, 140, 108]) +
  path('M256 150H320') +
  path('M320 150V104H392') +
  path('M320 150v46h72') +
  card(392, 84, 44, 40, { stroke: SIG }) +
  card(392, 176, 44, 40, { stroke: SIG }) +
  dot(320, 150, 5);

/** Contracts and rates stacked in the Vault, feeding one query. Nothing
    enters the query from outside the stack — the account's own data only. */

/** The account's own contracts, and a question answered out of them. Nothing
    reaches the query from outside the stack. */
const intelligence =
  [2, 1, 0].map((i) => card(78 + i * 24, 58 + i * 20, 210, 116)).join('') +
  rows(150, 100, [128, 96, 140], 22) +
  path('M231 214v26') +
  card(96, 240, 270, 68, { stroke: SIG }) +
  bar(118, 262, 96, { fill: SIG }) +
  bar(118, 284, 214, { fill: L2 }) +
  dot(231, 214, 5);

/** A vetted list, radiating. The hub is dark because Horizon is not software
    an agency logs into — it is the list they search from inside OS. */
const horizon = (() => {
  const nodes = Array.from({ length: 8 }, (_, k) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 4;
    return [240 + Math.cos(a) * 108, 180 + Math.sin(a) * 108] as const;
  });
  return (
    ring(240, 180, 66) +
    ring(240, 180, 108, { stroke: L2, 'stroke-dasharray': '3 5' }) +
    nodes.map(([x, y]) => line(240, 180, x, y)).join('') +
    nodes.map(([x, y]) => dot(x, y, 7)).join('') +
    `<circle ${at({ cx: 240, cy: 180, r: 22, fill: INK })}/>`
  );
})();

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

/** Six categories on one grid. One is lit — you arrive here to pick one. */
const solutions =
  Array.from({ length: 6 }, (_, i) => {
    const x = 62 + (i % 3) * 122;
    const y = 92 + Math.floor(i / 3) * 106;
    const on = i === 1;
    return (
      card(x, y, 104, 86, on ? { stroke: SIG, fill: SIG_F } : {}) +
      bar(x + 16, y + 20, 44, on ? { fill: SIG } : {}) +
      bar(x + 16, y + 38, 62) +
      bar(x + 16, y + 54, 34)
    );
  }).join('');

/** Three channels, one brief. The point is the convergence, not the channels. */

/** Three channels, one brief. The convergence is the point, so the
    connectors merge on one bus rather than fanning. */
const inquiry =
  [0, 1, 2]
    .map((i) => card(52, 92 + i * 82, 108, 56) + bar(70, 112 + i * 82, 62) + bar(70, 128 + i * 82, 40))
    .join('') +
  [0, 1, 2].map((i) => elbow(160, 120 + i * 82, 236, 180, 200, { opacity: i === 1 ? 1 : 0.55 })).join('') +
  dot(236, 180, 5) +
  card(248, 106, 180, 148, { stroke: SIG }) +
  bar(272, 134, 108, { fill: SIG }) +
  rows(272, 162, [136, 96, 120], 24);

/** A thread with checkpoints. Two are amber: the escalation points are
    designed in, and they are the only amber on the page. */
const operations =
  line(72, 180, 408, 180, { stroke: L1 }) +
  [0, 1, 2, 3, 4, 5, 6]
    .map((i) => {
      const x = 72 + i * 56;
      const human = i === 2 || i === 5;
      return human
        ? dot(x, 180, 9, { fill: AMB }) + line(x, 180, x, 132, { stroke: AMB, 'stroke-width': 1.5 }) +
            bar(x - 20, 118, 40, { fill: AMB, opacity: 0.45 })
        : dot(x, 180, 6);
    })
    .join('') +
  rows(72, 226, [86, 132, 64], 20);

/** A proposal that carries the agency's own mark, and no one else's. */
const branding =
  card(126, 60, 228, 250) +
  `<rect ${at({ x: 126, y: 60, width: 228, height: 56, rx: 4, fill: PANEL })}/>` +
  ring(160, 88, 13, { stroke: SIG, 'stroke-width': 2 }) +
  bar(186, 85, 84, { fill: L2 }) +
  rows(154, 146, [172, 140, 186, 118, 160], 24) +
  line(154, 282, 326, 282, { stroke: L1, 'stroke-dasharray': '3 4' }) +
  `<text ${at({ x: 154, y: 300, fill: L2, 'font-size': 11, 'letter-spacing': 1.6 })}>YOUR MARK ONLY</text>`;

/** One thread, both sides. The spine is shared — that is the whole claim. */
const communication =
  line(240, 62, 240, 300, { stroke: L1 }) +
  [0, 1, 2].map((i) => card(74, 76 + i * 76, 140, 52) + bar(92, 94 + i * 76, 82) + bar(92, 110 + i * 76, 54)).join('') +
  [0, 1].map((i) => card(266, 114 + i * 76, 140, 52) + bar(284, 132 + i * 76, 74) + bar(284, 148 + i * 76, 96)).join('') +
  [0, 1, 2].map((i) => path(`M214 102h26`, { transform: `translate(0 ${i * 76})` })).join('') +
  [0, 1].map((i) => path(`M266 140H240`, { transform: `translate(0 ${i * 76})` })).join('') +
  [0, 1, 2].map((i) => dot(240, 102 + i * 76, 5)).join('');

/** A schedule that runs itself: instalments already placed, one due. */
const payments =
  card(64, 74, 352, 212) +
  line(64, 122, 416, 122, { stroke: L1 }) +
  rows(88, 92, [72], 0, { fill: L2 }) +
  [0, 1, 2, 3]
    .map((i) => {
      const y = 148 + i * 36;
      const now = i === 1;
      return (
        bar(88, y, 118, now ? { fill: SIG } : {}) +
        bar(240, y, 58) +
        (now
          ? dot(376, y + 2, 7)
          : `<circle ${at({ cx: 376, cy: y + 2, r: 6.5, fill: 'none', stroke: L2, 'stroke-width': 1.25 })}/>`)
      );
    })
    .join('');

/** One send, many arrivals — and the list it goes to is the agency's own. */

/** One send, five arrivals — off one bus, so the branches stay readable. */
const marketing =
  card(52, 152, 116, 64, { stroke: SIG }) +
  bar(70, 172, 62, { fill: SIG }) +
  bar(70, 190, 40) +
  [0, 1, 2, 3, 4]
    .map((i) => {
      const y = 92 + i * 46;
      return (
        elbow(168, 184, 300, y, 236, { opacity: 0.5 }) +
        card(300, y - 17, 116, 34) +
        bar(318, y - 5, 58, { fill: L2 })
      );
    })
    .join('') +
  dot(168, 184, 5);

/* ------------------------------------------------------------------ */
/* Customers                                                           */
/* ------------------------------------------------------------------ */

/** Two sides, one link between them. Neither side is the centre. */
const customers =
  [0, 1, 2].map((i) => card(56, 84 + i * 68, 132, 52) + bar(74, 104 + i * 68, 76) + bar(74, 120 + i * 68, 50)).join('') +
  [0, 1, 2].map((i) => card(292, 84 + i * 68, 132, 52) + bar(310, 104 + i * 68, 60) + bar(310, 120 + i * 68, 84)).join('') +
  path('M188 178h40M252 178h40') +
  ring(240, 178, 22, { stroke: SIG, 'stroke-width': 2 }) +
  dot(240, 178, 6);

/** The agent's board: trips moving left to right through the stages. */
const agentOs =
  [0, 1, 2, 3]
    .map((i) => {
      const x = 56 + i * 96;
      const n = [3, 2, 3, 1][i];
      return (
        bar(x, 74, 52, { fill: L2 }) +
        Array.from({ length: n }, (_, k) =>
          card(x, 96 + k * 58, 84, 46, i === 2 && k === 0 ? { stroke: SIG, fill: SIG_F } : {}) +
          bar(x + 14, 112 + k * 58, 44, i === 2 && k === 0 ? { fill: SIG } : {}) +
          bar(x + 14, 126 + k * 58, 30)
        ).join('')
      );
    })
    .join('');

/** Requests arriving where the supplier already works — no second inbox. */

/** Requests arriving where the supplier already works. One inbox, not two. */
const supplierOs =
  [0, 1, 2, 3]
    .map((i) => card(52, 96 + i * 56, 124, 42) + bar(70, 112 + i * 56, 56) + bar(70, 126 + i * 56, 36))
    .join('') +
  [0, 1, 2, 3].map((i) => elbow(176, 117 + i * 56, 268, 180, 220, { opacity: 0.55 })).join('') +
  dot(268, 180, 5) +
  card(280, 116, 148, 128, { stroke: SIG }) +
  bar(302, 142, 84, { fill: SIG }) +
  rows(302, 168, [104, 72, 92], 22);

/** Several people, one pipeline — the thing an agency actually shares. */
const travelAgencies =
  [0, 1, 2, 3]
    .map((i) => ring(96 + i * 66, 92, 15) + line(96 + i * 66, 107, 96 + i * 66, 148))
    .join('') +
  card(64, 148, 352, 44, { stroke: SIG }) +
  bar(88, 166, 96, { fill: SIG }) +
  bar(208, 166, 64) +
  bar(296, 166, 96) +
  [0, 1, 2].map((i) => card(64 + i * 122, 220, 108, 64) + rows(82 + i * 122, 240, [56, 38], 16)).join('');

/** One person, many trips at once. The stack is the point. */

/** One person, several trips open at once. The cascade is the point. */
const travelAgents =
  ring(96, 88, 22, { stroke: SIG, 'stroke-width': 2 }) +
  dot(96, 88, 6) +
  path('M96 110v40') +
  [3, 2, 1, 0]
    .map((i) =>
      card(72 + i * 26, 150 + i * 42, 300, 54) +
      bar(94 + i * 26, 170 + i * 42, i === 0 ? 118 : 92, i === 0 ? { fill: SIG } : {}) +
      bar(94 + i * 26, 186 + i * 42, 62)
    )
    .join('');

/** A single advisor: their own front door, their own name on it. */
const independentAdvisors =
  card(150, 62, 180, 236, { stroke: SIG }) +
  ring(240, 108, 20, { stroke: SIG, 'stroke-width': 2 }) +
  bar(190, 146, 100, { fill: SIG }) +
  rows(178, 178, [124, 96, 124], 24) +
  line(178, 258, 302, 258, { stroke: L1 }) +
  bar(178, 272, 62, { fill: L2 }) +
  [0, 1].map((i) => line(150 - 34, 180 + i * 40, 150, 180 + i * 40) + line(330, 180 + i * 40, 364, 180 + i * 40)).join('');

/** An audience, and the one form that turns it into an inquiry. */

/** An audience, and the one form that turns it into an inquiry. */
const creators = (() => {
  const R = 116;
  const fan = Array.from({ length: 9 }, (_, k) => {
    const a = -1.15 + (k * 2.3) / 8;
    return [104 + Math.cos(a) * R, 180 + Math.sin(a) * R] as const;
  });
  return (
    `<path ${at({
      d: `M${fan[0][0].toFixed(1)} ${fan[0][1].toFixed(1)}A${R} ${R} 0 0 1 ${fan[8][0].toFixed(1)} ${fan[8][1].toFixed(1)}`,
      stroke: L1, 'stroke-width': 1.25, fill: 'none',
    })}/>` +
    fan.map(([x, y]) => line(104, 180, x, y, { opacity: 0.45 })).join('') +
    fan.map(([x, y]) => `<circle ${at({ cx: x.toFixed(1), cy: y.toFixed(1), r: 5, fill: PAPER, stroke: L2, 'stroke-width': 1.25 })}/>`).join('') +
    dot(104, 180, 11) +
    path('M115 180h173') +
    card(288, 122, 140, 116, { stroke: SIG }) +
    bar(310, 146, 68, { fill: SIG }) +
    rows(310, 172, [96, 68, 96], 20)
  );
})();

/** The operator on the ground: one local hub, the services it runs. */
const dmcs = (() => {
  const spokes = Array.from({ length: 6 }, (_, k) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 3;
    return [188 + Math.cos(a) * 92, 180 + Math.sin(a) * 92] as const;
  });
  return (
    ring(188, 180, 92, { stroke: L2, 'stroke-dasharray': '3 5' }) +
    spokes.map(([x, y]) => line(188, 180, x, y)).join('') +
    spokes.map(([x, y]) => `<circle ${at({ cx: x, cy: y, r: 6, fill: PAPER, stroke: L2, 'stroke-width': 1.25 })}/>`).join('') +
    dot(188, 180, 16) +
    path('M296 180h44') +
    card(340, 132, 96, 96, { stroke: SIG }) +
    rows(358, 158, [56, 40, 56], 20)
  );
})();

/** Departures: the same trip, run again and again on a calendar. */
const tourOperators =
  card(64, 66, 352, 228) +
  line(64, 108, 416, 108, { stroke: L1 }) +
  bar(88, 82, 72, { fill: L2 }) +
  Array.from({ length: 21 }, (_, i) => {
    const x = 92 + (i % 7) * 46;
    const y = 138 + Math.floor(i / 7) * 52;
    const go = [2, 4, 9, 13, 16, 20].includes(i);
    return go
      ? `<rect ${at({ x: x - 15, y: y - 13, width: 30, height: 26, rx: 3, fill: SIG_F, stroke: SIG, 'stroke-width': 1.25 })}/>` + dot(x, y, 4)
      : `<circle ${at({ cx: x, cy: y, r: 3.5, fill: L1 })}/>`;
  }).join('');

/* ------------------------------------------------------------------ */
/* The rest                                                            */
/* ------------------------------------------------------------------ */

/** Three tiers, strictly additive: each contains the one below it whole. */

/** Three tiers on one baseline. Every tier carries the bars of the tier
    below it whole — that is what "strictly additive" means, and the teal
    band is the same OS layer in all three. */
const pricing =
  [0, 1, 2]
    .map((i) => {
      const x = 88 + i * 118;
      const h = 84 + i * 62;
      const y = 288 - h;
      return (
        card(x, y, 96, h) +
        Array.from({ length: i + 1 }, (_, k) =>
          `<rect ${at({
            x: x + 16, y: 262 - k * 30, width: 64, height: 16, rx: 3,
            fill: k === 0 ? SIG : L1,
          })}/>`
        ).join('')
      );
    })
    .join('') +
  line(70, 288, 410, 288, { stroke: L2 });

/** Containment, and one ring still open: SOC 2 and GDPR are targeted after
    the pilot, not held — so that ring is dashed and stays dashed. */
const security =
  ring(240, 180, 118, { stroke: L2, 'stroke-dasharray': '5 6' }) +
  ring(240, 180, 84) +
  ring(240, 180, 50, { stroke: SIG, 'stroke-width': 2 }) +
  `<rect ${at({ x: 222, y: 166, width: 36, height: 30, rx: 3, fill: SIG })}/>` +
  `<path ${at({ d: 'M229 166v-9a11 11 0 0 1 22 0v9', stroke: SIG, 'stroke-width': 2.5, fill: 'none' })}/>` +
  [0, 1, 2, 3]
    .map((i) => {
      const a = -Math.PI / 4 + (i * Math.PI) / 2;
      return `<circle ${at({ cx: 240 + Math.cos(a) * 84, cy: 180 + Math.sin(a) * 84, r: 6, fill: PAPER, stroke: L2, 'stroke-width': 1.25 })}/>`;
    })
    .join('');

/** The route we ran by hand first: waypoints, and the line drawn through. */
const about = (() => {
  const pts = [
    [72, 244],
    [138, 196],
    [206, 216],
    [274, 138],
    [340, 160],
    [408, 104],
  ] as const;
  return (
    Array.from({ length: 5 }, (_, i) => line(64, 96 + i * 38, 416, 96 + i * 38, { stroke: L1, opacity: 0.7 })).join('') +
    path(`M${pts.map(([x, y]) => `${x} ${y}`).join('L')}`) +
    pts.map(([x, y], i) => (i === pts.length - 1 ? dot(x, y, 8) : `<circle ${at({ cx: x, cy: y, r: 5, fill: PAPER, stroke: SIG, 'stroke-width': 2 })}/>`)).join('')
  );
})();

/** One link, and it opens without a password. */

/** One link, and it opens without a password. */
const signup =
  card(232, 92, 196, 176) +
  `<rect ${at({ x: 232, y: 92, width: 196, height: 28, rx: 4, fill: PANEL })}/>` +
  rows(256, 148, [136, 104, 148, 88], 26) +
  path('M126 180h106') +
  `<rect ${at({ x: 62, y: 166, width: 34, height: 28, rx: 14, fill: 'none', stroke: SIG, 'stroke-width': 2 })}/>` +
  `<rect ${at({ x: 92, y: 166, width: 34, height: 28, rx: 14, fill: 'none', stroke: SIG, 'stroke-width': 2 })}/>` +
  dot(232, 180, 5) +
  `<text ${at({ x: 62, y: 224, fill: L2, 'font-size': 11, 'letter-spacing': 1.6 })}>NO PASSWORD</text>`;

/** Pieces, stacked. Each one has a length you can see before you open it. */
const blog =
  [0, 1, 2]
    .map((i) => {
      const y = 74 + i * 84;
      const first = i === 0;
      return (
        card(64, y, 352, 66, first ? { stroke: SIG } : {}) +
        bar(88, y + 18, first ? 148 : 118, first ? { fill: SIG } : { fill: L2 }) +
        bar(88, y + 36, 232) +
        bar(88, y + 48, 168) +
        `<rect ${at({ x: 356, y: y + 18, width: 36, height: 30, rx: 3, fill: first ? SIG_F : PANEL })}/>`
      );
    })
    .join('') +
  line(64, 322, 416, 322, { stroke: L1, 'stroke-dasharray': '3 4' });

/* ------------------------------------------------------------------ */

/** Keyed by route, so a page asking for art that does not exist fails in the
    build rather than rendering an empty frame. */
export const PAGE_ART: Record<string, string> = {
  product,
  os,
  intelligence,
  horizon,
  solutions,
  'solutions/inquiry': inquiry,
  'solutions/operations': operations,
  'solutions/branding': branding,
  'solutions/communication': communication,
  'solutions/payments': payments,
  'solutions/marketing': marketing,
  customers,
  'customers/agent-os': agentOs,
  'customers/supplier-os': supplierOs,
  'customers/travel-agencies': travelAgencies,
  'customers/travel-agents': travelAgents,
  'customers/independent-advisors': independentAdvisors,
  'customers/creators': creators,
  'customers/dmcs': dmcs,
  'customers/tour-operators': tourOperators,
  pricing,
  security,
  about,
  signup,
  blog,
};

export const PAGE_ART_ALT: Record<string, string> = {
  product: 'Four planes resting on one another, the base one marked — every tier starts on OS.',
  os: 'A record card with one link leaving it and arriving at two panels at once.',
  intelligence: 'A stack of contracts feeding a single query mark, labelled Vault.',
  horizon: 'A dark hub with eight supplier nodes on a dashed ring around it.',
  solutions: 'Six category tiles on a grid, one of them marked.',
  'solutions/inquiry': 'Three channel panels converging on one structured brief.',
  'solutions/operations': 'A thread of checkpoints, two of them amber where a person takes over.',
  'solutions/branding': 'A proposal document carrying a single mark, with the footer line struck out.',
  'solutions/communication': 'Two columns of messages either side of one shared spine.',
  'solutions/payments': 'A schedule of instalments, one marked as due.',
  'solutions/marketing': 'One panel fanning out to five recipients.',
  customers: 'Two facing columns of panels meeting at a single link in the middle.',
  'customers/agent-os': 'A board of trips in four columns, one card marked.',
  'customers/supplier-os': 'Four requests arriving at one panel — no second inbox.',
  'customers/travel-agencies': 'Four people above one shared pipeline bar.',
  'customers/travel-agents': 'One person above a stack of trips running at once.',
  'customers/independent-advisors': 'A single branded panel standing on its own.',
  'customers/creators': 'An audience fanning into one inquiry form.',
  'customers/dmcs': 'A local hub with six ground services around it, feeding one panel.',
  'customers/tour-operators': 'A calendar grid with six departures marked.',
  pricing: 'Three tiers of ascending height, each containing the bars of the one below.',
  security: 'Concentric rings around a lock, the outermost dashed — targeted, not held.',
  about: 'A route drawn through six waypoints across a ruled field.',
  signup: 'A single link running into a panel that opens without a password.',
  blog: 'Three stacked article cards, the first one marked.',
};
