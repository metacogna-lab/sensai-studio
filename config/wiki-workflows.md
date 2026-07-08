# Wiki Workflows

Content lifecycle and agent workflows for the LLM Wiki.

## Content lifecycle

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│ raw/     │────→│ processed/   │────→│ outputs/ │
│ (inbox)  │     │ (curated)    │     │ (published│
│ status:  │     │ status:      │     │ status:  │
│ draft    │     │ review/ver.  │     │ ver./ar. │
└──────────┘     └──────────────┘     └──────────┘
```

## Agent workflow stages

### 1. Ingest (raw/ → raw/)
- Agent deposits new content into `summaries/raw/` with valid frontmatter
- Status MUST be `draft`
- Type MUST match one of the defined types

### 2. Curate (raw/ → processed/)
- Agent reads raw content, proposes edits
- On approval: move file to `summaries/processed/`
- Update status to `review` (if needs human check) or `verified` (if certain)
- Update `updated` timestamp

### 3. Publish (processed/ → outputs/)
- Agent moves `verified` content to `summaries/outputs/`
- Content is considered published and stable
- Further edits must go through a new draft-revise cycle

## Status transitions

- `draft` → `review`: content is structured and complete but unchecked
- `review` → `verified`: content passes all quality gates
- `verified` → `archived`: content is superseded or no longer relevant
- `draft` → `archived`: direct archival (abandoned note)

## Agent responsibilities

| Stage | Agent action | Human touchpoint |
|---|---|---|
| Ingest | Write file with valid frontmatter | Optional review |
| Curate | Read, edit, move, update status | Required for draft→verified without review step |
| Publish | Move verified content to outputs | Recommended before marking finalized |
| Archive | Move to relevant archive or flip status | Required |
