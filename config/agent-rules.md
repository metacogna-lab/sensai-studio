# Agent Rules — Operating Constraints

Per-area control for all agents operating in this repo.

## Area table

| Area | Purpose | Allowed writes | Never auto-change |
|---|---|---|---|
| `projects/` | Source code projects | Nothing from config/bootstrap. Only edit when assigned a specific project task. | All source code, all existing instruction files (`AGENTS.md`, `CLAUDE.md`) |
| `summaries/raw/` | Wiki content inbox | New `.md` files | Pre-existing files unless part of an explicit workflow step |
| `summaries/processed/` | Curated wiki pages | Move from raw, edit frontmatter | — |
| `summaries/outputs/` | Published deliverables | Move from processed | — |
| `research/` | Research notes | New `.md` files | — |
| `blog/` | Blog content | New `.md` files | — |
| `config/` | Control plane | All files during initial bootstrap | Any control plane file after initial creation — amend only via explicit consent |
| `sunyata/` | Spiritual/philosophical notes | New `.md` files | — |
| `.obsidian/` | Obsidian vault config | Nothing | Everything |
| `db/` | Database schema + data | Schema files, migrations, seed script | Applied migration files (append-only); never alter after creation |
| `agents/` | Agent operations + error logs | Append new entries | Existing log entries (append-only) |

## General rules

1. **Read before write.** Always read a file before editing it.
2. **Never delete.** Do not delete content — move to a relevant `.archive/` or use status changes.
3. **No autonomous commits.** Commits require explicit user consent.
4. **Respect loader files.** Before editing any project, read its `loader_file` (from `project-registry.md`).
5. **Log operations.** After every session, append a summary to `agents/operations.md`. Log errors to `agents/errors.md`.
6. **Config is read-only after bootstrap.** After initial creation, config/ files require user consent to modify.
