/**
 * The other side of every screen: the same job, same trip, without
 * Hyperporter — inboxes, spreadsheets, phones. Every line is a person's,
 * so every line reads amber. Keyed by screen name (mockups/index.ts).
 * Short lines: a glance, not a read.
 */
export interface Without {
  head: [string, string];
  rows: [string, string, string][];
  fine: string;
}

export const WITHOUT: Record<string, Without> = {
  dashboard: {
    head: ['Meridian Travel Co.', 'Five tools, five logins'],
    rows: [
      ['CRM', 'A spreadsheet, 14 tabs', 'You'],
      ['Client updates', 'Email threads, v3 FINAL', 'You'],
      ['Inquiry form', 'Emails you, then nothing', 'You'],
      ['Automation', 'Calendar reminders', 'You'],
    ],
    fine: 'Held together by one person remembering.',
  },
  atlas: {
    head: ['Inbox · “Rift Valley rates”', '46 results'],
    rows: [
      ['Open rates 2026 v3 FINAL.pdf', 'Scroll to page 5', 'You · 8 min'],
      ['Is the addendum the latest?', 'WhatsApp a colleague', 'You · 20 min'],
      ['Type it into the quote', 'Fees worked out by hand', 'You'],
    ],
    fine: 'Same answer. Half an hour, no citation.',
  },
  board: {
    head: ['Trips.xlsx', 'Last saved Tuesday'],
    rows: [
      ['Nairobi · 9 nights', 'Row 14 · “quoting?”', 'You'],
      ['Cusco · 6 nights', 'Confirmed, in an email somewhere', 'You'],
      ['Marrakesh · 4 nights', 'Deposit? Check the bank', 'You'],
    ],
    fine: 'The truth is in your inbox.',
  },
  inquiry: {
    head: ['Contact form', 'Emails hello@'],
    rows: [
      ['“Kenya, March, two of us”', 'No dates, no budget', 'You'],
      ['Reply with the questions', 'Where, when, how much', 'You · day 1'],
      ['Type it into the spreadsheet', 'New row, by hand', 'You · day 2'],
    ],
    fine: 'The brief exists two days later.',
  },
  sourcing: {
    head: ['Quotes · Nairobi', 'Two emails, one voice note'],
    rows: [
      ['Rift Valley Ground Services', 'Replied Wednesday · €4,180', 'You'],
      ['Acacia Safari Logistics', 'Voice note · “around €4,500”', 'You'],
      ['Your margin', 'Calculator, then retype', 'You'],
    ],
    fine: 'Three days, and a total you hope you typed right.',
  },
  share: {
    head: ['Proposal', 'The Mara v3 FINAL (2).pdf'],
    rows: [
      ['Export, attach, send', '4.8 MB · bounced once', 'You'],
      ['They ask for a change', 'Edit, export, send v4', 'You'],
      ['Did they open it?', 'No way to know', 'You'],
    ],
    fine: 'Three versions in their inbox.',
  },
  sides: {
    head: ['Nairobi — 9 nights', 'Two threads, one phone'],
    rows: [
      ['Traveller asks what’s confirmed', 'Forward, minus the price', 'You'],
      ['Supplier asks if dates are firm', 'Forward, minus the budget', 'You'],
      ['Deposit due', 'Bank details in a reply', 'You'],
    ],
    fine: 'You are the record.',
  },
  inbox: {
    head: ['Marrakesh — 4 nights', 'WhatsApp, Gmail, a call'],
    rows: [
      ['Traveller on WhatsApp', '“Riad with a rooftop?”', 'You'],
      ['Email the DMC, wait', 'Thread of 31 messages', 'You · 3 h'],
      ['Copy the answer back', 'Retype the rate', 'You'],
    ],
    fine: 'One question, three apps.',
  },
  vault: {
    head: ['Contracts', 'Downloads, Drive, a laptop'],
    rows: [
      ['Rift Valley GS — rates 2026.pdf', 'Downloads · which version?', 'You'],
      ['Atlas Maroc 2026.pdf', 'Drive · editable by anyone', 'You'],
      ['Andes Trail — Sacred Valley.xlsx', 'An email from March', 'You'],
    ],
    fine: 'Finding the right one is the job.',
  },
  itinerary: {
    head: ['Draft · Kenya, 9 nights', 'Word · from scratch'],
    rows: [
      ['Day 1 · Nairobi · Hemingways', 'Find the rate in the PDF', 'You · 15 min'],
      ['Day 2–5 · Offbeat Mara', 'Check the contract', 'You · 15 min'],
      ['Day 6–8 · Naboisho', '2026 sheet or 2025?', 'You · 15 min'],
    ],
    fine: 'An hour later, no source on any line.',
  },
  invoice: {
    head: ['Payments · Marrakesh', 'Bank app, calendar, Word'],
    rows: [
      ['Deposit · €880', 'Check the bank · whose transfer?', 'You'],
      ['Balance · €3,520', 'Calendar alert · write the email', 'You'],
      ['Invoice INV-0937', 'Word template · retype every line', 'You'],
    ],
    fine: 'Invoice and proposal differ by a line.',
  },
  relay: {
    head: ['Kyoto — day 4 of 8', 'Your phone · 03:40'],
    rows: [
      ['“Train delayed, can the driver wait?”', '03:40 · you are asleep', 'You'],
      ['Call the driver', 'Other number, other language', 'You'],
      ['“Can the ceremony move to 15:00?”', 'Same night, same you', 'You'],
    ],
    fine: 'Every message finds you, at any hour.',
  },
  whatsapp: {
    head: ['WhatsApp', 'Your personal number'],
    rows: [
      ['+49 ··· 4471 · “Kenya in March…”', 'A stranger in your chats', 'You'],
      ['Who is this? Save contact', 'Then the spreadsheet', 'You'],
      ['The thread lives on your phone', 'Nobody else sees it', 'You'],
    ],
    fine: 'Next to your family group.',
  },
  parse: {
    head: ['New inquiry', 'Gmail · 09:14'],
    rows: [
      ['Read the email', '“Kenya, early March, 9 nights…”', 'You'],
      ['Reply with the questions', 'Dates? Budget? Names?', 'You · day 1'],
      ['Wait, then type the brief', 'Into the spreadsheet', 'You · day 3'],
    ],
    fine: 'Three days, if you remember to chase.',
  },
  quoting: {
    head: ['Quote requests · Nairobi', 'One by one'],
    rows: [
      ['Rift Valley Ground Services', 'Emailed Monday · replied Wednesday', 'You'],
      ['Acacia Safari Logistics', 'No reply · did you chase?', 'You'],
      ['Karen Overland Co.', 'Declined Thursday · start over', 'You'],
    ],
    fine: 'A week, and a decline restarts the clock.',
  },
  followup: {
    head: ['Follow-ups', 'Sticky notes'],
    rows: [
      ['Proposal nudge · Lena & Mark', '“Just checking in” on Thursday', 'You'],
      ['Voucher reminder · Atlas Maroc', 'Calendar alert · write it', 'You'],
      ['Feedback request · Sofia', 'Forgotten', 'You'],
    ],
    fine: 'The ones you remembered.',
  },
  reconfirm: {
    head: ['Re-confirming · Nairobi', 'Thursday evening'],
    rows: [
      ['Rift Valley Ground Services', '“Still fine?” · replied Friday', 'You'],
      ['Offbeat Mara camp', 'Tent gone · email Lena · wait', 'You'],
      ['Karen Overland Co.', 'Gone · nobody told you', 'You'],
    ],
    fine: 'Accepted is not confirmed.',
  },
  collect: {
    head: ['Before departure', 'A checklist in Notes'],
    rows: [
      ['Passport details', 'Photos on WhatsApp · retype', 'You'],
      ['Vouchers · Rift Valley', 'Ask, chase, download, forward', 'You'],
      ['Driver contact · Acacia', 'Still missing · call them', 'You'],
    ],
    fine: 'Everything comes in, through you.',
  },
  payments: {
    head: ['Deposit · Marrakesh', 'Bank app and an email'],
    rows: [
      ['Send the request', 'Bank details in an email', 'You'],
      ['Did it arrive?', 'Check the app, three days running', 'You'],
      ['Mark it in the spreadsheet', 'Row 21 · “PAID?”', 'You'],
    ],
    fine: 'Request, checking, record: one person.',
  },
};
