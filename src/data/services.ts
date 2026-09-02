/* ===========================================================================
 * CZIR62 — Registre des prestations
 * ---------------------------------------------------------------------------
 * Ce fichier porte UNIQUEMENT les metadonnees et les RELATIONS :
 * intitules, meta, intention de recherche, maillage interne, villes liees.
 *
 * Il ne porte volontairement AUCUN texte editorial de page. Chaque page
 * service est ecrite a la main dans src/pages/<slug>/index.astro avec sa
 * propre structure : c'est la garantie qu'aucune page n'est un clone d'une
 * autre avec le mot « couverture » remplace par « zinguerie ».
 *
 * Ajouter une prestation = ajouter une entree ici + creer sa page.
 * Le menu, le footer, le plan du site, le sitemap et les blocs « prestations
 * liees » se mettent a jour automatiquement.
 * ========================================================================= */

import type { IconName } from '@/lib/icons';

/** Intention dominante — determine le ton, la structure et les CTA de la page */
export type Intent =
  | 'urgence'      // le visiteur a un probleme maintenant
  | 'projet'       // le visiteur prepare un chantier consequent
  | 'prestation'   // le visiteur cherche un professionnel pour un metier
  | 'produit'      // le visiteur cherche la pose d'un produit precis
  | 'construction'; // le visiteur a un projet de construction / extension

export interface Service {
  slug: string;
  /** URL canonique, toujours avec slash final (trailingSlash: 'always') */
  url: string;
  /** Nom court : cartes, fil d'ariane, menus */
  name: string;
  /** Libelle du menu principal si different du nom */
  navLabel?: string;
  /** Titre de la balise <title> — 60 caracteres environ */
  metaTitle: string;
  /** Meta description — 150 a 160 caracteres, unique, incitative */
  metaDescription: string;
  /** Phrase de carte : concrete, jamais promotionnelle */
  cardText: string;
  /** Intention de recherche dominante (documentee pour l'equipe editoriale) */
  intent: Intent;
  /** Requetes visees en priorite — sert de garde-fou editorial, jamais de meta keywords */
  targetQueries: string[];
  /** Famille metier — sert au regroupement dans le menu et le footer */
  family: 'toiture' | 'structure' | 'enveloppe';
  icon: IconName;
  /** Type de service declare dans le JSON-LD Service */
  serviceType: string;
  /** Prestations complementaires — maillage interne editorial, pas alphabetique */
  related: string[];
  /** Communes ou cette prestation est la plus pertinente (slugs de villes) */
  cities: string[];
  /** Ordre d'affichage dans les listes */
  order: number;
  /** Mise en avant sur la page d'accueil */
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: 'couverture',
    url: '/couverture/',
    name: 'Couverture',
    metaTitle: 'Travaux de couverture à Béthune — Tuiles, ardoises | CZIR62',
    metaDescription:
      "Pose et remplacement de tuiles, ardoises, faîtage et écran sous-toiture à Béthune. Entreprise de couverture avec un local en ville. Devis gratuit.",
    cardText:
      "Pose, remplacement et entretien de la couverture : tuiles mécaniques, ardoises, faîtage, écran sous-toiture.",
    intent: 'prestation',
    // « couvreur béthune » appartient a l'accueil : le declarer ici recreerait
    // la cannibalisation que l'on vient de lever.
    targetQueries: ['entreprise de couverture béthune', 'pose de tuiles béthune', 'couverture ardoise pas-de-calais', 'couverture 62400'],
    family: 'toiture',
    icon: 'roof',
    serviceType: 'Travaux de couverture',
    related: ['renovation-toiture', 'couverture-metallique', 'zinguerie', 'charpente'],
    cities: ['bethune', 'beuvry', 'noeux-les-mines', 'bruay-la-buissiere', 'barlin'],
    order: 1,
    featured: true,
  },
  {
    slug: 'renovation-toiture',
    url: '/renovation-toiture/',
    name: 'Rénovation de toiture',
    navLabel: 'Rénovation de toiture',
    metaTitle: 'Rénovation de toiture à Béthune — Devis | CZIR62',
    metaDescription:
      "Rénovation complète ou partielle de toiture à Béthune : dépose, écran sous-toiture, couverture neuve, zinguerie. Évaluation de toiture sur place.",
    cardText:
      "Reprise complète ou partielle : dépose de l'ancienne couverture, écran sous-toiture, couverture neuve, zinguerie associée.",
    intent: 'projet',
    targetQueries: ['rénovation toiture béthune', 'refaire sa toiture béthune', 'prix rénovation toiture pas-de-calais'],
    family: 'toiture',
    icon: 'renovation',
    serviceType: 'Rénovation de toiture',
    related: ['couverture', 'charpente', 'zinguerie', 'agrandissement-rehaussement'],
    cities: ['bethune', 'bruay-la-buissiere', 'auchel', 'lievin', 'lens'],
    order: 2,
    featured: true,
  },
  {
    slug: 'reparation-toiture',
    url: '/reparation-toiture/',
    name: 'Réparation de toiture',
    metaTitle: 'Réparation de toiture à Béthune — Intervention | CZIR62',
    metaDescription:
      "Tuiles cassées, faîtage descellé, solin fissuré : réparation ciblée de toiture à Béthune et alentours. Diagnostic sur place avant travaux.",
    cardText:
      "Intervention ciblée sur un désordre localisé : tuiles déplacées, faîtage descellé, solin fissuré, rive abîmée.",
    intent: 'urgence',
    targetQueries: ['réparation toiture béthune', 'réparer tuile cassée béthune', 'couvreur urgence béthune'],
    family: 'toiture',
    icon: 'repair',
    serviceType: 'Réparation de toiture',
    related: ['fuite-toiture', 'couverture', 'zinguerie', 'renovation-toiture'],
    cities: ['bethune', 'beuvry', 'bully-les-mines', 'noeux-les-mines', 'lievin'],
    order: 3,
    featured: true,
  },
  {
    slug: 'fuite-toiture',
    url: '/fuite-toiture/',
    name: 'Fuite de toiture',
    navLabel: 'Fuite & infiltration',
    metaTitle: 'Fuite de toiture à Béthune — Recherche et réparation',
    metaDescription:
      "Auréole au plafond, infiltration après la pluie ? Recherche de fuite et réparation d'étanchéité à Béthune. Décrivez la situation, on vous rappelle.",
    cardText:
      "Recherche du point d'entrée réel de l'eau puis réparation : raccords, solins, noues, faîtage, abords de Velux.",
    intent: 'urgence',
    targetQueries: ['fuite toiture béthune', 'infiltration toiture béthune', 'recherche de fuite toiture pas-de-calais'],
    family: 'toiture',
    icon: 'leak',
    serviceType: 'Recherche et réparation de fuite de toiture',
    related: ['reparation-toiture', 'zinguerie', 'etancheite-toiture-terrasse', 'renovation-toiture'],
    cities: ['bethune', 'beuvry', 'barlin', 'noeux-les-mines', 'lens'],
    order: 4,
    featured: true,
  },
  {
    slug: 'demoussage-toiture',
    url: '/demoussage-toiture/',
    name: 'Démoussage & entretien',
    navLabel: 'Démoussage & entretien',
    metaTitle: 'Démoussage de toiture à Béthune — Nettoyage | CZIR62',
    metaDescription:
      "Démoussage de toiture à Béthune : retrait mécanique des mousses, contrôle de la couverture et des gouttières. Ce qu'il règle — et ce qu'il ne règle pas.",
    cardText:
      "Retrait des mousses et des lichens sur une couverture encore saine, contrôle des points faibles pendant l'intervention.",
    intent: 'prestation',
    targetQueries: [
      'démoussage toiture béthune',
      'nettoyage toiture béthune',
      'entretien toiture béthune',
      'démoussage toiture prix',
      'enlever mousse toiture',
    ],
    family: 'toiture',
    icon: 'sparkle',
    serviceType: 'Démoussage et entretien de toiture',
    related: ['couverture', 'zinguerie', 'reparation-toiture', 'renovation-toiture'],
    cities: ['bethune', 'beuvry', 'noeux-les-mines', 'bruay-la-buissiere', 'barlin'],
    order: 5,
    featured: true,
  },
  {
    slug: 'zinguerie',
    url: '/zinguerie/',
    name: 'Zinguerie & gouttières',
    navLabel: 'Zinguerie & gouttières',
    metaTitle: 'Zinguerie et gouttières à Béthune — Zingueur | CZIR62',
    metaDescription:
      "Gouttières, chéneaux, noues, solins et habillages en zinc à Béthune. Remplacement d'éléments corrodés et reprise des raccords d'étanchéité.",
    cardText:
      "Gouttières, descentes, chéneaux, noues, solins et habillages : tout ce qui conduit l'eau hors de la toiture.",
    intent: 'prestation',
    targetQueries: ['zinguerie béthune', 'gouttière béthune', 'zingueur pas-de-calais', 'remplacement gouttière béthune'],
    family: 'toiture',
    icon: 'gutter',
    serviceType: 'Zinguerie et évacuation des eaux pluviales',
    related: ['fuite-toiture', 'couverture-metallique', 'couverture', 'etancheite-toiture-terrasse'],
    cities: ['bethune', 'beuvry', 'lillers', 'bruay-la-buissiere', 'bully-les-mines'],
    order: 6,
    featured: true,
  },
  {
    slug: 'charpente',
    url: '/charpente/',
    name: 'Charpente',
    metaTitle: 'Charpentier à Béthune — Charpente bois et reprise | CZIR62',
    metaDescription:
      "Charpente traditionnelle et fermettes à Béthune : reprise de pièces fragilisées, renforcement, modification pour aménagement de combles.",
    cardText:
      "Structure porteuse : reprise de pièces fragilisées, renforcement, modification dans le cadre d'un projet.",
    intent: 'prestation',
    targetQueries: ['charpentier béthune', 'charpente béthune', 'réparation charpente pas-de-calais'],
    family: 'structure',
    icon: 'truss',
    serviceType: 'Travaux de charpente',
    related: ['renovation-toiture', 'ossature-bois', 'agrandissement-rehaussement', 'couverture'],
    cities: ['bethune', 'lillers', 'auchel', 'bruay-la-buissiere', 'barlin'],
    order: 9,
  },
  {
    slug: 'pose-velux',
    url: '/pose-velux/',
    name: 'Pose de Velux',
    navLabel: 'Pose de Velux',
    metaTitle: 'Pose de Velux à Béthune — Fenêtre de toit | CZIR62',
    metaDescription:
      "Installation, remplacement et réparation de fenêtres de toit à Béthune. Raccord d'étanchéité, adaptation de la charpente, finitions intérieures.",
    cardText:
      "Création d'ouverture, remplacement d'un modèle ancien, reprise d'un raccord d'étanchéité qui laisse passer l'eau.",
    intent: 'produit',
    targetQueries: ['pose velux béthune', 'installateur velux pas-de-calais', 'fenêtre de toit béthune'],
    family: 'toiture',
    icon: 'velux',
    serviceType: 'Pose de fenêtre de toit',
    related: ['fuite-toiture', 'charpente', 'couverture', 'renovation-toiture'],
    cities: ['bethune', 'beuvry', 'lievin', 'noeux-les-mines', 'lens'],
    order: 10,
  },
  {
    slug: 'bardage',
    url: '/bardage/',
    name: 'Bardage',
    metaTitle: 'Pose de bardage à Béthune — Façade et pignon | CZIR62',
    metaDescription:
      "Pose de bardage bois, composite ou métallique à Béthune : habillage de pignon, protection de façade, finition d'agrandissement.",
    cardText:
      "Habillage de pignon ou de façade : ossature, lame d'air ventilée, pose du parement et traitement des points singuliers.",
    intent: 'projet',
    targetQueries: ['bardage béthune', 'pose bardage bois pas-de-calais', 'bardage pignon béthune'],
    family: 'enveloppe',
    icon: 'cladding',
    serviceType: 'Pose de bardage',
    related: ['ossature-bois', 'couverture-metallique', 'agrandissement-rehaussement', 'charpente'],
    cities: ['bethune', 'bruay-la-buissiere', 'lillers', 'auchel', 'barlin'],
    order: 11,
  },
  {
    slug: 'ossature-bois',
    url: '/ossature-bois/',
    name: 'Ossature bois',
    metaTitle: 'Construction ossature bois à Béthune | CZIR62',
    metaDescription:
      "Ossature bois à Béthune : extension, annexe, garage, abri. Montage de la structure, contreventement, mise hors d'eau et hors d'air.",
    cardText:
      "Structure murale porteuse en bois pour une extension, une annexe ou un garage : montage, contreventement, mise hors d'eau.",
    intent: 'construction',
    targetQueries: ['ossature bois béthune', 'extension ossature bois pas-de-calais', 'construction bois béthune'],
    family: 'structure',
    icon: 'frame',
    serviceType: 'Construction à ossature bois',
    related: ['agrandissement-rehaussement', 'bardage', 'charpente', 'couverture'],
    cities: ['bethune', 'beuvry', 'lillers', 'bruay-la-buissiere', 'auchel'],
    order: 12,
  },
  {
    slug: 'agrandissement-rehaussement',
    url: '/agrandissement-rehaussement/',
    name: 'Agrandissement & réhaussement',
    navLabel: 'Agrandissement / réhaussement',
    metaTitle: 'Agrandissement et réhaussement à Béthune | CZIR62',
    metaDescription:
      "Extension, surélévation, réhaussement de toiture à Béthune : étude de faisabilité, structure, raccordement à l'existant et mise hors d'eau.",
    cardText:
      "Gagner de la surface : extension de plain-pied, surélévation, ou réhaussement pour rendre des combles habitables.",
    intent: 'construction',
    targetQueries: ['agrandissement maison béthune', 'surélévation toiture pas-de-calais', 'réhaussement toiture béthune'],
    family: 'structure',
    icon: 'extension',
    serviceType: 'Agrandissement et surélévation',
    related: ['ossature-bois', 'charpente', 'bardage', 'renovation-toiture'],
    cities: ['bethune', 'beuvry', 'lievin', 'bruay-la-buissiere', 'lens'],
    order: 13,
  },
  {
    slug: 'etancheite-toiture-terrasse',
    url: '/etancheite-toiture-terrasse/',
    name: 'Étanchéité de toiture-terrasse',
    navLabel: 'Étanchéité toiture-terrasse',
    metaTitle: 'Étanchéité de toiture-terrasse à Béthune | CZIR62',
    metaDescription:
      "Étanchéité de toiture-terrasse à Béthune : membrane bitume, EPDM, relevés d'acrotère, évacuations. Reprise ponctuelle ou réfection complète du complexe.",
    cardText:
      "Toit plat, garage, extension : membrane, relevés d'acrotère, évacuations. Sans pente, tout repose sur l'étanchéité.",
    intent: 'prestation',
    targetQueries: ['étanchéité toiture terrasse béthune', 'toit plat qui fuit pas-de-calais', 'refaire étanchéité terrasse béthune'],
    family: 'toiture',
    icon: 'flat',
    serviceType: "Étanchéité de toiture-terrasse",
    related: ['fuite-toiture', 'couverture-metallique', 'renovation-toiture', 'zinguerie'],
    cities: ['bethune', 'lens', 'lievin', 'beuvry', 'bruay-la-buissiere'],
    order: 7,
  },
  {
    slug: 'couverture-metallique',
    url: '/couverture-metallique/',
    name: 'Couverture métallique',
    navLabel: 'Couverture métallique',
    metaTitle: 'Couverture métallique à Béthune — Bac acier, zinc | CZIR62',
    metaDescription:
      "Bac acier, joint debout et zinc à Béthune : faibles pentes, annexes, bâtiments professionnels. Condensation et dilatation traitées dès la conception.",
    cardText:
      "Bac acier ou joint debout : la solution des faibles pentes, des grandes portées et des volumes contemporains.",
    intent: 'prestation',
    targetQueries: ['couverture bac acier béthune', 'toiture métallique pas-de-calais', 'joint debout béthune'],
    family: 'toiture',
    icon: 'seam',
    serviceType: 'Couverture métallique',
    related: ['couverture', 'zinguerie', 'etancheite-toiture-terrasse', 'bardage'],
    cities: ['bethune', 'lillers', 'bruay-la-buissiere', 'auchel', 'lens'],
    order: 8,
  },
];


/* -------------------------------------------------------------------------
 * Accesseurs
 * ---------------------------------------------------------------------- */

export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export function getService(slug: string): Service {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`[services] Prestation inconnue : « ${slug} ». Vérifier src/data/services.ts`);
  return found;
}

/** Prestations liees, dans l'ordre editorial defini sur la prestation source */
export function getRelated(slug: string, limit = 4): Service[] {
  return getService(slug)
    .related.slice(0, limit)
    .map(getService);
}

export function getFeatured(): Service[] {
  return servicesByOrder.filter((s) => s.featured);
}

export const serviceFamilies = [
  { key: 'toiture', label: 'Toiture' },
  { key: 'structure', label: 'Structure & bois' },
  { key: 'enveloppe', label: 'Enveloppe extérieure' },
] as const;

export function servicesOfFamily(family: Service['family']): Service[] {
  return servicesByOrder.filter((s) => s.family === family);
}

/* -------------------------------------------------------------------------
 * Sous-prestations : requetes reelles qui ne meritent PAS leur propre page.
 * Elles sont traitees comme des sections ancrees dans la page parente.
 * Regle appliquee : une URL n'existe que si elle repond a une intention
 * distincte. « Nettoyage de gouttiere » ne merite pas une page ; il merite
 * une section serieuse dans /zinguerie/.
 * ---------------------------------------------------------------------- */
export interface SubService {
  label: string;
  /** URL complete avec ancre */
  url: string;
  parent: string;
  description: string;
}

export const subServices: SubService[] = [
  {
    label: 'Gouttières',
    url: '/zinguerie/#gouttieres',
    parent: 'zinguerie',
    description: "Remplacement, prolongement et remise en pente des gouttières et descentes.",
  },
  {
    label: 'Entretien de toiture',
    url: '/demoussage-toiture/',
    parent: 'demoussage-toiture',
    description: "Contrôle périodique, nettoyage des mousses et reprise des points faibles avant qu'ils ne fuient.",
  },
  {
    label: 'Recherche de fuite',
    url: '/fuite-toiture/#recherche',
    parent: 'fuite-toiture',
    description: "Identification du point d'entrée réel de l'eau, qui se trouve rarement au-dessus de la tache.",
  },
  {
    label: 'Démoussage',
    url: '/demoussage-toiture/',
    parent: 'demoussage-toiture',
    description: "Retrait des mousses sur une couverture encore saine, sans agresser la tuile.",
  },
];
