import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// The Gatsby project this is migrating from; its content/ and src/ are reused.
const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const sharedSrc = fileURLToPath(new URL('../src/', import.meta.url)).replaceAll(
  '\\',
  '/'
);

// Settings come from the environment (as in CI) or the Gatsby project's file
const envFile = `${repoRoot}.env.production`;
if (existsSync(envFile)) process.loadEnvFile(envFile);

/**
 * The shared components expect an imported image to be its URL, as in Gatsby,
 * where Astro would give an object describing it.
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
    },
    plugins: [sharedImagesAsUrls, tailwindcss()],
    // Tailwind runs as a Vite plugin, so ignore the Gatsby postcss.config.js
    css: { postcss: {} },
    // Shared components live outside this folder and would otherwise pick up
    // the second copy of React in the root node_modules
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: [
        {
          find: /^gatsby$/,
          replacement: fileURLToPath(
            new URL('./src/shims/gatsby.tsx', import.meta.url)
          ),
        },
      ],
    },
    server: { fs: { allow: [repoRoot] } },
  },
});
