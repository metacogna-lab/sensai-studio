/** Provenance gate: a finding without a backing observation is rejected. */
import type { Finding, Mission } from '../mission/index.js';
export function evidenceGate(f: Finding, mission: Mission): { ok: boolean; reason?: string } {
  if (!f.supports || f.supports.length === 0) return { ok: false, reason: 'no supporting observation' };
  const ids = new Set(mission.observations().map(o => o.id));
  const missing = f.supports.filter(s => !ids.has(s));
  if (missing.length) return { ok: false, reason: `supports reference unknown observations: ${missing.join(',')}` };
  return { ok: true };
}
