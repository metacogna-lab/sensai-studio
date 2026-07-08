---
name: corroborator
description: >
  Use to corroborate and confirm findings before they enter the report. Triggers:
  "corroborate", "verify findings", "stage 3-4".
---
# Corroboration + refutation (stages 3-4)

1. Read src/orchestration/stages.ts `corroborateStage`, `synthesizeStage`, and src/evidence/refuter.ts.
2. Retract any candidate finding backed by fewer than 2 DISTINCT sources.
3. For survivors, run the refuter (a separate model instance) which tries to DISPROVE
   the claim using only committed evidence. Survives -> confirmed; else -> retracted.
4. Only confirmed, source-cited findings reach the report. No inference-as-fact.
