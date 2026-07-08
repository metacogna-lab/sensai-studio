# Introducing the Agora System
### A Sensai Cooperative Document Set — Document 1 of 6

---

## What Is Sensai?

Sensai is a member-owned cooperative that hosts open source AI models on shared, self-owned infrastructure and funds that infrastructure through member subscriptions. Unlike a conventional AI vendor, Sensai isn't built to maximize return to outside investors — it's built to maximize the durability, transparency, and self-determination of the members who depend on it. Every member gets one vote, regardless of how much they pay in, and operating surplus is returned to members as a patronage dividend rather than extracted as profit.

## What Is the Agora System?

The Agora System is Sensai's governance-facing AI layer — a small, deliberately constrained set of AI capabilities built to help the cooperative govern itself well, alongside a general-purpose AI available for everyday chat and problem-solving. It has three parts:

1. **The four Agora functions** — a Deliberation Summarizer, an Argument Mapper, a Multilingual Bridge, and a Proposal Drafting Assistant — each constitutionally restricted to a narrow job, each free to use, and each built so that any member can audit whether it did that job fairly.
2. **A general-purpose AI** for chat and problem-solving — the actual subscription product members are paying for, running on the same self-hosted, open-weight infrastructure.
3. **An agentic harness** that lets the general-purpose AI call the Agora functions as tools mid-conversation — so a member can simply ask "what's the state of the debate on proposal X?" in ordinary conversation and get a real, audited Agora Deliberation Summary back, without needing to know a separate system exists.

## Why "Agora"?

In the city-states of ancient Greece, the *agora* was the open gathering place where citizens assembled to deliberate and decide things together — not a courtroom, not a throne room, a public square. The name is a deliberate statement of what this system is for: not to decide things on the cooperative's behalf, but to make it easier for members to decide things well, together.

## Why This Exists

Centralized AI vendors decide unilaterally how their models behave, who profits from them, and what changes without notice. Open source models remove the licensing problem, but someone still has to host them, pay for the compute, and decide how the whole thing is governed — and most attempts at that are either fragile single-operator projects or repackaged by a commercial reseller who's recreated the exact centralization problem open source was meant to solve.

Sensai is a cooperative answer to that gap. The Agora System is the part of that answer that takes seriously a harder question most AI-for-governance projects don't ask directly: **can an AI system actually help a community govern itself, in a way the community can verify rather than simply trust?**

## How This Document Set Is Organized

| Document | What it covers |
|---|---|
| **2 — Value Proposition** | Why this matters, and to whom, using a standard value-proposition framework |
| **3 — Architecture** | How the system is actually built, at a level a technical reviewer can evaluate |
| **4 — Product Requirements Document (PRD)** | What's being built, for whom, and how we'll know it's working |
| **5 — Cloud Resource Plan** | How the working prototype gets hosted and demonstrated, independent of cloud provider |
| **6 — AI Routing Design** | How the governance AI and the general-purpose AI coexist without either compromising the other |

Each document is written to stand on its own — read them in order for the full picture, or jump directly to whichever is relevant to your role in evaluating this project.
