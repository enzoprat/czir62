/* ===========================================================================
 * CZIR62 — Livraison du mail par Web3Forms, depuis le navigateur
 * ---------------------------------------------------------------------------
 * POURQUOI DEPUIS LE NAVIGATEUR, ET PAS DEPUIS /api/lead/
 * Web3Forms refuse tout appel serveur sur le plan gratuit :
 *   403 « Use our API in client side or contact support with server IP
 *   address (Pro plan is required) »
 * Verifie le 11 octobre 2026 avec trois cles, dont une inventee : reponse
 * identique. Ce n'est pas un defaut d'authentification, c'est une
 * restriction de plan. L'envoi part donc d'ici.
 *
 * CE QUE CA IMPLIQUE
 * La cle est publique, visible dans le code source, et le plan gratuit ne
 * permet pas de la restreindre a un domaine (« Restrict to Domain » est une
 * fonctionnalite Pro). Elle est donc copiable. Le garde-fou restant est le
 * quota mensuel : si le formulaire se tait brutalement, verifier d'abord le
 * compteur Web3Forms avant de chercher un bug.
 *
 * L'attribution, le piege temporel et le honeypot restent traites par
 * /api/lead/, qui est appele avant celui-ci. Seule la livraison bascule.
 * ========================================================================= */

const API = 'https://api.web3forms.com/submit';

/**
 * Web3Forms decode les NOMS de champs multipart en latin-1 : « Téléphone »
 * arrive « TÃ©lÃ©phone » dans le mail. Mesure le 11 octobre 2026 en lisant
 * l'echo de l'API. Les valeurs, elles, passent correctement.
 *
 * On enleve donc les diacritiques des libelles — pas des contenus. Les
 * parcours guides (diagnostic, estimateur, assistant fuite) produisent des
 * intitules de questions accentues : sans ce nettoyage, la moitie du mail
 * serait illisible.
 */
const asciiLabel = (s: string): string =>
  s
    // Translitterer avant de filtrer : sans cette etape, l'apostrophe
    // typographique disparait et « l'anciennete » devient « lanciennete ».
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u201c\u201d\u00ab\u00bb]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u0153/g, 'oe').replace(/\u0152/g, 'OE')
    .replace(/\u00e6/g, 'ae').replace(/\u00c6/g, 'AE')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7e]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Web3Forms refuse les pieces jointes au-dela de 1 Mo. */
const MAX_PIECE_JOINTE = 1_000_000;
const MAX_PIECES = 3;
/** Cote le plus long apres reduction : large pour juger une toiture, leger pour passer. */
const COTE_MAX = 1600;

/**
 * Reduit une photo jusqu'a passer sous la limite. Une photo de telephone
 * pese 2 a 5 Mo : sans cette etape, aucune piece jointe n'arriverait — ce
 * qui est exactement ce qui se passait jusqu'ici, en silence.
 * Renvoie null si l'image est illisible ou reste trop lourde.
 */
async function reduire(file: File): Promise<File | null> {
  if (file.size <= MAX_PIECE_JOINTE) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * ratio);
    canvas.height = Math.round(bitmap.height * ratio);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    for (const q of [0.75, 0.6, 0.45]) {
      const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', q));
      if (blob && blob.size <= MAX_PIECE_JOINTE) {
        return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
      }
    }
    return null;
  } catch {
    return null;
  }
}

export interface ChampsMail {
  subject: string;
  from_name: string;
  replyto?: string;
  /** Libelles lisibles : ce mail se lit sur un telephone, entre deux chantiers. */
  champs: Record<string, string>;
}

export async function envoyerWeb3Forms(
  cle: string,
  m: ChampsMail,
  photos: File[] = [],
): Promise<{ ok: boolean; error?: string }> {
  const fd = new FormData();
  fd.append('access_key', cle);
  fd.append('subject', m.subject);
  fd.append('from_name', m.from_name);
  if (m.replyto) fd.append('replyto', m.replyto);
  for (const [k, v] of Object.entries(m.champs)) if (v) fd.append(asciiLabel(k), v);

  let jointes = 0;
  const perdues: string[] = [];
  for (const f of photos.slice(0, MAX_PIECES)) {
    const r = await reduire(f);
    if (r) { fd.append('attachment', r, r.name); jointes++; }
    else perdues.push(f.name);
  }
  // Mieux vaut un mail qui dit « 2 photos n'ont pas pu etre jointes » qu'un
  // artisan qui ignore que le client en avait envoye.
  if (perdues.length) fd.append('Photos non jointes', `${perdues.length} (trop lourdes) — les redemander`);
  else if (jointes) fd.append('Photos', `${jointes} jointe(s) a ce message`);

  try {
    const res = await fetch(API, { method: 'POST', body: fd });
    const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    // Web3Forms peut repondre 200 avec success:false — quota atteint, cle
    // revoquee. Se fier au seul code HTTP afficherait « envoye » sur un mail
    // jamais parti.
    if (res.ok && data?.success !== false) return { ok: true };
    return { ok: false, error: data?.message ?? `HTTP ${res.status}` };
  } catch {
    return { ok: false, error: 'réseau' };
  }
}
