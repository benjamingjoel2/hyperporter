/**
 * The nine pipeline stages. Ported verbatim from hyperporter-3.html.
 * Drives both the Autopilot zigzag and the How-It-Works spine.
 *
 *  c    short code shown in the diagrams (INQ, PLN, ...)
 *  n    ordinal label (01..09)
 *  one  one-line summary, used on the zigzag card
 *  body longer copy, zigzag card only
 *  cls  'Automatic' | 'Human touchpoint' — drives the amber styling on the
 *       spine, which is reserved for human-touchpoint states
 *  note short line used on the spine
 *  manual what the same step looks like with Autopilot switched off --
 *       used by the toggle on the home page's thread card
 */
export interface Stage {
  c: string;
  n: string;
  name: string;
  one: string;
  body: string;
  cls: 'Automatic' | 'Human touchpoint';
  note: string;
  manual: string;
}

export const STAGES: Stage[] = [
  {
    "c": "INQ",
    "n": "01",
    "name": "Inquiry",
    "one": "Structured from the first message, whichever channel it comes through.",
    "body": "A form, WhatsApp, or email all lead to the same place — a complete brief, built through guided questions, never guessed at. Nothing moves forward until the customer confirms it's right.",
    "cls": "Automatic",
    "note": "Builds the brief and confirms it with the customer."
    ,"manual": "Someone reads the message and retypes it into a brief by hand."
  },
  {
    "c": "PLN",
    "n": "02",
    "name": "Planning",
    "one": "A draft itinerary before the customer has to ask twice.",
    "body": "Autopilot proposes the shape of the trip immediately, using what's already known. Customers edit rather than start from a blank page. Every change updates one live version, not a growing pile of PDFs.",
    "cls": "Automatic",
    "note": "Proposes the trip and keeps one live version."
    ,"manual": "You build the first itinerary from scratch, then rebuild it after every change."
  },
  {
    "c": "QTE",
    "n": "03",
    "name": "Quotation",
    "one": "Real quotes, requested from the right suppliers automatically.",
    "body": "Each part of the trip — hotels, transport, activities — goes to the suppliers actually qualified for it. Multiple quotes can come back in parallel. Your margin is added before the customer ever sees a number.",
    "cls": "Automatic",
    "note": "Requests quotes in parallel and applies your margin."
    ,"manual": "You email suppliers one at a time and wait for whoever answers."
  },
  {
    "c": "CNF",
    "n": "04",
    "name": "Confirmation",
    "one": "Nothing is booked until it's checked again.",
    "body": "The moment a quote is accepted, availability gets re-verified with the supplier — automatically. A small change gets resolved with the customer directly; a real problem finds a backup. A person only steps in if neither works.",
    "cls": "Automatic",
    "note": "Re-verification is instant and automatic; only a genuine exception — DMC unavailable, price changed — escalates to a human."
    ,"manual": "You re-check availability yourself, and go hunting if it has gone."
  },
  {
    "c": "BKG",
    "n": "05",
    "name": "Booking",
    "one": "Money changes hands with a human's eyes on it, every time.",
    "body": "Payment requests go out on their own, but marking money received or sent is always a deliberate, manual action. Nothing about payment ever happens silently.",
    "cls": "Human touchpoint",
    "note": "Payment marking is always manual, not exception-based."
    ,"manual": "You raise the invoice, watch for the transfer and mark it off. Same as always."
  },
  {
    "c": "RDY",
    "n": "06",
    "name": "Ready",
    "one": "The last mile gets chased down before it becomes a problem.",
    "body": "Vouchers, ground contacts, pickup details — requested and tracked automatically, with reminders sent as departure gets close. If something's still missing at the last minute, someone finds out before the traveller does.",
    "cls": "Automatic",
    "note": "Chases vouchers, contacts and pickup details before departure."
    ,"manual": "You chase vouchers and pickup details yourself, and hope none are missing."
  },
  {
    "c": "TRV",
    "n": "07",
    "name": "Traveling",
    "one": "Live support that runs itself, until it shouldn't.",
    "body": "Traveller and driver are connected without either seeing the other's number. Routine questions get handled without anyone noticing. A real issue breaks through immediately.",
    "cls": "Human touchpoint",
    "note": "Routine messages relay automatically; only urgent flags escalate."
    ,"manual": "Every message from the traveller and the driver lands on your phone."
  },
  {
    "c": "PST",
    "n": "08",
    "name": "Post-Trip",
    "one": "The trip doesn't end until the loop actually closes.",
    "body": "A follow-up goes out, feedback gets collected, a review gets asked for — and if anything comes back unresolved, the thread stays open until it's handled, not before.",
    "cls": "Automatic",
    "note": "Collects feedback and keeps the thread open until it's resolved."
    ,"manual": "You remember to follow up, or you don't."
  },
  {
    "c": "CMP",
    "n": "09",
    "name": "Completed",
    "one": "A record that stays useful long after the trip is over.",
    "body": "Once everything's resolved, the thread archives itself. Nothing reopens by accident. It just becomes the starting point for next time.",
    "cls": "Automatic",
    "note": "Archives the thread as the starting point for next time."
    ,"manual": "The trip ends up in somebody's inbox and stays there."
  }
];
