# CZIR62 — Site de l'Entreprise Générale de Couverture

Infrastructure d'acquisition locale pour CZIR62, entreprise de couverture
implantée à Béthune (62). Conçue pour être alimentée pendant des années sans
que le code devienne ingérable.

**Avant toute mise en ligne, lire [`A-FOURNIR.md`](./A-FOURNIR.md).**

---

## Démarrer

```bash
npm install
cp .env.example .env     # optionnel : destinations des demandes, analytics
npm run dev              # http://localhost:4321
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Vérification des types puis build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run serve` | Démarre le serveur Node de production (`dist/server/entry.mjs`) |
| `npm run photos` | **Inventaire des photos attendues** et de celles qui manquent |
| `npm run assets` | Régénère le favicon Apple et l'image de partage |
| `npm run check` | Vérification des types seule |

---

## Choix techniques, et pourquoi

**Astro 5, sortie statique.** Chaque page est un fichier HTML servi tel quel :
c'est ce qui donne les meilleurs Core Web Vitals possibles, et c'est
déterminant pour un site dont l'essentiel du trafic arrivera sur mobile depuis
Google. Une seule route est rendue à la demande, `/api/lead/`, parce qu'elle
doit recevoir des formulaires.

**Environ 14 Ko de JavaScript** sur une page type, découpé par composant.
Aucun framework d'interface, aucune bibliothèque de carte, aucune police
distante. Les outils interactifs sont écrits en TypeScript natif.

**Aucune police embarquée.** La typographie est SF Pro, appelée via
`-apple-system` : native sur macOS et iOS, avec Segoe UI / Roboto en repli
ailleurs. La licence Apple interdit d'auto-héberger SF Pro sur un site web ;
l'appel système est le seul usage autorisé, et c'est aussi le plus rapide —
rien à télécharger, aucun basculement de police au chargement.

**Aucune donnée inventée.** Adresse, téléphone, horaires, avis, note moyenne,
chantiers : quand l'information n'est pas fournie, l'interface s'adapte et le
balisage l'omet. Voir « Le principe de non-invention » plus bas.

---

## Direction artistique — « Matière et pente »

Le langage visuel vient du métier. Il ne doit pas pouvoir être recyclé pour un
restaurant ou un cabinet d'avocats en changeant le logo.

### Les quatre partis pris

**1. Deux familles de matière en tension.** La terre cuite (chaude, la tuile)
contre l'ardoise-zinc (froide, le métal) : c'est le couple réel du métier —
ce qui couvre, ce qui conduit l'eau. Une palette uniquement chaude vire au
beige de template ; le bleu-gris froid fait exister la terre cuite par
contraste et donne au site ses sections « techniques ».

**2. La pente.** Le rampant est une grammaire : `--pitch: 2.4vw` est l'angle
constant du site, appliqué aux coutures diagonales entre sections
(`.seam-top`, `.seam-top--rev`, `.seam-bottom`). Deux à trois fois par page
au maximum — c'est un accent, pas un tic.

**3. Les rangs de tuiles.** Texture SVG en quinconce (`--tex-tuiles`), en
ligne, quelques centaines d'octets, posée à 4 % d'opacité sur les surfaces
profondes. Deux autres trames : `--tex-zinc` (joint debout) et `--tex-plan`
(trame de plan technique, sur les surfaces zinc claires).

**4. Le chiffre.** Un métier qui mesure : chiffres tabulaires (`.num`),
filets capillaires, index en police à chasse fixe, étiquettes gravées. C'est
la typographie de l'atelier, pas celle du tableau de bord.

### Palette

| Famille | Rôle | Jetons |
|---|---|---|
| Terre cuite | accent, surfaces fortes | `--clay-50` → `--clay-900` |
| Ardoise / zinc | texte, surfaces profondes et techniques | `--zinc-50` → `--zinc-950` |
| Chaux / sable | fonds chauds | `--paper`, `--bone`, `--sand-50` → `--sand-400` |
| Bois | charpente, ossature (schémas) | `--wood-300` → `--wood-800` |
| Vert-de-gris | états positifs (patine du zinc) | `--verdi-100` → `--verdi-700` |

**Six surfaces**, jamais deux sections voisines identiques :
`--surface` (papier) · `--surface-sand` (chaud) · `--surface-zinc` (technique)
· `--surface-clay` (conversion) · `--deep` (ardoise) · `--deep-warm` (terre
brûlée). Plus `.section--accent`, terre cuite pleine, réservé aux moments
forts.

### Typographie

SF Pro via la pile système. Échelle à fort contraste — `--fs-xs` (13 px)
jusqu'à `--fs-6xl` (7 rem) : un site où tout se situe entre 14 et 32 px n'a
pas de hiérarchie, il a une moyenne. L'approche se resserre avec la taille
(−0.05 em sur les titres d'affiche), comme le fait Apple.

### Arêtes, ombres, mouvement

Rayons volontairement resserrés : **2 à 16 px**. Le rayon 18-24 px généralisé
est la signature du template SaaS ; le bâtiment a des angles. Ombres teintées
chaud et rares — une ombre sur chaque bloc aplatit une page. Transitions de
130 à 420 ms, toutes annulées sous `prefers-reduced-motion`.

### Primitives disponibles

Au-delà de `.card`, volontairement discrète :

| Primitive | Usage |
|---|---|
| `.plaque` | plaque émaillée vissée — coordonnées, identité |
| `.registre` | liste-registre indexée à filets, alternative à la grille de cartes |
| `.stats` / `.stat` | bandeau de repères chiffrés séparés par des filets |
| `.head-split` | en-tête titre à gauche / chapeau à droite |
| `.overline` | étiquette numérotée |
| `.media--zoom/--scrim/--tall` | mise en scène des images |
| `.list-rule` | liste à filets compacte |
| `.tex--tuiles/--zinc/--plan` | textures matière |
| `.seam-top/--rev/-bottom` | coutures en pente |

### Règle anti-générique

Une grille de trois ou quatre cartes identiques est le réflexe qui aplatit une
page. Quand une liste dépasse quatre éléments, elle passe en registre
(`.registre`, `.list-rule`) : l'œil suit un ordre au lieu de compter des
rectangles. Les prestations de l'accueil, les neuf postes d'une rénovation
et les huit points d'entrée d'une fuite sont traités ainsi.

---

## Architecture

```
src/
├─ config/site.ts          ← SOURCE DE VÉRITÉ UNIQUE (NAP, fiche Google)
├─ data/
│  ├─ services.ts          ← 13 prestations : métadonnées + maillage interne
│  ├─ villes.ts            ← 10 communes : contenu local propre à chacune
│  ├─ avis.ts              ← avis Google réels (vide par défaut)
│  └─ fournisseurs.ts      ← marques relevées sur la devanture
├─ content/realisations/   ← une fiche Markdown = un chantier = une page
├─ lib/
│  ├─ schema.ts            ← constructeurs JSON-LD
│  ├─ icons.ts             ← pictogrammes métier dessinés sur mesure
│  ├─ realisations.ts      ← accès à la collection (exclut les brouillons)
│  ├─ leads/               ← modèle, identifiant CZIR-XXXXXX, destinations
│  └─ client/              ← attribution, événements, formulaires, animations
├─ components/             ← primitives + outils interactifs
├─ layouts/BaseLayout.astro
└─ pages/                  ← une page = un fichier
```

### Les pages

| URL | Contenu |
|---|---|
| `/` | Accueil |
| `/prestations/` | Hub, avec table « symptôme → prestation » |
| `/couverture/` `/renovation-toiture/` `/reparation-toiture/` `/fuite-toiture/` `/zinguerie/` `/etancheite-toiture-terrasse/` `/couverture-metallique/` `/charpente/` `/pose-velux/` `/bardage/` `/ossature-bois/` `/agrandissement-rehaussement/` | 12 pages services, **écrites individuellement** |
| `/zone-intervention/` | Hub géographique |
| `/couvreur-<commune>/` | 10 pages locales |
| `/realisations/` + `/realisations/<slug>/` | Base de chantiers |
| `/entreprise/` `/contact/` `/devis/` `/avis/` `/outils/` | Confiance et conversion |
| `/mentions-legales/` `/politique-de-confidentialite/` `/plan-du-site/` `/404` | Pages de service |

---

## Faire évoluer le site

### Ajouter un chantier — 5 minutes, aucun code

1. Copier `src/content/realisations/_TEMPLATE.md`
2. Le renommer : le nom du fichier devient l'URL
3. Remplir, déposer les photos, passer `draft: false`

La page, le fil d'ariane, les données structurées, les liens depuis la page
service et depuis la page ville sont générés automatiquement.

### Ajouter une commune

Ajouter une entrée dans `src/data/villes.ts`. La page, l'entrée du pied de
page, le plan du site et le sitemap suivent.

> Une page ville ne se justifie que si vous avez quelque chose de spécifique à
> en dire. Dix pages riches valent mieux que quarante pages interchangeables :
> Google sait reconnaître un gabarit dupliqué.

### Ajouter une prestation

1. Ajouter une entrée dans `src/data/services.ts`
2. Créer `src/pages/<slug>/index.astro`

**Ne pas dupliquer une page existante en remplaçant les mots.** Chaque page
service part de son intention de recherche propre et a sa propre structure :
c'est la raison pour laquelle elles se positionnent.

### Ajouter une photo

Déposer le fichier au chemin attendu (`npm run photos` les liste tous).
Elle remplace l'emplacement dessiné au build suivant. Si un jumeau `.webp`
existe à côté, il est servi en priorité — automatiquement.

**Convention de nommage** (un nom de fichier est un signal lu par les
moteurs, et il doit rester vrai) :

```
services/     <prestation>-czir62.jpg              visuel principal
              <prestation>-<precision>-czir62.jpg  visuel secondaire
realisations/ <prestation>-avant-czir62.jpg / -apres-czir62.jpg
accueil/      couvreur-bethune-czir62.jpg          reprend le H1 de l'accueil
local/        devanture-czir62-bethune.jpg         le local EST à Béthune
chantiers/    <sujet-descriptif>-czir62.jpg
```

Aucune commune n'apparaît en dehors de l'accueil et du local : nous ne savons
pas où les photos de chantier ont été prises.

`node scripts/importer-photos.mjs` régénère l'ensemble depuis les originaux :
c'est la source de vérité du plan de nommage.

---

## Suivi des demandes

Chaque demande reçoit un identifiant **`CZIR-XXXXXX`** et embarque son
attribution complète : page d'entrée, page de conversion, source, support,
campagne, `gclid`, référent. Objectif : pouvoir répondre dans six mois à la
question « ce chantier vient de quelle source ? ».

Le flux : formulaire → `/api/lead/` → anti-abus → validation → normalisation →
**envoi parallèle à toutes les destinations configurées**. Chaque destination
est indépendante ; aucune ne peut faire échouer les autres. Le journal local
`.leads/leads.ndjson` est toujours écrit : c'est le filet de sécurité.

### Événements analytics

Nomenclature figée — la modifier casse l'historique des rapports :

```
phone_click · quote_start · quote_step · quote_submit
diagnostic_start · diagnostic_complete
estimator_start · estimator_complete
leak_assistant_start · leak_assistant_complete
surface_estimate · google_reviews_click · directions_click
service_view · city_page_view · realisation_view
```

Poussés dans `dataLayer` (GTM) et vers `gtag` si GA4 est chargé. Si aucun outil
n'est installé, les événements s'empilent sans effet de bord.

---

## Le principe de non-invention

C'est la règle structurante du projet, appliquée dans le code et non seulement
dans le discours.

| Donnée absente | Comportement |
|---|---|
| Téléphone | Les boutons d'appel deviennent « Être rappelé » ; `telephone` omis du JSON-LD |
| Adresse | Blocs NAP masqués ; `address` omis du JSON-LD |
| Coordonnées GPS | Carte remplacée par une explication ; `geo` omis |
| Horaires | Aucun horaire affiché ni déclaré |
| Avis | Section remplacée par un repli honnête ; **aucun `aggregateRating` émis** |
| Chantier sur une commune | Le bloc disparaît, avec une phrase qui l'assume |
| Photo | Emplacement dessiné qui décrit la photo attendue |

`prune()` dans `src/lib/schema.ts` supprime récursivement toute propriété vide
avant sérialisation : Google ne reçoit jamais de champ creux.

**Pourquoi c'est un choix technique et pas moral :** un `aggregateRating` sans
avis correspondants expose à une pénalité manuelle Google, et constitue une
pratique commerciale trompeuse. Le code refuse simplement de le produire.

---

## Déploiement

Le site est statique, avec une route serveur pour les formulaires.

**Avec un runtime Node** (recommandé — les formulaires fonctionnent nativement) :

```bash
npm run build
node ./dist/server/entry.mjs      # sert dist/client + /api/lead/
```

**Sur un hébergement 100 % statique** : déployer `dist/client/`, et renseigner
`PUBLIC_LEAD_ENDPOINT` avec l'URL d'un webhook externe (n8n, Make…). Le
formulaire postera directement dessus.

**Sur Netlify / Vercel / Cloudflare** : remplacer l'adaptateur dans
`astro.config.mjs` (`@astrojs/netlify`, `@astrojs/vercel`…). Rien d'autre à
changer.

### Avant la première mise en ligne

- [ ] `src/config/site.ts` complété (bloc 1 et 2 de `A-FOURNIR.md`)
- [ ] `site` dans `astro.config.mjs` pointe sur le domaine réel
- [ ] `.env` configuré (au minimum une destination pour les demandes)
- [ ] Fiches d'exemple `exemple-*.md` supprimées
- [ ] Photo de devanture déposée
- [ ] Mentions légales complétées
- [ ] Search Console : sitemap `https://…/sitemap-index.xml` soumis
- [ ] Fiche Google Business Profile : site web renseigné avec le domaine
