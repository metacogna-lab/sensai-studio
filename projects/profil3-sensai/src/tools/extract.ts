/** Fetch a URL and extract readable main-content text via Mozilla Readability.
 *  Enforces byte cap, timeout, optional robots courtesy, and PII scrub on store. */
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import type { Config } from '../config/index.js';
import { scrubContactPii } from '../safety/scrub.js';

export interface Extracted { title: string; text: string; byline?: string; }

async function robotsAllows(url: string, ua: string, ms: number): Promise<boolean> {
  try {
    const u = new URL(url);
    const r = await fetch(`${u.origin}/robots.txt`, { signal: AbortSignal.timeout(ms) });
    if (!r.ok) return true;
    const body = await r.text();
    // Minimal courtesy parse: honor a global "User-agent: *" Disallow of the path prefix.
    const lines = body.split(/\r?\n/).map(l => l.trim());
    let applies = false; const disallows: string[] = [];
    for (const l of lines) {
      const [k, ...rest] = l.split(':'); const v = rest.join(':').trim();
      if (/^user-agent$/i.test(k)) applies = v === '*' || ua.toLowerCase().includes(v.toLowerCase());
      else if (applies && /^disallow$/i.test(k) && v) disallows.push(v);
    }
    return !disallows.some(d => u.pathname.startsWith(d));
  } catch { return true; }
}

export async function fetchAndExtract(url: string, cfg: Config): Promise<Extracted> {
  if (cfg.fetch.respectRobots && !(await robotsAllows(url, cfg.fetch.userAgent, cfg.fetch.timeoutMs)))
    throw new Error('robots.txt disallows this path');

  const res = await fetch(url, {
    signal: AbortSignal.timeout(cfg.fetch.timeoutMs),
    headers: { 'User-Agent': cfg.fetch.userAgent, 'Accept': 'text/html,application/xhtml+xml' },
  });
  if (!res.ok) throw new Error(`fetch ${res.status}`);
  const ct = res.headers.get('content-type') ?? '';
  if (!/text\/html|xml/.test(ct)) throw new Error(`unsupported content-type: ${ct}`);

  // byte cap
  const buf = await res.arrayBuffer();
  const html = Buffer.from(buf.slice(0, cfg.fetch.maxBytes)).toString('utf8');

  const dom = new JSDOM(html, { url });
  // strip active content before parsing
  dom.window.document.querySelectorAll('script,style,noscript,iframe,svg').forEach(n => n.remove());
  const article = new Readability(dom.window.document).parse();

  const rawTitle = article?.title || dom.window.document.title || url;
  const rawText = (article?.textContent || dom.window.document.body?.textContent || '').replace(/\s+\n/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();

  const text = scrubContactPii(rawText.slice(0, cfg.fetch.maxChars), cfg.fetch.scrubPii);
  return { title: scrubContactPii(rawTitle, cfg.fetch.scrubPii), text, byline: article?.byline ?? undefined };
}
