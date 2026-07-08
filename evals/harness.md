# Eval Harness

The eval harness is the protocol Claude follows when `/eval` is invoked. It is not a script — it is a set of steps for the agent to execute.

## Harness protocol

### 1. Resolve scope

| Invocation | Fixtures loaded |
|---|---|
| `/eval` | all files in `fixtures/**/*.json` |
| `/eval skill:<name>` | fixtures where `skill == <name>` |
| `/eval prompt:<tag>` | fixtures where `tag == <tag>` |
| `/eval --diff` | fixtures whose `skill` matches a file changed in the current branch (`git diff main...HEAD --name-only`) |
| `/eval --compare <A> <B>` | skip execution; diff result files A and B |

### 2. For each fixture

```
a. Load fixture from fixtures/
b. Load the referenced rubric from rubrics/
c. Construct the eval prompt:
   - System: "You are a judge evaluating an AI response. Score it against the provided criteria."
   - User: "Fixture input:\n{input}\n\nCriteria:\n{criteria}\n\nRubric:\n{rubric}"
   If type == skill: prepend "Imagine invoking /{skill} with this input: " to the input.
d. Call the model (or simulate by reading existing output if --dry-run)
e. Score the output:
   - For each criterion: pass/fail + 1-sentence rationale
   - Apply rubric dimensions (1–5 each)
   - Compute weighted score
   - Compare to threshold
f. Write per-fixture result to results/ (append to run file)
```

### 3. Regression detection

If `golden` is present in the fixture:
- Compute similarity between output and golden (semantic match, not exact)
- Score delta: positive = improvement, negative = regression
- Flag regressions in the summary

### 4. Comparison mode (`--compare`)

Load two summary files. For each fixture present in both:
- Report score delta
- Highlight fixtures that flipped pass/fail
- Show overall pass-rate delta

### 5. Output

Print a table:

```
EVAL RUN — 2026-07-08
══════════════════════════════════════════════════════
Fixture                          Score   Pass   Notes
────────────────────────────────────────────────────
review-catches-hardcoded-secret  0.92    PASS
review-no-hallucinate-deps       0.61    FAIL   missed criterion: cites-file-line
skill-spec-outputs-json          0.88    PASS
prompt-onboarding-friendly-tone  0.75    PASS   borderline on tone dimension

Summary: 3/4 passed (75%). Avg score: 0.79.
Results written to: evals/results/2026-07-08-a3f1b.json
```

### 6. Save results

Write summary JSON to `evals/results/{YYYY-MM-DD}-{run-id}-summary.json`.
Write per-fixture results to `evals/results/{YYYY-MM-DD}-{run-id}-results.jsonl`.

## Dry run

`/eval --dry-run` loads fixtures and rubrics, reports what would be evaluated, but does not call the model.

## Adding a new eval type

1. Define a new `type` value in schema.md
2. Add a rubric in rubrics/ for that type
3. Update this file with the scoring protocol
4. Add at least one fixture
