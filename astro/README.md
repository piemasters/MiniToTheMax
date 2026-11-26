# The Astro site

Builds the site from `../content` and the shared components in `../src`.

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
| `GATSBY_DISQUS_NAME` | Comments (Disqus) |
| `GA_TRACKING_ID` | Analytics, in production builds only |

## Preview deployment

Pushing the `astro` branch runs [astro-preview.yaml](../.github/workflows/astro-preview.yaml), which builds every post and publishes a Netlify draft deploy under the alias `astro-preview`. The address is printed at the end of the run. The live site is not touched.

Preview builds leave analytics out. To include it, set the GitHub repository variable `PREVIEW_ANALYTICS` to `true`.

## Still to do

- Production deployment: `deploy.yaml` still publishes the old Gatsby output folder
- Blurred image placeholders
