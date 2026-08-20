/**
 * "N min read", computed from the post's source text at 200 wpm.
 *
 * The prototype hardcoded this per post, but those values were hand
 * estimates and mutually inconsistent (one 945-word post was labelled
 * "7 min read" while a longer 1,006-word post was labelled "6 min"), so
 * there was no rate that reproduced them. Computing it keeps the number
 * honest and self-maintaining as posts are edited, at the cost of some
 * labels differing from the prototype's.
 */
export function readingTime(source: string): string {
  const words = source
    // fenced code and raw HTML tags contribute no prose
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    // markdown syntax markers
    .replace(/[#*_>`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
