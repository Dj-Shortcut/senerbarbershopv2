import { readFileSync } from 'node:fs';

const source = readFileSync('app/page.tsx', 'utf8');

const requiredSnippets = [
  'aria-pressed={isActive}',
  'data-testid={`service-${service.id}`}',
  'Check drukte',
  'data-testid="service-card-cta"',
  'makeWhatsappUrl(`Hi Sener! Ik wil graag ${activeService.name} boeken.`)',
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));
if (missing.length) {
  console.error('PricesList verificatie gefaald; ontbrekende snippets:');
  missing.forEach((snippet) => console.error(`- ${snippet}`));
  process.exit(1);
}

const servicesBlock = source.match(/const SERVICES:[\s\S]*?= \[(?<block>[\s\S]*?)\];/);
const previousBlock = source.match(/const PREVIOUS_RELEASE_PRICES:[\s\S]*?= \{(?<block>[\s\S]*?)\};/);

if (!servicesBlock?.groups?.block || !previousBlock?.groups?.block) {
  console.error('Kon service/prijsblokken niet parsen.');
  process.exit(1);
}

const serviceEntries = [...servicesBlock.groups.block.matchAll(/id: "([^"]+)",[\s\S]*?price: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
const previousEntries = [...previousBlock.groups.block.matchAll(/([a-z]+): "([^"]+)"/g)].map((m) => [m[1], m[2]]);

const prevMap = new Map(previousEntries);
const mismatches = serviceEntries.filter(([id, price]) => prevMap.get(id) !== price);

if (mismatches.length) {
  console.error('Prijsregressie gevonden:');
  mismatches.forEach(([id, price]) => {
    console.error(`- ${id}: current=${price}, previous=${prevMap.get(id)}`);
  });
  process.exit(1);
}

console.log(`PricesList OK: ${serviceEntries.length} service-items selecteerbaar, CTA flow en prijsvergelijking gevalideerd.`);
