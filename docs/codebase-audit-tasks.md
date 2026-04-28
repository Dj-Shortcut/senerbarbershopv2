# Codebase audit - voorgestelde taken

## 1) Testverbetering-taak: breid status-tests uit met randgevallen
- **Probleem:** `lib/status.test.ts` dekt basis open/dicht scenario's, maar niet alle business-randgevallen (feestdagen en variabele sluituren zoals donderdag 20:00).
- **Locatie:** `lib/status.test.ts`, `lib/schedule.ts`, `lib/config.ts`.
- **Voorgestelde taak:** voeg tests toe voor:
  - feestdag-afhandeling (`HOLIDAYS_BY_YEAR`),
  - donderdagavond net voor/net na 20:00,
  - labelkwaliteit bij meerdere opeenvolgende sluitdagen.
- **Definition of done:** statussuite borgt de belangrijkste openingstijdenregels inclusief uitzonderingen.
