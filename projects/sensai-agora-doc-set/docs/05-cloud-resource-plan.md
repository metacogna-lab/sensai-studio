# Agora System — Cloud Resource Plan for the Prototype
### A Sensai Cooperative Document Set — Document 5 of 6

*Working, syntax-validated Terraform and a shared bootstrap script implementing this plan already exist as a companion technical package. This document is the resource-planning narrative; that package is the runnable implementation.*

---

## 1. Purpose and Scope

This plan covers a **time-boxed, presentable prototype** deployment — not production hosting. Production favors self-owned or EU-sovereign dedicated infrastructure once real usage data justifies the investment; a prototype demo has different needs entirely (stand up fast, tear down cleanly, look credible to an audience of funders, partners, and prospective members). Hyperscalers are the right tool for that specific, narrow job.

## 2. The Independence Principle

Being genuinely "independent of cloud service provider" doesn't mean pretending AWS and GCP are the same platform — they aren't. It means keeping the provider-specific layer as thin as possible (just enough to provision a GPU virtual machine, a locked-down firewall, and a public IP) and putting everything that actually matters — the container stack, the Agora Gateway, the application behavior — in a single script that runs identically regardless of which cloud provisioned the machine under it. Switching providers becomes changing one configuration variable, not rebuilding anything.

## 3. Compute Sizing

The prototype needs a single GPU in the 24GB-VRAM class — enough to run a quantized ~24-32B open-weight model comfortably, with room for the supporting vector store and monitoring stack. This is a deliberately modest footprint; it is not a multi-GPU cluster problem at prototype scale.

| Requirement | AWS | GCP |
|---|---|---|
| Single 24GB-class GPU | g6.2xlarge (1x NVIDIA L4) | g2-standard-16 + 1x nvidia-l4 accelerator |
| Approx. on-demand cost (verify at deploy time) | ~$0.80-1.30/hr | ~$0.70/hr per GPU (confirmed, us-central1) |
| vCPU/RAM headroom for the full stack | 8 vCPU / 32GB — adequate | 16 vCPU / 64GB — more headroom |

## 4. The Critical Path Risk: GPU Quota

Both AWS and GCP default new accounts and projects to zero or near-zero GPU quota, and raising it is not instant. **This is the single most common reason a cloud demo slips its date.** Quota increase requests should go out 3-5 business days before any planned demo date, in parallel for both providers if the final choice isn't locked yet — the requests themselves are free, and having both approved preserves scheduling flexibility.

## 5. Cost Estimate

| Item | Estimate |
|---|---|
| GPU instance, ~8 hours (automatic shutdown built into the deployment script) | roughly $6-11 |
| Storage, networking | a few dollars at most for a demo-length run |
| **Typical total per demo session** | **under $15 in compute** |

An automatic shutdown after 8 hours is built directly into the deployment, not left as a reminder — the goal is that a forgotten instance can't quietly turn a $15 demo into a real ongoing expense.

## 6. Security Posture for a Demo

Scoped down from production, but not reckless:
- Access restricted to specific presenter/reviewer IP addresses — never left open to the public internet, even for a few hours.
- TLS on the demo endpoint from the start.
- No real subscription or payment data used in any demo scenario — seeded, obviously-synthetic accounts only.
- Real secrets injected via the cloud provider's own secrets manager at boot, not left as placeholder defaults.

## 7. AWS vs. GCP for This Specific Use Case

| Factor | AWS | GCP |
|---|---|---|
| Instance cost | Comparable, slightly higher per-hour typically | Slightly cheaper confirmed L4 rate |
| New-account credit | Varies by current promotion | $300 credit, 90-day window — often covers the entire demo cost outright |
| Best fit | Teams with an existing AWS relationship | A genuinely first-time demo account, given the credit |

**There is no strong technical reason to prefer one over the other.** Pick whichever cloud the team — or a presenting partner who wants to see it hosted on their own infrastructure — already has a billing relationship with.

## 8. Teardown Discipline

Every demo session ends with a full infrastructure teardown, not just a stopped instance — an idle GPU costs the same as a running one until it's actually destroyed. This is treated as a standard step in the demo runbook, not an optional cleanup task.

## 9. What's Already Built

A complete, syntax-validated implementation of this plan exists as a companion technical package, including:
- Parallel, minimal Terraform modules for AWS and GCP (provisioning only — no application logic).
- A single shared bootstrap script that installs the container runtime, GPU drivers, and the full Agora System stack identically on either cloud.
- A concrete demo scenario script exercising all four Agora functions against seeded, realistic deliberation content.

This document is the plan; that package is the implementation, ready to hand to an engineer to run.
