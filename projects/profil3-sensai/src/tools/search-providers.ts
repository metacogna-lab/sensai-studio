/** Concrete public web-search adapters. You license the provider; results are
 *  scope/content-gated by the caller before storage. Uses global fetch (Node 18+). */
import type { Config } from '../config/index.js';

export interface SearchHit { title: string; url: string; snippet: string; }

async function withTimeout<T>(p: (signal: AbortSignal) => Promise<T>, ms: number): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try { return await p(ac.signal); } finally { clearTimeout(t); }
}

/** Brave Search API — GET /res/v1/web/search, header X-Subscription-Token. */
async function brave(q: string, cfg: Config): Promise<SearchHit[]> {
  if (!cfg.search.braveKey) throw new Error('BRAVE_API_KEY not set');
  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}&count=${cfg.search.maxResults}`;
  const r = await withTimeout(s => fetch(url, { signal: s, headers: {
    'Accept': 'application/json', 'X-Subscription-Token': cfg.search.braveKey!,
  }}), cfg.fetch.timeoutMs);
  if (!r.ok) throw new Error(`brave ${r.status}`);
  const j: any = await r.json();
  return (j.web?.results ?? []).map((x: any) => ({ title: x.title ?? '', url: x.url, snippet: x.description ?? '' }));
}

/** Tavily — POST /search with {api_key, query}. */
async function tavily(q: string, cfg: Config): Promise<SearchHit[]> {
  if (!cfg.search.tavilyKey) throw new Error('TAVILY_API_KEY not set');
  const r = await withTimeout(s => fetch('https://api.tavily.com/search', {
    method: 'POST', signal: s, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: cfg.search.tavilyKey, query: q, max_results: cfg.search.maxResults, search_depth: 'basic' }),
  }), cfg.fetch.timeoutMs);
  if (!r.ok) throw new Error(`tavily ${r.status}`);
  const j: any = await r.json();
  return (j.results ?? []).map((x: any) => ({ title: x.title ?? '', url: x.url, snippet: x.content ?? '' }));
}

/** Google Programmable Search — GET customsearch/v1?key=&cx=&q=. */
async function googleCse(q: string, cfg: Config): Promise<SearchHit[]> {
  if (!cfg.search.googleKey || !cfg.search.googleCx) throw new Error('GOOGLE_CSE_KEY/GOOGLE_CSE_CX not set');
  const url = `https://www.googleapis.com/customsearch/v1?key=${cfg.search.googleKey}&cx=${cfg.search.googleCx}&q=${encodeURIComponent(q)}&num=${Math.min(cfg.search.maxResults, 10)}`;
  const r = await withTimeout(s => fetch(url, { signal: s }), cfg.fetch.timeoutMs);
  if (!r.ok) throw new Error(`google_cse ${r.status}`);
  const j: any = await r.json();
  return (j.items ?? []).map((x: any) => ({ title: x.title ?? '', url: x.link, snippet: x.snippet ?? '' }));
}

export async function runSearch(q: string, cfg: Config): Promise<SearchHit[]> {
  switch (cfg.search.provider) {
    case 'brave': return brave(q, cfg);
    case 'tavily': return tavily(q, cfg);
    case 'google_cse': return googleCse(q, cfg);
    default: throw new Error('SEARCH_PROVIDER not set (brave | tavily | google_cse)');
  }
}
