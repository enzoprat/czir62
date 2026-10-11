# Citations locales — état du NAP

Une citation est une mention du nom, de l'adresse et du téléphone sur un site
tiers. Google les recoupe pour confirmer qu'une entreprise existe réellement là
où elle le prétend. **Une citation n'aide que si elle est exacte** : une
divergence ne fait pas rien, elle dilue.

Référence, dans cet ordre de priorité — la fiche Google fait foi :

| | |
|---|---|
| Nom | **CZIR62 Couvreur Béthune** |
| Adresse | **100 rue Saint-Pry, 62400 Béthune** |
| Téléphone | **07 86 70 41 34** |
| Site | **https://www.czir62.fr/** |

---

## Relevé du 11 octobre 2026

| Source | Nom | Adresse | Tél | Lien vers le site |
|---|---|---|---|---|
| Fiche Google | ✅ | ✅ | ✅ | ✅ |
| [entreprises.lefigaro.fr](https://entreprises.lefigaro.fr/czir-62-62/entreprise-109525725) | « CZIR 62 » | `100 RUE SAINT PRY` | — | ⛔ aucun |
| [tous-couvreurs.fr](https://www.tous-couvreurs.fr/pro/czir62-couvreur-bethune-bethune) | ✅ | non affichée | ✅ | ⛔ aucun |

### entreprises.lefigaro.fr — rien à corriger

Miroir des données INSEE. Il affiche la **raison sociale** (« CZIR 62 ») et
l'adresse dans la **normalisation administrative**, sans trait d'union ni
accent. C'est normal et ce n'est pas corrigeable : ce n'est pas une fiche
éditable, c'est une republication du registre.

Valeur réelle : elle confirme l'existence légale de l'entreprise, avec le SIRET.
C'est elle qui m'a fourni `10952572500015`.

### tous-couvreurs.fr — **fiche revendicable, à prendre**

La page affiche « **Vous êtes ce professionnel ? Prenez en main cette fiche
gratuitement** ». C'est l'action la plus rentable de cette liste.

Le contenu a été scrapé depuis le site le 26 septembre : les 13 prestations, le
rayon de 40 km, le déroulé des chantiers, et « actif depuis 1995 » — la
correction du 24 septembre a donc bien essaimé.

Trois choses à corriger en prenant la main :

1. **Ajouter l'URL du site.** Aucun lien aujourd'hui. Une citation liée vaut
   nettement plus qu'une mention sèche.
2. **Les horaires sont faux** — voir ci-dessous.
3. **La note affiche 5 avis**, il y en a 8.

---

## ✅ Les horaires — tranchés le 11 octobre 2026

**7h-19h en continu, du lundi au samedi inclus.** Dimanche fermé.

| Source | État |
|---|---|
| Site | ✅ corrigé — affichage et balisage `openingHoursSpecification` |
| Fiche Google | ⚠️ ferme bien à 19h, **ouverture et samedi à vérifier** |
| tous-couvreurs.fr | ⚠️ affiche déjà 7h-19h lun-sam — à confirmer en prenant la fiche |

Le site portait 9h-12h / 14h-18h du lundi au vendredi, relevés sur la porte du
local. C'était faux de moitié : **35 heures affichées pour 72 réelles**, pas de
samedi, et une coupure de midi qui n'existe pas.

La mention « samedi matin sur rendez-vous » est retirée : le samedi est une
journée pleine, la présenter comme une faveur sous-vend une disponibilité qui
est totale.

Reste à aligner la fiche Google — c'est elle que Google affiche dans le pack
local, et c'est là que la divergence coûte le plus cher.

---

## Maisnil (62130) — hors zone déclarée

La fiche ressort dans les recherches Maps de Maisnil, qui ne figure **ni dans
`villes.ts` ni dans `communesDesservies`**. Google élargit de lui-même au-delà
du périmètre déclaré, ce qui est bon signe.

À décider : si ces communes de l'ouest béthunois sont réellement desservies,
elles ont leur place dans la zone. Sinon on ne touche à rien — Google peut
afficher la fiche où il veut, c'est le site qui doit rester exact.

---

## Ce qui reste à construire

Aucune démarche de citation n'a été entreprise à ce jour. Les deux relevées
sont venues seules. Les annuaires qui comptent pour un artisan du bâtiment,
par ordre d'utilité et tous gratuits :

- **Pages Jaunes** — le plus consulté, et il ressort déjà en première page sur
  « couvreur béthune » sans CZIR62 dedans
- **Bing Places** — l'équivalent de la fiche Google, et il alimente Copilot
- **Apple Business Connect** — gratuit, et c'est ce que voit un iPhone
- Annuaires métier : Houzz, Travaux.com, Ooreka

**Règle unique** : le NAP du tableau en tête de ce fichier, au caractère près.
Mieux vaut trois citations exactes que dix approximatives.
