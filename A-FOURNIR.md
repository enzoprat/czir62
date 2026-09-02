# Éléments à fournir avant la mise en ligne

Ce fichier liste **tout ce que le site attend et que nous n'avons volontairement
pas inventé**. Rien de ce qui suit n'a été remplacé par une valeur plausible :
quand une information manque, l'interface s'adapte et le balisage l'omet.

Ordre de priorité : les blocs 1 et 2 conditionnent la mise en ligne.
Les blocs 3 à 5 font la différence sur la conversion et le référencement local.

---
> 📄 **Ce document est la liste opérationnelle** : quoi fournir, et où cela se
> branche dans le projet.
>
> Pour le **classement par impact commercial** — pourquoi le téléphone passe
> avant tout le reste, ce que coûte une fiche Google absente, quelles requêtes
> restent inaccessibles faute d'information — voir
> [`INFORMATIONS-A-DEMANDER.md`](INFORMATIONS-A-DEMANDER.md), issu de l'audit
> SEO.

## 1. Coordonnées — `src/config/site.ts` ⚠️ partiellement fourni

Un seul fichier à éditer. Tout se propage : en-tête, pied de page, page
contact, boutons d'appel, données structurées JSON-LD, pages villes,
mentions légales.

| Champ | État | Remarque |
|---|---|---|
| `nap.address.street` | ✅ `100 rue Sainte-Pry` | Vérifier que l'orthographe est **identique** à la fiche Google |
| `nap.phone` | ⛔ manquant | `'03 21 00 00 00'` — format d'affichage |
| `nap.phoneE164` | ⛔ manquant | `'+33321000000'` — pour les liens `tel:` |
| `nap.email` | ⛔ manquant | Adresse de réception des demandes |
| `nap.geo.lat` / `lng` | ⛔ manquant | Clic droit sur Google Maps → copier les coordonnées. Active la carte de la page contact |
| `nap.openingHours` | ⛔ manquant | Tableau vide = aucun horaire affiché ni déclaré |
| `nap.siret` | ⛔ manquant | Affiché en mentions légales |
| `nap.foundingYear` | ⛔ manquant | Alimente `foundingDate` du JSON-LD |

**Le téléphone est le manque le plus coûteux.** Sans lui, tous les boutons
d'appel du site basculent en « Être rappelé » — y compris la barre mobile
persistante, qui est le premier point de conversion sur téléphone.

> ⚠️ Le NAP (nom, adresse, téléphone) doit être **strictement identique** à
> celui de la fiche Google Business Profile, à la virgule et à l'abréviation
> près. Une divergence dégrade la cohérence des citations locales.

## 2. Fiche Google Business Profile — `src/config/site.ts` ⛔ BLOQUANT

| Champ | Comment l'obtenir |
|---|---|
| `google.placeId` | https://developers.google.com/maps/documentation/places/place-id |
| `google.profileUrl` | URL publique de la fiche |
| `google.cid` | Identifiant numérique dans l'URL Maps |

Une fois `placeId` renseigné, les boutons **Itinéraire**, **Voir les avis** et
**Laisser un avis** s'activent automatiquement partout sur le site.

## 3. Photographies — ✅ fait, sauf la devanture

**49 photos de chantier sont intégrées** (trois lots du 2 septembre).
Redimensionnées selon leur usage réel, converties en WebP avec repli JPEG,
métadonnées EXIF supprimées. Chaque texte alternatif décrit ce que l'image
montre réellement — sans revendiquer de commune ni de date, qui ne nous ont
pas été transmises.

Trois acquis :

- le **comparateur avant/après** de la page rénovation est branché sur un
  chantier réel : la même maison, couverture déposée puis toiture neuve,
  prise depuis le même point ;
- une **galerie de 26 photos** sur l'accueil et la page entreprise, alimentée
  par `src/data/chantiers.ts` ;
- **tous les emplacements photo vides ont été retirés** du site, à une
  exception près (ci-dessous). Les pages concernées ont été recomposées, pas
  simplement amputées : le hero des pages villes est devenu une composition
  éditoriale à deux colonnes, la section entretien de la page couverture
  s'organise désormais en deux colonnes.

### ⛔ Le seul emplacement encore en attente

**`/images/local/devanture-czir62-bethune.jpg`** — attendue une fois
l'habillage des vitrines terminé. Elle est appelée sur l'accueil, la page
entreprise et la page contact. Prise de face, en journée, enseigne et
prestations lisibles.

C'est le seul emplacement conservé volontairement : la photo est annoncée, et
c'est la principale preuve d'implantation physique du site.

### Volontairement laissé sans photo

**Les pages villes.** Nous ne savons pas où les clichés ont été pris ;
présenter une toiture comme étant « à Lillers » sans le savoir contredirait
le reste du site. Le hero de ces pages est composé pour fonctionner sans
image.

### Inventaire

```bash
npm run photos
```

Déposer un fichier au chemin indiqué suffit. Si un jumeau `.webp` existe à
côté, il est servi en priorité — automatiquement, rien à déclarer.

## 3 bis. Deux pages nées de l'audit SEO

**`/demoussage-toiture/`** — le démoussage et l'entretien figuraient déjà au
registre des prestations, mais seulement comme ancre dans la page couverture.
L'analyse des résultats de recherche montre que c'est l'une des requêtes les
plus travaillées du secteur : concurrent local dédié, annonces payantes,
rubrique Pages Jaunes propre. La prestation a donc désormais sa page.
**À confirmer : l'entreprise pratique-t-elle bien le démoussage ?** Si non, la
page et l'entrée du registre se retirent d'un bloc.

**`/prix-toiture/`** — aucune page ne répondait à « combien ça coûte », qui est
le plus gros volume de recherche du métier. La page publie les fourchettes des
guides de prix nationaux, **explicitement présentées comme n'étant pas nos
tarifs**, la TVA applicable et les sept postes qui font varier un devis. Aucun
prix CZIR62 n'y figure et aucun balisage `Offer` n'est émis.

## 4. Réalisations — `src/content/realisations/`

**Le levier de référencement le plus rentable du site à moyen terme.**
Chaque chantier publié crée une page unique, reliée automatiquement à sa
prestation, à sa commune et aux chantiers similaires.

Marche à suivre :

1. Copier `_TEMPLATE.md`, le renommer `<prestation>-<ville>.md`
   (le nom du fichier devient l'URL).
2. Remplir l'en-tête et le récit.
3. Passer `draft: true` à `draft: false`.

Deux fiches d'exemple (`exemple-*.md`) montrent le niveau de détail attendu.
Elles sont en `draft: true` : **visibles en développement, jamais en ligne**.
Les supprimer une fois les vrais chantiers saisis.

Pour chaque chantier, réunir : 3 à 6 photos, dont si possible **un couple
avant/après pris depuis le même point de vue** (le comparateur à curseur du
site en tire tout son effet), le problème constaté, les travaux réalisés, les
matériaux, la commune.

## 5. Avis Google — `src/data/avis.ts`

Aucun avis n'est affiché tant que ce fichier est vide, et **aucune note agrégée
n'est envoyée à Google**. C'est délibéré : une note fabriquée est une pratique
trompeuse et expose à une pénalité manuelle.

Pour activer la section :

1. Saisir la note réelle et le nombre réel d'avis dans `avisSource`.
2. Saisir les avis dans `avis[]`, **texte repris mot pour mot**, prénom tel
   qu'affiché publiquement par Google.
3. Passer `avisSource.verifie` à `true` après relecture.

Tant que c'est vide, un aperçu clairement identifié s'affiche en développement
uniquement, et le site montre en ligne un bloc de repli honnête.

## 6. Entreprise — page `/entreprise/`

Éléments non inventés, à fournir puis à intégrer :

- année de création et parcours de l'entreprise ;
- taille de l'équipe ;
- **assurance décennale** : compagnie, numéro de police, couverture
  géographique — mention obligatoire en mentions légales ;
- qualifications réellement détenues (RGE, Qualibat…) — **ne rien afficher qui
  ne soit pas détenu et vérifiable** ;
- médiateur de la consommation (obligatoire pour les professionnels
  intervenant auprès de particuliers).

## 7. Mentions légales — `/mentions-legales/`

Les champs manquants sont affichés en jaune avec la mention « À COMPLÉTER »
directement sur la page, pour qu'aucun oubli ne passe inaperçu :
forme juridique, capital, TVA intracommunautaire, directeur de la publication,
assurance, hébergeur, médiateur.

## 8. Logos des fournisseurs — ✅ en place, à faire valider

Les huit logos officiels sont intégrés en couleur dans
`public/images/marques/`, récupérés sur les sites officiels des marques
(site du groupe SGDB France pour Asturienne, enseigne Saint-Gobain).

> ⚠️ **À vérifier avant mise en ligne** : les conditions d'utilisation de
> chaque marque. Certaines imposent une zone de protection minimale ou
> interdisent l'affichage sur fond coloré. En cas de demande d'un titulaire,
> supprimer le champ `logo` de l'entrée concernée dans
> `src/data/fournisseurs.ts` : le libellé typographique reprend
> automatiquement sa place, sans autre modification.
>
> Ne jamais écrire « partenaire officiel » ou « partenaire certifié » sans
> contrat le justifiant. La formulation retenue — « Nous travaillons avec des
> matériaux provenant de fabricants et distributeurs reconnus du secteur » —
> est exacte et sans risque.

## 9. Destinations des demandes — `.env`

Copier `.env.example` en `.env`. Chaque destination s'active dès que sa variable
est renseignée ; elles sont cumulables.

| Variable | Effet |
|---|---|
| `LEAD_WEBHOOK_URL` | Envoi vers n8n / Make / endpoint maison (signature HMAC possible) |
| `LEAD_SHEETS_URL` | Une ligne par demande dans Google Sheets (Apps Script) |
| `LEAD_CRM_URL` + `LEAD_CRM_TOKEN` | Envoi vers un CRM |
| `RESEND_API_KEY` + `LEAD_EMAIL_TO/FROM` | Notification e-mail immédiate |
| `PUBLIC_GTM_ID` ou `PUBLIC_GA4_ID` | Analytics (aucun script injecté tant que c'est vide) |
| `TURNSTILE_SECRET_KEY` | Vérification anti-robot supplémentaire |

Sans aucune configuration, les demandes sont journalisées localement dans
`.leads/leads.ndjson` : **aucune demande n'est jamais perdue.**

## 10. À confirmer — orthographe d'une commune

La zone déclare un rayon de **40 km autour de Béthune, jusqu'à la métropole
lilloise**. Deux communes ont été ajoutées à ce titre : **Lille** et
**Roncq**.

> ⚠️ « Roncq » (59223) a été retenu d'après l'indication orale « Ronque ».
> S'il s'agissait de **Ronchin** (59790), corriger dans
> `src/data/villes.ts` → `communesDesservies` : c'est le seul endroit à
> modifier.

Le rayon lui-même est une constante unique, `RAYON_KM` dans
`src/data/villes.ts`. La carte, les repères chiffrés de l'accueil et la page
zone d'intervention la lisent tous : la changer met tout à jour.

## 11. Vérifications de contenu local

À faire valider par l'entreprise avant mise en ligne, dans `src/data/villes.ts` :

- les **noms de quartiers** (`secteurs`) de chaque commune — ce sont les
  éléments les plus facilement contestables localement ;
- les **distances** (`distanceKm`), données comme approximatives ;
- la pertinence de l'ordre des prestations (`prioritaires`) par commune.
