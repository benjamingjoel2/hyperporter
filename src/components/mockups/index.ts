/**
 * The screens, by name, and a sentence describing each for the frame's label.
 * Every placement on the site picks one of these; an unknown name throws in
 * Mockup.astro rather than rendering an empty frame.
 */
import Dashboard from './Dashboard.astro';
import Crm from './Crm.astro';
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

export const SCREENS: Record<string, any> = {
  dashboard: Dashboard,
  crm: Crm,
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
};

export const SCREEN_ALT: Record<string, string> = {
  dashboard: 'Hyperporter OS overview: trips by stage, an Atlas answer from the Vault, and two Horizon suppliers who have quoted.',
  crm: 'The OS trips list: seven open trips with their stage, travellers, dates and value.',
  contacts: 'The OS people list: travellers and suppliers with their latest thread.',
  inquiry: 'The public inquiry form on an agency’s own page, filled in for a trip to Kenya.',
  proposal: 'A branded proposal for nine nights in the Mara beside its magic link and branding settings.',
  pipeline: 'The Autopilot pipeline board: nine stage columns with trips moving through them, human touchpoints marked.',
  atlas: 'Atlas answering a rate question from the account’s own Vault, citing the contract page.',
  vault: 'The Vault: five supplier contracts with their validity, extracted rates and index status.',
  horizon: 'Horizon search for Kenya: four vetted suppliers with reply times and a quote requested from one.',
  sourcing: 'A trip at the Quotation stage: three supplier quotes, the margin applied, and the approval waiting.',
  settings: 'Feature settings by category, each feature tagged with the tier it comes with.',
  brand: 'Branding settings: logo, accent, domain masking, and a preview of what a traveller receives.',
  inbox: 'One trip thread carrying WhatsApp and email messages, with an automatic step and a payment touchpoint.',
  payments: 'The payments list: requests sent automatically, receipt marked by hand.',
  campaign: 'Email campaigns with open rates and replies routed back to the trip thread.',
  request: 'A supplier’s request queue: structured quote requests from agencies, with deadlines.',
  quote: 'A supplier composing a quote line by line; the total is what they receive in full.',
  team: 'Team settings for a four-agent agency sharing one CRM and one brand.',
  plan: 'Plan and billing: Autopilot at €49 a month, what it includes, usage and add-ons.',
  audit: 'Access and audit log: magic-link sign-ins, automatic steps, and human actions marked.',
  relay: 'A live trip: a traveller’s WhatsApp relayed to the driver and back, and one question escalated to a person.',
  login: 'The sign-in screen after requesting a magic link — no password to set.',
  book: 'A single agent’s book of clients with each one’s current stage.',
};

/** Screens with no sidebar — a traveller's or a visitor's view, not an operator's. */
export const SOLO = new Set(['inquiry', 'login']);
