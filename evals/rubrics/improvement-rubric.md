# Improvement Rubric

Use when `type == "regression"` — comparing a new version of a skill or prompt against a golden baseline.

## Scoring approach

Unlike skill-rubric or prompt-rubric, the improvement rubric measures **delta**, not absolute quality.

| Delta | Classification |
|---|---|
| Score improved by ≥ 0.5 | **Improvement** |
| Score within ±0.15 | **Stable** (acceptable) |
| Score dropped by 0.15–0.49 | **Warning** |
| Score dropped by ≥ 0.5 | **Regression** |
| Required criterion flipped fail→pass | **Critical improvement** |
| Required criterion flipped pass→fail | **Critical regression** — blocks ship |

## What to compare

1. **Score delta**: `new_score - baseline_score` per dimension
2. **Criteria flip**: any criterion that changed pass/fail status
3. **Length delta**: if output got longer with same score, that's a conciseness regression
4. **Required criteria**: always check these explicitly

## Regression severity

| Severity | Condition | Action |
|---|---|---|
| Critical | Required criterion fails in new version | Block — do not ship |
| High | Score drops ≥ 0.5 on any dimension | Fix before ship |
| Medium | Score drops 0.15–0.49 | Fix or document as acceptable |
| Low | Score drops < 0.15 | Monitor |
| None | All deltas within ±0.15 | Ship |

## Example comparison table

```
IMPROVEMENT REPORT — skill:review
══════════════════════════════════════════════════════
Fixture: review-catches-hardcoded-secret

Dimension        Baseline  New     Delta   Status
─────────────    ────────  ───     ─────   ──────
Correctness      3.0       4.5     +1.5    Improvement
Completeness     2.5       4.0     +1.5    Improvement
Format           5.0       5.0      0.0    Stable
Specificity      3.5       3.0     -0.5    Regression
Actionability    4.0       4.5     +0.5    Improvement
Scope discipline 5.0       4.5     -0.5    Warning

Criteria flips:
  PASS: cites-file-line (was failing, now passing)
  FAIL: none

Overall delta: +0.42  →  Improvement (with warning on Specificity)
```
