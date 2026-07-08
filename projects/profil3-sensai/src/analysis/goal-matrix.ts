/** Profile/Goal Matrix — ties each professional goal to the profile facet it draws on
 *  (role / org / engagement), with deterministic evidence strength + an LLM-assigned
 *  dimension/horizon/priority. Every row is source-cited. No psychographic content. */
import type { Backbone } from '../llm/index.js';
import type { Mission } from '../mission/index.js';
import { parseLastArray } from '../parse/json.js';

export interface GoalInput { claim: string; supports: string[]; }
export interface MatrixRow {
  goal: string;
  supports: string[];
  distinctSources: number;
  corroborated: boolean;
  confidence: 'high' | 'medium' | 'low';
  dimension: 'role' | 'org' | 'engagement' | 'mixed' | 'unclear';
  horizon: 'near' | 'mid' | 'long' | 'unspecified';
  prioritySignal: 'stated' | 'implied' | 'weak';
}

const SYSTEM =
  'For each professional GOAL, using ONLY the cited evidence, assign: ' +
  '"dimension" (which profile facet it draws on: role | org | engagement | mixed | unclear), ' +
  '"horizon" (near | mid | long | unspecified), and "priority_signal" ' +
  '(stated = the subject explicitly said it; implied = reasonably inferred from public action; weak = thin evidence). ' +
  'No personality, psychological, or personal-life inference. ' +
  'Respond ONLY as JSON array aligned to input order: ' +
  '[{"dimension":string,"horizon":string,"priority_signal":string}].';

function sourceStats(mission: Mission, supports: string[]) {
  const obs = mission.observations().filter(o => supports.includes(o.id));
  const distinct = new Set(obs.map(o => o.source.url)).size;
  return { distinct, corroborated: distinct >= 2 };
}
function confidenceOf(distinct: number, corroborated: boolean): MatrixRow['confidence'] {
  if (corroborated && distinct >= 3) return 'high';
  if (corroborated) return 'medium';
  return 'low';
}

export async function buildGoalMatrix(mission: Mission, goals: GoalInput[], llm: Backbone): Promise<MatrixRow[]> {
  if (goals.length === 0) return [];
  const obsIndex = mission.observations()
    .map(o => `(${o.id}) [${o.source.url}] ${o.content.slice(0, 300)}`).join('\n');
  const goalList = goals.map((g, i) => `${i + 1}. ${g.claim} [supports: ${g.supports.join(', ')}]`).join('\n');
  const out = await llm.complete([
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `EVIDENCE:\n${obsIndex}\n\nGOALS:\n${goalList}` },
  ]);
  const assigned = (parseLastArray(out.text) ?? []) as any[];

  return goals.map((g, i) => {
    const { distinct, corroborated } = sourceStats(mission, g.supports);
    const a = assigned[i] ?? {};
    return {
      goal: g.claim,
      supports: g.supports,
      distinctSources: distinct,
      corroborated,
      confidence: confidenceOf(distinct, corroborated),
      dimension: (['role','org','engagement','mixed','unclear'].includes(a.dimension) ? a.dimension : 'unclear'),
      horizon: (['near','mid','long','unspecified'].includes(a.horizon) ? a.horizon : 'unspecified'),
      prioritySignal: (['stated','implied','weak'].includes(a.priority_signal) ? a.priority_signal : 'weak'),
    };
  });
}

/** Render the matrix as a human-readable markdown table. */
export function renderMatrixMarkdown(rows: MatrixRow[]): string {
  if (rows.length === 0) return '_No corroborated goals to matrix._';
  const head = '| Goal | Dimension | Horizon | Priority | Sources | Corrob. | Confidence | Evidence |\n' +
               '|---|---|---|---|---|---|---|---|';
  const body = rows.map(r =>
    `| ${r.goal.replace(/\|/g, '/')} | ${r.dimension} | ${r.horizon} | ${r.prioritySignal} | ${r.distinctSources} | ${r.corroborated ? '✓' : '—'} | ${r.confidence} | ${r.supports.join(', ')} |`
  ).join('\n');
  return `${head}\n${body}`;
}
