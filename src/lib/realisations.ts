/* ===========================================================================
 * CZIR62 — Acces aux realisations
 * ---------------------------------------------------------------------------
 * Point d'entree unique pour interroger la collection. Toutes les pages
 * passent par ici, ce qui garantit deux choses :
 *   - les brouillons (draft: true) ne sortent JAMAIS en production ;
 *   - le tri est toujours le meme (du chantier le plus recent au plus ancien).
 * ========================================================================= */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Realisation = CollectionEntry<'realisations'>;

/** Toutes les realisations publiables, de la plus recente a la plus ancienne */
export async function getRealisations(): Promise<Realisation[]> {
  const all = await getCollection('realisations', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function realisationsForService(slug: string, limit?: number): Promise<Realisation[]> {
  const all = await getRealisations();
  const matching = all.filter(
    (r) => r.data.service === slug || r.data.servicesSecondaires.includes(slug),
  );
  return limit ? matching.slice(0, limit) : matching;
}

export async function realisationsForVille(slug: string, limit?: number): Promise<Realisation[]> {
  const all = await getRealisations();
  const matching = all.filter((r) => r.data.ville === slug);
  return limit ? matching.slice(0, limit) : matching;
}

/**
 * Chantiers similaires : meme prestation d'abord, puis meme commune.
 * On ne complete jamais avec des chantiers sans rapport pour « remplir ».
 */
export async function realisationsSimilaires(current: Realisation, limit = 3): Promise<Realisation[]> {
  const all = (await getRealisations()).filter((r) => r.id !== current.id);
  const sameService = all.filter((r) => r.data.service === current.data.service);
  const sameVille = all.filter(
    (r) => r.data.ville === current.data.ville && !sameService.includes(r),
  );
  return [...sameService, ...sameVille].slice(0, limit);
}

/** Compteurs pour les pages d'index et les blocs de preuve */
export async function realisationsStats() {
  const all = await getRealisations();
  const villes = new Set(all.map((r) => r.data.ville));
  const services = new Set(all.map((r) => r.data.service));
  return { total: all.length, villes: villes.size, services: services.size };
}

export const formatDateFr = (d: Date): string =>
  new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(d);
