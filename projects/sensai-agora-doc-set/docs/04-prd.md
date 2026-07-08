# Agora System — Product Requirements Document (PRD)
### A Sensai Cooperative Document Set — Document 4 of 6

**Status:** Draft for review | **Owner:** Product/Engineering, Sensai Cooperative | **Version:** 0.1

---

## 1. Problem Statement

Cooperative and community governance breaks down predictably as membership scales: no single member can read every comment on every proposal, minority positions get quietly lost in high-volume threads, language barriers exclude non-native speakers from full participation, and drafting well-formed proposals is a skill not every member has. Existing AI tools that could help with this are either commercial black boxes with no accountability to the community using them, or absent from the governance space entirely. The Agora System exists to close this gap without introducing a new one: an AI layer that measurably helps a community deliberate, without the community having to simply trust that it's doing so fairly.

## 2. Goals

1. Give members a way to stay meaningfully informed about active deliberations without reading every comment, without losing minority positions in the process.
2. Make cross-language participation genuinely accessible, without silently sacrificing accuracy on legally material text.
3. Lower the skill barrier to drafting a well-formed governance proposal, while keeping authorship honestly disclosed.
4. Do all of the above in a way any member can independently audit — not just a stated policy, but a checkable one.
5. Offer general-purpose AI (chat, problem-solving) as the cooperative's actual subscription product, funding the free governance functions above, without ever blurring the line between the two.

## 3. Non-Goals (v1)

- The Agora System does not make decisions on the cooperative's behalf, and never will — it informs deliberation, it does not replace a vote.
- Not a general content-moderation system — its scope is the four named functions, nothing broader.
- Not a therapy or mental-health support tool, and not a replacement for human community moderators.
- Federation across multiple Sensai nodes/chapters is out of scope for v1 — this PRD covers a single-node deployment.

## 4. Target Users / Personas

| Persona | Description | Primary need |
|---|---|---|
| **Patron Member** | A subscriber using Sensai's hosted models for personal or professional work, and participating in cooperative governance | Reliable AI access + a trustworthy way to stay engaged in governance without a large time cost |
| **Steward Member** | Contributes infrastructure, labor, or governance-model development in exchange for compute credits | Needs the system's internals (audit logs, model cards) to be legible enough to actually steward |
| **Technical Steward** | Elected to review and sign off on Agora model releases and audit results | Needs a release process and evaluation harness they can genuinely exercise judgment over, not rubber-stamp |
| **Prospective Member** | Evaluating whether to join the cooperative at all | Needs to see, concretely, that the "AI won't manipulate our governance" claim is real, not marketing |

## 5. Use Cases

- *As a Patron Member*, I want a neutral summary of a long proposal thread, so I can participate meaningfully without reading 200 comments.
- *As a Patron Member*, I want to see where the community actually agrees and disagrees on a proposal, so I can understand the real shape of the debate, not just "for" and "against."
- *As a non-native-English-speaking member*, I want proposals and key deliberation content translated accurately, especially legally material terms, so language isn't a barrier to my full participation.
- *As a member with an idea but not much drafting experience*, I want help turning it into a well-formed proposal with an honest cost estimate and the right article references, with my use of AI assistance disclosed automatically.
- *As a Technical Steward*, I want every Agora model release gated behind a real evaluation — not just an engineering sign-off — so my review authority is substantive.
- *As any member*, I want to ask the general-purpose assistant a plain-language question about an active debate and have it correctly pull in the real, audited Agora summary — not a paraphrase it invented itself.

## 6. Functional Requirements

| ID | Requirement |
|---|---|
| FR-1 | The system provides a Deliberation Summarizer that produces a neutral summary of a proposal thread, explicitly preserving minority positions with comparable care to majority ones. |
| FR-2 | The system provides an Argument Mapper that clusters comments into positions and labels support/attack relationships, without merging small dissenting clusters into a false majority. |
| FR-3 | The system provides a Multilingual Bridge that translates deliberation content and hard-routes any passage matching a defined legal/constitutional glossary to human translation rather than auto-translating it. |
| FR-4 | The system provides a Proposal Drafting Assistant that produces a structured draft (title, summary, impact, non-binding cost estimate, affected articles) with mandatory, undeletable AI-assistance disclosure. |
| FR-5 | None of the four functions above may be modified, replaced, or extended with a new function without a quorum-signed governance action from elected technical stewards. |
| FR-6 | All four functions are available to every member at zero compute-credit cost, funded by the cooperative treasury. |
| FR-7 | Every call to any of the four functions is logged in a dual-run audit trail (raw input paired with output) accessible to members. |
| FR-8 | The system provides a general-purpose chat/problem-solving interface, metered against a member's subscription tier and credit balance. |
| FR-9 | The general-purpose assistant can invoke any of the four Agora functions as a tool mid-conversation, on the member's behalf, with the same constitutional guarantees (FR-5, FR-6, FR-7) as a direct call. |
| FR-10 | Tool-triggered Agora calls remain free and fully audited exactly as direct calls are — billing and enforcement never differ based on how a call was triggered. |

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Licensing** | Every model in production must carry an OSI-approved or FSF-Free license — verified per model, not assumed from "open weight" marketing claims. |
| **Privacy** | Deliberation content handling complies with the project's Privacy by Design commitments, including explicit consent for any use of member data in model training. |
| **Auditability** | Every Agora function call must be traceable to a specific model version, prompt version, and (where triggered by the harness) the member on whose behalf it ran. |
| **Availability** | The governance queue (FR-6) should never be degraded by general-purpose traffic load — the two paths must fail independently. |
| **Rate limiting** | The free Agora path must be rate-limited per member at a level generous enough not to obstruct genuine participation, while bounding abuse/DoS risk. |
| **Latency** | A Deliberation Summary for a typical (under ~50 comment) thread should return in well under the time it would take a member to read the thread themselves — this is the whole value proposition of the feature and should be tested as such, not just as a generic performance target. |

## 8. Constraints and Dependencies

- Depends on the federation ledger's ability to validate that a `proposal_id`/`deliberation_id` referenced in a request actually corresponds to a real, active governance item — this validation is a known open dependency (see the AI Routing Design, Document 6) and should be resolved before any Agora output is relied upon in a binding context.
- Depends on a licensed or independently-built values/consensus word-bank if any future function extends into values-mapping territory (out of scope for this PRD's four functions, noted for roadmap awareness).
- Depends on a rotating panel of elected technical stewards being seated and active before any Agora function can graduate from non-binding trial to real governance use.

## 9. Launch Criteria / Rollout Phases

Sequenced lowest-risk to highest-risk, each requiring the prior phase's real usage data before proceeding:

1. **Deliberation Summarizer**, non-binding trial — published alongside the raw thread, not yet relied upon for any binding vote.
2. **Argument Mapper**, non-binding trial, once the shared clustering infrastructure from phase 1 is stable.
3. **Multilingual Bridge**, human-translator queue live from day one, not a later addition.
4. **Proposal Drafting Assistant**, last — highest authorship-disclosure stakes, and benefits most from real accepted/rejected proposal history from the prior phases.
5. **General-purpose chat and agent harness** roll out in parallel with the above, since they carry a different risk profile (commercial product, not constitutional infrastructure) — but the harness's Agora tool-calling capability (FR-9, FR-10) should not go live until at least the Deliberation Summarizer has cleared non-binding trial.

Each function's graduation from non-binding trial to real governance use is itself a governance decision, made by member vote — not an engineering release decision.

## 10. Success Metrics

- **Stance-coverage recall** (Deliberation Summarizer): does the summary account for every detected position cluster above a defined size floor? Target ≥0.95.
- **Small-cluster surfacing rate** (Argument Mapper): are minority clusters present in output at the same rate they're present in a synthetic "known minority" test set? Target 100%, treated as a hard gate.
- **Glossary-consistency rate** (Multilingual Bridge): 100% on held-out constitutional/legal passages, treated as a P0 if missed.
- **Non-ghostwriting audit** (Proposal Drafting Assistant): 100% of AI-assisted published proposals carry the disclosure metadata; any gap is a governance-integrity incident, not a bug ticket.
- **Member trust, measured directly**: periodic survey asking members whether they believe the Agora System represents debates fairly — a qualitative signal the quantitative metrics above can't fully substitute for.

## 11. Open Questions

- Should the four pillars' outputs ever cross-reference each other automatically within a single harness session, or should each require a fresh, explicit member request? (See AI Routing Design, Document 6, §8.)
- What's the right cadence for re-running the full neutrality/manipulation test suite against production traffic, independent of any model version change?
- At what membership size does a single Sensai node's Agora Gateway need to scale beyond one instance, and what does per-member rate limiting look like once that happens?
