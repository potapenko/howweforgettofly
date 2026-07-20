# Verification layer

This directory contains optional verification artifacts for How We Forget to
Fly. It is separate from `docs/specs/`:

- active specs define intended product behavior;
- tests and browser QA provide evidence that implementation matches a spec.

Verification does not need to be browser-based. Existing unit and integration
tests remain appropriate for many changes. Use [`web/`](web/README.md) when a
real-browser check is the right evidence, especially for navigation, locale
continuity, responsive reading, motion controls, and visual scene handoff.

Browser QA stays optional. Do not create a case just to prove static copy;
create one when a user-visible browser behavior needs representative real-world
evidence.
