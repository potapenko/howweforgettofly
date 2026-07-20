You are writing browser QA cases for How We Forget to Fly, a continuous EN/RU
interactive reading experience.

Read `AGENTS.md`, `docs/specs/README.md`, `docs/specs/index.md`, every active
spec that governs the proposed behavior, and `qa/web/AGENTS.cases.md` before
opening implementation source or creating cases.

Use a real browser to validate behavior. Create small, non-duplicative cases
that each prove one user-visible behavior. Prefer DOM-checkable assertions;
use visual evidence only where the visual/motion contract requires it.

Every case must include the governing spec, functional interpretation,
preconditions, steps, expected results, and checks for uncaught console errors
and failed core network requests. Keep the product's reading-only, bilingual,
no-data-collection, and reduced-motion boundaries intact.
