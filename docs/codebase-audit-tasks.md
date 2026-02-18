# Codebase audit — voorgestelde taken

## 1) Typfouttaak: corrigeer merk-casing in oude WhatsApp-referentie
- **Probleem:** in de legacy snippet-check staat `makeWhatsappUrl` met een kleine `a` in "App". Voor merkconsistentie hoort dit `WhatsApp` te zijn.
- **Locatie:** `scripts/verify-priceslist.mjs`.
- **Voorgestelde taak:** vervang de oude stringreferentie en bijhorende naming naar consistente `WhatsApp`-casing (bv. `makeWhatsAppUrl`) in de verificatiescript-context.
- **Definition of done:** alle merkvermeldingen in identifiers en UI-strings gebruiken dezelfde `WhatsApp`-casing.

## 2) Bugfix-taak: herstel verouderde verificaties in `verify-priceslist`
- **Probleem:** `scripts/verify-priceslist.mjs` valideert snippets in `app/page.tsx` die daar niet (meer) bestaan. De actuele prijslijstlogica zit in `components/PricesList.tsx`, waardoor de check fout-positieven kan geven.
- **Locatie:** `scripts/verify-priceslist.mjs`, `app/page.tsx`, `components/PricesList.tsx`.
- **Voorgestelde taak:** herschrijf het script zodat het de juiste bestanden en actuele patronen controleert (of maak een robuustere AST/DOM-gebaseerde validatie i.p.v. fragiele string-matches).
- **Definition of done:** script faalt alleen bij echte regressies in prijslijst/CTA-flow en slaagt op de huidige codebasis.

## 3) Documentatie-discrepantie-taak: checklist afstemmen op beschikbare npm scripts
- **Probleem:** `docs/CHECKLIST.md` vraagt `npm run typecheck`, maar in `package.json` bestaat geen `typecheck` script.
- **Locatie:** `docs/CHECKLIST.md`, `package.json`.
- **Voorgestelde taak:** kies één van beide:
  1. voeg effectief een `typecheck` script toe (`tsc --noEmit`), of
  2. pas de checklisttekst aan zodat die geen niet-bestaand script voorschrijft.
- **Definition of done:** documentatie en package scripts zijn 1-op-1 consistent.

## 4) Testverbetering-taak: breid status-tests uit met randgevallen
- **Probleem:** `lib/status.test.ts` dekt basis open/dicht scenario's, maar niet alle business-randgevallen (feestdagen en variabele sluituren zoals donderdag 20:00).
- **Locatie:** `lib/status.test.ts`, `lib/schedule.ts`, `lib/config.ts`.
- **Voorgestelde taak:** voeg tests toe voor:
  - feestdag-afhandeling (`HOLIDAYS_BY_YEAR`),
  - donderdagavond net voor/net na 20:00,
  - labelkwaliteit bij meerdere opeenvolgende sluitdagen.
- **Definition of done:** statussuite borgt de belangrijkste openingstijdenregels inclusief uitzonderingen.
