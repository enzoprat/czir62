/* ===========================================================================
 * CZIR62 — Destinations des leads
 * ---------------------------------------------------------------------------
 * Architecture volontairement « fan-out » : un lead est envoye en parallele a
 * toutes les destinations configurees. Chaque destination est independante et
 * ne peut pas faire echouer les autres (Promise.allSettled).
 *
 * Une destination s'active uniquement si sa variable d'environnement est
 * renseignee. Aucune configuration = seul le journal local tourne.
 *
 * AJOUTER UNE DESTINATION : ecrire une fonction `(lead) => Promise<SinkResult>`
 * et l'ajouter au tableau de `dispatchLead`. Rien d'autre a modifier.
 * ========================================================================= */

import type { Lead, SinkResult } from './types';

const env = (key: string): string | undefined => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : undefined;
};

const TIMEOUT_MS = 8000;

/** fetch avec delai maximal : une destination lente ne doit pas bloquer la reponse */
async function postJson(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------------ *
 * 1. Journal local NDJSON — filet de securite
 *    Un lead n'est jamais perdu, meme si toutes les integrations tombent.
 * ------------------------------------------------------------------------ */
async function fileSink(lead: Lead): Promise<SinkResult> {
  const path = env('LEAD_LOG_FILE') ?? '.leads/leads.ndjson';
  try {
    const { mkdir, appendFile } = await import('node:fs/promises');
    const { dirname } = await import('node:path');
    await mkdir(dirname(path), { recursive: true });
    await appendFile(path, JSON.stringify(lead) + '\n', 'utf8');
    return { name: 'journal', ok: true };
  } catch (e) {
    return { name: 'journal', ok: false, detail: String(e) };
  }
}

/* ------------------------------------------------------------------------ *
 * 2. Webhook generique — n8n, Make, Zapier, endpoint maison
 *    Signature HMAC SHA-256 optionnelle pour que le destinataire puisse
 *    verifier que la requete vient bien du site.
 * ------------------------------------------------------------------------ */
async function webhookSink(lead: Lead): Promise<SinkResult | null> {
  const url = env('LEAD_WEBHOOK_URL');
  if (!url) return null;

  const headers: Record<string, string> = { 'x-czir-lead-id': lead.id };
  const secret = env('LEAD_WEBHOOK_SECRET');
  if (secret) {
    const { createHmac } = await import('node:crypto');
    headers['x-czir-signature'] = createHmac('sha256', secret)
      .update(JSON.stringify(lead))
      .digest('hex');
  }

  try {
    const res = await postJson(url, lead, headers);
    return { name: 'webhook', ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { name: 'webhook', ok: false, detail: String(e) };
  }
}

/* ------------------------------------------------------------------------ *
 * 3. Google Sheets via Apps Script
 *    Envoi a plat : une ligne = un lead, colonnes stables et lisibles.
 * ------------------------------------------------------------------------ */
async function sheetsSink(lead: Lead): Promise<SinkResult | null> {
  const url = env('LEAD_SHEETS_URL');
  if (!url) return null;

  const row = {
    id: lead.id,
    date: lead.date,
    heure: lead.heure,
    nom: lead.nom,
    telephone: lead.telephone,
    email: lead.email ?? '',
    commune: lead.commune ?? '',
    prestation: lead.prestationLabel ?? lead.prestation ?? '',
    origine: lead.origin,
    message: lead.message ?? '',
    page_entree: lead.attribution.landingPage ?? '',
    page_conversion: lead.attribution.conversionPage ?? '',
    source: lead.attribution.source ?? '',
    medium: lead.attribution.medium ?? '',
    campaign: lead.attribution.campaign ?? '',
    gclid: lead.attribution.gclid ?? '',
    referrer: lead.attribution.referrer ?? '',
    reponses: lead.reponses ? JSON.stringify(lead.reponses) : '',
  };

  try {
    const res = await postJson(url, row);
    return { name: 'sheets', ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { name: 'sheets', ok: false, detail: String(e) };
  }
}

/* ------------------------------------------------------------------------ *
 * 4. CRM — endpoint HTTP avec jeton porteur
 * ------------------------------------------------------------------------ */
async function crmSink(lead: Lead): Promise<SinkResult | null> {
  const url = env('LEAD_CRM_URL');
  if (!url) return null;
  const token = env('LEAD_CRM_TOKEN');
  try {
    const res = await postJson(url, lead, token ? { authorization: `Bearer ${token}` } : {});
    return { name: 'crm', ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { name: 'crm', ok: false, detail: String(e) };
  }
}

/* ------------------------------------------------------------------------ *
 * 5. E-mail — notification immediate a l'entreprise
 * ------------------------------------------------------------------------ */
function leadEmailHtml(lead: Lead): string {
  const line = (label: string, value: string | null) =>
    value ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111827"><strong>${escapeHtml(value)}</strong></td></tr>` : '';

  const reponses = lead.reponses
    ? Object.entries(lead.reponses)
        .map(([k, v]) => line(escapeHtml(k), Array.isArray(v) ? v.join(', ') : String(v)))
        .join('')
    : '';

  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f6f4f0;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
<div style="max-width:640px;margin:0 auto;padding:24px">
  <div style="background:#fff;border:1px solid #e5e0d8;border-radius:14px;overflow:hidden">
    <div style="background:#AE5A2F;color:#fff;padding:18px 22px">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.85">Nouvelle demande</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">${escapeHtml(lead.prestationLabel ?? 'Demande de devis')}</div>
      <div style="font-size:13px;opacity:.9;margin-top:6px">Référence ${lead.id} — ${lead.date} à ${lead.heure}</div>
    </div>
    <div style="padding:22px">
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${line('Nom', lead.nom)}
        ${line('Téléphone', lead.telephone)}
        ${line('E-mail', lead.email)}
        ${line('Commune', lead.commune)}
        ${line('Prestation', lead.prestationLabel ?? lead.prestation)}
        ${reponses}
      </table>
      ${lead.message ? `<div style="margin-top:18px;padding:14px;background:#faf7f2;border-radius:10px;font-size:15px;color:#374151;white-space:pre-wrap">${escapeHtml(lead.message)}</div>` : ''}
      ${lead.telephone ? `<div style="margin-top:20px"><a href="tel:${escapeHtml(lead.telephone.replace(/\s/g, ''))}" style="display:inline-block;background:#AE5A2F;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">Rappeler ${escapeHtml(lead.nom)}</a></div>` : ''}
    </div>
    <div style="padding:16px 22px;border-top:1px solid #eee;font-size:12px;color:#6b7280;line-height:1.6">
      <strong style="color:#374151">Origine</strong><br>
      Page de conversion : ${escapeHtml(lead.attribution.conversionPage ?? '—')}<br>
      Page d'entrée : ${escapeHtml(lead.attribution.landingPage ?? '—')}<br>
      Source / support : ${escapeHtml(lead.attribution.source ?? '—')} / ${escapeHtml(lead.attribution.medium ?? '—')}
      ${lead.attribution.campaign ? `<br>Campagne : ${escapeHtml(lead.attribution.campaign)}` : ''}
      ${lead.attribution.gclid ? '<br>Provenance Google Ads (gclid présent)' : ''}
    </div>
  </div>
</div></body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

async function emailSink(lead: Lead): Promise<SinkResult | null> {
  const key = env('RESEND_API_KEY');
  const to = env('LEAD_EMAIL_TO');
  const from = env('LEAD_EMAIL_FROM');
  if (!key || !to || !from) return null;

  try {
    const res = await postJson(
      'https://api.resend.com/emails',
      {
        from,
        to: to.split(',').map((s) => s.trim()),
        subject: `[${lead.id}] ${lead.prestationLabel ?? 'Demande'} — ${lead.nom}${lead.commune ? ` (${lead.commune})` : ''}`,
        html: leadEmailHtml(lead),
        reply_to: lead.email ?? undefined,
      },
      { authorization: `Bearer ${key}` },
    );
    return { name: 'email', ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (e) {
    return { name: 'email', ok: false, detail: String(e) };
  }
}

/* ------------------------------------------------------------------------ *
 * Orchestration
 * ------------------------------------------------------------------------ */
export async function dispatchLead(lead: Lead): Promise<SinkResult[]> {
  const tasks = [fileSink(lead), webhookSink(lead), sheetsSink(lead), crmSink(lead), emailSink(lead)];
  const settled = await Promise.allSettled(tasks);

  return settled
    .map((r): SinkResult | null =>
      r.status === 'fulfilled' ? r.value : { name: 'inconnu', ok: false, detail: String(r.reason) },
    )
    .filter((r): r is SinkResult => r !== null);
}
