# OFOQ Product Decision Record & Open Questions Tracker

**Document Identifier:** `DOC-00-OPEN-QUESTIONS`  
**Primary Reference:** [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](OFOQ_PROJECT_DISCOVERY.md) (§18)  
**Consolidation Date:** November 23, 2026  
**Status:** `AUTHORITATIVE TRACKER OF UNRESOLVED QUESTIONS`  
**Governance Authority:** Product Owner & Lead System Architect  

---

## 1. Executive Summary

This document serves as the single authoritative registry for all unresolved product, operational, clinical, technical, and commercial questions facing the **OFOQ (أفق)** ecosystem.

Each open item is documented with its background context, operational options, architectural/UX impact, proposed direction (if evaluated), validation methodology, priority, and designated decision authority. In accordance with OFOQ governance, **no question is marked closed merely because a recommendation exists**; formal closure requires explicit Product Owner ratification.

---

## 2. Master Open Questions Registry (OQ-001 through OQ-014)

### OQ-001 — Target Age Range & Developmental Profiles for Launch
- **Category:** Product Scope / Target Users
- **Description:** What exact age bracket and developmental profiles will the initial OFOQ release target?
- **Why It Matters:** Visual hierarchy, AAC complexity, motor-skill tap targets, and cognitive load differ drastically between early intervention (ages 3–6), school-age children (ages 7–12), and adolescents (13+).
- **Possible Options:**
  - *Option A:* Focus strictly on early intervention (ages 3–6).
  - *Option B:* Support a core childhood bracket (ages 4–10) with scalable card grid densities (e.g. $2\times 2$ up to $4\times 4$).
  - *Option C:* Broad childhood through adolescence (ages 3–16).
- **Recommended Direction:** **Option B** — Target ages 4–10 for the prototype/MVP with configurable grid density.
- **Validation Method:** Consultation with speech therapists (*orthophonistes*) and pediatric educators in Algiers.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION (Recommendation Pending PO Approval)`
- **Decision Owner:** Product Owner & Clinical Advisory Lead

---

### OQ-002 — Diagnostic Scope: Autism Only vs Broader Communication Difficulties
- **Category:** Clinical Scope / Brand Positioning
- **Description:** Should OFOQ position itself exclusively for autism spectrum conditions, or encompass children with broader speech, language, and communication delays?
- **Why It Matters:** Governs marketing positioning, AAC vocabulary breadth, SEO, clinical partnerships, and parent perception.
- **Possible Options:**
  - *Option A:* Position exclusively as an autism-specialized ecosystem.
  - *Option B:* Position as an ecosystem for autistic children and children with speech and communication difficulties.
  - *Option C:* Position broadly for all pediatric cognitive and developmental challenges.
- **Recommended Direction:** **Option B** — Serves autistic children while naturally supporting speech delays, dysphasia, and non-verbal children without stigmatizing labels.
- **Validation Method:** Clinical review with local specialized centers and parent associations.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION (Recommendation Codified in Discovery Baseline)`
- **Decision Owner:** Product Owner

---

### OQ-003 — Linguistic Scope & Phased Language Rollout in Algeria
- **Category:** Localization / UX
- **Description:** Which languages and dialects will be supported at launch, and what is the phased rollout sequence?
- **Why It Matters:** Dictates text-to-speech (TTS) engine integration, pictogram labeling, metadata search, and user onboarding copy.
- **Possible Options:**
  - *Option A:* Modern Standard Arabic (MSA) only.
  - *Option B:* Bilingual MSA and French at launch, with Algerian Arabic (Derja) vocabulary audio support.
  - *Option C:* Trilingual launch including Tamazight alongside Arabic and French.
- **Recommended Direction:** **Option B** — MSA and French interface parity with curated Derja audio recordings for familiar household items and daily routines.
- **Validation Method:** Usability testing with Algerian parent cohorts across Algiers, Oran, and Constantine.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Lead UX Designer

---

### OQ-004 — Professional Categories & Credential Verification Process
- **Category:** Operations / Trust & Safety
- **Description:** Which professional disciplines may register as `Pro` accounts, and what is the verification protocol?
- **Why It Matters:** Directly impacts platform liability, professional credibility, and parent trust in shared observations.
- **Possible Options:**
  - *Option A:* Speech-language therapists (*orthophonistes*) only.
  - *Option B:* Multidisciplinary practitioners (speech therapists, psychomotor therapists, special educators, clinical psychologists) verified via state diploma/license upload and manual administrative review.
  - *Option C:* Open registration with self-declaration.
- **Recommended Direction:** **Option B** — Multidisciplinary verified practitioners with mandatory manual administrative review before account activation.
- **Validation Method:** Review of Algerian Ministry of Health / National Education professional licensing standards.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Operations Lead

---

### OQ-005 — Professional Provider Model: Independent Practitioners vs Centers
- **Category:** Business Architecture / B2B Model
- **Description:** Does OFOQ contract with independent private practitioners, specialized centers/clinics, or both?
- **Why It Matters:** Multi-seat billing, staff turnover, patient record transferability, and enterprise admin dashboards depend on this entity model.
- **Possible Options:**
  - *Option A:* Independent practitioners only.
  - *Option B:* Specialized centers and private clinics only (organizational accounts).
  - *Option C:* Hybrid model supporting individual Pro accounts and Center organizational accounts with multi-practitioner rosters.
- **Recommended Direction:** **Option C** (Phased: individual Pros in MVP, Center organizational accounts in Phase 04).
- **Validation Method:** B2B interviews with directors of private therapy centers in Algiers.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Solution Architect

---

### OQ-006 — Parent-Professional Communication Channels & Operational Boundaries
- **Category:** Product Workflow / Operations
- **Description:** What real-time communication mechanisms will exist between parents and professionals within OFOQ?
- **Why It Matters:** Open 24/7 direct chat leads to professional burnout and boundary violations; absence of communication creates coordination friction.
- **Possible Options:**
  - *Option A:* Asynchronous structured updates only (activity assignments, observation notes, formal reports) with no direct chat.
  - *Option B:* Unrestricted real-time instant messaging.
  - *Option C:* Structured communication with office-hours messaging, pre-defined subject tags, and appointment booking links.
- **Recommended Direction:** **Option A** for MVP (structured observations & activity feedback only) to protect therapist time and enforce focused clinical tracking.
- **Validation Method:** Survey of practicing speech therapists on communication boundary preferences.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Product Manager

---

### OQ-007 — AAC Pictogram Asset Pipeline, Licensing & Audio Synthesis
- **Category:** Technical Architecture / AAC Engine
- **Description:** What is the authoritative source for AAC pictograms, what are the licensing terms, and how is speech audio generated?
- **Why It Matters:** Copyright infringement risks, visual consistency, local cultural relevance, and voice quality for Algerian Arabic.
- **Possible Options:**
  - *Option A:* License an established symbol library (e.g. ARASAAC under Creative Commons, Mulberry, or commercial open symbols).
  - *Option B:* Commission a bespoke OFOQ proprietary pictogram library.
  - *Option C:* Hybrid: Use ARASAAC as foundational library, supplemented by bespoke Algerian cultural pictograms and custom parent/pro photo uploads.
- **Recommended Direction:** **Option C** — ARASAAC foundation + custom cultural cards + private photo upload pipeline.
- **Validation Method:** Legal license review (CC BY-NC-SA compliance) and clinical validation of symbol clarity.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Lead Solution Architect & Product Owner

---

### OQ-008 — Offline Resilience & Critical Feature Availability
- **Category:** Technical Architecture / Mobile
- **Description:** Which features must function seamlessly without an active internet connection?
- **Why It Matters:** Mobile connectivity in Algerian schools, clinical cabinets, or transit can be intermittent. A child must never lose their voice due to a network drop.
- **Possible Options:**
  - *Option A:* Online-only web and mobile app.
  - *Option B:* Offline AAC communication board and daily routine playback with local caching; background synchronization for observations and progress events.
  - *Option C:* Full offline peer-to-peer mesh synchronization.
- **Recommended Direction:** **Option B** — Local SQLite/caching for core AAC grids and audio; async queue for telemetry and progress logging.
- **Validation Method:** Field testing on 3G/4G networks in suburban Algiers wilayas.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Lead Solution Architect & Mobile Lead

---

### OQ-009 — AI Companion Inclusion: Prototype vs MVP vs Future Horizon
- **Category:** Product Strategy / AI Safety
- **Description:** At what phase should the child AI companion be introduced to real users?
- **Why It Matters:** High regulatory, ethical, and developmental scrutiny regarding AI interactions with autistic children.
- **Possible Options:**
  - *Option A:* Include conversational AI companion in the initial MVP release.
  - *Option B:* Present AI companion conceptually in the Phase 02 prototype; defer implementation to a post-MVP controlled release following clinical trial.
  - *Option C:* Exclude conversational AI entirely; restrict AI strictly to administrative recommendation heuristics.
- **Recommended Direction:** **Option B** — Conceptual prototype demonstration with explicit safety controls; post-MVP implementation under clinical supervision.
- **Validation Method:** Ethics review and parent willingness assessment.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Application Security Lead

---

### OQ-010 — Commercial Subscription Model, Pricing & Payment Infrastructure
- **Category:** Business Model / Monetization
- **Description:** What are the ratified subscription rates in Algerian Dinars (DZD) and how will payments be collected?
- **Why It Matters:** Determines financial sustainability, cash flow, and barrier to entry for Algerian families and professionals.
- **Possible Options:**
  - *Option A:* Lock in previously proposed pricing (1,500 DZD/month B2C; 5,000 DZD/month B2B) via Edahabia/CIB electronic payment gateways.
  - *Option B:* Freemium model (Free essential AAC board; paid premium for multi-child sync, unlimited Pro collaboration, and Academy courses).
  - *Option C:* Hybrid model combining B2C freemium with B2B enterprise center licensing and offline annual scratch vouchers (carte de recharge).
- **Recommended Direction:** **Option B/C** — Core communication tools accessible free/low-cost; monetize advanced multi-child collaboration and B2B center workspaces.
- **Validation Method:** Commercial willingness-to-pay study and SATIM / Algérie Poste API feasibility test.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION (Preserved as Unvalidated Hypothesis)`
- **Decision Owner:** Product Owner & Commercial Lead

---

### OQ-011 — Data Hosting, Retention & Algerian Law 18-07 Compliance
- **Category:** Legal / Infrastructure Security
- **Description:** Where will sensitive child developmental and communication data be physically hosted, and what are the retention/deletion policies?
- **Why It Matters:** Algerian Law 18-07 restricts cross-border transfer of sensitive personal data without national data protection authority (*ANPDP*) authorization.
- **Possible Options:**
  - *Option A:* International cloud hosting (e.g. AWS EU / OVH France) with client-side encryption.
  - *Option B:* Local Algerian sovereign data center hosting (e.g. Algérie Télécom / Djezzy / Ooredoo enterprise cloud).
  - *Option C:* Hybrid: Local storage for sensitive child PII and identity records; international CDN for static public assets and generic pictograms.
- **Recommended Direction:** **Option C** — Hybrid architecture evaluated with legal counsel regarding ANPDP compliance.
- **Validation Method:** Formal legal consultation with qualified Algerian privacy attorney.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Lead Architect & Legal Counsel

---

### OQ-012 — Clinical Advisory Board & Content Validation Process
- **Category:** Governance / Clinical Integrity
- **Description:** How are educational resources, parent guides, and activity templates in OFOQ Academy formally validated for clinical accuracy?
- **Why It Matters:** Prevents dissemination of pseudoscientific, harmful, or unvalidated autism interventions.
- **Possible Options:**
  - *Option A:* Internal team curation without external validation.
  - *Option B:* Formal Clinical & Pedagogical Advisory Committee (composed of Algerian speech therapists, university researchers, and child psychiatrists) reviewing all published materials.
  - *Option C:* User-generated community content with post-publication moderation.
- **Recommended Direction:** **Option B** — Formal advisory review board with clear editorial criteria.
- **Validation Method:** Establishing advisory partnerships with Algerian university hospital departments (*CHU*) and licensed practitioner associations.
- **Priority:** `P1`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & Medical/Pedagogical Advisor

---

### OQ-013 — Official Brand Color Palette Selection & Design System Tokens
- **Category:** Brand Identity / Design System
- **Description:** Which color palette direction will be formally ratified by the Product Owner as the official OFOQ design system?
- **Why It Matters:** Unlocks Phase 01 design tokens, CSS variables, high-fidelity wireframes, and accessible UI theme configurations.
- **Current Status:** **Ten exploratory palette directions exist. NO official palette has been selected by the Product Owner.** The exploratory "Deep Horizon" palette (`#17464A`, `#B5CDD0`, `#C9826B`, `#D7BD82`) is currently classified as `[PROPOSED]`.
- **Possible Options:**
  - *Option A:* Ratify the "Deep Horizon / Warm Clay" palette following WCAG 2.1 AA accessibility and contrast validation.
  - *Option B:* Select an alternative exploratory palette from the 10 developed directions.
  - *Option C:* Commission a refined palette based on autism-friendly sensory feedback.
- **Recommended Direction:** Product Owner formal selection during Phase 01 gate review.
- **Validation Method:** Sensory and contrast audit ($\ge 4.5:1$ text contrast, no overstimulating tones).
- **Priority:** `P0 (Gate 00 -> Phase 01 Blocker)`
- **Status:** `OPEN QUESTION (Awaiting Product Owner Decision)`
- **Decision Owner:** Product Owner

---

### OQ-014 — Interactive Prototype Demonstration Narrative & Scenarios
- **Category:** Prototype Specification / Validation
- **Description:** What specific multi-role user journey scenario will be demonstrated in the Phase 02 clickable Figma prototype?
- **Why It Matters:** Governs the exact 16–20 screens to design, fictional persona scripts, and usability testing success criteria.
- **Possible Options:**
  - *Option A:* Standalone child AAC communication board demo only.
  - *Option B:* Closed-loop ecosystem narrative: Parent creates Family Account $\rightarrow$ Sets up 2 Child Profiles $\rightarrow$ Authorizes Specialist for Child A $\rightarrow$ Specialist assigns activity $\rightarrow$ Child completes AAC communication card $\rightarrow$ Observation logged and reviewed.
  - *Option C:* Comprehensive end-to-end prototype including billing, academy, and admin back-office.
- **Recommended Direction:** **Option B** — Proves the core unique value proposition (one family account, multi-child isolation, permission-based collaboration).
- **Validation Method:** Usability testing session with 5 Algerian families and 3 speech therapists.
- **Priority:** `P0`
- **Status:** `OPEN QUESTION`
- **Decision Owner:** Product Owner & UX Lead
