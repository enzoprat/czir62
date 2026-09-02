/**
 * Inventaire des photos attendues par le site.
 *
 * Parcourt les composants et les pages, relève tous les chemins passés à
 * <PhotoSlot src="..."> ainsi que ceux déclarés dans les réalisations, puis
 * indique lesquels sont présents dans /public et lesquels manquent.
 *
 *   npm run photos
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src/pages', 'src/components', 'src/content'];
const found = new Map(); // chemin -> [fichiers sources]

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { await walk(full); continue; }
    if (entry.name.startsWith('_')) continue;   // gabarits : ignorés par Astro
    if (!['.astro', '.md', '.ts'].includes(extname(entry.name))) continue;

    const text = await readFile(full, 'utf8');
    for (const m of text.matchAll(/["'`](\/images\/[^"'`\s)]+\.(?:jpg|jpeg|png|webp|avif|svg))["'`]/g)) {
      const path = m[1];
      if (!found.has(path)) found.set(path, new Set());
      found.get(path).add(full);
    }
  }
}

for (const root of ROOTS) if (existsSync(root)) await walk(root);

const entries = [...found.entries()].sort(([a], [b]) => a.localeCompare(b));
const manquantes = entries.filter(([p]) => !existsSync(join('public', p.replace(/^\//, ''))));
const presentes = entries.length - manquantes.length;

console.log(`\n  Photos référencées : ${entries.length}`);
console.log(`  Présentes          : ${presentes}`);
console.log(`  Manquantes         : ${manquantes.length}\n`);

if (manquantes.length) {
  console.log('  À DÉPOSER DANS /public :\n');
  for (const [path, sources] of manquantes) {
    console.log(`  ${path}`);
    for (const s of sources) console.log(`      ← ${s}`);
  }
  console.log('\n  Déposez le fichier au chemin indiqué : il s’affichera au build suivant,');
  console.log('  sans aucune modification de code.\n');
} else {
  console.log('  Toutes les photos référencées sont présentes.\n');
}
