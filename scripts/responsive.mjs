#!/usr/bin/env node
/* ===========================================================================
 * Déclinaisons responsives
 * ---------------------------------------------------------------------------
 * `sizes` sans `srcset` ne sert a rien : le navigateur telecharge l'unique
 * fichier declare, quelle que soit la taille d'affichage. Un telephone de
 * 390 px recuperait donc un JPEG de 1600 px et 550 Ko pour un emplacement de
 * 360 px de large.
 *
 * On genere donc plusieurs largeurs par image, en WebP et en JPEG, et
 * PhotoSlot emet un vrai srcset. Les fichiers portent le suffixe -<largeur>,
 * les originaux restent la comme repli.
 * ========================================================================= */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LARGEURS = [480, 800, 1200, 1600];
const DOSSIERS = ['accueil', 'services', 'realisations', 'local', 'chantiers'];

let faits = 0, ignores = 0;
for (const d of DOSSIERS) {
  const dir = join('public/images', d);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.jpg') || /-\d+\.jpg$/.test(f)) continue;
    const src = join(dir, f);
    const base = f.replace(/\.jpg$/, '');
    const meta = await sharp(src).metadata();
    for (const w of LARGEURS) {
      if (w > meta.width) { ignores++; continue; }
      const img = sharp(src).resize({ width: w, withoutEnlargement: true });
      await img.clone().webp({ quality: w <= 800 ? 70 : 66, effort: 6 })
        .toFile(join(dir, `${base}-${w}.webp`));
      await img.clone().jpeg({ quality: w <= 800 ? 74 : 70, mozjpeg: true })
        .toFile(join(dir, `${base}-${w}.jpg`));
      faits += 2;
    }
  }
}
console.log(`  ${faits} déclinaisons générées, ${ignores} largeurs ignorées (image trop petite)`);
