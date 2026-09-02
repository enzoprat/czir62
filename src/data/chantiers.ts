/* ===========================================================================
 * CZIR62 — Photothèque de chantiers
 * ---------------------------------------------------------------------------
 * Photos réelles prises sur les chantiers de l'entreprise.
 *
 * REGLE : aucune commune, aucune date. Ces informations ne nous ont pas ete
 * transmises avec les photos ; les inventer contredirait tout le reste du
 * site. La legende decrit uniquement ce que l'image montre.
 *
 * Un chantier documente (commune, date, travaux) a sa place dans la
 * collection `realisations`, qui genere une page dediee. Cette phototheque
 * est autre chose : une preuve visuelle du travail, sans dossier.
 *
 * ORDRE : pense pour l'alternance — vue d'ensemble, detail, homme au travail,
 * materiau. Les huit premieres sont celles affichees sur l'accueil.
 *
 * NOMMAGE : <sujet-descriptif>-czir62.jpg. Le nom de fichier decrit ce que
 * l'image montre, suivi de la marque — c'est un signal lu par les moteurs,
 * et il reste vrai.
 *
 * AJOUTER UNE PHOTO : deposer le fichier dans public/images/chantiers/ et
 * ajouter une entree ci-dessous.
 * ========================================================================= */

export interface PhotoChantier {
  src: string;
  /** Description factuelle de ce que montre l'image */
  alt: string;
  /** Legende courte affichee sous la photo */
  legende: string;
  /**
   * Categorie de tri. Slug d'une prestation de src/data/services.ts, ou
   * 'entreprise' pour ce qui ne releve d'aucune prestation.
   * Le libelle du filtre est repris du registre des prestations : renommer
   * une prestation renomme automatiquement son filtre.
   */
  categorie: string;
}

export const chantiers: PhotoChantier[] = [
  {
    src: '/images/chantiers/maison-de-maitre-toiture-czir62.jpg',
    categorie: 'couverture',
    alt: "Grande maison dont la toiture vient d'être achevée, vue depuis le toit voisin",
    legende: 'Toiture achevée',
  },
  {
    src: '/images/chantiers/joint-debout-lucarne-czir62.jpg',
    categorie: 'couverture-metallique',
    alt: "Couverture métallique à joint debout posée sur une lucarne",
    legende: 'Joint debout',
  },
  {
    src: '/images/chantiers/vehicules-entreprise-czir62.jpg',
    categorie: 'entreprise',
    alt: "Camion benne et fourgon de l'entreprise stationnés devant un chantier",
    legende: 'Nos véhicules sur un chantier',
  },
  {
    src: '/images/chantiers/charpente-sur-terrasse-czir62.jpg',
    categorie: 'agrandissement-rehaussement',
    alt: "Charpente bois montée sur une toiture-terrasse en zinc",
    legende: 'Charpente sur terrasse',
  },
  {
    src: '/images/chantiers/etancheite-membrane-czir62.jpg',
    categorie: 'etancheite-toiture-terrasse',
    alt: "Deux couvreurs déroulant une membrane d'étanchéité sur une toiture-terrasse",
    legende: 'Étanchéité de terrasse',
  },
  {
    src: '/images/chantiers/pose-de-tuiles-czir62.jpg',
    categorie: 'couverture',
    alt: "Couvreur posant des tuiles sur un rampant",
    legende: 'Pose de la couverture',
  },
  {
    src: '/images/chantiers/couverture-deposee-czir62.jpg',
    categorie: 'renovation-toiture',
    alt: "Maison dont la couverture a été entièrement déposée, charpente apparente",
    legende: 'Couverture déposée',
  },
  {
    src: '/images/chantiers/velux-vue-interieure-czir62.jpg',
    categorie: 'pose-velux',
    alt: "Deux fenêtres de toit posées, vues depuis la pièce aménagée",
    legende: 'Le résultat vu de l’intérieur',
  },
  {
    src: '/images/chantiers/bardage-metallique-czir62.jpg',
    categorie: 'bardage',
    alt: "Pose d'un bardage métallique, liteaunage et pare-pluie visibles",
    legende: 'Bardage métallique',
  },
  {
    src: '/images/chantiers/faitage-metallique-czir62.jpg',
    categorie: 'zinguerie',
    alt: "Faîtage métallique posé sur une toiture en tuiles neuves",
    legende: 'Faîtage métallique',
  },
  {
    src: '/images/chantiers/aretier-ardoise-czir62.jpg',
    categorie: 'couverture',
    alt: "Arêtier d'une toiture en ardoise en cours de couverture",
    legende: 'Arêtier en ardoise',
  },
  {
    src: '/images/chantiers/croupe-liteaunage-czir62.jpg',
    categorie: 'charpente',
    alt: "Charpente, écran sous-toiture et liteaunage sur une croupe",
    legende: 'Croupe et liteaunage',
  },
  {
    src: '/images/chantiers/charpente-immeuble-czir62.jpg',
    categorie: 'charpente',
    alt: "Charpente neuve montée sur un immeuble en centre urbain",
    legende: 'Charpente en ville',
  },
  {
    src: '/images/chantiers/verriere-zinc-czir62.jpg',
    categorie: 'couverture-metallique',
    alt: "Pose d'une verrière avec habillage zinc sur une toiture",
    legende: 'Verrière et zinc',
  },
  {
    src: '/images/chantiers/ossature-extension-czir62.jpg',
    categorie: 'ossature-bois',
    alt: "Ossature bois d'une extension en cours de montage",
    legende: 'Ossature d’extension',
  },
  {
    src: '/images/chantiers/echafaudage-ardoise-czir62.jpg',
    categorie: 'renovation-toiture',
    alt: "Maison sous échafaudage, toiture en ardoise en cours de reprise",
    legende: 'Chantier sous échafaudage',
  },
  {
    src: '/images/chantiers/toiture-ardoise-terminee-czir62.jpg',
    categorie: 'couverture',
    alt: "Toiture en ardoise terminée, fenêtre de toit et arêtier métallique",
    legende: 'Ardoise terminée',
  },
  {
    src: '/images/chantiers/tuiles-et-velux-czir62.jpg',
    categorie: 'pose-velux',
    alt: "Toiture en tuiles terminée avec fenêtres de toit intégrées",
    legende: 'Tuiles et fenêtres de toit',
  },
  {
    src: '/images/chantiers/charpente-neuve-czir62.jpg',
    categorie: 'charpente',
    alt: "Maison en construction, charpente bois apparente",
    legende: 'Charpente neuve',
  },
  {
    src: '/images/chantiers/mise-hors-deau-czir62.jpg',
    categorie: 'couverture',
    alt: "Maison en construction dont la toiture vient d'être achevée",
    legende: 'Mise hors d’eau',
  },
  {
    src: '/images/chantiers/liteaunage-en-cours-czir62.jpg',
    categorie: 'couverture',
    alt: "Couvreur posant le liteaunage sur un écran sous-toiture",
    legende: 'Liteaunage en cours',
  },
  {
    src: '/images/chantiers/ecran-et-liteaux-czir62.jpg',
    categorie: 'couverture',
    alt: "Deux couvreurs fixant les liteaux sur un écran sous-toiture",
    legende: 'Écran et liteaux',
  },
  {
    src: '/images/chantiers/deux-couvreurs-czir62.jpg',
    categorie: 'reparation-toiture',
    alt: "Deux couvreurs intervenant sur une toiture en tuiles",
    legende: 'Intervention à deux',
  },
  {
    src: '/images/chantiers/terrasse-terminee-czir62.jpg',
    categorie: 'etancheite-toiture-terrasse',
    alt: "Toiture-terrasse terminée, deux revêtements d'étanchéité raccordés",
    legende: 'Terrasse terminée',
  },
  {
    src: '/images/chantiers/lanterneau-terrasse-czir62.jpg',
    categorie: 'etancheite-toiture-terrasse',
    alt: "Lanterneau vitré posé sur une toiture-terrasse, habillage métallique",
    legende: 'Lanterneau de terrasse',
  },
  {
    src: '/images/chantiers/quadrillage-support-czir62.jpg',
    categorie: 'couverture',
    alt: "Détail du quadrillage formé par le contre-lattage et les liteaux",
    legende: 'Le quadrillage du support',
  },
  {
    src: '/images/chantiers/dependance-toiture-czir62.jpg',
    categorie: 'renovation-toiture',
    alt: "Dépendance ancienne dont la toiture a été refaite",
    legende: 'Dépendance rénovée',
  },
  {
    src: '/images/chantiers/finitions-interieures-czir62.jpg',
    categorie: 'pose-velux',
    alt: "Pose des finitions intérieures sous une toiture aménagée",
    legende: 'Finitions intérieures',
  },
  {
    src: '/images/chantiers/pose-isolant-czir62.jpg',
    categorie: 'etancheite-toiture-terrasse',
    alt: "Pose de panneaux isolants en toiture avant l'étanchéité",
    legende: 'Pose de l’isolant',
  },
  {
    src: '/images/chantiers/toiture-quatre-pans-czir62.jpg',
    categorie: 'couverture',
    alt: "Maison terminée avec toiture à quatre pans et façade en brique",
    legende: 'Toiture quatre pans',
  },
];

/* ------------------------------------------------------------- accesseurs */

/** Categories reellement presentes, dans l'ordre du registre des prestations */
export function categoriesPresentes(): string[] {
  const vues = new Set(chantiers.map((c) => c.categorie));
  return [...vues];
}

export function chantiersDe(categorie: string): PhotoChantier[] {
  return chantiers.filter((c) => c.categorie === categorie);
}
