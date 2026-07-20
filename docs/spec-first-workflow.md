# Strict Spec-First Workflow

This document is the canonical workflow for How We Forget to Fly.

Its purpose is simple: intended product behavior must be established from the
active specs before implementation code is used to design, diagnose, or change
that behavior.

## Three separate layers

1. [`docs/specs/`](specs/README.md) defines intended product behavior.
2. Implementation code realizes that contract.
3. Tests, runtime output, screenshots, and history verify or explain the
   implementation.

The second and third layers may expose a missing, stale, or contradictory
spec. They must not silently replace the first layer as product truth.

## Mandatory Spec Gate

The gate applies to new product features, observable behavior changes,
behavioral bugs and investigations, product-behavior planning, route/state/data
contract changes, multi-step flows, and refactors whose behavioral impact is
possible or uncertain. If impact is uncertain, the gate applies.

Before opening implementation source for a covered task:

1. Read `AGENTS.md`, `docs/specs/README.md`, `docs/specs/index.md`, and every
   active spec governing the task.
2. State a compact, visible **Spec Basis**.
3. Resolve missing or conflicting behavior in the specs.
4. Only then inspect implementation source, tests, runtime evidence, or Git
   history.

Use this template:

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

The Spec Basis lets a reviewer verify that the right contract was found before
code begins shaping the answer.

## Missing or conflicting specs

When no adequate active spec exists, state the gap; create or update the spec;
settle behavior that follows directly from the request; ask the user only when
a material product choice remains; and do not edit implementation until the
contract is explicit.

When materials conflict, follow explicit `canonical`, `governs`, `wins`, or
`supersedes` language in the spec index or governing documents. Historical,
legacy, deferred, and completed-migration documents are evidence only. Never
use current code to decide which product rule wins.

## Behavioral diagnosis and implementation ordering

For a behavioral investigation, derive expected behavior from active specs
first, actual behavior from code/tests/runtime/history second, name the exact
discrepancy, then decide whether the spec or implementation needs change.

For a behavior change, edit the spec before the first implementation edit.
Planning-only and investigation-only requests are hard stops on implementation
until the user explicitly authorizes code changes.

## Brownfield discovery

The only exception to source-after-spec ordering is an explicit brownfield
discovery pass. Record that the relevant contract is absent or unreliable,
inspect code, routes, state, tests, docs, and UI flows as evidence, separate
observed behavior from intended behavior, and create a product map, backlog,
and first-pass specs. Do not modify product implementation during discovery.

Once first-pass specs exist, ordinary work returns to the Mandatory Spec Gate.
