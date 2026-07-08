# PROHARNESS — standing instructions

Professional-intelligence meta-harness for competitive/market research on a professional
in a stated role, from PUBLIC PROFESSIONAL sources + provided seed URLs.

## Non-negotiable rules
1. Public professional sources only. The scope gate (src/safety/scope.ts) refuses
   personal-life / special-category data and non-professional hosts. Never bypass it.
2. Provenance or it doesn't ship. Every finding cites the observation(s) it rests on;
   the evidence gate rejects the rest.
3. Corroborate (>=2 distinct sources) then refute (separate model) before "confirmed".
4. NO psychographic / inner-motivation / personality profiling. Excluded by design and
   enforced by scripts/verify-claims.mjs.
5. A run requires an asserted LAWFUL_BASIS. Honor subject-rights/removal requests.

## Pipeline
seed -> collect -> corroborate -> synthesize -> report   (src/orchestration/stages.ts)

## Commands
npm run doctor · npm run dev -- --subject <file> · npm run verify-claims
