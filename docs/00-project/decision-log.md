# Project Decision Log (ADR & PDR) — OFOQ (أفق)

This document tracks all formal Product Decision Records (PDR) and Architectural Decision Records (ADR) governing the OFOQ ecosystem.

## Status Legend
- `[CONFIRMED]`: Directly codified in [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](OFOQ_PROJECT_DISCOVERY.md) or formally ratified by the Product Owner.
- `[PROPOSED]`: Recommended by product/engineering leadership; pending formal Product Owner sign-off.
- `[REJECTED]`: Considered and explicitly rejected.
- `[DEFERRED]`: Postponed to a future delivery phase or pending empirical research.

---

### DEC-001: Connected Digital Ecosystem & Strict Non-Diagnostic Boundary
- **Category:** Product Scope / Legal Boundary
- **Status:** `[CONFIRMED]`
- **Context:** Applications serving children with autism often face regulatory scrutiny regarding whether they act as clinical diagnostic tools or medical devices.
- **Decision:** OFOQ is explicitly defined as a **connected digital ecosystem** bridging family life and professional collaboration. It strictly excludes medical diagnosis, automated clinical scoring, treatment prescription, and claims to replace therapists or human relationships.
- **Consequences:** Eliminates clinical liability; clarifies product purpose for Algerian health authorities; builds trust with speech therapists and medical practitioners.
- **Date:** 2026-11-23

---

### DEC-002: Three Platform Account Roles & Multi-Child Family Model
- **Category:** System Architecture / IAM
- **Status:** `[CONFIRMED]`
- **Context:** Requiring autistic or young children to maintain separate login credentials (passwords, 2FA) creates insurmountable friction and fails to reflect real-world parental guardianship.
- **Decision:** Establish exactly three platform account roles: **Admin**, **Pro (Professional)**, and **Parent**. A child is **not** an account role. A Parent owns a single Family Account and can create and manage multiple Child Profiles.
- **Consequences:** Simplifies authentication; enables parents with multiple children to manage all profiles under one subscription; requires backend architecture to enforce child profile isolation.
- **Date:** 2026-11-23

---

### DEC-003: Child World Concept — Nested Workspaces without Child Credentials
- **Category:** UX Architecture / Conceptual Model
- **Status:** `[CONFIRMED]`
- **Context:** Children need personalized, non-intimidating, and sensory-friendly digital environments tailored to their developmental pace.
- **Decision:** Each child profile is paired with an independent, personalized **Child World** nested within the parent's authenticated account. Parents switch visually between child worlds without signing out. Each Child World maintains its own communication boards, activities, visual preferences, and optional AI persona.
- **Consequences:** Visual switching is not a security perimeter; strict backend authorization must ensure child data is isolated and cannot be accessed across profiles.
- **Date:** 2026-11-23

---

### DEC-004: Permission-Governed Professional Collaboration Model
- **Category:** Product Workflow / Authorization
- **Status:** `[CONFIRMED]`
- **Context:** Professionals (speech therapists, specialized educators) need to contribute activities and observe progress, but parents must retain ultimate ownership over their child's sensitive records.
- **Decision:** Professional access is strictly permission-governed and requires explicit parent authorization. Professionals only see children explicitly assigned to them. Parents can grant granular permissions (view progress, assign activities, edit vocabulary) and revoke access at any time.
- **Consequences:** Prevents unauthorized clinical data sharing; establishes a secure B2B2C collaboration model; mandates detailed audit logging.
- **Date:** 2026-11-23

---

### DEC-005: Sensitive Child Data Protection & Algerian Law 18-07 Privacy Baseline
- **Category:** Defensive Security / Privacy
- **Status:** `[CONFIRMED]`
- **Context:** Developmental histories, speech recordings, and behavior logs of children are sensitive personal data under Algerian Personal Data Protection Law 18-07 (*Loi n° 18-07*).
- **Decision:** Enforce strict data minimization, zero client-side secrets, affirmative parental consent, and backend object-level authorization (preventing BOLA/IDOR). Child data must never be exposed on public endpoints, indexed in search engines, or used to train third-party AI models.
- **Consequences:** Guarantees regulatory compliance and parent peace of mind; requires rigorous authorization testing on every API endpoint.
- **Date:** 2026-11-23

---

### DEC-006: Brand Identity Direction — Hybrid Logo & Balanced Tone Ratified
- **Category:** Brand Identity
- **Status:** `[CONFIRMED]`
- **Context:** The brand must appeal both to institutions/clinics (demanding professional rigor) and families/children (demanding warmth and accessibility).
- **Decision:** Ratify the **Hybrid logo direction** (interlocking horizon and connected individual worlds) and the **Balanced brand tone** (professional credibility combined with friendly empathy). Reject cliché puzzle pieces, medical crosses, or infantilizing cartoon aesthetics.
- **Consequences:** Establishes clear creative guidance for Phase 01 design specifications.
- **Date:** 2026-11-23

---

### DEC-007: Official Brand Color Palette Ratification
- **Category:** Design System
- **Status:** `[CONFIRMED]`
- **Context:** Following the Phase 01 brand identity review, the official OFOQ brand color palette was evaluated and approved by the Product Owner.
- **Decision:** Formally ratify the authoritative five-color palette:
  - **Midnight Navy (`#172B46`):** Primary brand, authority, typography, dark surfaces.
  - **Cloud Blue (`#A9C5D8`):** Secondary brand, open backgrounds, calm surfaces.
  - **Muted Coral (`#D58C7A`):** Human warmth, highlights, selected accents.
  - **Soft Gold (`#D8BE83`):** Premium details, achievement, subtle emphasis.
  - **Porcelain (`#F5F6F3`):** Main light canvas background, breathing space.
- **Consequences:** Establishes fixed chromatic anchors; unlocks design tokens, CSS variables, and landing page adaptation; forbids replacing or reinterpreting the approved hex values.
- **Date:** 2026-11-23

---

### DEC-008: Technology Neutrality for Operational Platform & Mobile App
- **Category:** Software Architecture
- **Status:** `[CONFIRMED]`
- **Context:** The repository contains an inherited `/web` scaffold using React, Vite, and Tailwind CSS. Previous exploratory documents suggested Laravel REST API, PostgreSQL, and Flutter mobile apps.
- **Decision:** Enforce technology neutrality during Phase 00. The inherited `/web` code is classified strictly as an unvalidated scaffold under assessment. Future operational backend and mobile technologies remain proposed options to be evaluated on their merits (performance, offline AAC capability, local Algerian talent pool) in Phase 03.
- **Consequences:** Prevents premature engineering commitments before user workflows and prototype testing are completed.
- **Date:** 2026-11-23

---

### DEC-009: Commercial Subscription Tiers & Pricing Model
- **Category:** Business Model
- **Status:** `[PROPOSED — UNVALIDATED HYPOTHESIS]`
- **Context:** Preliminary planning documents proposed B2C family subscriptions (1,500 DZD/month, 12,000 DZD/year) and B2B professional subscriptions (5,000 DZD/month).
- **Decision:** Retain these figures strictly as unvalidated commercial hypotheses. Do not present them as approved prices in marketing copy, pitch materials, or application specifications until willingness-to-pay and payment gateway integrations are validated.
- **Consequences:** Maintains financial discipline; avoids making unverified commercial claims.
- **Date:** 2026-11-23

---

### DEC-010: Responsible AI Companion Safety & Context Isolation Boundary
- **Category:** Artificial Intelligence / Child Safety
- **Status:** `[CONFIRMED]`
- **Context:** An AI companion can assist with conversational practice and routine encouragement, but risks child overdependence, hallucination, or inappropriate responses.
- **Decision:** The AI companion is an optional, assistive feature that is disabled by default. It requires explicit parental opt-in. Its prompt context and memory must be strictly isolated per child profile. The AI is strictly barred from offering diagnostic advice, clinical feedback, simulating real-world emotional bonds, or overriding therapist plans.
- **Consequences:** Ensures child safety and parent sovereignty; requires strict guardrail prompt engineering and content filtering.
- **Date:** 2026-11-23
