# Product specs

This directory is the product-behavior layer for How We Forget to Fly. Active
specs define what visitors experience; they are contracts, not implementation
notes or test plans.

Read [`index.md`](index.md) first. It identifies the smallest active slice for
a task and distinguishes active contracts from supporting, historical, and
completed-migration material.

## Mandatory Spec Basis

For every feature, behavioral bug or investigation, product-behavior plan, or
potentially behavioral refactor, state the following before opening
implementation source:

```text
Spec Basis
- Task:
- Authoritative specs:
- Expected behavior:
- Invariants and edge cases:
- Gaps or conflicts:
- Required spec impact:
- Implementation authorized: yes / no
```

The full workflow is in [`../spec-first-workflow.md`](../spec-first-workflow.md).

## What belongs here

- user-visible behavior, scope, non-goals, invariants, and edge cases;
- route, state, or data contracts that a visitor can depend on;
- product-level verification mapping and explicit unresolved questions.

Keep detailed implementation notes near the source, and keep test/QA evidence
with tests or the relevant verification layer. Evidence may reveal a missing or
stale contract but cannot override intended behavior.

## Lifecycle

`index.md` is the authority registry. A document is one of:

- **Active** — governs future product behavior.
- **Supporting** — supplies canonical editorial, visual, or governance inputs
  named by an active spec, but does not replace it.
- **Historical or superseded** — useful evidence only; it must not choose a
  current behavior when it conflicts with active material.
- **Report** — verification evidence from a named past change.

## Creating or changing a spec

Use [`templates/feature-spec.md`](templates/feature-spec.md). Create or update
a spec before changing observable behavior. A new spec is normally unnecessary
for formatting, comments, copy-only work, or proven behavior-neutral cleanup;
if uncertain, use the gate.

This repository completed its first brownfield discovery on 2026-07-20. Its
observed behavior, authority conflicts, first-pass contracts, and remaining
questions are recorded in [`discovery/`](discovery/).
