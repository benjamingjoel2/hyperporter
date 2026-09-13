/**
 * The screens work. Every mock-up on the site is markup, and this makes the
 * parts of it a person would touch behave the way the product would: a row
 * ticks when clicked, a button does its thing once and says so, a card moves
 * to the next stage, a chat box takes what you type and answers back, a
 * margin control re-prices the quote. Nothing leaves the page — it is a
 * demonstration, and the copy in each screen says so — but it responds like
 * software, not like a picture of software.
 *
 * Everything is delegated from the document, scoped to the screen (`.mk`)
 * the element sits in, so the same screen can appear twice on a page with
 * independent state, and the bundled preview, which swaps pages without
 * re-running scripts, still gets a working screen.
 *
 * Behaviours, by `data-live`:
 *   tick     — the row's check flips between done and open; `data-on` /
 *              `data-off` swap the row's tag text (and its amber) with it.
 *   set      — a one-shot button: its label becomes `data-done`, and the
 *              row it sits in (or the one in `data-row`) is marked done
 *              with the tag in `data-tag` and the line in `data-small`.
 *              `data-reveal` un-hides an element in the same screen;
 *              `data-clear` removes a class from the screen's head dot.
 *   move     — a board card moves to the next column on click.
 *   toggle   — a switch flips; `data-on-text` / `data-off-text` swap the
 *              row's small line and `data-off-amber` marks the off state.
 *   margin   — `-` / `+` buttons step the percentage in the same block and
 *              re-price the sum from `data-base`.
 *   swap     — a row trades its title, price and citation for the
 *              alternatives in `data-alt-*`, and back.
 *   ask      — a field fills itself with `data-answer` and marks the row
 *              named in `data-then` done, as if the traveller had replied.
 *   chat     — a form with an input: what you type becomes your message
 *              and one of the canned replies in `data-replies` comes back
 *              after a moment, labelled `data-reply-via`.
 *   add      — a button clones the `<template>` in the same screen onto the
 *              list, then after a beat flips its tag from `data-then-from`
 *              to `data-then-to`.
 */

const CHK_STATES = ['wait', 'now', 'hold', 'amb'];

const screenOf = (el: Element): HTMLElement | null => el.closest<HTMLElement>('.mk');

const setChk = (row: Element | null, done: boolean, amber = false): void => {
  const chk = row?.querySelector<HTMLElement>('.mk-chk');
  if (!chk) return;
  chk.classList.remove(...CHK_STATES);
  if (!done) chk.classList.add('wait');
  else if (amber) chk.classList.add('amb');
};

const setTag = (row: Element | null, text: string | undefined, amber: boolean): void => {
  const tag = row?.querySelector<HTMLElement>('.mk-tag');
  if (!tag || text === undefined) return;
  tag.textContent = text;
  tag.classList.toggle('amb', amber);
  tag.classList.remove('grey');
};

const rise = (el: HTMLElement): void => {
  el.classList.add('mk-in');
  el.addEventListener('animationend', () => el.classList.remove('mk-in'), { once: true });
};

const tick = (row: HTMLElement): void => {
  const chk = row.querySelector<HTMLElement>('.mk-chk');
  if (!chk) return;
  const wasDone = !chk.classList.contains('wait') && !chk.classList.contains('hold') && !chk.classList.contains('now');
  const done = !wasDone;
  setChk(row, done, row.dataset.amber === 'true');
  setTag(row, done ? row.dataset.on : row.dataset.off, done ? row.dataset.amber === 'true' : row.dataset.offAmber !== 'false');
  row.classList.toggle('is-done', done);
};

const set = (btn: HTMLElement): void => {
  if (btn.classList.contains('done')) return;
  const screen = screenOf(btn);
  const row = btn.dataset.row && screen ? screen.querySelector<HTMLElement>(btn.dataset.row) : btn.closest<HTMLElement>('.mk-row');
  btn.classList.add('done');
  if (btn.dataset.done) btn.textContent = btn.dataset.done;
  if (row) {
    setChk(row, true, btn.dataset.amber === 'true');
    setTag(row, btn.dataset.tag, btn.dataset.amber === 'true');
    if (btn.dataset.small) {
      const small = row.querySelector<HTMLElement>('div > small');
      if (small) small.textContent = btn.dataset.small;
    }
  }
  if (btn.dataset.reveal && screen) {
    screen.querySelectorAll<HTMLElement>(btn.dataset.reveal).forEach((el) => { el.hidden = false; rise(el); });
  }
  if (btn.dataset.hide && screen) {
    screen.querySelectorAll<HTMLElement>(btn.dataset.hide).forEach((el) => { el.hidden = true; });
  }
  if (btn.dataset.clear && screen) {
    screen.querySelectorAll<HTMLElement>('.mk-head .mk-dot').forEach((d) => d.classList.remove(btn.dataset.clear!));
  }
  if (btn.dataset.fine && screen) {
    const fine = screen.querySelector<HTMLElement>('.mk-foot .mk-fine, .mk-panel > .mk-fine');
    if (fine) fine.textContent = btn.dataset.fine;
  }
};

const move = (card: HTMLElement): void => {
  const col = card.closest<HTMLElement>('.mk-col');
  const next = col?.nextElementSibling as HTMLElement | null;
  if (!col || !next || !next.classList.contains('mk-col')) {
    card.classList.add('mk-shake');
    card.addEventListener('animationend', () => card.classList.remove('mk-shake'), { once: true });
    return;
  }
  next.appendChild(card);
  rise(card);
  const small = card.querySelector<HTMLElement>('small');
  if (small && card.dataset.moved) small.textContent = card.dataset.moved;
};

const toggle = (tog: HTMLElement): void => {
  const off = tog.classList.toggle('off');
  const row = tog.closest<HTMLElement>('.mk-row');
  const small = row?.querySelector<HTMLElement>('div > small');
  if (small && tog.dataset.onText && tog.dataset.offText) small.textContent = off ? tog.dataset.offText : tog.dataset.onText;
  if (row && tog.dataset.offAmber === 'true') setChk(row, true, off);
  tog.setAttribute('aria-checked', String(!off));
};

const margin = (btn: HTMLElement): void => {
  const block = btn.closest<HTMLElement>('[data-margin]');
  if (!block) return;
  const step = Number(btn.dataset.step ?? 0);
  const pct = Math.min(40, Math.max(0, Number(block.dataset.pct ?? 0) + step));
  block.dataset.pct = String(pct);
  const base = Number(block.dataset.base ?? 0);
  const out = block.querySelector<HTMLElement>('[data-margin-out]');
  const sum = block.querySelector<HTMLElement>('[data-margin-sum]');
  if (out) out.textContent = `${pct}%`;
  if (sum) sum.textContent = `€${Math.round(base * (1 + pct / 100)).toLocaleString('en-GB')}`;
};

const swap = (btn: HTMLElement): void => {
  const row = btn.closest<HTMLElement>('.mk-row');
  if (!row) return;
  const b = row.querySelector<HTMLElement>('div > b');
  const r = row.querySelector<HTMLElement>('.r');
  const cite = row.querySelector<HTMLElement>('.mk-cite');
  const flip = (el: HTMLElement | null, key: string): void => {
    if (!el) return;
    const alt = row.dataset[key];
    if (alt === undefined) return;
    const cur = key === 'altCite' ? (el.lastChild?.textContent ?? '') : el.textContent ?? '';
    if (key === 'altCite') { if (el.lastChild) el.lastChild.textContent = alt; } else el.textContent = alt;
    row.dataset[key] = cur;
  };
  flip(b, 'altWhat'); flip(r, 'altRate'); flip(cite, 'altCite');
  row.classList.toggle('is-swapped');
  btn.textContent = row.classList.contains('is-swapped') ? (btn.dataset.back ?? 'Swap back') : (btn.dataset.label ?? 'Swap');
  rise(row);
};

const ask = (field: HTMLElement): void => {
  const val = field.querySelector<HTMLElement>('div');
  if (!val || !field.dataset.answer || field.classList.contains('is-answered')) return;
  val.textContent = field.dataset.answer;
  val.classList.remove('ph', 'focus');
  field.classList.add('is-answered');
  rise(val);
  const screen = screenOf(field);
  if (field.dataset.then && screen) {
    const row = screen.querySelector<HTMLElement>(field.dataset.then);
    if (row) {
      setChk(row, true);
      const small = row.querySelector<HTMLElement>('div > small');
      if (small && field.dataset.thenSmall) small.textContent = field.dataset.thenSmall;
    }
  }
};

const chat = (form: HTMLFormElement): void => {
  const input = form.querySelector<HTMLInputElement>('input');
  const text = input?.value.trim();
  if (!input || !text) return;
  const screen = screenOf(form);
  const list = screen?.querySelector<HTMLElement>('[data-thread]') ?? form.parentElement;
  if (!list) return;
  const mine = document.createElement('div');
  mine.className = 'mk-msg me';
  mine.innerHTML = `<span class="mk-via">${form.dataset.meVia ?? 'You'}</span><p></p>`;
  mine.querySelector('p')!.textContent = text;
  list.insertBefore(mine, form.closest('.mk-composer'));
  rise(mine);
  input.value = '';
  let replies: string[] = [];
  try { replies = JSON.parse(form.dataset.replies ?? '[]'); } catch { replies = []; }
  if (!replies.length) return;
  const n = Number(form.dataset.n ?? 0);
  form.dataset.n = String(n + 1);
  const typing = document.createElement('div');
  typing.className = 'mk-msg mk-typing';
  typing.innerHTML = '<p><i></i><i></i><i></i></p>';
  list.insertBefore(typing, form.closest('.mk-composer'));
  window.setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'mk-msg';
    reply.innerHTML = `<span class="mk-via">${form.dataset.replyVia ?? ''}</span><p></p>`;
    reply.querySelector('p')!.textContent = replies[n % replies.length];
    typing.replaceWith(reply);
    rise(reply);
  }, 900);
};

const add = (btn: HTMLElement): void => {
  const screen = screenOf(btn);
  const tpl = screen?.querySelector<HTMLTemplateElement>('template');
  const list = screen?.querySelector<HTMLElement>('[data-list]');
  if (!tpl || !list) return;
  const row = tpl.content.firstElementChild?.cloneNode(true) as HTMLElement | null;
  if (!row) return;
  const count = Number(btn.dataset.n ?? 0) + 1;
  btn.dataset.n = String(count);
  const b = row.querySelector<HTMLElement>('div > b');
  if (b && count > 1) b.textContent = `${b.textContent} (${count})`;
  list.appendChild(row);
  rise(row);
  const tag = row.querySelector<HTMLElement>('.mk-tag');
  if (tag && btn.dataset.thenTo) {
    window.setTimeout(() => { tag.textContent = btn.dataset.thenTo!; tag.classList.remove('amb'); rise(tag); }, 1600);
  }
  const head = screen?.querySelector<HTMLElement>('.mk-head small');
  if (head && btn.dataset.headTo) head.textContent = btn.dataset.headTo;
};

const act = (target: Element): void => {
  const el = target.closest<HTMLElement>('[data-live]');
  if (!el) return;
  switch (el.dataset.live) {
    case 'tick': tick(el); break;
    case 'set': set(el); break;
    case 'move': move(el); break;
    case 'toggle': toggle(el); break;
    case 'margin': margin(el); break;
    case 'swap': swap(el); break;
    case 'ask': ask(el); break;
    case 'add': add(el); break;
    default: break;
  }
};

document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  if (!target) return;
  if (target.closest('input, form, [contenteditable]') && !target.closest('[data-live]:not([data-live="chat"])')) return;
  act(target);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const target = event.target as HTMLElement | null;
  if (!target || target.matches('input, button, [contenteditable]')) return;
  if (!target.matches('[data-live]')) return;
  event.preventDefault();
  act(target);
});

document.addEventListener('submit', (event) => {
  const form = event.target as HTMLFormElement | null;
  if (!form || form.dataset.live !== 'chat') return;
  event.preventDefault();
  chat(form);
});

/* Rows and cards that respond are reachable from the keyboard too. */
document.querySelectorAll<HTMLElement>('[data-live="tick"], [data-live="move"], [data-live="ask"]').forEach((el) => {
  if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
  if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
});

export {};
