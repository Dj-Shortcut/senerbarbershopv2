# The Sener Barber (Next.js v2)

Moderne website voor **The Sener Barber** in Ninove, gebouwd met Next.js App Router, TypeScript en Tailwind CSS.

## Features
- Hero + service-overzicht met snelle WhatsApp CTA.
- Openingstijden met live open/gesloten status.
- Galerij met beelden/video.
- Interactieve prijslijst met duidelijke service-categorieën.
- Lokale SEO met metadata, Open Graph, Twitter cards en structured data.
- Sitemap en robots endpoints via App Router.
- Basis testdekking (statuslogica + prijslijst rendering).

## Tech stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + Testing Library
- **CI:** GitHub Actions

## Vereisten
- Node.js 18+
- npm 9+

## Lokale setup
```bash
git clone <repo-url>
cd senerbarbershopv2
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Scripts
- `npm run dev` – start development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run Next.js lint
- `npm run test` – run Vitest
- `npm run test:watch` – run Vitest in watch mode
- `npm run test:ui` – run Vitest UI

## Environment variables
Maak een `.env.local` bestand met minstens:

```bash
NEXT_PUBLIC_SITE_URL=https://www.thesenerbarber.be
NEXT_PUBLIC_WHATSAPP_NUMBER=+32488383871
NEXT_PUBLIC_PHONE_E164=+32488383871
```

Opmerking:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` wordt gebruikt voor WhatsApp links.
- Zonder env var valt de app terug op een veilige standaardwaarde.

## Live demo
- Productie: https://www.thesenerbarber.be

## CI
Bij elke push/PR draait de workflow:
1. lint
2. test
3. build

## TODO
- Eventuele screenshots/documentatie-links kunnen hier worden toegevoegd (text-only policy behouden).
