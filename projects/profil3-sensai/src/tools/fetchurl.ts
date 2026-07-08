/** Fetch + readability-extract a URL, allowed only if it passes the scope gate. */
import { z } from 'zod';
import type { Tool } from './registry.js';
import type { Subject } from '../mission/index.js';
import type { Config } from '../config/index.js';
import { checkFetch } from '../safety/index.js';
import { fetchAndExtract } from './extract.js';

export const makeFetchUrl = (subject: Subject, cfg: Config): Tool<{ url: string }> => ({
  name: 'fetch_url',
  description: 'Fetch and extract readable text from a public professional URL (seed-bounded).',
  riskTier: 'active',
  inputSchema: z.object({ url: z.string().url() }),
  async run({ url }) {
    const gate = checkFetch(url, subject);
    if (!gate.allowed) return gate.reason!;
    try {
      const { title, text, byline } = await fetchAndExtract(url, cfg);
      return JSON.stringify({ title, byline, text });
    } catch (e) { return `FETCH ERROR: ${String(e)}`; }
  },
});
