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
  dashboard: 'One account’s four layers: OS and Horizon included, Autopilot switched on, Intelligence available.',
  crm: 'A trip record in OS — travellers, stage, proposal link and two supplier quotes — floating over the trips list.',
  contacts: 'The OS people list: travellers and suppliers with their latest thread.',
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
};

/** Ground colour and the layer named in the corner chip, per screen. */
export const SCREEN_META: Record<string, { ground: 'warm' | 'slate' | 'sand' | 'teal' | 'photo'; app: string }> = {
  dashboard: { ground: 'photo', app: 'OS' },
  crm: { ground: 'warm', app: 'OS' },
  contacts: { ground: 'slate', app: 'OS' },
  inquiry: { ground: 'sand', app: 'OS' },
  proposal: { ground: 'warm', app: 'OS' },
  pipeline: { ground: 'slate', app: 'Autopilot' },
  atlas: { ground: 'photo', app: 'Atlas' },
  vault: { ground: 'warm', app: 'Vault' },
  horizon: { ground: 'teal', app: 'Horizon' },
  sourcing: { ground: 'photo', app: 'Autopilot' },
  settings: { ground: 'warm', app: 'OS' },
  brand: { ground: 'sand', app: 'OS' },
  inbox: { ground: 'slate', app: 'Autopilot' },
  payments: { ground: 'warm', app: 'OS' },
  campaign: { ground: 'slate', app: 'Intelligence' },
  request: { ground: 'sand', app: 'Supplier OS' },
  quote: { ground: 'teal', app: 'Supplier OS' },
  team: { ground: 'warm', app: 'OS' },
  plan: { ground: 'slate', app: 'OS' },
  audit: { ground: 'warm', app: 'OS' },
  relay: { ground: 'photo', app: 'Autopilot' },
  login: { ground: 'sand', app: 'OS' },
  book: { ground: 'warm', app: 'OS' },
};
