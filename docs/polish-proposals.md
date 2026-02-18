# Polish Proposals — Next Incremental Pass

Context considered: latest merged opening-hours/status/SEO PR and current v2 codebase (`app/page.tsx`, `components/*`, `lib/*`, `app/layout.tsx`, `app/globals.css`).

## A) 12 new polish proposals (incremental, low-risk, non-duplicate)

### 1) Add a visible “Skip to content” link for keyboard users
**Why it improves UX:** Speeds up keyboard navigation and improves first-interaction accessibility without changing layout. It also signals polish and care for all visitors.  
**Effort:** S  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- **Components involved:** root layout + main content landmark
- **Pseudo-steps:**
  1. Add `<a href="#main-content">Ga naar inhoud</a>` as first focusable element in `layout.tsx`.
  2. Add `id="main-content"` to `<main>` in `page.tsx`.
  3. Style link in `globals.css` so it is visually hidden until `:focus-visible`.
**Acceptance criteria:**
- Tabbing from page start reveals a skip link.
- Activating skip link moves focus to main content.
- No visual change when not keyboard-focusing.

### 2) Add an always-available “Bel nu” quick action in sticky mobile CTA
**Why it improves UX:** When users are ready to act, calling is often faster than messaging. Adding a compact secondary action improves completion for urgent visits.  
**Effort:** S  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/page.tsx`, `app/globals.css`, `lib/config.ts`
- **Components involved:** sticky mobile CTA block
- **Pseudo-steps:**
  1. Extend sticky CTA to 3 actions on mobile: WhatsApp, Prijzen, Bel.
  2. Use existing `PHONE_E164` and `PHONE_DISPLAY` values.
  3. Keep spacing compact and visually balanced in dark glass style.
**Acceptance criteria:**
- On mobile sticky bar, a telephone link is present and tappable.
- CTA remains readable and not crowded on 360px width.
- Existing WhatsApp and Prijzen actions still work.

### 3) Improve active-state clarity for in-page anchor navigation
**Why it improves UX:** Users currently jump to sections but lack context after scrolling. A subtle active indicator makes page orientation feel premium and intentional.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/page.tsx`, `app/globals.css`
- **Components involved:** hero anchor buttons + section headings
- **Pseudo-steps:**
  1. Add a lightweight `IntersectionObserver` hook in `page.tsx` to track active section (`#prijzen`, `#gallery-heading`).
  2. Apply `data-active="true"` to corresponding hero anchor pill.
  3. Add subtle border/opacity differentiation in CSS.
**Acceptance criteria:**
- As user scrolls, the corresponding nav pill reflects active section.
- Reduced-motion users get same state update without animation.
- No scroll jank introduced.

### 4) Add subtle skeleton placeholders for gallery media before load
**Why it improves UX:** Replaces abrupt blank/flash transitions with a calm loading state, improving perceived performance and visual continuity.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `components/Gallery.tsx`, `app/globals.css`
- **Components involved:** featured video area + image cards
- **Pseudo-steps:**
  1. Add skeleton overlay while video/image media are not loaded.
  2. Fade out skeleton on `onLoadedData` / image load.
  3. Disable shimmer animation under `prefers-reduced-motion`.
**Acceptance criteria:**
- Gallery cards/video show polished placeholders before content is ready.
- Placeholder disappears cleanly when media finishes loading.
- No layout shift is introduced.

### 5) Add optimistic “Copied” state for phone number and address
**Why it improves UX:** Gives users a frictionless fallback when they prefer copy/paste into dialer/maps, especially on desktop. Micro-feedback feels refined.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `components/Footer.tsx`
- **Components involved:** footer contact links
- **Pseudo-steps:**
  1. Add small copy icon/button next to phone/address.
  2. Use `navigator.clipboard.writeText` with graceful fallback.
  3. Reuse existing short toast pattern (similar to `PricesList`) or inline “Gekopieerd”.
**Acceptance criteria:**
- User can copy phone/address with one click/tap.
- A short confirmation appears and auto-dismisses.
- Existing clickable tel/maps links still remain primary actions.

### 6) Add “last updated” microcopy for practical trust on hours/prices
**Why it improves UX:** Reinforces data freshness and reduces uncertainty around opening times and prices for first-time visitors.  
**Effort:** S  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/page.tsx`, `components/PricesList.tsx`, optional `lib/config.ts`
- **Components involved:** opening hours card + prices footer text
- **Pseudo-steps:**
  1. Add static content token (e.g., month/year) or build-time date.
  2. Show small text like “Laatst bijgewerkt: mei 2026”.
  3. Keep styling muted (`text-zinc-500`) and concise.
**Acceptance criteria:**
- Opening hours/prices areas include a subtle freshness cue.
- Copy is consistent and unobtrusive.
- No runtime dependence on client locale/timezone.

### 7) Refine typographic rhythm with a shared section spacing/heading token
**Why it improves UX:** Current sections are strong but hand-tuned. A small tokenized rhythm improves consistency and premium feel across all blocks.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/globals.css`, `app/page.tsx`, `components/Gallery.tsx`, `components/PricesList.tsx`, `components/Footer.tsx`
- **Components involved:** all section wrappers and headings
- **Pseudo-steps:**
  1. Define CSS custom properties/utilities for section vertical spacing and heading margin rhythm.
  2. Replace hardcoded `py-*`/`mt-*` values incrementally.
  3. Validate mobile/desktop balance at key breakpoints.
**Acceptance criteria:**
- Vertical spacing feels consistently paced across sections.
- Heading-to-subcopy spacing is visually uniform.
- No content gets cramped on small screens.

### 8) Add robust focus trapping + ESC behavior for any modal/sheet/lightbox surfaces
**Why it improves UX:** Existing overlay-style interactions feel better when keyboard and screen-reader behavior is complete and predictable.  
**Effort:** M  
**Risk:** Med  
**Implementation sketch:**
- **Files likely to touch:** likely overlay-related component(s) if present in repo branch history; otherwise add shared utility in `components/` and wire into future overlays.
- **Components involved:** sheet/modal/lightbox interaction layer
- **Pseudo-steps:**
  1. Add reusable focus-trap hook utility (`useFocusTrap`).
  2. Return focus to triggering control on close.
  3. Ensure ESC closes overlay and body scroll lock is cleaned up.
**Acceptance criteria:**
- Keyboard focus never escapes open overlay.
- ESC closes overlays reliably.
- Focus returns to opener when closed.

### 9) Add lightweight Web Vitals + CTA click analytics hooks
**Why it improves UX:** Indirectly improves UX by making polish measurable (drop-offs, CTA performance, CLS/LCP trends) with near-zero visual risk.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/layout.tsx` (or dedicated client analytics entry), `app/page.tsx`, optionally `lib/analytics.ts`
- **Components involved:** CTA links, section actions
- **Pseudo-steps:**
  1. Add tiny abstraction to emit events (`cta_whatsapp_click`, `cta_prices_click`, etc.).
  2. Hook click handlers on key CTAs.
  3. Add web-vitals capture (if analytics backend exists) without adding heavy SDK.
**Acceptance criteria:**
- CTA clicks emit structured event payloads.
- Web vitals can be captured/logged in production.
- No blocking scripts or layout shifts introduced.

### 10) Upgrade OG/Twitter sharing image strategy beyond icon fallback
**Why it improves UX:** Better social previews improve first impression and click-through when links are shared in WhatsApp/social channels.  
**Effort:** M  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `app/layout.tsx`, `public/assets/images/*`, optional dynamic `app/og-image.tsx`
- **Components involved:** metadata/open graph setup
- **Pseudo-steps:**
  1. Replace `/icon.svg` social image with a purpose-made wide preview (1200x630).
  2. Include business name + dark premium look.
  3. Keep alt/title/description aligned with existing SEO copy in `lib/seo.ts`.
**Acceptance criteria:**
- Social sharing surfaces show a branded wide preview image.
- Metadata remains valid and no broken image URLs occur.
- SEO description/title remain consistent.

### 11) Add explicit empty/error states for service and media data guards
**Why it improves UX:** Prevents “silent weirdness” if data changes (e.g., empty SERVICES/media arrays), giving clear graceful messaging instead of partial UI breakage.  
**Effort:** S  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `components/PricesList.tsx`, `components/Gallery.tsx`, `lib/services.ts`
- **Components involved:** prices grid + gallery grid
- **Pseudo-steps:**
  1. Add guards for missing/empty arrays.
  2. Render branded fallback cards with concise copy.
  3. Add small tests for empty states.
**Acceptance criteria:**
- Empty services/gallery arrays render intentional fallback copy.
- App does not crash or render blank sections.
- Test coverage includes these fallback paths.

### 12) Add image-level alt text refinement and semantic captions for gallery storytelling
**Why it improves UX:** Better descriptive text strengthens accessibility and perceived craftsmanship, especially for users relying on assistive tech.  
**Effort:** S  
**Risk:** Low  
**Implementation sketch:**
- **Files likely to touch:** `components/Gallery.tsx`
- **Components involved:** gallery image cards/video labels
- **Pseudo-steps:**
  1. Replace generic titles-only alts with concise, cut-specific Dutch alt text.
  2. Optionally add a visually subtle caption style for one-line context.
  3. Keep copy calm and premium (avoid hype wording).
**Acceptance criteria:**
- Every gallery media item has meaningful alt text.
- Captions (if shown) stay subtle and don’t clutter cards.
- No impact on layout integrity.

---

## B) Top 3 recommended picks

1. **Skeleton placeholders for gallery media (Proposal 4)**  
   **Why:** High perceived-quality impact on a media-heavy section with moderate effort and very low risk.

2. **OG/Twitter sharing image upgrade (Proposal 10)**  
   **Why:** High marketing/first-impression value for link sharing, with no runtime interaction risk.

3. **Section spacing/typography rhythm tokenization (Proposal 7)**  
   **Why:** Broad visual consistency uplift across the whole page; strong premium feel without feature creep.

---

## C) Implementation roadmap

### Quick win (≤1h): Proposal 1 — Skip to content
- Add skip link markup in `app/layout.tsx`.
- Add `id="main-content"` in `app/page.tsx`.
- Add focus-only visibility styling in `app/globals.css`.
- Keyboard test: Tab → Enter on skip link.

### Medium (half-day): Proposal 4 — Gallery skeleton loading polish
- Add load state flags for video/image placeholders in `components/Gallery.tsx`.
- Add skeleton class styles (and reduced-motion handling) in `app/globals.css`.
- QA on mobile/desktop for no layout shift and smooth transitions.

### Bigger (1–2 days): Proposal 7 — Global rhythm token pass
- Define spacing/heading rhythm tokens/utilities in `app/globals.css`.
- Migrate section wrappers/headings in `app/page.tsx`, `components/Gallery.tsx`, `components/PricesList.tsx`, `components/Footer.tsx`.
- Run visual QA across breakpoints and tune values.
- Add a short style note in `components/README.md` for future consistency.

---

## D) “Do NOT do” list (considered, rejected)

1. **Auto-playing background music or barber-shop ambient audio** — off-brand risk, intrusive, and often blocked/annoying.
2. **Heavy parallax / 3D scene effects** — can feel gimmicky, harms performance on mid-range phones.
3. **Aggressive neon/glow overhaul** — clashes with calm dark premium identity.
4. **Full dependency swap to a large animation framework** — unnecessary bundle cost for current motion needs.
5. **Pop-up discount gamification widgets** — conversion-style gimmick that conflicts with trust-first premium tone.

---

## PR-style summary comment
Added `docs/polish-proposals.md` with 12 concrete, low-risk polish ideas mapped to existing files/components, plus top-3 recommendations, a staged roadmap (quick/medium/bigger), and a rejected-ideas list to keep future changes on-brand.
