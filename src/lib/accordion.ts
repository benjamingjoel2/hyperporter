/**
 * The reference's list-and-snippet accordion: a list on the left opens one
 * item at a time and cross-fades the snippet on the right to match. Open
 * state is a class; the transitions live in CSS. Closed bodies and
 * snippets are `inert`, so they are out of the tab order and the
 * accessibility tree.
 *
 * One delegated listener on the document rather than one per button: it
 * does not care when the markup arrived, wires every `.lg-acc` on the page,
 * and cannot be attached twice. Imported by the pages that carry one.
 */
const openItem = (acc: HTMLElement, index: number): void => {
  const items = Array.from(acc.querySelectorAll<HTMLElement>('.lg-acc-item'));
  const shots = Array.from(acc.querySelectorAll<HTMLElement>('.lg-acc-shot > div'));
  /* Only pair shots with items when there is one of each — the homepage
     ladder. The tool, automation and solutions pages show a single screen
     beside a list of several, and pairing by index cleared it the moment
     anything but the first item was opened, leaving an empty column. */
  const paired = shots.length === items.length;
  items.forEach((it, j) => {
    const on = j === index;
    it.classList.toggle('on', on);
    it.querySelector('.lg-acc-btn')?.setAttribute('aria-expanded', on ? 'true' : 'false');
    const body = it.querySelector<HTMLElement>('.lg-acc-body');
    if (body) body.inert = !on;
    if (paired && shots[j]) {
      shots[j].classList.toggle('on', on);
      shots[j].inert = !on;
    }
  });
};

const root = document.documentElement as HTMLElement & { __acc?: boolean };
if (!root.__acc) {
  root.__acc = true;
  document.addEventListener('click', (event) => {
    const btn = (event.target as Element | null)?.closest?.('.lg-acc-btn');
    if (!btn) return;
    const acc = btn.closest<HTMLElement>('.lg-acc');
    const item = btn.closest<HTMLElement>('.lg-acc-item');
    if (!acc || !item) return;
    const index = Array.from(acc.querySelectorAll('.lg-acc-item')).indexOf(item);
    if (index >= 0) openItem(acc, index);
  });
}

export {};
