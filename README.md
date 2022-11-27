# Project Apps

## Balance and Ruin

### Overview

This is the primary website for WC

1. Interact with various forms to get a flagstring
2. Upload your rom and click "Generate"
3. Make request `POST /api/generate` deliver a FF6WC patch file that is applied on the browser

### MVP Features

- Retain all FF6WC functionality flagset creation
  - Graphics are an exception, being taken care of in [Relmo](#relmo)
- Can interact with any branch of WC
- All flags are available in UI , including dev flags

## Relmo

Relmo is the location for everything sprite/palette/portrait related.

Idea is to create the content of the graphics tab here in isolation and then port it over once it's finished. The reason for this is to keep any unnecessary graphic/sprite code out of balance and ruin

### MVP Features

- Recreate ff6wc.com graphics tab
- Generate flagstring at the bottom of the file, adding way to copy it to clipboard.

### Long-term features

- Create presets inside of relmo, making them accessible via balance-and-ruin
- Move `relmo` into the `balance-and-ruin` app

## Api

Currently for the API we run python endpoints.

### Local Development

During local development we execute python locally using `python-shell` inside of Next.js api endpoint

### Production

The code running during local development will be added to an AWS Amplify python lambda,running any necessary WC code

4. Integrate captcha to keep spammers from spammin

## Long-term Goals

### Graphics

Add ability to create presets inside of app, which get loaded on the site and can be selected under the "Graphics" tab

### Music

Short-term: Create a new app (NEED NAME) where you can create new playlists that can be applied to WC seeds.
Long-term: Add "Music" section to main site. Here you can create/choose playlists created by yourself or the community that can be applied

---

# Turborepo starter (old readme)

This is an official pnpm starter turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
