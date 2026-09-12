# Informations à demander au client

Classées par impact réel sur le référencement et sur la conversion, pas par
facilité d'obtention. Chaque ligne indique **où** l'information se branche dans
le projet — dans presque tous les cas, un seul fichier.

La liste opérationnelle complète (photos, variables d'environnement, logos,
modèle de fiche chantier) reste dans [`A-FOURNIR.md`](A-FOURNIR.md).

Rien de ce qui suit n'a été inventé sur le site : tant qu'une information
manque, l'interface se dégrade proprement et les données structurées
n'annoncent rien.

---

## ⚠️ Ouvert depuis la photo de devanture du 11 septembre 2026

La devanture révèle plusieurs informations qui n'étaient pas au dossier. Trois
demandent une décision avant d'être publiées.

### ~~A. « VOTRE ARTISAN DEPUIS 1925 »~~ ✅ tranché le 11 septembre 2026

**Entreprise familiale en activité depuis 1925.** La structure juridique
actuelle date de 2026 : c'est une transmission, pas un démarrage.

`foundingYear` passe donc à **1925** et alimente `foundingDate` — schema.org
décrit la fondation de l'organisation, pas l'immatriculation de sa dernière
forme juridique.

Déployé : title de l'accueil, bandeau site-wide, encart de l'accueil, page
entreprise, et les deux versions de la description Google.

> Reste une nuance : le champ **« date d'ouverture »** de la fiche Google
> demande la date d'ouverture *à cette adresse*. Si le local du 100 rue
> Sainte-Pry est récent, saisir cette date-là et non 1925.

### B. Six prestations affichées en vitrine, absentes du site

Les vitrines annoncent, en plus de tout ce que le site couvre déjà :

| Prestation | État sur le site |
|---|---|
| Isolation de combles | ⛔ aucune page |
| Isolation de façade | ⛔ aucune page |
| Sarking | ⛔ aucune page |
| Ravalement projeté | ⛔ aucune page |
| Peinture intérieure | ⛔ aucune page |
| Peinture extérieure | ⛔ aucune page |

L'audit SEO avait identifié l'isolation comme **la prestation manquante la plus
coûteuse** : tous les concurrents examinés la proposent, et c'est la seule du
métier éligible à MaPrimeRénov'. Le **sarking** est en plus une technique de
couvreur, à forte valeur et peu concurrencée localement.

Décision à prendre : ces six prestations entrent-elles dans le périmètre du
site ? Si oui, cela représente au minimum trois pages neuves (isolation de
combles et sarking, isolation de façade, ravalement et peinture) et une
révision du menu, qui est aujourd'hui entièrement organisé autour de la
couverture.

### C. Dépannage 7j/7 — désormais affichable

La porte du local annonce **DÉPANNAGE 7J/7**. Le site ne promettait jusqu'ici
aucun délai, faute de confirmation. C'est un argument que tous les concurrents
mettent en avant et qu'il est maintenant possible d'écrire — à condition que
l'astreinte soit réellement tenue. Confirmer avant publication.

### D. « Agréé toutes assurances »

Les deux vitrines portent cette mention. Elle intéresse directement les
sinistres tempête, qui sont un flux d'affaires régulier dans le Pas-de-Calais.
À confirmer, puis à intégrer à la page réparation et à la section assurance de
la page fuite.

### E. Fournisseurs identifiés

Relevés sur les vitrines : **Asturienne, Fernagut, Larivière, Velux** côté
couverture ; **Isover, Seigneurie, Cedeo, Zolpan, Actis** côté isolation et
peinture. Utile pour compléter le bandeau fournisseurs du site, sous réserve
de leurs conditions d'utilisation de marque.

---

## 🔴 Bloquant — sans ça, le site ne convertit pas

### ~~1. Le numéro de téléphone~~ ✅ fourni le 3 septembre 2026
`src/config/site.ts` → `07 86 70 41 34` / `+33786704134`

Les liens d'appel sont actifs sur **36 pages** : barre mobile persistante,
en-tête, bandeau haut de page, menu mobile, pied de page, hero de l'accueil,
écran de confirmation du devis. Le numéro est déclaré dans les données
structurées (`telephone`), ce qui permettra à Google de rapprocher le site de
la fiche Business Profile.

**E-mail également fourni** : `Ent.czir62@hotmail.com`, présent dans le bandeau
haut de page, la page contact et le champ `email` des données structurées.

> ⚠️ Vérifier que ce numéro est **exactement** celui de la fiche Google. Une
> divergence, même de format, casse la cohérence NAP.

### ~~2. La fiche Google Business Profile~~ ✅ créée et connectée le 11 septembre 2026

Fiche **« CZIR62 Couvreur Béthune »**, CID `6405054400449423243`, renseignée
dans `src/config/site.ts`.

Conséquences immédiates sur le site :

- le bouton **« Laissez-nous un avis »** apparaît sur **14 pages** — page avis,
  page devis, page entreprise et les dix pages de communes ;
- les liens « voir les avis » et « itinéraire » pointent vers la vraie fiche ;
- `sameAs` des données structurées relie enfin le site à la fiche, ce qui
  permet à Google de rapprocher les deux entités.

Le lien court d'avis `https://g.page/r/CYsn17EKU-NYEBM/review` est renseigné :
les boutons ouvrent **directement le formulaire**, sans passer par la fiche.

### 3. Les avis clients
Aucune action de code — ils remontent automatiquement de la fiche Google.

Zéro avis affiché aujourd'hui, alors que les concurrents locaux affichent
4,7/5. Aucune note n'est inventée et aucun `aggregateRating` n'est émis : le
site ne mentira pas, mais il ne peut pas non plus compenser une fiche vide.

---

## 🟠 Important — crédibilité et taux de transformation

### 4. L'assurance décennale et le RGE — en cours

`src/config/site.ts` → `nap.assurance` : `assureur`, `contrat`, `zone`, `rge`

Les champs existent et sont vides. Le jour où l'attestation arrive, les
renseigner suffit : les mentions apparaissent en mentions légales sous la forme
exigée par la loi du 18 juin 2014, et la version 2 de la description Google
(prête dans `FICHE-GOOGLE.md`) peut être publiée.

**Ne rien annoncer avant d'avoir le document.** Le site explique lui-même aux
visiteurs, sur la page prix et la page démoussage, qu'un devis sans mention
d'assurance se refuse — nous ne pouvons pas donner ce conseil sans le suivre.

Pour le **RGE**, la prudence est d'un autre ordre : c'est cette qualification
qui rend le client éligible à MaPrimeRénov' et aux CEE. L'annoncer avant de
l'avoir expose le client à une perte financière réelle, et l'entreprise à une
sanction DGCCRF.

### ~~6 bis. L'année de création~~ ✅ fournie le 3 septembre 2026

`foundingYear: 2026` et `experienceYears: 25` sont deux champs **distincts**,
et le commentaire du fichier explique pourquoi ils ne doivent jamais être
fusionnés : l'entreprise date de 2026, l'artisan exerce depuis 25 ans.

Publié sur l'accueil et sur la page entreprise sous la forme « l'entreprise a
été créée en 2026, le couvreur qui la dirige exerce depuis 25 ans ».

> ✅ **Obtenu le 12 septembre 2026 : Sébastien Feret, gérant.** Publié sur
> l'accueil, sur la page entreprise, en directeur de la publication (obligation
> LCEN restée jusqu'ici non remplie) et dans le balisage comme `employee` —
> pas `founder` : la maison date de 1925, il ne l'a pas fondée.
>
> À vérifier : l'orthographe exacte de l'état civil. « Sébastien » est écrit
> avec l'accent ; s'il n'en porte pas, c'est une ligne dans `site.ts`.

### ~~5. Les horaires d'ouverture~~ ✅ relevés sur la porte du local
`src/config/site.ts` → `nap.openingHours`

Aucun horaire n'est affiché ni déclaré. Google affiche les horaires dans le
Local Pack et signale « ouvert / fermé » en temps réel : une fiche sans horaire
perd en visibilité comme en clics.

À préciser également : **intervenez-vous en urgence le week-end ?** Les
concurrents mettent en avant « 7j/7 » et « intervention sous 24h ». Nous ne
l'écrirons que si c'est vrai.

### 6. Le SIRET et l'année de création
`src/config/site.ts` → `nap.siret`, `nap.foundingYear`

Le SIRET est une mention obligatoire des mentions légales — la page existe mais
il y manque. L'ancienneté est l'argument de réassurance le plus utilisé par les
concurrents (« plus de 20 ans », « depuis 30 ans »).

### ~~7. Les coordonnées GPS du local~~ ✅ relevées le 11 septembre 2026
`src/config/site.ts` → `nap.geo.lat` / `nap.geo.lng`

`50.529439, 2.637719`, relevées sur la **Base Adresse Nationale**
(api-adresse.data.gouv.fr), au niveau du numéro et non de la voie. La carte
de la page contact est active et le champ `geo` des données structurées est
renseigné.

> ⚠️ **Une vérification d'une minute.** Ouvrir `/contact/` et regarder si le
> repère tombe bien sur l'angle du bâtiment. Si non : clic droit sur le bon
> point dans Google Maps → la première ligne du menu donne les coordonnées →
> les coller dans `nap.geo`.

> ⚠️ **Orthographe de la voie à trancher.** La Base Adresse Nationale écrit
> **« 100 Rue Saint Pry »**, sans « e » et sans trait d'union. Le site et
> l'enseigne écrivent « rue Sainte-Pry ». La référence à suivre est la fiche
> Google : c'est elle que les annuaires recopient. Une divergence dégrade la
> cohérence des citations locales.

### ~~8. La photo de devanture~~ ✅ fournie le 11 septembre 2026
`public/images/local/devanture-czir62-bethune.jpg`

C'est le dernier emplacement photo en attente sur tout le site (accueil,
entreprise, contact). Un local physique avec une devanture est le signal de
réalité le plus fort dont dispose l'entreprise, et **c'est ce qui la distingue
de la quasi-totalité des sites concurrents**, qui sont soit des réseaux
nationaux, soit des artisans domiciliés dans une autre commune.

Elle deviendra aussi la photo de référence de l'entreprise dans les données
structurées.

---

## 🟡 Contenu — ce qui débloquerait de nouvelles requêtes

### 9. Des chantiers documentés
`src/content/chantiers/` — un fichier Markdown par chantier
(`_TEMPLATE.md` est prêt).

La brique la plus rentable à moyen terme, et elle est aujourd'hui **vide**.
Chaque chantier publié crée une page unique, reliée à sa prestation et à sa
commune, avec photos avant/après.

Pour chaque chantier il faut : la commune, le mois, le problème constaté, ce
qui a été fait, les matériaux, et les photos. Rien de tout cela ne peut être
déduit des photos existantes : c'est pour cela que les 30 photos actuelles sont
présentées comme une galerie et non comme des chantiers localisés.

Dix chantiers documentés dans dix communes valent mieux que dix pages de
communes supplémentaires.

### ~~10. Le démoussage est-il bien une prestation de l'entreprise ?~~ ✅ confirmé le 12 septembre 2026
`src/data/services.ts` → entrée `demoussage-toiture`

**Oui, l'entreprise le pratique.** La page `/demoussage-toiture/` reste donc en
place : c'est l'une des requêtes les plus travaillées du métier sur le secteur,
avec un spécialiste local dédié et des annonces payantes en face.

Deux points restent ouverts, et ils sont commerciaux, pas structurels :
- proposez-vous un **traitement hydrofuge** après démoussage ? (la page reste
  aujourd'hui volontairement neutre sur ce point) ;
- travaillez-vous **par drone** ? (plusieurs concurrents locaux le mettent en
  avant).

### 11. Isolation : est-ce une prestation ?
Aucune page aujourd'hui.

**Tous** les concurrents examinés proposent l'isolation des combles ou sous
rampants, et c'est la seule prestation du métier éligible à MaPrimeRénov'. Si
l'entreprise la pratique, c'est la prochaine page à créer.

Question liée : **l'entreprise est-elle qualifiée RGE ?** Sans RGE, aucune aide
à la rénovation énergétique n'est mobilisable par le client, et il vaut mieux
ne pas mettre le sujet en avant. La page prix le dit d'ailleurs franchement au
visiteur.

### 12. Urgence : quel engagement réel ?
Le site ne promet aujourd'hui aucun délai.

Les concurrents annoncent « urgence 7j/7 », « intervention sous 24h »,
« déplacement en 2 heures ». Si l'entreprise assure une astreinte, c'est une
page à part entière (« dépannage toiture en urgence ») et un argument fort.
Si elle ne l'assure pas, ne rien promettre reste la bonne décision.

---

## 🔵 À confirmer — points ouverts

### ~~13. « Ronque » : Roncq ou Ronchin ?~~ ✅ tranché le 12 septembre 2026
`src/data/villes.ts` → `communesDesservies`

**Roncq** (59223), confirmé par l'entreprise. Ce n'était pas Ronchin.

Conséquence à connaître : Roncq est à **~53 km par la route**, soit au-delà du
rayon de 40 km annoncé sur le site — c'est la commune la plus éloignée de la
zone. Les formulations de `/zone-intervention/` ont été ajustées pour dire
« environ 40 km **et** jusqu'à la métropole lilloise » plutôt que de faire
passer la MEL pour incluse dans le rayon.

Reste une décision commerciale : annoncer 40 km et assumer une exception, ou
monter le rayon déclaré à 50 km (`RAYON_KM` dans `src/data/villes.ts`, une
constante consommée par la carte, l'accueil et la page zone). Le texte de la
page défend aujourd'hui la zone resserrée comme un argument — monter le chiffre
affaiblit cet argument.

### 14. L'orthographe exacte de l'adresse
`src/config/site.ts` → `nap.address.street`

`100 rue Sainte-Pry` doit être **strictement identique** à ce qui figure sur la
fiche Google Business Profile, au trait d'union près. Une divergence dégrade la
cohérence des citations locales.

### 15. Réseaux sociaux et autres profils
`src/config/site.ts` → `socials`

Le champ `sameAs` des données structurées est vide. C'est ce champ qui permet à
Google de relier entre elles les différentes traces de l'entreprise sur le web
(fiche Google, Facebook, annuaires professionnels, Pages Jaunes). Toute page
officielle est bonne à déclarer.

### 16. Réutilisation des logos de fournisseurs
`src/components/BrandsStrip.astro`

Les logos affichés le sont sous la formulation « nous travaillons avec des
matériaux provenant de fabricants et distributeurs reconnus du secteur », sans
revendiquer de partenariat. Vérifier que leurs conditions d'utilisation
autorisent cet affichage.
