/**
 * The v2 homepage's behaviour, ported from the founder's design file at
 * public/preview/v2.html: reveal-on-scroll, the counters, and the product
 * band that pins while its panels are swapped.
 *
 * Plain JavaScript on purpose — it is the design file's own code, kept close
 * enough to it that the two can be read side by side. The class names carry a
 * `v-` prefix here because the design's names (.hero, .wrap, .pill, .feat …)
 * collide with the site's own global.css; the prefix keeps the two apart.
 *
 * The design file is a standalone document with its own navigation and its
 * own router; this site has neither, so that part is not ported.
 */

const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ============ scroll motion ============ */
(function () {
  if (RM) return;

  /* split the two-tone display headings into masked lines */
  document.querySelectorAll('.v-disp').forEach((h) => {
    h.querySelectorAll(':scope>b,:scope>i').forEach((el) => {
      const ln = document.createElement('span'); ln.className = 'v-ln';
      const inner = document.createElement('span'); inner.innerHTML = el.innerHTML;
      el.innerHTML = ''; ln.appendChild(inner); el.appendChild(ln);
    });
  });

  /* mark everything that should animate in */
  const groups = [
    ['.v-lead>*:not(.v-disp)', 0], ['.v-center>*:not(.v-disp)', 0], ['.v-bloghero>*:not(.v-disp)', 0],
    ['.v-hero .v-badge', 0], ['.v-hero p.v-sub', 0], ['.v-hero .v-cta', 0], ['.v-phone', 0],
    ['.v-statrow div', 90], ['.v-strip span', 45],
    ['.v-feat .v-shot', 0], ['.v-feat h3', 0], ['.v-feat p', 0], ['.v-feat .v-pill-o', 0],
    ['.v-sticky a', 70], ['.v-ind', 110], ['.v-pcard', 80],
    ['.v-bigcta h2', 0], ['.v-bigcta .v-pill', 0],
  ];
  groups.forEach(([sel, stepMs]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.setAttribute('data-rv', '');
      if (stepMs) el.style.transitionDelay = (i * stepMs) + 'ms';
    });
  });

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('v-in');
    io.unobserve(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-rv],.v-disp').forEach((el) => io.observe(el));

  /* hero photo drifts slower than the page */
  const bg = document.querySelector('.v-hero-bg');
  if (!bg) return;
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, 900);
      bg.style.transform = 'translate3d(0,' + (y * .22).toFixed(1) + 'px,0) scale(1.06)';
      ticking = false;
    });
  }, { passive: true });
})();

/* counters */
const statsIO = new IntersectionObserver((es, o) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.querySelectorAll('b[data-to]').forEach((el) => {
    const to = +el.dataset.to;
    if (RM) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 900;
    (function f(now) {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f); else el.textContent = to;
    })(t0);
  });
  o.unobserve(e.target);
}), { threshold: .45 });
const statrow = document.getElementById('statrow');
if (statrow) statsIO.observe(statrow);

/* ---- the pinned product band -------------------------------------------
   The stage sticks for as many screens of scroll as there are layers, and the
   panel inside it is swapped one layer at a time, rather than the reader
   scrolling past a long column. Below 1000px, and with reduced motion, the
   CSS unpins it and the panels simply stack — so this only drives classes. */
const links = [...document.querySelectorAll('#sticky a')];
const feats = links.map((a) => document.querySelector(a.getAttribute('href')));
const track = document.getElementById('prodTrack');

if (track && feats.length && feats.every(Boolean)) {
  const pinned = () => !RM && matchMedia('(min-width:1001px)').matches;

  function paint(i) {
    feats.forEach((el, n) => el.classList.toggle('v-on', n === i));
    links.forEach((a, n) => { a.classList.toggle('v-on', n === i); a.classList.toggle('v-done', n < i); });
  }

  let at = -1;
  function step() {
    if (!pinned()) {
      if (at !== -1) { feats.forEach((f) => f.classList.add('v-on')); at = -1; }
      return;
    }
    const r = track.getBoundingClientRect();
    const run = track.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / run));
    const i = Math.min(feats.length - 1, Math.floor(p * feats.length));
    if (i !== at) { at = i; paint(i); }
  }
  addEventListener('scroll', step, { passive: true });
  addEventListener('resize', () => { at = -1; step(); });
  step();

  /* the first panel is up before any scrolling happens */
  if (pinned()) paint(0); else feats.forEach((f) => f.classList.add('v-on'));

  /* clicking a title scrolls to that panel's slice of the track */
  links.forEach((a, n) => a.addEventListener('click', (e) => {
    if (!pinned()) return;
    e.preventDefault();
    const run = track.offsetHeight - innerHeight;
    scrollTo({ top: track.offsetTop + run * (n / feats.length) + 8, behavior: RM ? 'auto' : 'smooth' });
  }));
}
