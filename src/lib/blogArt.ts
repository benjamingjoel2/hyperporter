/**
 * Blog cover artwork — one per post, generated from the post's own slug.
 *
 * The reference blog these layouts come from is photography-led. Ours has no
 * photography licensed yet, so the covers are drawn, and they are drawn
 * heavier than the page illustrations in lib/pageArt.ts on purpose: a cover
 * is standing in for a photograph at 900px wide and again at 340px, and a
 * hairline composition that reads at one size disappears at the other.
 * Filled bands and masses survive both.
 *
 * The archetype comes from the post's category, so a reader can tell an
 * Operations piece from a Product one before reading the label; the variation
 * inside the archetype comes from the slug, so no two posts collide.
 */

/* The reference's covers are photographs: edge-to-edge colour, no frame, and
   dark enough to carry the page. Drawn covers on a pale ground read as empty
   panels next to them, so these are dark grounds with the composition in
   light — the same weight a photograph has on a light page. */
const GROUNDS = ['#0D1016', '#12242A', '#1B2024', '#0E2C31', '#151A21'];
const INK = '#0D1016';
const SIG = '#2E8C97';
const SIG_HI = '#4FB3BD';
const LINE = 'rgba(255,255,255,.22)';
const PANEL = 'rgba(255,255,255,.90)';
const PANEL_DIM = 'rgba(255,255,255,.13)';
const AMBER = '#C98A2E';

const W = 960;
const H = 540;

/** Deterministic per-slug: the same post draws the same cover every build. */
function seeded(slug: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

const rect = (x: number, y: number, w: number, h: number, fill: string, o = 1): string =>
  `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${fill}"${o < 1 ? ` opacity="${o}"` : ''}/>`;

const circ = (cx: number, cy: number, r: number, fill: string, o = 1): string =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}"${o < 1 ? ` opacity="${o}"` : ''}/>`;

const stroke = (d: string, color: string, w = 3, o = 1): string =>
  `<path d="${d}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round"${o < 1 ? ` opacity="${o}"` : ''}/>`;

/* ---------------------------------------------------------------- */

/** Product — interface planes, one lit. Panels of a thing being built. */
function product(r: () => number, ground: string): string {
  const cols = 3 + Math.floor(r() * 2);
  const lit = Math.floor(r() * cols);
  const gap = 26;
  const cw = (W - 160 - gap * (cols - 1)) / cols;
  let s = rect(0, 0, W, H, ground);
  for (let i = 0; i < cols; i++) {
    const x = 80 + i * (cw + gap);
    const h = 190 + r() * 190;
    const y = (H - h) / 2;
    s += rect(x, y, cw, h, i === lit ? SIG : PANEL_DIM);
    s += rect(x, y, cw, 34, i === lit ? SIG_HI : 'rgba(255,255,255,.26)');
    const rowsN = 3 + Math.floor(r() * 3);
    for (let k = 0; k < rowsN; k++) {
      const rw = cw * (0.34 + r() * 0.44);
      s += rect(x + 22, y + 68 + k * 30, rw, 9, i === lit ? INK : 'rgba(255,255,255,.34)', i === lit ? 0.45 : 1);
    }
  }
  return s;
}

/** Operations — a run of stages across the frame, with the human ones marked. */
function operations(r: () => number, ground: string): string {
  const n = 7 + Math.floor(r() * 3);
  const y = H / 2;
  const human = new Set([1 + Math.floor(r() * (n - 2)), 1 + Math.floor(r() * (n - 2))]);
  let s = rect(0, 0, W, H, ground);
  s += stroke(`M70 ${y}H${W - 70}`, LINE, 4);
  for (let i = 0; i < n; i++) {
    const x = 70 + (i * (W - 140)) / (n - 1);
    const isH = human.has(i);
    const up = i % 2 === 0;
    const len = 60 + r() * 70;
    s += stroke(`M${x} ${y}V${up ? y - len : y + len}`, isH ? AMBER : LINE, 3, isH ? 0.9 : 1);
    s += rect(x - 46, up ? y - len - 44 : y + len, 92, 44, isH ? AMBER : PANEL_DIM, isH ? 0.3 : 1);
    s += rect(x - 30, up ? y - len - 28 : y + len + 16, 60, 9, isH ? AMBER : 'rgba(255,255,255,.42)');
    s += circ(x, y, isH ? 18 : 12, isH ? AMBER : SIG);
  }
  return s;
}

/** Industry — a field of actors, some connected, most not. The market. */
function industry(r: () => number, ground: string): string {
  let s = rect(0, 0, W, H, ground);
  const pts: [number, number][] = [];
  for (let i = 0; i < 26; i++) {
    pts.push([70 + r() * (W - 140), 60 + r() * (H - 120)]);
  }
  const hub = pts[Math.floor(r() * pts.length)];
  for (const [x, y] of pts) {
    const near = Math.hypot(x - hub[0], y - hub[1]) < 300;
    if (near) s += stroke(`M${hub[0].toFixed(1)} ${hub[1].toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`, SIG, 2, 0.28);
  }
  for (const [x, y] of pts) {
    const near = Math.hypot(x - hub[0], y - hub[1]) < 300;
    s += circ(x, y, near ? 11 : 8, near ? SIG_HI : 'rgba(255,255,255,.30)');
  }
  s += circ(hub[0], hub[1], 30, SIG_HI);
  return s;
}

/** Principles — containment. Concentric bands around one held centre. */
function principles(r: () => number, ground: string): string {
  let s = rect(0, 0, W, H, ground);
  const cx = W / 2 + (r() - 0.5) * 180;
  const cy = H / 2;
  const bands = 4 + Math.floor(r() * 3);
  for (let i = bands; i >= 1; i--) {
    const rad = 60 + i * 42;
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="${rad}" fill="none" stroke="${i === bands ? LINE : SIG}" stroke-width="${i === bands ? 4 : 3}" opacity="${i === bands ? 1 : 0.2 + (bands - i) * 0.12}"${i === bands ? ' stroke-dasharray="14 12"' : ''}/>`;
  }
  s += circ(cx, cy, 46, SIG_HI);
  const spokes = 5 + Math.floor(r() * 3);
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 + r() * 0.4;
    const rad = 102 + Math.floor(r() * 3) * 42;
    s += circ(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, 13, ground);
    s += `<circle cx="${(cx + Math.cos(a) * rad).toFixed(1)}" cy="${(cy + Math.sin(a) * rad).toFixed(1)}" r="13" fill="none" stroke="${SIG}" stroke-width="3"/>`;
  }
  return s;
}

/** Growth — a field that climbs. Columns, and the line drawn through them. */
function growth(r: () => number, ground: string): string {
  let s = rect(0, 0, W, H, ground);
  const n = 8 + Math.floor(r() * 4);
  const base = H - 90;
  const cw = (W - 160) / n;
  const tops: number[] = [];
  let v = 0.22 + r() * 0.16;
  for (let i = 0; i < n; i++) {
    v = Math.min(0.92, v + 0.02 + r() * 0.12);
    tops.push(base - v * (H - 220));
  }
  for (let i = 0; i < n; i++) {
    const x = 80 + i * cw;
    s += rect(x + 6, tops[i], cw - 12, base - tops[i], i === n - 1 ? SIG_HI : PANEL_DIM);
    if (i !== n - 1) s += rect(x + 6, tops[i], cw - 12, 8, 'rgba(255,255,255,.34)');
  }
  s += stroke(`M${tops.map((t, i) => `${(80 + i * cw + cw / 2).toFixed(1)} ${t.toFixed(1)}`).join('L')}`, SIG_HI, 4);
  tops.forEach((t, i) => {
    s += circ(80 + i * cw + cw / 2, t, 9, i === n - 1 ? PANEL : SIG_HI);
  });
  s += stroke(`M70 ${base}H${W - 70}`, LINE, 4);
  return s;
}

const ARCHETYPES: Record<string, (r: () => number, ground: string) => string> = {
  Product: product,
  Operations: operations,
  Industry: industry,
  Principles: principles,
  Growth: growth,
};

/**
 * A cover for one post. `cat` picks the archetype and `slug` varies it, so
 * the drawing is stable across builds and unique per post.
 */
export function blogCover(slug: string, cat: string): string {
  const draw = ARCHETYPES[cat] ?? industry;
  const r = seeded(slug + cat);
  const ground = GROUNDS[Math.floor(r() * GROUNDS.length)];
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${draw(r, ground)}</svg>`;
}

/** Covers are decorative — the headline beside them carries the meaning — so
    they are aria-hidden rather than given alt text that repeats it. */
export const COVER_HIDDEN = true;
