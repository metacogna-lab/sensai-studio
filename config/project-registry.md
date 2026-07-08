# Project Registry

Index of all projects under `projects/`.

## Registration format

Each entry is a YAML code block under a `### <slug>` heading.

Fields:
- `project_slug` — unique identifier
- `project_type` — `cli`, `webapp`, `harness`, `docset`, `design`, or `artifact`
- `owner` — username or org
- `status` — `active`, `archived`, or `placeholder`
- `allowed_paths` — list of glob patterns
- `loader_file` — path to instruction file, or `null`
- `notes` — free-text description

## Current entries

### profil3-sensai

```yaml
project_slug: profil3-sensai
project_type: cli
owner: sensai-org
status: active
allowed_paths:
  - projects/profil3-sensai/**
loader_file: projects/profil3-sensai/CLAUDE.md
notes: >
  PROHARNESS — TypeScript CLI for professional-intelligence research.
  Pipeline: seed → collect → corroborate → synthesize → report.
  Uses tsx runtime, node --test runner, npm. Reads CLAUDE.md for non-negotiable rules.
```

### sensai-landing

```yaml
project_slug: sensai-landing
project_type: webapp
owner: sensai-org
status: active
allowed_paths:
  - projects/sensai-landing/**
loader_file: projects/sensai-landing/AGENTS.md
notes: >
  Next.js 15 marketing site deployed to Cloudflare Workers via @opennextjs/cloudflare.
  Two apps in one repo: app/ (production Next.js) and src/ (Bun scratch playground excluded from tsconfig).
  npm package manager. No next dev — preview via wrangler dev.
```

### sensai-finder

```yaml
project_slug: sensai-finder
project_type: harness
owner: sensai-org
status: active
allowed_paths:
  - projects/sensai-finder/**
loader_file: projects/sensai-finder/AGENTS.md
notes: >
  Sensai Mission Control — Claude Code-native pipeline harness.
  Agent/skill markdown + bash hooks. bats test suite. Docker Compose for Next.js dashboard (app/).
  Two git repos (harness + engagement tenants). Read AGENTS.md (quick-ref) and CLAUDE.md (architecture).
```

### sensai-agora-doc-set

```yaml
project_slug: sensai-agora-doc-set
project_type: docset
owner: sensai-org
status: active
allowed_paths:
  - projects/sensai-agora-doc-set/**
loader_file: null
notes: >
  Six standalone markdown documents introducing the Agora System — constitutional AI governance layer.
  Read in order 01–06. No toolchain, no tests.
```

### sensai-lens

```yaml
project_slug: sensai-lens
project_type: design
owner: sensai-org
status: active
allowed_paths:
  - projects/sensai-lens/**
loader_file: null
notes: >
  Agentic OS design docs: PRD, folder structure, Claude hierarchy, skills inventory,
  plus framework docs (executive decision-making, organizational psychology).
  Markdown only. No toolchain.
```

### sensai-ceo

```yaml
project_slug: sensai-ceo
project_type: artifact
owner: sensai-org
status: active
allowed_paths:
  - projects/sensai-ceo/**
loader_file: null
notes: >
  .agents/ directory with SenSai Init Guide (docx) and SenSai PRD (pdf).
  Binary artifacts only — no source code.
```

## Registering a new project

Append a new YAML block above and run `cd db && npx tsx src/seed.ts` to sync to the database.
