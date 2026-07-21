# Static deployment and release

**Status:** Active, first pass 2026-07-20.

## Goal

Publish the static bilingual reader through DigitalOcean App Platform from its
canonical GitHub repository. A commit that reaches `master` must be built and
deployed automatically without introducing a server runtime, secrets, or a
second product artifact.

## Scope

- the committed App Platform spec in `.do/app.yaml`;
- the App Platform GitHub integration, `master` branch, static build command,
  artifact directory, and SPA fallback;
- the `howweforgettofly.com` DNS zone delegated to DigitalOcean, with the apex
  as the primary domain and `www` as its alias;
- build/deploy failure alerts and bounded post-deploy verification.

## Non-goals

- application servers, databases, runtime environment variables, analytics, or
  a custom CI-to-DigitalOcean token path;
- publishing internal provenance materials or repository documentation as
  public application content.

## User-visible behavior

- The public host serves the Vite production artifact from `dist/`. The build
  emits localized static entry documents for `/` and `/ru/`; `index.html`
  remains the fallback for legacy client-side routes, and `/ru` normalizes to
  the canonical Russian root `/ru/`.
- The artifact includes a root `robots.txt`, an XML sitemap containing both
  canonical locale roots, and the shared public social-preview image.
  These resources use absolute production URLs and require no server runtime.
- App Platform builds the root repository with Node.js using `npm ci` followed
  by `npm run check`; a failed typecheck, test suite, or production build must
  fail the deployment rather than publish a partial artifact.
- DigitalOcean automatically deploys new commits on `master` after its GitHub
  installation is authorized for `potapenko/howweforgettofly`.
- `howweforgettofly.com` is the primary public address and
  `www.howweforgettofly.com` is an alias. DigitalOcean manages their DNS
  records and TLS certificates after nameserver propagation.
- The deployment contains only the static build output. Internal `docs/source/`
  and `docs/governance/` content remains repository-only.

## Invariants

- The production site remains static and reading-only, with no environment
  variables, secrets, database, or server-side API requirement.
- The committed `.do/app.yaml` is the reproducible configuration baseline;
  console settings must not silently diverge from it.
- GitHub CI remains an independent verification signal; App Platform's
  `deploy_on_push` is the deployment trigger, so no repository secret or
  GitHub deploy workflow is required.

## Edge cases and failure policy

- A build or deployment failure creates no claimed successful release; inspect
  the App Platform deployment log and retry only after the cause is understood.
- If the custom domain is not active, keep the technical ingress available and
  inspect App Platform domain progress rather than changing product routing.
- A failed or missing `dist/` artifact is a deployment failure, not a reason to
  serve repository files or `public/` directly.
- If the host does not serve `dist/ru/index.html` at `/ru/`, the Russian
  crawler contract has failed even when the client-side application later
  renders Russian after JavaScript starts.

## Route / state / data implications

- Production URL, App Platform app ID, and custom-domain configuration are
  deployment metadata, not visitor state and not product configuration stored
  in the browser.
- `master` is the production source branch. Pull requests continue to use the
  existing GitHub CI verification without automatic production deployment.

## Verification mapping

- `.github/workflows/ci.yml` executes `npm ci` and `npm run check` for pushes
  to `master` and pull requests.
- `.do/app.yaml` declares the matching App Platform static-site build and
  artifact contract.
- In the App Platform console, verify the connected repository, `master`,
  auto-deploy, static output, successful deployment, technical ingress, custom
  domain/TLS state, `/ru` normalization, localized `/ru/` source HTML, and
  direct `robots.txt`, sitemap, and social-image responses.
