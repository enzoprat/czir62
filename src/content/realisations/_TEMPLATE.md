---
# ===========================================================================
# GABARIT DE REALISATION — copier ce fichier, le renommer, remplir.
# Le nom du fichier devient l'URL : renovation-toiture-bethune.md
#   -> https://www.czir62.fr/realisations/renovation-toiture-bethune/
# Choisir un nom qui decrit le chantier : <prestation>-<ville>[-<precision>]
# ===========================================================================
titre: "Rénovation de toiture à Béthune"          # Titre editorial, avec la commune
ville: "bethune"                                   # slug present dans src/data/villes.ts
service: "renovation-toiture"                      # slug present dans src/data/services.ts
servicesSecondaires: ["zinguerie"]                 # autres prestations REELLEMENT realisees
date: 2026-03-14                                   # date de fin de chantier
typeBien: "maison de ville"                        # maison individuelle | maison de ville | dépendance | bâtiment professionnel | immeuble
surface: 95                                        # m2 — uniquement si mesure, sinon supprimer la ligne
duree: "5 jours"                                   # uniquement si confirmee, sinon supprimer la ligne

resume: "Une phrase concrète décrivant le chantier, telle qu'on la raconterait au client."
probleme: "Ce qui a été constaté à l'arrivée, factuellement."
travaux:
  - "Première étape réellement effectuée"
  - "Deuxième étape"
materiaux:
  - "Matériau réellement posé"

photo:
  src: "/images/realisations/mon-chantier/couverture.jpg"
  alt: "Description réelle de ce que montre la photo"
  width: 1600
  height: 1067
photos:
  - src: "/images/realisations/mon-chantier/detail-1.jpg"
    alt: "Description réelle"
    legende: "Légende affichée sous la photo"
avantApres:
  avant:
    src: "/images/realisations/mon-chantier/avant.jpg"
    alt: "Toiture avant travaux : décrire ce que l'on voit"
  apres:
    src: "/images/realisations/mon-chantier/apres.jpg"
    alt: "Toiture après travaux : décrire ce que l'on voit"

featured: false                                    # true = mise en avant sur l'accueil
draft: true                                        # PASSER A false POUR PUBLIER
---

Le corps du fichier est le récit du chantier, en Markdown.

Écrire comme on expliquerait le chantier à un voisin : ce qui a été constaté,
ce qui a été décidé et pourquoi, ce qui a été fait. Pas de superlatifs.

## Ce que nous avons constaté

## Ce que nous avons proposé

## Le déroulé du chantier
