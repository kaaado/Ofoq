# Defensive Application Security Standard — OFOQ (أفق)

**Primary Authority:** Face 3 (Defensive Application Security Engineer)  
**Scope:** Web Platform, Mobile Applications, Operational Backend & Data Pipelines  
**Regulatory Baseline:** Algerian Personal Data Protection Law 18-07 (*Loi n° 18-07 relative à la protection des personnes physiques en matière de traitement des données à caractère personnel*)

---

## 1. Core Defensive Principles

### 1.1 Absolute Client-Side Secrets Prohibition
- **Rule:** Never embed, bundle, or commit private API keys, database credentials, service-role secrets, encryption keys, or administrative tokens in client-side code (`web/` or mobile assets).
- **Enforcement:** Automated checks for `.env` files; client bundles must contain only public-safe configuration. Any external API keys must be domain/package-restricted and rate-limited.

### 1.2 Sensitive Child Data Protection & Law 18-07 Compliance
- **Data Sensitivity:** Information concerning children with autism, developmental milestones, speech difficulties, communication logs, and family habits constitutes sensitive personal data.
- **Prohibited Public Data:** Under no circumstances will marketing forms or unauthenticated endpoints collect child full names, medical records, clinical diagnoses, psychological evaluations, or biometric data.
- **Affirmative Parental Consent:** Processing child data requires explicit, verifiable consent from the parent account owner. Consent records must capture timestamp, scope, and legal notice version.
- **Right to Erasure & Export:** Systems must be architected to support complete data export and deletion of child profiles upon parent request, in accordance with Law 18-07.

### 1.3 Tenant & Child World Isolation (Prevention of BOLA / IDOR)
- **Object-Level Authorization Guard:** Every backend query accessing child-specific data (AAC cards, routines, activities, observations) must enforce strict authorization:
  1. The authenticated user is the **Parent** who owns the child profile; OR
  2. The authenticated user is a verified **Pro (Professional)** with an active, unexpired, and unrevoked assignment grant for that exact child profile; OR
  3. The authenticated user is an authorized **Admin** acting within logged, auditable governance workflows.
- **Cross-Profile Leakage Defense:** Child profiles within the same family account must be logically isolated. An activity or communication preference assigned to Child A must never leak into Child B's world.
- **Database Query Boundaries:** Queries must never rely solely on client-supplied `child_id` without verifying the authenticated parent/professional relationship in the database session.

### 1.4 Revocable Professional Assignment & Audit Logging
- **Explicit Grants:** Professional access to a child profile is never global or automatic. It requires an explicit parent grant specifying permissions (e.g. view progress, assign activities, contribute AAC vocabulary).
- **Instant Revocability:** Parents must have the capability to revoke professional access at any time. Revocation must instantly invalidate existing session tokens and cached access rights.
- **Immutable Audit Trail:** An append-only audit log must record every security event:
  - Account logins and privilege escalations.
  - Assignment grant creation, modification, and revocation.
  - Professional views of child observations and reports.
  - Export or deletion of child records.

### 1.5 Responsible AI Context Isolation & Safeguards
- **Per-Child Session Isolation:** The optional AI companion's memory, context, and prompts must be completely isolated per child profile. Data from Child A's session must never be included in prompts for Child B or any other user.
- **No Training on Child Data:** Identifiable child data, speech audio, or conversation snippets must never be used to train or fine-tune public AI models without a separately approved legal and consent framework.
- **Strict Content Safeguarding:** Prompts must include hard system boundaries:
  - Prohibit providing medical diagnoses, clinical prognoses, or medication advice.
  - Prohibit claims of sentience, real-world friendship, or encouraging emotional separation from parents.
  - Enforce age-appropriate content filtering, immediate alert on self-harm or distress signals, and parental notification.

### 1.6 Public Endpoint Hardening & Security Headers
- **Rate Limiting:** Protect public waitlist, inquiry, and authentication endpoints against automated brute-force attacks (e.g. $\le 5$ requests per IP per minute).
- **Anti-Bot & Anti-Spam:** Implement client-side honeypots and submission timing analysis.
- **HTTP Response Headers (Production):**
  - `Content-Security-Policy (CSP)`: Disallow unsafe inline scripts; restrict connect-src to authorized API domains.
  - `X-Frame-Options`: `DENY` (prevents clickjacking).
  - `X-Content-Type-Options`: `nosniff`.
  - `Referrer-Policy`: `strict-origin-when-cross-origin`.
  - `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`.
