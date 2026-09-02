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

### 1. Le numéro de téléphone
`src/config/site.ts` → `nap.phone` et `nap.phoneE164`

C'est de loin le manque le plus coûteux. Aujourd'hui, **tous les boutons
d'appel du site basculent en « Être rappelé »** : la barre mobile persistante,
l'en-tête, chaque hero de prestation, la page contact, la page devis.

Sur un métier de dépannage, la moitié des prises de contact se font par appel
direct depuis un téléphone. Le formulaire ne remplace pas un bouton d'appel
quand quelqu'un a de l'eau qui tombe dans son salon.

Le téléphone conditionne aussi :
- la balise `telephone` des données structurées, que Google utilise pour
  rapprocher le site de la fiche Google Business Profile ;
- la cohérence NAP entre le site, la fiche Google et les annuaires — c'est
  l'un des critères les plus établis du référencement local.

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

### 4. L'assurance décennale
`src/config/site.ts` (champ à créer) — nom de l'assureur, n° de contrat,
activités garanties, zone géographique.

⚠️ **Point de cohérence à traiter en priorité.** Le site explique désormais aux
visiteurs, sur la page prix et sur la page démoussage, que la loi du 18 juin
2014 impose de faire figurer ces informations sur tout devis du bâtiment — et
qu'un devis qui ne les porte pas doit être refusé.

Nous donnons ce conseil sans le suivre nous-mêmes. Un visiteur attentif le
remarquera, et c'est exactement le genre de détail qui coûte une affaire.

Tous les concurrents locaux affichent « garantie décennale ».

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
