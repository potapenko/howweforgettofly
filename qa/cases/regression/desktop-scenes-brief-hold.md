# Desktop illustrations briefly hold while animation follows the whole passage

- Priority: P1
- Status: VERIFIED
- Spec reference: `docs/specs/features/illustrated-story-and-motion.md`, revision 7, Brief desktop hold
- Implementation: `src/hooks/stickyStoryScheduler.ts`; `src/story/parallax-stage.css`; `src/components/HomeStory.tsx`

## Functional interpretation

Large illustrations animate while entering and leaving the viewport. Their
only sticky interval is 120–180 CSS pixels of native scroll, including the
cover and final scene. Pointer and ambient motion remain usable when a reader
pauses. Mobile retains its existing normal-flow playback.

## Preconditions

- Local site at `http://127.0.0.1:5173`, motion enabled, desktop width >900px.
- Start at `/ru/#top`, with no pending anchor restoration or page load.
- Use 1440×1000 for the numeric check; repeat representative scrolling in
  native Safari and Chrome. Use Safari Responsive Design Mode and the in-app
  browser at 390×844 for mobile regression.

## Steps and expected results

1. At the top, the cover progress is 0. All `.parallax-story` sections are
   their `.parallax-story__sticky` frame height plus 150px at this viewport.
   At other desktop heights the difference stays within 120–180px.
2. Scroll 100px and then 200px. The cover first holds, then its frame moves up;
   its layers keep advancing and the introduction becomes reachable immediately.
3. Visit `#M01`, scroll upward until the illustration is entering, then forward
   through it. Progress must already advance before sticky top is reached,
   continue across the short hold, and advance after the frame starts leaving.
4. At `#scene-ai-03-illustration`, start with its frame aligned below the header.
   Scroll 100px: it still holds. Scroll another 100px: it has left that position.
   Progress changes modestly across the hold, rather than running 0→1 in it.
5. Continue 300px, then reverse 500px. The original scroll position, progress
   and scroll-layer pose return. Move the cursor across the image without
   scrolling: depth changes, progress stays put, ambient movement continues.
6. Repeat a 220px departure at `#page-07-illustration`: the final frame must
   also leave its sticky position, with no longer ending hold.
7. Enable Quiet. Every stage has zero additional hold distance, settled motion
   and readable prose. Restore motion; the brief interval returns. Reduced
   motion uses the same settled/no-hold branch.
8. On mobile, verify inline layout, relative frames and no horizontal overflow.
   Scroll forward/reverse through a scene while it enters. Its authored motion
   plays and the adjacent text moves normally. Some authored focal poses equal
   1 (candidate-map); they reach their last beat near centre by existing design.
9. Check the shared maximum of two hydrated packs, no uncaught console errors,
   no failed core network requests, no broken visible images or framework overlay.

## Verification scope

2026-09-10: numeric geometry and interaction in the in-app browser; desktop
forward/reverse checks in Safari and Chrome; mobile flow in the in-app browser
and Safari 390×844. Console/network inspection was in the in-app browser.
Native browser evidence is visual/interaction evidence, not a separate console
or physical-device audit. See `docs/product/SCENE_SCROLL_PACING_PLAN.md`.
