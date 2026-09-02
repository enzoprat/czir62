/**
 * Génère les images statiques dérivées de l'identité :
 *  - public/apple-touch-icon.png
 *  - public/images/og-default.jpg  (image de partage par défaut)
 *
 * À relancer si la charte change :  node scripts/generate-assets.mjs
 * Remplacer og-default.jpg par une vraie photo de chantier dès qu'elle est
 * disponible : une photo réelle convertit mieux qu'un visuel typographique.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="13" fill="#141A21"/>
  <path d="M12 34 32 15l20 19" fill="none" stroke="#C4794F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 42h26M24 50h16" stroke="#F3ECE1" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const OG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1D242C"/>
      <stop offset="100%" stop-color="#141A21"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#AE5A2F"/>

  <g transform="translate(96 104)">
    <path d="M0 96 L58 40 L116 96" fill="none" stroke="#C4794F" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 118h84M30 140h56" stroke="#F3ECE1" stroke-width="9" stroke-linecap="round" opacity="0.85"/>
  </g>

  <text x="96" y="392" font-family="Helvetica, Arial, sans-serif" font-size="104" font-weight="700" letter-spacing="-3" fill="#FFFFFF">CZIR62</text>
  <text x="96" y="452" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#C4794F" letter-spacing="1">Entreprise générale de couverture</text>
  <text x="96" y="506" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#9DAAB9">Couverture · Charpente · Zinguerie · Béthune (62)</text>

  <g opacity="0.13" transform="translate(760 130)">
    <path d="M0 300 L170 140 L340 300" fill="none" stroke="#F3ECE1" stroke-width="14" stroke-linejoin="round"/>
    <path d="M34 330h272M68 370h204" stroke="#F3ECE1" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>`;

await mkdir('public/images', { recursive: true });

await sharp(Buffer.from(ICON)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(OG)).jpeg({ quality: 86 }).toFile('public/images/og-default.jpg');

console.log('✓ apple-touch-icon.png et og-default.jpg générés');
