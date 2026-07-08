/** Public web search over a concrete provider, restricted to professional intent. */
import { z } from 'zod';
import type { Tool } from './registry.js';
import type { Subject } from '../mission/index.js';
import type { Config } from '../config/index.js';
import { checkQuery, checkFetch } from '../safety/index.js';
import { runSearch } from './search-providers.js';
import { scrubContactPii } from '../safety/scrub.js';

export const makeWebSearch = (subject: Subject, cfg: Config): Tool<{ query: string }> => ({
  name: 'web_search',
  description: 'Search PUBLIC professional sources for the subject in their stated role. Personal-life queries are refused.',
  riskTier: 'active',
  inputSchema: z.object({ query: z.string().min(3) }),
  async run({ query }) {
    const gate = checkQuery(query, subject);
    if (!gate.allowed) return gate.reason!;
    if (!cfg.search.provider) return 'SEARCH NOT WIRED: set SEARCH_PROVIDER + its API key in .env';
    try {
      const hits = await runSearch(query, cfg);
      // Drop results whose URL fails the scope gate; scrub snippets before returning.
      const kept = hits
        .filter(h => checkFetch(h.url, subject).allowed)
        .map(h => ({ title: scrubContactPii(h.title, cfg.fetch.scrubPii), url: h.url, snippet: scrubContactPii(h.snippet, cfg.fetch.scrubPii) }));
      return JSON.stringify(kept);
    } catch (e) { return `SEARCH ERROR: ${String(e)}`; }
  },
});
