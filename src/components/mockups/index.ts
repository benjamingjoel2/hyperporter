/**
 * The screens, by name, and a sentence describing each for the frame's label.
 * Every placement on the site picks one of these; an unknown name throws in
 * Mockup.astro rather than rendering an empty frame.
 */
import Dashboard from './Dashboard.astro';
import Crm from './Crm.astro';
import Reseller from './Reseller.astro';
import Supplier from './Supplier.astro';
import Integrations from './Integrations.astro';
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
  integrations: Integrations,
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
  engine: 'The Quotation stage of one trip in the Portal with Autopilot on: four suppliers asked automatically, one reminded, one decline re-routed. Switched off, the same four lines are a person’s to do.',
  dashboard: 'The Portal home screen: fourteen open trips, five awaiting quotes, and the three things waiting on a person.',
  crm: 'The Portal trips list: eight trips with their traveller, stage, value and when each was last touched.',
  reseller: 'A trip record open in the Portal — the trip, the money and the last three things that happened — over a photograph.',
  supplier: 'A supplier’s own request queue: five requests from agencies with travellers, deadlines and what has been quoted or booked.',
  integrations: 'Settings, channels: WhatsApp Business and email connected, the inquiry form live, and the links that need no connecting.',
  contacts: 'The Portal contacts list: travellers and suppliers together, with where each one is and how many trips you have run.',
  inquiry: 'The public inquiry form on an agency’s own page, filled in for a trip to Kenya.',
  proposal: 'A proposal as the traveller opens it from a link: the trip day by day, the price per person, and no cost or margin anywhere.',
  pipeline: 'Autopilot’s nine stages on one trip, three done and Confirmation running, with the two stages that need a person marked amber.',
  atlas: 'Atlas answering a rate question on the trip it belongs to, from the account’s own Vault, citing the contract page.',
  vault: 'The Vault: five supplier contracts with what each covers, when it was uploaded and whether it is indexed or expired.',
  horizon: 'Horizon searched for Kenya inside the Portal: five vetted suppliers with reply times, a quote requested from one.',
  sourcing: 'The quotation board on one trip: six offers with cost, margin and selling price, one still a draft and one declined.',
  settings: 'The Operations features, each with the tier it comes with and whether this account has it.',
  brand: 'Branding settings: the logo, the accent, the reply-to address, and which branding switches each tier carries.',
  inbox: 'One trip thread carrying a traveller’s WhatsApp and a supplier’s email side by side, with the agent’s reply.',
  payments: 'The payment automation on one trip: the deposit request sent on its own, the money waiting on a person to mark it.',
  campaign: 'A campaign report: recipients, opens and the nine replies, each landing back on its own trip.',
  request: 'A quote request as the supplier sees it: what the agency asked for, the deadline, and the note that they receive their full rate.',
  quote: 'A supplier building a quote line by line from their own rate sheet; the total is what they receive in full.',
  team: 'Team settings for a four-agent agency sharing one CRM: roles, open trips and last seen.',
  plan: 'Plan and billing: Autopilot at €49 a month, with Portal and Horizon free on every tier and Intelligence on request.',
  audit: 'The access and audit log: a magic-link sign-in, a payment marked by hand, a Vault document read, and SOC 2 shown as targeted.',
  relay: 'A live trip: the traveller’s WhatsApp relayed to the driver with both numbers masked, and the one question held for a person.',
  login: 'The sign-in screen after requesting a magic link — no password to set.',
  book: 'One advisor’s book of clients inside the agency’s CRM, each with their next trip and its stage.',
  board: 'The pipeline board: the agency’s trips as cards in six stage columns, two of them waiting on a person.',
  share: 'Sharing one proposal as a link, a PDF or a text message, with what has happened to it since.',
  sides: 'One trip record and its two links: what the traveller opens and what the supplier opens, neither showing the other’s number.',
  itinerary: 'A generated itinerary: four day-blocks, each priced from the account’s Vault and cited to its contract page.',
  invoice: 'Payments on one trip: a deposit received, a balance due with a reminder sent, and the invoice the proposal produced.',
  whatsapp: 'A WhatsApp Business number on the trip thread: an incoming message opening a contact and a trip, and the reply going back the same way.',
  parse: 'An inquiry read into a brief: the message as it arrived, the fields taken from it, and the budget asked for rather than assumed.',
  quoting: 'Four suppliers asked at once: two replied, one reminded, one declined, with the margin set on the offer that came back.',
  followup: 'Scheduled follow-ups: a proposal nudge and a feedback request queued, a voucher reminder done, one reply stopping the sequence.',
  reconfirm: 'Four suppliers re-confirmed the moment the traveller accepted, with one room change put back to her.',
  collect: 'What is still outstanding before departure, who it is owed by, and the one item late enough to be flagged to a person.',
};

/** Ground colour and the layer named in the corner chip, per screen. */
export const SCREEN_META: Record<string, { ground: 'warm' | 'slate' | 'sand' | 'teal' | 'photo'; app: string }> = {
  engine: { ground: 'slate', app: 'Autopilot' },
  dashboard: { ground: 'photo', app: 'Portal' },
  crm: { ground: 'warm', app: 'Portal' },
  reseller: { ground: 'warm', app: 'Portal' },
  supplier: { ground: 'sand', app: 'Supplier Portal' },
  integrations: { ground: 'warm', app: 'Portal' },
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
