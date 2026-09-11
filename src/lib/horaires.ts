/* ===========================================================================
 * Mise en forme des horaires
 * ---------------------------------------------------------------------------
 * Les jours sont stockes en anglais complet dans src/config/site.ts : c'est la
 * seule graphie que schema.org accepte pour dayOfWeek. La traduction en
 * francais est purement d'affichage et vit ici, en un seul exemplaire — elle
 * etait auparavant recopiee dans Footer.astro et dans la page contact.
 * ========================================================================= */
const JOURS: Record<string, string> = {
  Monday: 'Lundi', Tuesday: 'Mardi', Wednesday: 'Mercredi',
  Thursday: 'Jeudi', Friday: 'Vendredi', Saturday: 'Samedi', Sunday: 'Dimanche',
};

/** « Lundi – Vendredi », ou « Samedi » pour un jour isole. */
export function joursLabel(d: readonly string[]): string {
  const nom = (x: string) => JOURS[x] ?? x;
  return d.length > 1 ? `${nom(d[0])} – ${nom(d[d.length - 1])}` : nom(d[0]);
}

/** « 9h » plutot que « 09:00 », et « 9h30 » quand il y a des minutes. */
export function heureLabel(h: string): string {
  const [hh, mm] = h.split(':');
  return mm && mm !== '00' ? `${Number(hh)}h${mm}` : `${Number(hh)}h`;
}

/** Ligne complete : « Lundi – Vendredi : 9h – 12h ». */
export function plageLabel(p: { days: readonly string[]; opens: string; closes: string }): string {
  return `${joursLabel(p.days)} : ${heureLabel(p.opens)} – ${heureLabel(p.closes)}`;
}
