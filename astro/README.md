# Astro migration trial

Builds the posts with Astro, reusing `../content` and `../src`. The Gatsby site is unaffected.

Needs Node 22 or later, and the root dependencies installed too (`yarn` in the repo root).

| Command | Result |
|---|---|
| `yarn dev` | Development server, 10 sample posts |
| `yarn build` | Production build of the samples |
| `yarn build:all` | Production build of every published post |
| `yarn preview` | Serves the last build |

Settings come from the environment, or from the root `.env.development` (`yarn dev`) and `.env.production` (builds):

| Setting | Used for |
|---|---|
| `GATSBY_DISQUS_NAME` | Comments. The name is unchanged so that existing setups keep working |
| `GA_TRACKING_ID` | Analytics, in production builds only |

## Not ported yet

- Blurred image placeholders
- Tests, Storybook, CI and deployment
