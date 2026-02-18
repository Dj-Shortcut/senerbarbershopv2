# Validator report

- **Date:** 2026-02-18
- **Rendered pages checked:** `/`, `/robots.txt`, `/sitemap.xml`
- **Tools used:**
  - `next build` (type/lint + production render checks)
  - `curl` against local `next start` output (`http://localhost:3005`)
  - `jsdom` quick structural checks (duplicate ids + heading order)
  - Playwright browser run for runtime console/hydration checks

## Issues found

1. **Hydration/runtime errors on home page** in production runtime (`Minified React error #425/#418/#423`) caused by date-dependent values rendered on server and client at different times.
2. **Schema location/shape mismatch with new requirement**: LocalBusiness schema lived in `lib/seo.ts` and used `openingHours` strings instead of `openingHoursSpecification`.
3. **SEO metadata gaps**: missing explicit `robots` metadata rules and `alternates.canonical`; OG image was using square icon rather than social ratio.
4. **Potential route duplication risk**: static `public/robots.txt` and `public/sitemap.xml` coexisted with `app/robots.ts` and `app/sitemap.ts`.

## What was fixed

- Updated `app/page.tsx` to remove server/client time mismatch by using a deterministic fallback date before hydration, then setting live time after mount.
- Added `lib/schema/localBusiness.ts` and moved JSON-LD generation there (`@type: BarberShop`, `openingHoursSpecification`, address/url/telephone/sameAs/geo).
- Updated `app/layout.tsx` metadata with:
  - `robots` rules
  - canonical via `alternates`
  - OG/Twitter image targeting `/og-image` with `1200x630`
  - JSON-LD render using new schema helper.
- Added `app/og-image.tsx` dynamic OG image endpoint sized for social previews.
- Removed duplicate static files `public/robots.txt` and `public/sitemap.xml` so metadata routes are the single source.
