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

/** Real application chrome: a sidebar you navigate with, a toolbar, tabs,
    and a dense table or the full pipeline board. A screen that claims to be
    a CRM has to look like one. */
export interface StepShell {
  /** Whose application this is, at the head of the toolbar; false for none. */
  brand?: string | false;
  title: string;
  meta?: string;
  pills?: string[];
  who?: string;
  tabs?: string[];
  tab?: string;
  /** Cell forms: 'text' | '#go:Label' for a status dot | [name, initials]. */
  table?: { cols: string[]; rows: (string | [string, string])[][]; avatars?: boolean; num?: number[]; w?: string[] };
  kanban?: { name: string; n: string; cards: [string, string, boolean?][] }[];
  note?: string;
}

export interface StepScreen {
  shell?: StepShell;
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
    { shell: { title: 'Inbox', meta: '3 new', who: 'LO',
      pills: ['Unassigned'],
      table: { cols: ['From', 'What they wrote', 'Channel', 'When'], avatars: true,
        w: ['22%', '44%', '17%', '17%'],
        rows: [
          [['Lena Ortiz', 'LO'], '“Kenya in March, 9 nights, two of us…”', 'Inquiry form', '09:02'],
          [['Tom Achebe', 'TA'], '“Is the Mara good in March? Budget ~€4k pp.”', 'Email', '08:41'],
          [['Mira Sato', 'MS'], '“Hi! Planning a safari — where do we start?”', 'WhatsApp', 'Yesterday'],
          [['R. Fontaine', 'RF'], '“Peru in June, family of four.”', 'Inquiry form', 'Yesterday'],
        ] },
      note: 'However they reach you, it starts here — matched to a contact or opening one.' } },

    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · Quotation', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Magic link', 'Autopilot'], tab: 'Quotation board',
      table: { cols: ['Supplier', 'Offer', 'Cost pp', 'Sells at', 'Document', 'Status'],
        avatars: true, w: ['28%', '18%', '12%', '13%', '15%', '14%'],
        rows: [
          [['Rift Valley Ground Services', 'RV'], 'Classic · 8 days', '€4,180', '€4,932', 'PDF · 240 KB', '#go:In'],
          [['Rift Valley Ground Services', 'RV'], 'Shorter · 5 days', '€2,890', '€3,410', 'PDF · 198 KB', '#go:In'],
          [['Baobab Eco Safaris', 'BE'], 'Walking · 7 days', '€3,880', '€4,578', 'PDF · 310 KB', '#go:In'],
          [['Acacia Safari Logistics', 'AS'], 'Classic · 8 days', '—', '—', '—', '#amb:Reminded'],
        ] },
      note: 'Every quote you receive, on the trip, visible to everyone on your team.' } },

    { blocks: [
        { k: 'lbl', lbl: 'One trip · two links', title: 'What each side opens' },
        { k: 'cards', cards: [
          { title: 'Traveller', meta: 'Meridian Travel Co. · 9 nights, Kenya', price: '€4,932 pp', tag: 'Your branding' },
          { title: 'Supplier', meta: 'The request and their own quote', price: '€4,180 pp', tag: 'Their rate' },
        ] },
        { k: 'sum', label: 'Your margin, added between the two', value: '18%' },
        { k: 'note', text: 'Neither side sees the other’s number.' },
      ] },

    { shell: { title: 'Trips · closed', meta: 'KE-2291 archived', who: 'LO',
      pills: ['Completed'],
      table: { cols: ['Kept on the record', 'Detail', 'Count'], num: [2], w: ['34%', '46%', '20%'],
        rows: [
          ['Messages', 'Both sides, in order, every channel', '48'],
          ['Documents', 'Supplier quotes, vouchers, invoices', '6'],
          ['Rates as quoted', 'What was agreed, and when', '5 lines'],
          ['Suppliers used', 'Rift Valley GS, Mara North, Karen Overland', '3'],
        ] },
      note: 'Duplicate it and the next inquiry from Lena starts from all of this.' } },
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
    { shell: { title: 'Trips', meta: '14 open', who: 'LO',
      pills: ['All agents', 'This quarter'],
      kanban: [
        { name: 'Inquiry', n: '3', cards: [['Mira Sato', 'Japan · Oct'], ['R. Fontaine', 'Peru · Jun'], ['H. Okonkwo', 'Egypt · Feb']] },
        { name: 'Planning', n: '4', cards: [['Lena & Mark Ortiz', 'Kenya · Mar · v2 live'], ['The Achebe family', 'Peru · Jun'], ['D. Mwangi', 'Tanzania · Sep']] },
        { name: 'Quotation', n: '3', cards: [['J. Mendes', 'Chile · Nov · 2 offers'], ['S. Ferreira', 'Morocco · Apr']] },
        { name: 'Confirmation', n: '2', cards: [['P. Nair', 'Vietnam · Jan · re-checking', true], ['A. Silva', 'Portugal · May']] },
        { name: 'Booking', n: '1', cards: [['T. Achebe', 'Peru · deposit due', true]] },
        { name: 'Ready', n: '1', cards: [['K. Adeyemi', 'Kenya · 6 days out']] },
      ],
      note: 'One board for the whole agency. Colour is only ever a thread that needs a person.' } },

    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · Quotation', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Magic link', 'Autopilot'], tab: 'Quotation board',
      table: { cols: ['Supplier', 'Offer', 'Cost pp', 'Margin', 'Sells at', 'Status'],
        avatars: true, num: [2, 4], w: ['31%', '18%', '12%', '9%', '14%', '16%'],
        rows: [
          [['Rift Valley Ground Services', 'RV'], 'Classic · 8 days', '€4,180', '18%', '€4,932', '#go:Released'],
          [['Baobab Eco Safaris', 'BE'], 'Walking · 7 days', '€3,880', '18%', '€4,578', '#go:Released'],
          [['Acacia Safari Logistics', 'AS'], 'Classic · 8 days', '€4,505', '—', '—', '#amb:Draft'],
          [['Karen Overland Co.', 'KO'], 'Transfers only', '—', '—', '—', '#red:Declined'],
        ] },
      note: 'Cost and margin are on your side of the table. The traveller sees the last column only.' } },

    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · Booking', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Magic link', 'Autopilot'], tab: 'Pricing',
      table: { cols: ['Item', 'Due', 'Amount', 'Method', 'Status'], num: [2], w: ['30%', '13%', '15%', '15%', '27%'],
        rows: [
          ['Deposit · 30%', '14 Feb', '€1,480', 'Transfer', '#amb:You mark received'],
          ['Balance · 70%', '1 Mar', '€3,452', 'Transfer', '#:Not due'],
          ['Rift Valley GS payout', '5 Mar', '€4,180', 'Transfer', '#:Scheduled'],
          ['Vouchers · 2 of 3 in', '20 Feb', '—', 'Upload', '#amb:Chasing'],
        ] },
      note: 'Below Intelligence nothing marks itself paid — the amber rows are yours.' } },

    { shell: { title: 'Trips · closed', meta: '9 this quarter', who: 'LO',
      pills: ['Completed', 'Lost', 'Cancelled'],
      table: { cols: ['Traveller', 'Trip', 'Closed', 'Value', 'Outcome'], avatars: true, num: [3], w: ['27%', '24%', '13%', '13%', '23%'],
        rows: [
          [['Lena & Mark Ortiz', 'LO'], 'Kenya · 9 nights', '12 Mar', '€9,864', '#go:Completed'],
          [['K. Adeyemi', 'KA'], 'Kenya · 6 nights', '2 Mar', '€6,120', '#go:Completed'],
          [['S. Ferreira', 'SF'], 'Morocco · 5 nights', '28 Feb', '—', '#red:Lost · price'],
          [['H. Okonkwo', 'HO'], 'Egypt · 8 nights', '19 Feb', '—', '#red:Lost · no reply'],
        ] },
      note: 'Lost carries the stage it stopped at, which is where the funnel actually leaks.' } },
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
    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · flexible, March', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Magic link'], tab: 'Quotation board',
      table: { cols: ['Offer', 'Supplier', 'Shape', 'Document', 'Received'],
        w: ['16%', '30%', '21%', '19%', '14%'],
        rows: [
          ['Offer 1', 'Rift Valley Ground Services', 'Classic · 8 days', 'PDF · 240 KB', '09:41'],
          ['Offer 2', 'Rift Valley Ground Services', 'Shorter · 5 days', 'PDF · 198 KB', '09:41'],
          ['Offer 3', 'Baobab Eco Safaris', 'Walking · 7 days', 'PDF · 310 KB', '11:02'],
        ] },
      note: 'One supplier can send more than one. Each offer is a whole trip, not a price.' } },
    { shell: { title: 'Offer 3 · Baobab Eco Safaris', meta: 'Draft — not released', who: 'LO',
      tabs: ['Itinerary', 'Hotels', 'Inclusions', 'Terms', 'Pricing'], tab: 'Pricing',
      table: { cols: ['Line', 'Cost pp', 'Margin', 'Sells at', 'Visible to client'], num: [1, 3],
        w: ['30%', '15%', '13%', '15%', '27%'],
        rows: [
          ['Walking safari · 7 days', '€3,880', '18%', '€4,578', '#go:Selling price only'],
          ['Your note on this offer', '—', '—', '—', '#red:Never'],
          ['Their original document', '—', '—', '—', '#red:Never'],
        ] },
      note: 'Margin is editable per offer. Cost and margin never cross to their side.' } },
    { shell: { title: 'Meridian Travel Co.', meta: 'Your proposals · Kenya, March',
      table: { cols: ['Proposal', 'Shape', 'Price pp', 'Why this one'],
        w: ['22%', '22%', '15%', '41%'],
        rows: [
          ['Classic', '8 days · game drives', '€4,932', 'The widest wildlife coverage'],
          ['Walking', '7 days · on foot', '€4,578', 'The only one built around walking'],
          ['Shorter', '5 days · same supplier', '€3,410', 'If the dates have to tighten'],
        ] },
      note: 'The traveller’s own view. Selling price only — never the cost, never your margin.' } },
    { shell: { title: 'Walking · 7 days', meta: 'Chosen by the traveller', who: 'LO',
      table: { cols: ['Offer', 'Supplier', 'Price pp', 'State'],
        w: ['24%', '30%', '16%', '30%'],
        rows: [
          ['Walking · 7 days', 'Baobab Eco Safaris', '€4,578', '#amb:Confirmation requested'],
          ['Classic · 8 days', 'Rift Valley GS', '€4,932', '#go:Still available'],
          ['Shorter · 5 days', 'Rift Valley GS', '€3,410', '#go:Still available'],
        ] },
      note: 'The others are declined only once this one is actually booked.' } },
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
    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · one thread', who: 'LO',
      tabs: ['Overview', 'Thread', 'Quotation board', 'Pricing'], tab: 'Thread',
      table: { cols: ['Side', 'Who', 'Message', 'Channel'], avatars: false,
        w: ['14%', '22%', '46%', '18%'],
        rows: [
          ['#go:Traveller', 'Lena Ortiz', '“Can we push the start by two days?”', 'Email'],
          ['#amb:Supplier', 'Rift Valley GS', '“Camp has space from the 5th.”', 'Email'],
          ['#amb:Supplier', 'Peter Kimani', '“Confirmed for the 5th, same driver.”', 'WhatsApp'],
          ['#go:Traveller', 'Lena Ortiz', '“Perfect — thank you!”', 'Email'],
        ] },
      note: 'Two conversations, one thread, each marked by side.' } },
    { head: ['Reply in place', 'Goes back the same way'],
      msgs: [{ text: 'The 5th works — holding it now.', from: 'me' }],
      rows: [
        { b: 'To Lena', s: 'Email · her own thread', state: 'done' },
        { b: 'To the driver', s: 'WhatsApp · +254 ··· 8810', state: 'done' },
      ],
      blocks: [{ k: 'note', text: 'They never see each other’s channel, or each other.' }] },
    { shell: { title: 'KE-2291', meta: 'Full history', who: 'LO',
      tabs: ['Overview', 'Thread', 'Quotation board', 'Pricing'], tab: 'Thread',
      table: { cols: ['Time', 'Event', 'By', 'Kind'], w: ['14%', '46%', '22%', '18%'],
        rows: [
          ['09:02', 'Quote request sent to 3 suppliers', 'Autopilot', '#:Automatic'],
          ['09:41', 'Rift Valley GS replied · €4,180', 'Supplier', '#go:Message'],
          ['12:00', 'Reminder sent to Acacia', 'Autopilot', '#:Automatic'],
          ['12:41', 'Margin set to 18%', 'Lena Ortiz', '#:By a person'],
          ['13:05', 'Proposal shared with traveller', 'Lena Ortiz', '#:By a person'],
        ] },
      note: 'Automatic steps appear as steps, so the history is complete.' } },
    { shell: { title: 'Needs a person', meta: '2 flagged', who: 'LO',
      table: { cols: ['Trip', 'What happened', 'Raised', 'Action'], w: ['22%', '40%', '16%', '22%'],
        rows: [
          ['KE-2291', 'Driver not at the gate · flight in 2 h', '05:52', '#amb:Decide'],
          ['VN-0184', 'Rate changed after acceptance', 'Yesterday', '#amb:Approve'],
          ['PE-1180', 'Everything else relayed without you', '—', '#go:No action'],
        ] },
      note: 'Organised by what to do next, not buried in the sequence.' } },
  ],



  'document-vault': [
    { shell: { title: 'Vault', meta: '61 documents', who: 'LO',
      pills: ['All suppliers', '2026'],
      table: { cols: ['Document', 'Supplier', 'Covers', 'Uploaded', 'Status'],
        w: ['32%', '24%', '16%', '14%', '14%'],
        rows: [
          ['Rift Valley GS — rates 2026.pdf', 'Rift Valley GS', '48 rates', '2 Jan', '#go:Indexed'],
          ['Atlas Maroc 2026.pdf', 'Atlas Maroc', '112 rates', '2 Jan', '#go:Indexed'],
          ['Andes Trail — Sacred Valley.xlsx', 'Andes Trail', '36 rates', 'Today', '#amb:Indexing'],
          ['Mara North — contract 2026.pdf', 'Mara North', 'Terms only', '14 Dec', '#go:Indexed'],
          ['Karen Overland — transfers.pdf', 'Karen Overland', '19 rates', '9 Dec', '#red:Expired'],
        ] },
      note: 'Supplier and year are picked up from the document. You confirm them.' } },
    { shell: { title: 'Rift Valley GS — rates 2026.pdf', meta: '48 rates extracted', who: 'LO',
      tabs: ['Extracted', 'Source pages', 'Access log'], tab: 'Extracted',
      table: { cols: ['Line', 'Rate', 'Unit', 'Valid to', 'Page'], num: [1],
        w: ['32%', '14%', '20%', '16%', '18%'],
        rows: [
          ['Game drives · Mara North', 'USD 95', 'per person per day', '31 Mar', 'p.2'],
          ['Park fees · Mara North', 'USD 116', 'per adult per night', '31 Dec', 'p.5'],
          ['Full board supplement', 'USD 48', 'per person per day', '31 Mar', 'p.2'],
          ['Child rate · under 12', '−35%', 'of the adult rate', '31 Mar', 'p.6'],
        ] },
      note: 'Every figure shown against the page it came from, for you to check.' } },
    { shell: { title: 'Vault', meta: 'Searched', who: 'LO',
      pills: ['park fee, Mara North, March'],
      table: { cols: ['Match', 'Document', 'Where', 'Confidence'],
        w: ['30%', '34%', '16%', '20%'],
        rows: [
          ['USD 116 per adult per night', 'Rift Valley GS — rates 2026.pdf', 'p.5', '#go:Exact'],
          ['Park fees not included in drive', 'Rift Valley GS — rates 2026.pdf', 'p.2', '#go:Exact'],
          ['No park fees on file', 'Atlas Maroc 2026.pdf', '—', '#:Nothing'],
        ] },
      note: 'Queryable, and every extracted figure knows its page.' } },
    { head: ['Atlas', 'Reading your Vault'],
      msgs: [
        { text: 'Park fee for Mara North in March?', from: 'me' },
        { text: 'USD 116 per adult per night, billed separately from the drive itself.',
          cite: 'Rift Valley GS — rates 2026.pdf · p.5' },
      ],
      blocks: [{ k: 'note', text: 'Every access is written to the audit log.' }] },
  ],



  'itinerary-generator': [
    { shell: { title: 'Mira Sato', meta: 'KE-2292 · Planning', who: 'LO',
      tabs: ['Overview', 'Itinerary', 'Quotation board'], tab: 'Overview',
      table: { cols: ['Field', 'From the inquiry', 'State'], w: ['24%', '50%', '26%'],
        rows: [
          ['Where', 'Kenya · the Mara', '#go:Given'],
          ['When', 'March · 9 nights', '#go:Given'],
          ['Who', '2 adults', '#go:Given'],
          ['Budget', '€4,000 per person', '#go:Given'],
          ['Pace', '—', '#amb:Asked, not assumed'],
        ] } } },
    { shell: { title: 'Matching', meta: 'From your Vault', who: 'LO',
      table: { cols: ['Part', 'Supplier', 'Rate', 'Valid to', 'Use'],
        w: ['22%', '28%', '15%', '15%', '20%'],
        rows: [
          ['Game drives', 'Rift Valley Ground Services', 'USD 95 pp/day', '31 Mar', '#go:Matched'],
          ['Lodging', 'Mara North Collective', 'USD 240 pp/night', '30 Apr', '#go:Matched'],
          ['Transfers', 'Karen Overland Co.', 'USD 180 pp', 'Expired', '#red:Skipped'],
        ] },
      note: 'Only a supplier with a rate valid for those dates is used.' } },
    { shell: { title: 'Itinerary · draft', meta: 'KE-2292 · 9 nights', who: 'LO',
      tabs: ['Overview', 'Itinerary', 'Quotation board'], tab: 'Itinerary',
      table: { cols: ['Day', 'Where', 'What', 'Priced from'], w: ['12%', '22%', '36%', '30%'],
        rows: [
          ['1 – 2', 'Nairobi', 'Arrival, overnight, transfer out', 'Karen Overland · p.3'],
          ['3 – 5', 'Mara North', 'Game drives, full board', 'Rift Valley · p.2'],
          ['6 – 7', 'Mara North', 'Walking, conservancy fees', 'Rift Valley · p.5'],
          ['8 – 9', 'Rift Valley', 'Lakes, return transfer', 'Mara North · p.1'],
        ] },
      note: 'Every line cited to the contract it was priced from.' } },
    { shell: { title: 'Mira Sato', meta: 'KE-2292 · Planning', who: 'LO',
      tabs: ['Overview', 'Itinerary', 'Quotation board'], tab: 'Itinerary',
      table: { cols: ['State', 'Detail', 'Who'], w: ['26%', '46%', '28%'],
        rows: [
          ['#go:Draft attached', 'On the trip, at Planning', 'Generated'],
          ['#go:Yours to edit', 'Change any line before it goes', 'You'],
          ['#amb:Not sent', 'Sending it as the proposal is your action', 'You'],
        ] } } },
  ],



  'payments-invoicing': [
    { shell: { title: 'Lena & Mark Ortiz', meta: 'KE-2291 · Pricing', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Magic link'], tab: 'Pricing',
      table: { cols: ['Item', 'Due', 'Amount', 'Shown to traveller', 'Status'], num: [2],
        w: ['28%', '13%', '15%', '22%', '22%'],
        rows: [
          ['Deposit · 30%', '14 Feb', '€1,480', 'On their link', '#go:Sent'],
          ['Balance · 70%', '1 Mar', '€3,452', 'On their link', '#:Not due'],
          ['Bank details', '—', '—', 'On their link', '#go:Shown'],
          ['Reference KE-2291', '—', '—', 'On their link', '#go:Shown'],
        ] },
      note: 'Amount, due date and how to pay — on every tier, including Showcase.' } },
    { shell: { title: 'Autopilot', meta: 'KE-2291', who: 'LO',
      tabs: ['Overview', 'Quotation board', 'Pricing', 'Autopilot'], tab: 'Autopilot',
      table: { cols: ['Step', 'Fires', 'Last run', 'Status'],
        w: ['32%', '26%', '20%', '22%'],
        rows: [
          ['Deposit request', 'On acceptance', '14 Feb 09:31', '#go:Sent'],
          ['Balance request', '14 days out', '—', '#:Scheduled'],
          ['Unpaid reminder', '7 days after due', '—', '#:Scheduled'],
          ['Mark received', 'Never — a person does this', '—', '#amb:Yours'],
        ] },
      note: 'The requests go out on their own. Nothing marks itself paid.' } },
    { head: ['Deposit · €1,480', 'KE-2291'],
      rows: [
        { b: 'Request sent', s: 'Automatic · 09:31', state: 'done' },
        { b: 'Money received', s: 'A person marks this', tag: 'Needs you', amber: true },
        { b: 'Then: Booking, supplier told', s: 'Follows your mark', state: 'wait' },
      ],
      foot: ['When it lands:', 'Mark received', true] },
    { shell: { title: 'Gateway processing', meta: 'Intelligence', who: 'LO',
      table: { cols: ['Movement', 'Party', 'Amount', 'Cleared', 'Stage'], num: [2],
        w: ['26%', '24%', '15%', '15%', '20%'],
        rows: [
          ['Deposit in', 'Lena & Mark Ortiz', '€1,480', '14 Feb', '#go:→ Booking'],
          ['Balance in', 'Lena & Mark Ortiz', '€3,452', '1 Mar', '#go:→ Ready'],
          ['Payout', 'Rift Valley GS', '€4,180', '5 Mar', '#go:Full rate'],
        ] },
      note: 'The supplier receives their full quoted rate. The only tier where the stage moves without a person.' } },
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
