# Project Risk Register — OFOQ (أفق)

**Document Identifier:** `DOC-05-RISKS`  
**Version:** 2.0.0  
**Context:** Digital Ecosystem for Autistic Children, Speech Support, Parents & Specialists  
**Last Updated:** November 2026  

---

## 1. Risk Assessment Methodology

- **Probability (P):** Low (1), Medium (2), High (3)
- **Impact (I):** Low (1), Medium (2), High (3)
- **Severity Score:** $P \times I$ (Scale: 1–9)
  - **1–2 (Low):** Managed through routine development guidelines.
  - **3–4 (Medium):** Requires documented mitigation and designated owner.
  - **6–9 (High / Critical):** Architectural or regulatory blocker; requires automated controls and approval gates.

---

## 2. Active Risk Register

| Risk ID | Category | Description | Prob (1-3) | Impact (1-3) | Severity (1-9) | Mitigation Strategy | Owner | Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| **`OFOQ-RSK-001`** | **Data Privacy & Law 18-07** | Inadvertent non-compliance with Algerian Law 18-07 regarding sensitive pediatric data. | 2 | 3 | **6 (High)** | Data minimization by design; zero collection of medical diagnoses or clinical history; parental consent required; formal ANPDP filing prior to operational launch. | Security Auditor / PO | `ACTIVE` |
| **`OFOQ-RSK-002`** | **Clinical Scope Boundary** | Misperception of OFOQ as a medical diagnostic tool or automated autism severity scorer. | 2 | 3 | **6 (High)** | Prominent non-diagnostic notices across all views; explicit terms stating OFOQ is an educational and communication bridge; exclusion of medical prescriptions. | PO / Clinical Advisor | `ACTIVE` |
| **`OFOQ-RSK-003`** | **Child World Isolation** | Data leakage between siblings or unauthorized specialist access to a sibling's profile. | 1 | 3 | **3 (Medium)** | Strict server-side authorization: child profiles are isolated entities; specialist tokens scoped per child with instant parental revocation. | Solutions Architect | `ACTIVE` |
| **`OFOQ-RSK-004`** | **Sensory & Visual Overload** | Flashing animations, aggressive contrast, or loud sounds causing sensory distress for neurodivergent children. | 2 | 3 | **6 (High)** | Autism-friendly sensory guidelines; soft porcelain (`#F5F6F3`) backgrounds; muted tones; no sudden audio; optional sound toggles; gentle motion transitions. | Lead UI/UX Designer | `ACTIVE` |
| **`OFOQ-RSK-005`** | **AI Safety & Hallucination** | AI companion generating unverified therapeutic recommendations or inappropriate responses. | 2 | 3 | **6 (High)** | AI scoped strictly to supervised activity suggestions and conversational practice; hardcoded safety guardrails; zero diagnostic capability; parental lock on all AI interactions. | Solutions Architect / AI Lead | `ACTIVE` |
| **`OFOQ-RSK-006`** | **Linguistic & Cultural Fit** | Standard TTS engines sounding unnatural or failing to support Algerian Arabic (Derja) everyday terms. | 2 | 2 | **4 (Medium)** | Hybrid audio engine: high-quality Modern Standard Arabic and French TTS combined with human-curated audio recordings of Algerian Derja everyday words. | Clinical / Audio Lead | `ACTIVE` |
| **`OFOQ-RSK-007`** | **Public Data Collection** | Public landing page forms sending waitlist data to unconfigured or inherited databases. | 1 | 3 | **3 (Medium)** | Decoupled inherited AMANA database; dedicated OFOQ Supabase project configured with Row Level Security (RLS) before public marketing campaigns. | Solutions Architect | `MONITORED` |
| **`OFOQ-RSK-008`** | **Accessibility Barriers** | Parents or specialists facing usability friction on low-end mobile devices or weak internet connections. | 2 | 2 | **4 (Medium)** | Progressive Web App (PWA) architecture; local caching of child AAC pictograms; optimized bundle size ($<250\text{ kB}$ gzip); WCAG 2.1 AA contrast compliance. | Lead Frontend Engineer | `ACTIVE` |
