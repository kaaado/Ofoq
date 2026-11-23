# Project Foundation & Governance — OFOQ (أفق)

## 1. Mission Overview

**OFOQ (أفق)** is an Algerian digital ecosystem created to bridge everyday family life and professional collaboration for children with autism and children experiencing communication or speech difficulties.

By connecting parents, qualified professionals, and children through individualized child workspaces (**Child Worlds**), Augmentative and Alternative Communication (AAC), goal-aligned activities, and educational resources, OFOQ ensures continuity of care and support.

This directory (`docs/00-project/`) establishes the foundational governance, decision records, cross-discipline terminology, and open questions driving the project forward.

---

## 2. Directory Artifacts

| Document | Purpose | Authority Level |
| :--- | :--- | :--- |
| [`OFOQ_PROJECT_DISCOVERY.md`](OFOQ_PROJECT_DISCOVERY.md) | **Primary Discovery Baseline** — Authoritative source of truth for product definition and scope | Supreme Source |
| [`project-context.md`](project-context.md) | Algerian cultural context, ecosystem problem, market opportunity, and hypotheses | Baseline Context |
| [`glossary.md`](glossary.md) | Standardized trilingual terminology (English, Français, العربية) | Domain Taxonomy |
| [`decision-log.md`](decision-log.md) | Architectural and Product Decision Records (ADRs & PDRs) | Decision Memory |
| [`open-questions.md`](open-questions.md) | Single authoritative tracker of unresolved product, technical, and operational questions | Issue Governance |
| [`openqst.md`](openqst.md) | Symbolic discoverability pointer ensuring lookup parity | Discoverability Pointer |

---

## 3. Governance Baseline & Rules

- **Primary Source of Truth:** [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](OFOQ_PROJECT_DISCOVERY.md). If conflicting documentation arises, the discovery baseline governs.
- **Language Policy:**
  - **English:** Primary technical, engineering, and architectural documentation language across the repository.
  - **Arabic (Native RTL) & French (LTR):** Primary languages for user-facing applications, copy, AAC cards, and educational content in Algeria.
- **Decision Taxonomy:**
  - `[CONFIRMED]`: Formally ratified by the Product Owner or explicitly decided in `OFOQ_PROJECT_DISCOVERY.md`.
  - `[PROPOSED]`: Recommended by product/engineering leadership; pending formal Product Owner sign-off.
  - `[ASSUMPTION]`: Unvalidated planning assumption requiring research, clinical review, or market evidence.
  - `[OPEN QUESTION]`: Pending formal decision, evidence, or consensus.
  - `[OUT OF SCOPE]`: Excluded from current project horizons.
  - `[FUTURE]`: Strategic backlog candidate for post-MVP horizons.

---

## 4. Current Phase Status

The project is currently in **Phase 00 (Discovery Baseline & Workspace Adaptation)**.
- Governance standards and engineering rules are active under [`.agent/`](../../.agent/README.md).
- Root documentation is synchronized with OFOQ product realities.
- The inherited `/web` application is isolated as an unvalidated scaffold under assessment.
- Phase 01 (Brand Identity & Design System) will commence only upon Product Owner sign-off on Phase 00 deliverables.
