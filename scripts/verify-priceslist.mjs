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

  if (/app\/page\.tsx/.test(pricesListSource)) {
    errors.push('Script target lijkt nog app/page.tsx te gebruiken.');
  }

  const serviceEntries = parseServiceEntries(servicesSource);
  if (serviceEntries.length === 0) {
    errors.push('Kon geen services in lib/services.ts parsen.');
    return errors;
  }

  const serviceIds = new Set(serviceEntries.map((entry) => entry.id));
  const sectionIds = parseSectionItemIds(pricesListSource);

  if (sectionIds.length === 0) {
    errors.push('Kon geen itemIds in components/PricesList.tsx parsen.');
  }

  const missingInSections = [...serviceIds].filter((id) => !sectionIds.includes(id));
  if (missingInSections.length) {
    errors.push(`Services zonder prijslijst-sectie: ${missingInSections.join(', ')}`);
  }

  const priceDiffs = serviceEntries
    .filter(({ id }) => id in EXPECTED_BASELINE_PRICES)
    .filter(({ id, price }) => EXPECTED_BASELINE_PRICES[id] !== price)
    .map(({ id, price }) => `${id}: current=${price}, baseline=${EXPECTED_BASELINE_PRICES[id]}`);

  if (priceDiffs.length) {
    errors.push(`Prijsregressie gevonden: ${priceDiffs.join(' | ')}`);
  }

  const newIdsWithoutBaseline = serviceEntries
    .map(({ id }) => id)
    .filter((id) => !(id in EXPECTED_BASELINE_PRICES));

  if (newIdsWithoutBaseline.length) {
    errors.push(`Nieuwe service-id(s) zonder baseline-prijs: ${newIdsWithoutBaseline.join(', ')}`);
  }

  return errors;
}

function runSelfTest(pricesListSource, servicesSource) {
  const mutatedPricesList = pricesListSource.replace('Meest gekozen vandaag:', 'Meest gekozen:');
  const labelRegressionErrors = validatePricesList(mutatedPricesList, servicesSource);

  if (labelRegressionErrors.length === 0) {
    console.error('Self-test gefaald: CTA/label regressie werd niet gedetecteerd.');
    process.exit(1);
  }

  const mutatedServices = servicesSource.replace('price: "€20"', 'price: "€999"');
  const priceRegressionErrors = validatePricesList(pricesListSource, mutatedServices);

  if (priceRegressionErrors.length === 0) {
    console.error('Self-test gefaald: prijsregressie werd niet gedetecteerd.');
    process.exit(1);
  }

  console.log('Self-test OK: regressies op CTA-label en prijs worden gedetecteerd.');
}

const pricesListSource = readFileSync(PRICES_LIST_PATH, 'utf8');
const servicesSource = readFileSync(SERVICES_PATH, 'utf8');

if (process.argv.includes('--self-test')) {
  runSelfTest(pricesListSource, servicesSource);
}

const errors = validatePricesList(pricesListSource, servicesSource);
if (errors.length) {
  console.error('PricesList verificatie gefaald:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`PricesList OK: ${serviceEntries.length} service-items, CTA flow en prijsvergelijking gevalideerd.`);
