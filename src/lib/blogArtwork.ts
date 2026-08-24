/**
 * Decorative artwork for the blog cards. Ported from hyperporter-3.html's
 * `artwork(i)` -- flight-path arcs, signal dots and meridian lines, varied
 * by index so consecutive posts do not look identical. Purely decorative,
 * so the <svg> is aria-hidden by its caller.
 *
 * `scale` compensates for size. The original was drawn for a ~400px-wide
 * featured card; dropped into a 108px row thumbnail its 1px strokes render
 * at about a quarter of a pixel and the whole thing reads as an empty grey
 * box. Passing 'compact' thickens the strokes and enlarges the dots so the
 * same drawing survives the reduction.
 */
export function blogArtwork(i: number, scale: 'default' | 'compact' = 'default'): string {
  const compact = scale === 'compact';
  const arcW = compact ? 3.4 : 1;
  const dash = compact ? '9 14' : '3 6';
  const dotR = compact ? 8 : 2.6;
  const gridW = compact ? 3 : 1;
  const arcO = compact ? 0.55 : 0.34;
  const gridO = compact ? 0.14 : 0.07;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
 <g stroke="rgba(27,116,126,${arcO})" fill="none" stroke-width="${arcW}" stroke-dasharray="${dash}">
 ${Array.from({ length: 5 }, (_, k) => `<path d="M-20 ${60 + k * 48 + i * 7} Q200 ${20 + k * 46} 420 ${70 + k * 44 - i * 5}"/>`).join('')}
 </g>
 <g fill="var(--signal)">${Array.from({ length: 6 }, (_, k) => `<circle cx="${45 + k * 62}" cy="${110 + ((k + i) % 4) * 38}" r="${dotR}"/>`).join('')}</g>
 <g stroke="rgba(12,22,34,${gridO})" fill="none" stroke-width="${gridW}">${Array.from({ length: 4 }, (_, k) => `<path d="M${70 + k * 90} -10 Q${60 + k * 92} 150 ${75 + k * 88} 310"/>`).join('')}</g>
</svg>`;
}
