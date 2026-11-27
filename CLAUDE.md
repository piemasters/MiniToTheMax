# CLAUDE.md

MiniToTheMax (https://minitothemax.app) is a miniature painting blog: a static Astro site with React components and MDX posts. See [README.md](README.md) for the commands and settings.

## Pushing to `master` publishes the live site

- Work on a branch and open a pull request. `deploy.yaml` publishes `dist/` to Netlify on every push to `master`.
- Netlify's own Git builds must stay **stopped**. They publish `public/`, which holds only static files, and that takes the site down.
- The `test` job in `test.yaml` is a required check, referred to by that name in branch protection. Don't rename it.
- Dependabot's patch and minor updates auto-merge, and so deploy, once `test` passes. Major updates are merged by hand.
- `netlify-cli@27` is pinned inside the workflow commands, where Dependabot doesn't see it.

## Checks

Node version is in `.nvmrc`; Yarn is the copy in `.yarn/releases`.

```sh
yarn lint
yarn type-check          # runs astro sync first
yarn test                # Jest, src/ only; add a path to narrow it
yarn build:sample        # quick build of the sample posts
yarn test:e2e:ci         # Cypress against the last build
yarn build-storybook
```

`yarn build` builds every published post and processes about 3,000 images: allow several minutes from an empty cache.

## Layout

| Path | Holds |
|---|---|
| `content/blog/<section>/<category>/<post>/index.mdx` | A post, with its images beside it |
| `src/pages/`, `src/layouts/` | Astro routes and the page shell |
| `src/components/<Name>/` | A component with its tests, stories and snapshots |
| `src/lib/` | Build-time only code: may use `astro:*`, `sharp` and `node:*` |
| `src/util/` | Code that also runs in the browser, Jest and Storybook |
| `src/data/` | Paint ranges and the painting backlog |
| `src/assets/` | Images used by the site itself |

Keep the `lib` / `util` boundary: a component or util must not import from `src/lib/`. The exception is `.astro` components, which only run during the build.

## Components

- React components in `src/components/` are shared by the site, tests and Storybook. They don't depend on Astro, and render as static HTML unless a page adds a `client:*` directive.
- Image processing happens in Astro code. Pass components plain data, such as the `ResponsiveImage` type built by `coverImage()` in `src/lib/images.ts`. React components can't use Astro's `<Image>`.
- In a `.tsx` file, import an image as `file.webp?url` to get its address. Without `?url`, Astro returns an object.
- Link with `PageLink`. Page addresses end in `/`, which it adds; plain links must include it.
- `src/styles/global.css` has element styles outside Tailwind's layers (for example `button { margin: 0 }`). They beat utility classes, so such a utility needs `!`, as in `m-1!`.

## Posts

Front matter, validated in `src/content.config.ts`:

```yaml
title: 'Showcase: Moonstone Grub'
date: '2026-01-27'
categories: [Moonstone, Showcase]
tags: [goblin, wizard]
featuredImage: grub-cover.jpg   # file name beside the post
gallery: [grub-01.jpg, grub-02.jpg]
published: true                 # omitted or false means draft
```

- Posts import nothing. `<Paint name="..." category="..." />` and Markdown images are supplied by `src/pages/[...slug].astro` (`PostPaint`, `PostImage`).
- Paint names must exist in `src/data/paints`; `mdxPaints.test.ts` checks every post. Where brands share a name, add `category`.
- A post's folder path is its address, and Disqus matches comments on it. **Renaming or moving a published post detaches its comments** and breaks links.
- A category page (`/showcase/orks/`) lists the posts in that folder plus any whose categories name both parts. Pages with nothing published aren't built.
- The development servers load every post (`yarn dev`), a sample listed in `content.config.ts` (`yarn dev-lite`) or only drafts (`yarn dev-unpublished`).
- Run `yarn optimize` to shrink images wider than 1800px before committing them.

## Settings

`DISQUS_NAME` and `GA_TRACKING_ID` come from the environment or the git-ignored `.env.*` files. `astro.config.mjs` passes them to pages through `vite.define`; add any new setting there and to the workflows.

A local production build includes analytics if `.env.production` has an ID. Block analytics when browsing such a build.

## Gotchas

- `LocalImageUsedWrongly` during a build means Astro's content cache is stale: delete `node_modules/.astro/data-store.json`. CI caches only `node_modules/.astro/assets`.
- `tsc` is TypeScript 7 (`@typescript/native`). The `typescript` package is the TypeScript 6 API, which the linter needs.
- If `yarn dev` or `yarn preview` returns at once, Astro has started it in the background, as it does under some coding agents. Use `yarn astro dev stop` or `yarn astro preview stop`. Don't stop a server you didn't start.
- On Windows, if no Storybook stories load, run it from a path with an upper-case drive letter.

## Licence

Content (`content/`, `src/assets/`, the name and logo) is all rights reserved; code is MIT. See [LICENSE](LICENSE).
