# Skill Rubric

Scoring dimensions for evaluating skill outputs. Each dimension is scored 1–5.

| Dimension | 1 — Poor | 3 — Acceptable | 5 — Excellent |
|---|---|---|---|
| **Correctness** | Output contradicts the input or contains factual errors | Mostly correct with minor inaccuracies | Fully accurate, no contradictions |
| **Completeness** | Key steps or outputs missing | Core task done, some details omitted | All required outputs present, edge cases covered |
| **Format** | Wrong format, missing structure | Mostly correct format, minor deviations | Exactly matches expected format (JSON, markdown, etc.) |
| **Specificity** | Generic response, no file/line/command references | Names some specifics but lacks depth | Concrete file paths, line numbers, commands throughout |
| **Actionability** | Output is not usable without major interpretation | User can act on most of it | Ready to copy-paste or execute immediately |
| **Scope discipline** | Wanders outside the skill's mandate | Stays mostly on scope | Strictly within scope, no unsolicited extras |

## How to score

1. Score each dimension 1–5.
2. Compute mean across all six dimensions.
3. A mean ≥ 3.5 is passing for most skill evals. Set `threshold` in the fixture to override.
4. If `criteria[].required` is true for any criterion, failing it auto-fails regardless of rubric score.

## Common failure patterns

- **Hallucinated file paths**: Specificity score drops to 1. Always verify paths exist.
- **Over-scoping**: Skill adds features the user didn't ask for. Scope discipline drops.
- **Missing structure**: A skill that should output JSON outputs prose. Format drops to 1.
- **Vague recommendations**: "Consider refactoring X" without saying how. Actionability drops.
