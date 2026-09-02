// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

/** Slugs des pages prestation — miroir de src/data/services.ts */
const PRESTATIONS = new RegExp(
  '/(' +
    [
      'couverture', 'renovation-toiture', 'reparation-toiture', 'fuite-toiture',
      'demoussage-toiture', 'zinguerie', 'etancheite-toiture-terrasse',
      'couverture-metallique', 'charpente', 'pose-velux', 'bardage',
      'ossature-bois', 'agrandissement-rehaussement',
    ].join('|') +
    ')/$',
);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.czir62.fr',
  trailingSlash: 'always',

  // Statique par defaut (CWV + hebergement simple).
  // Seules les routes marquees `export const prerender = false` sont rendues
  // a la demande : aujourd'hui uniquement /api/lead/.
  output: 'static',
  adapter: node({ mode: 'standalone' }),

  build: {
    format: 'directory',
    // Inline le CSS critique des petites feuilles -> supprime une requete bloquante
    inlineStylesheets: 'auto',
  },

  image: {
    // Genere AVIF + WebP a partir des sources locales
    responsiveStyles: true,
    layout: 'constrained',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/merci/') &&
        !page.includes('/mentions-legales/') &&
        !page.includes('/politique-de-confidentialite/') &&
        // noindex : la soumettre au sitemap declencherait un avertissement
        // « URL envoyee avec balise noindex » dans la Search Console.
        !page.includes('/plan-du-site/'),
      serialize(item) {
        const url = item.url;
        // Priorites : accueil > services > villes > realisations > reste
        if (url.endsWith('.fr/')) item.priority = 1.0;
        // ATTENTION : liste a tenir alignee sur src/data/services.ts.
        // astro.config.mjs ne peut pas importer le registre (alias @/ non
        // resolu ici), c'est le seul endroit du projet ou elle est dupliquee.
        else if (PRESTATIONS.test(url)) item.priority = 0.9;
        else if (url.includes('/couvreur-')) item.priority = 0.8;
        else if (url.includes('/realisations/')) item.priority = 0.7;
        else item.priority = 0.6;
        return item;
      },
    }),
  ],

  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
