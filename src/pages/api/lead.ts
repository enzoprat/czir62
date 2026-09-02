/* ===========================================================================
 * CZIR62 — Route d'ingestion des demandes
 * ---------------------------------------------------------------------------
 * POST /api/lead/   (JSON ou multipart/form-data si photos jointes)
 *
 * Seule route rendue a la demande du site : tout le reste est statique.
 *
 * Chaine de traitement :
 *   1. anti-abus       — honeypot, controle de vitesse, limitation par IP
 *   2. validation      — nom et telephone obligatoires, format FR verifie
 *   3. normalisation   — identifiant CZIR-XXXXXX, horodatage, attribution
 *   4. pieces jointes  — photos enregistrees, chemins rattaches au lead
 *   5. diffusion       — envoi parallele a toutes les destinations actives
 *
 * Le lead est toujours journalise localement AVANT toute integration :
 * une panne de webhook ne fait jamais perdre une demande.
 * ========================================================================= */

import type { APIRoute } from 'astro';
import type { Attribution, Lead, LeadInput, LeadOrigin } from '@/lib/leads/types';
import { generateLeadId } from '@/lib/leads/id';
import { dispatchLead } from '@/lib/leads/sinks';
import { services } from '@/data/services';

export const prerender = false;

/* ----------------------------------------------------------- anti-abus */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Purge opportuniste : evite que la table grossisse indefiniment
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_MAX;
}

async function turnstileOk(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // verification desactivee tant que la cle n'est pas fournie
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    // En cas d'indisponibilite du service, on ne bloque pas un vrai client.
    return true;
  }
}

/* ---------------------------------------------------------- validation */

const PHONE_FR = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

function cleanText(v: unknown, max = 2000): string | null {
  if (typeof v !== 'string') return null;
  const s = v.replace(/\s+/g, ' ').trim().slice(0, max);
  return s.length ? s : null;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  const national = digits.startsWith('+33')
    ? '0' + digits.slice(3)
    : digits.startsWith('0033')
      ? '0' + digits.slice(4)
      : digits;
  // Format francais lisible : 03 21 00 00 00
  return national.length === 10 ? national.replace(/(\d{2})(?=\d)/g, '$1 ').trim() : national;
}

const ORIGINS: LeadOrigin[] = [
  'formulaire-devis', 'diagnostic', 'estimateur', 'assistant-fuite', 'rappel', 'contact',
];

function emptyAttribution(): Attribution {
  return {
    landingPage: null, conversionPage: null, referrer: null,
    source: null, medium: null, campaign: null, term: null, content: null,
    gclid: null, gbraid: null, wbraid: null, msclkid: null, fbclid: null,
    firstSeen: null, pageViews: null,
  };
}

function buildAttribution(input: Partial<Attribution> | undefined): Attribution {
  const base = emptyAttribution();
  if (!input) return base;
  const keys = Object.keys(base) as (keyof Attribution)[];
  for (const k of keys) {
    const v = input[k];
    if (k === 'pageViews') {
      base.pageViews = typeof v === 'number' ? v : v ? Number(v) || null : null;
    } else if (typeof v === 'string' && v.trim()) {
      (base[k] as string | null) = v.trim().slice(0, 500);
    }
  }
  return base;
}

/* ------------------------------------------------------- pieces jointes */

const MAX_FILES = 4;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

async function saveFiles(files: File[], leadId: string): Promise<string[]> {
  if (!files.length) return [];
  const saved: string[] = [];
  try {
    const { mkdir, writeFile } = await import('node:fs/promises');
    const dir = `.leads/uploads/${leadId}`;
    await mkdir(dir, { recursive: true });

    for (const [i, file] of files.slice(0, MAX_FILES).entries()) {
      if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES) continue;
      const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5);
      const path = `${dir}/photo-${i + 1}.${ext || 'jpg'}`;
      await writeFile(path, Buffer.from(await file.arrayBuffer()));
      saved.push(path);
    }
  } catch {
    // Une photo non enregistree ne doit jamais faire perdre le lead.
  }
  return saved;
}

/* -------------------------------------------------------------- route */

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'inconnue';

  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Trop de demandes envoyées. Merci de patienter une minute.' }, 429);
  }

  /* --- lecture de la requete : JSON ou multipart ----------------------- */
  let input: LeadInput;
  let files: File[] = [];
  const contentType = request.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const payload = form.get('payload');
      input = typeof payload === 'string' ? JSON.parse(payload) : ({} as LeadInput);
      files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
    } else {
      input = (await request.json()) as LeadInput;
    }
  } catch {
    return json({ ok: false, error: 'Requête illisible.' }, 400);
  }

  /* --- anti-abus ------------------------------------------------------- */
  // 1. Champ piege : rempli uniquement par un robot
  if (input._hp) return json({ ok: true, id: generateLeadId() }, 200); // reponse neutre volontaire
  // 2. Controle de vitesse : un humain ne remplit pas un formulaire en 2 secondes
  if (typeof input._t === 'number' && Date.now() - input._t < 2500) {
    return json({ ok: false, error: 'Envoi trop rapide, merci de réessayer.' }, 400);
  }
  // 3. Verification Turnstile si configuree
  if (!(await turnstileOk(input._captcha, ip))) {
    return json({ ok: false, error: 'Vérification anti-robot non validée.' }, 403);
  }

  /* --- validation ------------------------------------------------------ */
  const nom = cleanText(input.nom, 120);
  const telRaw = cleanText(input.telephone, 30);

  if (!nom || nom.length < 2) {
    return json({ ok: false, error: 'Merci d’indiquer votre nom.', field: 'nom' }, 400);
  }
  if (!telRaw || !PHONE_FR.test(telRaw)) {
    return json({ ok: false, error: 'Numéro de téléphone non reconnu.', field: 'telephone' }, 400);
  }

  const email = cleanText(input.email, 160);
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    return json({ ok: false, error: 'Adresse e-mail non valide.', field: 'email' }, 400);
  }

  /* --- normalisation --------------------------------------------------- */
  const id = generateLeadId();
  const now = new Date();
  const prestation = cleanText(input.prestation, 80);
  const service = services.find((s) => s.slug === prestation);

  const lead: Lead = {
    id,
    createdAt: now.toISOString(),
    date: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeZone: 'Europe/Paris' }).format(now),
    heure: new Intl.DateTimeFormat('fr-FR', { timeStyle: 'short', timeZone: 'Europe/Paris' }).format(now),
    origin: ORIGINS.includes(input.origin) ? input.origin : 'formulaire-devis',
    nom,
    telephone: normalizePhone(telRaw),
    email,
    commune: cleanText(input.commune, 80),
    codePostal: cleanText(input.codePostal, 10),
    prestation,
    prestationLabel: service?.name ?? prestation,
    message: cleanText(input.message, 4000),
    reponses:
      input.reponses && typeof input.reponses === 'object' && Object.keys(input.reponses).length
        ? input.reponses
        : null,
    fichiers: [],
    attribution: buildAttribution(input.attribution),
    meta: {
      userAgent: request.headers.get('user-agent'),
      ip,
      language: request.headers.get('accept-language'),
    },
  };

  lead.fichiers = await saveFiles(files, id);

  /* --- diffusion ------------------------------------------------------- */
  const results = await dispatchLead(lead);
  const delivered = results.some((r) => r.ok);

  if (!delivered) {
    console.error('[lead] Aucune destination n’a accepté le lead', id, results);
    return json(
      { ok: false, error: "L’envoi a échoué. Appelez-nous directement, nous prenons la demande par téléphone." },
      502,
    );
  }

  if (import.meta.env.DEV) {
    console.log(`[lead] ${id} — ${lead.nom} (${lead.telephone})`, results);
  }

  return json({ ok: true, id, prestation: lead.prestationLabel });
};

/** GET renvoie 405 : evite l'indexation et les appels accidentels */
export const GET: APIRoute = () =>
  json({ ok: false, error: 'Méthode non autorisée.' }, 405);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
