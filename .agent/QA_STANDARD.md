# Quality Assurance, UX & Performance Standard — OFOQ (أفق)

**Primary Authority:** Face 2 (QA / DevOps / Performance Engineer)  
**Scope:** Public Web, Professional Workspace, Parent/Child Mobile Experience & Documentation

---

## 1. Multi-State UX Verification

Every interactive component, form, and page must explicitly handle all 7 standard user states:
1. **Empty State:** Reassuring, clear guidance when no child profiles, communication cards, or activities exist yet.
2. **Interactive State:** Clear hover, focus-visible (accessibility ring), and active press feedback.
3. **Validation State:** Inline feedback on invalid inputs, phone/email format, or missing required fields with clear, supportive error copy.
4. **Submitting / Loading State:** Disabled button with animated spinner and `aria-busy="true"`.
5. **Success State:** Calm confirmation message, celebratory yet gentle visual feedback, and clear next-step guidance.
6. **Error / Failure State:** Human-readable error message and retry button without wiping entered data.
7. **Offline / Network Recovery State:** Graceful alert when connection drops, ensuring cached AAC communication cards remain accessible.

---

## 2. Localization & RTL Engineering Standard

- **Multilingual Parity:** All core navigation links, system messages, button labels, and validation strings must support Arabic (native RTL), French (LTR), and English (LTR).
- **Native RTL Architecture:**
  - `document.documentElement.dir = 'rtl'` and `lang = 'ar'` dynamically applied.
  - Directional icons (arrows, chevrons, step progress bars) must mirror automatically in RTL mode.
  - Use Tailwind CSS logical properties (`ps-4`, `pe-4`, `ms-2`, `me-2`, `text-start`, `text-end`, `start-0`, `end-0`) rather than fixed `pl-*` or `pr-*`.
  - Arabic typography rendered via optimized webfont (**IBM Plex Sans Arabic**) with adequate line-height ($\ge 1.6$) and clear character shaping.

---

## 3. Accessibility & Sensory Ergonomics (Autism-Friendly UX)

- **Contrast Ratios:** Minimum $4.5:1$ for normal text, $3.0:1$ for large headings against background (WCAG 2.1 AA).
- **Touch Target Ergonomics:** All buttons, pictograms, navigation pills, and interactive AAC cards must be at least $48 \times 48\text{ CSS pixels}$ on touch viewports (ideally $64 \times 64\text{ px}$ on tablet AAC grids).
- **Sensory & Cognitive Load Standards:**
  - Avoid jarring, flashing, or hyperactive animations; use gentle, predictable transitions.
  - Maintain consistent visual anchors and navigation hierarchies so children feel safe and oriented.
  - Ensure high-clarity iconography: AAC pictograms must have clear outlines, unambiguous visual meaning, and accompanying text/audio labels.
- **Keyboard Navigation & Screen Readers:** Full tab-order sequence, visible focus outlines, bypass skip links, proper HTML5 landmark tags (`<header>`, `<main>`, `<nav>`, `<footer>`), and `aria-live` announcements for AAC speech synthesis.

---

## 4. Performance & Deployment Benchmarks

- **Target Initial JS Bundle:** $\le 150\text{ KB}$ gzipped.
- **Lighthouse Performance Score:** $\ge 90$ across Desktop and Mobile.
- **Core Web Vitals:**
  - Largest Contentful Paint (LCP) $\le 2.0\text{ s}$.
  - Interaction to Next Paint (INP) $\le 100\text{ ms}$.
  - Cumulative Layout Shift (CLS) $\le 0.05$.
- **Image & Asset Optimization:** Modern WebP/SVG formats with explicit `width` and `height` to prevent layout shifts.

---

## 5. Offline AAC Resilience

- Essential communication cards and daily routine boards must be architected for offline availability on mobile devices, ensuring communication is never cut off by intermittent cellular coverage.
