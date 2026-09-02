/**
 * Card artwork for the /preview/legora design study.
 *
 * Drawn for a 320x400 (4:5) frame, because that is what the reference uses —
 * its card tiles measure 324x405. An earlier landscape composition dropped
 * into a portrait box just letterboxes, with dead bands top and bottom, so
 * each scene is composed vertically rather than scaled.
 *
 * The Autopilot scene is driven off STAGES rather than hand-numbered, so the
 * illustration cannot drift from the pipeline shown everywhere else on the
 * site. Amber marks human-touchpoint stages only — that mapping is reserved
 * site-wide and must not be used decoratively.
 */
import { STAGES } from './stages';

const TEAL = '#0E4B52';
const AMBER = '#9A5F0B';
const GROUND = '#EAE9E6';
const PAPER = '#FCFCFB';
const RULE = '#C8C6C1';
const EDGE = '#D6D4CF';

const ground = `<rect width="320" height="400" fill="${GROUND}"/>`;

/** Row widths for the CRM card — varied so it reads as records, not a grid. */
const OS_ROWS = [132, 168, 104, 150, 120, 160, 88];

const os =
  ground +
  `<rect x="46" y="58" width="228" height="284" rx="3" fill="${PAPER}" stroke="${EDGE}"/>` +
  `<rect x="46" y="58" width="228" height="34" rx="3" fill="${TEAL}" opacity=".9"/>` +
  `<rect x="62" y="70" width="58" height="7" rx="3.5" fill="#FFF" opacity=".8"/>` +
  OS_ROWS.map(
    (w, i) => `<rect x="62" y="${116 + i * 32}" width="${w}" height="7" rx="3.5" fill="${RULE}"/>`
  ).join('');

/*
 * A bare spine of dots left the frame almost empty — its three siblings each
 * fill their 320 width and this one used about 20px of it, so on the card it
 * read as a broken illustration rather than a diagram. Same nine stages, but
 * alternating either side of the spine, which is also the arrangement the
 * /autopilot zigzag itself uses.
 */
const AP_PITCH = 38;
const AP_TOP = 200 - ((STAGES.length - 1) * AP_PITCH) / 2;
/** Chip contents, varied so the run reads as work items rather than a scale. */
const AP_FILL = [30, 22, 34, 26, 30, 20, 32, 24, 28];

const autopilot =
  ground +
  `<path d="M160 ${AP_TOP - 24}v${(STAGES.length - 1) * AP_PITCH + 48}" stroke="#D2D0CB" stroke-width="2"/>` +
  STAGES.map((s, i) => {
    const y = AP_TOP + i * AP_PITCH;
    const human = s.cls === 'Human touchpoint';
    const right = i % 2 === 0;
    const key = human ? AMBER : TEAL;
    const stub = right ? `M170 ${y}H206` : `M150 ${y}H114`;
    const cx = right ? 206 : 56;
    return (
      `<path d="${stub}" stroke="${key}" stroke-width="2" opacity=".45"/>` +
      `<rect x="${cx}" y="${y - 9}" width="58" height="18" rx="4" ` +
      `fill="${human ? AMBER : PAPER}" stroke="${human ? AMBER : EDGE}"/>` +
      `<rect x="${cx + 9}" y="${y - 2.5}" width="${AP_FILL[i]}" height="5" rx="2.5" ` +
      `fill="${human ? '#FFF' : RULE}" opacity="${human ? '.85' : '1'}"/>` +
      `<circle cx="160" cy="${y}" r="${human ? 9 : 6}" fill="${key}"/>`
    );
  }).join('');

const intelligence =
  ground +
  `<g stroke="${EDGE}" fill="${PAPER}">` +
  [0, 1, 2]
    .map((i) => `<rect x="${52 + i * 24}" y="${66 + i * 24}" width="150" height="196" rx="3"/>`)
    .join('') +
  `</g><g fill="${RULE}">` +
  [96, 112, 74, 100]
    .map((w, i) => `<rect x="118" y="${142 + i * 26}" width="${w}" height="6" rx="3"/>`)
    .join('') +
  `</g>` +
  `<path d="M160 322v22" stroke="${TEAL}" stroke-width="2"/>` +
  `<circle cx="160" cy="358" r="14" fill="${TEAL}"/>` +
  `<path d="M154 358h12M160 352v12" stroke="#FFF" stroke-width="2"/>`;

const ring = Array.from({ length: 6 }, (_, k) => {
  const a = -Math.PI / 2 + (k * Math.PI) / 3;
  return [(160 + Math.cos(a) * 92).toFixed(1), (200 + Math.sin(a) * 92).toFixed(1)];
});

const horizon =
  ground +
  `<g stroke="#D2D0CB" fill="none"><circle cx="160" cy="200" r="52"/><circle cx="160" cy="200" r="92"/></g>` +
  `<g stroke="#BFBDB8">` +
  ring.map(([x, y]) => `<path d="M160 200L${x} ${y}"/>`).join('') +
  `</g><g fill="${TEAL}">` +
  ring.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('') +
  `</g><circle cx="160" cy="200" r="10" fill="#0D1016"/>`;

/** Keyed by product slug, so a new product fails loudly rather than silently. */
export const CARD_ART: Record<string, string> = { os, autopilot, intelligence, horizon };

export const CARD_ALT: Record<string, string> = {
  os: 'Abstract mark: a CRM record card with a header bar and seven ruled rows.',
  autopilot:
    'Abstract mark: a nine-stage pipeline running down a spine, each stage a card set alternately either side, with the two human-touchpoint stages marked in amber.',
  intelligence: 'Abstract mark: a stack of contract documents feeding a single query.',
  horizon: 'Abstract mark: a radial network of supplier nodes around a centre point.',
};
