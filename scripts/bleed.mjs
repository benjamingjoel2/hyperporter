/* Does anything show through the bar? Sample the pixels inside the header
   at two scroll positions on the same page: if content is bleeding through,
   the bar's pixels change as the page moves underneath it. */
/* Playwright is not a dependency of this site; it is resolved from
   wherever it happens to be installed. Run these against a server on
   :4399 — `npm run build && npx http-server dist -p 4399 -s -c-1`. */
const require_ = (await import('node:module')).createRequire(import.meta.url);
const pkg = require_(process.env.PLAYWRIGHT_PATH || 'playwright');
const { chromium } = pkg;
const b = await chromium.launch();

for (const route of ['/', '/tools/portal/', '/pricing', '/destinations/']) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:4399' + route, { waitUntil: 'load' });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await p.waitForTimeout(600);

  const sample = async (y) => {
    await p.evaluate(v => window.scrollTo(0, v), y);
    await p.waitForTimeout(400);
    const h = await p.evaluate(() => Math.round(document.querySelector('header.top').getBoundingClientRect().height));
    const buf = await p.screenshot({ clip: { x: 0, y: 0, width: 390, height: h } });
    return { h, b64: buf.toString('base64') };
  };
  const a = await sample(1200), c = await sample(1260);

  const diff = await p.evaluate(async ({ x, y }) => {
    const load = async b64 => { const i = new Image(); i.src = 'data:image/png;base64,' + b64; await i.decode(); return i; };
    const [A, C] = await Promise.all([load(x), load(y)]);
    const cv = img => { const k = document.createElement('canvas'); k.width = img.width; k.height = img.height;
      k.getContext('2d').drawImage(img, 0, 0); return k.getContext('2d').getImageData(0, 0, img.width, img.height).data; };
    const P = cv(A), Q = cv(C);
    let max = 0, over3 = 0, n = 0;
    for (let i = 0; i < P.length; i += 4) {
      const d = Math.max(Math.abs(P[i] - Q[i]), Math.abs(P[i + 1] - Q[i + 1]), Math.abs(P[i + 2] - Q[i + 2]));
      max = Math.max(max, d); if (d > 3) over3++; n++;
    }
    return { maxChannelDiff: max, pctPixelsChanging: +(100 * over3 / n).toFixed(2) };
  }, { x: a.b64, y: c.b64 });

  console.log(`${route.padEnd(20)} bar ${a.h}px  →  ${JSON.stringify(diff)}`);
  await p.close();
}
await b.close();
