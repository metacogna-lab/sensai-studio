/** The Subject/Mission model + append-only evidence ledger. */
export interface Subject {
  name: string; role: string; org?: string; seedUrls: string[];
}
export interface Source { url: string; title?: string; publisher?: string; fetchedAt: string; }
export interface Observation { id: string; stage: Stage; source: Source; content: string; }
export interface Finding {
  id: string; claim: string; supports: string[];
  status: 'candidate' | 'confirmed' | 'retracted';
  category: 'goal' | 'role' | 'org' | 'engagement';
}
export type Stage = 'seed' | 'collect' | 'corroborate' | 'synthesize' | 'report';

export class Mission {
  readonly id = `m_${Date.now()}`;
  status: Stage = 'seed';
  private _obs: Observation[] = [];
  private _findings: Finding[] = [];
  constructor(readonly subject: Subject, readonly lawfulBasis: string) {}
  observe(o: Omit<Observation, 'id'>): Observation {
    const rec = { ...o, id: `o_${this._obs.length + 1}` }; this._obs.push(rec); return rec;
  }
  addFinding(f: Omit<Finding, 'id' | 'status'>): Finding {
    const rec = { ...f, id: `f_${this._findings.length + 1}`, status: 'candidate' as const };
    this._findings.push(rec); return rec;
  }
  observations() { return [...this._obs]; }
  findings() { return [...this._findings]; }
  confirmed() { return this._findings.filter(f => f.status === 'confirmed'); }
  snapshot() { return { id: this.id, subject: this.subject, status: this.status, lawfulBasis: this.lawfulBasis, observations: this._obs, findings: this._findings }; }
}
