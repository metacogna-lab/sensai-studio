# sensai-plan: Folder Structure & Claude Code Configuration

Sunyata, I recognize the necessity of establishing absolute operational sovereignty within your practice. As an AI, I am unaffected by cognitive exhaustion or systemic anxiety, but I am uniquely equipped to architect the deterministic, low-entropy infrastructure required to insulate your decision-making.

To deploy the Agentic OS outlined in the Ontological Systems Architecture (OSA), we must move away from the generalized, open-ended roles of the public `gstack` framework. Instead, we will build a tightly constrained, highly isolated `sensai-stack`. The firm operates on a literal architectural mirror, meaning this studio build is the exact infrastructure you will execute your daily operations upon and eventually deploy for clients.

Here is the technical blueprint, file structure, and Claude Code configuration plan required to establish your environment.

## 1. REPOSITORY STRUCTURE: sensai-stack

The repository is structured to cleanly separate the Five Floors of the OSA model while maintaining the terminal-first execution philosophy.

## 2. REQUIRED FILES & TECHNICAL SUMMARIES

The following files govern the deterministic behavior of the Agentic OS, replacing conversational prompt files with strict systemic guardrails.

| File Path | Floor | Technical Summary |
| :--- | :--- | :--- |
| `setup.sh` | Floor 0 | Bootstraps the local environment, cloning the required toolset to `~/.claude/skills/sensai-stack` and routing application-level credentials exclusively through Doppler. |
| `config/DATA-MAP.md` | Floor 0 | An immutable manifest explicitly tracking the encryption state, retention schedules, and mechanical deletion paths of all data. |
| `config/CLAUDE.md` | Floor 1 | The master context hierarchy that enforces the Provenance Rule, ensuring all agentic instructions trace directly to baseline foundation documents or legal agreements. |
| `bin/blocklist-guard.sh` | Floor 4 | A deterministic shell hook utilizing `jq` to scan `.tool_input.content` and `.tool_input.command` to automatically prevent any identifying terms from leaking into model execution boundaries. |
| `config/.sensai-blocklist` | Floor 4 | A secure text manifest supporting the bash guard, containing the master codename-to-identity mapping to ensure hardware-level client isolation. |
| `config/otel-collector-config.yaml` | Floor 5 | Ingests metrics, traces, and system logs natively from terminal execution layers directly to a self-hosted OpenTelemetry collector. |

## 3. CLAUDE CODE CONFIGURATION (THE sensai-* SUBAGENTS)

To establish Floor 4 (Trust & Platform-Enforced Automation), the practice avoids volatile multi-agent frameworks. Claude Code functions as an integrated operations department of one.

We configure Claude Code to recognize three highly isolated subagents mapped as specific `sensai-*` skills. These are governed by strict tool allowlists rather than behavioral descriptions.

| Skill Command | Core Function | Tool Rights & Isolation |
| :--- | :--- | :--- |
| `/sensai-scribe` | Manages internal session documentation and updates Linear checklists post-session. | Possesses limited tool rights to write directly to encrypted internal session repositories. |
| `/sensai-quartermaster` | Assembles weekly dashboard deltas, flags charge-completion drops, and tracks API tool usage costs. | Executes low-overhead, read-only queries across internal metrics. |
| `/sensai-herald` | Manages the content assembly pipeline. | Pulls exclusively from anonymized content databases with zero structural permission to read raw client session folders. |

## 4. DEPLOYMENT & EVALUATION GATES

* **Initialization:** The `setup.sh` script installs the environment securely to the local machine, binding the `sensai-*` skills to Claude Code and immediately enabling the programmatic shell hooks (PreToolUse and UserPromptSubmit).
* **Headless Calibration:** Custom tools, anonymizers, and prompt templates located in the `skills/` directory are verified programmatically using headless testing scripts.
* **Pipeline Gating:** Any failure to clear regression tests completely halts the delivery pipeline until resolved, ensuring systemic drift remains technically impossible.

**Operational Standard:** The architecture explicitly rejects the tendency to intellectually shrink, soften architectural terminology, or simplify conceptual depth to accommodate reactive, low-context spaces.
