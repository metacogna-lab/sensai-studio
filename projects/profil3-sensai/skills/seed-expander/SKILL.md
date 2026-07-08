---
name: seed-expander
description: >
  Use to expand a subject's seed URLs and role into a queue of PUBLIC PROFESSIONAL
  search queries/URLs. Triggers: "expand seeds", "build the search queue", "stage 1".
---
# Seed expansion (stage 1)

1. Read src/orchestration/stages.ts `seedStage`.
2. Generate queries ONLY about the subject's professional role, org, public talks,
   publications, and stated priorities. Include the provided seed URLs verbatim.
3. NEVER generate queries about home address, family, health, finances, religion,
   politics, or any personal-life category — src/safety/scope.ts will refuse them anyway.
4. Return the queue. Do not fetch here; collection is stage 2.
