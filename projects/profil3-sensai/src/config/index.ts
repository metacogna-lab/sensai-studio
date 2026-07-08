/** Config + key resolution. Secrets come from env, never hardcoded. */
export type Provider = 'anthropic' | 'openai' | 'openrouter' | 'local';
export type SearchProvider = 'brave' | 'tavily' | 'google_cse';

export interface Config {
  provider: Provider; model: string; apiKey?: string; baseUrl?: string;
  search: {
    provider?: SearchProvider; maxResults: number;
    braveKey?: string; tavilyKey?: string; googleKey?: string; googleCx?: string;
  };
  fetch: { userAgent: string; timeoutMs: number; maxBytes: number; maxChars: number; respectRobots: boolean; scrubPii: boolean; };
  lawfulBasis?: string;
}

const num = (v: string | undefined, d: number) => (v && !Number.isNaN(+v) ? +v : d);
const bool = (v: string | undefined, d: boolean) => (v == null ? d : /^(1|true|yes)$/i.test(v));

export function loadConfig(env = process.env): Config {
  const provider = (env.PROVIDER as Provider) || 'local';
  const keyByProvider: Record<Provider, string | undefined> = {
    anthropic: env.ANTHROPIC_API_KEY, openai: env.OPENAI_API_KEY,
    openrouter: env.OPENROUTER_API_KEY, local: undefined,
  };
  return {
    provider, model: env.MODEL || 'llama3', apiKey: keyByProvider[provider], baseUrl: env.LOCAL_BASE_URL,
    search: {
      provider: env.SEARCH_PROVIDER as SearchProvider | undefined,
      maxResults: num(env.SEARCH_MAX_RESULTS, 6),
      braveKey: env.BRAVE_API_KEY, tavilyKey: env.TAVILY_API_KEY,
      googleKey: env.GOOGLE_CSE_KEY, googleCx: env.GOOGLE_CSE_CX,
    },
    fetch: {
      userAgent: env.FETCH_USER_AGENT || 'proharness-research/0.2',
      timeoutMs: num(env.FETCH_TIMEOUT_MS, 15000),
      maxBytes: num(env.FETCH_MAX_BYTES, 2_000_000),
      maxChars: num(env.FETCH_MAX_CHARS, 12000),
      respectRobots: bool(env.RESPECT_ROBOTS, true),
      scrubPii: bool(env.SCRUB_CONTACT_PII, true),
    },
    lawfulBasis: env.LAWFUL_BASIS,
  };
}

export function redact<T>(o: T): T {
  const SENSITIVE = /(key|token|secret|password|authorization)/i;
  const walk = (v: any): any => {
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object')
      return Object.fromEntries(Object.entries(v).map(([k, val]) =>
        [k, SENSITIVE.test(k) && val ? '***REDACTED***' : walk(val)]));
    return v;
  };
  return walk(o);
}
