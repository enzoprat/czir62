# Audit Search Console — czir62.fr
**27 septembre 2026** · propriété Domaine `sc-domain:czir62.fr` · 14 jours de données

---

## 1. Ce que disent les chiffres

- **31 clics, 521 impressions** en 14 jours. 32 des 33 pages du sitemap sont indexées.
- **89 % des impressions sont des requêtes locales**, 1 seule impression de marque : le site capte de la demande nouvelle, pas son propre nom.
- Sur « couvreur béthune », l'accueil est servi **deux fois** : `http://czir62.fr/` en position 1,5-2,8 et la version canonique en position 49-70.
- Ces positions hautes datent du **17 septembre** et proviennent presque certainement du pack local, pas de l'organique.
- `/ossature-bois/` est **détectée mais non indexée** : 0 impression sur 14 jours.

## 2. Fiabilité de l'analyse

| | |
|---|---|
| Période couverte | 11 → 24 septembre 2026 (**14 jours**) |
| Période de comparaison | **inexistante** — la propriété n'a pas d'antériorité |
| Part anonymisée — clics | **100 %** (0 clic attribué sur 31) |
| Part anonymisée — impressions | 49 % (266 sur 521) |
| `seuil_impressions` | `max(30, p60=2)` = **30** — 1 requête sur 39 le dépasse |
| `seuil_clics` | `max(3, p75=1)` = **3** — 0 page le dépasse |

**Conséquence directe :** aucun clic ne peut être attribué à une requête. Le skill impose de basculer le poids de l'audit sur l'analyse par page — c'est ce qui est fait ici. Toute phrase de ce rapport portant sur les clics s'appuie sur `page_28.csv`, jamais sur `query_28.csv`.

**Non mesurable à ce stade :** tendance (3.1), pages en perte (3.5), requêtes gagnées/perdues (3.6), courbe de CTR (3.3), saisonnalité (3.11). Les quatre premières redeviennent possibles le **10 novembre 2026**, la dernière en octobre 2027.

**Non mesuré :** le volet IA générative — la Search Console n'expose pas ce rapport par API. Il faut l'exporter manuellement depuis l'interface.

## 3. Actions

Quatorze jours ne produisent pas dix actions défendables. En voici quatre, chacune adossée à sa mesure.

| # | Action | Preuve | Effort |
|---|---|---|---|
| 1 | Mettre le champ « site web » de la fiche Google à `https://www.czir62.fr/` | `http://czir62.fr/` capte 33 des 40 impressions d'accueil du 24/09, à partir du 17/09 ; c'est une redirection 308 | S |
| 2 | Vérifier pourquoi `/ossature-bois/` n'est pas indexée | Inspection : « Détectée, actuellement non indexée » · 0 impression / 33 pages | S |
| 3 | Ne rien conclure des positions 1,5-2,8 | Sur les mêmes requêtes, l'URL canonique est en 49-70 : l'écart trahit une origine pack local | — |
| 4 | Laisser courir jusqu'au 10 novembre | Aucune comparaison période sur période n'est possible avant | — |

## 4. Détail par analyse

### 3.1 Tendance — non mesurable
La régression du skill porte sur 90 jours. 14 jours disponibles.

### 3.2 Quick wins — une seule ligne au-dessus du seuil

| Requête | Impressions | Position |
|---|---|---|
| couvreur bethune | 139 | **28,6** |

Le terme de tête est en page 3 après quatorze jours. C'est la ligne de base à surveiller, pas encore un gisement : le calcul `impressions × (ctr_cible − ctr_actuel)` exige une courbe de CTR, impossible à construire sans clics attribués.

### 3.3 Courbe de CTR — non mesurable
100 % des clics sont anonymisés au niveau requête. La courbe se construirait sur zéro point.

### 3.4 Cannibalisation — 1 cas critique réel

| Requête | Impressions | Part dominante | URL 1 | URL 2 | Sévérité |
|---|---|---|---|---|---|
| couvreur bethune | 204 | 0,43 | apex http — pos **2,8** | canonique — pos **36,4** | **critique** |
| couvreur | 9 | 0,44 | apex http — pos 2,5 | pos 10,5 | critique |
| toiture bethune | 9 | 0,22 | apex http — pos 2,5 | pos 97,5 | critique |

Les trois cas critiques ont la même cause : **l'apex en HTTP**. Ce n'est pas une cannibalisation entre deux pages de contenu, c'est un dédoublement d'une seule page entre deux URLs. Corriger l'action 1 les fait disparaître ensemble.

`/couvreur-bethune/`, la page ville dédiée, est en position **75,3** sur sa propre requête cible. Normal à quatorze jours, à surveiller après le 10 novembre.

### 3.5 Pages en perte — non mesurable
`page_28_prev.csv` : 0 ligne.

### 3.6 Requêtes gagnées / perdues — non mesurable
`query_28_prev.csv` : 0 ligne.

### 3.7 Intentions — le diagnostic le plus important du rapport

| Intention | Requêtes | Impressions | Part |
|---|---|---|---|
| Locale | 26 | 237 | **89,1 %** |
| Non classée | 11 | 27 | 10,2 % |
| Marque | 1 | 1 | 0,4 % |
| Transactionnelle | 1 | 1 | 0,4 % |

Le skill prévient qu'une part de marque supérieure à 50 % signifie que le site ne capte pas de demande nouvelle. **Elle est à 0,4 %.** Les impressions viennent presque intégralement de requêtes locales de métier — c'est le bon signal, et il est rare à ce stade.

### 3.8 Pages sans impression

| Page | État d'indexation |
|---|---|
| `/ossature-bois/` | Détectée, actuellement non indexée |

Une page sur 33. Elle est dans le sitemap, elle a des liens internes entrants, et Google l'a vue sans l'indexer. À réinspecter dans deux semaines avant d'agir sur le contenu.

### 3.9 Mobile / desktop

| Appareil | Impressions | Part |
|---|---|---|
| Desktop | 168 | 63,2 % |
| Mobile | 95 | 35,7 % |
| Tablette | 3 | 1,1 % |

Le skill attend plus de 70 % de mobile sur un site local. On en est loin. À 263 impressions, l'échantillon ne permet pas de conclure — et une partie du desktop vient probablement des consultations internes au projet. À revérifier après le 10 novembre.

### 3.10 Géographie

| Pays | Impressions | Part |
|---|---|---|
| France | 198 | 74,4 % |
| Philippines | 25 | 9,4 % |
| Colombie, Argentine, Inde | 19 | 7,2 % |

25,6 % hors France, juste au-dessus du seuil de 25 % du skill. Sur un couvreur béthunois, ces impressions n'ont aucune réalité commerciale — profil de bruit automatisé. Elles tirent la position moyenne vers le bas sans conséquence. Aucune action.

### 3.11 Saisonnalité — non mesurable
14 jours contre 13 mois requis.

### 3.12 Apparences enrichies
`appearance.csv` : 0 ligne. **Aucun résultat enrichi actif**, ce qui est cohérent : le site n'émet ni `aggregateRating` ni `priceRange`, et les FAQ ne génèrent plus de rich result depuis leur restriction par Google en 2023.

### Phase 4 — Indexation

| | |
|---|---|
| Indexées | **32 / 35** URLs inspectées |
| Canonique déclarée ≠ retenue | **0** |
| Bloquées par robots.txt | 0 |
| Échecs de récupération | 0 |

Google retient `https://www.czir62.fr/` comme canonique sur **les trois variantes** de l'accueil, apex HTTP inclus. La consolidation est correcte ; le problème de l'action 1 est un problème d'URL servie dans les résultats, pas de canonicalisation.

Dernier crawl sur toutes les URLs : **12/09/2026 16:19 UTC**. Aucune n'a été recrawlée depuis — normal sur un domaine neuf.

## 5. Annexe — méthodes

- `part_anonymisée = 1 − (Σ clics des lignes requête) / (clics totaux de totals.json)`
- `seuil_impressions = max(30, percentile_60(impressions des requêtes))`
- `seuil_clics = max(3, percentile_75(clics des pages))`
- Cannibalisation : `part_dominante = impressions de la 1re URL / impressions totales de la requête` ; critique si `< 0,55` et au moins 2 URLs au-dessus de 10 % des impressions
- Intentions : règles appliquées dans l'ordre marque → locale → transactionnelle → informationnelle → non classée, sur les impressions faute de clics attribuables
- Aucun volume de recherche n'apparaît dans ce rapport : la Search Console n'en fournit pas.

**CSV produits** : `out/inspection.csv`, `out/cannibalisation.csv`, `out/clusters.csv`, `out/pages_mortes.csv` · **données brutes** : `data/`
