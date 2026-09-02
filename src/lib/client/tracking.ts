/* ===========================================================================
 * CZIR62 — Attribution et evenements (client)
 * ---------------------------------------------------------------------------
 * Deux roles :
 *
 *  1. ATTRIBUTION — memoriser d'ou vient le visiteur pour pouvoir repondre,
 *     six mois plus tard : « ce chantier vient de quelle source ? »
 *     Modele retenu : premier contact conserve (page d'entree, date), dernier
 *     contact non direct pour la source/campagne. C'est le modele qui
 *     correspond le mieux a un cycle court avec appel telephonique.
 *
 *  2. EVENEMENTS — pousser des evenements nommes dans dataLayer (GTM) et vers
 *     gtag si GA4 est charge directement. Aucun outil n'est requis : si
 *     aucun n'est installe, les evenements sont simplement empiles dans
 *     dataLayer sans effet de bord.
 *
 * Aucun cookie tiers n'est depose par ce script.
 * ========================================================================= */

type Params = Record<string, string | number | boolean | null | undefined>;

interface StoredAttribution {
  landingPage?: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  fbclid?: string;
  firstSeen?: string;
}

const KEY_FIRST = 'czir_attr_first';
const KEY_LAST = 'czir_attr_last';
const KEY_VIEWS = 'czir_pageviews';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

/* ------------------------------------------------------------- stockage */

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null; // navigation privee, stockage bloque : on continue sans attribution
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* silencieux : l'absence d'attribution ne doit jamais casser un formulaire */
  }
}

/* ---------------------------------------------------------- attribution */

const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid'] as const;

/** Deduit source et support quand aucun parametre UTM n'est present */
function inferFromReferrer(ref: string): { source: string; medium: string } {
  if (!ref) return { source: 'direct', medium: 'none' };
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    if (host === location.hostname) return { source: 'interne', medium: 'internal' };
    if (/(^|\.)google\./.test(host)) return { source: 'google', medium: 'organic' };
    if (/(^|\.)bing\./.test(host)) return { source: 'bing', medium: 'organic' };
    if (/(^|\.)(duckduckgo|ecosia|qwant|yahoo)\./.test(host)) return { source: host, medium: 'organic' };
    if (/(facebook|instagram|linkedin|twitter|x\.com|tiktok)\./.test(host)) return { source: host, medium: 'social' };
    return { source: host, medium: 'referral' };
  } catch {
    return { source: 'direct', medium: 'none' };
  }
}

function collectCurrent(): StoredAttribution {
  const p = new URLSearchParams(location.search);
  const ref = document.referrer || '';
  const inferred = inferFromReferrer(ref);

  const attr: StoredAttribution = {
    landingPage: location.pathname + location.search,
    referrer: ref || undefined,
    source: p.get('utm_source') ?? undefined,
    medium: p.get('utm_medium') ?? undefined,
    campaign: p.get('utm_campaign') ?? undefined,
    term: p.get('utm_term') ?? undefined,
    content: p.get('utm_content') ?? undefined,
    firstSeen: new Date().toISOString(),
  };

  for (const id of CLICK_IDS) {
    const v = p.get(id);
    if (v) attr[id] = v;
  }

  // Un clic Google Ads sans utm_source explicite reste identifiable par le gclid
  if (!attr.source && attr.gclid) {
    attr.source = 'google';
    attr.medium = 'cpc';
  }
  if (!attr.source) {
    attr.source = inferred.source;
    attr.medium = attr.medium ?? inferred.medium;
  }

  return attr;
}

/** true si la visite courante apporte une information d'origine exploitable */
function isMeaningful(attr: StoredAttribution): boolean {
  if (CLICK_IDS.some((id) => attr[id])) return true;
  if (attr.campaign) return true;
  return attr.medium !== 'none' && attr.medium !== 'internal';
}

function initAttribution(): void {
  const current = collectCurrent();

  const first = read<StoredAttribution>(KEY_FIRST);
  const firstIsStale =
    first?.firstSeen && Date.now() - new Date(first.firstSeen).getTime() > MAX_AGE_MS;

  if (!first || firstIsStale) write(KEY_FIRST, current);

  // Dernier contact non direct : on n'ecrase pas une source connue par « direct »
  const last = read<StoredAttribution>(KEY_LAST);
  if (!last || isMeaningful(current)) write(KEY_LAST, current);

  try {
    const views = Number(sessionStorage.getItem(KEY_VIEWS) ?? '0') + 1;
    sessionStorage.setItem(KEY_VIEWS, String(views));
  } catch {
    /* ignore */
  }
}

/**
 * Attribution complete a joindre a une demande.
 * Combine la page d'entree d'origine et la derniere source non directe.
 */
export function getAttribution(): Record<string, string | number | null> {
  const first = read<StoredAttribution>(KEY_FIRST) ?? {};
  const last = read<StoredAttribution>(KEY_LAST) ?? {};
  let pageViews: number | null = null;
  try {
    pageViews = Number(sessionStorage.getItem(KEY_VIEWS) ?? '0') || null;
  } catch {
    /* ignore */
  }

  return {
    landingPage: first.landingPage ?? location.pathname,
    conversionPage: location.pathname,
    referrer: first.referrer ?? null,
    source: last.source ?? first.source ?? null,
    medium: last.medium ?? first.medium ?? null,
    campaign: last.campaign ?? first.campaign ?? null,
    term: last.term ?? first.term ?? null,
    content: last.content ?? first.content ?? null,
    gclid: last.gclid ?? first.gclid ?? null,
    gbraid: last.gbraid ?? first.gbraid ?? null,
    wbraid: last.wbraid ?? first.wbraid ?? null,
    msclkid: last.msclkid ?? first.msclkid ?? null,
    fbclid: last.fbclid ?? first.fbclid ?? null,
    firstSeen: first.firstSeen ?? null,
    pageViews,
  };
}

/* ------------------------------------------------------------ evenements */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    czir?: {
      track: typeof track;
      getAttribution: typeof getAttribution;
    };
  }
}

/**
 * Pousse un evenement nomme.
 * Nomenclature figee — toute modification casse l'historique des rapports :
 *   phone_click, quote_start, quote_step, quote_submit,
 *   diagnostic_start, diagnostic_complete,
 *   estimator_start, estimator_complete,
 *   leak_assistant_start, leak_assistant_complete,
 *   surface_estimate, google_reviews_click, directions_click,
 *   service_view, city_page_view, realisation_view
 */
export function track(event: string, params: Params = {}): void {
  const payload = { event, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
  if (import.meta.env.DEV) console.debug('[track]', event, params);
}

/* --------------------------------------------------- liaisons automatiques */

function bindGlobalEvents(): void {
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest('a, button');
      if (!el) return;

      // Appel telephonique — l'evenement de conversion le plus important
      const href = el.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) {
        track('phone_click', {
          source_bloc: el.getAttribute('data-track-zone') ?? 'inconnu',
          page: location.pathname,
        });
        return;
      }

      // Evenements declaratifs : data-track="nom" sur n'importe quel element
      const named = el.getAttribute('data-track');
      if (named) {
        track(named, {
          label: el.getAttribute('data-track-label') ?? el.textContent?.trim().slice(0, 60) ?? '',
          page: location.pathname,
        });
      }
    },
    { passive: true },
  );
}

/** Vue de page qualifiee, declaree par la page elle-meme via data-page-event */
function trackPageContext(): void {
  const body = document.body;
  const evt = body.getAttribute('data-page-event');
  if (!evt) return;
  track(evt, {
    page: location.pathname,
    slug: body.getAttribute('data-page-slug') ?? '',
    label: body.getAttribute('data-page-label') ?? '',
  });
}

/* -------------------------------------------------------------- demarrage */

initAttribution();
bindGlobalEvents();
trackPageContext();

window.czir = { track, getAttribution };

export {};
