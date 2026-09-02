/**
 * CZIR62 — Import et nommage des photos de chantier
 * ---------------------------------------------------------------------------
 * Source de vérité unique du plan de nommage des images.
 *
 * CONVENTION
 *   services/     <prestation>-czir62.jpg              (visuel principal)
 *                 <prestation>-<precision>-czir62.jpg  (visuel secondaire)
 *   realisations/ <prestation>-avant-czir62.jpg / -apres-czir62.jpg
 *   accueil/      couvreur-bethune-czir62.jpg          (H1 de la page d'accueil)
 *   local/        devanture-czir62-bethune.jpg         (le local EST à Béthune)
 *   chantiers/    <sujet-descriptif>-czir62.jpg
 *
 * Le nom de fichier décrit le SUJET de la page ou le contenu de l'image, suivi
 * de la marque. Aucune commune n'apparaît en dehors de l'accueil et du local :
 * nous ne savons pas où les photos ont été prises, et un nom de fichier reste
 * un signal lu par les moteurs.
 *
 * Chaque image est produite en JPEG + WebP, métadonnées EXIF retirées, à une
 * largeur adaptée à son usage réel.
 *
 *   node scripts/importer-photos.mjs
 */
import sharp from 'sharp';
import { mkdir, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SRC = process.env.HOME + '/Downloads/';
const OUT = 'public/images';

/** [fichier source, chemin final, largeur cible] */
const PLAN = [
  // ─────────────────────────── accueil ─────────────────────────────────
  ['IMG_7731.jpg',                                  'accueil/couvreur-bethune-czir62.jpg', 1200],

  // ──────────────────── visuels principaux des prestations ─────────────
  ['c04bb214-6299-4a5d-b9ee-27403d79b9d6.JPG',      'services/couverture-czir62.jpg', 1200],
  ['aa4d5e00-5e9a-4cbd-b260-61172905c4b4.JPG',      'services/renovation-toiture-czir62.jpg', 1200],
  ['14b3466d-ae1e-4188-9417-b68d1ad99bf0.JPG',      'services/reparation-toiture-czir62.jpg', 1200],
  ['a847f04d-e1cf-433b-83d2-2a5b20362896.JPG',      'services/fuite-toiture-czir62.jpg', 1200],
  ['5d792cbe-a8e4-4623-87b5-bc6fc4c6e9c3.JPG',      'services/zinguerie-czir62.jpg', 1200],
  ['6e1876a0-dc97-4cca-90fd-0d46cecca872.JPG',      'services/etancheite-toiture-terrasse-czir62.jpg', 1400],
  ['23f8dde5-aba8-4840-ae0e-ef6aa84378a7.JPG',      'services/couverture-metallique-czir62.jpg', 1400],
  ['92b3132c-699a-43f5-90c8-cd2fb947b875.JPG',      'services/charpente-czir62.jpg', 1400],
  ['IMG_4707.JPG',                                  'services/pose-velux-czir62.jpg', 1400],
  ['IMG_7319.JPG',                                  'services/bardage-czir62.jpg', 1200],
  ['IMG_8001.JPG',                                  'services/ossature-bois-czir62.jpg', 1200],
  ['3563ab28-3724-4e34-ae21-c0cb99189d71.JPG',      'services/agrandissement-rehaussement-czir62.jpg', 1400],

  // ─────────────────── visuels secondaires des prestations ─────────────
  ['IMG_7716.jpg',                                  'services/renovation-toiture-charpente-czir62.jpg', 1200],
  ['d5af6b4d-0560-4784-a1f5-7d1c424ad5dc.JPG',      'services/reparation-toiture-constat-czir62.jpg', 1200],
  ['3d48b73f-4e90-44f1-b985-2fc49f135637.JPG',      'services/zinguerie-rive-czir62.jpg', 1200],
  ['3ac441bb-c43a-4b96-aa4a-f656f32535c6.JPG',      'services/etancheite-toiture-terrasse-membrane-czir62.jpg', 1200],
  ['82c37122-118a-4a15-b7c7-d7e7302b2f88.JPG',      'services/couverture-metallique-bac-acier-czir62.jpg', 1200],
  ['IMG_7711.jpg',                                  'services/charpente-voligeage-czir62.jpg', 1200],
  ['24ab2a74-d550-4bb3-af36-4705185ee5d6.JPG',      'services/pose-velux-chevetre-czir62.jpg', 1200],
  ['IMG_2484.JPG',                                  'services/ossature-bois-detail-czir62.jpg', 1200],
  ['IMG_9196.JPG',                                  'services/agrandissement-rehaussement-combles-czir62.jpg', 1200],

  // ────────────────────── comparatif avant / après ─────────────────────
  ['IMG_7737.jpg',                                  'realisations/renovation-toiture-avant-czir62.jpg', 1200],
  ['IMG_7738.jpg',                                  'realisations/renovation-toiture-apres-czir62.jpg', 1200],

  // ───────────────────────────── galerie ───────────────────────────────
  ['IMG_7744.jpg',        'chantiers/maison-de-maitre-toiture-czir62.jpg', 720],
  ['23f8dde5-aba8-4840-ae0e-ef6aa84378a7.JPG', 'chantiers/joint-debout-lucarne-czir62.jpg', 720],
  ['IMG_7732.jpg',        'chantiers/vehicules-entreprise-czir62.jpg', 720],
  ['IMG_9263.JPG',        'chantiers/bardage-metallique-czir62.jpg', 720],
  ['fdb4a94f-10ef-41bd-a3bd-3cf4e8a895dd.JPG', 'chantiers/charpente-sur-terrasse-czir62.jpg', 720],
  ['IMG_7722.jpg',        'chantiers/pose-de-tuiles-czir62.jpg', 720],
  ['IMG_7736.jpg',        'chantiers/couverture-deposee-czir62.jpg', 720],
  ['IMG_0915.JPG',        'chantiers/ossature-extension-czir62.jpg', 720],
  ['IMG_0845.JPG',        'chantiers/velux-vue-interieure-czir62.jpg', 720],
  ['814977c5-333b-4bc9-a737-3d331abb5626.JPG', 'chantiers/faitage-metallique-czir62.jpg', 720],
  ['IMG_7809.jpg',        'chantiers/aretier-ardoise-czir62.jpg', 720],
  ['IMG_7810.jpg',        'chantiers/croupe-liteaunage-czir62.jpg', 720],
  ['08ec5b33-13ff-45d1-a9f7-87c467de2e1b.JPG', 'chantiers/charpente-immeuble-czir62.jpg', 720],
  ['32ec0fff-c2a0-4da4-b8ab-8345cf11da1b.JPG', 'chantiers/etancheite-membrane-czir62.jpg', 720],
  ['5cc22649-5bc8-49a5-ac3c-63020b0cd9e4.JPG', 'chantiers/ecran-et-liteaux-czir62.jpg', 720],
  ['IMG_7812.jpg',        'chantiers/echafaudage-ardoise-czir62.jpg', 720],
  ['IMG_7813.jpg',        'chantiers/toiture-ardoise-terminee-czir62.jpg', 720],
  ['3e496b8f-4eaf-4b68-9736-4ada9ffb1e2a.JPG', 'chantiers/verriere-zinc-czir62.jpg', 720],
  ['IMG_7723.jpg',        'chantiers/charpente-neuve-czir62.jpg', 720],
  ['9  ',                 null, 0], // placeholder retiré ci-dessous
  ['IMG_7725.jpg',        'chantiers/mise-hors-deau-czir62.jpg', 720],
  ['IMG_7729.jpg',        'chantiers/liteaunage-en-cours-czir62.jpg', 720],
  ['IMG_7727.jpg',        'chantiers/deux-couvreurs-czir62.jpg', 720],
  ['1c25fec8-1ab4-4c0b-81f3-c29e5bd6c9eb.JPG', 'chantiers/tuiles-et-velux-czir62.jpg', 720],
  ['e9105284-e2ef-480e-9424-ef5f43b79513.JPG', 'chantiers/terrasse-terminee-czir62.jpg', 720],
  ['IMG_7728.jpg',        'chantiers/quadrillage-support-czir62.jpg', 720],
  ['IMG_6263.JPG',        'chantiers/finitions-interieures-czir62.jpg', 720],
  ['IMG_7719.jpg',        'chantiers/pose-isolant-czir62.jpg', 720],
  ['4668b57e-ecf4-4c0a-9257-8b95e541e159.JPG', 'chantiers/dependance-toiture-czir62.jpg', 720],
  ['IMG_7726.jpg',        'chantiers/toiture-quatre-pans-czir62.jpg', 720],
  ['ea47fd17-8afd-4f6d-8569-3a513d902672.JPG', 'chantiers/lanterneau-terrasse-czir62.jpg', 720],
].filter((e) => e[1]);

// Table rase : on repart du plan, pas de fichier orphelin qui traîne.
for (const d of ['accueil', 'services', 'realisations', 'chantiers']) {
  await rm(join(OUT, d), { recursive: true, force: true });
}

let n = 0, poids = 0, absents = [];
for (const [src, dest, w] of PLAN) {
  if (!existsSync(SRC + src)) { absents.push(src); continue; }
  const out = join(OUT, dest);
  await mkdir(dirname(out), { recursive: true });
  const base = await sharp(SRC + src).rotate().resize({ width: w, withoutEnlargement: true }).toBuffer();
  const jpg = await sharp(base).jpeg({ quality: 78, progressive: true, mozjpeg: true }).toBuffer();
  const webp = await sharp(base).webp({ quality: 76 }).toBuffer();
  await sharp(jpg).toFile(out);
  await sharp(webp).toFile(out.replace('.jpg', '.webp'));
  n++; poids += jpg.length + webp.length;
}

console.log(`  ${n} photos importées — ${(poids / 1024 / 1024).toFixed(1)} Mo (JPEG + WebP)`);
if (absents.length) console.log(`  ⚠ sources introuvables : ${absents.join(', ')}`);
for (const d of ['accueil', 'services', 'realisations', 'chantiers']) {
  const f = (await readdir(join(OUT, d))).filter((x) => x.endsWith('.jpg')).length;
  console.log(`     ${d.padEnd(14)} ${f}`);
}
