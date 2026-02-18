# Polish Execution Backlog

This backlog converts `docs/polish-proposals.md` into an implementation-ready plan with small, reviewable changes.

## Sprint 1 — Accessibility and content resilience (small PRs)

### Item 1.1 — Skip-to-content link (Proposal 1)
- **Scope**
  - Add a keyboard-first skip link so users can jump directly to the main page content.
- **Files**
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
- **Steps**
  1. Insert a skip link as the first focusable element in `<body>`.
  2. Add a stable target (`id="main-content"`) to homepage `<main>`.
  3. Add CSS to hide link visually until focused and keep dark premium styling.
- **Acceptance criteria**
  - Tabbing from top reveals the skip link.
  - Enter on link moves focus/navigation to main content.
  - No visible UI change in pointer-only flow.
- **QA checklist**
  - Keyboard-only pass (`Tab`, `Shift+Tab`, `Enter`) on desktop.
  - Verify no overlap artifacts in mobile viewport.
  - Confirm `prefers-reduced-motion` has no negative impact.
- **Risk notes**
  - Very low risk; only concern is incorrect focus target/id mismatch.

### Item 1.2 — Empty/error states for prices/gallery + tests (Proposal 11)
- **Scope**
  - Ensure empty service/media data renders graceful fallback states instead of blank/partial UI.
- **Files**
  - `components/PricesList.tsx`
  - `components/Gallery.tsx`
  - `components/PricesList.test.tsx`
  - `components/Gallery.test.tsx` (new)
- **Steps**
  1. Add guard clauses for empty `SERVICES` or missing section-mapped services.
  2. Add guard for empty gallery items.
  3. Keep fallback copy concise and on-brand.
  4. Add tests for empty-state rendering and non-crash behavior.
- **Acceptance criteria**
  - Prices section shows clear message when no services exist.
  - Gallery shows clear message when no image items exist.
  - Existing normal-state rendering remains unchanged.
  - New tests pass.
- **QA checklist**
  - Run unit tests (`npm run test`).
  - Manual check that normal demo content still appears.
  - Verify fallback cards inherit existing dark styling.
- **Risk notes**
  - Low risk; main risk is over-broad fallback condition hiding valid partial data.

### Item 1.3 — Gallery alt text refinement (+ optional subtle captions) (Proposal 12)
- **Scope**
  - Improve semantic/accessible descriptions for gallery visuals.
- **Files**
  - `components/Gallery.tsx`
  - `components/Gallery.test.tsx`
- **Steps**
  1. Replace generic alt text values with concise Dutch descriptive strings.
  2. Optionally add subtle, non-intrusive caption line in overlay.
  3. Keep card layout and motion unchanged.
  4. Add tests asserting improved alt text render.
- **Acceptance criteria**
  - Each image has meaningful, non-generic alt text.
  - Captions (if included) stay visually subtle.
  - No layout regression in grid.
- **QA checklist**
  - Screen reader smoke check in browser accessibility tree.
  - Verify text truncation still behaves in narrow columns.
  - Confirm hover behavior remains intact.
- **Risk notes**
  - Low risk; risk is overly verbose alt text hurting readability.

---

## Sprint 2 — Perceived quality and consistency

### Item 2.1 — Gallery skeleton placeholders (Proposal 4)
- **Scope**
  - Add subtle placeholders for media loading to improve perceived performance.
- **Files**
  - `components/Gallery.tsx`
  - `app/globals.css`
- **Steps**
  1. Add loading state and placeholder overlays for video/image slots.
  2. Fade placeholders out on media load.
  3. Disable shimmer/extra motion for reduced-motion users.
- **Acceptance criteria**
  - Placeholders visible pre-load and cleanly removed post-load.
  - No layout shift.
- **QA checklist**
  - Test on throttled network in DevTools.
  - Check reduced-motion fallback.
- **Risk notes**
  - Low risk; ensure CSS animation doesn’t introduce jank.

### Item 2.2 — Section spacing and heading rhythm tokens (Proposal 7)
- **Scope**
  - Normalize section vertical rhythm and heading spacing via shared tokens/utilities.
- **Files**
  - `app/globals.css`
  - `app/page.tsx`
  - `components/Gallery.tsx`
  - `components/PricesList.tsx`
  - `components/Footer.tsx`
- **Steps**
  1. Create spacing/heading utility classes or CSS vars.
  2. Replace hand-tuned spacing values incrementally.
  3. Verify rhythm at mobile/tablet/desktop breakpoints.
- **Acceptance criteria**
  - Visual pacing between sections is consistent.
  - No crowded/over-spaced regions.
- **QA checklist**
  - Compare screenshots at 360px, 768px, 1280px.
  - Ensure content remains within existing max-width containers.
- **Risk notes**
  - Medium risk due to broad visual touchpoints.

### Item 2.3 — Social preview image upgrade (Proposal 10)
- **Scope**
  - Replace icon-only social cards with dedicated OG/Twitter artwork.
- **Files**
  - `app/layout.tsx`
  - `public/assets/images/og-cover.*` (new)
  - optional `app/og-image.tsx`
- **Steps**
  1. Add 1200x630 share image asset.
  2. Wire metadata images to new asset.
  3. Validate links and cache behavior.
- **Acceptance criteria**
  - Open Graph/Twitter cards use correct branded image.
  - No broken metadata URLs.
- **QA checklist**
  - Run metadata validation and manual social debugger checks.
  - Confirm production URL paths resolve.
- **Risk notes**
  - Low risk; asset optimization and cache invalidation are key.

---

## Sprint 3 — Conversion polish and instrumentation

### Item 3.1 — Sticky mobile CTA add “Bel nu” quick action (Proposal 2)
- **Scope**
  - Add a third compact CTA for direct phone calls on mobile sticky bar.
- **Files**
  - `app/page.tsx`
  - `app/globals.css`
- **Steps**
  1. Add tel link button in sticky CTA.
  2. Rebalance 3-button layout for narrow screens.
  3. Ensure touch targets remain accessible.
- **Acceptance criteria**
  - 3 CTAs remain readable and tappable at 360px.
  - Existing CTA behavior unchanged.
- **QA checklist**
  - Touch target audit (min 44px).
  - iOS/Android visual smoke check.
- **Risk notes**
  - Low risk; main issue is cramped layout on very small screens.

### Item 3.2 — Footer copy-to-clipboard feedback (Proposal 5)
- **Scope**
  - Add copy actions for phone and address with subtle feedback.
- **Files**
  - `components/Footer.tsx`
  - optional `app/globals.css`
- **Steps**
  1. Add copy controls near phone/address entries.
  2. Use clipboard API with graceful fallback.
  3. Show short confirmation state.
- **Acceptance criteria**
  - Copy works for both fields and confirms success.
  - Primary tel/maps links remain unaffected.
- **QA checklist**
  - Test in secure-context browser.
  - Verify fallback behavior when clipboard API unavailable.
- **Risk notes**
  - Low risk; clipboard permissions may vary by browser.

### Item 3.3 — Lightweight analytics hooks + web vitals (Proposal 9)
- **Scope**
  - Instrument key CTA interactions and basic vitals for measurable UX impact.
- **Files**
  - `lib/analytics.ts` (new)
  - `app/layout.tsx` or app-level client entry
  - `app/page.tsx`
- **Steps**
  1. Create minimal event emitter abstraction.
  2. Attach events to hero/sticky CTAs.
  3. Add web-vitals collector integration if backend is present.
- **Acceptance criteria**
  - CTA events fire with stable names/payloads.
  - No blocking script/load regressions.
- **QA checklist**
  - Confirm events in browser/network console.
  - Check CLS/LCP instrumentation presence.
- **Risk notes**
  - Medium risk due to analytics environment variance and privacy configuration.
