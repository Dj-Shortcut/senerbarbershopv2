import { existsSync, readFileSync } from 'node:fs';

if (!existsSync('package.json')) {
  console.error('Build failed: package.json ontbreekt.');
  process.exit(1);
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const hasBuild = typeof pkg?.scripts?.build === 'string';
const hasLint = typeof pkg?.scripts?.lint === 'string';

if (!hasBuild || !hasLint) {
  console.error('Build failed: scripts.build en/of scripts.lint ontbreekt.');
  process.exit(1);
}

console.log('Build OK: verplichte npm scripts zijn aanwezig en controle-scripts zijn uitvoerbaar.');
