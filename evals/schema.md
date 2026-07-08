# Eval Schema

## Fixture schema

```json
{
  "id": "string — unique, kebab-case, e.g. review-catches-hardcoded-secret",
  "type": "skill | prompt | regression",
  "skill": "string — skill name (for type:skill) or null",
  "tag": "string — free-form grouping label, e.g. 'onboarding', 'security'",
  "input": "string — the full input to evaluate (prompt text or simulated user message)",
  "context": "string — optional: background the evaluator needs but the model doesn't see",
  "criteria": [
    {
      "id": "criterion-id",
      "description": "What a passing response must do or contain",
      "required": true,
      "weight": 1
    }
  ],
  "rubric": "string — filename in rubrics/ to apply (e.g. skill-rubric)",
  "golden": "string — optional reference output for comparison",
  "threshold": 0.75,
  "model": "string — optional model override for this fixture",
  "tags": ["array", "of", "strings"]
}
```

### Field notes

- `threshold`: fraction of weighted criteria that must pass (default 0.75)
- `golden`: used for regression evals — new output is compared against this baseline
- `criteria[].weight`: relative importance; default 1. A weight-2 criterion counts double.
- `criteria[].required`: if true, failing this criterion auto-fails the entire eval regardless of score.

## Result schema

```json
{
  "eval_id": "string — matches fixture id",
  "run_id": "string — uuid for this eval run",
  "run_at": "ISO 8601 timestamp",
  "model": "string — model used",
  "skill": "string or null",
  "input": "string — what was sent",
  "output": "string — what the model produced",
  "passed": true,
  "score": 0.87,
  "threshold": 0.75,
  "criteria_results": [
    {
      "id": "criterion-id",
      "passed": true,
      "score": 5,
      "weight": 1,
      "rationale": "string"
    }
  ],
  "rubric_scores": {
    "dimension-name": 4
  },
  "regression_delta": null,
  "notes": "string"
}
```

## Run summary schema

Written to `results/{date}-{run-id}-summary.json`:

```json
{
  "run_id": "string",
  "run_at": "ISO 8601",
  "model": "string",
  "scope": "all | skill:<name> | prompt:<tag> | diff",
  "total": 12,
  "passed": 10,
  "failed": 2,
  "pass_rate": 0.833,
  "avg_score": 0.81,
  "regressions": [],
  "improvements": [],
  "fixture_results": ["array of per-fixture result objects"]
}
```
