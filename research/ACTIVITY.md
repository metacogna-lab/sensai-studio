---
title: Research Activity — Master Rollup
type: summary
status: verified
created: 2026-07-08
updated: 2026-07-08
tags: [research, dashboard, rollup, analysis]
---

# Research Activity — Master

Live summary and analysis of all research activities. One row per activity under
`research/activities/`. New activities are appended automatically by
`research/bin/new-activity`; the **Analysis** section is curated by hand.

See [`README.md`](./README.md) for the workflow.

## Active & recent

<!-- ACTIVITIES:START — rows are appended by research/bin/new-activity; keep newest on top -->
| Activity | Status | Opened | Updated | Owner | Linked project | Summary |
|---|---|---|---|---|---|---|
| [2026-07-08-agentic-os-foundations](./activities/2026-07-08-agentic-os-foundations/) | synthesizing | 2026-07-08 | 2026-07-08 | Sunyata | `sensai-lens` | Current (2026) research grounding for Sensai-HUD: AgenticOS control planes, loop/harness engineering, LLM Wiki, recursive self-improvement. |
<!-- ACTIVITIES:END -->

## Analysis

_Cross-activity synthesis. Update when activities open, change status, or publish._

### Themes in flight
- **Loop & harness engineering** — how long-running agents bridge context windows
  (initializer/coding split, progress artifacts, verification loops). Feeds the
  `improvement/` evolution loop and the daily/weekly summary design.
- **LLM Wiki discipline** — compile-once, keep-current knowledge (Karpathy pattern);
  directly validates the `summaries/` + `research/` pipeline.
- **Recursive self-improvement** — capture → propose → evaluate → retain-what-improves;
  bounded to human-gated adoption in this repo.

### Ready to publish
- None yet.

### Blocked / open questions
- Daily + weekly activity summarization for the repo is **not yet wired** (see
  `agents/plans/` and the daily/weekly job gap).

### Retired
- None yet.
