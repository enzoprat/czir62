import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DQAPo0Sv.mjs';
import { manifest } from './manifest_MW0VnY99.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/agrandissement-rehaussement.astro.mjs');
const _page3 = () => import('./pages/api/lead.astro.mjs');
const _page4 = () => import('./pages/avis.astro.mjs');
const _page5 = () => import('./pages/bardage.astro.mjs');
const _page6 = () => import('./pages/charpente.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/couverture.astro.mjs');
const _page9 = () => import('./pages/couverture-metallique.astro.mjs');
const _page10 = () => import('./pages/demoussage-toiture.astro.mjs');
const _page11 = () => import('./pages/devis.astro.mjs');
const _page12 = () => import('./pages/entreprise.astro.mjs');
const _page13 = () => import('./pages/etancheite-toiture-terrasse.astro.mjs');
const _page14 = () => import('./pages/fuite-toiture.astro.mjs');
const _page15 = () => import('./pages/mentions-legales.astro.mjs');
const _page16 = () => import('./pages/ossature-bois.astro.mjs');
const _page17 = () => import('./pages/outils.astro.mjs');
const _page18 = () => import('./pages/plan-du-site.astro.mjs');
const _page19 = () => import('./pages/politique-de-confidentialite.astro.mjs');
const _page20 = () => import('./pages/pose-velux.astro.mjs');
const _page21 = () => import('./pages/prestations.astro.mjs');
const _page22 = () => import('./pages/prix-toiture.astro.mjs');
const _page23 = () => import('./pages/realisations/_slug_.astro.mjs');
const _page24 = () => import('./pages/realisations.astro.mjs');
const _page25 = () => import('./pages/renovation-toiture.astro.mjs');
const _page26 = () => import('./pages/reparation-toiture.astro.mjs');
const _page27 = () => import('./pages/robots.txt.astro.mjs');
const _page28 = () => import('./pages/zinguerie.astro.mjs');
const _page29 = () => import('./pages/zone-intervention.astro.mjs');
const _page30 = () => import('./pages/couvreur-_ville_.astro.mjs');
const _page31 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/agrandissement-rehaussement/index.astro", _page2],
    ["src/pages/api/lead.ts", _page3],
    ["src/pages/avis/index.astro", _page4],
    ["src/pages/bardage/index.astro", _page5],
    ["src/pages/charpente/index.astro", _page6],
    ["src/pages/contact/index.astro", _page7],
    ["src/pages/couverture/index.astro", _page8],
    ["src/pages/couverture-metallique/index.astro", _page9],
    ["src/pages/demoussage-toiture/index.astro", _page10],
    ["src/pages/devis/index.astro", _page11],
    ["src/pages/entreprise/index.astro", _page12],
    ["src/pages/etancheite-toiture-terrasse/index.astro", _page13],
    ["src/pages/fuite-toiture/index.astro", _page14],
    ["src/pages/mentions-legales/index.astro", _page15],
    ["src/pages/ossature-bois/index.astro", _page16],
    ["src/pages/outils/index.astro", _page17],
    ["src/pages/plan-du-site/index.astro", _page18],
    ["src/pages/politique-de-confidentialite/index.astro", _page19],
    ["src/pages/pose-velux/index.astro", _page20],
    ["src/pages/prestations/index.astro", _page21],
    ["src/pages/prix-toiture/index.astro", _page22],
    ["src/pages/realisations/[slug].astro", _page23],
    ["src/pages/realisations/index.astro", _page24],
    ["src/pages/renovation-toiture/index.astro", _page25],
    ["src/pages/reparation-toiture/index.astro", _page26],
    ["src/pages/robots.txt.ts", _page27],
    ["src/pages/zinguerie/index.astro", _page28],
    ["src/pages/zone-intervention/index.astro", _page29],
    ["src/pages/couvreur-[ville].astro", _page30],
    ["src/pages/index.astro", _page31]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f57206bd-f7ac-41fd-97ba-9f0154f70ff7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
