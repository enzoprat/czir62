# Fiche d'établissement Google — ce qu'il faut saisir

Document de saisie pour la création de la fiche Google Business Profile de
CZIR62. Il reprend la zone déclarée sur le site (`src/data/villes.ts`,
`RAYON_KM = 40`) et la traduit dans les contraintes de Google.

---

## 1. Le type de fiche : « établissement mixte »

C'est le premier choix, et il ne se rattrape pas facilement.

Google distingue trois cas. CZIR62 relève du troisième :

| Type | Adresse affichée | Zones desservies |
|---|---|---|
| Commerce classique | oui | non |
| Service de proximité pur *(plombier qui n'a pas de local ouvert)* | **non — Google demande de la retirer** | oui |
| **Établissement mixte** | **oui** | **oui** |

Le bureau du 100 rue Sainte-Pry accueille des clients : c'est un
**établissement mixte**. Il faut donc **garder l'adresse visible** et déclarer
en plus les zones desservies.

> ⚠️ Ne pas cocher « je livre uniquement chez mes clients » : Google
> supprimerait alors l'adresse de la fiche. Or l'adresse est le principal
> facteur de proximité dans le Local Pack, et le showroom est l'argument que la
> concurrence locale n'a pas.

---

## 2. Les catégories — le champ qui pèse le plus

Avant même les zones. La catégorie principale est l'un des signaux les plus
déterminants du classement local.

**Catégorie principale**
```
Couvreur
```

**Catégories secondaires** (à ajouter dans cet ordre, jusqu'à 9 possibles)
```
Entreprise de couverture
Charpentier
Entrepreneur en isolation          ← seulement si l'isolation est pratiquée
Entreprise de construction
Service de nettoyage de toitures   ← seulement si le démoussage est confirmé
```

Ne déclarer que ce qui est réellement pratiqué : une catégorie non tenue
attire des demandes qu'il faudra refuser, et Google apprend de ces refus.

---

## 3. Les zones desservies — 20 maximum

Google plafonne à **20 zones**. On ne peut plus définir un rayon : il faut
nommer des communes, des codes postaux ou des zones administratives.

Dans le formulaire, il suffit de **taper le nom** et de choisir dans la liste
proposée. Les codes postaux ci-dessous servent à ne pas se tromper de commune
homonyme.

### Liste recommandée — 20 communes, à saisir dans cet ordre

| # | Commune | CP | Pourquoi |
|---|---|---|---|
| 1 | Béthune | 62400 | Commune d'implantation |
| 2 | Beuvry | 62660 | 4 km, l'une des plus fréquentes |
| 3 | Annezin | 62232 | Limitrophe, ~6 000 hab. |
| 4 | Verquin | 62131 | Limitrophe sud |
| 5 | Bruay-la-Buissière | 62700 | 9 km, 2ᵉ ville de l'agglomération |
| 6 | Nœux-les-Mines | 62290 | 8 km, forte densité pavillonnaire |
| 7 | Barlin | 62620 | 11 km |
| 8 | Vermelles | 62980 | 10 km |
| 9 | Chocques | 62920 | 8 km |
| 10 | Hersin-Coupigny | 62530 | 13 km |
| 11 | Mazingarbe | 62670 | 14 km |
| 12 | Houdain | 62150 | 14 km |
| 13 | Divion | 62460 | 15 km |
| 14 | Douvrin | 62138 | 14 km |
| 15 | Lillers | 62190 | 14 km, pôle ouest |
| 16 | Auchel | 62260 | 17 km |
| 17 | Bully-les-Mines | 62160 | 16 km |
| 18 | Isbergues | 62330 | 20 km |
| 19 | Lens | 62300 | 25 km, 31 000 hab. |
| 20 | Liévin | 62800 | 21 km, 30 000 hab. |

### Remplaçants possibles

À utiliser en échange d'une commune de la liste, pas en plus — le plafond de
20 est strict.

| Commune | CP | Remarque |
|---|---|---|
| Lille | 59000 | ~40 km. Marché très concurrentiel : la fiche n'y remontera pas, mais la mention est exacte |
| La Bassée | 59480 | 20 km, axe vers la métropole lilloise |
| Sailly-Labourse | 62113 | 9 km |
| Marles-les-Mines | 62540 | 16 km |
| Calonne-Ricouart | 62470 | 18 km |
| Aire-sur-la-Lys | 62120 | 28 km, pôle nord-ouest |
| Saint-Venant | 62350 | 20 km |
| Grenay | 62160 | 18 km |

---

## 3 bis. Les services

Deux listes se cumulent : celles que Google propose pour la catégorie
« Couvreur », et celles que l'on ajoute soi-même. La taxonomie de Google est
traduite de l'américain et passe à côté de l'essentiel du vocabulaire français —
c'est dans les services personnalisés que se joue la pertinence.

Pas de limite stricte au nombre, mais rester autour de **20 à 25** garde la
liste lisible. Chaque service accepte une **description de 300 caractères** :
presque personne ne la remplit, c'est du contenu indexable laissé libre.

### a. Suggestions de Google — à cocher

```
Inspection de toitures
Installation de toitures
Réparation de toitures
Réparation de dommages aux toitures
Réparation de toitures à la suite de dommages causés par le vent
Installation de gouttières
Réparation de gouttières
Nettoyage de gouttières
Installation de velux
Réparation de velux
```

**À laisser décochées :** « Pose de ventilations de grenier », « Réparation de
ventilations de grenier » et « Ventilation de greniers ». Le couvreur pose bien
des chatières et des closoirs ventilés, mais personne ne cherche cela en ces
termes en France : trois entrées quasi identiques encombreraient la liste sans
rien rapporter.

### b. Services personnalisés — à ajouter

Ils reprennent exactement les prestations du site, dans le vocabulaire
réellement tapé dans Google. Les descriptions tiennent toutes sous 300
caractères, elles se collent telles quelles.

| Service | Description (à coller) |
|---|---|
| **Recherche de fuite de toiture** | Auréole au plafond, infiltration après la pluie : nous remontons le trajet réel de l'eau depuis les combles jusqu'au point d'entrée, qui se trouve rarement au-dessus de la tache. Constat photo avant réparation. |
| **Démoussage de toiture** | Retrait mécanique des mousses et lichens sur une couverture encore saine, à faible pression pour ne pas ouvrir la porosité des tuiles. Gouttières et évacuations dégagées, et compte rendu de ce qui a été vu depuis le toit. |
| **Rénovation de toiture** | Réfection complète ou partielle : dépose de l'ancienne couverture, contrôle du voligeage et de la charpente, écran sous-toiture, liteaunage, couverture neuve et reprise de la zinguerie. Devis détaillé poste par poste. |
| **Couverture en tuiles et en ardoises** | Pose et remplacement de couverture en tuile mécanique, tuile plate, tuile béton ou ardoise. Faîtage, rives, arêtiers, écran sous-toiture et ventilation traités dans les règles de l'art. |
| **Zinguerie, chéneaux et noues** | Gouttières pendantes, chéneaux encaissés, descentes, noues, solins, bandes de rive et habillages en zinc, cuivre ou aluminium. Remplacement d'éléments corrodés et reprise des raccords qui laissent passer l'eau. |
| **Charpente bois et fermettes** | Reprise de pièces fragilisées, moisage, greffe d'about, renforcement, modification de charpente à fermettes pour aménager des combles. Diagnostic de l'état réel du bois avant chiffrage. |
| **Étanchéité de toiture-terrasse** | Membrane bitume ou EPDM, relevés d'acrotère, évacuations et points singuliers. Reprise ponctuelle ou réfection complète du complexe : une terrasse ne conduit pas l'eau, elle la contient. |
| **Couverture métallique bac acier et joint debout** | Bac acier et zinc à joint debout pour faibles pentes, annexes et bâtiments professionnels. Condensation et dilatation traitées dès la conception, pas rattrapées après coup. |
| **Pose et réparation de fenêtre de toit Velux** | Création d'ouverture, remplacement d'un modèle ancien, reprise d'un raccord d'étanchéité qui fuit. Adaptation de la charpente, raccord périphérique et finitions intérieures. |
| **Pose de bardage de façade et de pignon** | Bardage bois, composite ou métallique : ossature, pare-pluie, lame d'air ventilée et finitions. Habillage de pignon, protection de façade exposée, finition d'agrandissement. |
| **Surélévation et agrandissement de toiture** | Réhaussement, extension, création de surface habitable. Étude de faisabilité, structure, raccordement à l'existant et mise hors d'eau. Nous vous accompagnons avec un architecte pour l'autorisation en mairie. |
| **Construction à ossature bois** | Extension, annexe, garage ou abri en ossature bois : montage de la structure, contreventement, mise hors d'eau et hors d'air. Accompagnement architecte pour le dossier d'urbanisme. |
| **Diagnostic et devis de toiture gratuit** | Nous montons voir avant de chiffrer : aucun prix n'est donné au téléphone. Constat photo, explication de ce qui est constaté, puis devis détaillé ligne par ligne. Déplacement non facturé dans notre zone. |

**Total : 23 services.** Chacun correspond à une prestation réellement
pratiquée et à une page du site — la fiche et le site décrivent le même
métier, ce que Google recoupe.

> ⚠️ Ne rien ajouter du type « intervention 24h/24 », « garantie décennale » ou
> « certifié RGE » tant que ce n'est pas confirmé. Une promesse tenue sur la
> fiche mais pas sur le terrain se paie en avis négatifs, et les avis pèsent
> bien plus lourd que la liste des services.

---

## 3 ter. Photos et vidéos

### Contraintes techniques

| | Photos | Vidéos |
|---|---|---|
| Format | JPEG ou PNG | — |
| Taille | 720 × 720 px recommandé, 250 × 250 minimum | 720p minimum |
| Durée | — | **30 secondes maximum** |
| Poids | 10 Ko à 5 Mo | jusqu'à 75 Mo |

Google refuse les images fortement retouchées ou filtrées. Les photos de
chantier brutes passent sans problème — c'est même ce qu'il préfère.

### La cadence compte plus que le volume

Avec plus de 150 fichiers, la tentation est de tout verser d'un coup. C'est le
contraire qu'il faut faire : **une fiche alimentée chaque semaine est une fiche
active**, et l'activité est un signal en soi. Quelques photos par semaine,
étalées, valent mieux qu'un versement unique suivi de six mois de silence.

Ordre de priorité pour les premières :

1. La **devanture** vue de la rue — c'est la photo de couverture, celle qui
   prouve l'existence physique.
2. L'intérieur du **showroom**, puisqu'il accueille des clients.
3. Les **véhicules** siglés.
4. Les chantiers, en **avant / après** quand les deux existent.
5. L'**équipe** au travail.

### Deux points qui font perdre du temps

**Le géomarquage des photos ne sert à rien.** Google supprime les données EXIF
à l'import. Les outils qui promettent de « géolocaliser vos photos pour mieux
ranker » vendent du vide.

**Le nom du fichier n'est pas lu non plus** sur la fiche — contrairement au
site, où la convention `<prestation>-czir62.jpg` a bien un sens.

### La chaîne YouTube

L'idée est bonne, mais c'est un chantier distinct de la fiche. Trois choses
utiles à savoir avant de s'y lancer :

- une chaîne YouTube est une **entité déclarable** : son URL a sa place dans le
  champ `socials` de `src/config/site.ts`, ce qui alimente le `sameAs` des
  données structurées et aide Google à relier les traces de l'entreprise ;
- les vidéos de la fiche et celles de YouTube sont **indépendantes** : la fiche
  plafonne à 30 secondes, YouTube non. Le même rush sert aux deux, monté
  différemment ;
- une vidéo de chantier de deux minutes, titrée sur une vraie requête
  (« refaire une toiture en ardoise — chantier à Béthune »), se positionne dans
  YouTube **et** dans Google. C'est le seul format où une petite entreprise peut
  encore doubler les annuaires.

À traiter après la fiche, comme prévu.

---

## 4. Ce que les zones desservies font — et ne font pas

À savoir avant d'y passer du temps.

**Ce qu'elles font** : elles s'affichent aux visiteurs de la fiche, et elles
disent à Google ce que fait l'entreprise et où.

**Ce qu'elles ne font pas** : elles ne font pas remonter la fiche dans les
communes déclarées. Le classement local dépend surtout de la **distance entre
la personne qui cherche et l'adresse de l'établissement**, de la pertinence et
de la notoriété. Déclarer Lille ne fera pas apparaître CZIR62 sur
« couvreur Lille ».

C'est pour cette raison que les toutes petites communes limitrophes
(Vendin-lès-Béthune, Fouquières-lès-Béthune, Gosnay, Essars, Locon, Hinges,
Labeuvrière, Verquigneul) **ne figurent pas dans la liste** : l'adresse de
Béthune les couvre déjà par proximité. Les 20 places sont mieux employées sur
les communes assez éloignées pour que le point de la carte ne suffise pas.

---

## 5. Cohérence à respecter absolument

Le NAP doit être **strictement identique** entre la fiche et le site, à
l'abréviation et au trait d'union près.

| Champ | Valeur du site — `src/config/site.ts` |
|---|---|
| Nom | `CZIR62 — Entreprise Générale de Couverture` |
| Adresse | `100 rue Sainte-Pry, 62400 Béthune` |
| Téléphone | `07 86 70 41 34` |
| E-mail | `Ent.czir62@hotmail.com` |
| Site | `https://www.czir62.fr` |

> Si la fiche écrit « 100 Rue Sainte Pry » sans trait d'union, il faut
> **corriger le site**, pas la fiche : c'est la fiche qui fait foi.

---

## 6. Après la création

1. Récupérer le **`placeId`** de la fiche et le renseigner dans
   `src/config/site.ts` → les blocs d'avis s'activent sur 13 pages, le lien
   « laisser un avis » apparaît, et le champ `sameAs` des données structurées
   relie le site à la fiche.
2. Renseigner les **horaires d'ouverture** — Google les affiche dans le Local
   Pack avec la mention ouvert / fermé en temps réel.
3. Publier des **photos** : la devanture en premier, puis les chantiers.
4. Demander des **avis** aux clients passés. C'est le poste le plus rentable :
   les concurrents locaux affichent 4,7/5 et le site n'affiche rien.

---

## À confirmer

**Roncq (59223)** figure dans la zone déclarée du site d'après l'indication
orale « Ronque ». C'est à environ **55 km par la route**, au nord de Lille —
au-delà du rayon de 40 km annoncé sur le site.

Deux possibilités : soit la commune visée est **Ronchin** (59790, au sud de
Lille, ~45 km), soit les déplacements vont réellement jusqu'à Roncq et il faut
alors ajuster le rayon annoncé sur le site. Une ligne à changer dans
`src/data/villes.ts` dans les deux cas.
