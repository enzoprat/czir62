/* ===========================================================================
 * CZIR62 — Fournisseurs et marques
 * ---------------------------------------------------------------------------
 * Marques relevees sur la devanture du local de Bethune.
 *
 * LOGOS
 *  Les fichiers de public/images/marques/ proviennent des sites officiels des
 *  marques concernees (ou du site du groupe pour Asturienne, enseigne de
 *  Saint-Gobain Distribution Batiment France). Ils sont affiches en couleur,
 *  sans deformation ni recoloration, a une taille homogene.
 *
 *  Ces logos restent la propriete de leurs titulaires. Leur presence indique
 *  uniquement la provenance des materiaux mis en oeuvre. Verifier les
 *  conditions d'utilisation de chaque marque avant mise en ligne : certaines
 *  imposent une zone de protection minimale ou interdisent l'usage sur fond
 *  colore. En cas de demande d'un titulaire, retirer le champ `logo` de
 *  l'entree concernee : le libelle typographique reprend automatiquement sa
 *  place, sans autre modification.
 *
 * FORMULATIONS
 *  Retenue : « Nous travaillons avec des materiaux provenant de fabricants et
 *  distributeurs reconnus du secteur. »
 *  INTERDIT sans justification contractuelle reelle : « partenaire officiel »,
 *  « partenaire certifie », « agree », « labellise ».
 * ========================================================================= */

export interface Fournisseur {
  slug: string;
  /** Libelle exact de la marque */
  name: string;
  /** Nature de l'entreprise — factuel, verifiable */
  type: string;
  /** Logo officiel. Retirer ce champ fait revenir au libelle typographique. */
  logo?: string;
  /**
   * Correction optique. A hauteur egale, un logo en pave plein (VELUX) parait
   * bien plus lourd qu'un logotype filaire (Seigneurie). Ce facteur reequilibre
   * les poids visuels dans la bande. 1 = hauteur de reference.
   */
  scale?: number;
}

export const fournisseurs: Fournisseur[] = [
  { slug: 'velux',      name: 'VELUX',      type: 'Fenêtres de toit',                   logo: '/images/marques/velux.svg',      scale: 0.86 },
  { slug: 'asturienne', name: 'Asturienne', type: 'Distributeur couverture',            logo: '/images/marques/asturienne.png', scale: 1 },
  { slug: 'lariviere',  name: 'Larivière',  type: 'Distributeur couverture',            logo: '/images/marques/lariviere.svg',  scale: 1 },
  { slug: 'cedeo',      name: 'CEDEO',      type: 'Distributeur sanitaire et chauffage', logo: '/images/marques/cedeo.svg',      scale: 0.96 },
  { slug: 'fischer',    name: 'Fischer',    type: 'Fixations',                          logo: '/images/marques/fischer.png',    scale: 1 },
  { slug: 'seigneurie', name: 'Seigneurie', type: 'Peintures et revêtements',           logo: '/images/marques/seigneurie.svg', scale: 1 },
  { slug: 'zolpan',     name: 'Zolpan',     type: 'Peintures et revêtements',           logo: '/images/marques/zolpan.svg',     scale: 1.04 },
  { slug: 'fernagut',   name: 'Fernagut',   type: 'Distributeur matériaux',             logo: '/images/marques/fernagut.png',   scale: 0.86 },
];

/** Formulation validee — a ne pas durcir sans justification contractuelle */
export const fournisseursIntro =
  "Nous travaillons avec des matériaux provenant de fabricants et distributeurs reconnus du secteur.";
