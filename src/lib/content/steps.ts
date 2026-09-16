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
  /** The channel it arrived on, shown as a chip above the bubble. */
  via?: string;
  from?: 'me' | 'them';
  cite?: string;
  state?: 'typing';
}

/** A screen is composed of blocks, so each step can be the interface it
    describes rather than the same three-row list every time. */
export type StepBlock =
  | { k: 'lbl'; lbl: string; title: string }
  | { k: 'search'; q: string; meta?: string }
  | { k: 'kpis'; kpis: [string, string][] }
  | { k: 'fields'; pair?: boolean; fields: [string, string, boolean?][] }
  | { k: 'cols'; cols: { name: string; cards: [string, string][] }[] }
  | { k: 'cards'; cards: { title: string; meta: string; price?: string; tag?: string; amber?: boolean; on?: boolean }[] }
  | { k: 'files'; files: [string, string, string?][] }
  | { k: 'people'; people: [string, string, string, string?][] }
  | { k: 'doc'; title: string; lines: string[] }
  | { k: 'sum'; label: string; value: string }
  | { k: 'note'; text: string };

export interface StepScreen {
  /** The faded sheet behind the panel; `lines` are width classes s | m | l. */
  back?: { title: string; lines: string[] };
  blocks?: StepBlock[];
  wide?: boolean;
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
    /* A lead arriving: three real messages, on the three channels they come
       in on, with the people who sent them — not a list of channel names. */
    {
      back: { title: 'Meridian Travel Co.', lines: ['l', 'm', 'l', 's'] },
      head: ['Inbox', '3 new'],
      blocks: [
        { k: 'people', people: [
          ['LO', 'Lena Ortiz', '“Kenya in March, 9 nights, two of us…”', 'Inquiry form'],
          ['TA', 'Tom Achebe', '“Is the Mara good in March? Budget ~€4k pp.”', 'Email'],
          ['MS', 'Mira Sato', '“Hi! Planning a safari — where do we start?”', 'WhatsApp'],
        ] },
        { k: 'note', text: 'However they reach you, it starts here.' },
      ],
    },
    /* Getting quotes: an actual thread with the supplier, and the document
       they attached. */
    {
      head: ['Rift Valley Ground Services', 'KE-2291'],
      msgs: [
        { text: 'Nairobi, 3 – 12 March. 2 travellers, wildlife and walking, no long drives. Can you quote?', from: 'me' },
        { text: 'Yes — €4,180 per person, full board. Park fees included. Holding until Friday.', from: 'them' },
      ],
      blocks: [
        { k: 'files', files: [['Rift Valley GS — Nairobi 9N.pdf', 'Their own quote, as sent · 240 KB', 'Attached']] },
        { k: 'note', text: 'Their reply lands on the trip, where your whole team can see it.' },
      ],
    },
    /* The magic link: the two views themselves, side by side, showing what
       each side actually sees — which is the whole point of the step. */
    {
      blocks: [
        { k: 'lbl', lbl: 'One trip · two links', title: 'What each side opens' },
        { k: 'cards', cards: [
          { title: 'Traveller', meta: 'Meridian Travel Co. · 9 nights, Kenya', price: '€4,932 pp', tag: 'Your branding' },
          { title: 'Supplier', meta: 'The request and their own quote', price: '€4,180 pp', tag: 'Their rate' },
        ] },
        { k: 'sum', label: 'Your margin, added between the two', value: '18%' },
        { k: 'note', text: 'Neither side sees the other’s number.' },
      ],
    },
    /* Archived: the record itself, as a document, with what it is kept for. */
    {
      back: { title: 'KE-2291 · archived', lines: ['m', 'l', 's'] },
      head: ['Lena & Mark Ortiz', 'Kenya · March 2026'],
      blocks: [
        { k: 'doc', title: 'What the record keeps', lines: [
          'Every message, both sides, in order',
          'Rates as quoted — what was agreed, and when',
          'The supplier’s own document, as they sent it',
        ] },
        { k: 'kpis', kpis: [['Messages', '48'], ['Documents', '6']] },
      ],
      foot: ['Start the next trip from this one.', 'Duplicate', false],
    },
  ],


  'atlas-ai': [
    { head: ['Vault', '61 documents'],
      blocks: [
        { k: 'files', files: [
          ['Rift Valley GS — rates 2026.pdf', 'Kenya · 48 rates · valid to 31 Mar', 'Indexed'],
          ['Atlas Maroc 2026.pdf', 'Morocco · 112 rates', 'Indexed'],
          ['Andes Trail — Sacred Valley.xlsx', 'Peru · 36 rates', 'Indexing'],
        ] },
        { k: 'note', text: 'Read, its rates and validity extracted, made queryable.' },
      ] },
    { head: ['Nairobi — 9 nights', 'KE-2291'],
      msgs: [{ text: 'Mara North game drives in March — is the park fee included in their rate?', from: 'me' }],
      composer: ['Ask about your contracts…', 'Ask'],
      blocks: [{ k: 'note', text: 'Asked on the trip, where the work already is.' }] },
    { head: ['Atlas', 'Answering'],
      msgs: [
        { text: 'Mara North game drives in March — is the park fee included?', from: 'me' },
        { text: 'No. USD 95 pp per day through 31 March covers the drive. Park fees are USD 116 per adult per night, billed separately.',
          cite: 'Rift Valley GS — rates 2026.pdf · p.2, p.5' },
      ],
      blocks: [{ k: 'note', text: 'If the Vault has nothing on it, Atlas says so rather than guessing.' }] },
    { head: ['Draft quote', 'Not sent'],
      blocks: [
        { k: 'doc', title: 'Atlas drafted', lines: ['Game drives · USD 95 pp/day', 'Park fees · USD 116 pp/night', 'Valid through 31 March'] },
        { k: 'note', text: 'Atlas drafts and suggests. Sending it is yours.' },
      ],
      foot: ['Review before it goes.', 'Send quote', true] },
  ],


  'crm-workflow': [
    { head: ['KE-2291', 'Inquiry → Planning'],
      blocks: [
        { k: 'cols', cols: [
          { name: 'Inquiry', cards: [['Brief confirmed', 'Kenya · 9 nights']] },
          { name: 'Planning', cards: [['Itinerary v1', 'Proposed for you']] },
        ] },
        { k: 'note', text: 'On Showcase you write it. On Autopilot the first draft is proposed.' },
      ] },
    { head: ['KE-2291', 'Quotation → Confirmation'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Rift Valley GS', meta: 'Quoted, on the thread', price: '€4,180' },
          { title: 'With your margin', meta: '18%, applied on the board', price: '€4,932', tag: 'To traveller' },
        ] },
        { k: 'note', text: 'The accepted quote is re-checked with the supplier before money moves.' },
      ] },
    { head: ['KE-2291', 'Booking → Ready'],
      rows: [
        { b: 'Deposit · €1,480', s: 'Requested automatically', state: 'done' },
        { b: 'Money received', s: 'A person marks this', tag: 'Needs you', amber: true },
        { b: 'Vouchers and ground contact', s: 'Gathered before departure', state: 'wait' },
      ],
      blocks: [{ k: 'note', text: 'Marking money received is never automatic below Intelligence.' }] },
    { head: ['KE-2291', 'Traveling → Completed'],
      blocks: [
        { k: 'kpis', kpis: [['Live days', '9'], ['Relayed', '31 messages']] },
        { k: 'doc', title: 'Then it closes itself', lines: ['Feedback asked for, once home', 'Everything resolved, the record archives'] },
      ] },
  ],


  'inquiry-form': [
    { wide: false,
      blocks: [
        { k: 'lbl', lbl: 'Your form', title: 'meridiantravel.co/enquire' },
      ],
      rows: [
        { b: 'In your Instagram bio', s: 'Tap-through, no app', state: 'done' },
        { b: 'In your email signature', s: 'Every thread you send', state: 'done' },
        { b: 'On your site', s: 'Or wherever they find you', state: 'done' },
      ],
      foot: ['One URL. Put it where they already are.', 'Copy link', false] },
    { back: { title: 'Meridian Travel Co.', lines: ['l', 'm', 'l', 's'] },
      blocks: [
        { k: 'lbl', lbl: 'New inquiry', title: 'Tell us about the trip' },
        { k: 'fields', pair: true, fields: [['Where', 'Kenya, the Mara'], ['When', 'Early March']] },
        { k: 'fields', fields: [['Budget, per person', '€4,000 – 4,500', true]] },
        { k: 'note', text: 'On your page, on any device, with your branding on the confirmation.' },
      ],
      foot: ['Short and guided.', 'Send', false] },
    { head: ['Trips', '8 open'],
      blocks: [
        { k: 'cols', cols: [
          { name: 'Inquiry', cards: [['Lena Ortiz · Kenya', 'New · just now'], ['Tom Achebe · Peru', '2 days ago']] },
          { name: 'Planning', cards: [['Mira Sato · Japan', 'Itinerary v2']] },
        ] },
        { k: 'note', text: 'A new contact and a new trip, with the brief ready to work from.' },
      ] },
    { head: ['Autopilot', 'From here'],
      rows: [
        { b: 'Brief checked back', s: 'With the traveller, automatically', state: 'done' },
        { b: 'First itinerary proposed', s: 'Nobody typed it', state: 'done' },
        { b: 'Waiting on their answer', s: 'Nudged at day 4', state: 'wait' },
      ],
      blocks: [{ k: 'note', text: 'It advances only once they confirm the brief in their own words.' }] },
  ],


  'quotation-board': [
    { head: ['Nairobi — flexible, March', '3 offers in'],
      blocks: [
        { k: 'files', files: [
          ['Rift Valley GS — classic 8N.pdf', 'As they sent it · 8 days', 'Offer 1'],
          ['Rift Valley GS — short 5N.pdf', 'Same supplier, shorter route', 'Offer 2'],
          ['Baobab Eco — walking 7N.pdf', 'Walking, not game drives', 'Offer 3'],
        ] },
        { k: 'note', text: 'One supplier can send more than one. Each is a whole trip.' },
      ] },
    { head: ['Baobab Eco · 7 days', 'Draft'],
      blocks: [
        { k: 'doc', title: 'What this offer carries', lines: ['Day-by-day, all seven days', 'Hotels, room types, nights', 'Park fees in · flights out'] },
        { k: 'sum', label: 'Cost €3,880 · your margin 18%', value: '€4,578' },
        { k: 'note', text: 'Your note on this offer never leaves your side.' },
      ],
      foot: ['Yours until you release it.', 'Release to traveller', true] },
    { head: ['What the traveller sees', '3 released'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Classic · 8 days', meta: 'Game drives, Mara North', price: '€4,932 pp' },
          { title: 'Walking · 7 days', meta: 'The only one built on foot', price: '€4,578 pp', on: true },
          { title: 'Shorter · 5 days', meta: 'Same supplier, less time', price: '€3,410 pp' },
        ] },
        { k: 'note', text: 'Selling price only. Never the cost, never your margin.' },
      ] },
    { head: ['Walking · 7 days', 'Chosen'],
      rows: [
        { b: 'Confirmation requested', s: 'Sent to Baobab Eco', tag: 'Waiting', amber: true },
        { b: 'Classic · 8 days', s: 'Still available as a backup', state: 'done' },
        { b: 'Shorter · 5 days', s: 'Still available as a backup', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'The others are declined only once this one is booked.' }] },
  ],



  'proposal-share': [
    { head: ['KE-2291', 'One action'],
      blocks: [
        { k: 'doc', title: 'Built from the record', lines: ['The offer the traveller chose', 'The day-by-day, as quoted', 'Your terms and payment schedule'] },
        { k: 'note', text: 'Nothing retyped. It is the record, laid out.' },
      ],
      foot: ['Generate the proposal.', 'Generate', false] },
    { head: ['Send it', 'However they read'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Link', meta: 'Opens in a browser', tag: 'Stays current' },
          { title: 'PDF', meta: 'For an inbox that wants one', tag: 'Snapshot' },
          { title: 'Text', meta: 'The link, on WhatsApp', tag: 'Fastest' },
        ] },
        { k: 'note', text: 'A link updates when the price does. A PDF does not.' },
      ] },
    { head: ['Proposal v3', 'Opened twice'],
      blocks: [
        { k: 'kpis', kpis: [['Opened', '2 times'], ['Last seen', '2 h ago'] ] },
        { k: 'note', text: 'So a follow-up is timed rather than guessed.' },
      ] },
    { head: ['Accepted', 'On their link'],
      rows: [
        { b: 'Lena Ortiz accepted', s: 'On the traveller link · 09:12', state: 'done' },
        { b: 'Trip moved to Confirmation', s: 'Automatic', state: 'done' },
        { b: 'Rift Valley GS asked to re-confirm', s: 'Before money moves', state: 'now' },
      ] },
  ],


  'client-supplier-dashboard': [
    { blocks: [
        { k: 'lbl', lbl: 'One record · two links', title: 'What each side opens' },
        { k: 'cards', cards: [
          { title: 'Traveller', meta: 'Itinerary, documents, payments', price: '€4,932 pp', tag: 'Your branding' },
          { title: 'Supplier', meta: 'The request and their own quote', price: '€4,180 pp', tag: 'Their rate' },
        ] },
        { k: 'note', text: 'Rendered from the record at the moment it is opened.' },
      ] },
    { head: ['The record changed', 'Both views follow'],
      rows: [
        { b: 'Rift Valley GS revised the rate', s: '€4,180 → €4,240', state: 'now' },
        { b: 'Traveller link', s: 'Now shows €5,003 pp', state: 'done' },
        { b: 'No resend, no new PDF', s: 'Same link, new number', state: 'done' },
      ] },
    { head: ['Nairobi — 9 nights', 'Addressed to you'],
      msgs: [
        { via: 'Lena Ortiz · traveller dashboard', text: 'Could we add a night in Nairobi at the start?', from: 'them' },
        { text: 'Checking with the camp now — back to you today.', from: 'me' },
      ],
      blocks: [{ k: 'note', text: 'Either side asks. It lands on the trip thread, never on the other side.' }] },
    { head: ['Deposit · €1,480', 'KE-2291'],
      rows: [
        { b: 'Instructions on their link', s: 'Amount, due date, how to pay', state: 'done' },
        { b: 'Money received', s: 'A deliberate action on yours', tag: 'Needs you', amber: true },
      ],
      blocks: [{ k: 'note', text: 'Below Intelligence, nothing marks itself paid.' }] },
  ],


  'three-way-inbox': [
    { head: ['Nairobi — 9 nights', 'KE-2291'],
      msgs: [
        { via: 'Lena Ortiz · traveller', text: 'Can we push the start by two days?', from: 'them' },
        { via: 'Rift Valley GS · supplier', text: 'Camp has space from the 5th.', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'Both sides, one thread, each marked by side.' }] },
    { head: ['Reply in place', 'Goes back the same way'],
      msgs: [
        { text: 'The 5th works — holding it now.', from: 'me' },
      ],
      blocks: [{ k: 'note', text: 'The traveller gets an email, the driver gets a WhatsApp.' }],
      rows: [
        { b: 'To Lena', s: 'Email · her own thread', state: 'done' },
        { b: 'To the driver', s: 'WhatsApp · +254 ··· 8810', state: 'done' },
      ] },
    { head: ['On the thread', 'Automatic'],
      rows: [
        { b: 'Quote request sent', s: 'Autopilot · 09:02', state: 'done' },
        { b: 'Reminder sent', s: 'Autopilot · 12:00', state: 'done' },
        { b: 'Your reply', s: 'You · 12:41', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Automatic steps appear as steps, so the history is complete.' }] },
    { head: ['Needs a person', '2 flagged'],
      rows: [
        { b: 'Driver not at the gate', s: 'Traveller · 05:52 · urgent', tag: 'Decide', amber: true },
        { b: 'Rate changed after acceptance', s: 'Supplier · yesterday', tag: 'Approve', amber: true },
        { b: 'Everything else', s: 'Relayed without you', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Organised by what to do next, not buried in the sequence.' }] },
  ],


  'document-vault': [
    { back: { title: 'Drop a file', lines: ['l', 'm', 's'] },
      head: ['Upload', 'Rift Valley GS'],
      blocks: [
        { k: 'files', files: [['Rift Valley GS — rates 2026.pdf', '1.4 MB · just dropped', 'Reading']] },
        { k: 'fields', pair: true, fields: [['Supplier', 'Rift Valley Ground Services'], ['Year', '2026']] },
        { k: 'note', text: 'Picked up from the document. You confirm them.' },
      ] },
    { head: ['Extract', 'Beside the source'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Game drives', meta: 'p.2 · valid to 31 Mar', price: 'USD 95 pp/day' },
          { title: 'Park fees', meta: 'p.5 · per adult per night', price: 'USD 116' },
        ] },
        { k: 'note', text: 'Shown against the page it came from, for you to check.' },
      ] },
    { head: ['Index', '48 rates'],
      blocks: [
        { k: 'search', q: 'park fee, Mara North, March', meta: '3 results' },
        { k: 'files', files: [
          ['Rift Valley GS — rates 2026.pdf', 'p.5 · USD 116 per adult per night', 'Match'],
          ['Atlas Maroc 2026.pdf', 'No park fees on file', ''],
        ] },
      ] },
    { head: ['Answer', 'With the page'],
      msgs: [
        { text: 'Park fee for Mara North in March?', from: 'me' },
        { text: 'USD 116 per adult per night, billed separately from the drive.', cite: 'Rift Valley GS — rates 2026.pdf · p.5' },
      ],
      blocks: [{ k: 'note', text: 'Every access is written to the audit log.' }] },
  ],


  'itinerary-generator': [
    { head: ['The brief', 'KE-2292'],
      blocks: [
        { k: 'fields', pair: true, fields: [['Where', 'Kenya · the Mara'], ['When', 'March · 9 nights']] },
        { k: 'fields', pair: true, fields: [['Who', '2 adults'], ['Budget', '€4,000 pp']] },
        { k: 'note', text: 'A gap is asked about, never assumed.' },
      ] },
    { head: ['From your own suppliers', 'Valid for those dates'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Game drives · rate valid to 31 Mar', state: 'done' },
        { b: 'Mara North Collective', s: 'Lodging · rate valid to 30 Apr', state: 'done' },
        { b: 'Karen Overland Co.', s: 'Transfers · rate expired, skipped', state: 'wait' },
      ],
      blocks: [{ k: 'note', text: 'Matched from your Vault, not from a guess.' }] },
    { head: ['Draft · 9 days', 'Each line cited'],
      blocks: [
        { k: 'doc', title: 'Day 1 – 3 · Nairobi to the Mara', lines: [
          'Transfer and overnight · €180 pp — Karen Overland, p.3',
          'Mara North, 2 nights full board · €410 pp — Rift Valley, p.2',
        ] },
        { k: 'note', text: 'Every line priced from the contract it came from.' },
      ] },
    { head: ['On the trip', 'At Planning'],
      rows: [
        { b: 'Draft attached to KE-2292', s: 'Yours to edit', state: 'done' },
        { b: 'Nothing sent yet', s: 'Sending it is your action', tag: 'Needs you', amber: true },
      ],
      foot: ['Edit, then send as the proposal.', 'Open draft', false] },
  ],


  'payments-invoicing': [
    { head: ['Traveller dashboard', 'Every tier'],
      blocks: [
        { k: 'kpis', kpis: [['Deposit', '€1,480'], ['Due', '14 Feb']] },
        { k: 'doc', title: 'How to pay', lines: ['Bank transfer · IBAN on the link', 'Reference KE-2291', 'Balance €3,452 due 1 Mar'] },
        { k: 'note', text: 'Shown on their own link, on any tier.' },
      ] },
    { head: ['Autopilot', 'On schedule'],
      rows: [
        { b: 'Deposit request sent', s: 'Automatic · on acceptance', state: 'done' },
        { b: 'Balance request', s: 'Automatic · 14 days out', state: 'wait' },
        { b: 'Reminder', s: 'Automatic · if unpaid at 7 days', state: 'wait' },
      ] },
    { head: ['Deposit · €1,480', 'KE-2291'],
      rows: [
        { b: 'Request sent', s: 'Automatic · 09:31', state: 'done' },
        { b: 'Money received', s: 'A person marks this', tag: 'Needs you', amber: true },
        { b: 'Then: Booking, supplier told', s: 'Follows your mark', state: 'wait' },
      ],
      foot: ['When it lands:', 'Mark received', true] },
    { head: ['Gateway processing', 'Intelligence'],
      rows: [
        { b: 'Payment taken', s: 'Hyperporter processes it', state: 'done' },
        { b: 'Supplier paid', s: 'Their full quoted rate', state: 'done' },
        { b: 'Stage moved', s: 'As each side clears', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'The only tier where the stage moves without a person marking it.' }] },
  ],


  'support-relay': [
    { wide: false,
      head: ['WhatsApp', '+254 ··· 8810'],
      msgs: [{ via: 'Lena Ortiz · traveller', text: 'The driver isn’t at the gate and we have a 06:15 flight.', from: 'them' }],
      blocks: [{ k: 'note', text: 'To the trip’s relay number, in their own words.' }] },
    { head: ['Relay', 'Both directions'],
      blocks: [
        { k: 'people', people: [
          ['LO', 'Lena Ortiz', 'Traveller · sees a Hyperporter number', 'Masked'],
          ['PK', 'Peter Kimani', 'Driver today · sees a Hyperporter number', 'Masked'],
        ] },
        { k: 'note', text: 'Neither side ever sees the other’s real number or name.' },
      ] },
    { head: ['Handled without you', 'Logged anyway'],
      rows: [
        { b: 'Pickup time asked', s: 'Answered · 06:02', state: 'done' },
        { b: 'Meeting point sent', s: 'Answered · 06:04', state: 'done' },
        { b: 'Both on the thread', s: 'You did not need to be there', state: 'done' },
      ] },
    { head: ['Broke through', 'On your phone'],
      rows: [
        { b: 'Driver not at the gate', s: 'Flight in 2 h · flagged urgent', tag: 'Decide', amber: true },
        { b: 'Full context attached', s: 'Trip, day, both numbers', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Complaint language, a deviation, or “I need a human” stops the relay.' }] },
  ],


  email: [
    { head: ['Your address', 'Still yours'],
      blocks: [
        { k: 'fields', fields: [['Forward or connect', 'hello@meridiantravel.co', true]] },
        { k: 'note', text: 'Forward it on Showcase, or connect the mailbox from Autopilot up.' },
      ] },
    { head: ['Matched', 'To a trip'],
      blocks: [
        { k: 'people', people: [
          ['TA', 'Tom Achebe', 'tom@ ··· → Peru, June', 'Open trip'],
          ['··', 'Unknown sender', 'New address → new inquiry', 'New'],
        ] },
        { k: 'note', text: 'An unknown sender becomes an inquiry instead of being dropped.' },
      ] },
    { head: ['3-way inbox', 'One trip'],
      msgs: [
        { via: 'Tom Achebe · email', text: 'Can you send the revised itinerary?', from: 'them' },
        { via: 'Andes Trail · WhatsApp', text: 'Sacred Valley confirmed for the 12th.', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'Email and WhatsApp about the same trip, side by side.' }] },
    { head: ['After it is over', 'PE-1180'],
      blocks: [
        { k: 'kpis', kpis: [['Messages kept', '61'], ['Forwarded chains', '0']] },
        { k: 'note', text: 'What was agreed, and when — without anyone forwarding a thread.' },
      ] },
  ],


  whatsapp: [
    { head: ['Connect WhatsApp Business', 'Once, with us'],
      blocks: [{ k: 'fields', fields: [['Your business number', '+254 ··· 8810', true]] }],
      rows: [
        { b: 'Business API provisioned', s: 'For your account', state: 'done' },
        { b: 'Display name verified', s: 'Meridian Travel Co.', state: 'done' },
      ],
    },
    { head: ['Matched', 'To a trip'],
      blocks: [
        { k: 'people', people: [
          ['MS', 'Mira Sato', '+81 ··· 4417 → Japan, October', 'Open trip'],
          ['··', 'Unknown sender', '+254 ··· 2210 → new inquiry', 'New'],
        ] },
        { k: 'note', text: 'An unknown number becomes an inquiry instead of being dropped.' },
      ] },
    { head: ['3-way inbox', 'Read and reply'],
      msgs: [
        { via: 'Mira Sato · WhatsApp', text: 'What time is the pickup?', from: 'them' },
        { text: '06:15 from the lodge — driver is Peter, plate KDJ 441H.', from: 'me' },
      ],
      blocks: [{ k: 'note', text: 'Templates cover the messages WhatsApp requires them for.' }] },
    { head: ['Support relay', 'Same connection'],
      rows: [
        { b: 'Runs during Traveling', s: 'If you switch it on', state: 'wait' },
        { b: 'Metered per active trip', s: 'Not bundled', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Without it the thread still moves; you coordinate directly.' }] },
  ],


  // ----------------------------------------------------------- automations
  inquiry: [
    /* The raw message, exactly as it arrives — unstructured, on a channel. */
    {
      wide: false,
      head: ['WhatsApp', '+81 ··· 4417'],
      msgs: [
        { via: 'Mira Sato · WhatsApp', text: 'Hi! Me and my husband want to do Kenya sometime in March, maybe 9 or 10 days. We love wildlife but not hours in a jeep. Around 4k each?', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'One paragraph, no structure, on whatever channel they use.' }],
    },
    /* The same message, parsed into the fields of a brief. */
    {
      blocks: [
        { k: 'lbl', lbl: 'Parsed from that message', title: 'The brief' },
        { k: 'fields', pair: true, fields: [['Where', 'Kenya · the Mara'], ['When', 'March · 9 – 10 nights']] },
        { k: 'fields', pair: true, fields: [['Travellers', '2 adults'], ['Budget, per person', '€4,000']] },
        { k: 'fields', fields: [['Wants', 'Wildlife, walking — no long drives', true]] },
        { k: 'note', text: 'Every field taken from what they actually wrote.' },
      ],
    },
    /* The gap, asked as one question rather than a form to fill in. */
    {
      wide: false,
      head: ['One question back', 'Not a form'],
      msgs: [
        { text: 'Two things before I price it: are the dates fixed, and is a fly-in camp in budget?', from: 'me' },
        { text: 'Dates flexible by a few days. Fly-in is fine if it saves driving.', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'Only what is genuinely missing, batched into one message.' }],
    },
    /* The confirmed brief — and the line that says a person still decides. */
    {
      head: ['Brief · KE-2292', 'Confirmed by the traveller'],
      blocks: [
        { k: 'doc', title: 'Kenya · 9 nights · 2 adults', lines: [
          'Dates flexible, early March',
          'Wildlife and walking, no long drives',
          'Fly-in acceptable · €4,000 per person',
        ] },
        { k: 'note', text: 'Nothing advances until they confirm it in their own words.' },
      ],
      foot: ['Ready to quote', 'Open the board', false],
    },
  ],


  quotation: [
    { head: ['Itinerary → requests', 'KE-2291'],
      rows: [
        { b: 'Game drives · Mara North', s: '3 nights · 2 travellers', tag: 'Request' },
        { b: 'Lodging · Rift Valley', s: '4 nights · full board', tag: 'Request' },
        { b: 'Transfers', s: 'Airport and inter-camp', tag: 'Request' },
      ],
      blocks: [{ k: 'note', text: 'Each line becomes a request with dates, travellers and what is needed.' }] },
    { head: ['Sent at once', 'Reply by Thu'],
      blocks: [
        { k: 'people', people: [
          ['RV', 'Rift Valley Ground Services', 'Qualified · game drives, lodging', 'Sent 09:02'],
          ['AS', 'Acacia Safari Logistics', 'Qualified · game drives', 'Sent 09:02'],
          ['KO', 'Karen Overland Co.', 'Qualified · transfers only', 'Sent 09:02'],
        ] },
        { k: 'note', text: 'A transport-only operator never receives a request including lodging.' },
      ] },
    { head: ['Replies', '2 of 3'],
      rows: [
        { b: 'Rift Valley Ground Services', s: 'Replied 09:41', tag: '€4,180' },
        { b: 'Acacia Safari Logistics', s: 'Reminder sent 12:00', state: 'wait' },
        { b: 'Karen Overland Co.', s: 'Declined · re-routed to a backup', state: 'now' },
      ] },
    { head: ['The board', 'Your margin on top'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Rift Valley', meta: 'Full board, park fees in', price: '€4,180', on: true },
          { title: 'Acacia', meta: 'Room only', price: '€3,940' },
        ] },
        { k: 'sum', label: 'Your margin 18%', value: '€4,932 pp' },
      ],
      foot: ['You pick per part.', 'Build the proposal', true] },
  ],


  'follow-up': [
    { head: ['Triggers', 'Per trip'],
      rows: [
        { b: 'Proposal opened, not answered', s: '4 days', tag: 'Due' },
        { b: 'Days to departure', s: '14 and 3', state: 'wait' },
        { b: 'Days since return', s: '2', state: 'wait' },
      ],
      blocks: [{ k: 'note', text: 'Time-based, on the trip’s own dates.' }] },
    { head: ['Drafted', 'Not sent yet'],
      blocks: [
        { k: 'doc', title: 'From your template', lines: [
          'Hi Lena — just checking the Mara itinerary landed.',
          'Happy to move the dates if early March is tight.',
        ] },
        { k: 'note', text: 'The trip’s details filled in, on the channel she actually uses.' },
      ] },
    { head: ['Sent', 'On the thread'],
      rows: [
        { b: 'Nudge sent', s: 'WhatsApp · 10:00, automatic', state: 'done' },
        { b: 'Shown as a step', s: 'So the history is complete', state: 'done' },
      ] },
    { head: ['She replied', 'Back on the thread'],
      msgs: [
        { via: 'Lena Ortiz · WhatsApp', text: 'Sorry — yes! Can we look at the 5th instead?', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'A date change needs a decision, so it is flagged rather than answered.' }],
      foot: ['Needs a person.', 'Open the trip', true] },
  ],


  confirmation: [
    { head: ['Accepted', 'On their link'],
      rows: [
        { b: 'Lena Ortiz accepted', s: 'Traveller link · 09:12', state: 'done' },
        { b: 'Trip moved to Confirmation', s: 'Automatic', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Before money moves, everything is re-checked.' }] },
    { head: ['Re-confirm', 'Each supplier'],
      msgs: [
        { text: 'Confirming 3 – 12 March, 2 travellers, as quoted at €4,180 pp. Still available?', from: 'me' },
        { text: 'Confirmed for the 3rd. Same rate.', from: 'them' },
      ],
      blocks: [{ k: 'note', text: 'Asked on their own side, against the exact accepted itinerary.' }] },
    { head: ['Not as quoted', 'Two paths'],
      rows: [
        { b: 'Minor: rate moved €60', s: 'Put to the traveller · round 1 of 2', tag: 'Minor', amber: true },
        { b: 'Major: camp unavailable', s: 'Backup from the board, scoped', tag: 'Major', amber: true },
      ],
      blocks: [{ k: 'note', text: 'Two rounds, then it stops and asks you.' }] },
    { head: ['Confirmed', 'KE-2291'],
      rows: [
        { b: 'All lines confirmed', s: 'Every supplier, in writing', state: 'done' },
        { b: 'Moved to Booking', s: 'Payment requests begin', state: 'done' },
      ] },
  ],


  collection: [
    { head: ['The list', 'From the confirmed trip'],
      blocks: [
        { k: 'cols', cols: [
          { name: 'Traveller owes', cards: [['Passport scans', '2 travellers'], ['Dietary notes', 'Both']] },
          { name: 'Supplier owes', cards: [['Vouchers', 'Rift Valley GS'], ['Ground contact', 'Driver + emergency']] },
        ] },
        { k: 'note', text: 'Built from what was actually confirmed, not a generic checklist.' },
      ] },
    { head: ['Asked', 'Due 14 Feb'],
      rows: [
        { b: 'Lena & Mark Ortiz', s: 'Asked on their link · due 14 days out', state: 'now' },
        { b: 'Rift Valley Ground Services', s: 'Asked on their link · due 14 days out', state: 'now' },
      ],
      blocks: [{ k: 'note', text: 'Each due date is set back from departure, not from today.' }] },
    { head: ['Coming in', '3 of 5'],
      blocks: [
        { k: 'files', files: [
          ['Ortiz — passports.pdf', 'Uploaded by the traveller', 'Complete'],
          ['Rift Valley — voucher KE-2291.pdf', 'Uploaded by the supplier', 'Complete'],
          ['Ground contact form', 'Filled on their link', 'Complete'],
        ] },
      ] },
    { head: ['Still missing', '6 days out'],
      rows: [
        { b: 'Dietary notes', s: 'Reminded twice', state: 'wait' },
        { b: 'Emergency contact', s: 'Reminded twice', tag: 'Flagged', amber: true },
      ],
      blocks: [{ k: 'note', text: 'What is still missing near departure is flagged to you, not chased forever.' }] },
  ],


  payment: [
    { head: ['Deposit · €1,480', 'From the accepted proposal'],
      blocks: [
        { k: 'kpis', kpis: [['Deposit', '€1,480'], ['Balance', '€3,452']] },
        { k: 'note', text: 'Generated from what they actually accepted, and sent.' },
      ] },
    { head: ['Money received', 'KE-2291'],
      rows: [
        { b: 'Request sent', s: 'Automatic · 09:31', state: 'done' },
        { b: 'You mark it received', s: 'A deliberate action', tag: 'Needs you', amber: true },
        { b: 'Then: Booking, suppliers told', s: 'Follows your mark', state: 'wait' },
      ],
      foot: ['Nothing marks itself paid.', 'Mark received', true] },
    { head: ['Balance', 'Due 1 Mar'],
      rows: [
        { b: 'Requested', s: 'Automatic · 14 days out', state: 'done' },
        { b: 'Reminder', s: 'Automatic · 7 days out', state: 'wait' },
        { b: 'You mark it received', s: 'Again, yours', tag: 'Needs you', amber: true },
      ] },
    { head: ['Gateway processing', 'Intelligence'],
      rows: [
        { b: 'Payment taken', s: 'Hyperporter processes it', state: 'done' },
        { b: 'Supplier paid in full', s: 'Their quoted rate, untouched', state: 'done' },
        { b: 'Stage moves', s: 'As each side clears', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'The one tier where the stage moves without a person marking it.' }] },
  ],

  /* Customers pages (founder's ask, Sep 2026). These carried one screen for
     the whole accordion, so three of every four steps sat beside a picture of
     something else. One screen per step, same as the tool and automation
     pages. */
  'agent-portal': [
    { head: ['Your form', 'Where they already find you'],
      blocks: [
        { k: 'people', people: [
          ['in', 'LinkedIn', 'On your profile', '4 this week'],
          ['@', 'Email signature', 'On every thread you send', '2 this week'],
          ['ig', 'Instagram bio', 'One tap, no app', '7 this week'],
        ] },
        { k: 'note', text: 'Every submission lands in the CRM as a structured lead.' },
      ] },
    { head: ['Horizon · Kenya', '12 vetted suppliers'],
      blocks: [
        { k: 'search', q: 'Kenya · game drives · March', meta: '12 results' },
        { k: 'cards', cards: [
          { title: 'Nairobi DMC', meta: 'Replies in 40 min · identity shown on inquiry', tag: 'Request quote' },
          { title: 'Coast operator', meta: 'Replies in 2 h · identity shown on inquiry', tag: 'Request quote' },
        ] },
        { k: 'note', text: 'Horizon adds 10%. The supplier receives their full quoted rate.' },
      ] },
    { head: ['Autopilot', 'Running'],
      rows: [
        { b: 'Reprice loop', s: 'Round 1 of 2 · supplier revised', state: 'now' },
        { b: 'Confirmation chasing', s: 'Both sides answered', state: 'done' },
        { b: 'Round 2 hit the cap', s: 'Stopped and asked you', tag: 'Decide', amber: true },
      ],
      blocks: [{ k: 'note', text: 'Two rounds, then a person. Unbounded back-and-forth is a stalled negotiation.' }] },
    { blocks: [
        { k: 'lbl', lbl: 'Meridian Travel Co.', title: 'What the traveller opens' },
        { k: 'cards', cards: [
          { title: 'Your logo', meta: 'On both links', tag: 'Yours' },
          { title: 'meridiantravel.co', meta: 'Your own domain', tag: 'Yours' },
          { title: 'Powered by Hyperporter', meta: 'Removed', tag: 'Gone' },
        ] },
        { k: 'note', text: 'A proposal that looks like your agency, not a template.' },
      ] },
  ],

  'supplier-portal': [
    { head: ['Requests · 2 new', 'Free on Showcase'],
      rows: [
        { b: 'Laikipia · 3 nights · family of 5', s: 'From Meridian Travel Co.', tag: 'Quote by Thu' },
        { b: 'Mara North · 4 nights', s: 'From Atlas Voyages', state: 'wait' },
        { b: 'Your own quote format', s: 'No change to how you work', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Organise inbound requests at no cost, ever.' }] },
    { head: ['Your own inbox', 'From Intelligence'],
      msgs: [
        { via: 'Meridian Travel Co. · WhatsApp', text: 'Can you hold 4 nights in Laikipia, early March?', from: 'them' },
        { text: 'Yes — holding until Friday. Sending the rate now.', from: 'me' },
      ],
      blocks: [{ k: 'note', text: 'The same inbox and thread you already check. No new app.' }] },
    { head: ['Atlas', 'From your own rates'],
      msgs: [
        { text: 'Laikipia, 3 nights, family of 5 — what do we quote?', from: 'me' },
        { text: 'USD 2,480 per person, full board. Child rate applies to one of the five.',
          cite: 'Your contracted rates 2026.pdf · p.4' },
      ],
      blocks: [{ k: 'note', text: 'Your contracts only. Never anyone else’s.' }] },
    { head: ['Horizon', 'Listed'],
      blocks: [
        { k: 'kpis', kpis: [['Cost to appear', '€0'], ['Fee to reply', '€0']] },
        { k: 'note', text: 'Your identity stays confidential until an inquiry reaches you.' },
      ] },
  ],

  'travel-agencies': [
    { head: ['Team', 'One stage engine'],
      blocks: [
        { k: 'people', people: [
          ['LO', 'Lena Ortiz', 'Owner', '6 open'],
          ['DA', 'Daniel Achebe', 'Agent', '4 open'],
          ['PN', 'Priya Nair', 'Agent', '3 open'],
        ] },
        { k: 'note', text: 'Every agent, every trip, one board.' },
      ] },
    { blocks: [
        { k: 'lbl', lbl: 'Meridian Travel Co.', title: 'One brand, every agent' },
        { k: 'cards', cards: [
          { title: 'Your logo', meta: 'On every link, whoever sent it', tag: 'Yours' },
          { title: 'meridiantravel.co', meta: 'Your own domain', tag: 'Yours' },
        ] },
        { k: 'note', text: 'One brand across the whole team, not one per agent.' },
      ] },
    { head: ['Horizon', '130+ countries'],
      blocks: [
        { k: 'search', q: 'Peru · Sacred Valley · June', meta: '9 suppliers' },
        { k: 'note', text: 'One sourcing network shared across the team, not one per agent.' },
      ] },
    { head: ['Autopilot', 'This week'],
      blocks: [
        { k: 'kpis', kpis: [['Sent automatically', '23'], ['Needed a person', '2']] },
        { k: 'note', text: 'The chasing goes. The judgement stays with you.' },
      ] },
  ],

  'travel-agents': [
    { head: ['Your book', '13 open trips'],
      blocks: [
        { k: 'cols', cols: [
          { name: 'Quotation', cards: [['Lena & Mark Ortiz', 'Kenya · March']] },
          { name: 'Planning', cards: [['The Achebe family', 'Peru · June']] },
          { name: 'Inquiry', cards: [['Mira Sato', 'Japan · October']] },
        ] },
      ] },
    { blocks: [
        { k: 'lbl', lbl: 'One trip · two links', title: 'What each side opens' },
        { k: 'cards', cards: [
          { title: 'Traveller', meta: 'Itinerary, documents, payments', tag: 'Sent' },
          { title: 'Supplier', meta: 'The request and their own quote', tag: 'Sent' },
        ] },
        { k: 'note', text: 'No password, nothing to install.' },
      ] },
    { head: ['Deposit · €1,480', 'On every tier'],
      blocks: [
        { k: 'doc', title: 'On the traveller’s link', lines: ['Amount and due date', 'Bank details and reference', 'Balance €3,452 due 1 Mar'] },
        { k: 'note', text: 'Marking it received is always yours to do.' },
      ] },
    { head: ['Your form', 'Share anywhere'],
      blocks: [
        { k: 'fields', pair: true, fields: [['Where', 'Kenya, the Mara'], ['When', 'Early March']] },
        { k: 'note', text: 'Asked before it reaches you. Lands in your CRM as a structured lead.' },
      ] },
  ],

  'independent-advisors': [
    { blocks: [
        { k: 'lbl', lbl: 'From day one', title: 'On every client-facing link' },
        { k: 'cards', cards: [
          { title: 'Your logo', meta: 'Traveller and supplier views', tag: 'Showcase' },
          { title: 'Your name', meta: 'On the proposal and itinerary', tag: 'Showcase' },
        ] },
        { k: 'note', text: 'Included on the free tier. Your identity, not ours.' },
      ] },
    { head: ['Proposal', 'Your letterhead'],
      blocks: [
        { k: 'doc', title: 'Kenya · 9 nights · 2 adults', lines: [
          'Day 1 – 3 · Nairobi to the Mara',
          'Day 4 – 7 · Mara North, full board',
          'Day 8 – 9 · Rift Valley, return',
        ] },
        { k: 'note', text: 'A document that looks like your business, not a template.' },
      ],
      foot: ['Link, PDF or a message.', 'Share', false] },
    { head: ['Horizon', 'No supplier list needed'],
      blocks: [
        { k: 'search', q: 'Japan · October · 7 nights', meta: '7 suppliers' },
        { k: 'cards', cards: [
          { title: 'Kansai operator', meta: 'Identity shown once you inquire', tag: 'Request quote' },
          { title: 'Tokyo DMC', meta: 'Identity shown once you inquire', tag: 'Request quote' },
        ] },
        { k: 'note', text: 'Quote a country you have no relationship in. They still receive their full rate.' },
      ] },
    { head: ['Powered by Hyperporter', 'Removed'],
      blocks: [
        { k: 'cards', cards: [
          { title: 'Traveller link', meta: 'No badge', tag: 'Clean' },
          { title: 'Proposal', meta: 'No badge', tag: 'Clean' },
          { title: 'Supplier link', meta: 'No badge', tag: 'Clean' },
        ] },
        { k: 'note', text: 'Usually the first upgrade, and the reason why.' },
      ] },
  ],

  creators: [
    { back: { title: 'Meridian Travel Co.', lines: ['l', 'm', 's'] },
      blocks: [
        { k: 'lbl', lbl: 'New inquiry', title: 'Tell us about the trip' },
        { k: 'fields', pair: true, fields: [['Where', 'Kenya, the Mara'], ['When', 'Early March']] },
        { k: 'fields', fields: [['Budget, per person', 'From €4,000', true]] },
        { k: 'note', text: 'One link — bio, TikTok, a community post.' },
      ] },
    { blocks: [
        { k: 'lbl', lbl: 'Free tier', title: 'Your name on it' },
        { k: 'cards', cards: [
          { title: 'Your handle', meta: 'On the form itself', tag: 'Showcase' },
          { title: 'Your logo', meta: 'On every proposal they see', tag: 'Showcase' },
        ] },
        { k: 'note', text: 'It looks like you, from the first link.' },
      ] },
    { head: ['Inquiries', '9 this month'],
      blocks: [
        { k: 'people', people: [
          ['MS', 'Mira Sato', 'From the bio link', 'Inquiry'],
          ['TA', 'Tom Achebe', 'From a TikTok comment', 'Planning'],
        ] },
        { k: 'kpis', kpis: [['Tracked', '9'], ['Lost in DMs', '0']] },
      ] },
  ],

  dmcs: [
    { head: ['Requests · 2 new', 'Free'],
      rows: [
        { b: 'Laikipia · 3 nights · family of 5', s: 'From Meridian Travel Co.', tag: 'Quote by Thu' },
        { b: 'Mara North · 4 nights', s: 'From Atlas Voyages', state: 'wait' },
        { b: 'One place for all of it', s: 'However it arrived', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'Organise every inbound request at no cost.' }] },
    { head: ['Horizon', 'Listed'],
      blocks: [
        { k: 'kpis', kpis: [['Cost to appear', '€0'], ['Fee to reply', '€0']] },
        { k: 'note', text: 'Your identity stays confidential until an inquiry reaches you.' },
      ] },
    { head: ['Your own inbox', 'From Intelligence'],
      msgs: [
        { via: 'Meridian Travel Co. · WhatsApp', text: 'Any availability for 4 nights in Laikipia, early March?', from: 'them' },
        { text: 'Yes — holding until Friday.', from: 'me' },
      ],
      blocks: [{ k: 'note', text: 'Parsed straight into the CRM. No new app to check.' }] },
    { head: ['Atlas', 'From your own rates'],
      msgs: [
        { text: 'Laikipia, 3 nights, family of 5 — draft a quote.', from: 'me' },
        { text: 'USD 2,480 per person, full board. Child rate applies to one.',
          cite: 'Your contracted rates 2026.pdf · p.4' },
      ],
      blocks: [{ k: 'note', text: 'Your real contracted rates, on your terms.' }] },
  ],

  'tour-operators': [
    { head: ['Requests & quotes', 'One place'],
      blocks: [
        { k: 'cols', cols: [
          { name: 'To quote', cards: [['Northern circuit · 8 days', 'Meridian Travel Co.']] },
          { name: 'Quoted', cards: [['Coast extension · 4 days', 'Atlas Voyages'], ['Crater · 3 days', 'Sent Monday']] },
        ] },
      ] },
    { head: ['Northern circuit', 'Your letterhead'],
      blocks: [
        { k: 'doc', title: '8 days · 2 travellers', lines: [
          'Day 1 – 2 · Arusha, Tarangire',
          'Day 3 – 5 · Serengeti, central',
          'Day 6 – 8 · Ngorongoro, return',
        ] },
        { k: 'note', text: 'Built once, reused. No Hyperporter badge.' },
      ] },
    { head: ['Horizon', 'Listed'],
      blocks: [
        { k: 'kpis', kpis: [['Cost to appear', '€0'], ['Fee to reply', '€0']] },
        { k: 'note', text: 'Your identity stays confidential until an inquiry reaches you.' },
      ] },
    { head: ['Atlas', 'From your own rates'],
      msgs: [
        { text: 'Draft the northern circuit, 8 days, two travellers.', from: 'me' },
        { text: 'USD 3,940 per person. Park fees included, international flights not.',
          cite: 'Your contracted rates 2026.pdf · p.2, p.7' },
      ],
      blocks: [{ k: 'note', text: 'Packages drafted from your own real rates.' }] },
  ],


};
