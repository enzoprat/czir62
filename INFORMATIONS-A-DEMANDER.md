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

### 2. La fiche Google Business Profile
`src/config/site.ts` → `google.placeId`, `google.cid`, `google.profileUrl`

**Sur « couvreur Béthune », les quatre premiers résultats organiques sont des
annuaires** (Pages Jaunes en tête). Au-dessus d'eux, Google affiche le Local
Pack — trois fiches Google avec note, horaires et bouton d'appel. C'est là que
se joue l'essentiel des appels, pas dans les résultats bleus.

Le site est prêt : dès que le `placeId` est renseigné, les blocs d'avis
s'activent sur 13 pages, le lien « laisser un avis » apparaît, et le champ
`sameAs` des données structurées relie le site à la fiche.

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

> ⚠️ Reste à obtenir : **le nom du dirigeant**. Une expérience attribuée à une
> personne nommée vaut bien plus qu'à un « artisan » anonyme — c'est le premier
> facteur de crédibilité pour un métier où l'on fait entrer quelqu'un chez soi.

### 5. Les horaires d'ouverture
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

### 7. Les coordonnées GPS du local
`src/config/site.ts` → `nap.geo.lat` / `nap.geo.lng`

Clic droit sur le point exact dans Google Maps → « Copier les coordonnées ».
Active la carte de la page contact et le champ `geo` des données structurées.

### 8. La photo de devanture
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

### 10. Le démoussage est-il bien une prestation de l'entreprise ?
`src/data/services.ts` → entrée `demoussage-toiture`

**À confirmer explicitement.** Le démoussage et l'entretien figuraient déjà
dans le registre des prestations du site (en sous-prestations de la page
couverture) ; l'audit a montré que c'est l'une des requêtes les plus
recherchées du métier sur le secteur, avec un spécialiste local dédié et des
annonces payantes. Une page complète lui a donc été créée.

Si l'entreprise **ne fait pas** de démoussage, il suffit de le dire : la page
et l'entrée du registre sont supprimées d'un bloc.

À préciser également :
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

### 13. « Ronque » : Roncq ou Ronchin ?
`src/data/villes.ts` → `communesDesservies`

**Roncq** (59223, métropole lilloise) a été retenu d'après l'indication orale.
S'il s'agissait de **Ronchin** (59790), c'est une seule ligne à corriger.

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
