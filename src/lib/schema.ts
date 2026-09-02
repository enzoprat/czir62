/* ===========================================================================
 * CZIR62 — Donnees structurees (JSON-LD)
 * ---------------------------------------------------------------------------
 * Objectif : que Google puisse repondre sans ambiguite a cinq questions —
 * qui est CZIR62, ou l'entreprise se trouve, ce qu'elle fait, ou elle
 * intervient, et ce qu'elle a deja realise.
 *
 * DEUX REGLES STRICTES
 *  1. Aucune propriete n'est emise si la donnee n'est pas confirmee.
 *     Une adresse partielle ou un horaire invente degradent la confiance et
 *     peuvent entrainer une penalite manuelle. `prune()` supprime tout ce qui
 *     est vide avant serialisation.
 *  2. `aggregateRating` n'est emis QUE si les avis reels ont ete saisis et
 *     verifies (avisSource.verifie === true). Jamais de note fabriquee.
 *
 * Le graphe est relie par des @id stables : une seule entite « entreprise »
 * pour tout le site, referencee par chaque page.
 * ========================================================================= */

import { site, nap, google, socials, hasAddress, hasGeo, hasPhone, hasHours, addressOneLine } from '@/config/site';
import { services, servicesByOrder, type Service } from '@/data/services';
import { villes, communesDesservies } from '@/data/villes';
import { avis, avisSource, hasNoteVerifiee } from '@/data/avis';

type Json = Record<string, unknown>;

/** Supprime recursivement null, undefined, chaines vides et tableaux vides */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined && v !== null && v !== '');
    return (arr.length ? arr : undefined) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Json = {};
    for (const [k, v] of Object.entries(value as Json)) {
      const cleaned = prune(v);
      if (cleaned !== undefined && cleaned !== null && cleaned !== '') out[k] = cleaned;
    }
    return (Object.keys(out).length ? out : undefined) as unknown as T;
  }
  return value;
}

export const ID = {
  org: `${site.url}/#entreprise`,
  website: `${site.url}/#site`,
  place: `${site.url}/#local`,
  page: (path: string) => `${site.url}${path}#page`,
} as const;

/* ------------------------------------------------------------------ zones */

/** Communes servies, declarees comme entites City */
function areaServed(): Json[] {
  return [
    ...villes.map((v) => ({
      '@type': 'City',
      name: v.name,
      address: { '@type': 'PostalAddress', postalCode: v.postalCode, addressCountry: 'FR' },
    })),
    ...communesDesservies.map((c) => ({
      '@type': 'City',
      name: c.name,
      address: { '@type': 'PostalAddress', postalCode: c.postalCode, addressCountry: 'FR' },
    })),
  ];
}

function postalAddress(): Json | undefined {
  if (!hasAddress()) return undefined;
  return {
    '@type': 'PostalAddress',
    streetAddress: nap.address.street,
    postalCode: nap.address.postalCode,
    addressLocality: nap.address.city,
    addressRegion: nap.address.region,
    addressCountry: nap.address.countryCode,
  };
}

function openingHours(): Json[] | undefined {
  if (!hasHours()) return undefined;
  return nap.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

function aggregateRating(): Json | undefined {
  if (!hasNoteVerifiee()) return undefined;
  return {
    '@type': 'AggregateRating',
    ratingValue: avisSource.note,
    reviewCount: avisSource.total,
    bestRating: 5,
    worstRating: 1,
  };
}

function reviews(): Json[] | undefined {
  if (!hasNoteVerifiee() || avis.length === 0) return undefined;
  return avis.slice(0, 5).map((a) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: a.auteur },
    reviewRating: { '@type': 'Rating', ratingValue: a.note, bestRating: 5, worstRating: 1 },
    reviewBody: a.texte,
    datePublished: /^\d{4}-\d{2}-\d{2}/.test(a.date) ? a.date : undefined,
  }));
}

/* ----------------------------------------------------------- entreprise */

/**
 * Entite principale : RoofingContractor est le type le plus precis pour une
 * entreprise de couverture. Il herite de LocalBusiness, ce qui permet a Google
 * de rattacher le site a la fiche Google Business Profile.
 */
export function organizationSchema(): Json {
  return prune({
    '@type': ['RoofingContractor', 'HomeAndConstructionBusiness'],
    '@id': ID.org,
    name: nap.name,
    legalName: site.legalName,
    alternateName: site.brand,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}#logo`,
      url: `${site.url}/apple-touch-icon.png`,
      caption: site.brand,
    },
    // Photo de reference de l'entreprise. A remplacer par la devanture des
    // qu'elle sera fournie : un local physique est le signal le plus fort.
    image: `${site.url}/images/accueil/couvreur-bethune-czir62.jpg`,
    // Derivee du registre : ajouter une prestation met la description a jour,
    // il n'y a pas de liste a maintenir en double.
    description: `Entreprise générale de couverture installée à ${nap.address.city} : ${servicesByOrder
      .map((s) => s.name.toLowerCase())
      .join(', ')}.`,
    telephone: nap.phoneE164 ?? undefined,
    email: nap.email ?? undefined,
    address: postalAddress(),
    geo: hasGeo()
      ? { '@type': 'GeoCoordinates', latitude: nap.geo.lat, longitude: nap.geo.lng }
      : undefined,
    hasMap: google.profileUrl ?? undefined,
    openingHoursSpecification: openingHours(),
    foundingDate: nap.foundingYear ? String(nap.foundingYear) : undefined,
    vatID: undefined,
    taxID: nap.siret ?? undefined,
    areaServed: areaServed(),
    knowsLanguage: 'fr-FR',
    currenciesAccepted: 'EUR',
    sameAs: [google.profileUrl, ...socials.map((s) => s.url)].filter(Boolean),
    aggregateRating: aggregateRating(),
    review: reviews(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations de couverture et de charpente',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${site.url}${s.url}#service`,
          name: s.name,
          serviceType: s.serviceType,
          url: `${site.url}${s.url}`,
        },
      })),
    },
  }) as Json;
}

export function websiteSchema(): Json {
  return prune({
    '@type': 'WebSite',
    '@id': ID.website,
    url: site.url,
    name: site.brand,
    inLanguage: 'fr-FR',
    publisher: { '@id': ID.org },
  }) as Json;
}

/* ------------------------------------------------------------ fil d'ariane */

export interface Crumb {
  name: string;
  /** Chemin relatif commencant par / — omis pour le dernier element */
  url?: string;
}

/**
 * Le composant <Breadcrumbs /> affiche toujours « Accueil » en premier :
 * le balisage doit decrire exactement le meme chemin, sans quoi Google
 * constate une divergence entre le contenu visible et les donnees declarees.
 * L'element racine est donc ajoute ici, une fois pour toutes.
 */
export function breadcrumbSchema(crumbs: Crumb[]): Json {
  const chemin: Crumb[] = [{ name: 'Accueil', url: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: chemin.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: `${site.url}${c.url}` } : {}),
    })),
  };
}

/* ---------------------------------------------------------------- service */

export function serviceSchema(service: Service, description?: string): Json {
  return prune({
    '@type': 'Service',
    '@id': `${site.url}${service.url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    url: `${site.url}${service.url}`,
    description: description ?? service.metaDescription,
    provider: { '@id': ID.org },
    areaServed: areaServed(),
    // Aucun prix n'est declare : annoncer un tarif non pratique est trompeur.
    audience: { '@type': 'Audience', audienceType: 'Particuliers et professionnels' },
  }) as Json;
}

/**
 * Catalogue de prestations sur la page hub. Decrit l'ordre reellement affiche :
 * Google lit la liste comme la table des matieres du site, ce qui aide a
 * distinguer une page de rubrique d'une enieme page de service.
 */
export function serviceListSchema(): Json {
  return {
    '@type': 'ItemList',
    '@id': `${site.url}/prestations/#liste`,
    name: 'Prestations de CZIR62',
    numberOfItems: servicesByOrder.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: servicesByOrder.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.url}${s.url}`,
      name: s.name,
    })),
  };
}

/* -------------------------------------------------------------------- FAQ */

/**
 * FAQPage — n'est emis que si les questions sont REELLEMENT visibles sur la
 * page, condition explicite des regles de Google. Le composant FAQ appelle
 * cette fonction avec les memes donnees que celles qu'il affiche.
 */
export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>): Json | null {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

/* ------------------------------------------------------------------- page */

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): Json {
  return prune({
    '@type': 'WebPage',
    '@id': ID.page(opts.path),
    url: `${site.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    primaryImageOfPage: opts.image ? { '@type': 'ImageObject', url: `${site.url}${opts.image}` } : undefined,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'fr-FR',
  }) as Json;
}

/* ------------------------------------------------------------------ local */

/**
 * Page « implantation » : declare le local physique comme un Place distinct,
 * avec la photo de devanture. C'est un signal de presence reelle.
 */
export function placeSchema(photo?: string): Json | undefined {
  if (!hasAddress() && !hasGeo()) return undefined;
  return prune({
    '@type': 'Place',
    '@id': ID.place,
    name: `${site.brand} — ${nap.address.city}`,
    address: postalAddress(),
    geo: hasGeo() ? { '@type': 'GeoCoordinates', latitude: nap.geo.lat, longitude: nap.geo.lng } : undefined,
    photo: photo ? { '@type': 'ImageObject', url: `${site.url}${photo}`, caption: `Devanture ${site.brand} à ${nap.address.city}` } : undefined,
    hasMap: google.directionsUrl ?? undefined,
    telephone: hasPhone() ? nap.phoneE164 : undefined,
  }) as Json;
}

/* -------------------------------------------------------------- assemblage */

/** Assemble le graphe complet d'une page dans un unique bloc @graph */
export function buildGraph(nodes: Array<Json | null | undefined>): string {
  const graph = nodes.filter((n): n is Json => Boolean(n));
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/** Description texte de la zone, reutilisable dans les meta */
export const zoneLabel = `${villes.length} communes autour de ${nap.address.city}`;

export { addressOneLine };
