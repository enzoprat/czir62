# Audit Search Console — czir62.fr
**4 octobre 2026** · propriété Domaine `sc-domain:czir62.fr` · 21 jours de données
*Run n°2 — s'ouvre par le diff avec le 27 septembre*

---

## 1. Le diff

| Métrique | 27/09 | 04/10 | |
|---|---|---|---|
| Clics (28 j) | 31 | **45** | +45 % |
| Impressions (28 j) | 521 | **864** | +66 % |
| Position moyenne | 28,6 | 27,7 | −0,9 |
| Requêtes distinctes | 39 | **61** | +56 % |
| Pages indexées | 32 / 33 | **33 / 33** | +1 |
| Écarts canonique déclarée / retenue | 0 | 0 | — |

### Ce qui a été corrigé

**L'URL de la fiche Google.** Les impressions de `http://czir62.fr/` sont tombées à **zéro depuis le 28 septembre**. Sur les 7 derniers jours : 28 impressions pour l'apex contre 190 pour l'URL canonique, là où la semaine précédente donnait 236 contre 60.

La consolidation n'a rien coûté, elle a rapporté : l'accueil canonique est passé de ~7 impressions/jour à 25-54.

**`/ossature-bois/` est indexée.** Crawlée le 27/09 à 15h31, verdict `PASS`, 10 impressions depuis. Les 33 pages du sitemap ont désormais été servies au moins une fois.

### Ce qui s'est dégradé

Rien.

### Ce qui n'a pas bougé

La part anonymisée des clics reste à **95,6 %** (43 clics sur 45 non attribuables à une requête). L'analyse par requête reste impossible sur les clics.

## 2. Fiabilité

| | |
|---|---|
| Période | 11 septembre → 1er octobre 2026 (**21 jours**) |
| Période de comparaison | **0 ligne** — toujours pas d'antériorité |
| Part anonymisée — clics | **95,6 %** |
| Part anonymisée — impressions | 48 % |
| `seuil_impressions` | `max(30, p60=2)` = **30** → 2 requêtes le dépassent |
| `seuil_clics` | `max(3, p75=1)` = **3** → 4 pages le dépassent |

**Non mesurable :** tendance (3.1), pages en perte (3.5), requêtes gagnées/perdues (3.6), courbe de CTR (3.3), saisonnalité (3.11). Les quatre premières deviennent possibles le **10 novembre 2026**.

**Non mesuré :** volet IA générative — pas d'API, export manuel requis.

## 3. Actions

| # | Action | Preuve | Effort |
|---|---|---|---|
| 1 | Ne rien restructurer avant le 10 novembre | Aucune comparaison période sur période n'est valide avant | — |
| 2 | Surveiller `/couvreur-bethune/` | 6 % des impressions de sa propre requête cible, position 65,3 — contre 62 % et position 20,4 pour l'accueil | — |
| 3 | Laisser le `?prestation=` hors sitemap | `/devis/?prestation=renovation-toiture` est indexée : 11 imp, 1 clic. Sans gravité, mais à ne pas multiplier | S |

Trois actions, pas dix. À 21 jours, le reste relèverait de l'invention.

## 4. Détail par analyse

### 3.1 Tendance — non mesurable
Régression sur 90 jours requise, 21 disponibles.

### 3.2 Quick wins

| Requête | Impressions | Clics | Position |
|---|---|---|---|
| couvreur bethune | 217 | 2 | **27,5** |
| couvreur béthune | 43 | 0 | **19,3** |

Deux requêtes au-dessus du seuil contre une au run précédent. Le terme de tête gagne 1 rang en une semaine (28,6 → 27,5). Le calcul `impressions × (ctr_cible − ctr_actuel)` reste impossible : il exige une courbe de CTR, elle-même impossible sans clics attribués.

### 3.3 Courbe de CTR — non mesurable
95,6 % des clics sont anonymisés.

### 3.4 Cannibalisation — la nature du problème a changé

L'apex en HTTP a disparu. Mais sur les 7 derniers jours, le terme de tête est servi par **neuf URLs** :

| URL | Part | Position |
|---|---|---|
| `/` | **62 %** | 20,4 |
| `/contact/` | 10 % | 51,0 |
| `/reparation-toiture/` | 7 % | 89,4 |
| **`/couvreur-bethune/`** | **6 %** | **65,3** |
| 5 autres | 15 % | 93 à 100 |

Part dominante 0,62 → **à surveiller**, pas critique. Sur « couvreur béthune » en revanche, la part dominante tombe à **0,39** — critique au sens du skill, avec cinq URLs au-dessus de 10 %.

Le fait notable : **la page ville dédiée est neuvième sur sa propre requête cible**, derrière la page contact. Google préfère l'accueil pour le terme de tête — ce qui est fréquent et pas nécessairement faux. À 21 jours et position 65, c'est trop tôt pour restructurer : il n'y a pas assez de données pour distinguer une préférence durable d'un classement qui n'a pas encore convergé.

**Décision : ne rien toucher, remesurer le 10 novembre.**

### 3.5 / 3.6 — non mesurables
`page_28_prev.csv` et `query_28_prev.csv` : 0 ligne.

### 3.7 Intentions

| Intention | Requêtes | Impressions | Part |
|---|---|---|---|
| Locale | 36 | 391 | **86,9 %** |
| Non classée | 23 | 57 | 12,7 % |
| Marque | 1 | 1 | 0,2 % |
| Transactionnelle | 1 | 1 | 0,2 % |

Stable par rapport au 27/09 (89,1 % local, 0,4 % marque). Le site continue de capter de la demande de métier, pas son propre nom.

### 3.8 Pages sans impression
**Aucune.** Les 33 pages du sitemap ont été servies au moins une fois. `/ossature-bois/`, seul manque du run précédent, est résolu.

### 3.9 Mobile / desktop

| Appareil | Impressions | Part |
|---|---|---|
| Desktop | 292 | 64,9 % |
| Mobile | 155 | 34,4 % |

Inchangé — le skill attend plus de 70 % de mobile sur un site local. L'écart persiste sur deux runs, il ne s'explique plus entièrement par les consultations internes. À creuser après le 10 novembre, quand le volume le permettra.

### 3.10 Géographie
France 73,8 %, Philippines 9,6 %, Indonésie 2,4 %, Inde 2,2 %. **26,2 % hors France**, au-dessus du seuil de 25 % du skill — mais le profil (Asie du Sud-Est, volumes constants, zéro clic) est celui d'un trafic automatisé. Sans conséquence commerciale, aucune action.

### 3.11 Saisonnalité — non mesurable
21 jours contre 13 mois requis.

### 3.12 Apparences enrichies
`appearance.csv` : 0 ligne. Aucun résultat enrichi actif, inchangé.

### Phase 4 — Indexation

| | 27/09 | 04/10 |
|---|---|---|
| Indexées | 32 / 35 | **33 / 35** |
| Écarts canonique | 0 | 0 |
| Bloquées robots.txt | 0 | 0 |

Les 2 URLs non-PASS sont `http://czir62.fr/` et `https://czir62.fr/`, toutes deux en « Page avec redirection » avec la canonique correctement retenue. C'est le comportement attendu d'une redirection, pas un défaut.

## 5. Annexe — méthodes

Identiques au run du 27/09. Cannibalisation calculée sur une fenêtre glissante de 7 jours plutôt que sur 90, afin que les journées antérieures à la correction de la fiche Google ne masquent pas l'état actuel.

**CSV** : `out/inspection.csv` · **données brutes** : `data/` · **historique** : `.gsc/history.sqlite`
