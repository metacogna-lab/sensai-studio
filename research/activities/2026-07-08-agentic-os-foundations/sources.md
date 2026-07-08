---
title: "AgenticOS Foundations — Sources"
type: reference
status: draft
created: 2026-07-08
updated: 2026-07-08
tags: [research, sources]
---

# Sources — AgenticOS Foundations

| # | Source (URL or path) | Type | Captured | Note / key claim |
|---|---|---|---|---|
| 1 | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents | article | 2026-07-08 | Initializer vs coding-agent split; progress artifacts (`claude-progress.txt`, JSON feature list) bridge context windows; start each session with a verification loop. |
| 2 | https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ | blog | 2026-07-08 | "The Coming Loop" — the progression prompt → context → harness → loop engineering. |
| 3 | https://tosea.ai/blog/loop-engineering-ai-agents-complete-guide-2026 | guide | 2026-07-08 | Loop engineering: designing the loop that prompts the agent, not just the prompt. |
| 4 | (Karpathy) LLM Wiki pattern — e.g. https://hackernoon.com/how-i-built-a-self-maintaining-knowledge-base-for-6-projects-using-claude-code-and-karpathys-llm-wiki | article | 2026-07-08 | Compile-once, keep-current interlinked markdown KB; beats RAG's re-derive-every-query flaw. Mirrors Sensai-HUD `summaries/` + `research/`. |
| 5 | https://arxiv.org/abs/2505.22954 | paper | 2026-07-08 | Darwin-Gödel Machine: self-referential agent + Darwinian loop; generate → evaluate → retain-what-improves; 20%→50% on SWE-bench. |
| 6 | https://arxiv.org/pdf/2507.21046 | paper | 2026-07-08 | Survey of Self-Evolving Agents: what/when/how/where to evolve. |
| 7 | https://arxiv.org/pdf/2606.26924 | paper | 2026-07-08 | A Deterministic Control Plane for LLM Coding Agents — separate semantic reasoning from execution. |
| 8 | https://arxiv.org/pdf/2606.03895 | paper | 2026-07-08 | Agent libOS — library-OS runtime for long-running, capability-controlled LLM agents. |
