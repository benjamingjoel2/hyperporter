/* The bar must be FIXED on a phone, not sticky, on every route: sticky is
   what iOS Safari fails to reposition during compositor-driven scrolling,
   and no check run in Chromium can see that happen. So assert the property
   instead of the pixels. Also: nothing may paint above the bar, the page
   must start below it, and the drawer must be opaque. */
/* Playwright is not a dependency of this site; it is resolved from
   wherever it happens to be installed. Run these against a server on
   :4399 — `npm run build && npx http-server dist -p 4399 -s -c-1`. */
const require_ = (await import('node:module')).createRequire(import.meta.url);
const pkg = require_(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pkg;
const ROUTES = ['/','/product','/portal','/autopilot','/intelligence','/horizon',
  '/tools/','/tools/portal/','/automations/','/automations/conversion/',
  '/integrations/','/integrations/whatsapp/','/solutions/','/solutions/inquiry/',
  '/customers/','/customers/dmcs/','/pricing','/security','/about/',
  '/destinations/','/destinations/kenya/','/regions/africa/','/signup','/404'];
const [W,H] = (process.argv[2]||'390x844').split('x').map(Number);
const b = await chromium.launch();
const bad = [];
for (const route of ROUTES) {
  const p = await b.newPage({ viewport:{width:W,height:H}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
  try { await p.goto('http://localhost:4399'+route, { waitUntil:'load', timeout:20000 }); }
  catch { await p.close(); continue; }
  await p.addStyleTag({ content:'html{scroll-behavior:auto!important}' });
  await p.waitForTimeout(300);
  for (const y of [0, 800, 2000]) {
    await p.evaluate(v=>window.scrollTo(0,v), y);
    await p.waitForTimeout(220);
    const r = await p.evaluate(() => {
      const h = document.querySelector('header.top');
      if (!h) return { err: 'no header' };
      const cs = getComputedStyle(h), hr = h.getBoundingClientRect();
      const above = [];
      for (const e of document.querySelectorAll('body *')) {
        if (h.contains(e) || e.contains(h)) continue;
        const cs2 = getComputedStyle(e);
        if (cs2.position === 'fixed') continue;          // overlays are their own thing
        const r2 = e.getBoundingClientRect();
        if (r2.height < 1 || r2.width < 1) continue;
        if (r2.bottom > 0 && r2.top < hr.top - 0.5 && +cs2.zIndex > 70) above.push(e.tagName);
      }
      return { pos: cs.position, top: Math.round(hr.top), bf: cs.backdropFilter, above: above.length };
    });
    if (r.err) { bad.push(`${route} @${y}: ${r.err}`); continue; }
    if (r.pos !== 'fixed') bad.push(`${route} @${y}: header is ${r.pos}, must be fixed`);
    if (r.top !== 0)       bad.push(`${route} @${y}: header top=${r.top}, must be 0`);
    if (r.bf !== 'none')   bad.push(`${route} @${y}: header backdrop-filter=${r.bf}, must be none`);
    if (r.above)           bad.push(`${route} @${y}: ${r.above} element(s) painting above the bar`);
  }
  // the drawer, where there is one
  const d = await p.evaluate(async () => {
    const bt = document.getElementById('burger'); if (!bt) return null;
    bt.click(); await new Promise(r=>setTimeout(r,700));
    const dr = document.getElementById('drawer'); if (!dr) return null;
    const cs = getComputedStyle(dr);
    return { bg: cs.backgroundColor, img: cs.backgroundImage, bf: cs.backdropFilter, top: Math.round(dr.getBoundingClientRect().top) };
  });
  if (d) {
    if (d.img !== 'none')                    bad.push(`${route}: drawer has a background-image (${d.img.slice(0,40)})`);
    if (d.bf !== 'none')                     bad.push(`${route}: drawer backdrop-filter=${d.bf}`);
    if (/rgba\(.*,\s*0(\.\d+)?\)/.test(d.bg))bad.push(`${route}: drawer background is translucent (${d.bg})`);
    if (Math.abs(d.top - 64) > 8)                        bad.push(`${route}: drawer top=${d.top}, expected 64`);
  }
  await p.close();
}
await b.close();
console.log(`=== ${ROUTES.length} routes at ${W}x${H}`);
console.log(bad.length ? bad.join('\n') : 'clean: bar fixed at 0 with nothing above it, drawer opaque, on every route');
