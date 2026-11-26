// The one file in the Gatsby static folder, which Astro doesn't serve
import ads from '../../../static/ads.txt?raw';

export const GET = () => new Response(ads);
