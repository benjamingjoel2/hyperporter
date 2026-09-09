/**
 * The other side of every screen: how the same job is handled
 * traditionally, in plain text. One short paragraph per screen, keyed by
 * screen name (mockups/index.ts). Same trip, same numbers as the screen.
 */
export const WITHOUT: Record<string, string> = {
  dashboard: 'A spreadsheet for the CRM, email threads for the clients, a contact form that emails you. Five tools, five logins, held together by one person remembering.',
  atlas: 'Search your inbox for the contract. Open the PDF, scroll to the rates, check a second page for the fees. Ask a colleague if it is the latest version. Half an hour, no citation.',
  board: 'A spreadsheet with one row per trip and a status column somebody last updated on Tuesday. The real status is in your inbox.',
  inquiry: 'A contact form emails you one paragraph with no dates and no budget. You reply with the questions, wait, then type the answers into the spreadsheet yourself.',
  sourcing: 'Two emails and a voice note, replies over three days. You work out the margin on a calculator and retype the total into the proposal.',
  share: 'Export a PDF, attach it, send it. They ask for a change; export and send again. Three versions in their inbox, and no way to know which one they opened.',
  sides: 'Two email threads and your phone. You forward the supplier’s email to the traveller without the price, and the traveller’s to the supplier without the budget. You are the record.',
  inbox: 'The traveller asks on WhatsApp. You email the DMC and wait. The answer lands in a thread of thirty messages; you copy it back to WhatsApp by hand.',
  vault: 'Contracts in Downloads, on Drive, and on somebody’s laptop. The rates exist. Finding the right version is the job.',
  itinerary: 'A Word document from scratch. For every day, find the rate in a PDF and check the contract for what it includes. An hour later, no source on any line.',
  invoice: 'Check the bank app to see whose transfer arrived. Set a calendar alert for the balance and write the email yourself. Retype every line into a Word invoice.',
  relay: 'The traveller messages your personal phone at 03:40. You call the driver on another number, in another language, then answer the next message. Every message, at any hour.',
  whatsapp: 'A new number appears in your personal chats, next to the family group. You save the contact, open the spreadsheet, add a row. The thread lives on one phone.',
  parse: 'Read the email, reply with the questions, wait for the answers, then type the brief into the spreadsheet. Three days, if you remember to chase.',
  quoting: 'Email each supplier one by one. Chase the one who does not reply. When one declines, start again with someone else. A week, and a decline restarts the clock.',
  followup: 'Sticky notes and calendar alerts. The nudge you remembered goes out on Thursday. The feedback request you forgot never does.',
  reconfirm: 'Three emails on a Thursday evening asking if everything is still fine. One tent is gone, one supplier has vanished, and nobody told you until you asked.',
  collect: 'Ask for passports on WhatsApp and retype the numbers. Ask for vouchers by email, chase, download, forward. Call about the missing driver. Everything comes in, through you.',
  payments: 'Type the bank details into an email. Check the bank app three days running. Mark it in the spreadsheet with a question mark. One person is the request, the checking and the record.',
};
