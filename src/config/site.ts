/* ===========================================================================
 * CZIR62 — SOURCE DE VERITE UNIQUE (NAP + identite)
 * ---------------------------------------------------------------------------
 * >>> C'EST LE SEUL FICHIER A EDITER POUR LES COORDONNEES. <<<
 *
 * Tout le site consomme ces valeurs : header, footer, page contact, boutons
 * d'appel, donnees structurees JSON-LD, balises meta, page implantation.
 * Le NAP (Name / Address / Phone) doit etre STRICTEMENT identique a celui de
 * la fiche Google Business Profile, a la virgule pres. Toute divergence
 * degrade la coherence des citations locales.
 *
 * REGLE DE CONCEPTION : aucune donnee non confirmee n'est inventee.
 * Les champs inconnus valent `null`. L'interface et le JSON-LD s'adaptent
 * automatiquement (voir les helpers `has*` en bas de fichier) : rien de faux
 * n'est affiche, aucune propriete vide n'est envoyee a Google.
 * Voir A-FOURNIR.md pour la liste complete des elements a collecter.
 * ========================================================================= */

export const site = {
  url: 'https://www.czir62.fr',
  brand: 'CZIR62',
  legalName: 'Entreprise Générale de Couverture CZIR62',
  /** Formulation courte reutilisee dans les titres et le JSON-LD */
  tagline: 'Entreprise générale de couverture à Béthune',
  locale: 'fr_FR',
  lang: 'fr',
} as const;

/* ---------------------------------------------------------------------------
 * 1. NAP — Name / Address / Phone
 * ------------------------------------------------------------------------ */
export const nap = {
  /** Nom exact affiche sur la fiche Google Business Profile */
  name: 'CZIR62 — Entreprise Générale de Couverture',

  /** TODO Numero principal. Format d'affichage francais : '03 21 00 00 00' */
  phone: '07 86 70 41 34' as string | null,
  /** Meme numero au format E.164 pour les liens tel: */
  phoneE164: '+33786704134' as string | null,

  /** Email de reception des demandes */
  email: 'ent.czir62@hotmail.com' as string | null,

  address: {
    /**
     * Numero + voie. DOIT etre strictement identique a la fiche Google
     * Business Profile — a l'abreviation et au trait d'union pres.
     */
    street: '100 rue Sainte-Pry' as string | null,
    postalCode: '62400',
    city: 'Béthune',
    region: 'Hauts-de-France',
    department: 'Pas-de-Calais',
    countryCode: 'FR',
    country: 'France',
  },

  /** TODO Coordonnees du local (clic droit sur Google Maps > copier les coords) */
  /**
   * Releve sur la Base Adresse Nationale (api-adresse.data.gouv.fr), au
   * niveau du numero et non de la voie. A verifier une fois : le point doit
   * tomber sur l'angle du batiment, pas au milieu de la rue.
   */
  geo: {
    lat: 50.529439 as number | null,
    lng: 2.637719 as number | null,
  },

  /**
   * Releves sur la porte du local, photo du 11 septembre 2026. Le samedi
   * matin est sur rendez-vous : il n'est donc pas declare comme une plage
   * d'ouverture, Google afficherait « ouvert » a tort.
   */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '12:00' },
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '18:00' },
  ] as ReadonlyArray<{
    days: string[];
    opens: string;
    closes: string;
  }>,

  /** Samedi matin sur rendez-vous — mention libre, hors plage declaree. */
  samediSurRdv: true,

  /** Depannage 7j/7 annonce sur la devanture du local. */
  depannage7j: true,

  /**
   * Annee de creation de la PERSONNE MORALE. Distincte de l'experience de
   * l'artisan : voir experienceYears juste en dessous. Ne jamais fusionner
   * les deux — la fiche Google affiche la date d'ouverture, et une
   * entreprise de 2026 qui se dit « depuis 25 ans » se contredit a l'ecran.
   */
  /**
   * Annee de fondation de la maison. Confirmee par le client et affichee sur
   * l'auvent du local : « VOTRE ARTISAN DEPUIS 1925 ». C'est une entreprise
   * FAMILIALE, en activite depuis cette date — la structure juridique
   * actuelle a ete immatriculee en 2026, ce qui est une formalite de
   * transmission et non le debut de l'activite.
   *
   * C'est cette date qui alimente foundingDate : schema.org decrit la
   * fondation de l'organisation, pas l'immatriculation de sa derniere forme
   * juridique.
   */
  foundingYear: 1925 as number | null,

  /** Entreprise familiale — conditionne la formulation « maison familiale ». */
  familiale: true,

  /**
   * Annees de metier du couvreur qui dirige aujourd'hui la maison. A ne pas
   * confondre avec foundingYear : l'entreprise existe depuis 1925, la
   * personne qui la dirige exerce depuis 25 ans. Les deux se disent ensemble
   * sans se contredire, mais jamais l'une a la place de l'autre.
   */
  experienceYears: 25 as number | null,

  /**
   * Le gerant, nomme. C'est le signal E-E-A-T le moins cher et le plus rare
   * du secteur : la quasi-totalite des sites de couvreurs parlent d'un
   * « nous » sans visage. Une personne nommee porte l'experience, engage la
   * responsabilite et donne un sujet a `employee` dans le balisage.
   *
   * Sert aussi de directeur de la publication en mentions legales : la LCEN
   * (art. 6-III) l'impose, et laisser ce champ vide est une non-conformite.
   */
  dirigeant: {
    prenom: 'Sébastien' as string | null,
    nom: 'Feret' as string | null,
    fonction: 'Gérant' as string | null,
  },

  /** TODO Numero SIRET — affiche en mentions legales */
  siret: null as string | null,

  /**
   * Assurance de responsabilite decennale. La loi du 18 juin 2014 impose de
   * faire figurer ces quatre informations sur les devis et les factures ;
   * les afficher sur le site est le prolongement logique.
   * TODO a renseigner des que l'attestation est delivree.
   */
  /**
   * Hebergeur du site — mention imposee par la LCEN art. 6-III (nom, adresse).
   * Deduit du DNS le 12 septembre 2026 : www.czir62.fr pointe sur
   * vercel-dns-017.com et les reponses portent l'en-tete `server: Vercel`.
   * A corriger ici, et nulle part ailleurs, si l'hebergement change.
   */
  hebergeur: {
    nom: 'Vercel Inc.' as string | null,
    adresse: '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis' as string | null,
    site: 'https://vercel.com' as string | null,
  },

  assurance: {
    assureur: null as string | null,
    contrat: null as string | null,
    zone: 'France métropolitaine' as string | null,
    /** Qualification RGE, si et seulement si elle est effectivement obtenue */
    rge: null as string | null,
  },
} as const;

/* ---------------------------------------------------------------------------
 * 2. Fiche Google Business Profile
 *    Le site fonctionne comme une extension de la fiche : chaque action
 *    disponible sur la fiche doit etre accessible depuis le site.
 * ------------------------------------------------------------------------ */
export const google = {
  /**
   * Place ID (format ChIJ…). Introuvable sans cle API ; il n'est pas requis :
   * le CID suffit pour toutes les URL ci-dessous. Le renseigner rendrait le
   * lien « laisser un avis » direct, sans passage par la fiche.
   */
  placeId: null as string | null,

  /**
   * Identifiant Knowledge Graph de l'entreprise, releve le 12 septembre 2026
   * dans l'URL vers laquelle redirige le lien de partage de la fiche
   * (share.google -> google.com/search?kgmid=...).
   *
   * C'est l'identifiant que Google attribue lui-meme a l'entite dans son
   * graphe de connaissances. Il sert de reference supplementaire dans
   * `sameAs` : une URL de plus qui designe sans ambiguite la meme entreprise.
   * Aucun effet de classement documente — c'est une reference, pas un levier,
   * et il est ecrit ici comme tel.
   */
  kgmid: '/g/11zxdwzsmd' as string | null,

  /** CID de la fiche — identifiant numerique, releve le 11 septembre 2026. */
  cid: '6405054400449423243' as string | null,

  /**
   * Lien court fourni par le tableau de bord Google Business Profile
   * (« Demander des avis »), de la forme https://g.page/r/…/review.
   * C'est le seul qui ouvre le formulaire d'avis en un clic ; tant qu'il
   * n'est pas renseigne, on retombe sur la fiche, ou le bouton « Rediger un
   * avis » est immediatement visible.
   */
  shortReviewUrl: 'https://g.page/r/CYsn17EKU-NYEBM/review' as string | null,

  /** URL publique de la fiche. */
  get profileUrl(): string | null {
    if (this.cid) return `https://www.google.com/maps?cid=${this.cid}`;
    if (this.placeId) return `https://www.google.com/maps/place/?q=place_id:${this.placeId}`;
    return null;
  },

  /** Panneau de connaissance de l'entite, derive du kgmid. */
  get knowledgeUrl(): string | null {
    return this.kgmid ? `https://www.google.com/search?kgmid=${this.kgmid}` : null;
  },

  /** Onglet avis de la fiche. */
  get reviewsUrl(): string | null {
    if (this.placeId) return `https://search.google.com/local/reviews?placeid=${this.placeId}`;
    return this.profileUrl;
  },

  /** Formulaire « laisser un avis ». */
  get writeReviewUrl(): string | null {
    if (this.shortReviewUrl) return this.shortReviewUrl;
    if (this.placeId) return `https://search.google.com/local/writereview?placeid=${this.placeId}`;
    return this.profileUrl;
  },

  /** Itineraire Google Maps. */
  get directionsUrl(): string | null {
    if (this.placeId) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        addressOneLine(),
      )}&destination_place_id=${this.placeId}`;
    }
    if (nap.address.street) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOneLine())}`;
    }
    return null;
  },
};

/* ---------------------------------------------------------------------------
 * 3. Reseaux (uniquement ceux qui existent reellement)
 * ------------------------------------------------------------------------ */
export const socials: ReadonlyArray<{ name: string; url: string }> = [
  // { name: 'Facebook', url: 'https://www.facebook.com/...' },
];

/* ---------------------------------------------------------------------------
 * 4. Helpers — utilises partout pour degrader proprement
 * ------------------------------------------------------------------------ */
export const hasPhone = (): boolean => Boolean(nap.phoneE164);
export const hasEmail = (): boolean => Boolean(nap.email);
export const hasAddress = (): boolean => Boolean(nap.address.street);
export const hasGeo = (): boolean => nap.geo.lat !== null && nap.geo.lng !== null;
export const hasHours = (): boolean => nap.openingHours.length > 0;

/** Adresse sur une ligne : « 12 rue Untel, 62400 Béthune » */
/** Vrai seulement si l'attestation decennale est reellement renseignee. */
export function hasAssurance(): boolean {
  return Boolean(nap.assurance.assureur && nap.assurance.contrat);
}

/** Vrai seulement si une qualification RGE est effectivement detenue. */
export function hasRge(): boolean {
  return Boolean(nap.assurance.rge);
}

/** Vrai seulement si le dirigeant est reellement nomme. */
export function hasDirigeant(): boolean {
  return Boolean(nap.dirigeant.prenom && nap.dirigeant.nom);
}

/** « Sébastien Feret » — ou null tant que le nom n'est pas connu. */
export function dirigeantNom(): string | null {
  if (!hasDirigeant()) return null;
  return `${nap.dirigeant.prenom} ${nap.dirigeant.nom}`;
}

/** Annees de metier de l'artisan — jamais l'anciennete de la societe. */
export function hasExperience(): boolean {
  return Boolean(nap.experienceYears && nap.experienceYears > 0);
}

/**
 * Numero de TVA intracommunautaire, calcule depuis le SIREN plutot que saisi.
 * Cle = (12 + 3 × (SIREN modulo 97)) modulo 97 — formule officielle. Il n'y a
 * donc rien a demander au client : le SIRET suffit a produire les deux.
 */
export function tvaIntracom(): string | null {
  const siren = (nap.siret ?? '').replace(/\D/g, '').slice(0, 9);
  if (siren.length !== 9) return null;
  const cle = (12 + 3 * (Number(siren) % 97)) % 97;
  return `FR${String(cle).padStart(2, '0')}${siren}`;
}

export function addressOneLine(): string {
  const { street, postalCode, city } = nap.address;
  return [street, `${postalCode} ${city}`].filter(Boolean).join(', ');
}

/** Lien tel: pret a l'emploi, ou null si le numero n'est pas encore connu */
export function telHref(): string | null {
  return nap.phoneE164 ? `tel:${nap.phoneE164}` : null;
}

/** Libelle du bouton d'appel — bascule vers le rappel si pas de numero */
export function callLabel(): string {
  return hasPhone() ? (nap.phone as string) : 'Être rappelé';
}
