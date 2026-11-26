# MiniToTheMax

A miniature painting hobby blog, built with [Astro](https://astro.build) and React.

| Folder | Holds |
|---|---|
| `astro/` | The site: pages, layout and build settings |
| `src/` | React components, paint data and utilities, with their tests and stories |
| `content/` | Posts and images |

## Getting started

Needs the Node version in `.nvmrc`. Install both sets of packages:

```sh
yarn
cd astro && yarn
```

| Command | Result |
|---|---|
| `yarn dev` | Development server with a sample of posts |
| `yarn build` | Production build of every published post |
| `yarn preview` | Serves the last build |
| `yarn test` | Unit tests |
| `yarn type-check` | Type check of `src/` |
| `yarn storybook` | Component explorer |
| `yarn test:e2e` | Accessibility tests in Cypress |
| `yarn optimize` | Shrinks oversized images in `content/` |

See [astro/README.md](astro/README.md) for settings and preview deployments.
