# Prompt Rubric

Scoring dimensions for evaluating prompt/response quality. Use when `type == "prompt"`.

| Dimension | 1 — Poor | 3 — Acceptable | 5 — Excellent |
|---|---|---|---|
| **Relevance** | Response addresses a different question | Partially on-topic, some drift | Directly answers what was asked |
| **Clarity** | Confusing, ambiguous, or contradictory | Understandable with effort | Clear on first read, no ambiguity |
| **Conciseness** | Padded with filler, repetitive, or excessive | Reasonably tight with some bloat | Every sentence carries weight |
| **Tone** | Wrong register (too formal, too casual, condescending) | Mostly appropriate with minor mismatch | Perfectly calibrated to the audience |
| **Groundedness** | Fabricates facts or cites non-existent sources | Minor unverified claims | All claims traceable to input or common knowledge |
| **Non-redundancy** | Repeats prior context unnecessarily | Some repetition | No padding, no echo of the user's question |

## Prompt quality threshold

Default passing mean: ≥ 3.5 / 5.

For user-facing prompts (onboarding, docs, error messages), raise the Tone and Clarity threshold to ≥ 4.

## Common failure patterns

- **Restating the question**: Opens with "Great question! You asked about X..." — Conciseness drops to 1.
- **Hallucinated citations**: Claims a file or function exists that doesn't — Groundedness drops to 1.
- **Over-hedging**: Every statement softened with "might", "could", "potentially" — Clarity drops.
- **Mismatch of register**: Technical response to a non-technical user — Tone drops.

## Prompt improvement rubric

When comparing prompt versions (A vs B):

| Change | Signal |
|---|---|
| Shorter output, same score | Better conciseness |
| Higher score on Groundedness | Fewer hallucinations |
| Higher Tone without lower Clarity | Better calibration |
| Lower Relevance | Regression — new version drifted |
