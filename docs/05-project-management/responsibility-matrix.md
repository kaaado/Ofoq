# Responsibility Assignment Matrix (RACI) — OFOQ (أفق)

**Document Identifier:** `DOC-05-RACI`  
**Version:** 2.0.0  
**Context:** Digital Ecosystem for Autism, Speech Communication (AAC), Families & Professionals  
**Last Updated:** November 2026  

---

## 1. RACI Definitions

- **R (Responsible):** The role that performs the activity to achieve the deliverable.
- **A (Accountable):** The individual with final approval authority and veto power. Only one *Accountable* per task.
- **C (Consulted):** Domain experts whose inputs and feedback are sought prior to finalization.
- **I (Informed):** Stakeholders kept updated on progress and outcomes.

---

## 2. Project Governance Roles

1. **[PO / FOUNDER]:** Product Owner, business strategy, clinical partnerships, regulatory filings with ANPDP, user community management.
2. **[SOLUTIONS ARCHITECT]:** Technical lead, cloud infrastructure, pediatric data isolation, authorization boundaries, automated testing pipelines.
3. **[LEAD UI/UX DESIGNER]:** Visual identity, sensory-friendly design tokens, glassmorphism design system, 3D Spacetoon Child World metaphors, WCAG 2.1 AA accessibility.
4. **[CLINICAL ADVISOR]:** Speech-language pathologists (orthophonistes), special educators, AAC/CAA board structure, PECS methodology alignment.
5. **[COMPLIANCE / SEC AUDITOR]:** Defensive security, Law 18-07 privacy compliance, child profile isolation audits, cryptographic protection.

---

## 3. Governance & Phase Delivery Matrix

| Phase / Key Activity | PO / FOUNDER | ARCHITECT | DESIGNER | CLINICAL | AUDITOR |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Phase 00: Ecosystem Discovery & Role Separation** | **A** / R | R | C | C | C |
| **Phase 00: Architectural Governance & Non-Diagnostic Boundary** | **A** | R | I | C | **A** / R |
| **Phase 01: Refined Brand Palette & Identity Token System** | **A** | I | **A** / R | C | I |
| **Phase 01: Sensory-Friendly Glassmorphism Design Tokens** | C | I | **A** / R | C | I |
| **Phase 01: Multilingual Landing Page (AR, FR, EN Parity)** | C | **A** / R | R | I | C |
| **Phase 01: Final Acceptance Audit & Law 18-07 Wording** | **A** | R | C | I | **A** / R |
| **Phase 02: Family Account & Multiple Child Profiles** | C | **A** / R | R | C | C |
| **Phase 02: 3D Spacetoon-Inspired Child Worlds & AAC Explorer** | C | R | **A** / R | C | I |
| **Phase 02: Specialist Invitation & Granular Role Permissions** | **A** | R | C | C | C |
| **Phase 02: Usability Testing (5 Families, 3 Orthophonistes)** | **A** / R | I | R | C | I |
| **Phase 03: ANPDP Regulatory Formalities & Declarations** | **A** / R | C | I | I | R |
| **Phase 03: Supabase Dedicated Infrastructure & RLS Policies** | I | **A** / R | I | I | R |
| **Phase 03: Algiers & Blida Closed Pilot Cohort Deployment** | **A** / R | R | C | C | C |
| **Phase 04: National Rollout & Offline Mobile PWA** | **A** | **A** / R | R | C | C |
