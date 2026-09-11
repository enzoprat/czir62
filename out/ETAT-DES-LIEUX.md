# État des lieux SEO — 11 septembre 2026

Produit avec la méthode « du diagnostic à l'exécution », **sans aucun outil
payant**. Ce document dit ce qui a pu être fait, ce qui n'a pas pu l'être, et
pourquoi.

---

## Le plan d'action ne peut pas être construit aujourd'hui

La méthode part des données Search Console : requêtes en position 4-15, pages
qui perdent des clics, requêtes qui montent. C'est ce qui désigne les batailles
à mener, et ce qui permet 28 jours plus tard de dire si une correction a marché.

**Ces données n'existent pas.** Trois constats, vérifiés :

| Vérification | Résultat |
|---|---|
| `www.czir62.fr` répond | ⛔ le domaine ne résout pas |
| Propriété Search Console | ⛔ aucune |
| Ce qui est en ligne | preview GitHub Pages, en `Disallow: /` |

Le site n'a jamais été exploré par Google. Il n'y a ni position, ni impression,
ni clic. Écrire un plan de bataille à partir de rien reviendrait à inventer les
chiffres qui le justifient — ce que la méthode interdit explicitement.

**Les phases 2, 4 et 8 sont donc reportées** au lendemain de la mise en ligne.

---

## Ce qui a pu tourner

### Phase 1 — Crawl

`scripts/crawl.mjs` parcourt le build de production. Sortie dans
`.seo/crawl.json` : une ligne par URL, avec balises, Hn, canonical, robots,
nombre de mots, liens internes (ancre et zone), images (poids, dimensions,
attributs de chargement), blocs JSON-LD, profondeur de clic, liens entrants et
PageRank interne.

| | |
|---|---|
| URLs | 36 |
| Profondeur maximale | **1 clic** depuis l'accueil |
| Pages orphelines | aucune, hors `/404.html` |
| Mots au total | 39 307 |
| Médiane par page | 1117 mots |

**Le PageRank interne ne discrimine rien ici**, et c'est un résultat en soi :
il vaut 27,66 sur les 36 pages, à l'identique. La navigation relie chaque page
à toutes les autres, le graphe est quasi complet, l'algorithme converge vers
l'uniforme. Sur un site de cette taille, la métrique utile est donc le **lien
contextuel de corps**, hors nav et footer — et celui-là varie de 1 à 37.

#### Pages sous-irriguées en liens de corps

| Page | Liens de corps | Mots |
|---|---|---|
| `/plan-du-site/` | 0 | 109 |
| `/avis/` | 1 | 284 |
| `/contact/` | 1 | 349 |
| `/mentions-legales/` | 1 | 176 |
| `/outils/` | 2 | 2046 |

Rien ne pousse ces pages depuis le contenu. Pour `/avis/` et `/contact/` c'est
normal, on y arrive par la navigation. Pour les autres, c'est une correction à
faire — mais seulement quand on saura quelles requêtes elles servent.

### Phase 5 — Hygiène GEO

Déterministe, donc réalisable sans données.

| Contrôle | Résultat |
|---|---|
| Crawlers IA bloqués (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) | ✓ aucun |
| `Disallow: /` global | ✓ non |
| Contenu clé en texte, pas en image ni en JS différé | ✓ |
| Entité `RoofingContractor` déclarée | ✓ 12 champs sur 12 |
| Note ou prix déclarés sans support visible | ✓ aucun |
| Réponses autoportantes de 40 à 80 mots | ✓ **110 sur 110** |

Les douze champs : `name`, `address`, `telephone`, `email`, `geo`,
`openingHoursSpecification`, `foundingDate`, `sameAs`, `image`, `logo`,
`areaServed`, `hasOfferCatalog`.

Neuf réponses sortaient de la fenêtre citable : quatre trop courtes, cinq trop
longues. Réécrites — les courtes ont gagné le fait vérifiable qui leur
manquait, les longues ont été resserrées sans rien perdre d'essentiel.

### Phase 7 — Ce qui a été appliqué

Uniquement des corrections de la catégorie « appliqué sans demander » :

- réécriture de neuf réponses balisées pour entrer dans la fenêtre citable ;
- aucune suppression de page, aucune redirection, aucune modification de la
  navigation. La méthode exige une validation explicite pour ces gestes, et
  rien ne la justifiait.

---

## Phase 3 — le top 3 : déjà fait, et pas à refaire

L'analyse concurrentielle a été menée lors de l'audit précédent, à rythme
humain et sans API : SERP réelles sur « couvreur Béthune », « démoussage
toiture Béthune », « couvreur Lens », « fuite toiture assurance », puis
ouverture des sites en tête.

Ce qui en est ressorti est déjà appliqué : création de `/demoussage-toiture/`
et `/prix-toiture/`, levée de la cannibalisation entre l'accueil, `/couverture/`
et `/couvreur-bethune/`.

Relancer dix requêtes aujourd'hui ne produirait rien de neuf : le marché n'a
pas bougé en une semaine, et le site n'y est toujours pas.

---

## Ce que la contrainte « zéro payant » rend impossible

À lire tel quel, sans le combler par une estimation.

- **Volumes de recherche** — la Search Console donne des impressions, pas des
  volumes. Ce n'est pas la même chose. Et ici, il n'y a même pas d'impressions.
- **Profil de backlinks** — aucune source gratuite n'en donne le détail.
  OpenPageRank fournirait un score de domaine, rien de plus.
- **Positions réelles hors Search Console** — ce qu'on lit dans un navigateur
  est personnalisé et géolocalisé sur la position de celui qui regarde. Pour un
  site local dont les prospects sont à Béthune, ce n'est pas ce qu'ils voient.
- **Grille géographique du pack local** — demande des SERP géolocalisées en
  volume. Hors de portée sans API.
- **Mesure GEO** — l'apparition de la marque dans ChatGPT ou Perplexity varie
  de plus de 60 % d'un jour à l'autre. Quelques essais manuels seraient une
  observation, jamais une mesure. Rien n'a donc été mesuré.

---

## L'état zéro est enregistré

`.seo/baseline.json` fixe l'état de départ : 36 pages, profondeur, liens de
corps, volume de texte, et l'absence totale de données de performance.

C'est contre ce fichier que la Phase 8 rendra son verdict, **28 jours après la
mise en ligne réelle** : réussi, échoué, ou non concluant — mesuré contre le
critère fixé au départ, jamais contre un critère réécrit après coup.

---

## La séquence de lancement

Rien de ce qui précède ne devient mesurable tant que ces six points ne sont pas
faits. Ils sont dans l'ordre : chacun dépend du précédent.

1. **Acheter et pointer `czir62.fr`.** Le domaine ne résout pas aujourd'hui.
   Choisir `www` ou la racine, rediriger l'autre en 301 — une seule version
   canonique.
2. **Déployer sur un hébergeur Node.** La route `/api/lead/` du formulaire de
   devis est rendue à la demande ; un hébergement statique la renverrait en 404
   et les demandes seraient perdues.
3. **Vérifier le `robots.txt` de production.** Le `Disallow: /` ne concerne que
   la preview, mais il faut s'assurer que c'est bien celui du dépôt qui est
   servi.
4. **Créer la propriété Search Console** en mode domaine, puis soumettre
   `sitemap-index.xml`.
5. **Relier la fiche Google au site** depuis la fiche elle-même.
6. **Attendre 28 jours.** Avant, il n'y a rien à lire : les premières données
   sont trop bruitées pour décider quoi que ce soit.

À J+28, l'audit Search Console devient possible — et le plan d'action avec lui.
