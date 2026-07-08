/** Org-context & role mapping — the role, remit, and org structure around it. */
import type { Backbone } from '../llm/index.js';
import type { Mission } from '../mission/index.js';
import { parseLastObject } from '../parse/json.js';

const SYSTEM =
  'Map the subject\'s PROFESSIONAL role and organizational context from public evidence: ' +
  'role title + remit, team/function, where it sits in the org, and adjacent roles/stakeholders ' +
  '(by title, not private detail). Cite observation ids per field. Respond ONLY as JSON: ' +
  '{"role":{"title":string,"remit":string,"supports":string[]},"function":string,"org_position":string,"adjacent_roles":string[]}.';

export async function analyzeOrgRole(mission: Mission, llm: Backbone) {
  const obs = mission.observations().map(o => `- (${o.id}) [${o.source.url}] ${o.content.slice(0, 500)}`).join('\n');
  const out = await llm.complete([{ role: 'system', content: SYSTEM }, { role: 'user', content: `OBSERVATIONS:\n${obs}` }]);
  return parseLastObject(out.text) ?? {};
}
