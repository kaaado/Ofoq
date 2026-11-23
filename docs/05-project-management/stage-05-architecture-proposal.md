# Architecture Specification & Implementation Plan: Official OFOQ Platform (`/web`)

**Document Identifier:** `DOC-05-WEB-ARCH`  
**Target Directory:** `/web`  
**Milestone:** Phase 01 Delivery & Phase 02 Foundation  
**Status:** `IMPLEMENTED & AUDITED`  
**Primary Authors:** Senior Solutions Architect, Lead UI/UX Designer, AppSec Auditor  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Purpose

This document outlines the software architecture, design token system, security framework, and interactive experiences for the official web platform of **OFOQ (أفق)**.

### 1.1 Strategic Role of the Platform
The public web platform serves as an informative, educational, and pre-launch engagement hub for the OFOQ digital ecosystem:
1. **Families & Parents:** Educates parents on non-diagnostic continuous care, introduces the concept of isolated **Child Worlds**, demonstrates the interactive Augmentative and Alternative Communication (AAC) board, and provides priority early-access enrollment.
2. **Specialists & Clinical Centers:** Outlines the collaborative portal for speech-language pathologists (orthophonistes), special educators, and neuropsychiatrists, emphasizing parental consent and ethical boundaries.
3. **Children (3D Spacetoon Metaphor):** Visually and interactively previews how creating a child profile inside the parent account births a personalized, 3D celestial "Child World" where the child can communicate and thrive without passwords or cognitive stress.

---

## 2. Approved Technology Stack

The platform is governed by strict, modern technology standards:
- **Core Framework:** React 19 + TypeScript (strict mode enabled).
- **Tooling & Bundler:** Vite (sub-second HMR, optimized tree-shaking, production bundle under $250\text{ kB}$ gzip).
- **Styling & Design Tokens:** Tailwind CSS v3 with custom glassmorphism utilities, CSS variables, and RTL logical layout properties.
- **Animation & 3D Visuals:** Motion (`motion/react`) for smooth, sensory-friendly glassmorphic depth, gentle floating orbits, and tactile card responses.
- **Icons:** Lucide React (feather-light, accessible SVG icons).
- **Internationalization (i18n):** `react-i18next` + `i18next` with real-time bidirectional layout switching (`dir="rtl"` vs `dir="ltr"`) and 100% key parity across Arabic, French, and English.
- **Persistence (Pre-Launch):** `@supabase/supabase-js` targeting a dedicated OFOQ PostgreSQL database with Row Level Security.

---

## 3. Refined Brand Palette & Glassmorphic Tokens

| Color Name | Hex Code | Role | Meaning & Usage |
| :--- | :---: | :---: | :--- |
| **Midnight Navy** | `#172B46` | **Primary** | Trust, authority, dark surfaces, high-contrast headings ($14.5:1$ on Porcelain). |
| **Royal Horizon Blue** | `#2868C7` | **Secondary** | Hope, communication, technology, primary CTA gradients, glowing border accents. |
| **Cloud Blue** | `#A9C5D8` | **Supporting** | Calm, accessible surfaces, gentle card backgrounds, sensory comfort. |
| **Soft Gold** | `#D8BE83` | **Accent** | Achievement, optimism, celestial stars, milestones, warm badges. |
| **Muted Coral** | `#D58C7A` | **Human Accent** | Warmth, empathy, parental connection, urgent notifications, tactile highlights. |
| **Porcelain** | `#F5F6F3` | **Canvas** | Neutral foundation, sensory-friendly glare-free light background canvas. |

### Glassmorphism Utility Suite
- `.glass-card`: Semi-translucent white/porcelain canvas with `backdrop-blur-xl`, subtle border (`rgba(169, 197, 216, 0.35)`), and layered elevation shadows.
- `.glass-nav`: Floating sticky glass navigation bar with smooth backdrop blur.
- `.glass-pill`: Interactive rounded capsule for badges and category filters.
- `.glow-horizon`: Ambient light halo using Royal Horizon Blue (`#2868C7`) for 3D Child World planets.

---

## 4. Spacetoon-Inspired 3D Child World Architecture

A child in OFOQ is **never an independent account or authentication role**. When a parent authenticates and creates a child profile, the system instantiates an isolated **Child World**:
- **Celestial Metaphor:** Drawing inspiration from the wonder of Spacetoon planets, each Child World is framed as a personalized planet (e.g. *Planet of Sounds*, *Planet of Wonders*, *Planet of Calm*).
- **Zero-Password Access:** The child enters their personalized world directly from the parent's device via a one-tap parental toggle.
- **Content Layers:**
  1. **AAC Communication Deck:** Visual and spoken pictograms (PECS principles) with real-time speech synthesis.
  2. **Routine Stars:** Visual daily routines (morning, school, clinic, quiet time) offering predictability and reducing anxiety.
  3. **Therapy Bridges:** Assigned activities curated by the child's orthophoniste with instant parental approval.
  4. **AI Companion Galaxy:** A friendly, supervised AI companion adapted to the child's sensory profile.

---

## 5. Security, Privacy & Law 18-07 Boundaries

1. **Strict Data Minimization:** No medical diagnoses, clinical scoring, or psychiatric records are collected or stored.
2. **Explicit Consent:** Waitlist and contact forms require affirmative consent checkboxes linked to the privacy policy.
3. **Isolated Sibling Workspaces:** Separate data stores ensuring a specialist assigned to Child A cannot access Child B.
4. **ANPDP Compliance Readiness:** Privacy documentation formulated under Algerian Law No. 18-07 of June 10, 2018.
