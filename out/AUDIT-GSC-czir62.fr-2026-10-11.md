# Audit Search Console — czir62.fr
**11 octobre 2026** · propriété Domaine `sc-domain:czir62.fr` · 28 jours de données
*Run n°3 — ouvre par le diff avec le 4 octobre*

---

## 1. Le diff

| Métrique | 04/10 | 11/10 | |
|---|---|---|---|
| Clics (28 j) | 45 | **56** | +24 % |
| Impressions (28 j) | 864 | **1 354** | +57 % |
| Requêtes distinctes | 61 | **85** | +39 % |
| Position moyenne | 27,7 | 28,2 | +0,6 |
| Pages indexées | 33 / 33 | 33 / 33 | — |
| Impressions apex http (quotidien) | 0 | **0** | tenu |

### Ce qui a été corrigé, et qui tient

L'apex en HTTP est à **zéro impression tous les jours** depuis le 28 septembre. Les 271 impressions encore comptées dans la fenêtre 28 jours sont le résidu historique, elles sortiront d'elles-mêmes.

L'accueil canonique tourne désormais entre 21 et 65 impressions par jour, contre 7 avant la correction.

### Ce qui s'est dégradé

**Rien.** La position moyenne monte de 0,6 rang, mais c'est de l'élargissement, pas une perte — démonstration en 3.1.

---

## 2. Fiabilité

| | |
|---|---|
| Période | 11 septembre → 8 octobre 2026 (**28 jours pleins**) |
| Période de comparaison | **0 ligne** — disponible le 10 novembre |
| Part anonymisée — clics | **96,4 %** (2 clics attribués sur 56) |
| Part anonymisée — impressions | 46 % |
| `seuil_impressions` | `max(30, p60=2)` = **30** → 2 requêtes |
| `seuil_clics` | `max(3, p75=1)` = **3** → 4 pages |

**Non mesurable :** tendance sur 90 j, pages en perte, requêtes gagnées/perdues, courbe de CTR, saisonnalité.
**Non mesuré :** volet IA générative (pas d'API).

---

## 3. Actions

| # | Action | Preuve | Effort |
|---|---|---|---|
| 1 | Ne toujours rien restructurer | Aucune comparaison période sur période valide avant le 10 novembre | — |
| 2 | Noter le motif pages dédiées vs accueil | Confirmé sur deux pages : écart de 12 à 60 rangs sur leurs propres requêtes cibles | — |
| 3 | Ignorer définitivement le « déficit mobile » | Mesuré : 48 % mobile en France, 2 % hors France. Le déficit venait du trafic automatisé | — |

Trois actions, et deux consistent à ne pas agir. À 28 jours c'est le bon arbitrage.

---

## 4. Détail par analyse

### 3.1 Tendance — la position baisse pour une bonne raison

Régression 90 jours toujours impossible. Mais la hausse de 0,6 rang se décompose :

| | Requêtes | Impressions | Position pondérée |
|---|---|---|---|
| ≥ 10 impressions | 11 | 550 | **33,5** |
| < 10 impressions | 74 | 176 | **48,6** |

74 requêtes neuves entrent à la position 48,6 et tirent la moyenne du site. Les requêtes établies, elles, n'ont pas bougé. Clics +24 %, impressions +57 % : c'est la signature d'une découverte qui s'élargit, pas d'une perte de classement.

### 3.2 Quick wins — aucun au-dessus du seuil

| Requête | Impressions | Position |
|---|---|---|
| couvreur bethune | 323 | 28,3 |
| couvreur béthune | 58 | 19,1 |

**0 requête en position 4-15 au-dessus de 30 impressions.** Deux candidates émergent juste en dessous du seuil : `pose de velux bethune` (16 imp, position 11,0) et `couverture batiment` (17 imp, position 7,5).

### 3.3 Courbe de CTR — non mesurable
96,4 % des clics anonymisés.

### 3.4 Cannibalisation — un motif se confirme

Sur 14 jours glissants :

| Requête | Impressions | Part dominante | Sévérité |
|---|---|---|---|
| couvreur bethune | 253 | 0,58 | à surveiller |
| couvreur béthune | 50 | **0,48** | **critique** |

Mais le fait marquant est ailleurs. **Les pages dédiées sont très loin derrière l'accueil sur leurs propres requêtes cibles** :

| Requête | Accueil | Page dédiée | Écart |
|---|---|---|---|
| pose de velux bethune | **5,0** | `/pose-velux/` — 17,4 | 12 rangs |
| remplacement de velux bethune | **4,4** | `/pose-velux/` — 16,8 | 12 rangs |
| couvreur béthune | **16,0** | `/couvreur-bethune/` — 76,6 | 60 rangs |

Le motif est désormais observé sur **deux pages indépendantes**, pas une. Google concentre l'autorité sur l'accueil, ce qui est le comportement normal d'un domaine de quatre semaines : les pages profondes n'ont pas encore accumulé de signal.

**Décision : ne rien toucher.** Restructurer maintenant reviendrait à agir sur un classement qui n'a pas convergé. Remesure le 10 novembre — si l'écart persiste à trois mois, il faudra différencier les angles et recâbler le maillage.

### 3.5 / 3.6 — non mesurables
Fenêtres de comparaison vides.

### 3.7 Intentions — stable sur trois runs

| Intention | Requêtes | Impressions | Part |
|---|---|---|---|
| Locale | 42 | 596 | **82,1 %** |
| Non classée | 41 | 127 | 17,5 % |
| Marque | 1 | 2 | **0,3 %** |

Troisième run consécutif sous 0,5 % de marque. Le site capte de la demande de métier, pas son propre nom.

### 3.8 Pages sans impression
**Aucune.** Les 33 pages du sitemap sont servies.

### 3.9 Mobile — le déficit était un artefact, et c'est mesuré

Le brut affichait 35 % de mobile, contre les 70 % attendus sur un site local. En croisant appareil × pays :

| | Impressions | % mobile | Clics |
|---|---|---|---|
| **France** | 1 152 | **48 %** | 53 |
| **Hors France** | 202 | **2 %** | 3 |

Le trafic étranger est **98 % desktop**. Aux Philippines, en Inde ou en Indonésie, le mobile domine largement le web : un profil à 98 % desktop n'est pas humain. C'est lui qui tirait la moyenne du site de 48 % à 35 %.

Reste que 48 % n'est pas 70 %. La couverture est un achat réfléchi, souvent instruit depuis un bureau — mais ces données ne permettent pas de le démontrer. **Non conclu.**

### 3.10 Géographie — même conclusion, chiffrée

25,3 % d'impressions hors France (Philippines 7,7 %, Inde, Indonésie, Colombie, Argentine). Croisé avec l'appareil, le profil est celui d'outils automatisés : desktop exclusif, positions 80-100, et **3 clics sur 202 impressions**.

Cas d'école : « recherche de fuite béthune » — 27 impressions, **100 % hors France**, 0 % mobile. Personne en Indonésie ne cherche une fuite à Béthune.

Ces impressions gonflent le dénominateur et dégradent la position moyenne du rapport sans aucune réalité commerciale. **Aucune action possible** — on ne filtre pas le trafic entrant. Il faut seulement le savoir en lisant les chiffres.

### 3.11 Saisonnalité — non mesurable
28 jours contre 13 mois requis.

### 3.12 Apparences enrichies
0 ligne. Aucun résultat enrichi actif, conforme à la décision de ne pas baliser les avis.

### Phase 4 — Indexation

| | 04/10 | 11/10 |
|---|---|---|
| Indexées | 33 / 35 | **33 / 35** |
| Écarts canonique déclarée / retenue | 0 | **0** |
| Bloquées robots.txt | 0 | 0 |

Les 2 non-PASS sont les variantes de redirection de l'accueil, comportement attendu.

---

## 5. Annexe

Méthodes inchangées depuis le run du 27/09. Deux ajouts :

- **Décomposition de la position** (3.1) : moyenne pondérée par les impressions, calculée séparément au-dessus et en dessous de 10 impressions par requête.
- **Croisement appareil × pays** (3.9/3.10) : requête `dimensions:['country','device']` sur 28 jours, hors fichiers standard du skill — c'est elle qui tranche entre déficit mobile réel et artefact de trafic automatisé.

**CSV** : `out/inspection.csv` · **données** : `data/` · **historique** : `.gsc/history.sqlite`
