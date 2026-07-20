# Browser QA case author

Use this guide when creating or updating browser QA cases.

## Requirements

- Read the governing active specs first and validate behavior in a real browser
  before recording a case.
- Write one behavior per case. Prefer DOM-checkable expected results over copy
  visibility checks, unless the exact rendered text is itself the contract.
- Include a source-spec reference, functional interpretation, preconditions,
  steps, expected results, console-error check, and core-network check.
- Search `qa/cases/` before adding a case; update existing coverage instead of
  duplicating it.

## Case locations

- `qa/cases/smoke/` — stable, critical ways to enter, read, and control the
  book.
- `qa/cases/regression/` — a fixed bug or a high-risk contract boundary.
- `qa/cases/experimental/` — discovery coverage not ready to represent a stable
  product promise.

## Project boundaries

Keep cases faithful to the reading experience. They must not imply forms,
accounts, profiles, saved histories, analytics, live AI, scores, or a
workbench flow that the product does not offer. Use the visual source of truth
when the case judges a composition rather than a DOM contract.
