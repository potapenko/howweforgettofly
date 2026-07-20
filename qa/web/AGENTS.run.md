# Browser QA runner

Use this guide for a bounded browser-QA run. First read the relevant active
specs so expected behavior comes from product contracts, not from the current
screen alone.

## Base URL and browser

- Set the target URL explicitly before a run. The local Vite development target
  is normally `http://127.0.0.1:5173`; do not assume it is already running.
- Use a real browser. Prefer Playwright or the project-approved browser control
  when it can observe the required behavior.
- Run Safari desktop and mobile checks for scoped visual, layout, motion, or
  reading-flow changes, as required by `AGENTS.md`.

## Run rules

- Execute smoke cases before regression or experimental cases.
- Prefer DOM-checkable assertions over visual guesses; attach screenshots when
  composition, motion fallback, or responsive layout is the behavior at issue.
- After each major flow, check uncaught console errors and failed core network
  requests.
- Mark every case `PASS`, `FAIL`, `FLAKY`, or `SKIPPED`.
- For `FAIL` and `FLAKY`, record the URL, expected versus actual behavior,
  relevant console/network evidence, and local screenshot path.

## Retry and evidence policy

Retry a failed check once after reload and once in a fresh browser context. If
it remains broken, record evidence and continue with independent cases.

Do not modify case files during a run. Write local reports only under
`qa/runs/<date>-<scope>/`; that directory ignores generated artifacts. Use
[`../templates/report.template.md`](../templates/report.template.md) and
[`../templates/bug.template.md`](../templates/bug.template.md) when needed.
