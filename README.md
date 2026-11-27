# MiniToTheMax

A miniature painting hobby blog, built with [Astro](https://astro.build) and React.

| Folder | Holds |
|---|---|
| `content/` | Posts and images |
| `src/assets/` | Images used by the site itself |
| `src/pages/`, `src/layouts/` | The site's pages |
| `src/components/` | Components, with their tests and stories |
| `src/data/`, `src/util/` | Paint and backlog data, and utilities |
| `src/lib/` | Helpers used while building pages |
| `public/` | Files served as they are |
| `scripts/` | Maintenance tools |

## Getting started

Needs the Node version in `.nvmrc`. Yarn doesn't come with Node, and a newly installed version needs `npm install -g yarn`.

```sh
yarn
yarn dev
```

| Command | Result |
|---|---|
| `yarn dev` | Development server with every post |
| `yarn dev-lite` | Quicker development server with a sample of posts |
| `yarn dev-unpublished` | Development server with only the unpublished posts |
| `yarn build` | Production build of every published post |
| `yarn build:sample` | Quicker build of the sample posts |
| `yarn preview` | Serves the last build |
| `yarn test` | Unit tests |
| `yarn type-check` | Type check |
| `yarn lint` | Lint |
| `yarn storybook` | Component explorer |
| `yarn test:e2e` | Accessibility tests in Cypress |
| `yarn optimize` | Shrinks oversized images in `content/` |

The sample is listed in `src/content.config.ts`.

## Writing posts

Posts live in `content/blog/`, one folder each, filed as `section/category/post-name`. A category page lists the posts in its folder, and any others whose categories name both the section and the category. Show a paint with `<Paint name="Abaddon Black" />`, adding `category="..."` where brands share a name. No import is needed.

## Settings

Settings come from the environment, or from `.env.development` (development servers) and `.env.production` (builds):

| Setting | Used for |
|---|---|
| `DISQUS_NAME` | Comments (Disqus) |
| `GA_TRACKING_ID` | Analytics, in production builds only |

## Preview deployment

Pushing the `astro` branch runs [astro-preview.yaml](.github/workflows/astro-preview.yaml), which builds every post and publishes a Netlify draft deploy under the alias `astro-preview`. The address is printed at the end of the run. The live site is not touched.

Preview builds leave analytics out. To include it, set the GitHub repository variable `PREVIEW_ANALYTICS` to `true`.

## Deployment

Pushing to `master` runs [deploy.yaml](.github/workflows/deploy.yaml), which tests the project, builds every post and publishes it to Netlify. The first build processes every image and takes several minutes longer than later ones. To undo a release, republish an earlier deploy from the Netlify dashboard.

Dependabot's patch and minor updates merge, and so deploy, once the `test` check passes.
