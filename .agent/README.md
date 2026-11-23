# OFOQ Agent Governance Directory (`.agent/`)

Welcome to the engineering, architectural, and operational governance hub for **OFOQ (أفق)**.

All AI agents, autonomous sessions, software engineers, product managers, and system contributors working in this repository must read, understand, and adhere to the governance rules defined here.

---

## 1. Purpose of this Directory

The `.agent/` directory establishes strict, traceable engineering standards, approval gates, architectural records, and multi-perspective quality reviews for OFOQ. It enforces:

- **No Task = No Implementation:** Strict prohibition against unapproved coding, premature scaffolding, unverified database migrations, or dependency additions.
- **The Three-Face Engineering Method:** Mandatory independent evaluations across:
  1. *Face 1 — Software Architecture & Engineering* (Domain integrity, maintainability, contracts, correctness).
  2. *Face 2 — Independent QA, UX & DevOps* (Multi-device UX, accessibility, Arabic RTL/LTR parity, performance, deployment health).
  3. *Face 3 — Defensive Application Security* (Algerian Law 18-07 privacy, sensitive child data isolation, permission-based collaboration, zero-trust boundaries).
- **Ecosystem Boundaries & Non-Diagnostic Rule:** Strict boundary establishing that OFOQ is a connected digital ecosystem for children, families, and professionals. It is **not** a diagnostic tool, does not prescribe clinical therapies, and never replaces qualified professionals, clinical judgement, or human relationships.
- **Family Account & Child World Architecture:** Architectural model where a Parent owns one family account and manages multiple Child Profiles. Each child has an independent, personalized Child World nested within the parent account. A child is **not** an independent account role.
- **Data Protection & Legal Safeguards:** Uncompromising compliance with Algerian Personal Data Protection Law 18-07 (*Loi n° 18-07*), strict per-child data isolation, affirmative consent, and least-privilege role-based access.
- **Inherited Codebase Boundary:** The existing `/web` directory contains inherited code from a prior project and is strictly classified as a scaffold under assessment. No assumptions regarding its production readiness or architecture may be made.

---

## 2. Document Hierarchy & Authority

The governance documents in this directory are organized hierarchically:

| Document | Authority Level | Primary Focus |
| :--- | :--- | :--- |
| [`.agent/RULES.md`](RULES.md) | **Supreme Rule** | Scope control, approval gates, verification discipline, child data safeguards |
| [`.agent/ENGINEERING_STANDARD.md`](ENGINEERING_STANDARD.md) | **Methodology** | Authoritative Three-Face Method (Architect, QA/DevOps, Security) |
| [`.agent/APPROVALS.md`](APPROVALS.md) | **Gate Governance** | Active phase, authorized scope, phase exit criteria, decision records |
| [`.agent/CURRENT_STATE.md`](CURRENT_STATE.md) | **Fact Baseline** | Verified repository snapshots, test results, active phase, known issues |
| [`.agent/ROADMAP.md`](ROADMAP.md) | **Lifecycle Plan** | Phase breakdown, milestones, and formal delivery gates (Phase 00–04) |
| [`.agent/DECISION_LOG.md`](DECISION_LOG.md) | **Decision Memory** | Architectural & Product Decision Records (ADRs & PDRs) |
| [`.agent/SECURITY_STANDARD.md`](SECURITY_STANDARD.md) | **Defense in Depth** | Defensive security, child privacy, Law 18-07, permission boundaries |
| [`.agent/QA_STANDARD.md`](QA_STANDARD.md) | **Quality & UX** | Multi-device UX, RTL/LTR parity, WCAG 2.1 AA, AAC accessibility |

---

## 3. Strict Operating Guardrails for All Agents

1. **Always Inspect First:** Run CLI checks and inspect files before modifying or making assumptions.
2. **Honor the Authoritative Baseline:** [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](../docs/00-project/OFOQ_PROJECT_DISCOVERY.md) is the primary product discovery reference. Distinguish confirmed decisions, proposed directions, assumptions, and open questions.
3. **Preserve Scope Boundaries:** Work strictly within authorized phases and file sets. Never modify out-of-scope directories (`docs/02-design/`, `docs/03-prototype/`, `docs/04-mvp/`, `docs/05-project-management/`, `docs/06-references/`, `docs/web/`, `web/`) without explicit task authorization.
4. **Three Account Roles Only:** Exactly **Admin**, **Pro (Professional)**, and **Parent**. A child is never an independent account role.
5. **Brand Design Colors Unapproved:** Do NOT invent, assume, or hardcode an official brand palette. Color tokens remain unapproved pending formal Product Owner selection.
6. **Preserve User Work & Zero Data Loss:** Never execute destructive git operations, discard uncommitted edits, or overwrite user files without authorization.
7. **No Unsupported Claims:** Never mark unverified tasks as verified. Distinguish proposals from validated implementations.
