#!/usr/bin/env node
/* ===========================================================================
 * Republication du build sous un sous-chemin (GitHub Pages)
 * ---------------------------------------------------------------------------
 * GitHub Pages sert un depot de projet sous /<repo>/. Le site, lui, est
 * construit pour la racine d'un domaine et tous ses liens internes sont ecrits
 * en dur (`href="/couverture/"`).
 *
 * L'option `base` d'Astro NE reecrit PAS ces liens : elle ne touche qu'aux
 * assets generes et a import.meta.env.BASE_URL. La regler ici casserait les
 * 3 252 liens internes du site.
 *
 * Ce script travaille donc uniquement sur `dist/`, apres le build, et
 * uniquement dans le workflow Pages. AUCUN fichier source n'est modifie et la
 * mise en production sur czir62.fr n'est pas concernee.
 *
 * Ce qui est deliberement laisse intact :
 *   - les <link rel="canonical"> et les URL absolues du JSON-LD, qui pointent
 *     vers https://www.czir62.fr. C'est voulu : couple au robots.txt de
 *     preview, cela garantit qu'aucune URL github.io ne sera indexee ni ne
 *     viendra concurrencer le futur site.
 *
 * Usage : node scripts/pages-rebase.mjs <dossier> <prefixe>
 *         node scripts/pages-rebase.mjs dist/client /czir62
 * ========================================================================= */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const [dir, prefixArg] = process.argv.slice(2);
if (!dir || !prefixArg) {
  console.error('usage: pages-rebase.mjs <dossier> <prefixe>');
  process.exit(1);
}
const prefix = '/' + prefixArg.replace(/^\/|\/$/g, '');

/* Un chemin absolu interne commence par « / » mais jamais par « // »
   (protocole-relatif) ni par le prefixe deja pose. */
const interne = new RegExp(`(?<=(?:href|src|action|content)=")/(?!/|${prefix.slice(1)}/)`, 'g');
const dansSrcset = new RegExp(`(?<=srcset=")/(?!/|${prefix.slice(1)}/)`, 'g');
const dansSrcsetSuite = new RegExp(`(?<=,\\s)/(?!/|${prefix.slice(1)}/)`, 'g');
const dansCss = new RegExp(`url\\((['"]?)/(?!/|${prefix.slice(1)}/)`, 'g');

function fichiers(racine) {
  const out = [];
  for (const e of readdirSync(racine)) {
    const p = join(racine, e);
    if (statSync(p).isDirectory()) out.push(...fichiers(p));
    else out.push(p);
  }
  return out;
}

let html = 0, css = 0, liens = 0;
for (const f of fichiers(dir)) {
  const ext = extname(f);
  if (ext !== '.html' && ext !== '.css') continue;
  const avant = readFileSync(f, 'utf8');
  let apres = avant;

  if (ext === '.html') {
    apres = apres
      .replace(interne, `${prefix}/`)
      .replace(dansSrcset, `${prefix}/`)
      .replace(dansSrcsetSuite, `${prefix}/`);
  }
  apres = apres.replace(dansCss, (_, q) => `url(${q}${prefix}/`);

  if (apres !== avant) {
    // Compte des occurrences reellement reecrites, pour le journal du workflow.
    liens += (apres.match(new RegExp(prefix + '/', 'g')) || []).length
           - (avant.match(new RegExp(prefix + '/', 'g')) || []).length;
    writeFileSync(f, apres);
    ext === '.html' ? html++ : css++;
  }
}

/* Une preview ne doit jamais entrer dans l'index : le site definitif vivra sur
   czir62.fr et n'a pas a se retrouver en concurrence avec lui. */
writeFileSync(join(dir, 'robots.txt'),
  '# Preview de recette — ne pas indexer.\n' +
  '# Le site de production est https://www.czir62.fr\n' +
  'User-agent: *\nDisallow: /\n');

/* Sans ce fichier, Jekyll ignore les dossiers commencant par « _ » :
   tout le CSS et le JS de /_astro/ disparaitraient silencieusement. */
writeFileSync(join(dir, '.nojekyll'), '');

console.log(`  ${html} pages et ${css} feuilles reecrites sous ${prefix}/ (${liens} references)`);
console.log('  robots.txt de preview et .nojekyll ecrits');
