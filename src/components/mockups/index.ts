/**
 * The screens, by name, and a sentence describing each for the frame's label.
 * Every placement on the site picks one of these; an unknown name throws in
 * Mockup.astro rather than rendering an empty frame.
 */
import Dashboard from './Dashboard.astro';
import Crm from './Crm.astro';
import Reseller from './Reseller.astro';
import Supplier from './Supplier.astro';
import Contacts from './Contacts.astro';
import Inquiry from './Inquiry.astro';
import Proposal from './Proposal.astro';
import Pipeline from './Pipeline.astro';
import Atlas from './Atlas.astro';
import Vault from './Vault.astro';
import Horizon from './Horizon.astro';
import Sourcing from './Sourcing.astro';
import Settings from './Settings.astro';
import Brand from './Brand.astro';
import Inbox from './Inbox.astro';
import Payments from './Payments.astro';
import Campaign from './Campaign.astro';
import Request from './Request.astro';
import Quote from './Quote.astro';
import Team from './Team.astro';
import Plan from './Plan.astro';
import Audit from './Audit.astro';
import Relay from './Relay.astro';
import Login from './Login.astro';
import Book from './Book.astro';
import Board from './Board.astro';
import Share from './Share.astro';
import Sides from './Sides.astro';
import Itinerary from './Itinerary.astro';
import Invoice from './Invoice.astro';
import Whatsapp from './Whatsapp.astro';
import Parse from './Parse.astro';
import Quoting from './Quoting.astro';
import Followup from './Followup.astro';
import Reconfirm from './Reconfirm.astro';
import Collect from './Collect.astro';
import Engine from './Engine.astro';

export const SCREENS: Record<string, any> = {
  engine: Engine,
  dashboard: Dashboard,
  crm: Crm,
  reseller: Reseller,
  supplier: Supplier,
  contacts: Contacts,
  inquiry: Inquiry,
  proposal: Proposal,
  pipeline: Pipeline,
  atlas: Atlas,
  vault: Vault,
  horizon: Horizon,
  sourcing: Sourcing,
  settings: Settings,
  brand: Brand,
  inbox: Inbox,
  payments: Payments,
  campaign: Campaign,
  request: Request,
  quote: Quote,
  team: Team,
  plan: Plan,
  audit: Audit,
  relay: Relay,
  login: Login,
  book: Book,
  board: Board,
  share: Share,
  sides: Sides,
  itinerary: Itinerary,
  invoice: Invoice,
  whatsapp: Whatsapp,
  parse: Parse,
  quoting: Quoting,
  followup: Followup,
  reconfirm: Reconfirm,
  collect: Collect,
};

export const SCREEN_ALT: Record<string, string> = {
  engine: 'The Quotation stage of one trip with automation on: three suppliers asked at once, one reminded, one decline re-routed. Switched off, the same lines are a person\'s to do.',
  dashboard: 'One account’s four layers: Portal and Horizon included, Autopilot switched on, Intelligence available.',
  crm: 'A trip record in Portal — travellers, stage, proposal link and two supplier quotes — floating over the trips list.',
  reseller: 'A trip record in Portal — travellers, stage, proposal link and two supplier quotes — floating over a photograph.',
  supplier: 'A supplier’s request queue: a structured quote request from an agency, with its deadline, over a photograph.',
  contacts: 'The Portal people list: travellers and suppliers with their latest thread.',
  inquiry: 'The public inquiry form on an agency’s own page, filled in for a trip to Kenya.',
  proposal: 'A branded proposal for nine nights in the Mara beside its magic link and branding settings.',
  pipeline: 'Autopilot’s nine stages for one trip, the first three done, Confirmation current, human touchpoints marked.',
  atlas: 'Atlas answering a rate question from the account’s own Vault, citing the contract page.',
  vault: 'The Vault: five supplier contracts with their validity, extracted rates and index status.',
  horizon: 'Horizon search for Kenya: four vetted suppliers with reply times and a quote requested from one.',
  sourcing: 'A trip at the Quotation stage: three supplier quotes, the margin applied, and the approval waiting.',
  settings: 'The Operations features, each with a switch and the tier it comes with.',
  brand: 'Branding settings: logo, accent, domain masking, and a preview of what a traveller receives.',
  inbox: 'One trip thread carrying a traveller’s WhatsApp, a supplier’s email, an automatic step and the agent’s reply.',
  payments: 'A deposit request sent automatically, waiting for a person to mark it received.',
  campaign: 'Email campaigns with open rates and replies routed back to the trip thread.',
  request: 'A supplier’s request queue: structured quote requests from agencies, with deadlines.',
  quote: 'A supplier composing a quote line by line; the total is what they receive in full.',
  team: 'Team settings for a four-agent agency sharing one CRM and one brand.',
  plan: 'Plan and billing: Autopilot at €49 a month, what it includes, usage and add-ons.',
  audit: 'The access and audit log: a magic-link sign-in, a payment marked by hand, a Vault upload indexed to this account only.',
  relay: 'A live trip: a traveller’s WhatsApp relayed to the driver and back, and one question escalated to a person.',
  login: 'The sign-in screen after requesting a magic link — no password to set.',
  book: 'A single agent’s book of clients with each one’s current stage.',
  board: 'The CRM board: trips as cards in their stage columns — Quotation, Confirmation, Booking.',
  share: 'Proposal Share: one proposal offered as a live link, a PDF or a text message, opened twice.',
  sides: 'One trip, two dashboards: the traveller’s side with itinerary and deposit, the supplier’s side with request and quote.',
  itinerary: 'The Itinerary generator’s first draft: three day-blocks, each priced from the account’s Vault and cited to its contract page.',
  invoice: 'Payments & Invoicing: a deposit marked received by a person, a balance requested, the invoice generated from the proposal.',
  whatsapp: 'The WhatsApp Business API connected: an incoming message matched to a new inquiry, the reply sent from the thread.',
  parse: 'Automated Inquiry: an email parsed into a brief, the missing budget asked for, confirmation with the traveller pending.',
  quoting: 'Automated Quotation: three requests sent at once — one replied, one reminded, one declined and re-routed.',
  followup: 'Automated Follow-up: a proposal nudge and a feedback request queued, a voucher reminder done, one reply flagged to a person.',
  reconfirm: 'Automated Confirmation: two suppliers re-confirmed, one room change put to the traveller, one unavailable supplier replaced from the board.',
  collect: 'Automated Collection: passports and vouchers in, a flight number asked for, a late driver contact flagged.',
};

/** Ground colour and the layer named in the corner chip, per screen. */
export const SCREEN_META: Record<string, { ground: 'warm' | 'slate' | 'sand' | 'teal' | 'photo'; app: string }> = {
  engine: { ground: 'slate', app: 'Autopilot' },
  dashboard: { ground: 'photo', app: 'Portal' },
  crm: { ground: 'warm', app: 'Portal' },
  reseller: { ground: 'warm', app: 'Portal' },
  supplier: { ground: 'sand', app: 'Supplier Portal' },
  contacts: { ground: 'slate', app: 'Portal' },
  inquiry: { ground: 'sand', app: 'Portal' },
  proposal: { ground: 'warm', app: 'Portal' },
  pipeline: { ground: 'slate', app: 'Autopilot' },
  atlas: { ground: 'photo', app: 'Atlas' },
  vault: { ground: 'warm', app: 'Vault' },
  horizon: { ground: 'teal', app: 'Horizon' },
  sourcing: { ground: 'photo', app: 'Autopilot' },
  settings: { ground: 'warm', app: 'Portal' },
  brand: { ground: 'sand', app: 'Portal' },
  inbox: { ground: 'slate', app: 'Autopilot' },
  payments: { ground: 'warm', app: 'Portal' },
  campaign: { ground: 'slate', app: 'Intelligence' },
  request: { ground: 'sand', app: 'Supplier Portal' },
  quote: { ground: 'teal', app: 'Supplier Portal' },
  team: { ground: 'warm', app: 'Portal' },
  plan: { ground: 'slate', app: 'Portal' },
  audit: { ground: 'warm', app: 'Portal' },
  relay: { ground: 'photo', app: 'Autopilot' },
  login: { ground: 'sand', app: 'Portal' },
  book: { ground: 'warm', app: 'Portal' },
  board: { ground: 'slate', app: 'Portal' },
  share: { ground: 'warm', app: 'Portal' },
  sides: { ground: 'sand', app: 'Portal' },
  itinerary: { ground: 'photo', app: 'Intelligence' },
  invoice: { ground: 'warm', app: 'Portal' },
  whatsapp: { ground: 'teal', app: 'Portal' },
  parse: { ground: 'sand', app: 'Autopilot' },
  quoting: { ground: 'slate', app: 'Autopilot' },
  followup: { ground: 'warm', app: 'Autopilot' },
  reconfirm: { ground: 'photo', app: 'Autopilot' },
  collect: { ground: 'sand', app: 'Autopilot' },
};
