import { a as services } from '../../chunks/services_D_oSeEUu.mjs';
export { renderers } from '../../renderers.mjs';

const ALPHABET = "0123456789ABCDEF";
function generateLeadId() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % 16];
  return `CZIR-${out}`;
}

const env = (key) => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : void 0;
};
const TIMEOUT_MS = 8e3;
async function postJson(url, body, headers = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
  } finally {
    clearTimeout(timer);
  }
}
async function fileSink(lead) {
  if (env("VERCEL") || env("AWS_LAMBDA_FUNCTION_NAME") || env("NETLIFY")) return null;
  const path = env("LEAD_LOG_FILE") ?? ".leads/leads.ndjson";
  try {
    const { mkdir, appendFile } = await import('node:fs/promises');
    const { dirname } = await import('node:path');
    await mkdir(dirname(path), { recursive: true });
    await appendFile(path, JSON.stringify(lead) + "\n", "utf8");
    return { name: "journal", ok: true };
  } catch (e) {
    return { name: "journal", ok: false, detail: String(e) };
  }
}
async function webhookSink(lead) {
  const url = env("LEAD_WEBHOOK_URL");
  if (!url) return null;
  const headers = { "x-czir-lead-id": lead.id };
  const secret = env("LEAD_WEBHOOK_SECRET");
  if (secret) {
    const { createHmac } = await import('node:crypto');
    headers["x-czir-signature"] = createHmac("sha256", secret).update(JSON.stringify(lead)).digest("hex");
  }
  try {
    const res = await postJson(url, lead, headers);
    return { name: "webhook", ok: res.ok, detail: res.ok ? void 0 : `HTTP ${res.status}` };
  } catch (e) {
    return { name: "webhook", ok: false, detail: String(e) };
  }
}
async function sheetsSink(lead) {
  const url = env("LEAD_SHEETS_URL");
  if (!url) return null;
  const row = {
    id: lead.id,
    date: lead.date,
    heure: lead.heure,
    nom: lead.nom,
    telephone: lead.telephone,
    email: lead.email ?? "",
    commune: lead.commune ?? "",
    prestation: lead.prestationLabel ?? lead.prestation ?? "",
    origine: lead.origin,
    message: lead.message ?? "",
    page_entree: lead.attribution.landingPage ?? "",
    page_conversion: lead.attribution.conversionPage ?? "",
    source: lead.attribution.source ?? "",
    medium: lead.attribution.medium ?? "",
    campaign: lead.attribution.campaign ?? "",
    gclid: lead.attribution.gclid ?? "",
    referrer: lead.attribution.referrer ?? "",
    reponses: lead.reponses ? JSON.stringify(lead.reponses) : ""
  };
  try {
    const res = await postJson(url, row);
    return { name: "sheets", ok: res.ok, detail: res.ok ? void 0 : `HTTP ${res.status}` };
  } catch (e) {
    return { name: "sheets", ok: false, detail: String(e) };
  }
}
async function crmSink(lead) {
  const url = env("LEAD_CRM_URL");
  if (!url) return null;
  const token = env("LEAD_CRM_TOKEN");
  try {
    const res = await postJson(url, lead, token ? { authorization: `Bearer ${token}` } : {});
    return { name: "crm", ok: res.ok, detail: res.ok ? void 0 : `HTTP ${res.status}` };
  } catch (e) {
    return { name: "crm", ok: false, detail: String(e) };
  }
}
function leadEmailHtml(lead) {
  const line = (label, value) => value ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111827"><strong>${escapeHtml(value)}</strong></td></tr>` : "";
  const reponses = lead.reponses ? Object.entries(lead.reponses).map(([k, v]) => line(escapeHtml(k), Array.isArray(v) ? v.join(", ") : String(v))).join("") : "";
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f6f4f0;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
<div style="max-width:640px;margin:0 auto;padding:24px">
  <div style="background:#fff;border:1px solid #e5e0d8;border-radius:14px;overflow:hidden">
    <div style="background:#AE5A2F;color:#fff;padding:18px 22px">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.85">Nouvelle demande</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">${escapeHtml(lead.prestationLabel ?? "Demande de devis")}</div>
      <div style="font-size:13px;opacity:.9;margin-top:6px">Référence ${lead.id} — ${lead.date} à ${lead.heure}</div>
    </div>
    <div style="padding:22px">
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${line("Nom", lead.nom)}
        ${line("Téléphone", lead.telephone)}
        ${line("E-mail", lead.email)}
        ${line("Commune", lead.commune)}
        ${line("Prestation", lead.prestationLabel ?? lead.prestation)}
        ${reponses}
      </table>
      ${lead.message ? `<div style="margin-top:18px;padding:14px;background:#faf7f2;border-radius:10px;font-size:15px;color:#374151;white-space:pre-wrap">${escapeHtml(lead.message)}</div>` : ""}
      ${lead.telephone ? `<div style="margin-top:20px"><a href="tel:${escapeHtml(lead.telephone.replace(/\s/g, ""))}" style="display:inline-block;background:#AE5A2F;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">Rappeler ${escapeHtml(lead.nom)}</a></div>` : ""}
    </div>
    <div style="padding:16px 22px;border-top:1px solid #eee;font-size:12px;color:#6b7280;line-height:1.6">
      <strong style="color:#374151">Origine</strong><br>
      Page de conversion : ${escapeHtml(lead.attribution.conversionPage ?? "—")}<br>
      Page d'entrée : ${escapeHtml(lead.attribution.landingPage ?? "—")}<br>
      Source / support : ${escapeHtml(lead.attribution.source ?? "—")} / ${escapeHtml(lead.attribution.medium ?? "—")}
      ${lead.attribution.campaign ? `<br>Campagne : ${escapeHtml(lead.attribution.campaign)}` : ""}
      ${lead.attribution.gclid ? "<br>Provenance Google Ads (gclid présent)" : ""}
    </div>
  </div>
</div></body></html>`;
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}
async function emailSink(lead) {
  const key = env("RESEND_API_KEY");
  const to = env("LEAD_EMAIL_TO");
  const from = env("LEAD_EMAIL_FROM");
  if (!key || !to || !from) return null;
  try {
    const res = await postJson(
      "https://api.resend.com/emails",
      {
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `[${lead.id}] ${lead.prestationLabel ?? "Demande"} — ${lead.nom}${lead.commune ? ` (${lead.commune})` : ""}`,
        html: leadEmailHtml(lead),
        reply_to: lead.email ?? void 0
      },
      { authorization: `Bearer ${key}` }
    );
    return { name: "email", ok: res.ok, detail: res.ok ? void 0 : `HTTP ${res.status}` };
  } catch (e) {
    return { name: "email", ok: false, detail: String(e) };
  }
}
async function dispatchLead(lead) {
  const tasks = [fileSink(lead), webhookSink(lead), sheetsSink(lead), crmSink(lead), emailSink(lead)];
  const settled = await Promise.allSettled(tasks);
  return settled.map(
    (r) => r.status === "fulfilled" ? r.value : { name: "inconnu", ok: false, detail: String(r.reason) }
  ).filter((r) => r !== null);
}

const prerender = false;
const RATE_WINDOW_MS = 6e4;
const RATE_MAX = 5;
const hits = /* @__PURE__ */ new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5e3) {
    for (const [k, v] of hits) if (v.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_MAX;
}
async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip })
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch {
    return true;
  }
}
const PHONE_FR = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;
function cleanText(v, max = 2e3) {
  if (typeof v !== "string") return null;
  const s = v.replace(/\s+/g, " ").trim().slice(0, max);
  return s.length ? s : null;
}
function normalizePhone(raw) {
  const digits = raw.replace(/[^\d+]/g, "");
  const national = digits.startsWith("+33") ? "0" + digits.slice(3) : digits.startsWith("0033") ? "0" + digits.slice(4) : digits;
  return national.length === 10 ? national.replace(/(\d{2})(?=\d)/g, "$1 ").trim() : national;
}
const ORIGINS = [
  "formulaire-devis",
  "diagnostic",
  "estimateur",
  "assistant-fuite",
  "rappel",
  "contact"
];
function emptyAttribution() {
  return {
    landingPage: null,
    conversionPage: null,
    referrer: null,
    source: null,
    medium: null,
    campaign: null,
    term: null,
    content: null,
    gclid: null,
    gbraid: null,
    wbraid: null,
    msclkid: null,
    fbclid: null,
    firstSeen: null,
    pageViews: null
  };
}
function buildAttribution(input) {
  const base = emptyAttribution();
  if (!input) return base;
  const keys = Object.keys(base);
  for (const k of keys) {
    const v = input[k];
    if (k === "pageViews") {
      base.pageViews = typeof v === "number" ? v : v ? Number(v) || null : null;
    } else if (typeof v === "string" && v.trim()) {
      base[k] = v.trim().slice(0, 500);
    }
  }
  return base;
}
const MAX_FILES = 4;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
async function saveFiles(files, leadId) {
  if (!files.length) return [];
  const saved = [];
  try {
    const { mkdir, writeFile } = await import('node:fs/promises');
    const dir = `.leads/uploads/${leadId}`;
    await mkdir(dir, { recursive: true });
    for (const [i, file] of files.slice(0, MAX_FILES).entries()) {
      if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES) continue;
      const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5);
      const path = `${dir}/photo-${i + 1}.${ext || "jpg"}`;
      await writeFile(path, Buffer.from(await file.arrayBuffer()));
      saved.push(path);
    }
  } catch {
  }
  return saved;
}
const POST = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Trop de demandes envoyées. Merci de patienter une minute." }, 429);
  }
  let input;
  let files = [];
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const payload = form.get("payload");
      input = typeof payload === "string" ? JSON.parse(payload) : {};
      files = form.getAll("photos").filter((f) => f instanceof File && f.size > 0);
    } else {
      input = await request.json();
    }
  } catch {
    return json({ ok: false, error: "Requête illisible." }, 400);
  }
  if (input._hp) return json({ ok: true, id: generateLeadId() }, 200);
  if (typeof input._t === "number" && Date.now() - input._t < 2500) {
    return json({ ok: false, error: "Envoi trop rapide, merci de réessayer." }, 400);
  }
  if (!await turnstileOk(input._captcha, ip)) {
    return json({ ok: false, error: "Vérification anti-robot non validée." }, 403);
  }
  const nom = cleanText(input.nom, 120);
  const telRaw = cleanText(input.telephone, 30);
  if (!nom || nom.length < 2) {
    return json({ ok: false, error: "Merci d’indiquer votre nom.", field: "nom" }, 400);
  }
  if (!telRaw || !PHONE_FR.test(telRaw)) {
    return json({ ok: false, error: "Numéro de téléphone non reconnu.", field: "telephone" }, 400);
  }
  const email = cleanText(input.email, 160);
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    return json({ ok: false, error: "Adresse e-mail non valide.", field: "email" }, 400);
  }
  const id = generateLeadId();
  const now = /* @__PURE__ */ new Date();
  const prestation = cleanText(input.prestation, 80);
  const service = services.find((s) => s.slug === prestation);
  const lead = {
    id,
    createdAt: now.toISOString(),
    date: new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeZone: "Europe/Paris" }).format(now),
    heure: new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Europe/Paris" }).format(now),
    origin: ORIGINS.includes(input.origin) ? input.origin : "formulaire-devis",
    nom,
    telephone: normalizePhone(telRaw),
    email,
    commune: cleanText(input.commune, 80),
    codePostal: cleanText(input.codePostal, 10),
    prestation,
    prestationLabel: service?.name ?? prestation,
    message: cleanText(input.message, 4e3),
    reponses: input.reponses && typeof input.reponses === "object" && Object.keys(input.reponses).length ? input.reponses : null,
    fichiers: [],
    attribution: buildAttribution(input.attribution),
    meta: {
      userAgent: request.headers.get("user-agent"),
      ip,
      language: request.headers.get("accept-language")
    }
  };
  lead.fichiers = await saveFiles(files, id);
  const results = await dispatchLead(lead);
  const delivered = results.some((r) => r.ok);
  if (!delivered) {
    console.error("[lead] Aucune destination n’a accepté le lead", id, results);
    return json(
      { ok: false, error: "L’envoi a échoué. Appelez-nous directement, nous prenons la demande par téléphone." },
      502
    );
  }
  return json({ ok: true, id, prestation: lead.prestationLabel });
};
const GET = () => json({ ok: false, error: "Méthode non autorisée." }, 405);
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
