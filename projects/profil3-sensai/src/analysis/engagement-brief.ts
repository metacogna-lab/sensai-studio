/** Public engagement / outreach brief — how the subject presents professionally.
 *  Strictly public professional presentation; not a persuasion or manipulation guide. */
import type { Backbone } from '../llm/index.js';
import type { Mission } from '../mission/index.js';
import { parseLastObject } from '../parse/json.js';

const SYSTEM =
  'Produce a PUBLIC ENGAGEMENT BRIEF for professional outreach, using only public professional ' +
  'evidence. Include: publicly stated professional interests/topics, public positions/opinions the ' +
  'subject has voiced, and the channels/formats they use professionally (talks, posts, papers). ' +
  'Do NOT include personality profiling, emotional leverage, or anything designed to manipulate. ' +
  'Every field must cite observation ids. Respond ONLY as JSON: ' +
  '{"interests":[{"topic":string,"supports":string[]}],"public_positions":[{"position":string,"supports":string[]}],"channels":[{"channel":string,"supports":string[]}]}.';

export async function analyzeEngagement(mission: Mission, llm: Backbone) {
  const obs = mission.observations().map(o => `- (${o.id}) [${o.source.url}] ${o.content.slice(0, 500)}`).join('\n');
  const out = await llm.complete([{ role: 'system', content: SYSTEM }, { role: 'user', content: `OBSERVATIONS:\n${obs}` }]);
  return parseLastObject(out.text) ?? {};
}
