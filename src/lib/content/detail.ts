/**
 * One page per nav item (Sep 2026, founder's ask): the thirteen Tools and
 * the six Automations each get a page of their own at /tools/[slug] and
 * /automations/[slug], instead of an anchor on a layer page that read as
 * "the same page again" from the menu.
 *
 * Every page is the same shape — a hero with a screen, what it does, how it
 * works, where it is available, and where to go next — and the copy is the
 * page's own. The terminology rules hold: Portal is the platform, Autopilot
 * is automation on top of it, Atlas answers from the account's own Vault,
 * escalation to a person is designed in, Horizon is a list the supplier
 * never logs into, and the supplier always receives their full quoted rate.
 *
 * `tier` is the tier the item lands on, in the founder's wording; `layer`
 * is the product layer it belongs to and names the chip on the page.
 * `human` is the step a person always takes, on the automation pages —
 * that sentence is the difference between automation and overstatement.
 */

export type Layer = 'Portal' | 'Autopilot' | 'Intelligence' | 'Horizon';

export interface Step {
  n: string;
  name: string;
  body: string;
}

export interface Reason {
  title: string;
  body: string;
}

export interface DetailPage {
  slug: string;
  name: string;
  layer: Layer;
  /** Founder's tier wording — "Showcase", "Autopilot up", "Add-on"… */
  tier: string;
  /** One line under the tier, on where it is included. */
  tierNote: string;
  title: string;
  lede: string;
  /** Two or three sentences for the overview band under the hero. */
  overview: string;
  /** Screen from components/mockups/index.ts. */
  screen: string;
  whatTitle: string;
  what: Reason[];
  howTitle: string;
  how: Step[];
  /** Automations only: the step a person always takes. */
  human?: string;
  /** Slugs of pages on either collection, shown as related. */
  related: string[];
  next: { eyebrow: string; title: string; desc: string; cta: string; href: string };
}

export const TOOLS: DetailPage[] = [
  {
    slug: 'portal',
    name: 'Portal',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier, for resellers and suppliers alike. Free, forever.',
    title: 'The platform underneath everything.',
    lede: 'Portal is where your team, your trips and your contacts live: one CRM, one thread per trip, one link that faces the traveller on one side and the supplier on the other. Everything else Hyperporter does is built on it.',
    overview: 'Portal is the platform every account starts on and never leaves: the CRM, the magic links, the inquiry form and the proposal generator. Autopilot, Intelligence and Horizon all sit on top of it. It is free on every tier, for both sides of the market.',
    screen: 'dashboard',
    whatTitle: 'What Portal gives you on day one',
    what: [
      { title: 'One record per trip', body: 'Inquiry, quotes, confirmations and payments on the same thread, moved through the same nine stages, rather than spread across an inbox, a spreadsheet and a chat app.' },
      { title: 'Two sides, one link', body: 'A magic link per trip that the traveller and the supplier each open on their own side. Both always see the current version; nothing is copied by hand.' },
      { title: 'Your team, your brand', body: 'Every agent on the same CRM, every touchpoint carrying your logo and your name. Suppliers reply from their own side without a new inbox to check.' },
    ],
    howTitle: 'How a trip runs through Portal',
    how: [
      { n: '01', name: 'A lead arrives', body: 'From your public inquiry form, an email or a message. It lands in the CRM as a structured trip inquiry with a contact attached.' },
      { n: '02', name: 'You open one thread', body: 'The trip record holds the brief, the travellers and every quote. You work from it, and so does anyone else on your team.' },
      { n: '03', name: 'You send a magic link', body: 'The traveller sees the itinerary and the quote; the supplier sees the request and replies with a price. Both sides stay in sync automatically.' },
      { n: '04', name: 'The record stays useful', body: 'After the trip, the thread archives itself and becomes the starting point for the next request from the same client.' },
    ],
    related: ['crm-workflow', 'inquiry-form', 'client-supplier-dashboard'],
    next: { eyebrow: 'Up next', title: 'Let the back-and-forth run itself.', desc: 'Autopilot layers the nine-stage engine on top of Portal — same CRM, same links, less chasing.', cta: 'See Autopilot', href: '/autopilot' },
  },
  {
    slug: 'atlas-ai',
    name: 'Atlas AI',
    layer: 'Intelligence',
    tier: 'Intelligence',
    tierNote: 'Part of the Intelligence tier, priced per business. Atlas is trained on your account’s own Vault and nobody else’s data.',
    title: 'An assistant that answers from your own contracts.',
    lede: 'Atlas builds trips, looks up rates and dates, and answers questions on request. It reads from your Vault — your contracts, your rate sheets, your past trips — and cites the page it took the answer from.',
    overview: 'Atlas is the assistant in the Intelligence tier. It reads your Vault, answers with a citation, and drafts from your own past trips. It never sees another account’s data, and never sends anything on your behalf.',
    screen: 'atlas',
    whatTitle: 'What Atlas does',
    what: [
      { title: 'Answers you can check', body: 'Ask what a supplier charges in shoulder season and Atlas returns the rate with the contract and page it came from. No answer arrives without a source.' },
      { title: 'Drafts from what you know', body: 'A first itinerary, a quote outline or a reply to a traveller, drafted from your own data and your own past trips, not from a generic model of travel.' },
      { title: 'Your data only', body: 'Atlas is trained on your account’s Vault and nothing else. Another account’s contracts never inform your answers, and yours never inform theirs.' },
    ],
    howTitle: 'How Atlas works',
    how: [
      { n: '01', name: 'Your Vault is indexed', body: 'Every contract and rate sheet you upload is read, its rates and validity extracted, and made queryable. This is the whole of what Atlas knows.' },
      { n: '02', name: 'You ask, in the thread', body: 'Atlas sits inside the trip record. A question about a rate, an availability window or a clause is asked where the trip is being worked.' },
      { n: '03', name: 'It answers with a citation', body: 'The answer names the document and the page. If the Vault has nothing on it, Atlas says so rather than guessing.' },
      { n: '04', name: 'You decide', body: 'Atlas drafts and suggests. Sending a quote, confirming a booking or marking a payment is always yours to do.' },
    ],
    related: ['document-vault', 'itinerary-generator', 'quotation-board'],
    next: { eyebrow: 'Up next', title: 'Where Atlas reads from.', desc: 'The Vault holds the contracts and rates Atlas answers from — and only those.', cta: 'See the Document vault', href: '/tools/document-vault' },
  },
  {
    slug: 'crm-workflow',
    name: 'CRM workflow',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier. Manual on Showcase; the stage engine runs on its own from Autopilot up.',
    title: 'Every trip on a board, every stage in view.',
    lede: 'The client and supplier database, connected to trip staging. Each trip moves through nine stages from Inquiry to Completed, and the board shows where every one of them is right now.',
    overview: 'The CRM is a board of trips, each at one of nine stages, with the travellers and suppliers on it as contacts with a history. On Showcase you move the stages by hand. From Autopilot up, the engine moves them for you.',
    screen: 'board',
    whatTitle: 'What the CRM workflow does',
    what: [
      { title: 'Stages, not statuses', body: 'Nine named stages with a meaning each — Inquiry, Planning, Quotation, Confirmation, Booking, Ready, Traveling, Post-Trip, Completed — so the whole team reads a trip the same way.' },
      { title: 'People attached to trips', body: 'Travellers and suppliers are contacts with a history, not names in a cell. Open a contact and see every trip they have been part of.' },
      { title: 'Nothing falls through', body: 'A trip that has sat too long in a stage is visible on the board. On Autopilot, it is chased automatically.' },
    ],
    howTitle: 'How a trip moves',
    how: [
      { n: '01', name: 'Inquiry to Planning', body: 'A structured brief becomes a draft itinerary. On Showcase you write it; on Autopilot the first draft is proposed for you.' },
      { n: '02', name: 'Quotation to Confirmation', body: 'Supplier quotes come back on the thread, your margin is applied, and the accepted quote is re-checked with the supplier before anything is booked.' },
      { n: '03', name: 'Booking to Ready', body: 'Payment requests go out and are marked received by a person. Vouchers and ground contacts are gathered before departure.' },
      { n: '04', name: 'Traveling to Completed', body: 'Live support runs on the thread, feedback is collected afterwards, and the record archives itself once everything is resolved.' },
    ],
    related: ['portal', 'client-supplier-dashboard', 'quotation-board'],
    next: { eyebrow: 'Up next', title: 'Move the stages without touching them.', desc: 'Automated Inquiry is the first of six automations that run the board for you.', cta: 'See Automated Inquiry', href: '/automations/inquiry' },
  },
  {
    slug: 'inquiry-form',
    name: 'Inquiry form',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier. Your public link is live the day you sign up.',
    title: 'A public link that fills your CRM for you.',
    lede: 'Your own lead-capture form, on a link you can put anywhere — a LinkedIn profile, an email signature, an Instagram bio, a community group. Every submission lands in the CRM as a contact and a trip inquiry.',
    overview: 'One public link, branded to you, that turns a visitor into a structured trip inquiry in your CRM. It is live the day you sign up and works from any page you already have.',
    screen: 'inquiry',
    whatTitle: 'What the inquiry form does',
    what: [
      { title: 'Structured from the start', body: 'Guided questions — where, when, who, budget — so what arrives is a brief you can quote from, not a message you have to decode.' },
      { title: 'Straight into the CRM', body: 'No forwarding, no retyping. The submission creates the contact and the trip at the Inquiry stage, with the brief attached.' },
      { title: 'Yours to brand', body: 'Your logo and your name on the form and the confirmation the traveller receives. From Autopilot up, the Hyperporter badge comes off.' },
    ],
    howTitle: 'How it works',
    how: [
      { n: '01', name: 'Share the link', body: 'One URL for your form. Put it wherever your clients already find you.' },
      { n: '02', name: 'The traveller fills it in', body: 'A short guided form on your page, on any device. They get a confirmation with your branding.' },
      { n: '03', name: 'The trip appears', body: 'A new contact and a new trip at Inquiry, on the board, with the brief ready to work from.' },
      { n: '04', name: 'Autopilot takes it from there', body: 'On Autopilot, the brief is checked back with the traveller and a first itinerary is proposed without anyone typing.' },
    ],
    related: ['crm-workflow', 'portal', 'three-way-inbox'],
    next: { eyebrow: 'Up next', title: 'Turn the brief into a trip.', desc: 'Automated Inquiry confirms the brief with the traveller and moves it to Planning on its own.', cta: 'See Automated Inquiry', href: '/automations/inquiry' },
  },
  {
    slug: 'quotation-board',
    name: 'Quotation Board',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier. Quotes are requested by hand on Showcase and in parallel, automatically, from Autopilot up.',
    title: 'Every supplier quote, side by side.',
    lede: 'The Quotation Board lays out each supplier’s price for each part of the trip, applies your margin, and shows what the traveller will see — before they see it.',
    overview: 'The board is where a trip’s parts meet the suppliers’ prices: one row per part, one column per supplier, your margin on top. On Autopilot the requests go out and the replies come back to it on their own.',
    screen: 'sourcing',
    whatTitle: 'What the board does',
    what: [
      { title: 'Compare like with like', body: 'Hotels, transport and activities each in their own row, each supplier’s quote in its own column. What is in and what is missing is obvious at a glance.' },
      { title: 'Margin before the number', body: 'Your margin is set once and applied to every line. The traveller’s price is calculated on the board, never in your head or a spreadsheet.' },
      { title: 'The supplier keeps their rate', body: 'Your margin sits on top of the supplier’s quote. Whatever the traveller pays, the supplier always receives their full quoted rate.' },
    ],
    howTitle: 'How a quote comes together',
    how: [
      { n: '01', name: 'The trip is split into parts', body: 'Each part goes to the suppliers qualified for it — your own list, or a Horizon supplier if you have none in that place.' },
      { n: '02', name: 'Quotes come back on the thread', body: 'Each supplier replies from their own side of the magic link. The board fills in as they do.' },
      { n: '03', name: 'You choose and apply margin', body: 'Pick the line you want per part. Your margin is applied and the traveller’s total is ready.' },
      { n: '04', name: 'It becomes the proposal', body: 'The chosen lines flow into the proposal without re-entry. Accepting it triggers re-confirmation with each supplier.' },
    ],
    related: ['proposal-share', 'atlas-ai', 'crm-workflow'],
    next: { eyebrow: 'Up next', title: 'Request the quotes without sending the emails.', desc: 'Automated Quotation sends each part to the right suppliers and manages every reply.', cta: 'See Automated Quotation', href: '/automations/quotation' },
  },
  {
    slug: 'proposal-share',
    name: 'Proposal Share',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier. Your own domain on the link is part of Intelligence, or a €19/mo add-on below it.',
    title: 'One proposal, shared as a link, a PDF or a message.',
    lede: 'A branded itinerary and quote, built from what is already on the trip record, and shared the way the traveller prefers: a link that stays current, a PDF for their inbox, or a text message with the link in it.',
    overview: 'A proposal is built from the trip record and shared as a link that stays current, a PDF, or a text message. Your brand is on it; the traveller accepts on their side of the link.',
    screen: 'share',
    whatTitle: 'What Proposal Share does',
    what: [
      { title: 'Built, not written', body: 'The proposal draws its days, its prices and its terms from the trip record. Change the itinerary and the proposal changes with it.' },
      { title: 'A link that stays current', body: 'The traveller’s magic link always shows the latest version. There is no v3 in one inbox and v4 in another.' },
      { title: 'Your brand on it', body: 'Your logo, your colours, your name. From Autopilot up the Hyperporter badge comes off; on Intelligence the link is on your own domain.' },
    ],
    howTitle: 'How sharing works',
    how: [
      { n: '01', name: 'Generate from the record', body: 'One action turns the chosen quotes and the itinerary into a proposal page.' },
      { n: '02', name: 'Pick the format', body: 'Send the link, export a PDF, or text the link — whichever the traveller will actually open.' },
      { n: '03', name: 'See it opened', body: 'The trip record shows when the link was opened and how many times, so a follow-up is timed rather than guessed.' },
      { n: '04', name: 'Accept on the page', body: 'The traveller accepts on their side of the link. The trip moves to Confirmation and the supplier is re-checked.' },
    ],
    related: ['quotation-board', 'itinerary-generator', 'client-supplier-dashboard'],
    next: { eyebrow: 'Up next', title: 'Let the itinerary write itself.', desc: 'The Itinerary generator drafts the days from your Vault before you open the proposal.', cta: 'See the Itinerary generator', href: '/tools/itinerary-generator' },
  },
  {
    slug: 'client-supplier-dashboard',
    name: 'Client + Supplier Dashboard',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Included on every tier. Neither side needs an account; each opens their own side of the magic link.',
    title: 'Each side gets their own view of the trip.',
    lede: 'The traveller sees the itinerary, the price and where to pay. The supplier sees the request, their quote and the confirmation. Both are views of the same trip record, and neither sees the other’s side.',
    overview: 'Every trip has a traveller’s side and a supplier’s side, each a view of the same record through its own magic link. Neither side needs an account, and neither sees the other’s.',
    screen: 'sides',
    whatTitle: 'What each side sees',
    what: [
      { title: 'The traveller’s side', body: 'The current itinerary, the total, payment instructions and a place to ask a question. No login: the magic link is the door.' },
      { title: 'The supplier’s side', body: 'The request with dates and travellers, a place to quote line by line, and the confirmation once it is booked. They never see your margin.' },
      { title: 'Your side', body: 'Both, together, with the stage and every message in one thread. You see what each side has opened and when.' },
    ],
    howTitle: 'How the dashboards stay in sync',
    how: [
      { n: '01', name: 'One record, two links', body: 'A trip has one record and one magic link per side. Every view is rendered from the record at the moment it is opened.' },
      { n: '02', name: 'A change on one side', body: 'A supplier updates a price or a traveller changes a date. The record changes, and the other side’s view changes with it.' },
      { n: '03', name: 'Questions land on the thread', body: 'Either side asks from their dashboard. The message arrives on the trip thread, addressed to you.' },
      { n: '04', name: 'Money is marked by a person', body: 'Payment instructions appear on the traveller’s side automatically. Marking money received is always a deliberate action on yours.' },
    ],
    related: ['portal', 'three-way-inbox', 'payments-invoicing'],
    next: { eyebrow: 'Up next', title: 'All three conversations in one place.', desc: 'The 3-way inbox holds the traveller’s side and the supplier’s side of a trip on one thread.', cta: 'See the 3-way inbox', href: '/tools/three-way-inbox' },
  },
  {
    slug: 'three-way-inbox',
    name: '3-way inbox',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'In-platform messaging on every tier. Email threads join it from Autopilot up; WhatsApp is an add-on.',
    title: 'Traveller, supplier and you, on one thread.',
    lede: 'A trip has two conversations — with the person travelling and with the people delivering it. The 3-way inbox keeps both on the trip record, in order, so nothing said to one side is lost when you speak to the other.',
    overview: 'One thread per trip carries both conversations — with the traveller and with the supplier — in order, whichever channel each came through. You reply in place and it goes back the way it came.',
    screen: 'inbox',
    whatTitle: 'What the inbox does',
    what: [
      { title: 'One thread per trip', body: 'Every message about a trip, from either side and whichever channel, is on that trip’s thread. Search a trip, not an inbox.' },
      { title: 'Sides kept apart', body: 'The traveller never sees the supplier’s message and vice versa. You see both, in one sequence, with the stage each was sent at.' },
      { title: 'Channels folded in', body: 'Messages from your form and your dashboard on every tier; email parsed into the thread from Autopilot; WhatsApp relayed in as an add-on.' },
    ],
    howTitle: 'How a thread reads',
    how: [
      { n: '01', name: 'A message arrives', body: 'From a dashboard, an email or WhatsApp. It is attached to the trip it belongs to and marked by side.' },
      { n: '02', name: 'You reply in place', body: 'Reply from the thread; it goes back on the channel it came from. The traveller gets an email, the driver gets a WhatsApp.' },
      { n: '03', name: 'Automatic steps are shown', body: 'When Autopilot sends a quote request or a reminder, it appears on the thread as a step, so the history is complete.' },
      { n: '04', name: 'Anything urgent is flagged', body: 'A message that needs a person is flagged and organised by what to do next, rather than lost in the sequence.' },
    ],
    related: ['client-supplier-dashboard', 'whatsapp-integration', 'support-relay'],
    next: { eyebrow: 'Up next', title: 'Bring WhatsApp onto the thread.', desc: 'The WhatsApp integration connects the real Business API straight into your inbox.', cta: 'See the WhatsApp integration', href: '/tools/whatsapp-integration' },
  },
  {
    slug: 'document-vault',
    name: 'Document vault',
    layer: 'Intelligence',
    tier: 'Intelligence',
    tierNote: 'Part of the Intelligence tier. Each account’s Vault is indexed to that account only.',
    title: 'Every contract and rate sheet, made queryable.',
    lede: 'The Vault is where your account’s own documents live: supplier contracts, rate sheets, terms. Each is read on upload, its rates and validity extracted, and from then on it can be asked a question.',
    overview: 'The Vault is where your contracts and rate sheets live once they are uploaded: read, their rates and validity extracted, indexed to your account only. It is what Atlas and the Itinerary generator answer from.',
    screen: 'vault',
    whatTitle: 'What the Vault does',
    what: [
      { title: 'Reads what you upload', body: 'A contract goes in as a PDF and comes out as rates by season, validity dates, cancellation terms and inclusions — each traceable to its page.' },
      { title: 'Knows what is current', body: 'Validity is tracked per document. A rate that has expired is shown as expired, and Atlas will not quote from it.' },
      { title: 'Stays yours', body: 'Your Vault is indexed to your account and read only by your Atlas. It is never used to train anything that answers anyone else.' },
    ],
    howTitle: 'How the Vault works',
    how: [
      { n: '01', name: 'Upload', body: 'Drop in the contract or the rate sheet. Supplier and year are picked up from the document; you confirm them.' },
      { n: '02', name: 'Extract', body: 'Rates, dates and terms are pulled out and shown beside the source page for you to check.' },
      { n: '03', name: 'Index', body: 'The document becomes queryable. Every extracted figure knows the page it came from.' },
      { n: '04', name: 'Answer', body: 'Atlas and the Itinerary generator read from the Vault and cite it. The audit log records every access.' },
    ],
    related: ['atlas-ai', 'itinerary-generator', 'quotation-board'],
    next: { eyebrow: 'Up next', title: 'Ask it a question.', desc: 'Atlas is the assistant that answers from the Vault, with the page it took the answer from.', cta: 'See Atlas AI', href: '/tools/atlas-ai' },
  },
  {
    slug: 'itinerary-generator',
    name: 'Itinerary generator',
    layer: 'Intelligence',
    tier: 'Intelligence',
    tierNote: 'Part of the Intelligence tier. Drafts from your Vault and your past trips; Portal’s proposal generator is on every tier.',
    title: 'A first draft of the trip, from what you already know.',
    lede: 'Give it the brief and the Itinerary generator drafts the days — the places, the pacing, the suppliers you already use there and the rates you have on file — as a starting point you edit, not a page you fill.',
    overview: 'Give it the brief and it drafts the days from the suppliers and rates in your Vault, shaped like your past trips. The draft lands on the trip at Planning for you to edit, then becomes the proposal.',
    screen: 'itinerary',
    whatTitle: 'What the generator does',
    what: [
      { title: 'Starts from your Vault', body: 'It proposes the suppliers whose contracts are in your Vault and prices the draft from their current rates. Nothing is invented from a directory.' },
      { title: 'Learns your shape of trip', body: 'Your past itineraries inform the pacing and the pairings. A nine-night Kenya draft looks like your nine-night Kenya trips.' },
      { title: 'Edits, not rewrites', body: 'Swap a camp, add a night, move a transfer. The draft is a live itinerary on the trip record, and the proposal follows it.' },
    ],
    howTitle: 'How a draft is built',
    how: [
      { n: '01', name: 'Read the brief', body: 'Where, when, who and budget, from the inquiry. Gaps are asked about rather than assumed.' },
      { n: '02', name: 'Choose from your suppliers', body: 'Each part is matched to a supplier in your Vault with a valid rate for those dates.' },
      { n: '03', name: 'Lay out the days', body: 'A day-by-day draft with each line priced and cited to the contract it came from.' },
      { n: '04', name: 'Hand it to you', body: 'The draft appears on the trip at Planning. You edit, then send it as the proposal.' },
    ],
    related: ['atlas-ai', 'document-vault', 'proposal-share'],
    next: { eyebrow: 'Up next', title: 'Share the draft as a proposal.', desc: 'Proposal Share turns the itinerary into a link, a PDF or a message with your brand on it.', cta: 'See Proposal Share', href: '/tools/proposal-share' },
  },
  {
    slug: 'payments-invoicing',
    name: 'Payments & Invoicing',
    layer: 'Portal',
    tier: 'Showcase',
    tierNote: 'Payment instructions on every tier. Gateway processing and two-sided payment automation are part of Intelligence.',
    title: 'Deposits, balances and invoices, tied to the booking.',
    lede: 'Every trip carries its own payment schedule. Instructions appear on the traveller’s link, invoices are generated from the trip record, and what has been received is always marked by a person.',
    overview: 'Each trip carries a payment schedule shown on the traveller’s link, and invoices generated from the accepted proposal. Requests go out on schedule from Autopilot; marking money received is always a person’s action.',
    screen: 'invoice',
    whatTitle: 'What it does',
    what: [
      { title: 'A schedule per trip', body: 'Deposit and balance, with due dates, set on the trip and shown on the traveller’s side. Reminders go out as each falls due.' },
      { title: 'Invoices from the record', body: 'An invoice is generated from the accepted proposal — the same lines, the same total, your details — without re-entry.' },
      { title: 'Received means someone said so', body: 'Marking money received or sent is a deliberate, manual action on every tier. Nothing about payment happens silently.' },
    ],
    howTitle: 'How payment runs',
    how: [
      { n: '01', name: 'Instructions on the link', body: 'The traveller’s dashboard shows the amount, the due date and how to pay, on every tier.' },
      { n: '02', name: 'Requests on schedule', body: 'From Autopilot, the deposit and balance requests go out on their own as each comes due.' },
      { n: '03', name: 'Marked by hand', body: 'You mark the deposit received. The trip moves to Booking and the supplier is told.' },
      { n: '04', name: 'Processed, on Intelligence', body: 'With gateway processing, Hyperporter takes the payment, pays the supplier their full quoted rate, and moves the stage as each side clears.' },
    ],
    related: ['client-supplier-dashboard', 'crm-workflow', 'quotation-board'],
    next: { eyebrow: 'Up next', title: 'Send the requests without the calendar.', desc: 'Automated Payment sends deposit and balance requests on schedule. Marking money received stays yours.', cta: 'See Automated Payment', href: '/automations/payment' },
  },
  {
    slug: 'support-relay',
    name: 'Support relay',
    layer: 'Autopilot',
    tier: 'Add-on',
    tierNote: 'Metered per active trip, on top of any tier. Live during the Traveling stage.',
    title: 'Live support that runs itself, until it shouldn’t.',
    lede: 'While the traveller is on the ground, the relay connects them to the driver, the guide and the camp without anyone sharing a number. Routine questions are handled on the thread. A real problem reaches you at once.',
    overview: 'During the trip, the relay connects the traveller to the ground team through one number each, keeps every message on the thread, and escalates anything that is not routine to you at once.',
    screen: 'relay',
    whatTitle: 'What the relay does',
    what: [
      { title: 'Numbers stay private', body: 'The traveller messages one number; the driver messages one number. Neither sees the other’s. Both reach the trip thread.' },
      { title: 'Several contacts, one trip', body: 'Multiple ground-team contacts on the same trip — the transfer company today, the lodge tomorrow — each reachable through the same relay.' },
      { title: 'Escalation by design', body: 'A pickup time confirmed is routine and relays through. A missed flight, a medical question or an upset traveller is flagged to a person immediately.' },
    ],
    howTitle: 'How a message travels',
    how: [
      { n: '01', name: 'The traveller writes', body: 'On WhatsApp, to the trip’s relay number, in their own language.' },
      { n: '02', name: 'The relay routes it', body: 'To the ground contact for that day, with the trip thread updated. The reply comes back the same way.' },
      { n: '03', name: 'Routine is handled', body: 'Pickup times, meeting points and confirmations relay without your involvement and are logged on the thread.' },
      { n: '04', name: 'Urgent breaks through', body: 'Anything flagged reaches you on your phone with the context, and the thread shows what needs deciding.' },
    ],
    related: ['whatsapp-integration', 'three-way-inbox', 'client-supplier-dashboard'],
    next: { eyebrow: 'Up next', title: 'The channel underneath the relay.', desc: 'The WhatsApp integration connects the Business API the relay runs on.', cta: 'See the WhatsApp integration', href: '/tools/whatsapp-integration' },
  },
  {
    slug: 'whatsapp-integration',
    name: 'WhatsApp integration',
    layer: 'Portal',
    tier: 'Add-on',
    tierNote: 'The real WhatsApp Business API, set up per account. Token cost scales with use, on top of any tier.',
    title: 'Real WhatsApp, straight into the thread.',
    lede: 'Not a screenshot of a chat pasted into a note. The WhatsApp Business API connected to your account, so a traveller’s message arrives on the trip thread and your reply goes back to their phone.',
    overview: 'The real WhatsApp Business API connected to your account: a traveller’s message lands on the trip thread, your reply goes back to their phone, and a new request becomes an inquiry.',
    screen: 'whatsapp',
    whatTitle: 'What the integration does',
    what: [
      { title: 'Messages on the record', body: 'Every WhatsApp message about a trip lands on that trip’s thread, beside the emails and the dashboard questions.' },
      { title: 'Replies from the thread', body: 'Answer in Portal; the traveller gets a WhatsApp. Your team works one inbox, not a shared phone.' },
      { title: 'Inquiries through it', body: 'A WhatsApp message that reads like a new request is parsed into a brief on Autopilot, the same as the form or an email.' },
    ],
    howTitle: 'How it is set up',
    how: [
      { n: '01', name: 'Connect the number', body: 'A Business API number is provisioned for your account. Setup is done with you, once.' },
      { n: '02', name: 'Match the sender', body: 'Messages are matched to a contact and their open trip. Unknown senders become new inquiries.' },
      { n: '03', name: 'Work the thread', body: 'Read and reply in the 3-way inbox. Templates cover the messages WhatsApp requires them for.' },
      { n: '04', name: 'Add the relay', body: 'The Support relay runs on the same connection during Traveling, if you switch it on.' },
    ],
    related: ['three-way-inbox', 'support-relay', 'inquiry-form'],
    next: { eyebrow: 'Up next', title: 'Turn a message into a brief.', desc: 'Automated Inquiry parses an incoming WhatsApp, email or form into a structured lead.', cta: 'See Automated Inquiry', href: '/automations/inquiry' },
  },
];

export const AUTOMATIONS: DetailPage[] = [
  {
    slug: 'inquiry',
    name: 'Automated Inquiry',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Part of Autopilot at €49 a month, and of Intelligence. Stage 01 of the nine.',
    title: 'From the first message to a confirmed brief, untouched.',
    lede: 'A form, an email or a WhatsApp arrives. Automated Inquiry reads it, asks the traveller the questions it cannot answer, and confirms the brief with them before the trip moves to Planning.',
    overview: 'Stage one of the nine. A message arrives on any channel, is parsed into a brief, the gaps are asked about, and the traveller confirms it before the trip moves to Planning.',
    screen: 'parse',
    whatTitle: 'What it automates',
    what: [
      { title: 'Parsing', body: 'Dates, destination, travellers and budget pulled out of whatever was written, however it was written.' },
      { title: 'The follow-up questions', body: 'What is missing is asked for, on the channel the message came from, in a short guided exchange.' },
      { title: 'Confirmation', body: 'The traveller is shown the brief and asked whether it is right. Nothing moves forward until they say so.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'A message lands', body: 'On the inquiry form, in a parsed email thread, or on WhatsApp. It is matched to a contact or creates one.' },
      { n: '02', name: 'A brief is built', body: 'The structured fields are filled from the message. Gaps are listed.' },
      { n: '03', name: 'Gaps are asked about', body: 'One or two questions go back to the traveller. Their answers fill the brief.' },
      { n: '04', name: 'The brief is confirmed', body: 'The traveller confirms. The trip moves to Planning and a first itinerary is proposed.' },
    ],
    human: 'A brief the traveller has not confirmed does not advance. A message the parser cannot make sense of is flagged to you with the original text, not guessed at.',
    related: ['quotation', 'follow-up'],
    next: { eyebrow: 'Next stage', title: 'Planning and Quotation.', desc: 'Automated Quotation sends each part of the trip to the right suppliers and manages the replies.', cta: 'See Automated Quotation', href: '/automations/quotation' },
  },
  {
    slug: 'quotation',
    name: 'Automated Quotation',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Part of Autopilot at €49 a month, and of Intelligence. Stage 03 of the nine.',
    title: 'Every supplier asked at once, every reply managed.',
    lede: 'Each part of the trip — hotels, transport, activities — goes to the suppliers qualified for it, in parallel. Replies come back onto the Quotation Board, your margin is applied, and the traveller never sees a number before you do.',
    overview: 'Stage three. Each part of the trip goes to every qualified supplier at once, replies come back to the Quotation Board with your margin applied, and you choose which to accept.',
    screen: 'quoting',
    whatTitle: 'What it automates',
    what: [
      { title: 'Sending', body: 'One request per part, to each qualified supplier on your list — or a Horizon supplier where you have none — from the trip’s magic link.' },
      { title: 'Chasing', body: 'A supplier who has not replied by the deadline is reminded. One who declines is replaced with the next qualified one.' },
      { title: 'Collecting', body: 'Replies land on the board as they arrive, line by line, ready to compare. Your margin is applied on top of each.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'The itinerary is split', body: 'Each line becomes a request with dates, travellers and what is needed.' },
      { n: '02', name: 'Requests go out', body: 'To every qualified supplier at once, each with a reply-by date.' },
      { n: '03', name: 'Replies are gathered', body: 'Quotes appear on the board. Reminders go to anyone late; declines are re-routed.' },
      { n: '04', name: 'You choose', body: 'The board shows the options with your margin applied. You pick per part and the proposal is built.' },
    ],
    human: 'Choosing which quote to accept is yours. The supplier’s quoted rate is what the supplier receives; your margin is added on top and never taken from it.',
    related: ['confirmation', 'inquiry'],
    next: { eyebrow: 'Next stage', title: 'Confirmation.', desc: 'Automated Confirmation re-checks the accepted quote with the supplier before anything is booked.', cta: 'See Automated Confirmation', href: '/automations/confirmation' },
  },
  {
    slug: 'follow-up',
    name: 'Automated Follow-up',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Part of Autopilot at €49 a month, and of Intelligence. Runs across Planning, Ready and Post-Trip.',
    title: 'Reminders sent, nudges timed, quiet leads won back.',
    lede: 'A proposal opened twice and not answered. A voucher still missing five days out. A traveller home for a week with no feedback asked for. Automated Follow-up sends the message you would have sent, at the moment you would have sent it.',
    overview: 'Across the stages. Proposal nudges, pre-departure reminders and post-trip feedback requests go out at the moment you would have sent them, and every reply comes back to the thread.',
    screen: 'followup',
    whatTitle: 'What it automates',
    what: [
      { title: 'Proposal nudges', body: 'A traveller who has opened the proposal and gone quiet gets a short check-in, timed from when they last looked.' },
      { title: 'Pre-departure reminders', body: 'Vouchers, pickup details and ground contacts are chased from suppliers as departure gets close, with reminders escalating.' },
      { title: 'After the trip', body: 'A thank-you, a request for feedback and a review ask go out on schedule. The thread stays open until anything raised is resolved.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'A trigger is met', body: 'Days since the proposal was opened, days to departure, days since return.' },
      { n: '02', name: 'The message is drafted', body: 'From your templates, with the trip’s details filled in, on the channel the traveller uses.' },
      { n: '03', name: 'It is sent and logged', body: 'The message goes out and appears on the thread as a step.' },
      { n: '04', name: 'A reply reopens the thread', body: 'Whatever comes back lands on the thread, flagged if it needs a decision.' },
    ],
    human: 'A reply that asks for a change, raises a complaint or needs a judgement is flagged to you with the context. Follow-up sends the reminder; it does not negotiate.',
    related: ['inquiry', 'collection'],
    next: { eyebrow: 'Next stage', title: 'Collection.', desc: 'Automated Collection gathers traveller documents and supplier confirmations before departure.', cta: 'See Automated Collection', href: '/automations/collection' },
  },
  {
    slug: 'confirmation',
    name: 'Automated Confirmation',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Part of Autopilot at €49 a month, and of Intelligence. Stage 04 of the nine.',
    title: 'Nothing is booked until it is checked again.',
    lede: 'The moment a proposal is accepted, every supplier on it is asked to re-confirm dates, availability and price. A small change is resolved with the traveller directly. A real problem finds a backup. A person steps in only if neither works.',
    overview: 'Stage four. When a proposal is accepted, every supplier on it re-confirms dates and price. Small changes go to the traveller, a real problem finds a backup, and only the rest reaches you.',
    screen: 'reconfirm',
    whatTitle: 'What it automates',
    what: [
      { title: 'Re-verification', body: 'Each supplier is asked to confirm the exact dates and rate they quoted, now that the traveller has said yes.' },
      { title: 'Small changes', body: 'A room category swap or a different transfer time is put to the traveller for a yes, and applied when they give it.' },
      { title: 'Backups', body: 'A supplier who can no longer deliver is replaced with the next qualified quote from the board, and the traveller is told.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'The proposal is accepted', body: 'The traveller accepts on their link. The trip moves to Confirmation.' },
      { n: '02', name: 'Suppliers re-confirm', body: 'Each is asked, on their side, to confirm the quoted line as booked.' },
      { n: '03', name: 'Differences are handled', body: 'Minor: put to the traveller. Major: a backup from the board.' },
      { n: '04', name: 'The trip is confirmed', body: 'All lines confirmed, the trip moves to Booking and payment requests begin.' },
    ],
    human: 'A supplier gone unavailable with no backup on the board, or a price change the traveller will not accept, escalates to you with both sides’ messages in view. That escalation is the design, not a failure of it.',
    related: ['quotation', 'payment'],
    next: { eyebrow: 'Next stage', title: 'Booking and payment.', desc: 'Automated Payment sends the deposit and balance requests on schedule.', cta: 'See Automated Payment', href: '/automations/payment' },
  },
  {
    slug: 'collection',
    name: 'Automated Collection',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Part of Autopilot at €49 a month, and of Intelligence. Stage 06 of the nine.',
    title: 'The last mile chased down before it is a problem.',
    lede: 'Passport details from the traveller. Vouchers, pickup times and a driver’s number from each supplier. Automated Collection asks for each, tracks what has come in, and reminds whoever is late — so that on departure day nothing is missing.',
    overview: 'Stage six. Traveller documents and supplier vouchers are requested, tracked and chased before departure, so nothing is missing on the day.',
    screen: 'collect',
    whatTitle: 'What it automates',
    what: [
      { title: 'Traveller documents', body: 'Passport details, dietary needs, arrival flight — requested on the traveller’s link and stored on the trip.' },
      { title: 'Supplier confirmations', body: 'Booking references, vouchers and ground contacts requested from each supplier on their side of the link.' },
      { title: 'A checklist that chases', body: 'The trip shows what is in and what is outstanding. Reminders escalate as departure gets closer.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'The list is built', body: 'From the confirmed itinerary: what each supplier owes, what the traveller owes.' },
      { n: '02', name: 'Requests go out', body: 'Each side is asked for their items, with a due date set back from departure.' },
      { n: '03', name: 'Items are ticked off', body: 'A voucher uploaded or a form filled marks the item complete on the trip.' },
      { n: '04', name: 'Late is chased', body: 'Reminders go out at intervals. Anything still missing near departure is flagged to you.' },
    ],
    human: 'A supplier who does not deliver a voucher, or a traveller whose documents raise a question, is flagged to you before the traveller finds out. Collection asks and tracks; it does not decide what to do about a gap.',
    related: ['follow-up', 'payment'],
    next: { eyebrow: 'Next stage', title: 'Traveling.', desc: 'The Support relay handles the trip on the ground, routing routine messages and escalating the rest.', cta: 'See the Support relay', href: '/tools/support-relay' },
  },
  {
    slug: 'payment',
    name: 'Automated Payment',
    layer: 'Autopilot',
    tier: 'Autopilot up',
    tierNote: 'Requests are automated on Autopilot. Gateway processing and two-sided payment automation are part of Intelligence.',
    title: 'Requests sent on schedule. Money marked by a person.',
    lede: 'The deposit request goes out when the trip is confirmed. The balance request goes out when it falls due. Reminders follow. What never happens on its own is marking money received — that stays a deliberate action, every time.',
    overview: 'Stage five. Deposit and balance requests go out on schedule with reminders. Marking money received stays a person’s action; on Intelligence, gateway processing pays the supplier in full automatically.',
    screen: 'payments',
    whatTitle: 'What it automates',
    what: [
      { title: 'The deposit request', body: 'Sent to the traveller’s link the moment the trip is confirmed, with the amount, the due date and your payment instructions.' },
      { title: 'The balance request', body: 'Sent on the date you set, with reminders before and after it if unpaid.' },
      { title: 'The supplier’s side', body: 'Once you mark the deposit received, each supplier is told their line is secured. On Intelligence, they are paid their full quoted rate automatically.' },
    ],
    howTitle: 'How it runs',
    how: [
      { n: '01', name: 'The trip is confirmed', body: 'The deposit request is generated from the accepted proposal and sent.' },
      { n: '02', name: 'You mark it received', body: 'A deliberate action on the trip. The stage moves to Booking; suppliers are notified.' },
      { n: '03', name: 'The balance is requested', body: 'On schedule, with reminders. You mark it received when it arrives.' },
      { n: '04', name: 'Processed, on Intelligence', body: 'With gateway processing, the payment is taken, the supplier is paid in full, and the stage moves as each side clears.' },
    ],
    human: 'Marking money received or sent is always manual, on every tier, and not only on exceptions. Nothing about payment ever happens silently.',
    related: ['confirmation', 'collection'],
    next: { eyebrow: 'Next stage', title: 'Ready.', desc: 'Automated Collection gathers everything the trip needs before departure.', cta: 'See Automated Collection', href: '/automations/collection' },
  },
];

export const byTool = (slug: string): DetailPage => {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`No tool "${slug}"`);
  return t;
};

export const byAutomation = (slug: string): DetailPage => {
  const a = AUTOMATIONS.find((x) => x.slug === slug);
  if (!a) throw new Error(`No automation "${slug}"`);
  return a;
};

/** Resolve a related slug on either collection to its page and route. */
export const resolveRelated = (slug: string): { page: DetailPage; href: string } => {
  const t = TOOLS.find((x) => x.slug === slug);
  if (t) return { page: t, href: `/tools/${t.slug}` };
  const a = AUTOMATIONS.find((x) => x.slug === slug);
  if (a) return { page: a, href: `/automations/${a.slug}` };
  throw new Error(`No tool or automation "${slug}" to relate to`);
};
