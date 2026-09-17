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
  /**
   * Denomination sociale EXACTE, relevee sur l'extrait Kbis du 3 septembre
   * 2026 (greffe d'Arras, n° de gestion 2026B01716). Avec l'espace.
   *
   * Portait auparavant « Entreprise Générale de Couverture CZIR62 », qui
   * n'est pas une raison sociale mais une description d'activite : la faire
   * passer pour la personne morale en mentions legales etait une erreur.
   * Cette formulation reste utilisee comme descriptif (voir `tagline`).
   */
  legalName: 'CZIR 62',
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
  /**
   * Le nom EXACT de la fiche Google, releve sur la fiche le 12 septembre 2026.
   * C'est lui qui alimente `name` dans le balisage et l'en-tete de la page
   * contact : le nom fait partie du NAP au meme titre que l'adresse et le
   * telephone, et une divergence dissocie les citations.
   *
   * Ne pas confondre avec `site.legalName` (la personne morale) ni
   * `site.brand` (l'enseigne courte, celle de la devanture et du logo). Les
   * trois cohabitent dans le balisage : name / legalName / alternateName.
   */
  name: 'CZIR62 Couvreur Béthune',

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
    street: '100 rue Saint-Pry' as string | null,
    postalCode: '62400',
    city: 'Béthune',
    region: 'Hauts-de-France',
    department: 'Pas-de-Calais',
    countryCode: 'FR',
    country: 'France',
  },

  /**
   * Releve par l'entreprise sur Google Maps le 12 septembre 2026, a partir de
   * la fiche elle-meme. C'est la reference a privilegier : ce sont les
   * coordonnees que Google affiche pour l'etablissement, donc celles avec
   * lesquelles le balisage doit concorder.
   *
   * La Base Adresse Nationale donnait 50.529439 / 2.637719 pour le 100 rue
   * Saint Pry, soit 26 m plus au sud. L'ecart est de l'ordre de la largeur
   * d'un batiment : les deux points designent la meme adresse, on garde celui
   * qui vient de Google.
   */
  geo: {
    lat: 50.529673 as number | null,
    lng: 2.637652 as number | null,
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
   * Annee de fondation de l'ORGANISATION, au sens de schema.org. C'est donc
   * 2026 : l'extrait Kbis du 3 septembre 2026 porte « Origine du fonds ou de
   * l'activite : Creation », et une date de debut d'activite au 26/08/2026.
   *
   * Cette valeur portait 1925 jusqu'au 17 septembre 2026, au motif que
   * l'immatriculation de 2026 serait une formalite de transmission. Le Kbis
   * dit le contraire : il n'y a pas eu de reprise de fonds, mais une
   * creation. Or `foundingDate` est une assertion verifiable sur une personne
   * morale — les registres publics sont lisibles par tous, Google compris.
   *
   * L'anciennete familiale n'est pas niee pour autant : elle vit dans
   * `familleDepuis` juste en dessous, qui alimente le texte editorial et rien
   * d'autre. Le balisage decrit la societe, la prose decrit la famille.
   */
  foundingYear: 2026 as number | null,

  /**
   * Annee revendiquee par la maison, affichee sur l'auvent du local :
   * « VOTRE ARTISAN DEPUIS 1925 », confirmee oralement par le client.
   *
   * Sert UNIQUEMENT au texte visible. Ne jamais la renvoyer dans le JSON-LD :
   * la societe immatriculee a ete creee en 2026, et une declaration
   * structuree contraire au registre du commerce se verifie en une requete.
   */
  familleDepuis: 1925 as number | null,

  /** Entreprise familiale — conditionne la formulation « maison familiale ». */
  familiale: true,

  /**
   * Annees de metier du couvreur qui dirige aujourd'hui la maison. A ne pas
   * confondre avec `familleDepuis` : la maison se reclame de 1925, la
   * personne qui la dirige exerce depuis 25 ans. Les deux se disent ensemble
   * sans se contredire, mais jamais l'une a la place de l'autre — et aucune
   * des deux ne decrit la societe, immatriculee en 2026 (`foundingYear`).
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
    /** Kbis : « Président ». Une SASU n'a pas de gerant — c'est une SARL qui en a. */
    fonction: 'Président' as string | null,
  },

  /**
   * Identite legale, relevee sur l'extrait Kbis du 3 septembre 2026.
   * L'article R123-237 du code de commerce impose la forme juridique, le
   * capital, le siege et le numero RCS avec la ville du greffe sur tout site
   * professionnel — pas le SIRET, contrairement a une idee repandue.
   */
  legal: {
    /** 9 chiffres. Le Kbis ne porte pas le SIRET, qui ajoute le NIC a 5 chiffres. */
    siren: '109525725' as string | null,
    /** Ville du greffe — indissociable du numero dans la mention legale. */
    rcsVille: 'Arras' as string | null,
    formeJuridique: 'SASU' as string | null,
    formeJuridiqueLongue: "Société par actions simplifiée à associé unique" as string | null,
    capitalEuros: 1000 as number | null,
    /** Immatriculation au RCS. Le debut d'activite est anterieur : 26/08/2026. */
    immatriculation: '2026-09-03' as string | null,
  },

  /**
   * Le SIRET n'est PAS sur l'extrait Kbis : celui-ci porte le SIREN, le SIRET
   * y ajoute le NIC a 5 chiffres propre a l'etablissement. Il se lit sur
   * l'avis de situation INSEE (avis-situation-sirene.insee.fr, gratuit et
   * immediat a partir du SIREN). Il n'est pas obligatoire sur un site ; le
   * RCS l'est, et il est renseigne ci-dessus.
   */
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
  const siren = (nap.legal.siren ?? nap.siret ?? '').replace(/\D/g, '').slice(0, 9);
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
