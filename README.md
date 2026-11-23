# OFOQ (أفق)
> « لكل طفل أفقه الخاص » • *"Every child has their own horizon."* • *« Chaque enfant a son propre horizon. »*

[![Status](https://img.shields.io/badge/Status-Phase%2000%3A%20Discovery%20%26%20Governance-blue)](#)
[![Market](https://img.shields.io/badge/Market-Algeria%20(National)-orange)](#)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-B2C%20%26%20B2B-brightgreen)](#)
[![Brand%20Color%20Status](https://img.shields.io/badge/Brand%20Colors-Pending%20PO%20Approval-yellow)](#)

**OFOQ (أفق)** is a proposed Algerian digital ecosystem designed to connect children with autism and children experiencing communication or speech difficulties with their parents and qualified professionals.

OFOQ creates continuity between professional clinical/educational support and everyday family life through personalized child experiences, Augmentative and Alternative Communication (AAC), parent-specialist collaboration, family management, educational resources, and carefully governed AI assistance.

OFOQ is **not** a diagnostic instrument, clinical decision system, or medical treatment platform. It strictly excludes autonomous clinical prescriptions and medical diagnostics, and never replaces qualified professionals, clinical judgement, or human family relationships.

---

## 📑 Repository Navigation & Documentation Architecture

This repository is organized under a strict **documentation-first, governance-driven** structure:

```text
Ofoq/
├── README.md                                # Master repository entry point and index
├── .gitignore                               # Environment, OS, and tool ignores
│
├── .agent/                                  # Engineering & Operational Governance Hub
│   ├── README.md                            # Governance overview and rule authority
│   ├── RULES.md                             # Supreme agent rules and scope discipline
│   ├── APPROVALS.md                         # Phase gates, active stage, and sign-off matrix
│   ├── CURRENT_STATE.md                     # Fact baseline and active repository state
│   ├── ROADMAP.md                           # Delivery lifecycle (Phase 00–04)
│   ├── DECISION_LOG.md                      # ADRs and PDRs
│   ├── ENGINEERING_STANDARD.md              # Authoritative Three-Face Method
│   ├── QA_STANDARD.md                       # Multi-state UX, RTL/LTR parity, WCAG 2.1 AA
│   └── SECURITY_STANDARD.md                 # Child privacy, Law 18-07, and tenant isolation
│
├── .github/                                 # Collaboration & Quality Workflows
│   ├── ISSUE_TEMPLATE/                      # Standardized issue templates
│   │   ├── product_requirement.md           # PRD requirement template
│   │   ├── design_task.md                   # UI/UX design task template
│   │   └── engineering_task.md              # Software engineering task template
│   └── pull_request_template.md             # PR verification checklist
│
├── docs/                                    # Master Documentation System
│   ├── 00-project/                          # Project Foundation & Governance
│   │   ├── OFOQ_PROJECT_DISCOVERY.md        # Primary product discovery baseline (Source of Truth)
│   │   ├── overview.md                      # High-level mission and directory index
│   │   ├── project-context.md               # Algerian ecosystem, market context, and opportunity
│   │   ├── glossary.md                      # Trilingual terminology (EN • FR • AR)
│   │   ├── decision-log.md                  # Master Architectural & Product Decision Records
│   │   ├── open-questions.md                # Single authoritative open-questions tracker
│   │   └── openqst.md                       # Discoverability pointer to open-questions.md
│   │
│   ├── 01-product/                          # Product Management & Architecture
│   │   └── product.md                       # Master Product Specification & PRD Matrix
│   │
│   ├── 02-design/                           # [DEFERRED] UI/UX Design System (Phase 01)
│   ├── 03-prototype/                        # [DEFERRED] Interactive Prototype Spec (Phase 02)
│   ├── 04-mvp/                              # [DEFERRED] Functional MVP Architecture (Phase 03)
│   ├── 05-project-management/               # [DEFERRED] Project Delivery & RACI
│   ├── 06-references/                       # [DEFERRED] Reference Documentation
│   └── web/                                 # [DEFERRED] Web Documentation
│
└── web/                                     # Inherited Codebase Scaffold (Under Assessment)
```

---

## 🎯 Authoritative Master Documents

| Master Document | File Path | Focus & Primary Audience |
| :--- | :--- | :--- |
| **Discovery Baseline** | [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](docs/00-project/OFOQ_PROJECT_DISCOVERY.md) | Authoritative source of truth for product definition, scope, and direction |
| **Product Specification** | [`docs/01-product/product.md`](docs/01-product/product.md) | Vision, personas, 6 pillars, PRD requirement matrix (`PROD-001`+) |
| **Project Foundation** | [`docs/00-project/overview.md`](docs/00-project/overview.md) | Ecosystem overview, document hierarchy, and phase status |
| **Decision Log** | [`docs/00-project/decision-log.md`](docs/00-project/decision-log.md) | Ratified product decisions, approved architectural records, and proposals |
| **Open Questions Tracker** | [`docs/00-project/open-questions.md`](docs/00-project/open-questions.md) | Authoritative tracker for unresolved operational and product questions |
| **Domain Glossary** | [`docs/00-project/glossary.md`](docs/00-project/glossary.md) | Standardized trilingual terminology (English, Français, العربية) |

---

## 👥 Three Account Roles & Ecosystem Architecture

OFOQ has exactly **three platform account roles**:

1. **Admin:** Governs the platform, verifies professionals and centers, manages shared content libraries, reviews audit logs, and monitors system health.
2. **Pro (Professional):** Specialized educators, speech therapists (*orthophonistes*), psychomotor therapists, and centers who collaborate with parents, assign activities, contribute AAC vocabulary, and log observations for explicitly assigned children.
3. **Parent:** Owns a single **Family Account** and manages one or more **Child Profiles**. Controls professional authorizations, customizes home routines and familiar vocabulary, and accesses parent educational resources.

### The Family Account & Child World Model

> **A child is NOT an account role and does not require separate login credentials.**

```text
Family Account (Parent Owned)
  ├── Child Profile 1 ──> Independent Child World A (AAC, Activities, Themes, Pro Grants)
  ├── Child Profile 2 ──> Independent Child World B (AAC, Activities, Themes, Pro Grants)
  └── Child Profile 3 ──> Independent Child World C (AAC, Activities, Themes, Pro Grants)
```

- **Independent Personalized Spaces:** Each Child World maintains its own independent communication cards, personalized routines, activities, progress logs, and optional AI companion identity.
- **Parent-Controlled Switching:** Parents switch seamlessly between child worlds within their authenticated session.
- **Strict Server-Side Isolation:** Child worlds are logically and securely isolated in the backend database. Professional access is strictly scoped per child, never global across the family.

---

## 🏛️ The Six Functional Product Pillars

1. **Augmentative & Alternative Communication (AAC):** Pictogram boards, structured categories, customizable vocabulary, and high-clarity audio speech synthesis tailored to the Algerian linguistic context.
2. **Personalized Child Worlds:** Individualized, autism-friendly workspaces with sensory-conscious visuals, clear visual schedules, and low cognitive load.
3. **Family Management:** Centralized multi-child management, customizable home routines, family-contributed vocabulary, and progress history.
4. **Professional Collaboration:** Permission-governed child assignment, activity assignment, structured observation logging, and shared progress visibility between parents and therapists.
5. **Responsible AI-Assisted Personalization:** Controlled, assistive AI for routine suggestions and an optional child companion. Strictly non-clinical, isolated per child profile, and subject to parent activation.
6. **OFOQ Academy:** Structured educational resources, video guides, and articles for parents and professionals to foster continuous home/clinical learning.

---

## 🌐 Channels & Technical Scope

- **Web Platform:** Comprehensive portal for Professionals (activity assignment, progress reports, observation review), Administrators (governance, verification, content management), and Parents (family configuration and desktop Academy).
- **Mobile Application:** Optimized for daily family life and child interaction: parent family switcher, Child World mode, responsive AAC communication boards, activity execution, and audio playback.
- **Inherited Codebase Status:** The code in `/web` is an inherited scaffold from a prior project under architectural assessment. It is **not** an implemented OFOQ production application.
- **Technology Neutrality:** Architecture proposals (e.g. React/TypeScript on web, Flutter on mobile, Laravel REST API or Node/NestJS backend, PostgreSQL database) remain open for formal evaluation during Phase 03.

---

## 🔒 Security, Child Privacy & Legal Safeguards

- **Algerian Personal Data Protection Law 18-07 (*Loi n° 18-07*):** Child information, developmental milestones, and communication logs constitute highly sensitive personal data.
- **Tenant & Object-Level Isolation:** Every request to child data is verified server-side against parent ownership or an active, unrevoked professional assignment (preventing BOLA/IDOR).
- **Revocable Permissions:** Parents can grant, modify, or revoke professional access instantly.
- **Zero Secrets & Data Minimization:** No credentials in client bundles; zero collection of clinical diagnoses or sensitive health records on public forms.
- **AI Context Isolation:** No child data is shared across profiles or used to train public LLMs.

---

## 🎨 Brand Identity Status

- **Logo Direction:** **Approved (Hybrid)** — Interlocking horizon motif and connected individual worlds.
- **Brand Tone:** **Approved (Balanced)** — Professional, trustworthy, warm, empathetic, and accessible.
- **Brand Color Palette:** **UNAPPROVED / PENDING SELECTION.** Ten exploratory palette directions exist (including Deep Horizon teal, Soft Sky, Warm Clay, and Champagne), but **no official palette has been selected by the Product Owner**. Color tokens remain strictly classified as `[PROPOSED]` and must not be locked into production.

---

## 🚦 Current Phase & Development Status

| Phase | Description | Status |
| :--- | :--- | :---: |
| **Phase 00** | Discovery Baseline, Workspace Governance & Documentation Migration | 🔄 **ACTIVE** |
| **Phase 01** | Brand Identity Selection, Official Color Palette & Design Tokens | ⏸️ Awaiting PO Review |
| **Phase 02** | Interactive Prototype & Usability Validation (Closed-Loop Workflow) | ⏸️ Backlog |
| **Phase 03** | Functional MVP Engineering (Web/Mobile Apps, Auth, AAC Engine, Law 18-07) | ⏸️ Blocked Pending Phase 02 |
| **Phase 04** | Algiers Pilot Cohort & Advisory Launch | ⏸️ Backlog |

---

## 🛠️ Git & Contribution Guidelines

This repository follows strict Three-Face engineering governance. All contributions must originate on task branches, adhere to [`.github/pull_request_template.md`](.github/pull_request_template.md), and achieve independent sign-off across Software Architecture, Independent QA/UX, and Defensive Application Security.
