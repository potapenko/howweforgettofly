# Language selection retains the reading location

Spec: `docs/specs/features/continuous-bilingual-reading.md`, revision 4,
Ten-language extension; `editorial-independence-and-colophon.md`, revision 7.

Interpretation: ten authored editions share semantic chapter locations. The
language menu changes words and direction while keeping the visitor's place.

Preconditions: local or production build; Safari desktop and Responsive Design
Mode at 390×844, plus Chrome or the in-app browser. Open a direct `/ar/` URL.

1. Open `/ar/#parents-family-cycle` and wait for anchor alignment. Observe the
   new car-and-tunnel family passage, persistent header and RTL reading direction.
   Scroll slightly into its body so the reading line is inside that section.
2. Open the mobile header if needed, then open the native language selector.
   All ten names must be reachable without horizontal clipping. Desktop uses
   a dropdown; the mobile menu remains scrollable within the viewport.
3. Choose 한국어. Expect `/ko/#parents-family-cycle`, a closed menu, Korean text,
   LTR direction and the corresponding passage at the same reading position.
   Paper artwork retains its physical orientation.
4. Open the selector with the keyboard, Tab to a language and press Escape.
   The list closes and focus returns to its summary.
5. Select English, then reload. The root continues to show English. Select
   العربية and visit `/`: the saved choice selects `/ar/`. A direct `/ru/`
   still opens Russian. Test Back/Forward across manual selections as well.
6. Verify the selected edition's document language, canonical URL, description,
   social metadata and ten reciprocal language links after switching.

Expected: no lost chapter, mixed-language controls, trapped focus, mirrored art,
forms or new data entry. The complete accepted creative edition appears in every language, in the same
opening → Manifesto → creative mechanism → dinner product → adult life → AI →
Parents → Atlas → Final Sky order. Russian matches the accepted manuscript. Japanese, Chinese and
Korean headings fit their reading surfaces; Arabic text is readable in RTL.

Check uncaught console errors, failed document/script/style/font requests and
broken visible images after the flow. Static HTML heads are separately checked
by the production build verifier; blocked-storage behavior is covered by the
focused integration tests.
