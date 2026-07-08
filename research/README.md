---
title: Research Activity Workflow
type: reference
status: verified
created: 2026-07-08
updated: 2026-07-08
tags: [research, workflow, process]
---

# Research Activity Workflow

How research is conducted in Sensai-HUD. Every distinct line of inquiry is a
**research activity** that lives in its own subfolder under `research/activities/`.
The master file [`ACTIVITY.md`](./ACTIVITY.md) maintains a live summary and
cross-activity analysis of everything currently in flight.

## Structure

```
research/
├── index.md                    ← knowledge index (Concepts, Entities, Sources, …)
├── ACTIVITY.md                 ← MASTER: rollup + analysis of all activities
├── README.md                   ← this workflow
├── bin/new-activity            ← scaffolder: starts a new activity from template
└── activities/
    ├── _TEMPLATE/              ← copied by the scaffolder (never edited in place)
    └── <YYYY-MM-DD>-<slug>/    ← one folder per activity
        ├── README.md           ← manifest: question, hypothesis, method, status log
        ├── sources.md          ← captured sources with provenance
        └── findings.md         ← synthesized findings (feeds summaries/ + index.md)
```

**One activity = one folder.** Never mix two inquiries in one folder; open a new
activity instead.

## Lifecycle

```
open ──→ active ──→ synthesizing ──→ published ──→ archived
```

| Status | Meaning | Next action |
|---|---|---|
| `open` | Scaffolded, question framed, not yet worked | Gather sources |
| `active` | Sources being collected and read | Draft findings |
| `synthesizing` | Findings being written and cross-checked | Publish deliverable |
| `published` | `findings.md` promoted to `summaries/outputs/` + linked in `index.md` | Monitor / archive |
| `archived` | Superseded or abandoned | — |

The activity's status lives in its `README.md` frontmatter (`status:` field) and
is mirrored in the row inside [`ACTIVITY.md`](./ACTIVITY.md).

## Starting a new activity

```bash
# from the repo root
research/bin/new-activity <slug> "Human Readable Title"
# e.g.
research/bin/new-activity loop-engineering "Loop Engineering patterns for agent harnesses"
```

The scaffolder:
1. Creates `research/activities/<today>-<slug>/` from `_TEMPLATE/`.
2. Fills in title, slug, and dates.
3. Appends a row to the master `ACTIVITY.md` table.
4. Prints the path and next steps.

## Running an activity

1. **Frame** — fill the Question / Hypothesis / Scope in the activity `README.md`.
2. **Gather** — log every source in `sources.md` with a URL/path and a one-line
   note. Do not paste verbatim dumps — capture the claim and cite the source.
3. **Synthesize** — write `findings.md`: what we now know, what remains open,
   and confidence. Link related wiki pages with `[[wikilinks]]`.
4. **Publish** — when `findings.md` is `verified`, copy it into
   `summaries/outputs/` (see [`config/wiki-workflows.md`](../config/wiki-workflows.md))
   and add a pointer under the relevant section of [`index.md`](./index.md).
5. **Roll up** — update the activity's row and the **Analysis** section in
   [`ACTIVITY.md`](./ACTIVITY.md).

## Conventions

- Every `.md` carries valid frontmatter per [`config/wiki-schema.md`](../config/wiki-schema.md).
- Findings flow **forward only** into `summaries/` (`raw → processed → outputs`);
  never edit a published output in place — open a new draft cycle.
- Prefer the `/sensai-ingest` and `/sensai-query` skills for wiki I/O; run
  `bin/sensai-wiki-lint` (from the gstack skill suite) before publishing.
- Cross-activity themes and strategic direction belong in
  [`current_goals/`](../current_goals/) — link them, don't duplicate.
