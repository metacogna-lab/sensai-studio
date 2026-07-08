/** Assemble the final report from confirmed, source-cited analysis. No psychographic section. */
import type { Mission } from '../mission/index.js';
import { SUBJECT_RIGHTS_NOTICE } from '../safety/index.js';
import type { MatrixRow } from './goal-matrix.js';

export function buildReport(mission: Mission, parts: { goals: unknown; engagement: unknown; orgRole: unknown; matrix: MatrixRow[] }) {
  const sources = [...new Set(mission.observations().map(o => o.source.url))];
  return {
    subject: mission.subject,
    generatedAt: new Date().toISOString(),
    lawfulBasis: mission.lawfulBasis,
    scope: 'public professional sources + provided seed URLs; personal-life/PII excluded by design',
    analysis: {
      org_and_role: parts.orgRole,
      professional_goals: parts.goals,      // source-cited
      goal_matrix: parts.matrix,            // goal x profile-facet x evidence-strength
      engagement_brief: parts.engagement,   // public presentation only
    },
    evidence: {
      confirmed_findings: mission.confirmed(),
      sources,
      observation_count: mission.observations().length,
    },
    excluded_by_design: ['psychographic profile', 'inner-motivation inference', 'personal-life data', 'special-category data'],
    notice: SUBJECT_RIGHTS_NOTICE,
  };
}
