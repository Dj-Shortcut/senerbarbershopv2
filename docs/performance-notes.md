# Performance notes (mobile)

_Date: 2026-05-06_

## Scope of optimizations

- Homepage moved back to server rendering with isolated client-only sticky CTA.
- Gallery video behavior changed to poster-first on mobile and less aggressive playback.
- Immutable cache headers added for image/video/icon assets.
- Mobile blur/shadow effects reduced.

## Before/after tracking template

Collect from production Lighthouse/PageSpeed runs (mobile):

- LCP: before ___ / after ___
- INP: before ___ / after ___
- CLS: before ___ / after ___
- Total JS (transferred): before ___ / after ___
- Asset cache status (`Cache-Control` for `/assets/images/*` and `/assets/video/*`): before ___ / after ___

## Notes

- Verify sticky CTA visibility behavior on <=640px viewport.
- Verify gallery: mobile requires user intent to play, desktop/tablet autoplay still allowed.
- Verify video pauses when gallery is out of view.
