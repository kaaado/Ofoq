# OFOQ — Stage 02.0 Architecture & Design Proposal
## Three-Face Consolidated Inspection & Implementation Plan

**Milestone:** Phase 02 — Premium Landing Page Transformation, 3D Child Worlds & Interactive Prototype  
**Date:** November 23, 2026  
**Authors:** Senior Software Architect (Face 1), QA & Performance Lead (Face 2), Defensive AppSec Auditor (Face 3)  
**Approval Gate:** **Awaiting Product Owner (PO) Formal Review**  

---

## 1. Executive Summary & Current-State Findings

Following a systematic inspection of the repository (`git status` clean at commit `1b087cf`), the Three-Face review team has formulated this architectural proposal for Phase 02.

### Key Current-State Findings:
1. **Critical Security Boundary Enforced**: `web/.env.local` has been stripped of the inherited AMANA Supabase credentials (`srhxukrbslzonppszmtx.supabase.co`). External data transmission is disabled, and `supabaseService.ts` operates in local demonstrator mode (`sessionStorage`) with zero external network requests.
2. **Brand & Logo Assets**: The official `OFOQlogo.png` (1536x1024, 3:2 aspect ratio) is integrated in the header and footer with preserved proportions. All provisional SVGs have been removed from active UI usage.
3. **Color Palette Alignment**: The Refined Brand Palette (Midnight Navy `#172B46`, Royal Horizon Blue `#2868C7`, Cloud Blue `#A9C5D8`, Soft Gold `#D8BE83`, Muted Coral `#D58C7A`, Porcelain `#F5F6F3`) is codified in Tailwind CSS and CSS variables.
4. **i18n & Test Harness**: 46 automated assertions pass cleanly (`npm test`), verifying bidirectional parity and valid contact regex across Arabic, French, and English.
5. **Phase 02 Opportunity**: While Phase 01 established a clean landing page, Phase 02 requires a transformative leap into a **deeply engaging, interactive 3D product simulation** that visually explains the core product story:
   $$\text{Parent Account} \longrightarrow \text{Child Profile Creation} \longrightarrow \text{Personalized 3D World Instantiation} \longrightarrow \text{Continuous Collaboration}$$

---

## 2. Proposed Page Structure & Narrative Architecture

Rather than a generic linear marketing page, Phase 02 organizes the narrative into an emotional and architectural progression:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. HEADER: Glassmorphic Nav, Official OFOQ Logo, Live Language Switcher │
├────────────────────────────────────────────────────────────────────────┤
│ 2. HERO: Ecosystem Vision & Dynamic 3D Floating Child World Glimpse    │
├────────────────────────────────────────────────────────────────────────┤
│ 3. THE CORE EXPERIENCE: 6-Step Interactive Child-World Prototype       │
│    Step 1: Family Dashboard (Parent Anchor)                           │
│    Step 2: Profile Creation Wizard (Yanis & Amina)                     │
│    Step 3: World Theme Selection (Cosmic, Ocean, Nature, Sky)          │
│    Step 4: Real-Time World Birth Animation (Particle / Light Burst)    │
│    Step 5: World Exploration (Avatar, AAC Cards, Daily Routines)       │
│    Step 6: Sibling Isolation Switcher (Zero Data Leakage Demo)         │
├────────────────────────────────────────────────────────────────────────┤
│ 4. 3D CELESTIAL WORLDS SHOWCASE: Interactive Multi-Theme Environments  │
│    • Cosmic Space Explorer (Phonetics & Sound Stimulation)            │
│    • Ocean Haven (Calm Sensory Breaks & Emotional Regulation)          │
│    • Nature Garden (Tactile Everyday Routine Predictability)           │
├────────────────────────────────────────────────────────────────────────┤
│ 5. CONCEPTUAL 3D AI COMPANION ("NOOR"): Safe, Supervised Pedagogical Guide│
│    • Interactive Floating 3D Avatar with Idle Breathing                │
│    • Greeting, Voice Practice Simulation & Sensory-Safe Response       │
│    • Prominent Non-Clinical Boundaries & Parental Controls             │
├────────────────────────────────────────────────────────────────────────┤
│ 6. AUGMENTATIVE & ALTERNATIVE COMMUNICATION (AAC / PECS Deck)          │
│    • Instant Speech Synthesis (Modern Standard Arabic, French, Derja)  │
│    • Tactile Grammar Sentence Strip with Clear Action Buttons         │
├────────────────────────────────────────────────────────────────────────┤
│ 7. CONNECTED CLINIC-TO-HOME COLLABORATION: The 3 Account Roles         │
│    • Admin (Governance) | Pro (Therapy Goals) | Parent (Account Owner) │
├────────────────────────────────────────────────────────────────────────┤
│ 8. OFOQ ACADEMY & EDUCATIONAL PILLARS: 6 Dimensions of Growth          │
├────────────────────────────────────────────────────────────────────────┤
│ 9. TRUST, SAFETY & LAW 18-07: Data Minimization & Ethical Boundaries    │
├────────────────────────────────────────────────────────────────────────┤
│ 10. FREQUENTLY ASKED QUESTIONS (FAQ)                                   │
├────────────────────────────────────────────────────────────────────────┤
│ 11. PRIORITY EARLY ACCESS WAITLIST (Local Demo State Protected)        │
├────────────────────────────────────────────────────────────────────────┤
│ 12. FOOTER & ACCESSIBLE MODALS (Privacy Policy, Legal Notice)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. 3D Implementation Architecture & Dependency Assessment

### Technology Evaluation:
| Option | Bundle Size | Mobile GPU Risk | Accessibility & Fallback | Recommendation |
| :--- | :---: | :---: | :---: | :--- |
| **Full Three.js / R3F Stack** | $+550\text{ kB}$ gzip | **High** (context loss on budget Android devices, battery drain) | Difficult to provide clean screen-reader fallbacks | **REJECTED** for landing page |
| **CSS 3D Engine + Motion + Canvas Particles** | **$0\text{ kB}$ extra dependencies** | **Extremely Low** (Hardware-accelerated transforms, 60fps) | Native HTML structure, full WCAG 2.1 AA compatibility, automatic `prefers-reduced-motion` | **APPROVED** |

### Approved 3D Architecture:
1. **CSS 3D Perspective Canvas**: Leveraging `perspective: 1200px`, `transform-style: preserve-3d`, dynamic `rotateX`/`rotateY` responsive to mouse/touch hover, and depth-staggered Z-planes (`translateZ(40px)`, `translateZ(80px)`).
2. **Celestial Particle Dust & Planetary Rings**: Lightweight 2D Canvas ambient starfield ($<2\text{ kB}$) combined with SVG orbital paths (`orbit-ring`).
3. **Lighting & Materiality**: Multi-layer radial gradients simulating spherical volumetric lighting (`radial-gradient` with specular highlight and ambient rim-glow) matching the refined palette.
4. **Reduced Motion Fallback**: Automatically collapses 3D transforms into static high-contrast layered cards when `prefers-reduced-motion: reduce` is detected.

---

## 4. Conceptual 3D AI Companion Avatar ("Noor" / "نور")

### Visual & Behavioral Concept:
- **Character**: An endearing, celestial light-being named **Noor (نور)** — an abstract, friendly, glowing companion with soft expressive eyes and floating ambient halos.
- **Micro-Interactions**:
  - Gentle idle hovering animation.
  - Interactive reaction to visitor hover/tap (friendly wave, sound pulse).
  - Speech bubble demonstrating pedagogical reinforcement (e.g., *"Bravo ! Tu as exprimé ton besoin !"* / *« أحسنت يا بطل ! »*).
- **Safety Boundaries (Strictly Non-Clinical)**:
  - Watermarked with: *"Assistant Pédagogique Conceptuel • Non-Médical • Sous Contrôle Parental"*.
  - Explicit warning: No automated diagnosis, no clinical therapy, no secret conversations.

---

## 5. Three-Face Independent Risk Assessment & Approvals

### Face 1: Software Architect Review
- **Verdict:** **APPROVED**
- **Notes:** The component structure maintains high modularity under `web/src/components/sections/`. The interactive prototype will be implemented in a dedicated component `InteractiveWorldCreator.tsx`, ensuring clear separation between marketing layout and product simulation state.

### Face 2: QA, Performance & Accessibility Review
- **Verdict:** **APPROVED**
- **Notes:** Keeping the bundle free of heavy WebGL runtimes ensures sub-2-second loading on Algerian mobile connections (Mobilis, Djezzy, Ooredoo 4G). Translation parity tests will be expanded to assert all new prototype keys across AR, FR, and EN.

### Face 3: Defensive AppSec Review
- **Verdict:** **APPROVED**
- **Notes:** Confirmed that `.env.local` contains no AMANA references. The interactive prototype uses purely fictional in-memory state (`Yanis, 6 ans`, `Amina, 4 ans`). Real child data is never requested or persisted.

---

## 6. Implementation Stages & Gate Roadmap

- **Stage 02.0:** Inspection & Design Proposal $\longrightarrow$ **`CURRENT`**
- **Stage 02.1:** Documentation & Design-System Alignment
- **Stage 02.2:** Landing Page Visual Transformation & Copy Modernization
- **Stage 02.3:** Interactive 6-Step Child-World Creation Prototype
- **Stage 02.4:** 3D Celestial Engine & AI Companion Avatar
- **Stage 02.5:** Final Three-Face QA, Automated Tests, Build & Visual Evidence
