# senerbarbershop.v2 (workspace check)

## Repository/branch verificatie

Deze workspace staat op repository-map `senerbarbershop.v2` en branch `work`.

## Verwachte Next.js bestanden

Voor PR2 Task 2–3 hoort minimaal aanwezig te zijn:

- `app/page.tsx`
- `components/`
- `package.json`
- `next.config.*`

In deze repository ontbreken die paden momenteel. Deze map bevat alleen migratie-informatie (`MIGRATE_TO_V2.md`) en geen daadwerkelijke Next.js app-code.

## Voorkomen van mismatch

Gebruik voor refactorwerk altijd eerst deze check:

```bash
pwd
git rev-parse --abbrev-ref HEAD
ls app components package.json next.config.*
```

Als deze check faalt, open de juiste repository met de echte applicatiecode voordat je PR2-taken uitvoert.
