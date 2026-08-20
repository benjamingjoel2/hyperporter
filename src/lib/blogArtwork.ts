/**
 * Decorative artwork for the featured blog card. Ported verbatim from
 * hyperporter-3.html's `artwork(i)` — flight-path arcs, signal dots and
 * meridian lines, varied by index so consecutive posts don't look identical.
 * Purely decorative, so the <svg> is aria-hidden by its caller.
 */
export function blogArtwork(i: number): string {
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
 <g stroke="rgba(70,198,185,.30)" fill="none" stroke-width="1" stroke-dasharray="3 6">
 ${Array.from({ length: 5 }, (_, k) => `<path d="M-20 ${60 + k * 48 + i * 7} Q200 ${20 + k * 46} 420 ${70 + k * 44 - i * 5}"/>`).join('')}
 </g>
 <g fill="var(--signal)">${Array.from({ length: 6 }, (_, k) => `<circle cx="${45 + k * 62}" cy="${110 + ((k + i) % 4) * 38}" r="2.6"/>`).join('')}</g>
 <g stroke="rgba(255,255,255,.07)" fill="none">${Array.from({ length: 4 }, (_, k) => `<path d="M${70 + k * 90} -10 Q${60 + k * 92} 150 ${75 + k * 88} 310"/>`).join('')}</g>
</svg>`;
}
