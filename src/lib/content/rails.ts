/**
 * Homepage rail copy (Sep 2026, founder's ask, after apple.com's "Get to
 * know iPad" cards). The automation cards carry a photograph rather than
 * a screen, so the name becomes the small label and the card needs a
 * headline of its own — one short claim, set large over the picture.
 *
 * Keyed by the automation's slug (detail.ts). Nothing here may overstate
 * what runs on its own: the payment line is about the request going out
 * on schedule, not about money being marked received, which stays a
 * person's job.
 */
export const AUTOMATION_HEADLINE: Record<string, string> = {
  inquiry: 'Every message arrives as a lead.',
  quotation: 'One brief. Every supplier asked.',
  'follow-up': 'The quiet ones get a nudge.',
  confirmation: 'Both sides confirm, in writing.',
  collection: 'Documents come in without chasing.',
  payment: 'Deposits and balances, on schedule.',
};
