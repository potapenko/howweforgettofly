# Optional web QA

This is the optional real-browser QA layer for the continuous bilingual reader.
It is for smoke, regression, and exploratory cases; it does not replace
`npm run check`, active specs, or manual editorial review.

## Read first

1. `AGENTS.md` and the relevant active specs in `docs/specs/`.
2. [`AGENTS.run.md`](AGENTS.run.md) before executing a QA run.
3. [`AGENTS.cases.md`](AGENTS.cases.md) before authoring or changing a case.

## Structure

```text
qa/
  cases/
    smoke/         # stable, critical reader journeys
    regression/    # a specific fixed behavior or high-risk boundary
    experimental/  # useful exploration not yet stable enough for regression
  runs/             # local, ignored execution evidence
  templates/
  web/
```

## What needs browser evidence

Use browser QA when an active-spec change or investigation depends on browser
behavior that unit tests cannot represent well, including:

- EN/RU route and hash navigation, including locale continuity;
- persistent header, keyboard menu, and skip-link behavior;
- desktop/mobile breakpoint transitions and normal-flow mobile scenes;
- Quiet view, reduced motion, sticky scene motion, and poster/layer fallback;
- source-boundary checks in rendered end matter.

Map each case to an active spec. The initial project mapping is in
[`../cases/README.md`](../cases/README.md). Run reports are local evidence and
must not be committed.
