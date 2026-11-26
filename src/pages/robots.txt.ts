import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${new URL('sitemap-index.xml', site)}`,
      `Host: ${site!.origin}`,
      '',
    ].join('\n')
  );
