/** Professional goals & priorities — inferred ONLY from public statements/actions.
 *  Output is a list of source-cited claims; no psychological inference. */
import type { Backbone } from '../llm/index.js';
import type { Mission } from '../mission/index.js';
import { parseLastArray } from '../parse/json.js';

const SYSTEM =
  'From the PUBLIC PROFESSIONAL evidence provided, list the subject\'s stated or evidenced ' +
  'PROFESSIONAL goals and priorities. Rules: (1) only what the evidence supports; ' +
  '(2) each item MUST cite the observation ids it rests on; (3) NO psychological, personality, ' +
  'or personal-life inference; (4) if evidence is thin, say so. ' +
  'Respond ONLY as JSON array: [{"claim": string, "supports": string[]}].';

export async function analyzeGoals(mission: Mission, llm: Backbone) {
  const ev = mission.confirmed().map(f => `- (${f.id}) ${f.claim}`).join('\n');
  const obs = mission.observations().map(o => `- (${o.id}) [${o.source.url}] ${o.content.slice(0, 500)}`).join('\n');
  const out = await llm.complete([
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `CONFIRMED FINDINGS:\n${ev}\n\nOBSERVATIONS:\n${obs}` },
  ]);
  return parseLastArray(out.text) ?? [];
}
