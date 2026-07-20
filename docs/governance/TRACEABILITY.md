# How We Forget to Fly — Traceability

**Version:** 1.0  
**Date:** 2026-07-19  
**Status:** `traceability-ready; local-implementation-mapped`<br>
**Scope:** documentary provenance plus local implementation crosswalk; no
publication, domain check, scientific proof, or full translation

> **Implementation-state note — 2026-07-20.** The current
> [reading experience](../../README.md) implements `PAGE-01…PAGE-07` and all
> twelve Manifesto articles as one bilingual long-form page. Earlier guided
> practices and reflection state were removed; their identifiers below remain
> historical provenance, not current product surfaces. Persistence, analytics,
> forms, accounts, and live AI remain absent;
> the visual layer is implemented as poster-first raster parallax using
> ImageGen-derived `1672 × 941` RGB/RGBA packs, `480svh` Home pacing,
> approximately `320vh` chapter pacing, bounded pointer/touch depth, and
> reduced-motion fallback without Three.js/WebGL. Rendered-browser/design QA
> is a separate open gate.

This document answers two editorial questions: **where did a project idea come
from, and what did it become?** It does not answer whether a source claim is
scientifically true. Traceability here records origin, transformation,
retirement, and downstream use—not proof.

The governing chain is:

> source fragment or explicit `project-origin` → `SOURCE_MAP` address → Idea
> Card → canonical term / axiom / meta-invariant / hypothesis / retirement →
> thesis or audience document → product page → experience and MVP state

The source-side contracts live in
[`SOURCE_MAP.md`](../source/SOURCE_MAP.md),
[`IDEA_CARDS.md`](../source/IDEA_CARDS.md), and
[`SOURCE_AND_ATTRIBUTION.md`](../source/SOURCE_AND_ATTRIBUTION.md). The stable
world interface lives in
[`FLIGHT_UNIVERSE_BIBLE.md`](../universe/FLIGHT_UNIVERSE_BIBLE.md) and
[`HYPOTHESIS_LEDGER.md`](../universe/HYPOTHESIS_LEDGER.md).

---

## 1. How to read the chains

### 1.1. Provenance labels

- **source fragment** means an inspectable `tNN` anchor in the preserved web
  source. It supports only the narrow paraphrase recorded in `SOURCE_MAP.md`.
- **source-derived** means the project carried, transformed, held, or retired a
  source impulse. It does not mean the project endorses the source claim.
- **project-origin** means there is no fragment and no `SOURCE_MAP` ID. The
  idea begins in the project’s Spec Basis or later project synthesis.
- **world axiom** is a chosen law of this speculative world. It is tested for
  coherence and ethical consequences, not for scientific consensus.
- **project hypothesis** is revisable. An experience may operationalize it
  without promising an outcome.
- **retired** records a source or design possibility that downstream work must
  not silently restore.

In the tables below, “canon” names either a direct canonical landing or the
canonical guardrail governing downstream use. The detailed `Origin` fields in
`HYPOTHESIS_LEDGER.md` remain authoritative when a distinction matters.

### 1.2. Stable identifiers

- Terms: `TERM-01…TERM-11`; state: `STATE-01`.
- World axioms: `AX-01…AX-12`.
- Meta-invariants: `META-01…META-04`.
- Project hypotheses: `PH-01…PH-10`.
- Retired propositions: `RT-01…RT-12`.
- Source claims retained for attribution: `SC-01…SC-15`.
- Optional author checks: `UCP-01…UCP-08`.
- Product experiences: `EXP-01…EXP-10`.
- Product destinations: `PAGE-01…PAGE-07`.
- Shared interaction grammar: `S0…S8`.

The current implementation surfaces are:

- route composition in [`App.tsx`](../../src/App.tsx) and
  [`LongformPage.tsx`](../../src/routes/LongformPage.tsx);
- the twelve-article registry in
  [`manifesto.ts`](../../src/content/manifesto.ts);
- the authored reading paths in
  [`pathways.ts`](../../src/content/pathways.ts) and
  [`pathways.ru.ts`](../../src/content/pathways.ru.ts);
- the seventeen-story registry and raster asset map in
  [`storyRegistry.ts`](../../src/story/storyRegistry.ts);
- the sticky poster-first runtime in
  [`ParallaxStage.tsx`](../../src/story/ParallaxStage.tsx);
- the chapter story-to-text handoff in
  [`SceneObserver.tsx`](../../src/components/SceneObserver.tsx).

These links establish repository traceability. They do not by themselves prove
rendered-browser or visual acceptance.

---

## 2. Full source-derived chains

These chains show the complete transformation path. They use different
chapters so that traceability is not inferred from one recurring passage.

### SD-01 — The boy, the borrowed explanation, and Forgetting Flight

1. **Fragment:** Chapter 1, `t6`, the parable of the boy asked to decompose and
   explain his flight before trying again.
2. **Map:** `SRC-01-01` preserves the narrow source paraphrase.
3. **Card:** `IC-05` transforms a loss-of-whole story into **Forgetting
   Flight**, explicitly not a diagnosis or proof that reflection is harmful.
4. **Canon:** `STATE-01`, `META-04`; related map/whole guardrails are
   `AX-04`, `PH-09`, and `RT-04`.
5. **Thesis/document:** `CONCEPT_BRIEF.md` gives the title its present meaning;
   `NAMING_AND_DOMAIN_BRIEF.md` chooses **How We Forget to Fly**;
   `MEMORANDUM.en.md` preamble and `Article 3 — A map is not the sky` /
   `MEMORANDUM.ru.md` preamble and `Статья 3 — Карта — не небо` turn the
   parable into a non-diagnostic relation between maps and action.
6. **Product:** `PAGE-01` offers recognition without a profile; `PAGE-07`
   exposes provenance; `EXP-10` examines a borrowed route; `S0`, `S2`, and
   `S3` keep the interpretation inspectable and revisable. MVP states 6.2 and
   6.3 prevent a returning, blank, or uncertain visitor from being classified
   as someone who “cannot fly.”

### SD-02 — A dying explanatory myth becomes an open myth

1. **Fragment:** Chapter 2, `t33–t37`, discusses God, myth, explanation, and
   the disruption of an already assembled action.
2. **Map:** `SRC-02-01…SRC-02-05` separates those claims and their limits.
3. **Card:** `IC-12` uses decision `hold`: keep symbolic force and unfinished
   mystery, but deny immunity from criticism and deny an authoritative
   interpreter.
4. **Canon:** `META-02`, `PH-02`, `RT-12`; `META-01` and `AX-12` prevent the
   myth from creating a human rank.
5. **Thesis/document:** `CONCEPT_BRIEF.md` section “A religion without a cult”;
   `MEMORANDUM.en.md` `Article 12 — The myth remains open` /
   `MEMORANDUM.ru.md` `Статья 12 — Миф остаётся открытым`;
   `SITE_THESIS.md` progressive disclosure and open-myth boundary.
6. **Product:** `PAGE-02` states the covenant; `PAGE-07` distinguishes source,
   transformation, and genre; every experience begins with `S0` and voluntary
   `S1`. MVP states 6.1, 6.3, 6.4, and 6.10 preserve the right to understand,
   decline, remain uncertain, or stop without belonging tests.

The source chapter is the stimulus for this transformation. The project’s
anti-cult rules are not attributed to the book; their separate project-origin
chain is `PO-03` below.

### SD-03 — Teacher–student encounters become Keeper of Conditions

1. **Fragment:** Chapter 5, `t136`, `t161–t171`, plus the equal-standing adult
   scene at `t235`.
2. **Map:** `SRC-05-12`, `SRC-05-15…SRC-05-19`, `SRC-06-06`.
3. **Cards:** `IC-19` transforms the nine encounters into relational
   conditions; `IC-20` carries the co-learner possibility; `IC-25` transforms
   the source’s critique of moulding into the parent role.
4. **Canon:** `TERM-10`, `AX-07`, `PH-06`, `RT-07`; `AX-12` keeps equal
   dignity while the adult retains unequal responsibility.
5. **Thesis/document:** `PARENT_FOUNDATION.md`; `MEMORANDUM.en.md`
   `Article 7 — Parents are Keepers of Conditions` /
   `MEMORANDUM.ru.md` `Статья 7 — Родители хранят условия`;
   the parent doorway in `SITE_THESIS.md`.
6. **Product:** `PAGE-03`; guided `EXP-01`, `EXP-03`, and `EXP-07`;
   `S3`, `S4`, `S7`, and `S8`. MVP states 6.4 and 6.5 distinguish real refusal
   and insufficient Lift from safety, care, law, and shared obligations. The
   parent acceptance path ends in Return and Ground without judging either
   parent or child.

### SD-04 — Criticality becomes Call and Compass

1. **Fragment:** Chapter 6, `t230–t236`, especially noticed mismatch,
   proportion, and responsibility.
2. **Map:** `SRC-06-01…SRC-06-08`.
3. **Cards:** `IC-03` transforms mismatch into **The Call**; `IC-22` transforms
   criticality into revisable discernment rather than negativity or superior
   taste.
4. **Canon:** `TERM-07`, `TERM-06`, `AX-03`, `AX-05`, `AX-10`, `PH-03`,
   `RT-06`.
5. **Thesis/document:** `ADULT_FOUNDATION.md`; the direction and adoption
   tests in `AI_AS_WIND.md`; `MEMORANDUM.en.md` `Article 2 — Authorship begins
   with a question` and `Article 6 — Freedom needs a Compass` /
   `MEMORANDUM.ru.md` `Статья 2 — Авторство начинается с вопроса` and
   `Статья 6 — Свободе нужен Компас`.
6. **Product:** `PAGE-04` and `PAGE-05`; guided `EXP-02`, `EXP-05`, and
   `EXP-10`; `S2` and `S3`, followed by `S7` and `S8`. MVP states 6.3, 6.4,
   6.7, and 6.8 allow uncertainty, refusal, AI drift, and no Return yet without
   manufacturing a destination.

### SD-05 — Contribution becomes non-compulsory Return

1. **Fragment:** Chapter 5, `t119–t121` and `t125–t130`; the source
   Memorandum at `t237` adds a more metaphysical account of contribution.
2. **Map:** `SRC-05-08`, `SRC-05-10`, and `§5.7/t237`.
3. **Cards:** `IC-18` carries relational contribution; `IC-26` transforms it
   into Return without a great mission.
4. **Canon:** `TERM-09`, `AX-11`, `PH-08`, `RT-11`; `AX-12` prevents utility
   from becoming a worth metric.
5. **Thesis/document:** the adult and parent cycle sections;
   `MEMORANDUM.en.md` `Article 10 — Return completes the arc` /
   `MEMORANDUM.ru.md` `Статья 10 — Возвращение завершает дугу`.
6. **Product:** `PAGE-06`; `EXP-08` and `EXP-09`; `S7` and `S8`. MVP states
   6.8 and 6.10 accept private Return, no contact yet, repair, or an honest
   ending without requiring publication, market value, scale, or applause.

---

## 3. Full project-origin chains

These chains deliberately have no source fragment and no `SOURCE_MAP` ID.

### PO-01 — AI as Wind

1. **Origin:** `PROJECT_PLAN.md` Spec Basis and axiom 9; contemporary project
   synthesis. **Source fragment: none. `SOURCE_MAP` ID: none.**
2. **Card:** `IC-24`, decision `project-original`.
3. **Canon:** `TERM-08`, `AX-09`, `PH-07`, `RT-08`, `RT-09`; `AX-04`,
   `AX-05`, and `AX-12` govern adoption, consequences, and non-comparative
   human worth. `UCP-05` may later test the practical hypothesis without
   turning the normative boundary into a source claim.
4. **Thesis/document:** `AI_AS_WIND.md`; `MEMORANDUM.en.md`
   `Article 9 — AI is Wind, not a hidden pilot` /
   `MEMORANDUM.ru.md` `Статья 9 — ИИ — Ветер, а не скрытый пилот`;
   `SITE_THESIS.md` AI doorway.
5. **Product:** `PAGE-05`; `EXP-05`; `S3` before assistance and `S7` after
   adoption. MVP states 6.6 and 6.7 provide the no-AI route and the drift
   repair; `E2E-05` and `E2E-06` verify both.

### PO-02 — Human worth has no Flight or AI metric

1. **Origin:** `PROJECT_PLAN.md` Spec Basis 6–7 and axiom 12. **Source
   fragment: none. `SOURCE_MAP` ID: none.** The book’s universality language
   and hierarchy are historical stimuli, not evidence for this ethical
   invariant.
2. **Idea layer:** the project layers of `IC-01` and `IC-13`, plus the
   non-comparative boundary in project-original `IC-24`.
3. **Canon:** `AX-12`, `META-01`, `AX-01`, `RT-01`, `RT-02`, `RT-09`; `PH-01`
   tests a non-scored product form without testing anyone’s worth.
4. **Thesis/document:** `CONCEPT_BRIEF.md`; the invariant sections of
   `PARENT_FOUNDATION.md`, `ADULT_FOUNDATION.md`, and `AI_AS_WIND.md`;
   `MEMORANDUM.en.md` `Article 1 — Dignity comes before Flight` /
   `MEMORANDUM.ru.md` `Статья 1 — Достоинство прежде Полёта`.
5. **Product:** `PAGE-01`, `PAGE-02`, and `PAGE-06`; no score, rank, diagnosis,
   child profile, creativity type, streak, or leaderboard in any
   `EXP-01…EXP-10`; `S0`, `S1`, and `S8`. MVP states 6.2, 6.3, 6.4, 6.5, 6.9,
   and 6.10 make uncertainty, refusal, low capacity, interruption, and stopping
   non-evaluative.

### PO-03 — Open-myth ethics, not an infallible mythology

1. **Origin:** `PROJECT_PLAN.md` section “Религия в хорошем смысле,” the Open
   Myth quality gate, and the project’s dignity contract. **Source fragment:
   none. `SOURCE_MAP` ID: none for the ethical rules.**
2. **Idea layer:** the project transformations in `IC-12`, `IC-13`, `IC-14`,
   `IC-17`, and `IC-23`. Their source layers explain the contrast and the
   inherited memorandum form; they do not source the no-guru, no-initiation,
   no-secret-knowledge, or right-to-leave rules.
3. **Canon:** `META-02`, `META-01`, `AX-12`, `PH-01`, `PH-02`, `PH-09`,
   `RT-01`, `RT-02`, `RT-12`.
4. **Thesis/document:** `CONCEPT_BRIEF.md` “A religion without a cult”;
   `MEMORANDUM.en.md` `Article 12 — The myth remains open` /
   `MEMORANDUM.ru.md` `Статья 12 — Миф остаётся открытым`;
   `SITE_THESIS.md` progressive disclosure and trust boundaries.
5. **Product:** `PAGE-02` and `PAGE-07`; the participation contract of
   `PAGE-06`; `S0`, `S1`, and every leave/decline route. MVP states 6.1, 6.3,
   6.4, 6.9, and 6.10 make inspection, doubt, refusal, interruption, and exit
   ordinary outcomes rather than failures of belief.

---

## 4. Complete Idea Card registry

Every Idea Card is explicit below. Source anchors and map IDs reproduce the
crosswalk in `IDEA_CARDS.md`; `project-origin` never receives a synthetic
anchor.

| Card | Fragment → `SOURCE_MAP` | Card decision → canon / guardrail | Thesis and product landing |
|---|---|---|---|
| `IC-01` | `t2`, `t3`, `t4`, `t31`, `t228`, `t237` → `SRC-00-01`, `SRC-00-02`, `SRC-00-03`, `SRC-01-15`, `SRC-05-34`, `§5.7/t237` | `transform` → `AX-01`, `AX-12`, `META-01`; guard `RT-01`, `RT-02` | Concept; both Memoranda `Article 1` / `Статья 1`; Parent, Adult; `PAGE-01`, `PAGE-02`; all experiences use the dignity guardrail |
| `IC-02` | `t4`, `t217` → `SRC-00-03`, `SRC-05-26`, `SRC-05-32` | `carry` → originality is not superior performance; governed by `META-01`, `AX-12`, `RT-01` | Concept; both Memoranda `Article 1`, `Article 4` / `Статья 1`, `Статья 4`; Adult; `PAGE-04`, `PAGE-06`; `EXP-04`, `EXP-06` |
| `IC-03` | `t4`, `t230`, `t236` → `SRC-00-03`, `SRC-06-01`, `SRC-06-08` | `transform` → `TERM-07`, `AX-03`, `PH-03`; guard `RT-06` | Concept; Adult; both Memoranda `Article 2`, `Article 11` / `Статья 2`, `Статья 11`; `PAGE-04`; `EXP-02`, `EXP-06`; `S2` |
| `IC-04` | `t20–t21`, `t65`, `t224`, `t237` → `SRC-01-12`, `SRC-01-13`, `SRC-04-12`, `SRC-05-33`, `§5.7/t237` | `carry` → `TERM-01`, `AX-02`, `META-01`, `PH-03` | both Memoranda `Article 4` / `Статья 4`; Adult; `PAGE-02`, `PAGE-04`; `EXP-06`; `S5`, `S6` |
| `IC-05` | `t6` → `SRC-01-01` | `transform` → `STATE-01`, `META-04`; guard `RT-04` | Concept, Naming, Memoranda preambles and `Article 3` / `Статья 3`, Site; `PAGE-01`, `PAGE-07`; `EXP-10` |
| `IC-06` | `t7`, `t36–t37` → `SRC-01-02`, `SRC-02-04`, `SRC-02-05` | `transform` → whole/action distinction; governed by `AX-02`, `AX-06`, `META-04`, `RT-04` | Parent and Adult; both Memoranda `Article 4`, `Article 5` / `Статья 4`, `Статья 5`; `PAGE-03`, `PAGE-04`; `EXP-06`, `EXP-09` |
| `IC-07` | `t9–t11`, `t13` → `SRC-01-04`, `SRC-01-06` | `carry` → `TERM-03`, `TERM-06`, `AX-04`, `META-04` | Concept, Naming reserve territory, Parent, Adult, both Memoranda `Article 3` / `Статья 3`; `PAGE-01`, `PAGE-04`; `EXP-04`, `EXP-10` |
| `IC-08` | `t8`, `t15` → `SRC-01-03`, `SRC-01-08` | `carry` → `TERM-02`, `TERM-06`, `AX-05`, `AX-06`, `META-03`, `PH-05` | Parent, Adult, both Memoranda `Article 5`, `Article 6` / `Статья 5`, `Статья 6`; `PAGE-03`, `PAGE-04`; `EXP-01`, `EXP-09`, `EXP-10` |
| `IC-09` | `t18–t21`, `t60`, `t161` → `SRC-01-10`, `SRC-01-12`, `SRC-01-13`, `SRC-04-08`, `SRC-05-15` | `transform` → `TERM-04`, `TERM-05`, `TERM-06`, `PH-03`; retire literal measurement via `RT-02`, `RT-03` | Parent, Adult, both Memoranda `Article 4–6` / `Статья 4–6`; `PAGE-02`, `PAGE-06`; `EXP-06`, `EXP-07`, `EXP-10` |
| `IC-10` | `t25`, `t177` → `SRC-01-15`, `SRC-05-22` | `transform` → `TERM-04`, `AX-06`, `META-03`, `PH-05`; guard `RT-03`, `RT-10` | Parent, Adult, both Memoranda `Article 5`, `Article 11` / `Статья 5`, `Статья 11`; `PAGE-03`, `PAGE-04`; `EXP-01`, `EXP-02`, `EXP-07`, `EXP-09`; MVP 6.5 |
| `IC-11` | `t177`, `t237` → `SRC-05-22`, `§5.7/t237` | `transform` → `TERM-07`, `AX-03`; retire singular destiny via `RT-06` | Adult; both Memoranda `Article 2`, `Article 8` / `Статья 2`, `Статья 8`; `PAGE-04`; `EXP-02`; `S2` |
| `IC-12` | `t32–t37` → `SRC-02-01…SRC-02-05` | `hold` → `META-02`, `PH-02`; guard `RT-12` | Concept open myth; both Memoranda `Article 12` / `Статья 12`; Site; `PAGE-02`, `PAGE-07`; `S0`, `S1` across the Atlas |
| `IC-13` | `t38–t39`, `t193`, `t223`, `t237` → `SRC-03-01…SRC-03-07`, `SRC-05-30`, `SRC-05-32`, `SRC-05-33`, `§5.7/t237` | `retire` rank; `transform` functions → `META-01`, `AX-12`, `PH-01`, `PH-09`, `RT-01`, `RT-02` | Concept; both Memoranda `Article 1`, `Article 12` / `Статья 1`, `Статья 12`; all audience docs; `PAGE-01`, `PAGE-02`, `PAGE-06`, `PAGE-07`; all experiences no-score |
| `IC-14` | `t20–t21` → `SRC-01-12`, `SRC-01-13` | `carry` → whole-person limit on maps; governed by `AX-12`, `PH-01`, `RT-02`, `RT-12` | Concept, Site and MVP ethics; both Memoranda `Article 1`, `Article 12` / `Статья 1`, `Статья 12`; `PAGE-02`, `PAGE-06`, `PAGE-07` |
| `IC-15` | `t84–t85` → `SRC-05-02` | `transform` → `TERM-05`, `AX-02`, `PH-03`, `PH-04` | Parent, Adult, both Memoranda `Article 4` / `Статья 4`; `PAGE-03`, `PAGE-04`; `EXP-02`, `EXP-04`, `EXP-06`; `S5` |
| `IC-16` | `t25`, `t31`, `t48–t55`, `t177`, `t228` → `SRC-01-15`, `SRC-04-04`, `SRC-04-05`, `SRC-04-07`, `SRC-05-22`, `SRC-05-34` | `transform` → `TERM-02`, `TERM-04`, `AX-06`, `META-03`, `PH-04`, `PH-05`; guard `RT-10` | Parent, Adult, both Memoranda `Article 5`, `Article 11` / `Статья 5`, `Статья 11`; `PAGE-03`, `PAGE-04`; `EXP-01`, `EXP-02`, `EXP-07`, `EXP-09`; MVP 6.5 |
| `IC-17` | `t69`, `t230`, `t231` → `SRC-04-12`, `SRC-06-01`, `SRC-06-02` | `transform` → `TERM-06`, `AX-04`, `PH-09`; guard `RT-12` | Bible voice rules; both Memoranda `Article 3`, `Article 12` / `Статья 3`, `Статья 12`; all prompts; `PAGE-02`, `PAGE-06`, `PAGE-07`; `EXP-04`, `EXP-10`; `S2`, `S3` |
| `IC-18` | `t119–t121`, `t128–t130` → `SRC-05-08`, `SRC-05-10` | `carry` → `TERM-09`, `AX-11`, `PH-08`; guard `RT-11` | Parent, Adult, both Memoranda `Article 10` / `Статья 10`; `PAGE-02`, `PAGE-06`; `EXP-08`, `EXP-09`; `S7`, `S8`; MVP 6.8 |
| `IC-19` | `t161–t171` → `SRC-05-15`, `SRC-05-16` | `transform` → `TERM-10`, `AX-07`, `PH-06`; guard `RT-07` | Parent; both Memoranda `Article 7` / `Статья 7`; Site parent path; `PAGE-03`; `EXP-01`, `EXP-03`, `EXP-07` |
| `IC-20` | `t136`, `t165`, `t168`, `t171`, `t235` → `SRC-05-12`, `SRC-05-17`, `SRC-05-18`, `SRC-05-19`, `SRC-06-06` | `carry` → `TERM-10`, `AX-07`, `PH-06`; guard `RT-07` | Parent; both Memoranda `Article 7` / `Статья 7`; `PAGE-03`; `EXP-01`, `EXP-03`, `EXP-07`; Return as listening rather than compliance |
| `IC-21` | `t228`, `t237` → `SRC-05-34`, `§5.7/t237` | `transform` → `TERM-11`, `AX-08`, `META-04`; guard `RT-06` | Adult; both Memoranda `Article 8` / `Статья 8`; Naming and Site adult path; `PAGE-04`; `EXP-02`, `EXP-06`, `EXP-09` |
| `IC-22` | `t230–t236` → `SRC-06-01…SRC-06-08` | `transform` → `TERM-06`, `AX-05`, `AX-10`, `PH-03`; guard against infallible taste | Adult, AI; both Memoranda `Article 2`, `Article 6` / `Статья 2`, `Статья 6`; `PAGE-04`, `PAGE-05`; `EXP-02`, `EXP-05`, `EXP-10` |
| `IC-23` | `t237` → `§5.7/t237` | `transform` the public memorandum form; project ethics governed by `META-02`, `AX-12`, `RT-01`, `RT-12` | both complete Memoranda `Article 1…Article 12` / `Статья 1…Статья 12`; `PAGE-02`, `PAGE-07`; not a translation of the source’s sixteen points |
| `IC-24` | **none → `project-origin`** | `project-original` → `TERM-08`, `AX-09`, `PH-07`, `RT-08`, `RT-09`; guard `AX-12` | AI; both Memoranda `Article 9` / `Статья 9`; Site; `PAGE-05`; `EXP-05`; MVP 6.6, 6.7 |
| `IC-25` | `t3`, `t6`, `t82`, `t163–t171` → `SRC-00-02`, `SRC-01-01`, `SRC-05-01`, `SRC-05-16` | `transform` → `TERM-10`, `AX-07`, `PH-06`, `RT-07` | Parent; both Memoranda `Article 7` / `Статья 7`; Site; `PAGE-03`; `EXP-01`, `EXP-03`, `EXP-07` |
| `IC-26` | `t128–t129`, `t237` → `SRC-05-10`, `§5.7/t237` | `transform` → `TERM-09`, `AX-11`, `PH-08`, `RT-11` | Parent, Adult; both Memoranda `Article 10` / `Статья 10`; `PAGE-02`, `PAGE-04`, `PAGE-06`; `EXP-08`, `EXP-09`; MVP 6.8 |

---

## 5. Memorandum integration: all twelve paired articles

The English and Russian Memoranda are parallel project documents, not a full
translation or summary of the source book. `IC-23` explains the inherited
public-memorandum form; the content below is governed by the project’s canon.

| Pair | Upstream idea layer | Canonical landing | Downstream product landing |
|---|---|---|---|
| `Article 1 — Dignity comes before Flight` / `Статья 1 — Достоинство прежде Полёта` | project-origin dignity invariant; transformations `IC-01`, `IC-13`, `IC-24` | `AX-01`, `AX-12`, `META-01`, `RT-01`, `RT-02`, `RT-09` | `PAGE-01`, `PAGE-02`, `PAGE-06`; no-score contract for every experience and MVP state |
| `Article 2 — Authorship begins with a question` / `Статья 2 — Авторство начинается с вопроса` | `IC-03`, `IC-11`, `IC-22` | `TERM-07`, `AX-03`, `PH-03`, `RT-06` | `PAGE-02`, `PAGE-04`; `EXP-02`, `EXP-06`; `S2`; MVP 6.3, 6.4 |
| `Article 3 — A map is not the sky` / `Статья 3 — Карта — не небо` | `IC-05`, `IC-07`, `IC-17` | `TERM-03`, `TERM-06`, `STATE-01`, `AX-04`, `META-04`, `PH-09` | `PAGE-01`, `PAGE-02`, `PAGE-04`; `EXP-04`, `EXP-10`; `S3` |
| `Article 4 — Flight becomes real in action` / `Статья 4 — Полёт становится реальным в действии` | `IC-04`, `IC-09`, `IC-15`, `IC-18` | canonical cycle; `TERM-01`, `TERM-04`, `TERM-05`, `TERM-09`; `AX-02`, `PH-03`, `PH-04` | `PAGE-02`, `PAGE-03`, `PAGE-04`, `PAGE-06`; `EXP-02`, `EXP-06`, `EXP-08`; `S2…S8` |
| `Article 5 — Ground belongs to the journey` / `Статья 5 — Земля входит в путь` | `IC-08`, `IC-10`, `IC-16` | `TERM-02`, `TERM-03`, `TERM-04`, `AX-06`, `META-03`, `PH-05`, `RT-10` | `PAGE-03`, `PAGE-04`; `EXP-01`, `EXP-07`, `EXP-09`; `S4`, `S8`; MVP 6.5 |
| `Article 6 — Freedom needs a Compass` / `Статья 6 — Свободе нужен Компас` | `IC-08`, `IC-17`, `IC-22` | `TERM-06`, `AX-04`, `AX-05`, `AX-10` | `PAGE-02`, `PAGE-04`, `PAGE-05`; `EXP-02`, `EXP-05`, `EXP-10`; `S3` |
| `Article 7 — Parents are Keepers of Conditions` / `Статья 7 — Родители хранят условия` | `IC-19`, `IC-20`, `IC-25` | `TERM-10`, `AX-07`, `PH-06`, `RT-07` | `PAGE-03`; `EXP-01`, `EXP-03`, `EXP-07`; parent journey to `S7` and `S8`; MVP 6.4, 6.5 |
| `Article 8 — Adults can remember from the life they have` / `Статья 8 — Взрослый может вспомнить из нынешней жизни` | `IC-10`, `IC-11`, `IC-16`, `IC-21` | `TERM-11`, `AX-08`, `META-03`, `META-04`, `RT-06`, `RT-10` | `PAGE-04`; `EXP-02`, `EXP-04`, `EXP-06`, `EXP-09`; adult journey through `S2…S8` |
| `Article 9 — AI is Wind, not a hidden pilot` / `Статья 9 — ИИ — Ветер, а не скрытый пилот` | project-original `IC-24` | `TERM-08`, `AX-09`, `PH-07`, `RT-08`, `RT-09` | `PAGE-05`; `EXP-05`; `S3`, `S7`; MVP 6.6, 6.7; `E2E-05`, `E2E-06` |
| `Article 10 — Return completes the arc` / `Статья 10 — Возвращение завершает дугу` | `IC-18`, `IC-26` | `TERM-09`, `AX-11`, `PH-08`, `RT-11` | `PAGE-02`, `PAGE-06`; `EXP-08`, `EXP-09`; `S7`, `S8`; MVP 6.8 |
| `Article 11 — Refusal and help belong to authorship` / `Статья 11 — Отказ и помощь принадлежат авторству` | transformations `IC-03`, `IC-10`, `IC-16`, `IC-20` | `AX-03`, `AX-06`, `AX-07`, `AX-12`, `META-03`, `RT-06`, `RT-10` | `PAGE-03`, `PAGE-04`; `EXP-01`, `EXP-02`, `EXP-03`, `EXP-09`; MVP 6.4, 6.5 |
| `Article 12 — The myth remains open` / `Статья 12 — Миф остаётся открытым` | project-origin ethical contract; transformed contrasts `IC-12`, `IC-13`, `IC-14`, `IC-17`, `IC-23` | `META-01`, `META-02`, `AX-12`, `PH-01`, `PH-02`, `PH-09`, `RT-01`, `RT-02`, `RT-12` | `PAGE-02`, `PAGE-07`; `S0`, `S1`, `S8`; every refusal, exit, source-inspection, and plain-language route |

---

## 6. Product page registry

| Page | Governing documents and canon | Experiences / states reached |
|---|---|---|
| `PAGE-01 — Home` | Naming primary name; Concept and Site one-sentence thesis; `AX-01`, `AX-12`, `META-01`, `META-04` | Doorways to Parent, Adult, AI, Manifesto, Source, and Atlas; first-visit state 6.1; no completion condition |
| `PAGE-02 — Manifesto` | Complete `MEMORANDUM.en.md`; all twelve article pairs traced in §5; `META-02` and source/transformation boundary | Paths to both human branches and optional AI; reading-only exit; all experience principles remain inspectable |
| `PAGE-03 — Parents` | `PARENT_FOUNDATION.md`; `TERM-10`, `AX-07`, `PH-06`, `RT-07`; Memorandum `Article 7` / `Статья 7` | Guided `EXP-01`, `EXP-03`, `EXP-07`; parent path to Return and Ground; states 6.4, 6.5, 6.8 |
| `PAGE-04 — Adults` | `ADULT_FOUNDATION.md`; `TERM-11`, `AX-08`; full cycle, Ground/Gravity and map/Compass distinctions; Memorandum `Article 8` / `Статья 8` | Guided `EXP-02`, `EXP-04`, `EXP-06`, `EXP-10`; adult path through `S2…S8`; states 6.3–6.5, 6.8 |
| `PAGE-05 — AI` | `AI_AS_WIND.md`; project-origin `IC-24`; `TERM-08`, `AX-09`, `PH-07`, `RT-08`, `RT-09`; Memorandum `Article 9` / `Статья 9` | Guided `EXP-05` and complete no-AI planning path; states 6.6 and 6.7; Return and Ground remain human |
| `PAGE-06 — Practices / Interactive Atlas` | `INTERACTIVE_ATLAS.md`; `PH-01`, `PH-03`, `META-01`, `META-02`, `AX-12`, `RT-02` | All `EXP-01…EXP-10` guided and non-ranked; original seven-core/three-next tiers retained as sequencing metadata; shared `S0…S8`; all required user-visible states |
| `PAGE-07 — Source / About` | Source layer, attribution contract, naming title distinction, speculative and non-diagnostic boundary | Provenance-first `E2E-09`; routes to Manifesto and both human pathways; archive limitations are disclosed only as limitations |

---

## 7. Experience registry: `EXP-01…EXP-10`

The tier records the original sequencing decision, not current capability,
importance, or human altitude. `MVP-next` experiences are now guided entries in
`PAGE-06`, not locked levels.

| Experience | Upstream cards → canon | MVP landing |
|---|---|---|
| `EXP-01 — What Grounds Flight?` (`MVP-core`) | `IC-08`, `IC-10`, `IC-16`, `IC-19`, `IC-20`, `IC-25` → `TERM-02`, `TERM-04`, `TERM-10`, `AX-06`, `AX-07`, `AX-12`, `PH-05`, `PH-06`, `RT-07`, `RT-10` | `PAGE-03`; three-part Ground agreement separating the adult-held frame from the child-authored part; Return and Ground; MVP 6.4, 6.5, 6.8, 6.10; `E2E-01` |
| `EXP-02 — Problem Finder` (`MVP-core`) | `IC-03`, `IC-11`, `IC-16`, `IC-21`, `IC-22` → `TERM-07`, `TERM-06`, `TERM-04`, `TERM-11`, `AX-03`, `AX-05`, `AX-08`, `PH-03`, `PH-04`, `RT-06`, `RT-10` | `PAGE-04`; `S2…S8`; blank, no Call, refusal, insufficient Lift, no Return; MVP 6.3–6.5, 6.8, 6.10; `E2E-03`, `E2E-04` |
| `EXP-03 — Instruction or Invitation?` (`MVP-core`) | `IC-08`, `IC-19`, `IC-20`, `IC-25` → `TERM-10`, `TERM-06`, `AX-03`, `AX-07`, `PH-06`, `RT-07` | `PAGE-03`; truthful authority and real “no”; Return listens for effects, not compliance; MVP 6.4, 6.10; `E2E-02` |
| `EXP-04 — Template Escape` (`MVP-next`) | `IC-02`, `IC-07`, `IC-15`, `IC-17` → `TERM-03`, `TERM-05`, `TERM-06`, `AX-02`, `AX-04`, `AX-12`, `PH-04`, `PH-09`, `RT-01`, `RT-02` | Guided on `PAGE-06`, linked from `PAGE-04`; reversible variation without contempt for routine; blank, refusal, revision, review, artifact, and exit paths use the shared practice grammar |
| `EXP-05 — AI as Wind: Set the Wind` (`MVP-core`) | project-original `IC-24` plus discernment `IC-22` → `TERM-08`, `TERM-06`, `TERM-09`, `AX-04`, `AX-09`, `AX-12`, `PH-07`, `RT-08`, `RT-09` | `PAGE-05`; `S3` before bounded request, adoption pass, `S7`, `S8`; MVP 6.6, 6.7, 6.8, 6.10; `E2E-05`, `E2E-06` |
| `EXP-06 — Flight Log` (`MVP-core`) | `IC-03`, `IC-04`, `IC-09`, `IC-15`, `IC-18`, `IC-21`, `IC-26` → complete cycle, `AX-02`, `AX-03`, `AX-08`, `AX-11`, `AX-12`, `PH-03`, `PH-08`, `RT-02`, `RT-11` | `PAGE-03`, `PAGE-04`, `PAGE-06`; intentionally incomplete cycle allowed; MVP 6.3, 6.4, 6.5, 6.8–6.10 |
| `EXP-07 — Creative Climate Map` (`MVP-next`) | `IC-09`, `IC-10`, `IC-16`, `IC-19`, `IC-20`, `IC-25` → `TERM-02`, `TERM-04`, `TERM-10`, `AX-06`, `AX-07`, `AX-12`, `PH-05`, `PH-06`, `RT-02`, `RT-03`, `RT-07`, `RT-10` | Guided on `PAGE-06`, linked from `PAGE-03`; maps conditions, never a child/family profile; no totals, inferred profile, or required change |
| `EXP-08 — The Return` (`MVP-core`) | `IC-18`, `IC-26` → `TERM-09`, `AX-10`, `AX-11`, `AX-12`, `PH-08`, `RT-11` | `PAGE-06`; explicit `S7`, then `S8`; private/no-contact/repair paths; MVP 6.8–6.10; `E2E-07` |
| `EXP-09 — Ground Landing` (`MVP-core`) | `IC-08`, `IC-10`, `IC-16`, `IC-18`, `IC-26` → `TERM-02`, `TERM-09`, `AX-06`, `AX-11`, `AX-12`, `META-03`, `PH-05`, `PH-08`, `RT-10`, `RT-11` | Available from every pathway; explicit `S8`; refusal, low Lift, no Return, interruption, completion; MVP 6.4, 6.5, 6.8–6.10 |
| `EXP-10 — Borrowed Map, Living Compass` (`MVP-next`) | `IC-07`, `IC-17`, `IC-22` → `TERM-03`, `TERM-06`, `AX-04`, `AX-05`, `AX-10`, `PH-09`, `RT-12` | Guided on `PAGE-06`, linked from `PAGE-04`; inherited route can be kept, revised, refused, or left undecided without penalty |

---

## 8. Shared interaction grammar to canon

| MVP step | Canonical origin and guardrail | What the product must preserve |
|---|---|---|
| `S0 — Orientation` | `META-02`, `AX-12`, `PH-01`, `RT-02`, `RT-12` | purpose, output, limits, data request, no-AI/offline route, plain-language exit |
| `S1 — Voluntary consent` | `AX-03`, `AX-12`, `META-02`, `META-03` | decline without persuasion, loss threat, shame, or belonging test |
| `S2 — Call or situation note` | `TERM-07`, `AX-03`, `META-04`, `RT-06` | visitor-authored situation; blank, “not sure,” no Call, duty, or exit remain valid |
| `S3 — Compass and boundary` | `TERM-06`, `AX-04`, `AX-05`, `AX-07`, `AX-09`, `AX-10` | affected people, consent, duties, evidence, risk, limits, and human-held decisions |
| `S4 — Lift and proportion` | `TERM-04`, `TERM-02`, `AX-06`, `META-03`, `PH-05`, `RT-10` | real capacity; rest, help, smaller action, obligation only, or not now |
| `S5 — Making` | `TERM-05`, `AX-02`, `PH-04` | a visitor-owned, revisable form; generated/example material remains labelled |
| `S6 — Flight` | `TERM-01`, `AX-02`, `META-01`, `AX-12` | proportionate contact with reality, never a rank or identity |
| `S7 — Return` | `TERM-09`, `AX-10`, `AX-11`, `PH-08`, `RT-11` | effects, relation, repair, learning, privacy, silence, or absence of contact |
| `S8 — Ground` | `TERM-02`, `AX-06`, `AX-12`, `META-03`, `PH-05` | close, rest, care, repair, continue later, retire, or leave without a score |

---

## 9. Required MVP-state registry

The state numbers are those in `MVP_SPEC.md` §6. The original baseline required
all seven `MVP-core` experiences to implement the shared applicable states; the
local build applies that grammar to all ten guided experiences. Focused rows
below name the most direct experiences, not an exemption for the others.

| MVP state | Canonical basis | Required product consequence |
|---|---|---|
| **6.1 First visit** | `AX-01`, `AX-12`, `META-01`, `META-02`, `PH-01` | `PAGE-01` shows thesis before account or questionnaire; parent doorway first, adult dignity equal; speculative/non-diagnostic boundary visible; routes to `PAGE-07` and reading-only `PAGE-02` |
| **6.2 Returning visit** | `AX-12`, `META-04`, `PH-01`, `PH-09`, `RT-02` | assume no personal history and start a fresh session because the MVP keeps no saved reflection history; offer no resume, profile-clearing task, absence warning, streak, progress, or inferred journey |
| **6.3 Blank or uncertain answer** | `AX-03`, `AX-12`, `META-04`, `PH-01`, `RT-02`, `RT-06` | neutral example, “not sure,” safe skip, or exit; no completion in the visitor’s voice; direct in `EXP-02`, `EXP-06` |
| **6.4 Refusal** | `AX-03`, `AX-07`, `AX-12`, `META-03`, `RT-06`, `RT-07`, `RT-10` | no/not now/differently are final for invitations; parent contexts still distinguish safety and obligation; direct in `EXP-01`, `EXP-02`, `EXP-03`, `EXP-09` |
| **6.5 Insufficient Lift** | `TERM-04`, `TERM-02`, `AX-06`, `AX-12`, `META-03`, `PH-05`, `RT-10` | reduce, seek conditions/help, rest, do an obligation only, or stop; direct in `EXP-01`, `EXP-02`, `EXP-06`, `EXP-09`; never labelled failure |
| **6.6 AI unavailable or unwanted** | project-origin `IC-24`, `TERM-08`, `AX-09`, `AX-12`, `PH-07`, `RT-08`, `RT-09` | `PAGE-05` and `EXP-05` remain complete as a human planning protocol; no critical idea depends on a model response |
| **6.7 AI output drifts from direction** | `TERM-06`, `TERM-08`, `AX-04`, `AX-05`, `AX-09`, `PH-07`, `RT-08` | adopt/revise/reject/uncertain; return to human Call and Compass; no hidden prompt optimization or AI destination; `EXP-05`, `E2E-05` |
| **6.8 No Return yet** | `TERM-09`, `AX-11`, `AX-12`, `PH-08`, `RT-11` | safe contact, keep private, return later, or close; audience size is not Return; direct in `EXP-06`, `EXP-08`, `EXP-09` |
| **6.9 Error or interruption** | `AX-12`, `META-03`, `META-04`, `PH-01`, `RT-02` | plain retention/loss statement; retry, copy, Atlas, or leave; no silent transfer to another service; applicable to all ten guided experiences |
| **6.10 Completion** | `AX-12`, `META-01`, `META-03`, `PH-01`, `PH-03`, `PH-09`, `RT-02` | chosen stopping point, not a passed practice; visitor-authored or labelled example content only; optional copy, discard, another experience, reading, or leave |

---

## 10. Three complete audience paths

### 10.1. Parent path

`IC-19` + `IC-20` + `IC-25` → `TERM-10` + `AX-07` + `PH-06` +
`RT-07` → `PARENT_FOUNDATION.md` → Memorandum `Article 7` / `Статья 7` →
`PAGE-03` → `EXP-01` or `EXP-03` → `S3` → `S4` → adult-authored action or
honest refusal → `S7` Return → `S8` Ground.

Pass condition: the adult can use direct instruction honestly, leave a real
choice where one exists, and receive no score or diagnosis of parent or child.

### 10.2. Adult path

`IC-03` + `IC-10` + `IC-15` + `IC-18` + `IC-21` + `IC-22` →
`TERM-07`, `TERM-06`, `TERM-04`, `TERM-05`, `TERM-11`, `TERM-09` →
`AX-03`, `AX-05`, `AX-06`, `AX-08`, `AX-11` → `ADULT_FOUNDATION.md` →
Memorandum `Article 8` / `Статья 8` → `PAGE-04` → `EXP-02` or `EXP-06` →
`S2…S8`.

Pass condition: no Call, ordinary duty, insufficient Lift, help, rest,
private Return, and retirement of the attempt remain valid outcomes.

### 10.3. AI path

project-origin `IC-24` plus `IC-22` → `TERM-08` + `TERM-06` → `AX-09` +
`PH-07` + `RT-08` + `RT-09` → `AI_AS_WIND.md` → Memorandum `Article 9` /
`Статья 9` → `PAGE-05` → human-written Call and Compass → one bounded Wind
role or no-AI mode → adoption pass → `S7` Return → `S8` Ground.

Pass condition: the visitor may reject every generated option, retains the
starting notes, and never receives a machine-framed true purpose, identity, or
worth judgment.

---

## 11. Gaps, open decisions, and non-gates

| Item | Traceability treatment | Downstream consequence |
|---|---|---|
| `SRC-04-GAP`: headings `t70–t80` have no body text in the preserved archive | **gap only**; never evidence, never an invented Idea Card, term, axiom, or hypothesis | `PAGE-07` must disclose the archive limitation; `SC-14` may be narrowed only if a future source version restores inspectable text |
| Other empty rubrics and the unpaginated web edition | source limitation recorded in `SOURCE_MAP.md`; cite the nearest verified non-empty anchor, not an inferred chapter body | public provenance stays a link plus a transformation note, not a claim of exhaustive pagination |
| `UCP-01…UCP-08` | `user-check-pending`; optional scientific, empirical, comprehension, or editorial checks | none is a readiness gate for the speculative world; findings may revise `PH-*` or wording but do not retroactively prove the myth |
| `PH-01…PH-10` | project hypotheses, not promises of efficacy | product copy must not promise creative outcomes, therapeutic benefit, child-development results, or reliable AI effects |
| Future community (`PH-10`) | project-origin hypothesis outside the documentary MVP; no source fragment or `SOURCE_MAP` ID | no current page, experience, account, posting, group, initiation, or required public Return; any community proposal needs a separate goal and retains `META-02`, `AX-12`, and `RT-12` |
| `EXP-04`, `EXP-07`, `EXP-10` | `MVP-next` as original sequencing metadata; all three now have guided local state | remain visible and non-ranked on `PAGE-06`; comprehension review is still useful before public release but no longer blocks local guidance |
| MVP saving mode | fixed contract: no saved reflection history; answers exist only ephemerally in the active session, with explicit copy, print, export, or discard under visitor control | returning starts a fresh session; local draft persistence, accounts, synchronization, reflective-text analytics, and server-side profiles remain outside the MVP and require a new privacy decision and scope |
| Russian public Memorandum | open build/editorial decision | Russian is an integrated meaning source now; public bilingual delivery is not assumed |
| First-release experience count | local implementation includes all ten experiences | public-release sequencing remains an open author decision; no experience becomes a level or rank |
| Accessibility, user testing, and family safeguarding review | open review decisions for the local build | rendered-browser/design QA is not recorded as passed; no present efficacy or safety certification is implied |
| Live AI integration | open product/privacy decision | the complete no-AI route is already mandatory; integration requires separate value, privacy, dependency, and disclosure review |
| Domain choice | `availability-not-checked` in `NAMING_AND_DOMAIN_BRIEF.md` | no availability, trademark, registration, or publication claim exists in this goal |
| Translation and rights | source is linked and paraphrased under the attribution contract | full translation, republication, and rights clearance require a separate author decision and goal |

There are no pending Memorandum-integration gaps: all twelve English articles
and all twelve Russian articles are mapped in §5. Open items above concern the
current local build, research, publishing, or author choice; they do not
acquire a fictional source origin.

---

## 12. Verification contract

This traceability layer is complete when all of the following remain true:

1. `IC-01…IC-26`, `EXP-01…EXP-10`, `PAGE-01…PAGE-07`, `S0…S8`, and MVP
   states 6.1…6.10 each appear explicitly.
2. `Article 1…Article 12` and `Статья 1…Статья 12` each have a paired row.
3. Every source-derived registry row uses an existing `SOURCE_MAP` address;
   `IC-24` and the project-origin ethical chains have no source address.
4. The source gap is used only as a gap.
5. `TERM-*`, `STATE-*`, `AX-*`, `META-*`, `PH-*`, `RT-*`, `SC-*`, and
   `UCP-*` identifiers resolve to the Universe Bible or Hypothesis Ledger.
6. Product tiers match `INTERACTIVE_ATLAS.md`: seven `MVP-core` and three
   `MVP-next` experiences.
7. No chain turns source provenance into scientific proof, and no open
   decision is silently closed.

If a future edit changes an anchor, Idea Card decision, canonical identifier,
article, experience tier, page inventory, or required MVP state, the editor
must update the affected chain here in the same change.
