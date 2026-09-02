/* ===========================================================================
 * CZIR62 — Communes d'intervention
 * ---------------------------------------------------------------------------
 * PRINCIPE : une page ville n'existe que si elle a quelque chose a dire.
 * Chaque entree porte un angle local propre (bati dominant, toitures
 * rencontrees, contraintes reelles). Aucune page n'est un clone : le gabarit
 * lit ces champs, mais le fond change entierement d'une commune a l'autre.
 *
 * REGLES ANTI-INVENTION
 *  - Aucune reference a un chantier n'est ecrite ici. Les realisations
 *    affichees sur une page ville proviennent exclusivement de la collection
 *    `realisations` et sont filtrees sur le champ `ville`. Pas de chantier
 *    enregistre = le bloc affiche une alternative honnete.
 *  - Les caracteristiques du bati sont formulees au niveau du type d'habitat
 *    (« on rencontre souvent »), jamais comme un releve exhaustif.
 *  - `distanceKm` = distance routiere approximative depuis Bethune.
 *    A VERIFIER avant mise en ligne si vous souhaitez l'afficher au km pres.
 *  - `secteurs` : noms de quartiers a faire valider par l'entreprise avant
 *    publication. Ce sont les elements les plus faciles a contester localement.
 * ========================================================================= */

export interface VilleFaq {
  q: string;
  a: string;
}

export interface Ville {
  slug: string;
  /** URL ciblant directement la requete « couvreur <ville> » */
  url: string;
  name: string;
  /** Forme utilisee dans une phrase : « à Béthune », « à Nœux-les-Mines » */
  inCity: string;
  postalCode: string;
  /** Distance routiere approximative depuis le local de Bethune, en km */
  distanceKm: number;
  /** Commune ou se trouve le local physique */
  isBase?: boolean;
  metaTitle: string;
  metaDescription: string;
  /** Accroche de la page — angle propre a la commune */
  intro: string;
  /** Le bati dominant, en une a deux phrases concretes */
  habitat: string;
  /** Ce que l'on rencontre sur les toitures de la commune */
  toitures: string;
  /** 3 a 4 enjeux techniques observables localement */
  enjeux: string[];
  /** Secteurs / quartiers — a faire valider par l'entreprise */
  secteurs: string[];
  /** Communes limitrophes (slugs si page existante, sinon libelle simple) */
  limitrophes: string[];
  /** Prestations mises en avant EN PREMIER sur cette page (ordre significatif) */
  prioritaires: string[];
  /** FAQ propre a la commune */
  faq: VilleFaq[];
  order: number;
}

export const villes: Ville[] = [
  /* ----------------------------------------------------------------- Bethune */
  {
    slug: 'bethune',
    url: '/couvreur-bethune/',
    name: 'Béthune',
    inCity: 'à Béthune',
    postalCode: '62400',
    distanceKm: 0,
    isBase: true,
    order: 1,
    metaTitle: 'Couvreur à Béthune (62400) — CZIR62, local en ville',
    metaDescription:
      "Couvreur à Béthune : couverture, rénovation, fuite, zinguerie, charpente. CZIR62 dispose d'un local avec devanture à Béthune. Devis gratuit.",
    intro:
      "Béthune est la commune où se trouve notre local. C'est aussi celle où nous intervenons le plus souvent, sur un bâti que nous connaissons bien : maisons de ville mitoyennes en brique du centre, pavillons de périphérie, et un parc ancien où la zinguerie a souvent vieilli plus vite que la couverture elle-même.",
    habitat:
      "Le centre de Béthune est dominé par la maison de ville en brique, mitoyenne, souvent construite entre la reconstruction d'après-guerre et les années 1960, avec des toitures à deux pans et des souches de cheminée maçonnées. En s'éloignant vers la périphérie, on trouve du pavillon individuel plus récent, généralement sur charpente à fermettes industrielles.",
    toitures:
      "En centre-ville, la tuile mécanique et l'ardoise cohabitent, avec beaucoup de zinguerie encastrée : chéneaux, noues entre deux maisons mitoyennes, solins contre les souches. Sur les constructions plus récentes, la tuile béton domine, avec des gouttières pendantes plus simples à reprendre.",
    enjeux: [
      "La mitoyenneté serrée du centre multiplie les noues et les solins, c'est-à-dire les points où l'eau doit être conduite plutôt que simplement évacuée.",
      "Les souches de cheminée anciennes en brique se fissurent et laissent passer l'eau au niveau du solin bien avant que la couverture ne soit en cause.",
      "Les chéneaux encaissés en fond de toiture, fréquents sur le bâti ancien, ne préviennent pas quand ils débordent : la trace apparaît directement à l'intérieur.",
      "L'accès en centre-ville impose souvent une organisation de chantier adaptée : stationnement, protection de la voirie, échafaudage sur trottoir.",
    ],
    secteurs: ['Centre-ville et Grand-Place', 'Quartier de la gare', 'Mont-Liébaut', 'Catorive', 'Beaupré', 'Saint-Pry'],
    limitrophes: ['beuvry', 'noeux-les-mines', 'bruay-la-buissiere'],
    prioritaires: ['couverture', 'renovation-toiture', 'zinguerie', 'fuite-toiture', 'charpente'],
    faq: [
      {
        q: "Où se trouve exactement votre entreprise à Béthune ?",
        a: "CZIR62 dispose d'un local avec devanture à Béthune. Vous pouvez donc identifier une entreprise réellement installée sur place, et pas seulement une adresse de domiciliation. Les coordonnées et l'itinéraire figurent sur la page contact.",
      },
      {
        q: "Intervenez-vous sur les maisons mitoyennes du centre de Béthune ?",
        a: "Oui, et c'est une part importante de notre activité. La mitoyenneté demande surtout de l'attention sur les points de raccord : noue entre deux versants, solin le long d'un mur voisin, chéneau partagé. Ce sont ces zones qui provoquent la majorité des infiltrations sur ce type de bâti.",
      },
      {
        q: "Faut-il une autorisation pour refaire une toiture à Béthune ?",
        a: "Le remplacement d'une couverture à l'identique relève généralement d'une déclaration préalable de travaux en mairie. Si l'aspect extérieur change (matériau, teinte, création d'ouverture), la déclaration est nécessaire. Le service urbanisme de la mairie de Béthune est l'interlocuteur qui fait foi ; nous vous indiquons ce que le dossier doit contenir côté technique.",
      },
    ],
  },

  /* ------------------------------------------------------------------ Beuvry */
  {
    slug: 'beuvry',
    url: '/couvreur-beuvry/',
    name: 'Beuvry',
    inCity: 'à Beuvry',
    postalCode: '62660',
    distanceKm: 4,
    order: 2,
    metaTitle: 'Couvreur à Beuvry (62660) — Toiture et zinguerie | CZIR62',
    metaDescription:
      "Couvreur à Beuvry : réparation de toiture, fuite, gouttières, rénovation. Entreprise basée à Béthune, à quelques minutes de Beuvry. Devis gratuit.",
    intro:
      "Beuvry jouxte Béthune à l'est. C'est l'une des communes où nous nous rendons le plus rapidement, ce qui compte quand il s'agit d'un désordre à constater avant la prochaine pluie plutôt que d'un chantier planifié.",
    habitat:
      "Beuvry mêle un tissu ancien de corons et de maisons de brique à de nombreux lotissements pavillonnaires construits à partir des années 1970, avec une forte proportion de maisons individuelles disposant de leur propre accès — un point qui simplifie nettement l'installation d'un échafaudage.",
    toitures:
      "Sur les parties anciennes, la tuile mécanique est majoritaire, parfois posée sur une charpente traditionnelle sans écran sous-toiture. Sur les lotissements plus récents, on retrouve la tuile béton sur fermettes, avec des gouttières PVC dont les fixations lâchent avec le temps.",
    enjeux: [
      "Les toitures posées sans écran sous-toiture ne pardonnent pas une tuile déplacée : l'eau arrive directement sur le plancher des combles.",
      "Les gouttières PVC des lotissements des années 1970-1980 arrivent en fin de vie : crochets desserrés, jonctions qui se disjoignent, pente perdue.",
      "Les extensions et vérandas ajoutées après coup créent des raccords entre l'ancien et le neuf, points de fuite classiques s'ils ont été traités trop vite.",
      "La proximité des zones humides et des marais entretient l'humidité ambiante et favorise le développement des mousses sur les versants exposés au nord.",
    ],
    secteurs: ['Centre-bourg', 'Quartier Gorre', 'Secteur des marais', 'Lotissements périphériques'],
    limitrophes: ['bethune', 'barlin', 'noeux-les-mines'],
    prioritaires: ['reparation-toiture', 'fuite-toiture', 'zinguerie', 'couverture', 'pose-velux'],
    faq: [
      {
        q: "Combien de temps pour venir constater un problème à Beuvry ?",
        a: "Beuvry est à quelques minutes de notre local de Béthune. Nous ne promettons pas un délai automatique parce qu'il dépend des chantiers en cours, mais la proximité joue clairement en faveur d'un passage rapide, en particulier après un épisode de vent ou de fortes pluies.",
      },
      {
        q: "Mes gouttières débordent à chaque orage, faut-il tout remplacer ?",
        a: "Pas nécessairement. Un débordement localisé vient souvent d'une pente perdue à cause de crochets descendus, d'une jonction disjointe ou d'un tuyau de descente partiellement bouché. Il faut regarder la gouttière en charge, pendant ou juste après la pluie, pour savoir si le remplacement complet se justifie.",
      },
    ],
  },

  /* -------------------------------------------------------- Bruay-la-Buissiere */
  {
    slug: 'bruay-la-buissiere',
    url: '/couvreur-bruay-la-buissiere/',
    name: 'Bruay-la-Buissière',
    inCity: 'à Bruay-la-Buissière',
    postalCode: '62700',
    distanceKm: 9,
    order: 3,
    metaTitle: 'Couvreur à Bruay-la-Buissière (62700) — Toiture | CZIR62',
    metaDescription:
      "Couvreur à Bruay-la-Buissière : rénovation de toiture, couverture, bardage, charpente. Entreprise de Béthune intervenant sur le secteur. Devis gratuit.",
    intro:
      "Bruay-la-Buissière concentre un patrimoine bâti de cités minières particulièrement homogène. Ces maisons en bande posent une question précise en couverture : on n'y intervient jamais vraiment sur une toiture isolée, mais toujours sur un versant continu partagé avec les voisins.",
    habitat:
      "La commune est marquée par les cités minières et les maisons en bande, alignées sur des versants continus, aux côtés de secteurs pavillonnaires plus récents et d'un habitat individuel de périphérie. Le bâti ancien y a souvent conservé sa volumétrie d'origine.",
    toitures:
      "Sur les maisons en bande, la couverture se lit en continu d'une habitation à l'autre, avec des faîtages et des rives partagés. Cela change tout sur le plan technique : le raccord entre une partie rénovée et une partie ancienne devient le point sensible, et la reprise doit être pensée pour ne pas créer une marche d'eau chez le voisin.",
    enjeux: [
      "Sur un versant partagé, refaire seulement sa portion crée une jonction : elle doit être traitée pour rester étanche, pas simplement recouverte.",
      "Les charpentes des maisons de cité sont souvent simples mais anciennes ; une reprise de couverture est le bon moment pour vérifier l'état des pieds de chevrons en about de toiture.",
      "Les rives et les débords sont fréquemment les premiers éléments à se dégrader sur ce type d'habitat exposé.",
      "Un ravalement ou un bardage de pignon est fréquemment envisagé en même temps que la toiture, ce qui permet de mutualiser l'échafaudage.",
    ],
    secteurs: ['Bruay centre', 'La Buissière', 'Cités minières', 'Secteurs pavillonnaires'],
    limitrophes: ['bethune', 'auchel', 'barlin'],
    prioritaires: ['renovation-toiture', 'couverture', 'bardage', 'charpente', 'zinguerie'],
    faq: [
      {
        q: "Peut-on rénover la toiture d'une maison de cité sans toucher à celle du voisin ?",
        a: "Oui, mais la jonction doit être traitée correctement. Sur un versant continu, arrêter une couverture neuve contre une couverture ancienne crée une différence d'épaisseur et un point de rétention d'eau. Il existe des solutions de raccord propres ; c'est un point à examiner sur place avant de chiffrer.",
      },
      {
        q: "Faut-il l'accord du voisin pour intervenir sur un toit mitoyen ?",
        a: "Pour des travaux sur votre propre partie, non. En revanche, si l'échafaudage doit reposer sur son terrain ou si l'intervention touche un élément commun comme un faîtage partagé, il vaut mieux prévenir en amont. Nous vous disons clairement, après visite, si la configuration l'impose.",
      },
    ],
  },

  /* ---------------------------------------------------------- Noeux-les-Mines */
  {
    slug: 'noeux-les-mines',
    url: '/couvreur-noeux-les-mines/',
    name: 'Nœux-les-Mines',
    inCity: 'à Nœux-les-Mines',
    postalCode: '62290',
    distanceKm: 8,
    order: 4,
    metaTitle: 'Couvreur à Nœux-les-Mines (62290) — Toiture | CZIR62',
    metaDescription:
      "Couvreur à Nœux-les-Mines : réparation, rénovation de toiture, zinguerie, pose de Velux. Entreprise basée à Béthune. Devis gratuit sur place.",
    intro:
      "Nœux-les-Mines est à une dizaine de minutes de notre local. La commune combine un bâti ancien de brique et des secteurs pavillonnaires où les toitures des années 1970-1980 arrivent aujourd'hui à l'âge où les premiers désordres apparaissent en série.",
    habitat:
      "Habitat de brique traditionnel, cités et corons, complétés par des lotissements pavillonnaires développés à partir des années 1970. Beaucoup de maisons individuelles disposent de combles aménagés ou aménageables.",
    toitures:
      "Les couvertures des années 1970-1980 en tuile béton atteignent une durée de service où l'on voit apparaître les premiers signes : tuiles poreuses, faîtages scellés au mortier qui se fissurent, écrans sous-toiture inexistants ou dégradés.",
    enjeux: [
      "Les faîtages scellés au mortier se fissurent avec les cycles de gel et dessel ; ils se reprennent aujourd'hui en pose à sec ventilée, plus durable.",
      "Les combles aménagés rendent une infiltration beaucoup plus visible et plus coûteuse : l'eau arrive directement sur un plafond fini au lieu de se perdre dans un grenier.",
      "L'ajout de fenêtres de toit sur les combles aménagés est fréquent, avec des raccords d'étanchéité dont la qualité conditionne toute la suite.",
      "Les mousses s'installent volontiers sur les versants nord peu exposés au soleil, en retenant l'humidité contre la tuile.",
    ],
    secteurs: ['Centre', 'Cités et corons', 'Secteur Loisinord', 'Lotissements récents'],
    limitrophes: ['bethune', 'barlin', 'beuvry'],
    prioritaires: ['renovation-toiture', 'pose-velux', 'reparation-toiture', 'couverture', 'fuite-toiture'],
    faq: [
      {
        q: "Ma toiture a 45 ans, faut-il la refaire entièrement ?",
        a: "L'âge seul ne décide pas. Ce qui compte, c'est l'état réel des tuiles (porosité, éclats, gélivité), celui des points singuliers, et la présence ou non d'un écran sous-toiture. Une couverture de 45 ans encore saine peut demander uniquement une reprise des faîtages et rives. Une autre du même âge peut justifier une rénovation complète.",
      },
      {
        q: "Peut-on poser un Velux sur des combles déjà aménagés ?",
        a: "Souvent oui. La contrainte principale est la charpente : l'ouverture doit s'insérer entre les éléments porteurs, ou faire l'objet d'un chevêtre. Sur des combles déjà finis, il faut aussi prévoir la reprise des finitions intérieures autour de l'ouverture. C'est une question à trancher sur place, en regardant l'intérieur autant que le toit.",
      },
    ],
  },

  /* ----------------------------------------------------------------- Lillers */
  {
    slug: 'lillers',
    url: '/couvreur-lillers/',
    name: 'Lillers',
    inCity: 'à Lillers',
    postalCode: '62190',
    distanceKm: 14,
    order: 5,
    metaTitle: 'Couvreur à Lillers (62190) — Toiture et charpente | CZIR62',
    metaDescription:
      "Couvreur à Lillers : couverture, charpente, zinguerie, bardage. Entreprise de Béthune intervenant sur le secteur de la Lys. Devis gratuit.",
    intro:
      "À Lillers, le bâti se fait plus rural qu'à Béthune. On y rencontre davantage de volumes anciens, de dépendances, de granges reconverties et de charpentes traditionnelles — donc davantage de sujets qui relèvent autant du charpentier que du couvreur.",
    habitat:
      "Habitat de bourg autour du centre ancien, complété par des maisons individuelles avec terrain et par un bâti rural comportant dépendances, annexes et anciens bâtiments agricoles, dont certains ont été reconvertis en surface habitable.",
    toitures:
      "On y trouve une plus grande variété qu'en secteur urbain dense : tuile mécanique, ardoise sur les volumes anciens, mais aussi des couvertures de dépendances vieillissantes. Les charpentes traditionnelles en bois massif y sont plus fréquentes que les fermettes industrielles.",
    enjeux: [
      "Les dépendances et annexes sont souvent les dernières entretenues : c'est pourtant là que les charpentes se dégradent le plus vite, faute de chauffage et de ventilation.",
      "Une charpente traditionnelle ancienne se répare par reprise de pièces plutôt que par remplacement complet, à condition d'intervenir avant que la section restante ne soit trop entamée.",
      "Les grands volumes offrent de grandes longueurs de gouttière, où la pente et le nombre de descentes conditionnent tout le reste.",
      "Les projets de reconversion d'un volume non chauffé en surface habitable imposent de reprendre l'étanchéité et parfois la structure.",
    ],
    secteurs: ['Centre-ville', 'Secteur de la collégiale', 'Hameaux et écarts', 'Zone pavillonnaire'],
    limitrophes: ['auchel', 'bethune'],
    prioritaires: ['charpente', 'couverture', 'renovation-toiture', 'bardage', 'ossature-bois'],
    faq: [
      {
        q: "Vous déplacez-vous jusqu'à Lillers pour un devis ?",
        a: "Oui. Lillers fait partie de notre zone d'intervention régulière. Le déplacement pour établir un devis n'est pas facturé ; ce qui compte pour nous est de voir la toiture avant de chiffrer, parce qu'un devis établi à distance ne vaut pas grand-chose sur ce métier.",
      },
      {
        q: "Intervenez-vous sur les bâtiments agricoles et les dépendances ?",
        a: "Oui, sur les volumes qui relèvent de la couverture et de la charpente bois. Nous regardons d'abord l'état de la structure : sur ce type de bâtiment, la question n'est pas seulement l'étanchéité mais aussi la capacité de la charpente à recevoir une couverture neuve.",
      },
    ],
  },

  /* ------------------------------------------------------------------ Auchel */
  {
    slug: 'auchel',
    url: '/couvreur-auchel/',
    name: 'Auchel',
    inCity: 'à Auchel',
    postalCode: '62260',
    distanceKm: 17,
    order: 6,
    metaTitle: 'Couvreur à Auchel (62260) — Rénovation de toiture | CZIR62',
    metaDescription:
      "Couvreur à Auchel : rénovation de toiture, couverture, bardage, zinguerie. Entreprise basée à Béthune intervenant sur le secteur. Devis gratuit.",
    intro:
      "Auchel présente un parc de logements largement issu de l'époque minière, avec des maisons de cité dont beaucoup ont été rénovées par phases successives. Résultat fréquent sur le terrain : des toitures composites, où coexistent des interventions d'âges très différents.",
    habitat:
      "Maisons de cité et habitat ouvrier en brique dominent, souvent en bande ou par groupes de deux, complétés par des constructions individuelles plus récentes en périphérie.",
    toitures:
      "Il n'est pas rare de trouver sur une même toiture une partie refaite il y a quinze ans et une partie d'origine, avec des tuiles de modèles différents. Cette hétérogénéité crée des raccords qui deviennent les points faibles de l'ensemble.",
    enjeux: [
      "Les toitures reprises par morceaux successifs accumulent les jonctions ; chaque jonction mal traitée est un point d'entrée potentiel.",
      "Les tuiles de remplacement d'un modèle qui n'existe plus obligent parfois à revoir un versant entier plutôt qu'à panacher.",
      "Les rives de pignon exposées à l'ouest subissent l'essentiel des vents dominants et se déchaussent en premier.",
      "Un bardage de pignon est souvent envisagé pour traiter à la fois l'aspect et la protection du mur exposé.",
    ],
    secteurs: ['Centre', 'Cités minières', 'Quartier de la gare', 'Périphérie pavillonnaire'],
    limitrophes: ['bruay-la-buissiere', 'lillers'],
    prioritaires: ['renovation-toiture', 'couverture', 'bardage', 'zinguerie', 'reparation-toiture'],
    faq: [
      {
        q: "Ma toiture a été réparée plusieurs fois, est-ce un problème ?",
        a: "Pas en soi, mais cela demande un examen plus attentif. Des reprises successives laissent des raccords entre matériaux et époques différents. Ce sont ces raccords, plus que les tuiles elles-mêmes, qui déterminent si une nouvelle réparation ciblée suffit ou si une reprise d'ensemble est plus raisonnable.",
      },
      {
        q: "Peut-on retrouver des tuiles identiques aux anciennes ?",
        a: "Parfois, quand le modèle est encore fabriqué ou disponible en réemploi. Souvent, non. Dans ce cas, deux options : panacher en réservant les tuiles récupérées à la façade la plus visible, ou reprendre le versant complet. Nous vous exposons les deux, avec ce que cela implique visuellement.",
      },
    ],
  },

  /* -------------------------------------------------------------------- Lens */
  {
    slug: 'lens',
    url: '/couvreur-lens/',
    name: 'Lens',
    inCity: 'à Lens',
    postalCode: '62300',
    distanceKm: 25,
    order: 7,
    metaTitle: 'Couvreur à Lens (62300) — Couverture et toiture | CZIR62',
    metaDescription:
      "Couvreur à Lens : rénovation de toiture, réparation, zinguerie, fuite. Entreprise de couverture basée à Béthune intervenant sur Lens. Devis gratuit.",
    intro:
      "Lens marque la limite est de notre zone d'intervention habituelle. Nous y intervenons principalement sur des chantiers planifiés — rénovation, reprise de couverture, zinguerie — plutôt que sur du dépannage à la demi-journée, la distance depuis Béthune ne le permettant pas toujours.",
    habitat:
      "Ville dense au bâti varié : maisons de ville mitoyennes, cités minières classées au patrimoine mondial, immeubles de rapport et secteurs pavillonnaires. Les configurations de toiture y sont plus hétérogènes que dans les communes rurales du secteur.",
    toitures:
      "Beaucoup de maisons mitoyennes avec versants continus, chéneaux encaissés et zinguerie ancienne. Sur le bâti classé ou situé en secteur protégé, l'aspect extérieur est encadré : le choix des matériaux n'est pas totalement libre.",
    enjeux: [
      "En secteur protégé ou aux abords d'un monument, la teinte et le type de tuile peuvent être imposés : il faut le vérifier avant de commander le matériau.",
      "Les chéneaux encaissés du bâti ancien exigent une zinguerie soignée : l'eau y circule à l'intérieur du volume, une fuite s'y voit directement à l'intérieur.",
      "La densité urbaine complique l'accès et l'installation d'échafaudage, ce qui doit être anticipé dès le devis.",
      "Les toitures d'immeubles collectifs demandent une coordination avec la copropriété, avec un calendrier différent d'une maison individuelle.",
    ],
    secteurs: ['Centre-ville', 'Quartier de la gare', 'Cités minières', 'Secteur du stade'],
    limitrophes: ['lievin', 'bully-les-mines'],
    prioritaires: ['renovation-toiture', 'zinguerie', 'couverture', 'reparation-toiture', 'charpente'],
    faq: [
      {
        q: "Intervenez-vous à Lens malgré la distance depuis Béthune ?",
        a: "Oui, pour les chantiers planifiés : rénovation de toiture, reprise de couverture, zinguerie, charpente. Pour une intervention très urgente, un couvreur plus proche sera souvent mieux placé sur le délai, et nous vous le dirons franchement plutôt que de vous faire attendre.",
      },
      {
        q: "Travaillez-vous sur les maisons de cité minière classées ?",
        a: "Le classement au patrimoine mondial ne fige pas les toitures, mais il implique des règles sur l'aspect extérieur. Avant tout engagement, il faut vérifier auprès du service urbanisme ce qui est autorisé sur le bien concerné. Nous adaptons ensuite la solution technique à ce cadre.",
      },
    ],
  },

  /* ------------------------------------------------------------------ Lievin */
  {
    slug: 'lievin',
    url: '/couvreur-lievin/',
    name: 'Liévin',
    inCity: 'à Liévin',
    postalCode: '62800',
    distanceKm: 21,
    order: 8,
    metaTitle: 'Couvreur à Liévin (62800) — Toiture et zinguerie | CZIR62',
    metaDescription:
      "Couvreur à Liévin : rénovation de toiture, réparation, pose de Velux, zinguerie. Entreprise de couverture basée à Béthune. Devis gratuit.",
    intro:
      "À Liévin, une part importante du parc a été construite ou reconstruite dans la seconde moitié du XXᵉ siècle. Les toitures y arrivent aujourd'hui à un âge charnière, où la question n'est plus de réparer ponctuellement mais de décider ce que l'on garde.",
    habitat:
      "Maisons individuelles d'après-guerre, ensembles de cités, et lotissements plus récents. Les combles aménagés sont fréquents, ce qui rend le comportement de la toiture directement perceptible depuis l'intérieur du logement.",
    toitures:
      "Tuile mécanique et tuile béton dominent selon les époques. Les charpentes à fermettes industrielles sont courantes sur les constructions postérieures aux années 1970 ; elles interdisent toute modification à la légère, chaque élément étant calculé.",
    enjeux: [
      "Sur une charpente à fermettes, aucune pièce ne se coupe sans étude : l'équilibre de l'ensemble repose sur le triangle complet.",
      "Les combles aménagés transforment une petite infiltration en dégât visible : plafond taché, isolant gorgé d'eau, odeur persistante.",
      "L'ajout ou le remplacement de fenêtres de toit est un motif d'intervention fréquent sur ce type de logement.",
      "Les toitures des années 1960-1970 posées sans écran sous-toiture n'ont aucune seconde barrière en cas de tuile déplacée.",
    ],
    secteurs: ['Centre', 'Cités', 'Secteur pavillonnaire', 'Abords du stade couvert'],
    limitrophes: ['lens', 'bully-les-mines'],
    prioritaires: ['renovation-toiture', 'pose-velux', 'couverture', 'fuite-toiture', 'charpente'],
    faq: [
      {
        q: "Peut-on aménager des combles sur une charpente à fermettes ?",
        a: "C'est possible, mais ce n'est pas un simple aménagement : il faut remplacer le rôle structurel des éléments retirés par un dispositif équivalent, ce qui relève d'une étude. Nous vous disons d'emblée si votre charpente permet d'envisager le projet, et à quelles conditions.",
      },
      {
        q: "Une tache au plafond signifie-t-elle forcément que la toiture est à refaire ?",
        a: "Non, et c'est même rarement le cas. Une tache indique un passage d'eau, pas l'état général de la couverture. L'origine est souvent un point singulier — solin, raccord de fenêtre de toit, noue — et se traite ponctuellement. C'est précisément ce que la visite sert à établir.",
      },
    ],
  },

  /* --------------------------------------------------------- Bully-les-Mines */
  {
    slug: 'bully-les-mines',
    url: '/couvreur-bully-les-mines/',
    name: 'Bully-les-Mines',
    inCity: 'à Bully-les-Mines',
    postalCode: '62160',
    distanceKm: 16,
    order: 9,
    metaTitle: 'Couvreur à Bully-les-Mines (62160) — Toiture | CZIR62',
    metaDescription:
      "Couvreur à Bully-les-Mines : réparation de toiture, gouttières, rénovation, zinguerie. Entreprise basée à Béthune. Devis gratuit sur place.",
    intro:
      "Bully-les-Mines présente un tissu de maisons de cité et d'habitat individuel où l'évacuation des eaux pluviales est un sujet récurrent : beaucoup de gouttières d'origine, des longueurs importantes, et des descentes qui rejettent parfois trop près des façades.",
    habitat:
      "Cités minières et maisons en bande, complétées par de l'habitat individuel plus récent. Les parcelles sont souvent étroites, avec des mitoyennetés qui conditionnent l'accès au chantier.",
    toitures:
      "Tuile mécanique majoritairement, sur des versants souvent continus d'une maison à l'autre. La zinguerie d'origine, quand elle n'a jamais été reprise, arrive au terme de sa durée de service.",
    enjeux: [
      "Une descente d'eau pluviale qui rejette au pied du mur finit par humidifier la maçonnerie : le problème se lit en façade, mais il vient de la toiture.",
      "Les longues gouttières de maisons en bande demandent une pente régulière et un nombre de descentes suffisant, sans quoi elles débordent au milieu.",
      "Les rives et débords exposés se dégradent avant le reste du versant.",
      "L'accès par des parcelles étroites impose d'anticiper l'échafaudage dès le devis.",
    ],
    secteurs: ['Centre', 'Cités', 'Quartier des Brebis', 'Secteurs pavillonnaires'],
    limitrophes: ['lievin', 'lens'],
    prioritaires: ['zinguerie', 'reparation-toiture', 'couverture', 'renovation-toiture', 'fuite-toiture'],
    faq: [
      {
        q: "L'eau ruisselle le long de mon mur, est-ce la gouttière ?",
        a: "Très souvent, oui. Trois causes reviennent : une gouttière qui déborde faute de pente, une jonction disjointe, ou une descente qui rejette trop près de la façade sans dauphin ni raccordement. Le diagnostic se fait idéalement pendant une pluie, ou en mettant la gouttière en eau.",
      },
      {
        q: "Faut-il remplacer toute la gouttière ou seulement une partie ?",
        a: "Cela dépend du matériau et de son état général. Sur du PVC vieillissant, remplacer un tronçon donne souvent un résultat provisoire car le reste suit de peu. Sur du zinc encore sain, une reprise localisée avec ressoudure est parfaitement pertinente.",
      },
    ],
  },

  /* ------------------------------------------------------------------ Barlin */
  {
    slug: 'barlin',
    url: '/couvreur-barlin/',
    name: 'Barlin',
    inCity: 'à Barlin',
    postalCode: '62620',
    distanceKm: 11,
    order: 10,
    metaTitle: 'Couvreur à Barlin (62620) — Couverture et fuite | CZIR62',
    metaDescription:
      "Couvreur à Barlin : réparation de toiture, recherche de fuite, couverture, charpente. Entreprise de Béthune intervenant sur Barlin. Devis gratuit.",
    intro:
      "Barlin se situe à une dizaine de minutes de Béthune, sur un secteur légèrement plus vallonné. Les toitures y sont bien exposées au vent, ce qui se traduit par des interventions récurrentes sur les rives, les faîtages et les éléments de bord de toit.",
    habitat:
      "Habitat de cité et maisons individuelles en brique, avec des secteurs pavillonnaires en périphérie et un bâti disposant plus souvent de terrain qu'en centre urbain dense.",
    toitures:
      "Tuile mécanique et tuile béton selon les époques de construction. Les éléments de bord — rives, faîtages, arêtiers — sont les plus sollicités par l'exposition au vent.",
    enjeux: [
      "Les épisodes venteux déplacent en priorité les tuiles de rive et de faîtage, moins retenues que celles du champ courant.",
      "Un faîtage scellé au mortier qui se fissure laisse entrer l'eau sur toute la longueur du toit, pas seulement au point visible.",
      "Après un coup de vent, le désordre est souvent limité et se répare rapidement — à condition de ne pas attendre la pluie suivante.",
      "Les arbres à proximité chargent les gouttières en feuilles et accélèrent l'apparition de mousses sur les versants ombragés.",
    ],
    secteurs: ['Centre-bourg', 'Cités', 'Secteurs pavillonnaires', 'Abords boisés'],
    limitrophes: ['noeux-les-mines', 'bruay-la-buissiere', 'beuvry'],
    prioritaires: ['reparation-toiture', 'fuite-toiture', 'couverture', 'zinguerie', 'renovation-toiture'],
    faq: [
      {
        q: "Après une tempête, que faut-il vérifier en premier ?",
        a: "Depuis le sol et sans monter : regardez les rives et le faîtage, cherchez des tuiles visiblement déplacées ou tombées au pied du mur, et contrôlez l'intérieur des combles après la pluie suivante. Une trace fraîche sur un chevron ou sur l'isolant est le signe le plus fiable.",
      },
      {
        q: "Une tuile déplacée est-elle urgente à remettre ?",
        a: "Elle mérite d'être traitée sans attendre. Une tuile déplacée ne cause parfois rien pendant des semaines, puis provoque une infiltration au premier épisode de pluie battante avec vent. La réparation est rapide à ce stade ; elle l'est beaucoup moins une fois l'isolant et le plafond touchés.",
      },
    ],
  },
];

/**
 * Rayon d'intervention declare, en kilometres.
 * Une seule valeur, consommee par la carte de zone, les reperes chiffres de
 * l'accueil et la page zone d'intervention.
 */
export const RAYON_KM = 40;

/* -------------------------------------------------------------------------
 * Communes desservies SANS page dediee.
 * Elles apparaissent sur la carte de zone et dans les listes de proximite.
 * Une page ne sera creee que si l'activite reelle sur la commune le justifie :
 * on ne cree pas dix pages vides pour occuper le terrain.
 * ---------------------------------------------------------------------- */
export const communesDesservies: ReadonlyArray<{ name: string; postalCode: string }> = [
  // Metropole lilloise — limite est de la zone
  { name: 'Lille', postalCode: '59000' },
  // TODO ORTHOGRAPHE A CONFIRMER : « Roncq » (59223, metropole lilloise) a ete
  // retenu d'apres l'indication orale « Ronque ». Si la commune visee est
  // « Ronchin » (59790), corriger ici — c'est le seul endroit a modifier.
  { name: 'Roncq', postalCode: '59223' },
  { name: 'Hersin-Coupigny', postalCode: '62530' },
  { name: 'La Bassée', postalCode: '59480' },
  { name: 'Annezin', postalCode: '62232' },
  { name: 'Chocques', postalCode: '62920' },
  { name: 'Vermelles', postalCode: '62980' },
  { name: 'Verquin', postalCode: '62131' },
  { name: 'Sailly-Labourse', postalCode: '62113' },
  { name: 'Houdain', postalCode: '62150' },
  { name: 'Divion', postalCode: '62460' },
  { name: 'Isbergues', postalCode: '62330' },
];

/* ------------------------------------------------------------- accesseurs */

export const villesByOrder = [...villes].sort((a, b) => a.order - b.order);

export function getVille(slug: string): Ville {
  const found = villes.find((v) => v.slug === slug);
  if (!found) throw new Error(`[villes] Commune inconnue : « ${slug} ». Vérifier src/data/villes.ts`);
  return found;
}

/** Retourne les villes existantes pour une liste de slugs, en ignorant les inconnues */
export function getVilles(slugs: readonly string[]): Ville[] {
  return slugs.map((s) => villes.find((v) => v.slug === s)).filter((v): v is Ville => Boolean(v));
}

/** Communes les plus proches d'une commune donnee (hors elle-meme) */
export function nearbyVilles(slug: string, limit = 4): Ville[] {
  const ref = getVille(slug);
  const declared = getVilles(ref.limitrophes);
  if (declared.length >= limit) return declared.slice(0, limit);
  const rest = villesByOrder
    .filter((v) => v.slug !== slug && !declared.some((d) => d.slug === v.slug))
    .sort((a, b) => Math.abs(a.distanceKm - ref.distanceKm) - Math.abs(b.distanceKm - ref.distanceKm));
  return [...declared, ...rest].slice(0, limit);
}

/** Communes ou une prestation donnee est mise en avant */
export function villesForService(serviceSlug: string, limit = 5): Ville[] {
  const priority = villesByOrder.filter((v) => v.prioritaires.includes(serviceSlug));
  const fallback = villesByOrder.filter((v) => !priority.includes(v));
  return [...priority, ...fallback].slice(0, limit);
}
