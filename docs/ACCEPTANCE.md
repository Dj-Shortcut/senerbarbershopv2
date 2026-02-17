# Acceptatiecriteria — non-regression

## 1) WhatsApp flow
- Klik op elke WhatsApp CTA opent dezelfde bestemming als voorheen (nummer + default berichtformat).
- Deep-link werkt op mobile (WhatsApp app) en desktop (web fallback), zonder runtime errors.
- CTA blijft zichtbaar en klikbaar op alle relevante breakpoints.

## 2) Status badge
- Statusbadge blijft zichtbaar op de verwachte pagina/sectie.
- Bestaande statuslogica en labeltekst blijven ongewijzigd.
- Badge heeft voldoende contrast in dark mode en blijft leesbaar op mobile.

## 3) Prijzen
- Alle prijzen en service-namen blijven exact gelijk aan huidige productiecontent.
- Geen herordening of ontbrekende prijsregels tenzij expliciet gespecificeerd.
- Valutaformattering blijft identiek aan huidige implementatie.

## 4) Routes
- Bestaande publieke routes blijven bereikbaar (geen 404 regressies).
- Navigatie-links verwijzen nog steeds naar dezelfde routepaden.
- Eventuele CTA’s met route-targets behouden hun oorspronkelijke bestemming.

## 5) Stylingdoel (dark-only premium)
- UI gebruikt uitsluitend dark thema (geen light fallback zichtbaar voor gebruikers).
- Gold accent alleen als highlight/CTA, niet als dominante achtergrondkleur.
- Tekst/achtergrond contrast voldoet minimaal aan gangbare toegankelijkheidsverwachting (AA-richting).

## 6) Definition of Done
- Alle non-regression checks hierboven zijn groen.
- Build en lint slagen.
- Quick visual QA uitgevoerd op minimaal 1 mobile en 1 desktop viewport.
