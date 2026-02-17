import { readFileSync, existsSync } from 'node:fs';

const checks = [
  {
    name: 'docs/CHECKLIST.md bestaat',
    run: () => existsSync('docs/CHECKLIST.md'),
  },
  {
    name: 'Hydration-checklist aanwezig',
    run: () => readFileSync('docs/CHECKLIST.md', 'utf8').toLowerCase().includes('hydration'),
  },
  {
    name: 'Font loading/CLS-checklist aanwezig',
    run: () => {
      const text = readFileSync('docs/CHECKLIST.md', 'utf8').toLowerCase();
      return text.includes('font') && text.includes('cls');
    },
  },
  {
    name: 'Focus-state-checklist aanwezig',
    run: () => readFileSync('docs/CHECKLIST.md', 'utf8').toLowerCase().includes('focus'),
  },
];

const failed = checks.filter((check) => !check.run());

if (failed.length > 0) {
  console.error('Lint failed:');
  for (const check of failed) {
    console.error(`- ${check.name}`);
  }
  process.exit(1);
}

console.log('Lint OK: checklist bevat hydration/font+CLS/focus verificaties.');
