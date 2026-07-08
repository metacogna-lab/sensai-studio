# Agora System — AI Routing Design
### A Sensai Cooperative Document Set — Document 6 of 6

*A working implementation of everything in this document — the Agora Gateway, the general-purpose model gateway, and the tool-calling bridge between them — already exists as runnable code in the Node Stack repository.*

---

## 1. Three Kinds of Traffic, One System

The Agora System serves three genuinely different kinds of request, and this design exists because treating any two of them as the same thing would be a mistake:

| Traffic class | What it is | Billing | Auditability |
|---|---|---|---|
| **Agora Direct** | The four constitutional functions, called directly | Always free | Full dual-run audit trail |
| **General Chat / Problem-Solving** | Open-ended use of the general-purpose model — the actual subscription product | Credit-metered by tier | Standard operational logging |
| **Harness / Agentic** | The general-purpose model running a tool-use loop that can call Agora functions mid-conversation | Credit-metered for the general-model side only | Split — general-model turns logged normally; any Agora tool call gets the full Agora audit trail, identical to a direct call |

## 2. Why They Stay Architecturally Separate

The Agora Gateway's entire trustworthiness rests on a narrow, fixed contract: it can only do the four constitutionally-permitted things, because its schemas and system prompts don't allow anything else, and that contract cannot change without a member vote. Mixing general-purpose, open-ended prompting into that same gateway — even for convenience — would make it possible to quietly launder ordinary paid usage through the free governance path, or to compromise the constitutional guarantee that the Agora functions can't be asked to do anything else. Keeping the two systems physically separate is what makes both claims — "this is always free" and "this can only do these four things" — actually true rather than aspirational.

## 3. The Routing Mechanism: A Tool Boundary, Not a Classifier

A tempting but wrong design would be a smart router that inspects every incoming request and decides "this looks like an Agora request, send it there." This system deliberately avoids building that component, for a simple reason: **it already exists, built into the general-purpose model itself, in the form of tool/function calling** — the same well-established capability the model would use to call a web search tool or a calculator.

The four Agora functions are exposed to the general-purpose model as ordinary tool definitions, each with a description written for the model's benefit ("use this when the member asks about the state of a debate…"). When a member asks a natural-language question that calls for one of them, the model's own tool-selection decides to invoke it — no separate routing logic anywhere else in the stack, and no new component that could itself become a way to bypass the Agora Gateway's enforcement.

**Enforcement never moves.** Whether an Agora function is called directly by a client or indirectly by the general-purpose model acting as an agent, the actual call still goes through the real Agora Gateway — same allow-list, same fixed prompts, same audit log, same per-member rate limit. A tool-triggered call and a human-triggered call are, from the gateway's point of view, indistinguishable in every way that matters.

## 4. Metering for Mixed Sessions

A single harness conversation can involve several backend round-trips of genuinely different kinds. The rule is simple and follows directly from the routing design above: **each sub-call is billed by whichever gateway actually handled it.**

- General-model reasoning (deciding what to do, composing the final answer) — billed as ordinary general-purpose usage.
- Any Agora tool call made along the way — free, full stop, logged in the Agora audit trail, and never even reaches the credit-deduction logic.

A member using the harness sees both halves clearly: what they were charged for, and — separately, for transparency rather than billing purposes — which Agora functions were invoked on their behalf during the conversation.

## 5. Hardening Built Into the Gateway for This

Two gaps were identified and closed specifically because a harness can generate Agora calls faster and more often than a human clicking through a UI:

1. **Per-caller identity.** The gateway now records which member a call was made on behalf of, even when triggered by the harness rather than a direct human request — an untraceable Agora call is a real hole in the audit trail the whole system's credibility depends on.
2. **Rate limiting on the free path.** Free-by-constitutional-design never meant unlimited-by-design. A generous, per-member rate limit now bounds abuse and denial-of-service risk on the Agora Gateway, sized well above any realistic level of genuine governance participation.

## 6. What's Still Open

- **Ledger validation of governance references is not yet complete.** A request currently establishes itself as governance-scoped by supplying a proposal or deliberation identifier — the system does not yet independently confirm that identifier against the federation ledger's real, active records. This is the single most important piece of unfinished work in the routing design, and any output relying on it should be treated as illustrative, not fully authoritative, until it's closed.
- **Should a harness session be allowed to chain multiple Agora calls automatically** — for instance, pulling a deliberation summary and then immediately drafting a counter-proposal from it — or should a member need to see and confirm each step? There's a real case for either answer; this is a genuine open design question, not a settled one.
