/* ===========================================================================
 * CZIR62 — Collections de contenu
 * ---------------------------------------------------------------------------
 * Les realisations sont le principal levier de profondeur SEO du site :
 * chaque chantier documente cree une page unique, reliee automatiquement a
 * sa prestation, a sa commune et aux chantiers similaires.
 *
 * Ajouter un chantier = deposer un fichier .md dans src/content/realisations/.
 * Aucun code a modifier : la page, le fil d'ariane, les donnees structurees,
 * les liens depuis la page service et depuis la page ville sont generes.
 * ========================================================================= */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const photo = z.object({
  /** Chemin sous /public (ex. « /images/realisations/xxx.jpg »). Vide = emplacement reserve. */
  src: z.string().optional(),
  /** Description reelle de l'image — obligatoire (accessibilite + SEO image) */
  alt: z.string(),
  /** Legende affichee sous la photo */
  legende: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    /** Titre editorial : « Rénovation complète de toiture à Béthune » */
    titre: z.string(),
    /** Slug de commune — doit exister dans src/data/villes.ts */
    ville: z.string(),
    /** Slug de prestation principale — doit exister dans src/data/services.ts */
    service: z.string(),
    /** Prestations secondaires reellement realisees sur ce chantier */
    servicesSecondaires: z.array(z.string()).default([]),
    /** Date de fin de chantier */
    date: z.coerce.date(),
    /** Resume affiche sur les cartes — 1 a 2 phrases concretes */
    resume: z.string(),
    /** Etat initial constate */
    probleme: z.string(),
    /** Travaux effectivement realises, dans l'ordre */
    travaux: z.array(z.string()),
    /** Materiaux reellement mis en oeuvre. Ne rien inventer. */
    materiaux: z.array(z.string()).default([]),
    /** Duree du chantier — a renseigner UNIQUEMENT si confirmee */
    duree: z.string().optional(),
    /** Surface approximative en m2 — uniquement si confirmee */
    surface: z.number().optional(),
    /** Type de bien */
    typeBien: z.enum(['maison individuelle', 'maison de ville', 'dépendance', 'bâtiment professionnel', 'immeuble']).optional(),
    /** Photo principale (carte + hero) */
    photo: photo.optional(),
    /** Photos complementaires */
    photos: z.array(photo).default([]),
    /** Couple avant / apres */
    avantApres: z
      .object({ avant: photo, apres: photo })
      .optional(),
    /** Mise en avant sur la page d'accueil */
    featured: z.boolean().default(false),
    /**
     * true = fiche d'exemple ou chantier non publiable.
     * Les brouillons sont visibles en developpement, JAMAIS en production.
     */
    draft: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { realisations };
