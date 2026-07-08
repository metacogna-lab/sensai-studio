# sensai-org

Multi-project repo — 6 independent projects under `projects/`, each with its own toolchain. No shared build, no workspaces, no monorepo tooling.

## Project map

| Project | Type | Toolchain | PM | Instruction file |
|---|---|---|---|---|
| `projects/profil3-sensai/` | PROHARNESS — CLI for professional intelligence research | TypeScript, tsx, built-in test runner (`node --test`) | npm | `CLAUDE.md` |
| `projects/sensai-landing/` | Next.js 15 marketing site → Cloudflare Workers (OpenNext) | Next.js (no `next dev`), Tailwind v4, Wrangler for preview/deploy | npm | `AGENTS.md` |
| `projects/sensai-finder/` | Sensai Mission Control — Claude Code-native pipeline harness | Agent/skill markdown + bash hooks, bats tests | — | `AGENTS.md` + `CLAUDE.md` |
| `projects/sensai-agora-doc-set/` | Static document set | Markdown only | — | — |
| `projects/sensai-lens/` | Design docs | Markdown only | — | — |
| `projects/sensai-ceo/` | .agents/ with docx/pdf artifacts | — | — | — |

## Layout

- `.obsidian/` — Obsidian vault config (core plugins: file-explorer, daily-notes, templates, sync)
- `summaries/` — raw/ → processed/ → outputs/ (currently empty)
- `research/`, `blog/`, `config/`, `sunyata/` — placeholder dirs

## Guiding principle

Each project under `projects/` is a self-contained codebase. Read its instruction file (`AGENTS.md` or `CLAUDE.md`) before editing. Do not assume shared conventions — toolchains, package managers, and testing strategies vary.
