# Source Documents & Regulatory References — OFOQ (أفق)

**Document Identifier:** `DOC-06-REFERENCES`  
**Version:** 2.0.0  
**Context:** Clinical, Regulatory & Architectural Sources of Truth  
**Last Updated:** November 2026  

---

## 1. Primary Product Baseline

- **Document Title:** *OFOQ Project Discovery: Authoritative Product Discovery Baseline*
- **File Location:** [`docs/00-project/OFOQ_PROJECT_DISCOVERY.md`](../00-project/OFOQ_PROJECT_DISCOVERY.md)
- **Status:** Ratified Source of Truth (Phase 00)
- **Key Concepts Extracted:**
  - Exactly three account roles: **Admin**, **Professional (Pro)**, **Parent**.
  - A child is **not** an account role; child profiles inhabit independent **Child Worlds** inside the parent's authenticated account.
  - Multi-child family accounts with complete data isolation across siblings.
  - Collaborative bridge between clinical speech therapy sessions and everyday family routines.
  - Non-diagnostic boundary: strictly excludes clinical diagnostics, prescriptions, or severity scoring.

---

## 2. Regulatory & Legal Framework (Algerian Law 18-07)

- **Legislation:** Law No. 18-07 of 25 Ramadhan 1439 corresponding to June 10, 2018 (*Loi n° 18-07 relative à la protection des personnes physiques dans le traitement des données à caractère personnel*).
- **Competent Regulatory Body:** National Authority for the Protection of Personal Data (**ANPDP** / *السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي*).
- **Core Principles Applied to OFOQ:**
  1. **Principle of Strict Minimization (Art. 7):** Only data strictly necessary for communication and educational coordination is collected (full name, phone/email, wilaya, profile interests).
  2. **Sensitive Pediatric Data Protection (Art. 8 & 9):** Medical records, clinical diagnostics, psychometric scores, and national identification numbers are strictly excluded from the platform.
  3. **Parental Consent & Sovereignty (Art. 10 & 14):** Explicit parental authorization is required prior to profile creation or specialist invitation. Consent can be revoked instantly at any time.
  4. **Right to Erasure & Rectification (Art. 34 & 35):** Complete data deletion upon parental account termination, including all child world logs.

---

## 3. Clinical & Pedagogical References (AAC & Autism)

### 3.1 Augmentative and Alternative Communication (AAC / CAA)
- **Theoretical Basis:** Communication systems that supplement or replace spoken language for individuals with severe speech or language impairments.
- **Methodological Standards:**
  - **PECS (Picture Exchange Communication System):** Functional visual exchange principles (needs, feelings, activities, objects).
  - **Core Vocabulary:** High-frequency functional pictograms easily accessible via tactile categories.
  - **Sentence Strip (Bande-Phrase):** Left-to-right (French/English) and right-to-left (Arabic) grammatical sequence building.
  - **Multi-Dialect Audio Synthesis:** High-quality Modern Standard Arabic (الفصحى) vocalization, French vocalization, and curated audio recordings of Algerian Arabic (الدارجة) for familiar home objects.

### 3.2 Sensory-Friendly & Neurodivergent Design
- **Sensory Hypersensitivity Considerations:**
  - Avoidance of high-frequency strobe animations, flashing colors, or sudden autoplaying audio.
  - Low-glare Porcelain background (`#F5F6F3`) replacing harsh pure white screens.
  - High typographic legibility: Alexandria & Tajawal for Arabic, Plus Jakarta Sans for Latin scripts.
- **Predictability & Anxiety Reduction:**
  - Visual daily schedules (Routine Stars) providing predictable transition cues.
  - Clear tactile confirmation on touch without overwhelming gamification loops.

---

## 4. Metaphorical & Narrative References

- **Spacetoon Planetary Metaphor:**
  - Inspired by the iconic Arab generation's beloved cosmic channels (*Planet of Action, Planet of Science, Planet of Adventure*).
  - In OFOQ, every child is gifted their own custom celestial world (e.g. *Planet of Sounds*, *Planet of Wonders*, *Planet of Calm*).
  - Fosters dignity, ownership, and joy rather than a sterile clinical or hospital patient feeling.
