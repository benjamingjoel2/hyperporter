/**
 * A screen per step of every "How it works" list (founder's ask, Sep 2026).
 * Clicking down the list changes the screen beside it, and each screen
 * shows what its own step says.
 *
 * Keyed by the page's slug (detail.ts), four entries per page, in the same
 * order as that page's `how`. StepScreen.astro renders them with the
 * mock-up kit's own primitives.
 *
 * Everything in them is invented. The site's rules hold: amber only where
 * a person acts, suppliers are never shown inside Horizon, Atlas answers
 * from the account's own Vault and cites it, a supplier receives their
 * full quoted rate, and nothing claims a step runs on its own when it
 * does not.
 */
export interface StepRow {
  b: string;
  s?: string;
  /** A ticked, waiting, running or held state dot. */
  state?: 'done' | 'wait' | 'now' | 'hold' | 'amb';
  tag?: string;
  /** Amber on the tag: this row is a person's to act on. */
  amber?: boolean;
  fine?: string;
  icon?: string;
}

export interface StepMsg {
  text: string;
  from?: 'me' | 'them';
  cite?: string;
  state?: 'typing';
}

export interface StepScreen {
  head?: [string, string];
  rows?: StepRow[];
  msgs?: StepMsg[];
  composer?: [string, string];
  /** Footer: fine print, an optional button, and whether it is amber. */
  foot?: [string, string?, boolean?];
}

export const STEP_SCREENS: Record<string, StepScreen[]> = {
  // ---------------------------------------------------------------- tools
  portal: [
    {
      head: ['Inbox', '3 new'],
      rows: [
        { b: 'Lena Ortiz', s: 'Inquiry form · Nairobi, 9 nights', state: 'now' },
        { b: 'Tom Achebe', s: 'Email · forwarded from hello@', state: 'wait' },
        { b: 'Mira Sato', s: 'WhatsApp · +81 ··· 4417', state: 'wait' },
      ],
      foot: ['Every channel lands in the same place.'],
    },
    {
      head: ['Nairobi — 9 nights', 'KE-2291'],
      rows: [
        { b: 'Lena & Mark Ortiz', s: '2 travellers · 3 – 12 March', tag: 'Inquiry' },
        { b: 'Rift Valley Ground Services', s: 'Supplier on the thread', state: 'done' },
        { b: 'Notes, files, messages', s: 'All on this one record', state: 'done' },
      ],
      foot: ['One thread per trip. Nothing in a second inbox.'],
    },
    {
      head: ['Magic link', 'No password'],
      rows: [
        { b: 'Traveller link', s: 'Itinerary, documents, payments', tag: 'Sent' },
        { b: 'Supplier link', s: 'Their request and their quote only', tag: 'Sent' },
        { b: 'Nothing to install', s: 'Opens in a browser', state: 'done' },
      ],
      foot: ['Each side sees their own view of the trip.'],
    },
    {
      head: ['After the trip', 'KE-2291'],
      rows: [
        { b: 'Every message kept', s: 'Both sides, in order', state: 'done' },
        { b: 'Rates as quoted', s: 'What was agreed, and when', state: 'done' },
        { b: 'Ready to repeat', s: 'Duplicate for the next enquiry', tag: 'Reuse' },
      ],
      foot: ['The record outlives the trip.'],
    },
  ],

  'atlas-ai': [
    {
      head: ['Vault', '61 documents'],
      rows: [
        { b: 'Rift Valley GS — rates 2026.pdf', s: 'Kenya · 48 rates', tag: 'Indexed', icon: 'PDF' },
        { b: 'Atlas Maroc 2026.pdf', s: 'Morocco · 112 rates', tag: 'Indexed', icon: 'PDF' },
        { b: 'Andes Trail — Sacred Valley.xlsx', s: 'Peru · 36 rates', tag: 'Indexing', amber: true, icon: 'XLS' },
      ],
      foot: ['Rates and validity read out of each one.'],
    },
    {
      head: ['Atlas', 'On the trip thread'],
      msgs: [{ text: 'Rift Valley, Mara North game drives, March — park fee included?', from: 'me' }],
      composer: ['Ask about your contracts…', 'Ask'],
      foot: ['Asked where the work already is.'],
    },
    {
      head: ['Atlas', 'Answering'],
      msgs: [
        { text: 'Rift Valley, Mara North game drives, March — park fee included?', from: 'me' },
        {
          text: 'USD 95 pp per day through 31 March. Park fees not included: USD 116 per adult per night.',
          cite: 'Rift Valley GS — rates 2026.pdf · p.2, p.5',
        },
      ],
      foot: ['From your Vault only. Every line points at its page.'],
    },
    {
      head: ['Yours to place', 'Nothing sent yet'],
      rows: [
        { b: 'Add to the quote', s: 'You choose the line and the margin', tag: 'Your call', amber: true },
        { b: 'Copy it', s: 'Paste into the message yourself', tag: 'Your call', amber: true },
        { b: 'Leave it', s: 'Atlas does not act on its own', state: 'hold' },
      ],
      foot: ['Atlas answers. You decide.', 'Add to quote', true],
    },
  ],

  'crm-workflow': [
    {
      head: ['Board', 'Stage 1 – 2'],
      rows: [
        { b: 'Inquiry', s: 'Nairobi · Ortiz · just in', state: 'now' },
        { b: 'Qualification', s: 'Dates, party size, budget', state: 'wait' },
        { b: 'Planning', s: 'Waiting on the brief', state: 'wait' },
      ],
      foot: ['A trip enters at Inquiry and moves one stage at a time.'],
    },
    {
      head: ['Board', 'Stage 3 – 5'],
      rows: [
        { b: 'Quotation', s: 'Cusco · 3 suppliers asked', state: 'now' },
        { b: 'Proposal', s: 'v3 sent · opened twice', state: 'done' },
        { b: 'Confirmation', s: 'Re-check before it is booked', state: 'wait' },
      ],
      foot: ['The stage is the status. Nobody updates a column by hand.'],
    },
    {
      head: ['Board', 'Stage 6 – 7'],
      rows: [
        { b: 'Booking', s: 'Deposit received · marked by you', tag: 'By hand', amber: true },
        { b: 'Documents', s: 'Passports in · vouchers out', state: 'now' },
        { b: 'Ready', s: 'Everything the traveller needs', state: 'wait' },
      ],
      foot: ['Money moving is always a person’s to confirm.'],
    },
    {
      head: ['Board', 'Stage 8 – 9'],
      rows: [
        { b: 'Traveling', s: 'Live · relay on', state: 'now' },
        { b: 'Post-Trip', s: 'Feedback requested', state: 'wait' },
        { b: 'Completed', s: 'Record kept, ready to repeat', state: 'done' },
      ],
      foot: ['Nine stages, start to finish.'],
    },
  ],

  'inquiry-form': [
    {
      head: ['Your form', 'meridiantravel.co/enquire'],
      rows: [
        { b: 'Your own link', s: 'Site, bio, email signature', tag: 'Live' },
        { b: 'Your brand on it', s: 'Logo, colours, wording', state: 'done' },
        { b: 'No setup', s: 'Nothing to install anywhere', state: 'done' },
      ],
      foot: ['One link, wherever people find you.'],
    },
    {
      head: ['Enquiry', 'In progress'],
      rows: [
        { b: 'Where and when', s: 'Kenya · 3 – 12 March', state: 'done' },
        { b: 'Who is travelling', s: '2 adults', state: 'done' },
        { b: 'Budget', s: 'Being filled in…', state: 'now' },
      ],
      foot: ['The questions you would have asked anyway.'],
    },
    {
      head: ['Nairobi — 9 nights', 'KE-2291 · new'],
      rows: [
        { b: 'Lena & Mark Ortiz', s: 'Contact created', state: 'done' },
        { b: 'Trip record', s: 'Dates and party size filled in', state: 'done' },
        { b: 'At Inquiry', s: 'Stage 1 of 9', tag: 'Inquiry' },
      ],
      foot: ['No retyping. The submission is the record.'],
    },
    {
      head: ['Automation', 'Inquiry'],
      rows: [
        { b: 'Brief built', s: 'From what they gave you', state: 'done' },
        { b: 'Gaps asked about', s: 'Only what is missing', state: 'now' },
        { b: 'Confirmed with them', s: 'Before it moves to Planning', state: 'wait' },
      ],
      foot: ['On Autopilot. Escalates to you when it needs a person.'],
    },
  ],

  'quotation-board': [
    {
      head: ['Nairobi — 9 nights', '4 parts'],
      rows: [
        { b: 'Game drives · Mara North', s: '3 nights', tag: 'To quote' },
        { b: 'Lodging · Rift Valley', s: '4 nights', tag: 'To quote' },
        { b: 'Transfers', s: 'Airport and inter-camp', tag: 'To quote' },
      ],
      foot: ['The trip, broken into the parts suppliers price.'],
    },
    {
      head: ['Quotes in', '3 of 4'],
      rows: [
        { b: 'Rift Valley Ground Services', s: '€4,180 pp · full board', state: 'done' },
        { b: 'Karen Overland Co.', s: '€3,940 pp · room only', state: 'done' },
        { b: 'Mara North Collective', s: 'Asked yesterday', state: 'wait' },
      ],
      foot: ['Side by side, on the trip’s own thread.'],
    },
    {
      head: ['Your margin', 'Yours to set'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Cost €4,180 pp', tag: 'Chosen', amber: true },
        { b: 'Margin', s: '18% · you set it', tag: 'By hand', amber: true },
        { b: 'Client price', s: '€4,932 pp', state: 'done' },
      ],
      foot: ['The supplier still receives their full quoted rate.'],
    },
    {
      head: ['Proposal v3', 'Ready'],
      rows: [
        { b: 'Built from the chosen quotes', s: 'Nothing retyped', state: 'done' },
        { b: 'Your branding', s: 'No Hyperporter badge', state: 'done' },
        { b: 'Share as a link', s: 'Or PDF, or a message', tag: 'Ready' },
      ],
      foot: ['Chosen quotes become the proposal.', 'Share', false],
    },
  ],

  'proposal-share': [
    {
      head: ['Proposal', 'From the record'],
      rows: [
        { b: 'Days and nights', s: 'As laid out on the trip', state: 'done' },
        { b: 'Prices', s: 'The quotes you chose', state: 'done' },
        { b: 'Inclusions', s: 'Straight from the contracts', state: 'done' },
      ],
      foot: ['Generated, not rewritten.'],
    },
    {
      head: ['Send it as', '3 ways'],
      rows: [
        { b: 'A link', s: 'Always the current version', tag: 'Live' },
        { b: 'A PDF', s: 'For people who want a file', tag: 'Export' },
        { b: 'A message', s: 'WhatsApp or email', tag: 'Send' },
      ],
      foot: ['One proposal. Whichever way they prefer.'],
    },
    {
      head: ['Proposal v3', 'Opened twice'],
      rows: [
        { b: 'First opened', s: 'Tuesday, 14:02', state: 'done' },
        { b: 'Opened again', s: '2 h ago · on the day 4 page', state: 'done' },
        { b: 'Not yet answered', s: 'No accept, no questions', state: 'wait' },
      ],
      foot: ['You know it landed before you chase it.'],
    },
    {
      head: ['On the page', 'Their side'],
      rows: [
        { b: 'Accept', s: 'Signed on the page itself', tag: 'Accepted' },
        { b: 'Ask a question', s: 'Lands on the trip thread', state: 'done' },
        { b: 'Moves to Confirmation', s: 'Stage 5 of 9', state: 'now' },
      ],
      foot: ['Accepted is not confirmed. The re-check comes next.'],
    },
  ],

  'client-supplier-dashboard': [
    {
      head: ['Nairobi — 9 nights', 'One record'],
      rows: [
        { b: 'Traveller link', s: 'Itinerary, documents, payments', tag: 'Open' },
        { b: 'Supplier link', s: 'Their request and their quote', tag: 'Open' },
        { b: 'Neither sees the other', s: 'No budget, no margin', state: 'done' },
      ],
      foot: ['Two doors into the same trip.'],
    },
    {
      head: ['Day 4 changed', 'Both sides'],
      rows: [
        { b: 'Supplier moved the camp', s: 'Mara North → Naboisho', state: 'now' },
        { b: 'Traveller’s itinerary', s: 'Updated on their link', state: 'done' },
        { b: 'You were told', s: 'Before they asked', state: 'done' },
      ],
      foot: ['One change, everywhere it matters.'],
    },
    {
      head: ['Questions', 'On the thread'],
      rows: [
        { b: '“Is the park fee included?”', s: 'Traveller · 2 h ago', state: 'now' },
        { b: '“Can we hold 3 nights?”', s: 'Supplier · yesterday', state: 'done' },
        { b: 'Both on the trip record', s: 'Not in your personal inbox', state: 'done' },
      ],
      foot: ['You are not the record any more.'],
    },
    {
      head: ['Deposit', 'Awaiting you'],
      rows: [
        { b: 'Request sent', s: '€1,480 · on the traveller’s link', state: 'done' },
        { b: 'Bank shows a transfer', s: 'You check it', tag: 'By hand', amber: true },
        { b: 'Mark as received', s: 'Only a person does this', tag: 'By hand', amber: true },
      ],
      foot: ['Money received is marked by a person, never guessed.', 'Mark received', true],
    },
  ],

  'three-way-inbox': [
    {
      head: ['Thread', 'Nairobi — 9 nights'],
      rows: [
        { b: 'Traveller · WhatsApp', s: '“What time is the pickup?”', state: 'now' },
        { b: 'Supplier · email', s: 'Voucher attached', state: 'done' },
        { b: 'You', s: 'Both, in one place', state: 'done' },
      ],
      foot: ['Three parties, one conversation.'],
    },
    {
      head: ['Reply', 'In place'],
      msgs: [
        { text: 'What time is the pickup?', from: 'them' },
        { text: '06:15 from the lodge — driver is Peter, plate KDJ 441H.', from: 'me' },
      ],
      foot: ['They get it on WhatsApp. You never left the trip.'],
    },
    {
      head: ['On the thread', 'Automatic'],
      rows: [
        { b: 'Voucher sent to traveller', s: 'Automation · 09:02', state: 'done' },
        { b: 'Supplier re-confirmed', s: 'Automation · yesterday', state: 'done' },
        { b: 'Shown, not hidden', s: 'You can see what ran', state: 'done' },
      ],
      foot: ['Every automatic step is written into the same thread.'],
    },
    {
      head: ['Needs you', '1 flagged'],
      rows: [
        { b: 'Camp cannot hold day 4', s: 'Supplier · 20 min ago', tag: 'Urgent', amber: true },
        { b: 'Traveller not told yet', s: 'Held until you decide', tag: 'Held', amber: true },
        { b: 'Everything else', s: 'Handled without you', state: 'done' },
      ],
      foot: ['Urgent breaks through. The rest does not.', 'Open', true],
    },
  ],

  'document-vault': [
    {
      head: ['Upload', 'Drag them in'],
      rows: [
        { b: 'Rift Valley GS — rates 2026.pdf', s: '2.4 MB', tag: 'Uploading', amber: true, icon: 'PDF' },
        { b: 'Atlas Maroc 2026.pdf', s: '1.1 MB', tag: 'Queued', icon: 'PDF' },
        { b: 'Andes Trail.xlsx', s: '840 KB', tag: 'Queued', icon: 'XLS' },
      ],
      foot: ['Contracts, rate sheets, tariffs — as they came.'],
    },
    {
      head: ['Extract', 'Being read'],
      rows: [
        { b: 'Rates', s: '48 found · per person, per night', state: 'done' },
        { b: 'Validity', s: 'Through 31 March 2026', state: 'done' },
        { b: 'Inclusions', s: 'Park fees listed separately', state: 'now' },
      ],
      foot: ['Read out of the document, not retyped.'],
    },
    {
      head: ['Index', '61 documents'],
      rows: [
        { b: 'Kenya', s: '4 suppliers · 190 rates', state: 'done' },
        { b: 'Morocco', s: '2 suppliers · 112 rates', state: 'done' },
        { b: 'Peru', s: '1 supplier · 36 rates', state: 'done' },
      ],
      foot: ['Queryable. Yours only, never shared.'],
    },
    {
      head: ['Answer', 'From the Vault'],
      msgs: [
        { text: 'Mara North, March — park fee included?', from: 'me' },
        {
          text: 'USD 95 pp per day. Park fees not included: USD 116 per adult per night.',
          cite: 'Rift Valley GS — rates 2026.pdf · p.2',
        },
      ],
      foot: ['The page it came from, every time.'],
    },
  ],

  'itinerary-generator': [
    {
      head: ['The brief', 'KE-2291'],
      rows: [
        { b: '2 travellers · 9 nights', s: '3 – 12 March', state: 'done' },
        { b: 'Wildlife, walking, no long drives', s: 'From the enquiry', state: 'done' },
        { b: 'Mid-range, full board', s: 'Budget given', state: 'done' },
      ],
      foot: ['What they asked for, as they said it.'],
    },
    {
      head: ['Your suppliers', 'From the Vault'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Under contract · 48 rates', tag: 'Yours' },
        { b: 'Karen Overland Co.', s: 'Under contract · 22 rates', tag: 'Yours' },
        { b: 'Nobody else', s: 'Only who you actually work with', state: 'done' },
      ],
      foot: ['Built from your contracts, not a stock library.'],
    },
    {
      head: ['Nine days', 'Laid out'],
      rows: [
        { b: 'Day 1 – 2 · Nairobi', s: 'Arrival, city, transfer', state: 'done' },
        { b: 'Day 3 – 6 · Mara North', s: 'Game drives, walking', state: 'done' },
        { b: 'Day 7 – 9 · Rift Valley', s: 'Lakes, departure', state: 'done' },
      ],
      foot: ['Each line priced from the rate it came from.'],
    },
    {
      head: ['Yours to edit', 'Nothing sent'],
      rows: [
        { b: 'Move a day', s: 'Reorder, swap, remove', tag: 'Your call', amber: true },
        { b: 'Change a supplier', s: 'Re-prices from their sheet', tag: 'Your call', amber: true },
        { b: 'Then share it', s: 'Link, PDF or message', state: 'hold' },
      ],
      foot: ['A draft handed to you, not sent for you.', 'Open draft', true],
    },
  ],

  'payments-invoicing': [
    {
      head: ['Traveller link', 'Nairobi — 9 nights'],
      rows: [
        { b: 'Deposit · €1,480', s: 'Due on booking', tag: 'Due' },
        { b: 'Balance · €8,384', s: 'Due 14 days before travel', tag: 'Scheduled' },
        { b: 'How to pay', s: 'Bank details on the page', state: 'done' },
      ],
      foot: ['On the same link as their itinerary.'],
    },
    {
      head: ['Requests', 'On schedule'],
      rows: [
        { b: 'Deposit request', s: 'Sent on acceptance', state: 'done' },
        { b: 'Reminder', s: 'If unpaid after 3 days', state: 'now' },
        { b: 'Balance request', s: 'Goes out at day −14', state: 'wait' },
      ],
      foot: ['The asking runs on its own.'],
    },
    {
      head: ['Received?', 'Awaiting you'],
      rows: [
        { b: 'Transfer shows in your bank', s: 'You check it', tag: 'By hand', amber: true },
        { b: 'Mark as received', s: 'Only a person does this', tag: 'By hand', amber: true },
        { b: 'Never assumed', s: 'Hyperporter does not guess', state: 'hold' },
      ],
      foot: ['Marking money received stays yours.', 'Mark received', true],
    },
    {
      head: ['Invoice', 'Tied to the booking'],
      rows: [
        { b: 'Generated from the record', s: 'Every line has a source', state: 'done' },
        { b: 'Sent to the traveller', s: 'On their link', state: 'done' },
        { b: 'In-platform processing', s: 'On Intelligence', tag: 'Intelligence' },
      ],
      foot: ['Taking payment inside Hyperporter is an Intelligence feature.'],
    },
  ],

  'support-relay': [
    {
      head: ['03:40 local', 'Nairobi — 9 nights'],
      msgs: [{ text: 'Driver is not at the gate. We have a 06:15 flight.', from: 'them' }],
      foot: ['They write to the trip, not to your personal phone.'],
    },
    {
      head: ['Relay', 'Routing'],
      rows: [
        { b: 'Traveller', s: 'Writes in English, on WhatsApp', state: 'done' },
        { b: 'Ground team', s: 'Reached on their own number', state: 'now' },
        { b: 'You', s: 'Copied, not woken', state: 'wait' },
      ],
      foot: ['Between two people who never swap numbers.'],
    },
    {
      head: ['Handled', 'Without you'],
      rows: [
        { b: 'Pickup time confirmed', s: 'Answered from the voucher', state: 'done' },
        { b: 'Voucher re-sent', s: 'Traveller had lost it', state: 'done' },
        { b: 'Logged on the thread', s: 'You can read it later', state: 'done' },
      ],
      foot: ['Routine questions do not need a person.'],
    },
    {
      head: ['Escalated', 'To you'],
      rows: [
        { b: 'No driver at the gate', s: 'Flight in 2 h 35', tag: 'Urgent', amber: true },
        { b: 'Ground team not answering', s: 'Two attempts', tag: 'Urgent', amber: true },
        { b: 'You are called', s: 'This one is worth waking for', tag: 'Now', amber: true },
      ],
      foot: ['Escalation is a designed step, not a failure.', 'Take it', true],
    },
  ],

  'whatsapp-integration': [
    {
      head: ['Connect', 'WhatsApp Business'],
      rows: [
        { b: '+254 ··· 8810', s: 'Your business number', tag: 'Connected' },
        { b: 'Official API', s: 'Not a phone in a drawer', state: 'done' },
        { b: 'Your name on it', s: 'Meridian Travel Co.', state: 'done' },
      ],
      foot: ['The number your clients already message.'],
    },
    {
      head: ['Who is this?', 'Matching'],
      rows: [
        { b: '+81 ··· 4417', s: 'Matched · Mira Sato, TK-1184', state: 'done' },
        { b: '+254 ··· 6620', s: 'Matched · Rift Valley GS', state: 'done' },
        { b: '+44 ··· 9031', s: 'New · creates a contact', state: 'now' },
      ],
      foot: ['The message finds its trip on its own.'],
    },
    {
      head: ['Thread', 'Nairobi — 9 nights'],
      msgs: [
        { text: 'Any chance of a later checkout on day 6?', from: 'them' },
        { text: 'Asking the camp now — back to you within the hour.', from: 'me' },
      ],
      foot: ['Answered from the trip. Delivered on WhatsApp.'],
    },
    {
      head: ['Add the relay', 'While travelling'],
      rows: [
        { b: 'Traveller ↔ ground team', s: 'Neither gets the other’s number', state: 'done' },
        { b: 'Routine handled', s: 'Pickups, vouchers, times', state: 'done' },
        { b: 'Urgent reaches you', s: 'Only when it should', tag: 'Escalate', amber: true },
      ],
      foot: ['The same number, working while you sleep.'],
    },
  ],

  // ----------------------------------------------------------- automations
  inquiry: [
    {
      head: ['A message lands', 'Any channel'],
      rows: [
        { b: 'Inquiry form', s: 'meridiantravel.co/enquire', state: 'done' },
        { b: 'Email', s: 'Forwarded from hello@', state: 'done' },
        { b: 'WhatsApp', s: '+254 ··· 8810', state: 'done' },
      ],
      foot: ['However they reach you, it starts here.'],
    },
    {
      head: ['Brief', 'Being built'],
      rows: [
        { b: 'Kenya · 3 – 12 March', s: 'Read from the message', state: 'done' },
        { b: '2 adults', s: 'Read from the message', state: 'done' },
        { b: 'Budget', s: 'Not given', state: 'wait' },
      ],
      foot: ['Parsed into a structured brief, not a paragraph.'],
    },
    {
      head: ['Asked about', 'Only the gaps'],
      msgs: [
        { text: 'Two more things and I can get you options: rough budget per person, and are the dates fixed?', from: 'me' },
        { text: 'About €5k each, and yes — fixed.', from: 'them' },
      ],
      foot: ['It asks for what is missing. Nothing else.'],
    },
    {
      head: ['Confirmed', 'Moving to Planning'],
      rows: [
        { b: 'Brief confirmed with the traveller', s: 'In their own words', state: 'done' },
        { b: 'Trip record created', s: 'KE-2291', state: 'done' },
        { b: 'Stage 2 of 9', s: 'Planning', tag: 'Planning' },
      ],
      foot: ['Confirmed with them before it moves on.'],
    },
  ],

  quotation: [
    {
      head: ['Split', 'Nairobi — 9 nights'],
      rows: [
        { b: 'Game drives · Mara North', s: '3 nights', tag: 'Part 1' },
        { b: 'Lodging · Rift Valley', s: '4 nights', tag: 'Part 2' },
        { b: 'Transfers', s: 'Airport and inter-camp', tag: 'Part 3' },
      ],
      foot: ['Broken into what suppliers actually price.'],
    },
    {
      head: ['Requests out', 'All at once'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Asked · 09:02', state: 'done' },
        { b: 'Karen Overland Co.', s: 'Asked · 09:02', state: 'done' },
        { b: 'Mara North Collective', s: 'Asked · 09:02', state: 'done' },
      ],
      foot: ['Every qualified supplier asked in the same minute.'],
    },
    {
      head: ['Replies', 'Gathered'],
      rows: [
        { b: 'Rift Valley Ground Services', s: '€4,180 pp · full board', state: 'done' },
        { b: 'Karen Overland Co.', s: 'Declined · no availability', state: 'hold' },
        { b: 'Mara North Collective', s: 'Reminded · no reply yet', state: 'wait' },
      ],
      foot: ['A decline re-routes. A silence gets a nudge.'],
    },
    {
      head: ['Your call', 'Nothing chosen yet'],
      rows: [
        { b: 'Compare side by side', s: 'Cost, inclusions, terms', state: 'done' },
        { b: 'Choose one', s: 'You decide, every time', tag: 'Your call', amber: true },
        { b: 'Set the margin', s: 'Supplier still gets their full rate', tag: 'Your call', amber: true },
      ],
      foot: ['The engine asks. The choosing is yours.', 'Choose', true],
    },
  ],

  'follow-up': [
    {
      head: ['Trigger', 'Quiet for 4 days'],
      rows: [
        { b: 'Proposal v3 sent', s: 'Tuesday · opened twice', state: 'done' },
        { b: 'No reply since', s: '4 days', tag: 'Quiet' },
        { b: 'Follow-up due', s: 'Rule: nudge at day 4', state: 'now' },
      ],
      foot: ['It notices the silence you would have missed.'],
    },
    {
      head: ['Draft', 'From the trip'],
      msgs: [
        {
          text: 'Hi Lena — just checking the Mara North option still suits. Happy to swap day 4 if the camp is not right.',
          from: 'me',
          state: 'typing',
        },
      ],
      foot: ['Written from this trip, not a template blast.'],
    },
    {
      head: ['Sent', 'And written down'],
      rows: [
        { b: 'Sent on WhatsApp', s: 'Where she has been replying', state: 'done' },
        { b: 'Logged on the thread', s: 'You can see exactly what went', state: 'done' },
        { b: 'No second nudge', s: 'Unless the rule says so', state: 'hold' },
      ],
      foot: ['Nothing goes out that you cannot read back.'],
    },
    {
      head: ['She replied', 'Back to you'],
      rows: [
        { b: '“Day 4 swap sounds good”', s: '11 min ago', state: 'now' },
        { b: 'Follow-up stopped', s: 'No more nudges', state: 'done' },
        { b: 'Thread reopened', s: 'Yours to answer', tag: 'Your call', amber: true },
      ],
      foot: ['A reply ends the chasing and hands it back.', 'Open thread', true],
    },
  ],

  confirmation: [
    {
      head: ['Accepted', 'Proposal v3'],
      rows: [
        { b: 'Accepted on the page', s: 'Tuesday, 16:40', state: 'done' },
        { b: 'Not yet confirmed', s: 'Nothing is held', tag: 'Not held' },
        { b: 'Re-check starts', s: 'Stage 5 of 9', state: 'now' },
      ],
      foot: ['Accepted is not confirmed. This is the gap that closes it.'],
    },
    {
      head: ['Re-confirm', 'Every supplier'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Dates and rate re-checked', state: 'done' },
        { b: 'Mara North Collective', s: 'Asked · awaiting', state: 'wait' },
        { b: 'Transfers', s: 'Re-checked', state: 'done' },
      ],
      foot: ['Asked again at the moment of yes.'],
    },
    {
      head: ['A difference', 'Needs you'],
      rows: [
        { b: 'Camp moved day 4', s: 'Mara North → Naboisho', tag: 'Changed', amber: true },
        { b: 'Rate is €90 pp higher', s: 'Yours to accept or refuse', tag: 'Your call', amber: true },
        { b: 'Traveller not told yet', s: 'Held until you decide', tag: 'Held', amber: true },
      ],
      foot: ['A difference always stops for a person.', 'Decide', true],
    },
    {
      head: ['Confirmed', 'Both sides'],
      rows: [
        { b: 'Suppliers holding', s: 'In writing, on the thread', state: 'done' },
        { b: 'Traveller told', s: 'Itinerary updated on their link', state: 'done' },
        { b: 'Stage 6 of 9', s: 'Booking', tag: 'Booking' },
      ],
      foot: ['Everyone agreeing to the same trip, in writing.'],
    },
  ],

  collection: [
    {
      head: ['The list', 'Nairobi — 9 nights'],
      rows: [
        { b: 'Passport · Lena Ortiz', s: 'Traveller', tag: 'Needed' },
        { b: 'Passport · Mark Ortiz', s: 'Traveller', tag: 'Needed' },
        { b: 'Vouchers', s: 'Rift Valley Ground Services', tag: 'Needed' },
      ],
      foot: ['Built from what this trip actually requires.'],
    },
    {
      head: ['Requests', 'Out'],
      rows: [
        { b: 'Travellers asked', s: 'On their link · WhatsApp', state: 'done' },
        { b: 'Supplier asked', s: 'On their link · email', state: 'done' },
        { b: 'You asked nobody', s: 'It went out on its own', state: 'done' },
      ],
      foot: ['Each side asked where they already are.'],
    },
    {
      head: ['Coming in', '2 of 3'],
      rows: [
        { b: 'Passport · Lena Ortiz', s: 'Received · read', state: 'done' },
        { b: 'Vouchers', s: 'Received · filed', state: 'done' },
        { b: 'Passport · Mark Ortiz', s: 'Still missing', state: 'wait' },
      ],
      foot: ['Ticked off as they arrive.'],
    },
    {
      head: ['Chasing', '1 late'],
      rows: [
        { b: 'Mark Ortiz', s: 'Reminded twice', tag: 'Late' },
        { b: 'Travel in 9 days', s: 'Rule: escalate at day 10', state: 'now' },
        { b: 'Flagged to you', s: 'Chasing a person needs a person', tag: 'Your call', amber: true },
      ],
      foot: ['Chased on its own until it needs you.', 'Open', true],
    },
  ],

  payment: [
    {
      head: ['Confirmed', 'Nairobi — 9 nights'],
      rows: [
        { b: 'Suppliers holding', s: 'In writing', state: 'done' },
        { b: 'Deposit due', s: '€1,480 · 15%', tag: 'Due' },
        { b: 'Request sent', s: 'On the traveller’s link', state: 'done' },
      ],
      foot: ['The asking starts when the trip is really held.'],
    },
    {
      head: ['Received?', 'Yours to say'],
      rows: [
        { b: 'Transfer shows in your bank', s: 'You check it', tag: 'By hand', amber: true },
        { b: 'Mark as received', s: 'Only a person does this', tag: 'By hand', amber: true },
        { b: 'Never assumed', s: 'No bank is being read', state: 'hold' },
      ],
      foot: ['This is the step that is deliberately not automatic.', 'Mark received', true],
    },
    {
      head: ['Balance', 'On schedule'],
      rows: [
        { b: 'Due at day −14', s: '26 February', state: 'now' },
        { b: 'Request goes out', s: 'On its own', state: 'wait' },
        { b: 'Reminder if unpaid', s: 'After 3 days', state: 'wait' },
      ],
      foot: ['Asking is automatic. Confirming is not.'],
    },
    {
      head: ['In-platform', 'Intelligence'],
      rows: [
        { b: 'Pay on the link itself', s: 'Card or transfer', tag: 'Intelligence' },
        { b: 'Marked automatically', s: 'Because the platform took it', tag: 'Intelligence' },
        { b: 'On Autopilot', s: 'You still mark it by hand', tag: 'By hand', amber: true },
      ],
      foot: ['Processing inside Hyperporter is an Intelligence feature.'],
    },
  ],
};
