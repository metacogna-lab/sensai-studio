/** Adversarial verification. A separate model instance tries to DISPROVE a finding
 *  using only committed observations. Survives -> confirmed; else -> retracted. */
import type { Backbone } from '../llm/index.js';
import type { Finding, Mission } from '../mission/index.js';
import { evidenceGate } from './gate.js';
import { parseLastObject } from '../parse/json.js';

const REFUTER_SYSTEM =
  'You are a skeptical fact-checker. Given a CLAIM and the ONLY EVIDENCE available (public professional sources), ' +
  'decide if the evidence actually supports the claim. Do not use outside knowledge or speculation. ' +
  'Respond ONLY as JSON: {"supported": boolean, "reason": string}.';

export async function refute(f: Finding, mission: Mission, llm: Backbone): Promise<Finding> {
  const gate = evidenceGate(f, mission);
  if (!gate.ok) { f.status = 'retracted'; return f; }
  const evidence = mission.observations()
    .filter(o => f.supports.includes(o.id))
    .map(o => `- [${o.source.url}] ${o.content.slice(0, 800)}`).join('\n');
  const out = await llm.complete([
    { role: 'system', content: REFUTER_SYSTEM },
    { role: 'user', content: `CLAIM: ${f.claim}\n\nEVIDENCE:\n${evidence}` },
  ]);
  const verdict = parseLastObject(out.text) as { supported?: boolean } | null;
  f.status = verdict?.supported ? 'confirmed' : 'retracted';
  return f;
}
