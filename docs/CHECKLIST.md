# Dev & QA checklist

## 1) Setup en development
- [ ] Dependencies installeren:
  - `npm install`
- [ ] Development server starten:
  - `npm run dev`

## 2) Kwaliteitschecks
- [ ] Lint:
  - `npm run lint`
- [ ] Typecheck:
  - `npm run typecheck`
- [ ] Productiebuild:
  - `npm run build`

## 3) Functionele non-regression checks
- [ ] WhatsApp CTA werkt en opent correcte target.
- [ ] Status badge is zichtbaar en toont correcte status.
- [ ] Prijzen en servicelabels komen exact overeen met baseline.
- [ ] Belangrijke routes laden zonder fouten (geen 404 regressie).

## 4) Quick visual QA
- [ ] **Mobile (360–390px):** above-the-fold primaire CTA direct zichtbaar zonder scroll.
- [ ] **Mobile:** status badge is zichtbaar en leesbaar.
- [ ] **Mobile:** WhatsApp CTA is zichtbaar, heeft voldoende contrast en werkt bij klik.
- [ ] **Desktop (>=1280px):** premium dark styling consistent in hero, pricing en CTA’s.
- [ ] Gold accent usage is subtiel en consistent (geen overmatig gebruik).

## 5) Focus states (toegankelijkheid)
- Stap:
  1. Navigeer met `Tab` door interactieve elementen (header, knoppen, links, formulier-inputs).
  2. Controleer focus-ring op lichte en donkere achtergronden.
  3. Controleer `:focus-visible` gedrag met toetsenbord versus muis.
- Verwachte uitkomst:
  - Elk interactief element heeft een duidelijke zichtbare focus-state.
  - Geen elementen met verwijderde outline zonder toegankelijke vervanging.

## 6) Perf sanity checks
- Scroll smoothness
  - Stap:
    1. Scroll door hero, facts, gallery en prijzen op desktop en mobiel viewport.
    2. Let op frame drops/stotteren tijdens reveal animaties.
  - Verwachte uitkomst:
    - Scroll voelt vloeiend; reveal gebruikt alleen `transform` + `opacity`.
- Reduced-motion
  - Stap:
    1. Zet OS/browser instelling op `prefers-reduced-motion: reduce`.
    2. Herlaad de homepage.
  - Verwachte uitkomst:
    - Reveal content is direct zichtbaar zonder animatie.
- Hydration/observer gedrag
  - Stap:
    1. Open DevTools Console en herlaad pagina.
    2. Scroll langzaam zodat elementen de viewport binnenkomen.
  - Verwachte uitkomst:
    - Geen hydration warnings.
    - Geen errors rond `IntersectionObserver` of observer cleanup.
