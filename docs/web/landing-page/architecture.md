# OFOQ Web Application — Architecture & Implementation

**Revision:** 2.0 (OFOQ Ecosystem, Refined Brand Palette & 3D Child World)  
**Date:** November 2026  
**Status:** Implemented & Audited (`Exit Code 0`)  
**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Motion (`motion/react`), Lucide React, react-i18next

---

## 1. Single-Page Architecture & Narrative Flow

The official OFOQ web platform is built as a unified, sensory-friendly single-page application guiding families and professionals through the ecosystem:

```
[ Header & Dynamic Brand / Nav ]
             │
[ 1. Hero: Ecosystem Vision & 3D Child World AAC Card ]
             │
[ 2. Spacetoon-Inspired 3D Child Worlds Showcase ]
             │
[ 3. How It Works: 3-Step Connected Architecture ]
             │
[ 4. About OFOQ: Mission & Clinic-to-Home Bridge ]
             │
[ 5. The 6 Core Ecosystem Pillars ]
             │
[ 6. Trust & Privacy: Law 18-07 & Non-Diagnostic Boundary ]
             │
[ 7. Specialists & Clinics Partnership Portal ]
             │
[ 8. Frequently Asked Questions (FAQ) ]
             │
[ 9. Contact & Inquiries (Algiers Pilot Support) ]
             │
[ Footer, Legal Notice & Privacy Policy Modals ]
```

### 1.1 Dynamic Multilingual Identity
- **Arabic:** **أفق** (Pure Arabic branding, Alexandria headings, Tajawal body, `dir="rtl"`).
- **French:** **OFOQ** (Plus Jakarta Sans, `dir="ltr"`).
- **English:** **OFOQ** (Plus Jakarta Sans, `dir="ltr"`).

---

## 2. Component Hierarchy & Responsibilities

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| `Header` | `web/src/components/layout/Header.tsx` | Sticky glassmorphic navbar, official logo, language selector, waitlist trigger. |
| `Footer` | `web/src/components/layout/Footer.tsx` | Ecosystem links, non-diagnostic notice, Law 18-07 privacy modal trigger. |
| `HomePage` | `web/src/pages/HomePage.tsx` | Main orchestrator assembling all sections with shared waitlist modal state. |
| `ChildWorldSection` | `web/src/components/sections/ChildWorldSection.tsx` | **3D Spacetoon-style Child World showcase**: demonstrates profile creation, personalized celestial planet themes, AAC cards, and routine stars. |
| `HowItWorksSection` | `web/src/components/sections/HowItWorksSection.tsx` | Visualizes the 3-step connection: 1. Family Account $\to$ 2. Child Worlds $\to$ 3. Specialist Permissions. |
| `ServicesSection` | `web/src/components/sections/ServicesSection.tsx` | The 6 core functional pillars of the OFOQ ecosystem. |
| `AboutSection` | `web/src/components/sections/AboutSection.tsx` | Mission, clinic-to-home bridge, and non-diagnostic educational commitment. |
| `SafetySection` | `web/src/components/sections/SafetySection.tsx` | Law 18-07 data minimization, child world isolation, and revocable consent. |
| `CompanionRecruitmentSection`| `web/src/components/sections/CompanionRecruitmentSection.tsx`| Specialist and center onboarding gateway. |
| `FAQSection` | `web/src/components/sections/FAQSection.tsx` | Clarifications on diagnosis, privacy, sibling data, and languages. |
| `ContactSection` | `web/src/components/sections/ContactSection.tsx` | Contact channels for the Algiers pilot territory and direct inquiry submission. |
| `WaitlistModal` | `web/src/components/common/WaitlistModal.tsx` | Priority access enrollment with Algerian wilaya selector and explicit consent. |
| `PrivacyModal` | `web/src/components/common/PrivacyModal.tsx` | Law 18-07 data governance terms and ANPDP preparation notice. |
| `LegalModal` | `web/src/components/common/LegalModal.tsx` | Legal notice, platform scope, and non-diagnostic boundary declaration. |

---

## 3. Design Tokens & Glassmorphism Implementation

The platform styling is driven by custom Tailwind utility classes built upon the **Refined Brand Palette**:
- **Primary:** Midnight Navy (`#172B46`)
- **Secondary:** Royal Horizon Blue (`#2868C7`)
- **Supporting:** Cloud Blue (`#A9C5D8`)
- **Accent:** Soft Gold (`#D8BE83`)
- **Human Accent:** Muted Coral (`#D58C7A`)
- **Canvas:** Porcelain (`#F5F6F3`)

The glassmorphic treatment (`.glass-card`, `.glass-nav`, `.glass-pill`) utilizes high-performance CSS backdrop filters (`backdrop-blur-xl`) with low-opacity borders (`rgba(169, 197, 216, 0.35)`), preventing GPU overdraw on mobile devices.
