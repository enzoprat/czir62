/* ===========================================================================
 * CZIR62 — Avis clients
 * ---------------------------------------------------------------------------
 * REGLE ABSOLUE, NON NEGOCIABLE :
 * aucun avis fictif, aucune note inventee, aucun AggregateRating fabrique.
 *
 * Afficher « 5/5 sur 187 avis » sans fiche Google correspondante est un faux
 * signal de confiance : c'est une pratique trompeuse, c'est contraire aux
 * regles de Google sur les extraits enrichis, et cela expose a une penalite
 * manuelle. Le composant d'affichage refuse simplement de rendre la section
 * tant que `avis` est vide.
 *
 * POUR ACTIVER LA SECTION :
 *  1. renseigner `google.placeId` dans src/config/site.ts ;
 *  2. saisir ci-dessous la note reelle, le nombre reel d'avis et les avis
 *     reellement publies sur la fiche (texte fidele, prenom tel qu'affiche
 *     publiquement par Google) ;
 *  3. passer `verifie` a true apres relecture.
 *
 * Le JSON-LD AggregateRating n'est emis que si `verifie === true`.
 * ========================================================================= */

export interface Avis {
  /** Nom tel qu'il apparait publiquement sur la fiche Google */
  auteur: string;
  /** Note attribuee, de 1 a 5 */
  note: 1 | 2 | 3 | 4 | 5;
  /** Texte de l'avis, repris fidelement, sans reformulation */
  texte: string;
  /** Anciennete telle qu'affichee par Google (« il y a 2 mois ») ou date ISO */
  date: string;
  /** URL de la photo de profil. Sinon, l'initiale est utilisee. */
  avatar?: string;
  /** Commune, si elle ressort explicitement de l'avis */
  ville?: string;
  /** Prestation concernee, si elle ressort explicitement de l'avis */
  service?: string;
}

export interface AvisSource {
  /** Note moyenne reelle affichee sur la fiche Google */
  note: number | null;
  /** Nombre reel d'avis */
  total: number | null;
  /** Passe a true UNIQUEMENT apres verification humaine des donnees ci-dessus */
  verifie: boolean;
  /** Date de derniere synchronisation manuelle */
  misAJour: string | null;
}

export const avisSource: AvisSource = {
  note: null,
  total: null,
  verifie: false,
  misAJour: null,
};

/**
 * Avis reels uniquement.
 * Tant que ce tableau est vide, la section « Avis Google » n'est pas rendue
 * et un bloc de confiance alternatif (local physique, réalisations) prend
 * sa place sur la page d'accueil.
 */
export const avis: Avis[] = [];

/* ------------------------------------------------------------- accesseurs */

export const hasAvis = (): boolean => avis.length > 0;

/** La note agregee n'est exploitable que si elle est verifiee ET coherente */
export const hasNoteVerifiee = (): boolean =>
  avisSource.verifie &&
  typeof avisSource.note === 'number' &&
  typeof avisSource.total === 'number' &&
  avisSource.total > 0;

export function avisRecents(limit = 8): Avis[] {
  return avis.slice(0, limit);
}
