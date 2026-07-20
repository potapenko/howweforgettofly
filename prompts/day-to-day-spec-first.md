Read this project's `AGENTS.md`, `docs/spec-first-workflow.md`,
`docs/specs/README.md`, `docs/specs/index.md`, and every active spec relevant
to the task before opening implementation source, tests, runtime evidence, or
Git history.

State a visible Spec Basis:

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

For a behavior change, update the governing spec before the first
implementation edit. For a behavioral bug or investigation, derive expected
behavior from specs first and actual behavior from evidence second, then state
the discrepancy. Planning-only and investigation-only requests do not authorize
implementation.

Use code and tests as evidence, never as a substitute for product intent.
