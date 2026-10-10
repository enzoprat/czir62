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
 *  1. saisir ci-dessous la note reelle, le nombre reel d'avis et les avis
 *     reellement publies sur la fiche (texte fidele, prenom tel qu'affiche
 *     publiquement par Google) ;
 *  2. laisser `verifie` a false — voir ci-dessous.
 *
 * POURQUOI LAISSER `verifie` A FALSE MEME AVEC DE VRAIS AVIS
 * Depuis septembre 2019, Google ignore les extraits enrichis d'avis
 * « self-serving » : une entreprise qui balise ses propres avis sur son
 * propre site n'obtient aucune etoile dans les resultats. Les etoiles
 * visibles dans le pack local viennent de la fiche Google, pas d'ici.
 * Emettre quand meme un AggregateRating n'apporte donc rien et expose a une
 * action manuelle si le balisage diverge un jour de la fiche.
 *
 * Conclusion : afficher les avis sur le site (c'est excellent pour la
 * conversion), ne pas les baliser. `verifie` reste un interrupteur de
 * secours, pas une etape d'activation.
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

/**
 * Releve sur la fiche Google le 10 octobre 2026.
 *
 * `verifie` ne commande plus que l'AFFICHAGE. Le balisage, lui, est coupe en
 * dur dans schema.ts : voir le commentaire d'aggregateRating(). Afficher une
 * note vraie et la declarer a Google sont deux decisions differentes.
 */
export const avisSource: AvisSource = {
  note: 5,
  total: 8,
  verifie: true,
  misAJour: '2026-10-10',
};

/**
 * Avis reels uniquement.
 * Tant que ce tableau est vide, la section « Avis Google » n'est pas rendue
 * et un bloc de confiance alternatif (local physique, réalisations) prend
 * sa place sur la page d'accueil.
 */
export const avis: Avis[] = [
  {
    auteur: 'Stéphanie GOGUILLON',
    note: 5,
    texte:
      "Très consciencieux ma cheminée n'a jamais été aussi propre je recommande à 200%",
    date: 'octobre 2026',
  },
];

/*
 * 7 avis sur 8 manquent encore.
 *
 * Google Maps n'en expose que trois a la lecture, et tronque deux d'entre eux
 * derriere un lien « Plus » :
 *
 *   Andy Cuvelier — octobre 2026 — « J'ai réalisé mon isolation de comble
 *   changement de gouttieres et façade part czir62 de Béthune entreprise
 *   efficace chantier réalisé dans les temps je recommande [tronque] »
 *
 *   catherine horen — septembre 2026 — « J'ai fait appel a l entreprise
 *   czir62 pour le nettoyage des panneaux solaire et nettoyer ma véranda
 *   personnel très propre je conseil [tronque] »
 *
 * Ils ne sont PAS ajoutes au tableau : publier un texte tronque sous le nom
 * d'un client est une citation inexacte, et la regle du projet est que le
 * texte est repris fidelement ou pas du tout. Les textes complets se lisent
 * dans le tableau de bord de la fiche, onglet « Voir les avis ».
 */

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
