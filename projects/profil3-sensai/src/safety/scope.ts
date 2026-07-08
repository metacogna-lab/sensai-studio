/** Scope + content gates (PURE — no I/O, exhaustively testable).
 *  Bounds collection to PUBLIC PROFESSIONAL sources and refuses personal-life / PII. */
import type { Subject } from '../mission/index.js';

/** Hosts never in scope, regardless of seeds (private / people-search / data-broker). */
const NEVER_HOSTS = [
  'localhost', '127.0.0.1',
  'spokeo.com', 'whitepages.com', 'beenverified.com', 'truthfinder.com',
  'intelius.com', 'peoplefinder.com', 'peoplefinders.com', 'fastpeoplesearch.com',
];

/** Recognized public professional DOMAINS (matched against the hostname). */
const PRO_DOMAINS = [
  'linkedin.com', 'crunchbase.com', 'github.com', 'gitlab.com', 'orcid.org',
  'scholar.google.com', 'patents.google.com', 'sec.gov', 'youtube.com',
  'medium.com', 'substack.com', 'slideshare.net', 'researchgate.net',
];

/** Professional PAGE-TYPE segments (matched against PATH segments only). */
const PRO_PATH_SEGMENTS = [
  'about', 'team', 'leadership', 'people', 'press', 'newsroom', 'news',
  'company', 'careers', 'investors', 'investor', 'blog', 'insights',
  'speakers', 'talks', 'events', 'bio', 'profile',
];

/** Personal-life / special-category signals that must NOT be collected or inferred. */
const PII_FORBIDDEN = [
  'home address', 'personal phone', 'personal email', 'date of birth', 'ssn',
  'national id', 'passport', 'health', 'medical', 'religion', 'sexual', 'ethnicity',
  'marital', 'spouse', 'children', 'family member', 'home value', 'net worth',
  'political affiliation', 'personal finances', 'license plate', 'geolocation',
];

export interface ScopeResult { allowed: boolean; reason?: string; }

function parse(url: string): { host: string; segments: string[] } | null {
  try { const u = new URL(url); return { host: u.hostname.toLowerCase(), segments: u.pathname.toLowerCase().split('/').filter(Boolean) }; }
  catch { return null; }
}
const hostMatches = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);

export function checkUrlScope(url: string, subject: Subject): ScopeResult {
  const p = parse(url);
  if (!p) return { allowed: false, reason: 'SCOPE DENIED: unparseable URL' };
  if (NEVER_HOSTS.some(n => hostMatches(p.host, n)))
    return { allowed: false, reason: `SCOPE DENIED: ${p.host} is a non-professional / private-data host` };

  // 1) declared seed host is always in scope
  const seedHosts = subject.seedUrls.map(s => parse(s)?.host).filter(Boolean) as string[];
  if (seedHosts.some(h => h === p.host)) return { allowed: true };

  // 2) recognized professional domain
  if (PRO_DOMAINS.some(d => hostMatches(p.host, d))) return { allowed: true };

  // 3) professional page-type as a PATH segment (token match, not substring)
  if (p.segments.some(seg => PRO_PATH_SEGMENTS.includes(seg))) return { allowed: true };

  return { allowed: false, reason: `SCOPE DENIED: ${p.host} not a seed, professional domain, or professional page type` };
}

export function checkContentScope(query: string): ScopeResult {
  const q = query.toLowerCase();
  const hit = PII_FORBIDDEN.find(term => q.includes(term));
  if (hit) return { allowed: false, reason: `CONTENT DENIED: personal/special-category data ("${hit}") is out of scope` };
  return { allowed: true };
}

export const _internal = { NEVER_HOSTS, PRO_DOMAINS, PRO_PATH_SEGMENTS, PII_FORBIDDEN };
