/* ===========================================================================
 * Apparition au defilement — volontairement minimaliste.
 * ---------------------------------------------------------------------------
 * Contraintes : ne jamais decaler la mise en page (aucun impact CLS), ne
 * jamais s'appliquer au contenu au-dessus de la ligne de flottaison (aucun
 * impact LCP), et se desactiver totalement si l'utilisateur a demande a
 * reduire les animations.
 * Un IntersectionObserver, aucun listener de scroll : cout processeur nul.
 * ========================================================================= */

// Signale au filet de securite pose dans le <head> que le module a bien demarre
(window as unknown as { __czirReveal?: boolean }).__czirReveal = true;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll<HTMLElement>('.reveal');

if (reduce || !('IntersectionObserver' in window)) {
  // Mouvement reduit demande, ou navigateur sans IntersectionObserver :
  // on affiche tout immediatement.
  document.documentElement.classList.remove('reveal-ready');
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // Decalage en cascade au sein d'un meme groupe, plafonne pour ne pas
        // faire attendre l'utilisateur devant du contenu vide.
        const delay = Math.min(Number(el.dataset.revealDelay ?? 0), 240);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  targets.forEach((el) => io.observe(el));

  /**
   * Second filet de securite.
   * Le premier (dans le <head>) couvre le cas ou ce module ne demarre pas.
   * Celui-ci couvre le cas ou il demarre mais ou l'IntersectionObserver ne se
   * declenche jamais : onglet jamais composite, moteur de rendu exotique,
   * pre-rendu. Passe ce delai, tout ce qui est encore masque est affiche.
   * Regle non negociable : une animation ne doit jamais pouvoir rendre du
   * contenu definitivement invisible.
   */
  setTimeout(() => {
    const restants = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    if (!restants.length) return;
    document.documentElement.classList.remove('reveal-ready');
    restants.forEach((el) => el.classList.add('is-in'));
  }, 3000);
}

export {};
