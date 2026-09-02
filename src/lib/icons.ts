/* ===========================================================================
 * CZIR62 — Jeu de pictogrammes
 * ---------------------------------------------------------------------------
 * Dessines specifiquement pour le metier : une ferme de charpente ressemble a
 * une ferme, un profil de gouttiere a un profil de gouttiere. On evite le
 * pictogramme « maison generique » decline dix fois qui fait immediatement
 * site de couvreur interchangeable.
 *
 * Tout est inline (aucune requete reseau, aucune police d'icones) et herite
 * de currentColor.
 * ========================================================================= */

export type IconName =
  // Metier
  | 'roof' | 'renovation' | 'repair' | 'leak' | 'gutter' | 'truss'
  | 'velux' | 'cladding' | 'frame' | 'extension' | 'tile' | 'chimney'
  | 'flat' | 'seam'
  // Interface
  | 'phone' | 'mail' | 'pin' | 'clock' | 'star' | 'check' | 'arrow-right'
  | 'chevron-down' | 'camera' | 'quote' | 'ruler' | 'shield' | 'storefront'
  | 'calendar' | 'search' | 'alert' | 'route' | 'menu' | 'close' | 'sparkle';

/** Contenu interne du <svg>. viewBox 0 0 24 24, trait 1.5. */
export const icons: Record<IconName, string> = {
  /* ------------------------------- metier ------------------------------- */
  // Pan de toiture avec rangs de tuiles
  roof: `<path d="M2 12.6 12 4.2l10 8.4"/><path d="M4.8 14.9h14.4"/><path d="M6.6 17.6h10.8"/><path d="M8.4 20.2h7.2"/>`,
  // Toiture dont la moitie droite est refaite : ancien (pointille) / neuf (plein)
  renovation: `<path d="M2 12.6 12 4.2l10 8.4"/><path d="M12 4.6v15.6"/><path d="M14.6 14.9h4.6"/><path d="M15.9 17.6h3.3"/><path d="M4.8 14.9h1.6M8.2 14.9h1.4"/><path d="M6.6 17.6h1.5M9.6 17.6h1.4"/>`,
  // Tuile deplacee sur un rampant
  repair: `<path d="M3 13.4 12 5.4l9 8"/><path d="M5.6 15.7h12.8"/><path d="M7.4 18.4h9"/><rect x="12.6" y="8.4" width="6.2" height="4.3" rx="0.6" transform="rotate(-19 12.6 8.4)"/>`,
  // Plafond + goutte qui tombe
  leak: `<path d="M3 5.2h18"/><path d="M7.5 5.2v2.1M12 5.2v1.4M16.5 5.2v2.4"/><path d="M12 11.2c-1.9 2.3-2.9 3.9-2.9 5.2a2.9 2.9 0 0 0 5.8 0c0-1.3-1-2.9-2.9-5.2Z"/>`,
  // Profil de gouttiere pendante + descente
  gutter: `<path d="M3 6.5h13.5a2.6 2.6 0 0 1 0 5.2H3Z"/><path d="M3 6.5v5.2"/><path d="M14.6 11.7v3.1a2 2 0 0 0 2 2h.8a2 2 0 0 1 2 2V21"/><path d="M6 9.1h6"/>`,
  // Ferme de charpente : arbaletriers, entrait, poincon, contrefiches
  truss: `<path d="M2.4 18.4 12 5.1l9.6 13.3z"/><path d="M2.4 18.4h19.2"/><path d="M12 5.1v13.3"/><path d="m7.6 18.4 4.4-6M16.4 18.4 12 12.4"/>`,
  // Fenetre de toit posee dans un rampant
  velux: `<path d="M2.6 19.2 8.4 5.4h12.3l-4.2 13.8z"/><rect x="7.7" y="8.6" width="8.4" height="7.4" rx="0.7" transform="rotate(-6 7.7 8.6)"/><path d="M8 12.5l8.2-.9"/>`,
  // Lames de bardage verticales sur un pignon
  cladding: `<path d="M4 20.5V9.3L12 3.5l8 5.8v11.2z"/><path d="M8 10.4v10.1M12 8v12.5M16 10.4v10.1"/>`,
  // Ossature : montants et lisses
  frame: `<rect x="3.2" y="5" width="17.6" height="14" rx="1"/><path d="M8.1 5v14M12 5v14M15.9 5v14"/><path d="M3.2 12h17.6"/>`,
  // Volume existant + volume ajoute (pointille)
  extension: `<path d="M3 20.4v-8.1l5.6-4.2 5.6 4.2v8.1z"/><path d="M14.2 20.4v-6.2h6.8v6.2z" stroke-dasharray="2.6 2.2"/><path d="M8.6 20.4v-4.6h0"/>`,
  // Tuile mecanique isolee
  tile: `<path d="M4 8.4h13.2a2.8 2.8 0 0 1 2.8 2.8v4.4H6.8A2.8 2.8 0 0 1 4 12.8z"/><path d="M8.6 8.6v7M13.4 8.6v7"/>`,
  // Toiture-terrasse : acrotere releve et support plat
  flat: `<path d="M2.6 12.9 6.4 8.4h11.2l3.8 4.5"/><path d="M2.6 12.9v6.7h18.8v-6.7z"/><path d="M2.6 12.9h18.8"/><path d="M6.5 16.2h11"/>`,
  // Couverture metallique a joint debout : rampant nervure
  seam: `<path d="M3.4 19.6 8.9 5.4h11.7l-5.5 14.2z"/><path d="M10.4 5.4 6.9 19.6M14.1 5.4 10.6 19.6M17.8 5.4 14.3 19.6"/>`,
  // Souche de cheminee sur rampant
  chimney: `<path d="M2 15.4 12 7l10 8.4"/><path d="M15.4 9.9V4.6h3.4v8.2"/><path d="M14.6 4.6h5"/><path d="M4.8 17.7h14.4"/>`,

  /* ----------------------------- interface ------------------------------ */
  phone: `<path d="M6.3 3.6h3.1l1.6 4-2 1.3a11.3 11.3 0 0 0 5.1 5.1l1.3-2 4 1.6v3.1a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.3 5.8a2 2 0 0 1 2-2.2Z"/>`,
  mail: `<rect x="2.8" y="5" width="18.4" height="14" rx="2"/><path d="m3.4 6.4 8.6 6.2 8.6-6.2"/>`,
  pin: `<path d="M12 21.2s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10.1" r="2.6"/>`,
  clock: `<circle cx="12" cy="12" r="8.8"/><path d="M12 6.9V12l3.4 2"/>`,
  star: `<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>`,
  check: `<path d="m4.6 12.4 4.8 4.8 10-10.4"/>`,
  'arrow-right': `<path d="M4.5 12h15"/><path d="m13.2 5.6 6.3 6.4-6.3 6.4"/>`,
  'chevron-down': `<path d="m5.6 9 6.4 6.4L18.4 9"/>`,
  camera: `<path d="M3 8.4h3.6l1.5-2.2h7.8l1.5 2.2H21a1 1 0 0 1 1 1v9.3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.4a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.7" r="3.5"/>`,
  quote: `<path d="M9.4 6.4C6.5 7.7 5 9.9 5 13v4.6h5.6V12H7.9c0-1.9.6-3.2 2.1-4zM20.2 6.4c-2.9 1.3-4.4 3.5-4.4 6.6v4.6h5.6V12h-2.7c0-1.9.6-3.2 2.1-4z"/>`,
  ruler: `<rect x="2.2" y="8.2" width="19.6" height="7.6" rx="1.2"/><path d="M6.4 8.4v3M10 8.4v4.6M13.6 8.4v3M17.2 8.4v4.6"/>`,
  shield: `<path d="M12 3.2 4.8 6v6c0 4.3 3 7.5 7.2 8.8 4.2-1.3 7.2-4.5 7.2-8.8V6z"/><path d="m8.9 12 2.2 2.3 4-4.4"/>`,
  // Devanture avec store — reference au local reel
  storefront: `<path d="M3.4 9.6h17.2v10.6H3.4z"/><path d="M2.6 9.6 4.4 4.4h15.2l1.8 5.2z"/><path d="M9 20.2v-6.1h6v6.1"/><path d="M7.7 4.6 7 9.6M16.3 4.6l.7 5"/>`,
  calendar: `<rect x="3.2" y="5.4" width="17.6" height="15.2" rx="2"/><path d="M3.2 10h17.6"/><path d="M8.2 3.4v4M15.8 3.4v4"/>`,
  search: `<circle cx="10.8" cy="10.8" r="6.6"/><path d="m15.6 15.6 4.4 4.4"/>`,
  alert: `<path d="M12 4.2 21.3 20H2.7z"/><path d="M12 10.2v4.1"/><circle cx="12" cy="17.1" r="0.9" fill="currentColor" stroke="none"/>`,
  route: `<circle cx="6.2" cy="6.2" r="2.6"/><circle cx="17.8" cy="17.8" r="2.6"/><path d="M8.8 6.2h5.4a3.6 3.6 0 0 1 0 7.2H9.8a3.6 3.6 0 0 0 0 7.2h.6"/>`,
  menu: `<path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h16.8"/>`,
  close: `<path d="M6 6l12 12M18 6 6 18"/>`,
  sparkle: `<path d="M12 3.4 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9z"/><path d="M18.6 4v3M20.1 5.5h-3"/>`,
};

export function hasIcon(name: string): name is IconName {
  return name in icons;
}
