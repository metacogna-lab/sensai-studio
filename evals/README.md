# Evals

Evaluation framework for skills, prompts, and iterative improvements in the sensai-org agentic OS.

## Structure

```
evals/
├── README.md          — this file
├── schema.md          — fixture and result schemas
├── harness.md         — how the eval runner operates
├── rubrics/
│   ├── skill-rubric.md       — scoring dimensions for skill outputs
│   ├── prompt-rubric.md      — scoring dimensions for prompt quality
│   └── improvement-rubric.md — regression detection for iterative changes
├── fixtures/
│   ├── skills/        — one .json per skill eval case
│   └── prompts/       — one .json per prompt eval case
└── results/           — timestamped result sets (written by /eval)
```

## Running Evals

```
/eval                            — run all fixtures
/eval skill:review               — run fixtures for a specific skill
/eval prompt:onboarding          — run prompt fixtures by tag
/eval --compare results/A results/B  — diff two result sets
/eval --diff                     — only evals touching files changed on current branch
```

## Adding a Fixture

1. Copy `fixtures/skills/example.json` or `fixtures/prompts/example.json`
2. Fill in `id`, `type`, `input`, and `criteria`
3. Run `/eval` — new fixture is picked up automatically

## Adding a Rubric

Rubrics live in `rubrics/`. Each rubric is a markdown file defining scoring dimensions (1–5 scale). Reference a rubric from a fixture using the `rubric` field.

## Results

Results are written to `results/{date}-{run-id}.json`. Pass/fail per fixture plus aggregate scores. Compare two runs with `/eval --compare`.

## Philosophy

- Evals are the feedback loop for improvements. Write one before changing a skill.
- Fixtures should be specific enough to catch regressions, not so narrow they test implementation details.
- A score of 3/5 on all dimensions means "shippable". Aim for 4+.
