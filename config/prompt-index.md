# Prompt Index

Index of agent prompt sources and instruction files in this repo.

## Project-level instruction files

| File | Project | What it covers |
|---|---|---|
| `projects/profil3-sensai/CLAUDE.md` | profil3-sensai | Non-negotiable rules, pipeline stages, commands for PROHARNESS |
| `projects/sensai-landing/AGENTS.md` | sensai-landing | Two-app layout, commands table, deployment gotchas |
| `projects/sensai-finder/AGENTS.md` | sensai-finder | Command quick-reference for / skills, gate hooks, testing |
| `projects/sensai-finder/CLAUDE.md` | sensai-finder | Full architectural map, two-git-repo protocol, operating protocol |

## Control plane

- `config/agent-rules.md` — per-area operating constraints
- `config/wiki-schema.md` — document type definitions and frontmatter spec
- `config/wiki-workflows.md` — content lifecycle definitions
- `config/output-policy.md` — formatting and quality standards

## External references

- `.obsidian/` — Obsidian vault config (read-only for agents)
- `summaries/` — wiki content pipeline (raw → processed → outputs)

## Agent access pattern

On session start, relevant agents load:
1. `config/README.md` — overview
2. `config/agent-rules.md` — constraints for the target area
3. Target project's `loader_file` — project-specific rules
