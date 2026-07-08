#!/usr/bin/env node
// Re-derives report integrity from the committed ledger: every confirmed finding
// must have >=1 backing observation, and the report must expose no excluded categories.
import { readFileSync, readdirSync } from 'node:fs';
const runs = readdirSync('runs').filter(f => f.endsWith('.report.json'));
let fail = 0;
for (const rf of runs) {
  const report = JSON.parse(readFileSync(`runs/${rf}`, 'utf8'));
  const ledger = JSON.parse(readFileSync(`runs/${rf.replace('.report.json', '.ledger.json')}`, 'utf8'));
  const obsIds = new Set(ledger.observations.map(o => o.id));
  for (const f of report.evidence.confirmed_findings) {
    const backed = (f.supports || []).some(s => obsIds.has(s));
    if (!backed) { console.error(`❌ ${rf}: finding ${f.id} has no backing observation`); fail++; }
  }
  const forbidden = ['psychograph', 'personality', 'inner motivation'];
  const blob = JSON.stringify(report.analysis).toLowerCase();
  for (const term of forbidden) if (blob.includes(term)) { console.error(`❌ ${rf}: analysis contains excluded category "${term}"`); fail++; }
}
console.log(fail === 0 ? `✅ verify-claims: ${runs.length} report(s) OK` : `❌ verify-claims: ${fail} problem(s)`);
process.exit(fail === 0 ? 0 : 1);
