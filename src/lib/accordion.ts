/**
 * The reference's list-and-snippet accordion: a list on the left opens one
 * item at a time and cross-fades the snippet on the right to match. Open
 * state is a class; the transitions live in CSS. Closed bodies and
 * snippets are `inert`, so they are out of the tab order and the
 * accessibility tree.
 *
 * Wires every `.lg-acc` on the page, each scoped to its own items and
 * shots. Imported by the pages that carry one.
 */
export const wireAccordions = (): void => {
  document.querySelectorAll<HTMLElement>('.lg-acc').forEach((acc) => {
    const items = Array.from(acc.querySelectorAll<HTMLElement>('.lg-acc-item'));
    const shots = Array.from(acc.querySelectorAll<HTMLElement>('.lg-acc-shot > div'));
    items.forEach((item, i) => {
      item.querySelector<HTMLButtonElement>('.lg-acc-btn')?.addEventListener('click', () => {
        items.forEach((it, j) => {
          const on = j === i;
          it.classList.toggle('on', on);
          it.querySelector('.lg-acc-btn')?.setAttribute('aria-expanded', on ? 'true' : 'false');
          const body = it.querySelector<HTMLElement>('.lg-acc-body');
          if (body) body.inert = !on;
          if (shots[j]) {
            shots[j].classList.toggle('on', on);
            shots[j].inert = !on;
          }
        });
      });
    });
  });
};

wireAccordions();
