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
  email: 'Ent.czir62@hotmail.com' as string | null,

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
  geo: {
    lat: null as number | null,
    lng: null as number | null,
  },

  /**
   * TODO Horaires reels. Format Schema.org OpeningHoursSpecification.
   * Tant que le tableau est vide, aucun horaire n'est affiche ni declare.
   * Exemple : { days: ['Monday','Tuesday'], opens: '08:00', closes: '18:00' }
   */
  openingHours: [] as ReadonlyArray<{
    days: string[];
    opens: string;
    closes: string;
  }>,

  /** TODO Annee de creation (SIREN / Kbis) — utilisee dans foundingDate */
  foundingYear: null as number | null,

  /** TODO Numero SIRET — affiche en mentions legales */
  siret: null as string | null,
} as const;

/* ---------------------------------------------------------------------------
 * 2. Fiche Google Business Profile
 *    Le site fonctionne comme une extension de la fiche : chaque action
 *    disponible sur la fiche doit etre accessible depuis le site.
 * ------------------------------------------------------------------------ */
export const google = {
  /** TODO Place ID — https://developers.google.com/maps/documentation/places/web-service/place-id */
  placeId: null as string | null,
  /** TODO CID de la fiche (identifiant numerique dans l'URL Maps) */
  cid: null as string | null,

  /** URL directe vers l'onglet avis. Genere automatiquement si placeId fourni. */
  get reviewsUrl(): string | null {
    if (this.cid) return `https://search.google.com/local/reviews?placeid=${this.placeId ?? ''}`;
    if (this.placeId) return `https://search.google.com/local/reviews?placeid=${this.placeId}`;
    return null;
  },
  /** Lien "laisser un avis" (ouvre directement la boite de dialogue) */
  get writeReviewUrl(): string | null {
    return this.placeId ? `https://search.google.com/local/writereview?placeid=${this.placeId}` : null;
  },
  /** Lien itineraire Google Maps */
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
  /** URL publique de la fiche (bouton "voir la fiche") */
  profileUrl: null as string | null,
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
