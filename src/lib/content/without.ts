/**
 * The other side of every screen: the same job, the same trip, without
 * Hyperporter. Each entry mirrors its screen — same suppliers, same
 * traveller, same numbers — done across inboxes, spreadsheets and phones.
 * Every line is a person's, so every line reads amber. Keyed by screen
 * name (components/mockups/index.ts).
 */
export interface Without {
  head: [string, string];
  rows: [string, string, string][];
  fine: string;
}

export const WITHOUT: Record<string, Without> = {
  dashboard: {
    head: ['Meridian Travel Co.', 'Tools you pay for separately'],
    rows: [
      ['CRM', 'A spreadsheet with 14 tabs, one per month', '€0, plus your evenings'],
      ['Client updates', 'Email threads, forwarded PDFs, version 3 FINAL', 'You'],
      ['Inquiry form', 'A contact form that emails you, then nothing', 'You'],
      ['Automation', 'Reminders in your calendar, if you set them', 'You'],
    ],
    fine: 'The same account, held together by one person remembering.',
  },
  atlas: {
    head: ['Your inbox · search “Rift Valley rates”', '46 results'],
    rows: [
      ['Open “rates 2026 v3 FINAL.pdf”', 'Scroll to page 5, then check page 2 for the fees', 'You · 8 min'],
      ['Is the March addendum the latest?', 'WhatsApp a colleague, wait for the answer', 'You · 20 min'],
      ['Type it into the quote', 'USD 95 a day, fees on top, worked out by hand', 'You'],
    ],
    fine: 'Same answer. Three places, half an hour, no citation.',
  },
  board: {
    head: ['Trips.xlsx', 'Last saved by Ines · Tuesday'],
    rows: [
      ['Nairobi · 9 nights', 'Row 14 · status column says “quoting?”', 'You'],
      ['Cusco · 6 nights', 'Confirmed, according to an email you cannot find', 'You'],
      ['Marrakesh · 4 nights', 'Deposit requested · did it arrive? Check the bank', 'You'],
    ],
    fine: 'Seven trips, one spreadsheet, and the truth is in your inbox.',
  },
  inquiry: {
    head: ['Contact form', 'Emails to hello@ · 09:14'],
    rows: [
      ['“Kenya, March, two of us, mid-range”', 'One paragraph, no dates, no budget', 'You'],
      ['Reply asking the questions the form did not', 'Where exactly, when exactly, how much', 'You · day 1'],
      ['Copy the answers into the spreadsheet', 'New row, new contact, by hand', 'You · day 2'],
    ],
    fine: 'The brief exists two days later, in your head.',
  },
  sourcing: {
    head: ['Quotes · Nairobi', 'Two emails, one WhatsApp'],
    rows: [
      ['Rift Valley Ground Services', 'Emailed Monday · replied Wednesday · €4,180', 'You'],
      ['Acacia Safari Logistics', 'WhatsApp voice note · “around €4,500”', 'You'],
      ['Your margin', 'Calculator, then retype the total into the proposal', 'You'],
    ],
    fine: 'Same quotes. Three days, and the margin is a number you hope you typed right.',
  },
  share: {
    head: ['Proposal', 'The Mara in March v3 FINAL (2).pdf'],
    rows: [
      ['Export from Word, attach, send', '4.8 MB · bounced once', 'You'],
      ['They ask for a change', 'Edit, re-export, re-send: v4', 'You'],
      ['Did they open it?', 'No way to know · follow up on Friday', 'You'],
    ],
    fine: 'Three versions in their inbox and nobody is sure which one is current.',
  },
  sides: {
    head: ['Nairobi — 9 nights', 'Two email threads, one phone'],
    rows: [
      ['Traveller asks what is confirmed', 'Forward the supplier’s email, minus the price', 'You'],
      ['Supplier asks if the dates are firm', 'Forward the traveller’s email, minus the budget', 'You'],
      ['Deposit due', 'Bank details typed into a reply · check the account daily', 'You'],
    ],
    fine: 'You are the record, and the two sides only see what you remember to forward.',
  },
  inbox: {
    head: ['Marrakesh — 4 nights', 'WhatsApp, Gmail, and a call'],
    rows: [
      ['Traveller on WhatsApp', '“Can the second night be a riad with a rooftop?”', 'You'],
      ['Email the DMC · wait', 'Reply lands in a thread with 31 messages', 'You · 3 h'],
      ['Copy the answer back to WhatsApp', 'Retype the rate, hope it is the same', 'You'],
    ],
    fine: 'One question, three apps, and you are the wire between them.',
  },
  vault: {
    head: ['Contracts', 'Downloads, Drive, and someone’s laptop'],
    rows: [
      ['Rift Valley GS — rates 2026.pdf', 'In Downloads · which version?', 'You'],
      ['Atlas Maroc 2026.pdf', 'On Drive · shared with the whole team, editable', 'You'],
      ['Andes Trail — Sacred Valley tariff.xlsx', 'In an email from March · search for it', 'You'],
    ],
    fine: 'The rates exist. Finding the right one is the job.',
  },
  itinerary: {
    head: ['Draft · Kenya, 9 nights', 'Word document · from scratch'],
    rows: [
      ['Day 1 · Nairobi · Hemingways', 'Look up the rate in the PDF · €310 pp', 'You · 15 min'],
      ['Day 2–5 · Mara North · Offbeat Mara', 'Check the contract for full board · €410 pp', 'You · 15 min'],
      ['Day 6–8 · Naboisho · walking safaris', 'Was this in the 2026 sheet or 2025? · €385 pp', 'You · 15 min'],
    ],
    fine: 'The same itinerary, an hour later, with no source on any line.',
  },
  invoice: {
    head: ['Payments · Marrakesh', 'Bank app, calendar, Word'],
    rows: [
      ['Deposit · €880', 'Check the bank · was it Priya’s transfer or the other one?', 'You'],
      ['Balance · €3,520', 'Calendar reminder for 20 Feb · write the email yourself', 'You'],
      ['Invoice INV-0937', 'Word template · retype every line from the proposal', 'You'],
    ],
    fine: 'Same money. The invoice and the proposal disagree by one line.',
  },
  relay: {
    head: ['Kyoto — day 4 of 8', 'Your phone, 03:40 your time'],
    rows: [
      ['Sofia · “train delayed, is the driver okay to wait?”', 'WhatsApp at 03:40 · you are asleep', 'You'],
      ['Call Ito-san', 'Different number, different language, different time zone', 'You'],
      ['“Can the tea ceremony move to 15:00?”', 'Same thread, same night, same you', 'You'],
    ],
    fine: 'Every message finds you, whatever the hour, routine or not.',
  },
  whatsapp: {
    head: ['WhatsApp', 'Your personal number'],
    rows: [
      ['+49 ··· 4471 · “Two of us, Kenya in March…”', 'A new number in your personal chats', 'You'],
      ['Who is this? Save the contact', 'Type the name · open the spreadsheet · new row', 'You'],
      ['The thread lives on your phone', 'Nobody else on the team can see it', 'You'],
    ],
    fine: 'The inquiry arrived. It just arrived to one phone, next to your family group.',
  },
  parse: {
    head: ['New inquiry', 'Gmail · 09:14'],
    rows: [
      ['Read the email', '“Two of us, Kenya in early March, about 9 nights…”', 'You'],
      ['Reply with the questions', 'Exact dates? Budget? Traveller names?', 'You · day 1'],
      ['Wait, then type the brief', 'Into the spreadsheet, when the answers come', 'You · day 3'],
    ],
    fine: 'The brief takes three days and one person who never forgets to follow up.',
  },
  quoting: {
    head: ['Quote requests · Nairobi', 'Sent one by one'],
    rows: [
      ['Rift Valley Ground Services', 'Emailed Monday 09:02 · replied Wednesday', 'You'],
      ['Acacia Safari Logistics', 'No reply · did you remember to chase?', 'You'],
      ['Karen Overland Co.', 'Declined Thursday · start again with someone else', 'You'],
    ],
    fine: 'Same three suppliers. A week, and the decline restarts the clock.',
  },
  followup: {
    head: ['Follow-ups', 'Sticky notes and a calendar'],
    rows: [
      ['Proposal nudge · Lena & Mark', 'Did they open it? Send a “just checking in” on Thursday', 'You'],
      ['Voucher reminder · Atlas Maroc', 'Calendar alert · write the email · attach the right PDF', 'You'],
      ['Feedback request · Sofia', 'Forgotten · she got home a week ago', 'You'],
    ],
    fine: 'The follow-ups that happen are the ones you remembered.',
  },
  reconfirm: {
    head: ['Re-confirming · Nairobi', 'Three emails, Thursday evening'],
    rows: [
      ['Rift Valley Ground Services', '“Still fine for March?” · replied Friday', 'You'],
      ['Offbeat Mara camp', 'Tent is gone · suite offered · email Lena · wait', 'You'],
      ['Karen Overland Co.', 'No longer available · nobody told you until you asked', 'You'],
    ],
    fine: 'Accepted is not confirmed, and finding that out is a person’s Thursday.',
  },
  collect: {
    head: ['Before departure · Nairobi', 'A checklist in Notes'],
    rows: [
      ['Passport details · Lena, Mark', 'Ask on WhatsApp · photos arrive · type the numbers', 'You'],
      ['Vouchers · Rift Valley GS', 'Ask by email · chase · download · forward', 'You'],
      ['Driver contact · Acacia', 'Still missing · 3 days out · call them', 'You'],
    ],
    fine: 'Everything comes in, eventually, through you.',
  },
  payments: {
    head: ['Deposit · Marrakesh', 'Bank app and an email'],
    rows: [
      ['Send the request', 'Type the bank details into an email · €880', 'You'],
      ['Did it arrive?', 'Check the bank app · Tuesday, Wednesday, Thursday', 'You'],
      ['Mark it in the spreadsheet', 'Row 21 · “PAID?” · you think', 'You'],
    ],
    fine: 'Same deposit. The request, the checking and the record are all one person.',
  },
};
