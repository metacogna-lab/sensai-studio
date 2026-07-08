# PROHARNESS — Professional-Intelligence Meta-Harness

A staged meta-harness for **competitive / market research** on a named professional
**in a stated role**, built strictly from **public, professional-context sources**
plus **seed URLs you provide**. Knowledge is built in stages — each consumes the last —
and every reported claim carries its source.

> The model is the brain; the harness is discipline. Provenance or it doesn't ship.

## Outputs
1. **Org-context & role mapping** — role, remit, org position (cited).
2. **Professional goals & priorities** — inferred only from public statements/actions (cited).
3. **Profile / Goal Matrix** — each goal × the profile facet it draws on (role/org/engagement) × evidence strength (distinct sources, corroboration, confidence, horizon, priority signal). Emitted as JSON **and** a markdown table.
4. **Public engagement / outreach brief** — public interests, stated positions, channels (cited).
5. **Evidence ledger** — every observation with its source URL; every finding linked to observations.

## Concrete integrations (v0.2)
- **Search providers:** `brave` · `tavily` · `google_cse` — pick one in `.env` (`src/tools/search-providers.ts`). Results are scope-filtered before storage.
- **Readability extraction:** real HTML → main-text via Mozilla Readability + jsdom, with byte cap, timeout, robots.txt courtesy, and contact-PII scrubbing (`src/tools/extract.ts`).
- **Contact-PII scrub:** emails/phone numbers are redacted from stored text (`src/safety/scrub.ts`).

## Pipeline
`seed → collect (+shallow follow-up fetch) → corroborate (≥2 sources) → synthesize (refuter) → report`

## Quick start
```bash
npm install
cp .env.example .env       # set PROVIDER + one SEARCH_PROVIDER + LAWFUL_BASIS
npm run doctor             # preflight (env + search wiring + scope reminder)
npm test                   # unit tests for the safety gates
npm run dev -- --subject examples/demo-subject.json
npm run verify-claims      # re-derive report integrity from the committed ledger
```
Outputs land in `runs/<id>.report.json`, `runs/<id>.ledger.json`, `runs/<id>.matrix.md`.

## Excluded by design (and enforced in code)
- **No psychographic / inner-motivation / personality profiling** (`verify-claims` fails the build if it appears).
- **No personal-life / special-category data**, no data-broker/people-search sources (scope gate).
- **No non-public or surveillance collection.**

## Legal / ethical scope
Public-source competitive research about professionals in their professional capacity is
generally lawful, but you are responsible for GDPR/CCPA/platform-terms compliance and
subject-rights obligations. A run requires an asserted `LAWFUL_BASIS`.
See `docs/SCOPE_AND_ETHICS.md` and `docs/DATA_HANDLING.md`.
