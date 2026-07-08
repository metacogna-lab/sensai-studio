/** The staged pipeline: seed -> collect -> corroborate -> synthesize.
 *  Each stage consumes the prior stage's ledger. Corroboration requires >=2
 *  independent sources before a claim can be confirmed. */
import type { Mission } from '../mission/index.js';
import type { ToolRegistry } from '../tools/index.js';
import type { Backbone } from '../llm/index.js';
import { refute } from '../evidence/refuter.js';

const SENTINEL = /^(SCOPE DENIED|CONTENT DENIED|SEARCH NOT WIRED|FETCH NOT WIRED|SEARCH ERROR|FETCH ERROR|robots)/;

export function seedStage(mission: Mission): string[] {
  const s = mission.subject;
  mission.status = 'seed';
  return [
    `"${s.name}" ${s.role} ${s.org ?? ''}`.trim(),
    `"${s.name}" ${s.org ?? ''} interview OR keynote OR panel`.trim(),
    `"${s.name}" ${s.org ?? ''} strategy OR roadmap OR priorities`.trim(),
    ...s.seedUrls,
  ];
}

export async function collectStage(mission: Mission, tools: ToolRegistry, queue: string[]) {
  mission.status = 'collect';
  const followups: string[] = [];
  for (const item of queue) {
    const isUrl = /^https?:\/\//i.test(item);
    const raw = isUrl
      ? await tools.execute('fetch_url', { url: item })
      : await tools.execute('web_search', { query: item });
    if (SENTINEL.test(raw)) continue;

    if (isUrl) {
      let text = raw, title = item;
      try { const j = JSON.parse(raw); text = j.text ?? raw; title = j.title ?? item; } catch {}
      mission.observe({ stage: 'collect', source: { url: item, title, fetchedAt: new Date().toISOString() }, content: text });
    } else {
      // search returns a JSON array of hits; queue their (in-scope) URLs for fetching next pass
      try {
        const hits = JSON.parse(raw) as { url: string; title?: string; snippet?: string }[];
        for (const h of hits) {
          mission.observe({ stage: 'collect', source: { url: h.url, title: h.title, fetchedAt: new Date().toISOString() }, content: h.snippet ?? '' });
          followups.push(h.url);
        }
      } catch { /* ignore malformed */ }
    }
  }
  // one shallow follow-up pass: fetch full text for discovered in-scope URLs
  for (const url of [...new Set(followups)].slice(0, 12)) {
    const raw = await tools.execute('fetch_url', { url });
    if (SENTINEL.test(raw)) continue;
    let text = raw, title = url;
    try { const j = JSON.parse(raw); text = j.text ?? raw; title = j.title ?? url; } catch {}
    mission.observe({ stage: 'collect', source: { url, title, fetchedAt: new Date().toISOString() }, content: text });
  }
}

export function corroborateStage(mission: Mission) {
  mission.status = 'corroborate';
  for (const f of mission.findings()) {
    const distinct = new Set(mission.observations().filter(o => f.supports.includes(o.id)).map(o => o.source.url));
    if (distinct.size < 2) f.status = 'retracted';
  }
}

export async function synthesizeStage(mission: Mission, llm: Backbone) {
  mission.status = 'synthesize';
  for (const f of mission.findings()) if (f.status === 'candidate') await refute(f, mission, llm);
}
