# Skill Registry

This file lists every reusable skill available to the Agentic OS.

## Registry schema
- skill_name
- purpose
- trigger
- inputs
- outputs
- allowed_paths
- dependencies
- owner
- status
- risk_level

## Required skills
- bootstrap-repo
- register-project
- scaffold-project
- scaffold-skill
- execute-skill
- ingest-wiki
- query-wiki
- lint-wiki
- sync-config
- publish-blog
- write-doctrine

## Rules
- Every skill must have a single responsibility.
- Every skill must declare its allowed paths.
- Skills may depend on other skills, but only through config references.
- Skills that write files must produce structured output.
