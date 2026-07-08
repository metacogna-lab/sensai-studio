/** CLI entry: proharness --subject <file.json>
 *  Runs seed -> collect -> corroborate -> synthesize -> report over public sources. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { loadConfig, redact } from './config/index.js';
import { Backbone } from './llm/index.js';
import { Mission, type Subject } from './mission/index.js';
import { buildRegistry } from './tools/index.js';
import { checkLawfulBasis } from './safety/index.js';
import { seedStage, collectStage, corroborateStage, synthesizeStage } from './orchestration/stages.js';
import { analyzeGoals } from './analysis/professional-goals.js';
import { analyzeEngagement } from './analysis/engagement-brief.js';
import { analyzeOrgRole } from './analysis/org-role-map.js';
import { buildGoalMatrix, renderMatrixMarkdown, type GoalInput } from './analysis/goal-matrix.js';
import { buildReport } from './analysis/report.js';

function arg(name: string) { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined; }

async function main() {
  const cfg = loadConfig();
  const basis = checkLawfulBasis(cfg.lawfulBasis);
  if (!basis.ok) { console.error(basis.reason); process.exit(2); }

  const subjectPath = arg('--subject');
  if (!subjectPath) { console.error('usage: proharness --subject <file.json>'); process.exit(1); }
  const subject = JSON.parse(readFileSync(subjectPath, 'utf8')) as Subject;
  if (!subject.name || !subject.role) { console.error('subject requires {name, role, seedUrls[]}'); process.exit(1); }

  console.log('config:', JSON.stringify(redact(cfg)));
  const mission = new Mission(subject, cfg.lawfulBasis!);
  const llm = new Backbone(cfg);
  const tools = buildRegistry(subject, cfg);

  const queue = seedStage(mission);
  await collectStage(mission, tools, queue);
  corroborateStage(mission);
  await synthesizeStage(mission, llm);

  const [goals, engagement, orgRole] = await Promise.all([
    analyzeGoals(mission, llm), analyzeEngagement(mission, llm), analyzeOrgRole(mission, llm),
  ]);
  const matrix = await buildGoalMatrix(mission, goals as GoalInput[], llm);
  const report = buildReport(mission, { goals, engagement, orgRole, matrix });

  mkdirSync('runs', { recursive: true });
  writeFileSync(`runs/${mission.id}.ledger.json`, JSON.stringify(mission.snapshot(), null, 2));
  writeFileSync(`runs/${mission.id}.report.json`, JSON.stringify(report, null, 2));
  writeFileSync(`runs/${mission.id}.matrix.md`,
    `# Profile / Goal Matrix — ${subject.name} (${subject.role})\n\n${renderMatrixMarkdown(matrix)}\n\n> ${report.notice}\n`);
  console.log(`\nReport:  runs/${mission.id}.report.json\nLedger:  runs/${mission.id}.ledger.json\nMatrix:  runs/${mission.id}.matrix.md`);
}
main().catch(e => { console.error(e); process.exit(1); });
