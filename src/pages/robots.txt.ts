/**
 * robots.txt généré depuis la configuration.
 * On bloque l'endpoint d'ingestion et la page de confirmation, qui n'ont
 * aucune raison d'être explorés.
 */
import type { APIRoute } from 'astro';
import { site } from '@/config/site';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Disallow: /api/
Disallow: /404/

Sitemap: ${site.url}/sitemap-index.xml
`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
