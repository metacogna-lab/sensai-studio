# Wiki Schema

Document schema for the sensai-org LLM Wiki.

## Frontmatter

Every wiki page MUST have valid YAML frontmatter:

```yaml
---
title: string
type: note|summary|theory|model|insight|reference|daily|reflection
status: draft|review|verified|archived
created: ISO 8601 date
updated: ISO 8601 date
tags: string[]
source: string (optional — provenance URL or file path)
---
```

## Document types

| Type | Purpose | Status lifecycle |
|---|---|---|
| `note` | Quick capture, raw thought | draft → archived |
| `summary` | Condensed extract from a source | draft → review → verified → archived |
| `theory` | Synthesized claim or hypothesis | draft → review → verified → archived |
| `model` | Structured framework or map | draft → review → verified → archived |
| `insight` | Cross-cutting observation | draft → verified → archived |
| `reference` | Stable reference material | review → verified → archived |
| `daily` | Daily log entry | draft → archived |
| `reflection` | Contemplative or philosophical note | draft → archived |

## Directory pipeline

```
summaries/
├── raw/          ← Inbox. All new content lands here first. Status: draft.
├── processed/    ← Curated and reviewed. Status: review or verified.
└── outputs/      ← Published deliverables. Status: verified or archived.
```

## Movement rules

- Content moves forward only: raw → processed → outputs
- Edits happen in place in the current directory
- A move MUST update the frontmatter `updated` timestamp
