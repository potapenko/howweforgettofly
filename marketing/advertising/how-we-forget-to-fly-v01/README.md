# How We Forget to Fly — v01

**Status: draft; creative package complete.** The user selected all three English concepts for localization on 2026-09-10. This standalone set contains the approved v01 design in ten languages, generated through the built-in ImageGen tool and verified for handoff.

## Product and selected concept

How We Forget to Fly is a bilingual illustrated online book about creativity, human authorship, parenting and AI as Wind. It is a continuous reading experience for adults and parents. The advertisement invites readers into that work without promises of results or additional PlayPhrase.me access.

v01: the title and living paper-book world lead.

The complete brand stays **How We Forget to Fly** in every language. The English PNG is copied unchanged from the approved concept. Original concepts and their generation history remain in [the shared source folder](../how-we-forget-to-fly/).

## Files

- [campaign.json](campaign.json): exactly one campaign object, not a global configuration.
- [copy.json](copy.json): exact in-image copy and localized alternative text keyed by file locale.
- [prompts.md](prompts.md): exact ImageGen localization prompts and reference role.
- [assets/](assets/): ten final language files; the same file serves mobile and desktop.

| Language | PNG | Landing edition |
| --- | --- | --- |
| English | [how-we-forget-to-fly-v01-square-en.png](assets/how-we-forget-to-fly-v01-square-en.png) | English |
| Русский | [how-we-forget-to-fly-v01-square-ru.png](assets/how-we-forget-to-fly-v01-square-ru.png) | Russian |
| Español | [how-we-forget-to-fly-v01-square-es.png](assets/how-we-forget-to-fly-v01-square-es.png) | English |
| Deutsch | [how-we-forget-to-fly-v01-square-de.png](assets/how-we-forget-to-fly-v01-square-de.png) | English |
| Français | [how-we-forget-to-fly-v01-square-fr.png](assets/how-we-forget-to-fly-v01-square-fr.png) | English |
| Português — Brasil | [how-we-forget-to-fly-v01-square-pt-br.png](assets/how-we-forget-to-fly-v01-square-pt-br.png) | English |
| 日本語 | [how-we-forget-to-fly-v01-square-ja.png](assets/how-we-forget-to-fly-v01-square-ja.png) | English |
| 简体中文 | [how-we-forget-to-fly-v01-square-zh-hans.png](assets/how-we-forget-to-fly-v01-square-zh-hans.png) | English |
| 한국어 | [how-we-forget-to-fly-v01-square-ko.png](assets/how-we-forget-to-fly-v01-square-ko.png) | English |
| العربية | [how-we-forget-to-fly-v01-square-ar.png](assets/how-we-forget-to-fly-v01-square-ar.png) | English |

## Destinations and receiving paths

- [English landing](https://howweforgettofly.com/): EN banners and all languages other than RU.
- [Russian landing](https://howweforgettofly.com/ru/): RU banners.
- Both HTTPS destinations return 200. Russian static HTML declares lang=ru and its canonical URL; the public sitemap and project contract expose only EN and RU. No other language routes are invented.
- Campaign ID and creative-set-id: `how-we-forget-to-fly-v01`.
- Shared project-id for all three sets: `how-we-forget-to-fly`. This preserves product-level rotation and click suppression while distinguishing concepts.
- creative-revision: `1`; priority: 0; weight: 1; daily-cap: 3; placements: search and reels.
- The receiving site's locale `pt` maps to file `pt-br`; `zh` maps to `zh-hans`.
- Future site paths are `/advertising/how-we-forget-to-fly-v01/how-we-forget-to-fly-v01-square-<file-locale>.png`. They are deployment destinations, not currently published URLs.

## Proposed period — approval required before publication

Start inclusive: **2026-09-10 00:00:00 UTC** (`1788998400000`).
End exclusive: **2027-09-10 00:00:00 UTC** (`1820534400000`).

This one-year draft period was chosen from the preparation date because no period was supplied. The operator must approve or replace it before publication. Status remains `draft`.

## Validation and handoff boundary

The receiving system's actual `playphraseme.advertising.policy/campaign?`, `variant?` and `configuration` functions accepted all three campaign objects and every locale. Validation loaded that pure namespace directly in a temporary Clojure process; no receiving server or database ran, and no receiving configuration was edited.

All ten PNGs are **1254 × 1254 pixels**. Each delivered file was byte-compared with its approved English concept or localized ImageGen output: no cropping, resizing, optimization or re-encoding occurred. File inventories, JSON, locale keys, destination paths and alternative-text mappings match exactly.

Every PNG was inspected individually against its exact copy and the approved English composition. All ten locales were also viewed at **300 × 300 CSS px in the in-app Browser and Safari**, with a temporary 32px close circle inset 12px. Text remains readable and the upper-right 20% by 20% stays clear of important content. Arabic direction and letter connections, CJK characters and line breaks were visually checked. No close icon, timer, popup shell or footer is embedded in the artwork.

This verifies static creatives at the intended small display size, not a physical-phone session or the receiving ad-to-paywall flow. No app code changed; code test suites were not run.

No native-speaker review is claimed. The receiving operator still owns copying assets, merging the draft campaign object into the central configuration, any publication approval, and verification of deployed media URLs and the real ad-to-paywall flow. This task does not enable advertising or deploy either project.
