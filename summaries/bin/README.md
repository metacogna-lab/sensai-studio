---
title: Activity Summary Jobs
type: reference
status: verified
created: 2026-07-08
updated: 2026-07-08
tags: [summaries, automation, activity, cron]
---

# Activity Summary Jobs

Datestamped daily and weekly summaries of **all sensai-org activity** —
git commits, `agents/operations.md` entries, `research/ACTIVITY.md` updates,
`summaries/` + `research/` file changes, and `agents/errors.md`.

Unlike the global `daily-review` / `weekly-review` skills (which target a
separate personal Obsidian vault) and `sensai-daily-brief` (which reads a
`wiki/` dir this repo doesn't use), these jobs are native to this repository.

## Commands

```bash
summaries/bin/daily                  # today  → summaries/outputs/daily/YYYY-MM-DD.md
summaries/bin/daily --date 2026-07-08
summaries/bin/daily --force          # regenerate today's summary

summaries/bin/weekly                 # this ISO week → summaries/outputs/weekly/YYYY-Www.md
summaries/bin/weekly --date 2026-07-08
summaries/bin/weekly --force
```

Both are **idempotent**: re-running is a no-op unless `--force` is passed.
Output filenames are datestamped (`YYYY-MM-DD.md`, `YYYY-Www.md`).

## Cron (optional)

```cron
10 7 * * *   cd /path/to/sensai-org && summaries/bin/daily  >> ~/.sensai/daily.log 2>&1
20 7 * * 1   cd /path/to/sensai-org && summaries/bin/weekly >> ~/.sensai/weekly.log 2>&1
```

## Files
- `_lib.sh` — shared helpers (repo root, markdown-section extraction, git activity).
- `daily` — daily summary generator.
- `weekly` — weekly consolidation.
