import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// The site's content/ and shared src/ sit above this folder.
const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const sharedSrc = fileURLToPath(new URL('../src/', import.meta.url)).replaceAll(
  '\\',
  '/'
);

// Settings come from the environment (as in CI) or the files in the root
const mode = process.argv.includes('dev') ? 'development' : 'production';
const envFile = `${repoRoot}.env.${mode}`;
if (existsSync(envFile)) process.loadEnvFile(envFile);

/**
 * The shared components use an imported image as its URL, as Jest and Storybook
 * give it, where Astro would give an object describing it.
 */
const sharedImagesAsUrls = {
  name: 'shared-images-as-urls',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (!/\.(jpe?g|png|webp)$/.test(source)) return null;
    if (!importer?.replaceAll('\\', '/').startsWith(sharedSrc)) return null;
    const resolved = await this.resolve(source, importer, options);
    return resolved && `${resolved.id}?url`;
  },
};

export default defineConfig({
  site: 'https://minitothemax.app',
  integrations: [
    mdx(),
    react(),
    sitemap({ changefreq: 'daily', priority: 0.7 }),
  ],
  vite: {
    define: {
      'import.meta.env.GA_TRACKING_ID': JSON.stringify(
        process.env.GA_TRACKING_ID ?? ''
      ),
      'import.meta.env.GATSBY_DISQUS_NAME': JSON.stringify(
        process.env.GATSBY_DISQUS_NAME ?? ''
      ),
    },
    plugins: [sharedImagesAsUrls, tailwindcss()],
    // Tailwind runs as a Vite plugin here; postcss.config.js is for Storybook
    css: { postcss: {} },
    // Shared components live outside this folder and would otherwise pick up
    // the second copy of React in the root node_modules, directly or through a
    // package which uses it. Those named here must also be in package.json.
    resolve: {
      dedupe: ['react', 'react-dom', 'react-photoswipe-gallery', 'photoswipe'],
    },
    // Prepared when the development server starts. Found any later, it reloads
    // them mid-visit and the page ends up with two copies of React
    optimizeDeps: { include: ['react-photoswipe-gallery', 'disqus-react'] },
    server: { fs: { allow: [repoRoot] } },
  },
});
