# Browser case index

There are no authored browser cases yet. Add one only after reading the active
spec it proves and validating the behavior in a real browser.

| Active spec | Initial browser-QA focus | Recommended tier |
| --- | --- | --- |
| `continuous-bilingual-reading.md` | EN/RU roots, canonical anchors, locale continuity, header/menu, skip link, no-form surface | smoke |
| `editorial-independence-and-colophon.md` | final-scene order and one non-interactive colophon with no public source traces elsewhere | regression |
| `illustrated-story-and-motion.md` | desktop/mobile scene handoff, Quiet and reduced-motion behavior, hydration/fallback coherence | smoke or regression |

Use `smoke/` for stable critical reader paths, `regression/` for verified
failures or high-risk boundaries, and `experimental/` for exploration that is
not yet a stable promise.
