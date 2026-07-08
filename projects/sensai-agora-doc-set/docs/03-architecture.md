# Agora System — Architecture
### A Sensai Cooperative Document Set — Document 3 of 6

*A system-level view for technical evaluators. Deep implementation detail lives in the companion engineering documents (Agora Models Technical Design, the Node Stack repository, the AI Routing Design) — this document is the map, not the full territory.*

---

## 1. System Overview

```
                          ┌────────────────────────────┐
                          │      Federation Ledger        │
                          │ (membership, votes, model      │
                          │  registry, audit index)        │
                          └──────────────┬─────────────────┘
                                         │
                        ┌─────────────────┴─────────────────┐
                        │            Sensai Node               │
                        │                                       │
   Members ──HTTPS──▶  Caddy (TLS, only externally-reachable   │
                        │  surface) ─┬─────────────┬──────────  │
                        │            │             │            │
                        │  ┌─────────▼───┐  ┌──────▼───────┐    │
                        │  │ Agora Gateway │  │  member-api   │    │
                        │  │ (4 functions, │  │ (chat, agent  │    │
                        │  │  always free) │  │  harness,     │    │
                        │  │               │  │  subscriptions)│    │
                        │  └───────┬───────┘  └──────┬───────┘    │
                        │          │                 │            │
                        │          └────────┬────────┘            │
                        │                   │                     │
                        │         ┌─────────▼─────────┐           │
                        │         │  vLLM (shared base  │           │
                        │         │  model + adapters)  │           │
                        │         └─────────────────────┘           │
                        │                                       │
                        │  Qdrant (RAG) · Postgres (members,   │
                        │  credits) · Prometheus/Grafana        │
                        └───────────────────────────────────────┘
```

## 2. Core Components

| Component | Role |
|---|---|
| **Agora Gateway** | The only entry point to the four constitutional Agora functions. Enforces the function allow-list, fixed system prompts, dual-run audit logging, and per-member rate limiting. Never subscription-gated. |
| **member-api** | Handles subscription-gated general inference (chat, problem-solving) and the agentic harness. Separate from the Agora Gateway by design — billing logic must never touch the constitutionally-free governance path. |
| **Agent Harness** | Bridges the general-purpose model to the Agora Gateway via tool-calling, so a member can request Agora functionality through ordinary conversation. See Document 6. |
| **vLLM inference engine** | Serves one shared open-weight base model (Apache 2.0/MIT licensed only) with separate fine-tuned adapters per Agora function — "one base model, many adapters," not four independent models. |
| **Qdrant** | Vector store backing the Proposal Drafting Assistant's retrieval over the Constitution, bylaws, and prior proposals. |
| **Postgres** | Membership records, subscription tiers, and the append-only credit ledger. |
| **Federation Ledger** | Membership, voting, and the model registry — the source of truth that spans potentially many nodes as Sensai federates. |
| **Caddy** | TLS termination and the *only* externally-reachable service on any node — every internal service is reachable only over the private Docker network. |

## 3. Architectural Principles

### 3.1 Constitutional Separation
The Agora Gateway and member-api are deliberately separate services, not two code paths in one. A billing bug can never touch the free governance queue; a change to subscription pricing never requires the steward-quorum sign-off that gates changes to the Agora functions themselves. This separation is structural, not just procedural — it shows up as two different services with two different deployment and review processes.

### 3.2 One Base Model, Many Adapters
Rather than four (or more) independent models, every Agora function and the general-purpose chat path share one self-hosted base model, differentiated by lightweight fine-tuned adapters. This keeps the audit surface small (one base model's behavior to characterize, several small adapter diffs to review) and keeps compute costs down, which matters directly because the Agora functions are free to members and funded by the treasury.

### 3.3 Open Licensing, Verified Not Assumed
Every model in the stack must carry an OSI-approved or FSF-Free license. This bar has already excluded specific real candidates during evaluation — Llama 4 (a source-available license with usage caps) and Meta's NLLB-200 (non-commercial only) — despite both being technically strong, because "open weight" is not the same claim as "open source," and the project treats that distinction as load-bearing rather than a technicality.

### 3.4 Privacy by Design, Applied Unevenly on Purpose
Not all data in the system carries the same sensitivity, and the architecture reflects that rather than applying one blanket policy. Cooperative deliberation content is designed to be member-auditable. Individual subscription and payment data is handled under a stricter, more conventional privacy posture. Any future service handling materially more sensitive personal data (for example, a coaching or advisory product) runs on fully isolated infrastructure — sharing a database between different privacy postures is treated as a design error, not a convenience.

### 3.5 Cloud-Agnostic by Construction
Production hosting favors self-owned or EU-sovereign dedicated infrastructure once usage is proven (see the Cloud Resource Plan for why the prototype is the exception). Portability across any hosting environment — including AWS or GCP for a demo — comes from containerizing the entire stack and keeping cloud-specific provisioning as thin as possible, so the same container images run identically regardless of where they're deployed.

## 4. Data Flow — A Single Request, Traced

1. A member's client sends a request to `https://<node>/api/v1/agora` (a direct Agora function call) or `/v1/chat` / `/v1/agent` (general use) — Caddy is the only thing that sees this from outside the node.
2. Caddy routes internally, over the private network, to the Agora Gateway or member-api respectively.
3. The receiving service authenticates the caller, applies its own rules (function allow-list and rate limit for Agora; tier, credit balance, and rate limit for member-api), and calls the shared vLLM instance with the appropriate adapter and system prompt.
4. The response is logged — to the Agora audit trail if it came through the Agora Gateway, to standard operational logs otherwise — and returned to the member.

## 5. Where to Go Deeper

- **Agora Models Technical Design** — full ML architecture, prompt design, and evaluation harness for each of the four functions.
- **Node Stack repository** — the actual, runnable Docker Compose configuration implementing everything in this diagram.
- **AI Routing Design (Document 6)** — the specific mechanism connecting the general-purpose model to the Agora functions via the agent harness.
- **Cloud Resource Plan (Document 5)** — how this architecture gets deployed for a live prototype demonstration.
