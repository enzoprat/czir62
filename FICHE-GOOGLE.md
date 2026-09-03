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
