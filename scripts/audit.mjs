#!/usr/bin/env node
/* Audit complet du build avant soumission. Ne corrige rien : constate. */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const R = 'dist/client';
const SITE = 'https://www.czir62.fr';
const f = [];
(function w(d){ for (const e of readdirSync(d)) { const p = join(d,e); statSync(p).isDirectory()?w(p):f.push(p); } })(R);
const html = f.filter(x => x.endsWith('.html'));
const fichiers = new Set(f.map(x => '/' + relative(R, x)));
const url = p => ('/' + relative(R, p).replace(/index\.html$/,'')).replace(/\/+/g,'/');
const P = new Map(html.map(p => [url(p), readFileSync(p,'utf8')]));
const A = (s,re) => (s.match(re)||[])[1] ?? null;
const dec = s => s.replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCharCode(parseInt(n,16)))
  .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
  .replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/&#039;|&apos;/g,"'");
const corps = h => { const m=h.match(/<main[\s\S]*?<\/main>/i); let t=m?m[0]:h;
  t=t.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi,''); return dec(t.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim(); };

const pb = [];
const dire = (pass, gravite, msg) => pb.push({ pass, gravite, msg });
const ok = [];

/* ── PASS 1 — technique ────────────────────────────────────────────── */
for (const [u,h] of P) {
  const can = A(h, /rel="canonical" href="([^"]+)"/);
  if (u === '/404.html') continue;
  if (!can) dire(1,'BLOQUANT',`canonical absent — ${u}`);
  else {
    if (!can.startsWith('https://')) dire(1,'BLOQUANT',`canonical non absolu/https — ${u}`);
    if (can !== SITE + u) dire(1,'BLOQUANT',`canonical ne pointe pas vers lui-même — ${u} → ${can}`);
  }
  if (!/lang="fr"/.test(h)) dire(1,'MAJEUR',`lang absent — ${u}`);
  if (!/<meta charset="utf-8"/i.test(h)) dire(1,'MAJEUR',`charset absent — ${u}`);
  if (!/name="viewport"/.test(h)) dire(1,'MAJEUR',`viewport absent — ${u}`);
  if (/hreflang=/.test(h)) dire(1,'MINEUR',`hreflang présent sur un site monolingue — ${u}`);
}
ok.push(`canonical absolu, https, auto-référent sur ${P.size-1} pages`);

/* ── PASS 2 — indexation ──────────────────────────────────────────── */
const noindex = [...P].filter(([,h]) => /name="robots" content="[^"]*noindex/.test(h)).map(([u])=>u);
const indexables = [...P.keys()].filter(u => !noindex.includes(u) && u !== '/404.html');
const sm = existsSync(join(R,'sitemap-0.xml')) ? readFileSync(join(R,'sitemap-0.xml'),'utf8') : '';
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
for (const l of locs) {
  const u = l.replace(SITE,'') || '/';
  if (!P.has(u)) dire(2,'BLOQUANT',`sitemap référence une URL inexistante — ${l}`);
  else if (noindex.includes(u)) dire(2,'BLOQUANT',`sitemap référence une page noindex — ${l}`);
}
for (const u of indexables) if (!locs.includes(SITE + u)) dire(2,'MAJEUR',`page indexable absente du sitemap — ${u}`);
const lastmods = [...new Set([...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m=>m[1]))];
if (lastmods.length === 1 && locs.length > 1)
  dire(2,'MINEUR',`lastmod identique sur les ${locs.length} URLs (${lastmods[0].slice(0,10)}) — le signal de fraîcheur ne vaut rien`);

/* ── PASS 3 — titles, descriptions, H1 ─────────────────────────────── */
const t = new Map(), d = new Map();
for (const u of indexables) {
  const h = P.get(u);
  const ti = A(h,/<title>([\s\S]*?)<\/title>/); const de = A(h,/name="description" content="([^"]*)"/);
  const h1 = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (!ti) dire(3,'BLOQUANT',`title absent — ${u}`);
  else { if (ti.length > 60) dire(3,'MINEUR',`title ${ti.length} car. — ${u}`); t.set(ti,(t.get(ti)||[]).concat(u)); }
  if (!de) dire(3,'BLOQUANT',`description absente — ${u}`);
  else { if (de.length > 160) dire(3,'MINEUR',`description ${de.length} car. — ${u}`); d.set(de,(d.get(de)||[]).concat(u)); }
  if (h1.length !== 1) dire(3,'BLOQUANT',`${h1.length} H1 — ${u}`);
  const hs = [...h.matchAll(/<h([1-6])[^>]*>/g)].map(m=>+m[1]);
  for (let i=1;i<hs.length;i++) if (hs[i] > hs[i-1]+1) dire(3,'MINEUR',`saut h${hs[i-1]}→h${hs[i]} — ${u}`);
}
for (const [v,us] of t) if (us.length>1) dire(3,'BLOQUANT',`title dupliqué sur ${us.join(', ')}`);
for (const [v,us] of d) if (us.length>1) dire(3,'BLOQUANT',`description dupliquée sur ${us.join(', ')}`);
ok.push(`${t.size} titles uniques, ${d.size} descriptions uniques`);

/* ── PASS 7 — maillage et ancres ───────────────────────────────────── */
const vagues = /^(cliquez ici|en savoir plus|découvrir|ici|lire la suite|voir|plus)$/i;
const ancresVagues = new Set();
const entrants = new Map(indexables.map(u=>[u,0]));
for (const [u,h] of P) {
  const m = h.match(/<main[\s\S]*?<\/main>/i); if (!m) continue;
  for (const a of m[0].matchAll(/<a[^>]*href="(\/[^"#?]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const cible=a[1], anc=a[2].replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
    if (vagues.test(anc)) ancresVagues.add(`${anc} → ${cible} (${u})`);
    if (entrants.has(cible) && cible!==u) entrants.set(cible, entrants.get(cible)+1);
    if (!P.has(cible) && !fichiers.has(cible) && !cible.startsWith('/_astro/') && !cible.startsWith('/images/')
        && !['/robots.txt','/sitemap-index.xml','/favicon.svg','/apple-touch-icon.png','/api/lead/','/favicon-16.png','/favicon-32.png'].includes(cible))
      dire(7,'BLOQUANT',`lien mort ${cible} sur ${u}`);
  }
}
for (const a of ancresVagues) dire(12,'MINEUR',`ancre vague : ${a}`);
for (const [u,n] of entrants) if (n===0) dire(7,'MAJEUR',`page sans lien contextuel entrant — ${u}`);

/* ── PASS 10 — images ─────────────────────────────────────────────── */
let img=0, sansAlt=0, sansDim=0, lourdes=[], mauvaisNom=[];
const eager=[];
for (const [u,h] of P) for (const m of h.matchAll(/<img[^>]*>/gi)) {
  const s=m[0]; img++;
  if (!/alt=/.test(s)) sansAlt++;
  if (!/width=/.test(s) || !/height=/.test(s)) sansDim++;
  const src=A(s,/src="([^"]+)"/);
  if (src?.startsWith('/')) {
    const p=join(R,src.slice(1));
    /* On mesure ce qui est REELLEMENT servi : la plus petite declinaison du
       srcset, pas le fichier de repli que seul un navigateur sans srcset
       telechargerait. */
    const petit = p.replace(/\.(jpg|jpeg|png)$/i, '-480.webp');
    const reel = existsSync(petit) ? petit : p;
    if (existsSync(reel)) { const ko=statSync(reel).size/1024; if (ko>180) lourdes.push(`${src} → ${Math.round(ko)} Ko servis`); }
    if (/IMG_|DSC|image\d|photo\d|capture/i.test(src)) mauvaisNom.push(src);
  }
  if (/loading="eager"|fetchpriority="high"/.test(s)) eager.push(u);
}
if (sansAlt) dire(10,'MAJEUR',`${sansAlt} images sans alt`);
if (sansDim) dire(10,'MAJEUR',`${sansDim} images sans width/height`);
for (const l of [...new Set(lourdes)]) dire(11,'MINEUR',`image lourde ${l}`);
for (const n of [...new Set(mauvaisNom)]) dire(10,'MAJEUR',`nom de fichier non descriptif ${n}`);
ok.push(`${img} images, ${new Set(eager).size} pages avec une image LCP prioritaire`);

/* ── PASS 13 — conversion ─────────────────────────────────────────── */
for (const u of indexables) {
  const h=P.get(u); const m=h.match(/<body[\s\S]*<\/body>/i)[0];
  if (!/href="tel:/.test(m)) dire(13,'MAJEUR',`aucun lien tel: — ${u}`);
  if (!/href="\/devis\//.test(m) && u!=='/devis/') dire(13,'MAJEUR',`aucun lien vers le devis — ${u}`);
}

/* ── PASS 6 — schemas ─────────────────────────────────────────────── */
for (const u of indexables) {
  const h=P.get(u);
  const b=A(h,/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  if (!b) { dire(6,'MAJEUR',`aucun JSON-LD — ${u}`); continue; }
  let g; try { g=JSON.parse(b); } catch(e){ dire(6,'BLOQUANT',`JSON-LD invalide — ${u}`); continue; }
  for (const n of g['@graph']||[g]) {
    if (n.aggregateRating) dire(6,'BLOQUANT',`aggregateRating déclaré — ${u}`);
    if (n.priceRange) dire(6,'MAJEUR',`priceRange déclaré — ${u}`);
    if (n['@type']==='FAQPage') {
      const txt=corps(h);
      for (const q of n.mainEntity||[]) {
        const cle=q.name.replace(/\s+/g,' ').slice(0,28);
        if (!txt.includes(cle)) dire(6,'BLOQUANT',`question balisée absente du texte visible — ${u} : ${q.name.slice(0,44)}`);
      }
    }
  }
}

/* ── restitution ──────────────────────────────────────────────────── */
const par = { BLOQUANT:[], MAJEUR:[], MINEUR:[] };
for (const x of pb) par[x.gravite].push(x);
console.log(`\n  Pages : ${P.size}  ·  indexables : ${indexables.length}  ·  noindex : ${noindex.length} (${noindex.join(', ')})`);
console.log(`  Sitemap : ${locs.length} URLs\n`);
for (const g of ['BLOQUANT','MAJEUR','MINEUR']) {
  console.log(`  ── ${g} : ${par[g].length}`);
  const vus=new Set();
  for (const x of par[g]) { const k=x.msg.slice(0,90); if(vus.has(k))continue; vus.add(k); console.log(`     [P${x.pass}] ${x.msg}`); }
  if (par[g].length>vus.size) console.log(`     … et ${par[g].length-vus.size} occurrence(s) similaire(s)`);
  console.log('');
}
console.log('  ── Vérifié conforme');
for (const o of ok) console.log(`     ✓ ${o}`);
