# Accessibility checklist (WCAG-lite)

Date: 2026-02-18

## Verified

- [x] **Accessible names on interactive controls**
  - CTA links, gallery controls, and footer links expose visible text and/or `aria-label`.
- [x] **Focus visibility**
  - Global focus-visible styling is present for interactive controls; skip-link is keyboard reachable.
- [x] **Heading structure**
  - One `h1` on home; section content follows with `h2`/`h3` in descending structure.
- [x] **Reduced motion respected**
  - Existing `prefers-reduced-motion` handling in reveal, gallery carousel, and sticky CTA remains intact.
- [x] **Modal/dialog requirements**
  - No modal/sheet/lightbox dialogs currently present.
- [x] **Contrast sanity check**
  - Primary text (`text-zinc-100/300`) over dark backgrounds remains readable.

## Automated checks used

- `npm run check:a11y` (lint-based accessibility sanity, no heavy dependencies)
- Playwright runtime check for console/page errors after hydration

## Notes

- Fixed a hydration mismatch that can affect accessibility tooling reliability by ensuring deterministic initial date values before client hydration.
