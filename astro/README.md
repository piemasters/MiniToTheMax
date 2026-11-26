# Astro migration trial

Builds the posts with Astro, reusing `../content` and `../src`. The Gatsby site is unaffected.

Needs Node 22 or later, and the root dependencies installed too (`yarn` in the repo root).

| Command | Result |
|---|---|
| `yarn dev` | Development server, 10 sample posts |
| `yarn build` | Production build of the samples |
| `yarn build:all` | Production build of every published post |
| `yarn preview` | Serves the last build |

Set `PUBLIC_DISQUS_NAME` in `astro/.env` to load comments.

## Not ported yet

- Sitemap, robots.txt, web manifest, favicons, analytics
- Blurred image placeholders
- Tests, Storybook, CI and deployment
