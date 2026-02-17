# Implementatieplan — dark-only premium styling

## Doel
De huidige barbershop-ervaring krijgt een **dark-only premium look-and-feel** zonder regressies in kernfunctionaliteit (boekingen via WhatsApp, statusbadge, prijzen en routes).

## Scope en aanpak

### 1) Te wijzigen bestaande files
- `src/app/layout.tsx` (of equivalent root layout)
  - Forceer dark theme class op `<html>`/`<body>`.
  - Verwijder of neutraliseer light-mode toggles/overrides.
- `src/app/globals.css` (of centrale stylesheet)
  - Definieer premium dark variabelen (achtergrond, text, borders, accent).
  - Update basis typografie, spacing en elevation tokens.
- `src/components/Hero*` (hero/banner component)
  - Above-the-fold CTA visueel prominenter maken op mobile.
  - Contrast en hiërarchie verbeteren voor premium uitstraling.
- `src/components/StatusBadge*`
  - Houd statusbadge functioneel identiek, update alleen dark styling.
- `src/components/Pricing*`
  - Prijsweergave behouden; enkel kaart/background/border styling upgraden.
- `src/components/WhatsAppCTA*`
  - Behoud huidige click/redirect flow; alleen visuele premium dark update.
- `tailwind.config.*` (indien aanwezig)
  - Voeg design tokens toe als theme extension (colors, shadows, radius).

> 
> Exacte padnamen kunnen per implementatie verschillen; tijdens uitvoering worden bestaande componentlocaties gemapt op bovenstaande functionele blokken.

### 2) Nieuwe files
- `src/styles/tokens.css`
  - Centrale design tokens voor dark premium thema.
- `src/components/ui/PremiumCard.tsx`
  - Herbruikbare container met dark glass/surface stijl.
- `src/components/ui/PremiumButton.tsx`
  - Variant voor primaire CTA (incl. WhatsApp CTA state classes).

## Design tokens en utility classes

### Color tokens (dark-only)
- `--bg-base: #0B0B0C`
- `--bg-elevated: #111214`
- `--bg-card: #15171A`
- `--text-primary: #F5F7FA`
- `--text-secondary: #B7BDC7`
- `--accent-gold: #C9A45C`
- `--accent-gold-hover: #D8B672`
- `--success: #25D366` (WhatsApp context)
- `--border-subtle: rgba(255,255,255,0.12)`

### Typography / spacing / radius
- `--font-display: "Playfair Display", serif`
- `--font-body: "Inter", sans-serif`
- `--space-section-y: clamp(56px, 8vw, 104px)`
- `--radius-card: 18px`
- `--radius-pill: 999px`

### Shadow / glow
- `--shadow-soft: 0 8px 30px rgba(0,0,0,0.35)`
- `--shadow-gold: 0 0 0 1px rgba(201,164,92,0.32), 0 12px 32px rgba(201,164,92,0.18)`

### Utility classes (voor consistent hergebruik)
- `.premium-surface`
- `.premium-border`
- `.premium-heading`
- `.premium-muted`
- `.premium-cta`
- `.premium-cta--whatsapp`
- `.premium-status-badge`

## Implementatiestappen
1. Voeg tokens toe in `tokens.css` en importeer globaal.
2. Migrate basislayout naar dark-only (verwijder light conditionals).
3. Pas Hero en primary CTA styling aan voor mobile-first prominence.
4. Style statusbadge en pricing cards met nieuwe premium classes.
5. Refactor WhatsApp CTA naar `PremiumButton` variant zonder flow-wijziging.
6. Voer non-regression checks uit op routes, prijzen, statusbadge en WhatsApp.
7. Controleer visueel op mobile en desktop breakpoints.

## Risico’s + mitigatie
- **Risico:** contrastverlies op kleine schermen.
  - **Mitigatie:** QA op 360px/390px viewport met focus op CTA/tekst.
- **Risico:** onbedoelde functionele regressie in CTA links.
  - **Mitigatie:** expliciete click-through test voor WhatsApp deep-link.
- **Risico:** inconsistentie tussen componenten.
  - **Mitigatie:** afdwingen via gedeelde utility classes en tokens.
