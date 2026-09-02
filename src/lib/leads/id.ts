/* ===========================================================================
 * Identifiant de lead — format CZIR-XXXXXX
 * ---------------------------------------------------------------------------
 * Sert de reference commune entre le site, le CRM, le devis et la facture.
 * On peut ainsi rattacher un chantier signe au lead d'origine, donc a sa
 * source d'acquisition, six mois plus tard.
 *
 * Alphabet volontairement reduit (hexadecimal majuscule) : lisible au
 * telephone, sans confusion possible entre O et 0 ou entre I et 1.
 * 16^6 = 16,7 millions de combinaisons — largement suffisant.
 * ========================================================================= */

const ALPHABET = '0123456789ABCDEF';

export function generateLeadId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const b of bytes) out += ALPHABET[b % 16];
  return `CZIR-${out}`;
}

/** Verifie qu'une chaine est un identifiant de lead valide */
export function isLeadId(value: string): boolean {
  return /^CZIR-[0-9A-F]{6}$/.test(value);
}
