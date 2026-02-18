import { readFileSync } from 'node:fs';

const pageSource = readFileSync('app/page.tsx', 'utf8');
const servicesSource = readFileSync('lib/services.ts', 'utf8');

const requiredSnippets = [
  'Check drukte',
  'aria-label="Check drukte via WhatsApp"',
  'createDrukteWhatsAppUrl(getServiceLabel(selectedService))',
  'className="sticky-mobile-cta sm:hidden"',
];

const missing = requiredSnippets.filter((snippet) => !pageSource.includes(snippet));
if (missing.length) {
  console.error('PricesList verificatie gefaald; ontbrekende snippets:');
  missing.forEach((snippet) => console.error(`- ${snippet}`));
  process.exit(1);
}

const serviceEntries = [...servicesSource.matchAll(/id: "([^"]+)",[\s\S]*?price: "([^"]+)"/g)].map((m) => [m[1], m[2]]);

const PREVIOUS_RELEASE_PRICES = {
  knippen: '€20',
  'knippen-baard': '€30',
  tondeuse: '€15',
  baard: '€10',
  wax: '€5',
  haarwassen: '€5',
  kinderen: '€15',
};

const mismatches = serviceEntries.filter(([id, price]) => PREVIOUS_RELEASE_PRICES[id] !== price);

if (mismatches.length) {
  console.error('Prijsregressie gevonden:');
  mismatches.forEach(([id, price]) => {
    console.error(`- ${id}: current=${price}, previous=${PREVIOUS_RELEASE_PRICES[id]}`);
  });
  process.exit(1);
}

console.log(`PricesList OK: ${serviceEntries.length} service-items, CTA flow en prijsvergelijking gevalideerd.`);
