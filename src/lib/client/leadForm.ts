/* ===========================================================================
 * CZIR62 — Envoi d'une demande (client)
 * ---------------------------------------------------------------------------
 * Couche partagee par tous les points de conversion : formulaire de devis,
 * diagnostic, estimateur, assistant fuite. Un seul endroit ou l'attribution
 * est jointe, ou les erreurs sont traduites, ou le format est decide.
 *
 * Si PUBLIC_LEAD_ENDPOINT est defini, les demandes partent vers cet endpoint
 * externe (cas d'un hebergement 100% statique sans runtime Node). Sinon,
 * elles passent par /api/lead/.
 * ========================================================================= */

import { getAttribution, track } from './tracking';
import { envoyerWeb3Forms } from './web3forms';
import type { LeadOrigin } from '../leads/types';

const ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT || '/api/lead/';

/**
 * Quand cette cle est definie, /api/lead/ valide, enrichit et journalise,
 * mais c'est le navigateur qui livre le mail — Web3Forms refuse les appels
 * serveur sur le plan gratuit. Voir ./web3forms.ts.
 */
const W3F = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

export interface SubmitInput {
  origin: LeadOrigin;
  nom: string;
  telephone: string;
  email?: string;
  commune?: string;
  codePostal?: string;
  prestation?: string;
  message?: string;
  reponses?: Record<string, string | string[]>;
  /** Horodatage d'affichage du formulaire — controle de vitesse cote serveur */
  startedAt?: number;
  /** Valeur du champ piege */
  hp?: string;
}

export interface SubmitResult {
  ok: boolean;
  id?: string;
  error?: string;
  field?: string;
}

export async function submitLead(input: SubmitInput, files: File[] = []): Promise<SubmitResult> {
  const payload = {
    origin: input.origin,
    nom: input.nom,
    telephone: input.telephone,
    email: input.email,
    commune: input.commune,
    codePostal: input.codePostal,
    prestation: input.prestation,
    message: input.message,
    reponses: input.reponses,
    attribution: getAttribution(),
    _hp: input.hp ?? '',
    _t: input.startedAt ?? Date.now() - 10_000,
  };

  try {
    let res: Response;

    if (files.length) {
      const fd = new FormData();
      fd.append('payload', JSON.stringify(payload));
      for (const f of files) fd.append('photos', f);
      res = await fetch(ENDPOINT, { method: 'POST', body: fd });
    } else {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    const data = (await res.json().catch(() => ({}))) as SubmitResult;

    if (res.ok && data.ok) {
      // La validation est passee cote serveur ; la livraison part d'ici.
      if (W3F) {
        const env = await envoyerWeb3Forms(
          W3F,
          {
            subject: `[${data.id ?? 'CZIR'}] ${input.prestation ?? 'Demande'} — ${input.nom}${input.commune ? ` (${input.commune})` : ''}`,
            from_name: 'Site CZIR62',
            replyto: input.email,
            champs: {
              Nom: input.nom,
              Telephone: input.telephone,
              Email: input.email ?? '',
              Commune: [input.codePostal, input.commune].filter(Boolean).join(' '),
              Prestation: input.prestation ?? '',
              Message: input.message ?? '',
              ...Object.fromEntries(
                Object.entries(input.reponses ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)]),
              ),
              Origine: input.origin,
              Provenance: [payload.attribution?.source, payload.attribution?.medium, payload.attribution?.campaign]
                .filter(Boolean)
                .join(' / '),
              'Page de conversion': String(payload.attribution?.conversionPage ?? ''),
            },
          },
          files,
        );
        // Afficher « demande envoyee » alors que le mail n'est pas parti
        // ferait disparaitre un client en silence. On dit la verite.
        if (!env.ok) {
          return {
            ok: false,
            error: "L'envoi a échoué. Appelez-nous directement, nous prenons la demande par téléphone.",
          };
        }
      }

      track('quote_submit', {
        origine: input.origin,
        prestation: input.prestation ?? '',
        commune: input.commune ?? '',
        lead_id: data.id ?? '',
        avec_photos: files.length > 0,
      });
      return { ok: true, id: data.id };
    }

    return {
      ok: false,
      error: data.error ?? "L'envoi a échoué. Réessayez ou appelez-nous directement.",
      field: data.field,
    };
  } catch {
    return {
      ok: false,
      error: "Connexion impossible. Vérifiez votre réseau, ou appelez-nous directement.",
    };
  }
}

/** Validation FR, identique cote client et cote serveur */
export const PHONE_FR = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

export function validPhone(v: string): boolean {
  return PHONE_FR.test(v.trim());
}

/** Limite et filtre les fichiers ajoutes depuis un telephone */
export function filterImages(list: FileList | File[], max = 4): { files: File[]; error?: string } {
  const all = Array.from(list);
  const images = all.filter((f) => f.type.startsWith('image/'));
  const tooBig = images.filter((f) => f.size > 8 * 1024 * 1024);
  const kept = images.filter((f) => f.size <= 8 * 1024 * 1024).slice(0, max);

  let error: string | undefined;
  if (images.length < all.length) error = 'Seules les photos peuvent être ajoutées.';
  else if (tooBig.length) error = 'Une photo dépassait 8 Mo et n’a pas été retenue.';
  else if (images.length > max) error = `Maximum ${max} photos.`;

  return { files: kept, error };
}
