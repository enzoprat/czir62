#!/usr/bin/env node
/* ===========================================================================
 * IndexNow — signaler une mise a jour a Bing, Yandex, Seznam et Naver
 * ---------------------------------------------------------------------------
 * Un ping remplace l'attente d'un passage de crawler : la page est relue en
 * quelques minutes au lieu de quelques jours. Google ne participe pas au
 * protocole ; pour lui, seuls le sitemap et l'inspection d'URL comptent.
 *
 * La cle n'est pas un secret : elle est publiee a la racine du site, c'est
 * ainsi que le protocole prouve que l'on controle bien le domaine.
 *
 *   npm run indexnow                    -> toutes les URLs du sitemap
 *   npm run indexnow -- /fuite-toiture/ -> seulement celles-la
 *
 * IndexNow sert a signaler un CHANGEMENT. Repousser les 33 URLs a chaque
 * build n'accelere rien et use le quota : passer les chemins modifies.
 * ========================================================================= */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const HOTE = 'www.czir62.fr';
const SITE = `https://${HOTE}`;

const racineBuild = () => {
  for (const d of ['.vercel/output/static', 'dist/client', 'dist']) {
    if (existsSync(join(d, 'index.html'))) return d;
  }
  console.error('Build absent — lancer npm run build.');
  process.exit(1);
};
const racine = racineBuild();

const cle = readdirSync('public').find((f) => /^[0-9a-f]{8,128}\.txt$/.test(f))?.replace(/\.txt$/, '');
if (!cle) {
  console.error('Aucune cle IndexNow dans public/ — attendu un fichier <cle hexa>.txt');
  process.exit(1);
}

const args = process.argv.slice(2).filter((a) => a.startsWith('/'));
let urls;
if (args.length) {
  urls = args.map((p) => SITE + p);
} else {
  const sm = join(racine, 'sitemap-0.xml');
  if (!existsSync(sm)) { console.error(`${sm} introuvable.`); process.exit(1); }
  urls = [...readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// Une URL qui repond 404 fait rejeter le lot entier : on verifie avant.
const mortes = [];
for (const u of urls) {
  const r = await fetch(u, { method: 'HEAD', redirect: 'manual' }).catch(() => null);
  if (!r || r.status !== 200) mortes.push(`${r?.status ?? 'erreur'} ${u}`);
}
if (mortes.length) {
  console.error(`${mortes.length} URL(s) ne repondent pas 200 — rien n'est envoye :`);
  mortes.forEach((m) => console.error('  ' + m));
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOTE, key: cle, keyLocation: `${SITE}/${cle}.txt`, urlList: urls }),
});

const sens = {
  200: 'accepte',
  202: 'accepte — cle en cours de validation',
  400: 'requete invalide',
  403: 'cle refusee : verifier qu\'elle est bien servie a la racine',
  422: 'URLs hors du domaine declare',
  429: 'trop de requetes',
};
console.log(`${urls.length} URL(s) — HTTP ${res.status} : ${sens[res.status] ?? 'reponse inattendue'}`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
