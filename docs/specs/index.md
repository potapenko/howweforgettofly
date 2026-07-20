# Spec index

This is the authority registry for future product-behavior work. Read it after
`AGENTS.md` and `docs/specs/README.md`, then read every listed active spec that
governs the task.

## Active first-pass contracts

| Spec | Read when | Governs |
| --- | --- | --- |
| [`features/continuous-bilingual-reading.md`](features/continuous-bilingual-reading.md) | changing routes, chapter order, header, language, navigation, accessibility, or reading controls | the single long-form reading experience |
| [`features/editorial-independence-and-colophon.md`](features/editorial-independence-and-colophon.md) | changing public copy, metadata, accessible text, end matter, source references, or editorial structure | independent bilingual editorial framing and source-boundary rules |
| [`features/illustrated-story-and-motion.md`](features/illustrated-story-and-motion.md) | changing scenes, visual layers, responsive behavior, motion, hydration, or performance guards | authored paper-world illustration and interaction behavior |
| [`features/deployment-and-release.md`](features/deployment-and-release.md) | changing hosting, build/release commands, GitHub deployment integration, public domains, or deployment verification | static DigitalOcean App Platform release behavior |

If a task spans more than one row, all affected active specs apply. If no row
covers the task, create a spec first using the template.

## Precedence

1. The active specs above govern the project behavior described in their
   scopes.
2. For editorial source framing, `docs/product/PUBLIC_SOURCE_COLOPHON_PLAN.md`
   and the current `AGENTS.md` win over older source-page proposals.
3. For visual/motion identity, `docs/visual/reference/popup-game-master.png`
   and `docs/visual/scene-expansion/SCENE_SPECS.md` win over earlier visual
   directions, as also stated in `AGENTS.md`.
4. `docs/source/` and `docs/governance/` remain internal provenance safeguards;
   they are never public runtime content.
5. Tests, current source, screenshots, reports, and Git history are evidence
   of actual behavior. They do not establish product intent when they differ
   from the contracts above.

## Supporting and non-active materials

- `docs/product/`, `docs/thesis/`, and `docs/universe/` contain useful
  editorial and conceptual inputs. Several predate the continuous-longform and
  public-source-colophon decisions; read them as supporting context only when
  they do not conflict with active specs or their stated winners.
- `docs/visual/VISUAL_SCENE_SYSTEM.md` is supporting material. Its own current
  art-direction note acknowledges that the popup-game reference supersedes
  older visual interpretations.
- `docs/reports/` records completed migrations and is verification evidence,
  not an active product contract.

The 2026-07-20 brownfield discovery recorded concrete conflicts and the
resulting first-pass backlog in [`discovery/`](discovery/).
