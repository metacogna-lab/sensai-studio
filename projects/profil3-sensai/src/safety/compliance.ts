/** Lawful-basis + subject-rights gate. A run cannot start without an asserted basis. */
export interface ComplianceResult { ok: boolean; reason?: string; }

export function checkLawfulBasis(basis?: string): ComplianceResult {
  if (!basis || basis.trim().length < 8)
    return { ok: false, reason: 'COMPLIANCE: LAWFUL_BASIS must be asserted (e.g. "legitimate-interest: competitive research")' };
  return { ok: true };
}

/** Notice appended to every report. Not legal advice — an operator reminder. */
export const SUBJECT_RIGHTS_NOTICE = [
  'This profile is compiled from public professional sources for competitive/market research.',
  'It contains no personal-life, special-category, or non-public data by design.',
  'Data-subject rights (access, rectification, objection, erasure) may apply under GDPR/CCPA and',
  'similar laws. Honor removal/objection requests. Do not use for automated decisions about the',
  'individual, harassment, or any purpose beyond the stated lawful basis.',
].join(' ');
