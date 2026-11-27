import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Settings come from the environment (as in CI) or the .env files
const mode = process.argv.includes('dev') ? 'development' : 'production';
const envFile = fileURLToPath(new URL(`./.env.${mode}`, import.meta.url));
if (existsSync(envFile)) process.loadEnvFile(envFile);

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
      'import.meta.env.DISQUS_NAME': JSON.stringify(
        process.env.DISQUS_NAME ?? ''
      ),
    },
    plugins: [tailwindcss()],
    // Tailwind runs as a Vite plugin here; postcss.config.js is for Storybook
    css: { postcss: {} },
    server: {
      // Large folders of generated files, which slow starting to a crawl
      watch: {
        ignored: ['**/.cache/**', '**/storybook-static/**', '**/coverage/**'],
      },
    },
  },
});
