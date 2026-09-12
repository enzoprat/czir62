#!/usr/bin/env node
/* ===========================================================================
 * Crawler local — Phase 1
 * ---------------------------------------------------------------------------
 * Parcourt le build de production (voir racineBuild), qui est exactement ce qui
 * sera deploye. Le site est statique : une seule passe suffit, il n'y a pas
 * de DOM differe a rendre.
 *
 * Sortie : .seo/crawl.sqlite, une ligne par URL, plus le graphe des liens
 * internes avec profondeur de clic et PageRank interne.
 * ========================================================================= */
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/* Racine du build. L'adaptateur decide ou il ecrit : Vercel sort dans
 * .vercel/output/static, l'adaptateur Node dans dist/client, un build sans
 * adaptateur dans dist. On prend le premier qui existe plutot que de coder
 * en dur un chemin qui change avec l'hebergeur. */
const racineBuild = () => {
  for (const d of ['.vercel/output/static', 'dist/client', 'dist']) {
    if (existsSync(join(d, 'index.html'))) return d;
  }
  console.error('Build absent ou incomplet — lancer npm run build.');
  process.exit(1);
};
const RACINE = racineBuild();

const fichiers = [];
(function marcher(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? marcher(p) : fichiers.push(p);
  }
})(RACINE);

const urlDe = (p) => ('/' + relative(RACINE, p).replace(/index\.html$/, '')).replace(/\/+/g, '/');
const texte = (h) => {
  const m = h.match(/<main[\s\S]*?<\/main>/i);
  let t = m ? m[0] : h;
  t = t.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, '');
  return t.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};
const attr = (s, a) => (s.match(new RegExp(a + '="([^"]*)"', 'i')) || [])[1] ?? null;

const pages = new Map();
for (const f of fichiers) {
  if (!f.endsWith('.html')) continue;
  const h = readFileSync(f, 'utf8');
  const u = urlDe(f);
  const corps = texte(h);

  const liens = [];
  const zone = (i) => {
    const avant = h.slice(0, i);
    if (/<header[^>]*>(?:(?!<\/header>)[\s\S])*$/i.test(avant)) return 'nav';
    if (/<footer[^>]*>(?:(?!<\/footer>)[\s\S])*$/i.test(avant)) return 'footer';
    return 'corps';
  };
  for (const m of h.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    liens.push({
      cible: href.split('#')[0].split('?')[0],
      ancre: m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 90),
      zone: zone(m.index),
    });
  }

  const images = [...h.matchAll(/<img[^>]*>/gi)].map((m) => {
    const s = m[0];
    const src = attr(s, 'src');
    let poids = null;
    if (src?.startsWith('/')) {
      const p = join(RACINE, src.slice(1));
      if (existsSync(p)) poids = statSync(p).size;
    }
    return {
      src, alt: attr(s, 'alt'), poids,
      largeur: attr(s, 'width'), hauteur: attr(s, 'height'),
      loading: attr(s, 'loading'), priorite: attr(s, 'fetchpriority'),
    };
  });

  pages.set(u, {
    url: u,
    title: (h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim() ?? null,
    description: attr(h, 'name="description" content') ?? (h.match(/name="description" content="([^"]*)"/) || [])[1] ?? null,
    h1: [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]*>/g, '').trim()),
    h2: [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].replace(/<[^>]*>/g, '').trim()),
    h3: [...h.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => m[1].replace(/<[^>]*>/g, '').trim()),
    canonical: (h.match(/rel="canonical" href="([^"]+)"/) || [])[1] ?? null,
    robots: (h.match(/name="robots" content="([^"]+)"/) || [])[1] ?? null,
    lang: (h.match(/<html[^>]*lang="([^"]+)"/) || [])[1] ?? null,
    mots: corps.split(/\s+/).filter(Boolean).length,
    jsonld: [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean),
    liens, images,
    poidsHtml: Buffer.byteLength(h),
  });
}

/* ------------------------------------------------------- graphe interne */
const cles = [...pages.keys()];
const entrants = new Map(cles.map((u) => [u, []]));
for (const [u, p] of pages)
  for (const l of p.liens)
    if (pages.has(l.cible) && l.cible !== u) entrants.get(l.cible).push({ de: u, ...l });

/* Profondeur de clic depuis l'accueil, en largeur d'abord */
const profondeur = new Map([['/', 0]]);
let file = ['/'];
while (file.length) {
  const suivant = [];
  for (const u of file)
    for (const l of pages.get(u)?.liens ?? [])
      if (pages.has(l.cible) && !profondeur.has(l.cible)) {
        profondeur.set(l.cible, profondeur.get(u) + 1);
        suivant.push(l.cible);
      }
  file = suivant;
}

/* PageRank interne, amorti 0,85, 40 iterations */
let pr = new Map(cles.map((u) => [u, 1 / cles.length]));
for (let i = 0; i < 40; i++) {
  const next = new Map(cles.map((u) => [u, 0.15 / cles.length]));
  for (const [u, p] of pages) {
    const sorties = [...new Set(p.liens.map((l) => l.cible).filter((c) => pages.has(c) && c !== u))];
    if (!sorties.length) { for (const v of cles) next.set(v, next.get(v) + (0.85 * pr.get(u)) / cles.length); continue; }
    for (const c of sorties) next.set(c, next.get(c) + (0.85 * pr.get(u)) / sorties.length);
  }
  pr = next;
}

const sortie = cles.map((u) => ({
  ...pages.get(u),
  profondeur: profondeur.get(u) ?? null,
  liensEntrants: entrants.get(u).length,
  liensEntrantsCorps: entrants.get(u).filter((l) => l.zone === 'corps').length,
  ancres: [...new Set(entrants.get(u).map((l) => l.ancre))].slice(0, 12),
  pagerank: +(pr.get(u) * 1000).toFixed(3),
}));

writeFileSync('.seo/crawl.json', JSON.stringify(sortie, null, 1));
console.log(`  ${sortie.length} URLs crawlées → .seo/crawl.json`);
console.log(`  orphelines (0 lien entrant) : ${sortie.filter((p) => p.liensEntrants === 0).map((p) => p.url).join(', ') || 'aucune'}`);
console.log(`  profondeur max : ${Math.max(...sortie.map((p) => p.profondeur ?? 0))} clic(s)`);
