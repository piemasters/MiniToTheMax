import { iconSizes, iconUrl } from '../lib/icons';
import { site } from '../lib/site';

export const GET = () =>
  new Response(
    JSON.stringify({
      name: site.title,
      short_name: site.title,
      description: site.description,
      lang: 'en',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: site.themeColor,
      display: 'standalone',
      icons: iconSizes.map((size) => ({
        // Relative to the manifest, so without the leading slash
        src: iconUrl(size).slice(1),
        sizes: `${size}x${size}`,
        type: 'image/png',
      })),
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } }
  );
