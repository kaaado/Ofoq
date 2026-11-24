# OFOQ (أفق) — Audio Architecture & Sensory Phonation Engine

## 1. Executive Summary & Design Principles

OFOQ's audio architecture is engineered specifically for autistic children, children with speech and language delays, and their families. Unlike commercial sound engines that use abrupt attack times or harsh frequencies, OFOQ enforces **calm sensory ergonomics**:
- **Zero Autoplay:** Audio is never played without explicit user interaction or parental initiation.
- **Low-Pass Acoustic Filtering:** All synthesized Web Audio oscillator signals are routed through a 1400 Hz biquad low-pass filter with exponential decay envelopes, preventing piercing high-frequency sound triggers.
- **Authentic Algerian Darija Vocalization:** Pictogram utterances map to authentic phonetic phrasing with full Arabic Tashkeel diacritics (`DARIJA_PICTO_SPOKEN`) for crystal-clear phoneme modeling.
- **Defensive Volume & Speech Rate Bounds:** Volume is capped at 1.0, speech rate is bounded to `[0.75, 1.15]` (defaulting to a calm, intelligible 0.92), and pitch is bounded to `[0.5, 1.5]`.

---

## 2. Web Audio Pipeline Architecture

```
[ User Interaction ]
         │
         ▼
[ Master Sensory Context ] ─── (checks: soundEnabled, volume, quietMode)
         │
         ▼
[ Oscillator / Tone Generator ] (Sine / Triangle)
         │
         ▼
[ Exponential Gain Envelope ] (Smooth attack > 20ms, soft exponential decay)
         │
         ▼
[ Biquad Low-Pass Filter ] (fc = 1400 Hz, Q = 1.0)
         │
         ▼
[ Master Gain Node ] (Clamped [0, 1])
         │
         ▼
[ audioContext.destination ]
```

### Acoustic Feedback Profiles:
1. **`click` (Tactile Affirmation):** Soft marimba click (440 Hz → 330 Hz, 60ms duration).
2. **`pop` (AAC Card Selection):** Calm wooden marimba pop (523 Hz, 90ms duration).
3. **`chime` (Routine / Milestone Confirmation):** Two-tone gentle harmonic chime (587 Hz → 880 Hz, 240ms duration).
4. **`celebrate` (Star / Full Routine Completion):** Pentatonic triad flourish (523 Hz → 659 Hz → 784 Hz, 480ms duration).
5. **`uncheck` (Item Removal / Reset):** Subtle descending tone (392 Hz → 330 Hz, 80ms duration).

---

## 3. Web Speech API (SpeechSynthesis) Implementation

### Voice Discovery & Fallback Hierarchy:
1. **Voice URI Match:** If user specifies a preferred voice in `SensoryPreferencesModal`, that voice is honored.
2. **Natural/Neural Arabic Voices:** Prioritizes high-fidelity natural Arabic voices (`ar-XA`, `ar-SA`, `ar-DZ`).
3. **Regional Tashkeel Diacritics:** Utterances utilize diacritized Arabic phrases (e.g. `حَبِّيتْ نَشْرَبْ مَاءْ`, `تَحْضِينَة حْنِينَة وَدَافْيَة`) to guide native neural synthesizers into authentic pronunciation.
4. **Graceful Degradation:** When SpeechSynthesis is unavailable or blocked, non-blocking silent fallback timers allow visual UI progress states to complete predictably.

---

## 4. Lifecycle & Resource Disposal

- **Defensive Unmount Cleanup:** All components using audio (`AacGrid`, `NourCompanionCard`, `SpecialistBridge`, `ChildWorldWizard`) invoke `cancelSpeech()` on unmount.
- **AudioContext Lifecycle:** Single lazy `AudioContext` instance resumes on first user gesture.
- **Safe Speech Cancellation:** `cancelSpeech()` wraps native calls in `try/catch` and clears fallback timer references.
