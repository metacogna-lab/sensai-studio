# Config

This folder is the control plane for the Agentic OS and the Karpathy-style LLM Wiki.

## Responsibilities
- Define global rules.
- Register projects.
- Define prompt routing.
- Define skills and their load order.
- Define wiki schemas and workflows.
- Define output policies.

## Hard rules
- Do not modify `projects/` unless the task explicitly targets a project.
- Do not write to raw wiki inputs.
- Keep all reusable behavior in config-driven prompts and skill definitions.
- Treat compiled wiki pages as the editable knowledge layer.
- Treat raw sources as immutable.

## Canonical areas
- `agent-rules.md`
- `project-registry.md`
- `prompt-index.md`
- `skill-registry.md`
- `skill-templates.md`
- `wiki-schema.md`
- `wiki-workflows.md`
- `output-policy.md`
- `root-loader.md`

## Operating model
1. Load config.
2. Resolve project scope.
3. Select relevant skills.
4. Execute only allowed writes.
5. Record outputs and changes.
