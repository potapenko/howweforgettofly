Repair this repository's spec-first workflow without changing product
implementation. Read `AGENTS.md`, project onboarding docs,
`docs/spec-first-workflow.md`, `docs/specs/README.md`, `docs/specs/index.md`,
and the smallest relevant set of active and historical specs.

Preserve project-specific safety, build, test, release, and editorial rules.
Ensure the Mandatory Spec Gate is near the top-level entry point, requires a
visible Spec Basis before implementation source is opened, makes behavioral
diagnosis spec-first and evidence-second, treats planning and investigation as
hard stops on implementation, and keeps explicit brownfield discovery as the
narrow exception. Verify Markdown links, contradictions, `git diff --check`,
and that no product implementation files changed.
