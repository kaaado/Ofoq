# OFOQ (أفق) — Sensory Ergonomics & Autism-Informed Standards

## 1. Core Philosophical Foundations

OFOQ is designed from the ground up as an autism-informed ecosystem connecting children, families, and certified professionals. The sensory environment is treated as a clinical boundary and human dignity imperative:

1. **Anti-Cliché Brand Identity:** Strictly NO puzzle-piece autism symbolism, puzzle iconography, or juvenile primary-color primaries.
2. **Official Calibrated Palette:**
   - **Midnight Navy (`#172B46`):** Solid foundation, calm authority, high legibility.
   - **Royal Horizon Blue (`#2868C7`):** Expansive, communicative accent.
   - **Cloud Blue (`#A9C5D8`):** Gentle atmospheric support.
   - **Soft Gold (`#D8BE83` / `#806936`):** Encouragement, celebration, warmth.
   - **Muted Coral (`#D58C7A` / `#9E4E3D`):** Human warmth, emotion, connection.
   - **Porcelain (`#F5F6F3`):** Neutral, non-glare, eye-resting background.
3. **Contrast Compliance:** All text and interactive controls maintain `>= 4.5:1` contrast against their respective backgrounds (WCAG 2.2 AA).
4. **Touch Target Dimensions:** All interactive buttons, cards, checkboxes, and toggles enforce a minimum touch target bounding box of `>= 48px × 48px`.

---

## 2. Sensory Preferences Control Suite

Users (parents and individuals) can access the `SensoryPreferencesModal` from anywhere in the application to fine-tune their sensory environment:
- **Quiet Mode (`quietMode: boolean`):** Flattens all complex backdrop blur filters (`-webkit-backdrop-filter: none !important`), simplifies shadows, and enforces pure, high-legibility solid card surfaces.
- **Motion Reduction (`reducedMotion: boolean`):** Honors `prefers-reduced-motion` and provides an in-app override. When active, all large entrance animations, horizon sweeps, and 3D WebGL scenes are replaced with instant, calming static visuals.
- **Audio Output Toggle (`soundEnabled: boolean`):** Master mute switch for all synthesized tactile feedback.
- **Voice Toggle (`voiceEnabled: boolean`):** Controls vocalization of pictograms and companion prompts.
- **Speech Rate Slider (`speechRate: number`):** Adjusts phonation pace from 0.75x to 1.15x for children needing slower auditory processing.
- **Visual Density:** Allows switching between `'comfortable'` (standard spacing) and `'spacious'` (increased card margins to eliminate visual clutter).

---

## 3. Child World Profile Isolation & Family Hub

- **Parent-Held Accounts:** The parent holds the single account and owns all child worlds. Children never possess credentials, usernames, or login passwords.
- **Sibling Isolation:** Multiple children in one family (e.g. Yanis and Amina) each have their own isolated Sensory World with independent themes, sentence strips, routines, and specialist continuity notes. Components are keyed with composite identifiers (`key="aac-yanis"`, `key="companion-yanis"`, etc.) preventing state leakage across siblings.
- **Clinic-to-Home Continuity:** Specialist advice is strictly informative and parental-consented. Non-diagnostic boundaries are prominently maintained across all portals.
