---
name: source-collector
description: >
  Use to collect public professional evidence by running the queue through the
  scoped tools and recording observations. Triggers: "collect", "gather sources", "stage 2".
---
# Source collection (stage 2)

1. Read src/orchestration/stages.ts `collectStage` and src/tools/*.
2. For each queue item, call fetch_url (URLs) or web_search (queries). Both pass the
   scope gate; DENIED / NOT-WIRED responses are skipped, never recorded as evidence.
3. Record each real result as an Observation with its source URL and timestamp.
4. Every future claim must trace back to one of these observations (provenance).
