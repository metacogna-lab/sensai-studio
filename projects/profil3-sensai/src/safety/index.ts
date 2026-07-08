/** Composed safety check: URL scope + content scope. One call site for the pipeline. */
import type { Subject } from '../mission/index.js';
import { checkUrlScope, checkContentScope, type ScopeResult } from './scope.js';

export function checkFetch(url: string, subject: Subject): ScopeResult {
  return checkUrlScope(url, subject);
}
export function checkQuery(query: string, subject: Subject): ScopeResult {
  const content = checkContentScope(query);
  if (!content.allowed) return content;
  return { allowed: true };
}
export { SUBJECT_RIGHTS_NOTICE, checkLawfulBasis } from './compliance.js';
