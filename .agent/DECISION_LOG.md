# Architectural & Product Decision Log — OFOQ (أفق)

This document records formal Architectural Decision Records (ADR) and Product Decision Records (PDR) governing the OFOQ platform.

---

## Decision Taxonomy & Lifecycle

- `CONFIRMED`: Formally ratified by the Product Owner or codified in the authoritative baseline [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](../docs/00-project/OFOQ_PROJECT_DISCOVERY.md).
- `PROPOSED`: Evaluated and recommended by engineering/product leadership; awaiting PO sign-off.
- `REJECTED`: Formally reviewed and declined.
- `DEFERRED`: Postponed to a future delivery phase or pending empirical validation.

---

### ADR-001: Three Account Roles and Multi-Child Architecture
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** The platform serves children with autism, their parents, and authorized specialists. A traditional model giving each end-user an independent login account fails because children may lack independent credentials, and parents require centralized management of multiple children.
- **Decision:** Establish exactly three platform account roles: **Admin**, **Pro (Professional)**, and **Parent**. A child is **not** an account role. A Parent owns one family account and manages multiple child profiles. Each child profile has an independent personalized workspace (**Child World**) nested within the parent account. Visual switching between child worlds is backed by strict server-side authorization.
- **Consequences:** Eliminates child credential management friction; models real-world parental guardianship; requires robust backend tenant isolation per child profile.

---

### ADR-002: Technology Neutrality for Operational Platform & Mobile App
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** The cloned repository contains an inherited web scaffold (`/web`) using React, Vite, and Tailwind CSS. Previous documents proposed Laravel REST API, PostgreSQL, and Flutter mobile apps.
- **Decision:** Explicitly enforce technology neutrality during Phase 00. The existing `/web` codebase is classified strictly as an inherited scaffold under assessment. Future operational backends (Laravel vs Node/NestJS) and mobile stacks (Flutter vs native) remain proposals subject to formal evaluation in Phase 03 based on local developer availability, offline AAC capabilities, and performance.
- **Consequences:** Prevents premature architectural lock-in; ensures prototype and validation precede heavy infrastructure investments.

---

### ADR-003: Child Data Isolation & Algerian Law 18-07 Privacy Standard
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** Data concerning children with autism, developmental milestones, communication habits, and family routines constitutes highly sensitive personal information under Algerian Personal Data Protection Law 18-07 (*Loi n° 18-07*).
- **Decision:** Enforce end-to-end data minimization, strict object-level authorization (prevention of IDOR/BOLA), and complete data isolation between child profiles. Professionals access only explicitly assigned children via revocable parent consent. Child information must never be exposed across public endpoints, search indexes, shared caches, or third-party tracking scripts.
- **Consequences:** Ensures defensive security and legal defensibility; adds authorization check overhead on every child resource access.

---

### ADR-004: Multilingual Parity & Native Arabic RTL Architecture
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** OFOQ addresses the Algerian market, which is multilingual: Modern Standard Arabic, Algerian Arabic (Derja), and French, with potential Tamazight considerations.
- **Decision:** Adopt a first-class bidirectional architecture. Arabic (RTL) is a primary language alongside French (LTR) and English (LTR). Layouts must use CSS logical properties (`start`, `end`, `ps-*`, `pe-*`), native directional font rendering (IBM Plex Sans Arabic), and bidirectional UI mirror support.
- **Consequences:** Prevents broken LTR-only layouts; ensures cultural naturalness and readability for Algerian families and specialists.

---

### ADR-005: Responsible AI Assistance Boundary & Context Isolation
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** AI assistance (such as activity recommendations or an optional child companion) offers personalization but carries high risks of hallucination, emotional dependency, or clinical overreach.
- **Decision:** AI features are strictly assistive and non-clinical. AI companion context must be completely isolated per child profile and disabled by default until explicit parent activation. The AI must never diagnose, prescribe therapy, simulate real-world human emotional bonds, or override professional treatment plans.
- **Consequences:** Mitigates ethical and safety hazards; guarantees parental control; requires dedicated per-child prompt and session management.

---

### PDR-001: Non-Diagnostic & Non-Medical Ecosystem Positioning
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** Positioning OFOQ as a medical or clinical tool would trigger stringent medical-device regulatory hurdles, clinical liabilities, and potential user distrust.
- **Decision:** OFOQ is positioned strictly as a **connected digital ecosystem** bridging family life and professional collaboration. It is **not** a medical device, diagnostic platform, or treatment prescription tool.
- **Consequences:** Clearly communicates product purpose; safeguards family expectations; fosters collaborative partnership with clinicians and speech therapists.

---

### PDR-002: Brand Visual Direction — Hybrid Logo & Balanced Tone
- **Date:** 2026-11-23
- **Status:** `CONFIRMED`
- **Context:** The brand must project both institutional credibility to professionals/clinics and warm accessibility to families and children.
- **Decision:** Formally adopt the **Hybrid logo direction** (interlocking horizon and connected individual worlds) and a **Balanced brand tone** (professional yet friendly and empathetic).
- **Consequences:** Provides clear creative guidance for Phase 01 design explorations; rejects childish cartoons and sterile medical symbols.

---

### PDR-003: Brand Color Palette Selection
- **Date:** 2026-11-23
- **Status:** `PROPOSED — PENDING PO APPROVAL`
- **Context:** Ten exploratory color directions were generated, including Deep Horizon teal (`#17464A`), Soft Sky (`#B5CDD0`), Warm Clay (`#C9826B`), and Champagne (`#D7BD82`).
- **Decision:** None of the exploratory palettes is currently ratified as official. Official color tokens and CSS variables remain unapproved pending formal Product Owner selection during Phase 01.
- **Consequences:** Color tokens cannot be hardcoded into UI components or design systems until formally selected.

---

### PDR-004: Commercial & Subscription Pricing Hypotheses
- **Date:** 2026-11-23
- **Status:** `PROPOSED — UNVALIDATED HYPOTHESIS`
- **Context:** Preliminary project documents suggested family tiers (1,500 DZD/month, 12,000 DZD/year) and professional tiers (5,000 DZD/month).
- **Decision:** Preserve these numbers strictly as unvalidated commercial hypotheses. No pricing or billing model is confirmed until willingness-to-pay and local payment channel (Edahabia/CIB/BaridiMob) feasibility are researched.
- **Consequences:** Prevents publishing unverified financial commitments in product and marketing documentation.
