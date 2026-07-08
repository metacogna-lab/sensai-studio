# sensai-plan: Skills, Commands & Hooks Inventory

To establish the Ontological Systems Architecture (OSA) flawlessly, the environment must strictly separate hardcoded CLI operations, custom agentic skills, and programmatic shell hooks. Below is the definitive inventory of components required for Claude Code to instantiate the Sensai Stack.

## Built-in Commands

These are fixed-logic operations hardcoded into the Claude Code CLI that execute deterministic actions and do not involve AI reasoning to interpret their core execution path.

* **/plan**: Parses large execution requirements prior to autonomous tool use to prevent architectural drift.
* **/config**: Verifies and ensures that Claude Code inherits from the environment's `managed-settings.json`.
* **/mcp**: Manages the Model Context Protocol servers required for secure integrations with external tools like Linear, Notion, and GitHub.
* **/clear**: Clears the current contextual memory.
* **/batch**: Executes batch operations across the terminal environment.

## Custom Skills (The Subagents)

Skills are reusable, prompt-based process directories built on the open Agent Skills standard, requiring a dedicated folder containing a `skill.md` file with strict YAML frontmatter.

* **/sensai-scribe**: Manages internal session documentation and updates Linear checklists post-session. Possesses limited tool rights to write directly to encrypted internal session repositories.
* **/sensai-quartermaster**: Assembles weekly dashboard deltas, flags charge-completion drops, and tracks API tool usage costs. Executes low-overhead, read-only queries across internal metrics.
* **/sensai-herald**: Manages the content assembly pipeline. Pulls exclusively from anonymized content databases with zero structural permission to read raw client session folders.
* **/sensai-build-loops**: Facilitates mass file operations over folder structures. Explicitly mandates that large execution requirements must be parsed via plan mode prior to autonomous tool use, gated by a deterministic shell script.
* **/sensai-compost**: Acts as the automated garbage collection mechanism for the Agentic OS. Parses through active orchestrators to eliminate prompt drift, remove redundant tool definitions, and enforce the "3C Rule" (Concise, Contextual, Constrained).
* **/sensai-sec-audit**: Ensures that terminal-based agentic ecosystems remain compliant with Floor 0 and Floor 4 principles. Scans the `skills/` directory for Doppler bypasses and blocklist hook failures.
* **/sensai-hook-manager**: Manages the deterministic shell hooks that govern the Agentic OS boundaries.
* **/sensai-skill-refiner**: Structurally aligns new capabilities and subagents to the root specification files. Natively checks the rulebook, formats the YAML, builds the process steps, and securely mounts the skill without human cognitive load.

## Deterministic Shell Hooks

These are programmatic interceptors mapped in `.claude/managed-settings.json` that enforce absolute system guardrails.

* **PreToolUse (`bin/blocklist-guard.sh`)**: Utilizes `jq` to scan `.tool_input.content` and `.tool_input.command`. Automatically prevents identifying terms from leaking into model execution boundaries to enforce hardware-level client isolation.
* **UserPromptSubmit (`bin/prompt-validator.sh`)**: Intercepts the user's initial prompt before Claude processes it. Enforces that large execution requirements are prepended with `/plan` and rejects complex directory operations lacking plan mode with an error.
* **PostToolUse (`bin/telemetry-exporter.sh`)**: Captures the exit code and token usage of the executed tool. Natively routes metrics to the self-hosted OpenTelemetry (OTel) local watchtower configured on Floor 5.
