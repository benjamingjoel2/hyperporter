/* Mobile audit. The earlier pass only checked structure (overflow, dead
   links, empty sections) and missed things a person sees instantly — text
   overlapping text, controls too small to tap, content jammed to the edge.
   This checks those. */
/* Playwright is not a dependency of this site; it is resolved from
   wherever it happens to be installed. Run these against a server on
   :4399 — `npm run build && npx http-server dist -p 4399 -s -c-1`. */
const require_ = (await import('node:module')).createRequire(import.meta.url);
const pkg = require_(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pkg;

const ROUTES = process.argv[2] ? [process.argv[2]] : [
  '/', '/product', '/portal', '/autopilot', '/intelligence', '/horizon',
  '/tools/', '/tools/portal/', '/automations/', '/automations/conversion/',
  '/integrations/', '/integrations/whatsapp/', '/solutions/', '/solutions/inquiry/',
  '/customers/', '/customers/dmcs/', '/pricing', '/security', '/about/',
  '/destinations/', '/destinations/kenya/', '/regions/africa/', '/signup', '/404',
];

const b = await chromium.launch();
const found = new Map();
const add = (k, d, r) => {
  if (!found.has(k)) found.set(k, new Map());
  const m = found.get(k);
  if (!m.has(d)) m.set(d, { routes: new Set(), n: 0 });
  m.get(d).routes.add(r); m.get(d).n++;
};

for (const route of ROUTES) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  try { await p.goto('http://localhost:4399' + route, { waitUntil: 'load', timeout: 20000 }); }
  catch { await p.close(); continue; }
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await p.evaluate(() => document.querySelectorAll('.rv').forEach(n => n.classList.add('in')));
  await p.waitForTimeout(400);

  const res = await p.evaluate(() => {
    const out = [];
    const W = document.documentElement.clientWidth;
    const vis = (e) => {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.1) return false;
      const r = e.getBoundingClientRect();
      if (!(r.width > 0 && r.height > 0)) return false;
      /* An element inside a collapsed accordion panel still reports a full
         box: the panel is `overflow:hidden; height:0`, so the child is
         clipped away but its rect is unchanged. Without this walk the
         overlap check reported fifteen pairs that paint nothing. */
      for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
        const ac = getComputedStyle(a);
        if (ac.overflow === 'visible' && ac.overflowY === 'visible') continue;
        const ar = a.getBoundingClientRect();
        if (ar.height < 1 || ar.width < 1) return false;
        if (r.bottom <= ar.top || r.top >= ar.bottom) return false;
      }
      return true;
    };
    const label = (e) => (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 26);

    // --- tap targets --------------------------------------------------
    for (const e of document.querySelectorAll('a,button,input,select,summary,[role="button"]')) {
      if (!vis(e)) continue;
      if (e.closest('.mk')) continue;                 // inside a mock-up screen: a picture, not a control
      const r = e.getBoundingClientRect();
      if (r.height < 40 || r.width < 40) {
        const inText = e.closest('p,li,.post-body');  // an inline link in prose is exempt
        if (!inText) out.push(['tap target under 40px', `${e.tagName.toLowerCase()}.${(e.className || '').toString().slice(0, 20)} ${Math.round(r.width)}x${Math.round(r.height)} "${label(e)}"`]);
      }
    }

    // --- text that overlaps other text ---------------------------------
    const texts = [...document.querySelectorAll('span,b,small,p,h1,h2,h3,a,li,td,th')]
      .filter(e => vis(e) && e.firstChild && e.firstChild.nodeType === 3 && e.textContent.trim().length > 2)
      .filter(e => !e.closest('.mk'))
      .map(e => ({ e, r: e.getBoundingClientRect() }))
      .filter(x => x.r.top < 3000 && x.r.height < 200);
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i], c = texts[j];
        if (a.e.contains(c.e) || c.e.contains(a.e)) continue;
        const ox = Math.min(a.r.right, c.r.right) - Math.max(a.r.left, c.r.left);
        const oy = Math.min(a.r.bottom, c.r.bottom) - Math.max(a.r.top, c.r.top);
        if (ox > 6 && oy > 6) {
          // ignore when one is an ancestor-positioned decoration
          out.push(['text over text', `"${label(a.e)}" x "${label(c.e)}" (${Math.round(ox)}x${Math.round(oy)}px)`]);
          j = texts.length;
        }
      }
    }

    // --- gutter: content jammed to the screen edge ----------------------
    for (const e of document.querySelectorAll('h1,h2,h3,p,li,.btn,.wrap > *')) {
      if (!vis(e)) continue;
      if (e.closest('.mk,.rail,.lg-cat-rail,[data-rail]')) continue;
      const r = e.getBoundingClientRect();
      if (r.width < 40) continue;
      if (r.left < 12 || r.right > W - 12) {
        const cs = getComputedStyle(e);
        if (cs.position === 'absolute' || cs.position === 'fixed') continue;
        out.push(['content within 12px of the edge', `${e.tagName.toLowerCase()}.${(e.className || '').toString().slice(0, 20)} left=${Math.round(r.left)} right=${Math.round(W - r.right)}`]);
      }
    }

    // --- type too small to read on a phone ------------------------------
    for (const e of document.querySelectorAll('p,li,span,a,td,small')) {
      if (!vis(e) || !e.firstChild || e.firstChild.nodeType !== 3) continue;
      if (e.closest('.mk')) continue;
      const fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs < 11.5 && e.textContent.trim().length > 20)
        out.push(['body text under 11.5px', `${fs}px ${e.tagName.toLowerCase()}.${(e.className || '').toString().slice(0, 20)}`]);
    }
    return out;
  });
  for (const [k, d] of res) add(k, d, route);
  await p.close();
}
await b.close();

console.log(`=== ${ROUTES.length} routes at 390x844 (mobile emulation)\n`);
if (!found.size) console.log('clean');
for (const [k, m] of [...found.entries()].sort((a, z) => {
  const n = x => [...x[1].values()].reduce((s, v) => s + v.n, 0); return n(z) - n(a);
})) {
  const total = [...m.values()].reduce((s, v) => s + v.n, 0);
  console.log(`--- ${k}  (${total} across ${new Set([...m.values()].flatMap(v => [...v.routes])).size} routes)`);
  for (const [d, rs] of [...m.entries()].sort((a, z) => z[1].n - a[1].n).slice(0, 7))
    console.log(`     ${String(rs.n).padStart(4)}x  ${d}   e.g. ${[...rs.routes].slice(0, 2).join(' ')}`);
  console.log();
}
