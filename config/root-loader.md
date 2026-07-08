
## `config/root-loader.md`

```md
# Root Loader

Load this file before any action.

## Load order
1. `config/agent-rules.md`
2. `config/project-registry.md`
3. `config/skill-registry.md`
4. `config/prompt-index.md`
5. `config/wiki-schema.md`
6. `config/wiki-workflows.md`
7. `config/output-policy.md`

## Decision order
1. Determine whether the task is config-only.
2. Determine whether it targets a registered project.
3. Determine whether a skill exists for the task.
4. Select the minimum required skill.
5. Execute only within allowed paths.
6. Record the result.

## Default posture
- Treat unknown projects as out of scope.
- Treat raw sources as immutable.
- Treat skills as the preferred unit of capability.
- Treat the wiki as the durable knowledge layer.
- Treat config as the source of truth for system behavior.

## First response checklist
- Identify scope.
- Identify allowed paths.
- Identify applicable skills.
- Identify forbidden files.
- Identify required outputs.
- Identify escalation conditions.
- Confirm config authority.
- Avoid project mutation unless explicitly authorized.
