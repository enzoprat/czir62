/* ===========================================================================
 * CZIR62 — Modele de donnee d'un lead
 * ---------------------------------------------------------------------------
 * Ce type est le contrat partage entre le formulaire (client), la route
 * d'ingestion (/api/lead/) et toutes les destinations (CRM, n8n, Sheets,
 * e-mail). Ajouter un champ ici le propage partout.
 *
 * Objectif metier : pouvoir repondre plus tard a la question
 * « ce chantier de 9 000 € vient de quelle source ? »
 * D'ou la conservation systematique de l'attribution d'origine.
 * ========================================================================= */

/** Ce que l'attribution retient de la premiere visite */
export interface Attribution {
  /** Premiere page vue par le visiteur (page d'entree) */
  landingPage: string | null;
  /** Page depuis laquelle la demande a ete envoyee */
  conversionPage: string | null;
  /** Referent HTTP de la premiere visite */
  referrer: string | null;
  /** Source deduite : google / bing / direct / referral / <domaine> */
  source: string | null;
  /** organic / cpc / referral / none / <utm_medium> */
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
  /** Identifiants de clic publicitaire */
  gclid: string | null;
  /** Google Ads iOS / app campaigns */
  gbraid: string | null;
  wbraid: string | null;
  msclkid: string | null;
  fbclid: string | null;
  /** Horodatage ISO de la premiere visite */
  firstSeen: string | null;
  /** Nombre de pages vues avant la conversion */
  pageViews: number | null;
}

/** Origine fonctionnelle de la demande — permet de comparer les outils */
export type LeadOrigin =
  | 'formulaire-devis'
  | 'diagnostic'
  | 'estimateur'
  | 'assistant-fuite'
  | 'rappel'
  | 'contact';

export interface LeadInput {
  /** Outil ou formulaire a l'origine de la demande */
  origin: LeadOrigin;
  nom: string;
  telephone: string;
  email?: string;
  commune?: string;
  codePostal?: string;
  /** Slug de prestation, ou libelle libre si hors nomenclature */
  prestation?: string;
  message?: string;
  /** Reponses des parcours guides (diagnostic, assistant fuite, estimateur) */
  reponses?: Record<string, string | string[]>;
  /** Noms de fichiers joints (les fichiers eux-memes sont transmis a part) */
  fichiers?: string[];
  /** Attribution collectee cote client */
  attribution?: Partial<Attribution>;
  /** Champ piege : doit rester vide */
  _hp?: string;
  /** Horodatage d'affichage du formulaire — sert au controle de vitesse */
  _t?: number;
  /** Jeton Turnstile, si la verification anti-robot est activee */
  _captcha?: string;
}

/** Lead normalise, tel qu'il est transmis a toutes les destinations */
export interface Lead {
  /** Identifiant unique — format CZIR-XXXXXX */
  id: string;
  /** ISO 8601 complet, fuseau inclus */
  createdAt: string;
  /** Date locale FR — lisible directement dans un tableur */
  date: string;
  /** Heure locale FR */
  heure: string;

  origin: LeadOrigin;
  nom: string;
  telephone: string;
  email: string | null;
  commune: string | null;
  codePostal: string | null;
  prestation: string | null;
  /** Libelle lisible de la prestation (et non le slug) */
  prestationLabel: string | null;
  message: string | null;
  reponses: Record<string, string | string[]> | null;
  fichiers: string[];

  attribution: Attribution;

  /** Metadonnees techniques */
  meta: {
    userAgent: string | null;
    ip: string | null;
    language: string | null;
  };
}

export interface SinkResult {
  name: string;
  ok: boolean;
  detail?: string;
}
