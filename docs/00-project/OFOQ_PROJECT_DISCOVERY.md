# OFOQ — Project Discovery & Product Definition

> **Document type:** Product discovery baseline  
> **Project:** OFOQ (أفق)  
> **Market:** Algeria  
> **Status:** Discovery baseline prepared; product-owner validation required  
> **Last updated:** 23 November 2026  
> **Important:** This document describes the current agreed direction and distinguishes confirmed decisions from proposals and assumptions. Do not silently convert proposals into approved requirements.

---

## 1. Executive Summary

**OFOQ (أفق)** is a proposed Algerian digital ecosystem designed to connect children, families, and professionals through personalized digital experiences and coordinated support.

The platform is intended to support autistic children and children with communication and speech difficulties. It brings together communication support, personalized activities, family participation, professional collaboration, progress history, and educational resources.

OFOQ is not simply a website, a therapy-center management system, or a standalone children's application. It is a connected ecosystem with three account roles:

1. **Admin** — governs the platform.
2. **Pro (Professional)** — works with children assigned to them, subject to parent authorization and platform permissions.
3. **Parent** — owns a family account and manages one or more child profiles.

A child is **not** a separate account role and does not need a separate login. Each child has an independent personalized workspace, called a **Child World**, nested within the parent's account. The parent can switch between their children's worlds.

**Core product principle:**

> One family account. Multiple children's worlds. One connected ecosystem.

**Proposed central promise:**

> Every child has their own horizon.

The product should help create continuity between professional-guided activities and everyday family life, while respecting each child's needs, privacy, dignity, and individual pace.

## 2. Project Context and Source Boundaries

The existing project workspace was cloned from another project. Its folders, documentation conventions, agent instructions, and technical structure may be reusable, but its previous product identity and domain-specific information must not be carried over as OFOQ facts.

The existing Figma reference contains content for a physical center in Casablanca, Morocco, including French-language navigation, center services, team information, contact details, and appointment messaging. It is an initial visual/content reference only. OFOQ targets Algeria and is a digital ecosystem. Do not reuse Moroccan addresses, telephone numbers, organizational claims, or center-specific facts as OFOQ information.

A separate project document previously supplied by the product owner describes three principal pillars:
- Interactive mobile application.
- Parent/professional monitoring and collaboration.
- E-learning / educational resources.

These pillars are useful source inputs, but detailed market, financial, clinical, and performance claims must be validated before being presented as proven facts.

## 3. Problem and Opportunity

The product is intended to address the following problem areas. These are product-discovery hypotheses and should be validated with Algerian families and professionals:

- Support and activities may be fragmented between professional sessions and home routines.
- Families may lack accessible, practical tools to support communication and everyday activities.
- Professionals and parents need a structured way to coordinate around a child's activities and goals.
- Communication resources should be adaptable to a child's vocabulary, environment, language, and preferences.
- Families need a clear way to understand activities, observations, and progress over time.
- Locally relevant digital resources for the Algerian context may be limited or fragmented.

OFOQ's opportunity is to connect the people and resources around a child without claiming to replace qualified professionals, caregivers, or human relationships.

## 4. Product Vision and Positioning

### Vision

Build a trusted digital ecosystem in which each child has a personalized space, parents remain in control of their family account, and authorized professionals can contribute to coordinated support.

### Positioning

OFOQ is an Algerian digital ecosystem connecting children, families, and professionals through personalized child spaces, communication tools, shared activities, and educational resources.

### Product promise

- Personalized experiences for each child.
- One parent-owned account for multiple children.
- Permission-based collaboration with professionals.
- Communication and activity resources connected to everyday life.
- Responsible, controlled use of AI-assisted personalization where appropriate.

### What OFOQ is not

- Not a diagnostic tool.
- Not an autonomous treatment or clinical decision system.
- Not a replacement for therapists, educators, parents, or human relationships.
- Not a social network for children.
- Not a game whose engagement mechanics take priority over child wellbeing.
- Not a claim of guaranteed developmental or therapeutic outcomes.

## 5. Users, Roles, and Account Model

There are exactly three platform account roles in the current product direction.

### 5.1 Admin

Platform-level responsibilities may include:
- User and account administration.
- Professional verification and platform governance.
- Content and resource management.
- Subscription and plan configuration, if approved.
- Platform-level reporting and operational analytics.
- Moderation, support, and audit review.

Admin access must be controlled, logged, and limited to legitimate platform operations.

### 5.2 Pro (Professional)

A professional may:
- Manage only children explicitly assigned to them.
- View relevant child information according to parent authorization and granted permissions.
- Create or assign activities and resources.
- Contribute communication resources and vocabulary where authorized.
- Define or contribute to goals and routines within their professional scope.
- Record observations and progress events.
- Collaborate with parents.
- Prepare reports based on recorded information.

A professional must not automatically gain access to every child on the platform or to every item in a family's account.

### 5.3 Parent

A parent:
- Owns the family account.
- Creates and manages one or more child profiles.
- Switches between the children's independent worlds.
- Controls professional authorization and access.
- Contributes familiar vocabulary, objects, routines, interests, and resources.
- Views relevant activities, observations, and progress history.
- Uses parent-facing learning resources.
- Controls child-facing experience settings and AI companion permissions.

### 5.4 Child profile and Child World

A child is represented by a profile and a personalized workspace, not a separate authentication role.

Each Child World may contain:
- Child-specific identity, avatar, and optional world theme.
- Communication cards, pictograms, vocabulary, and audio.
- Personalized activities and learning resources.
- Goals, routines, and schedules.
- Progress and activity history.
- Professional-assigned content.
- Parent-contributed content.
- Optional AI companion configuration, subject to safety and parent controls.

Child worlds are logically and securely separated. Visual switching between worlds is not itself a security boundary; authorization and data isolation must be enforced by the backend.

## 6. The Child World Concept

The product's central experience is a collection of individual child worlds inside the parent's family account.

**Metaphor:** The parent is the central account; each child has their own world, entrance, visual identity, and personalized experience.

The parent can switch from one child's world to another without signing out or creating separate child credentials. Each world must retain its own data, preferences, content, history, and permissions.

### Content sources

A child's world can receive content from three sources:

1. **Professional contribution:** assigned activities, resources, objectives, and observations.
2. **Parent contribution:** familiar words, objects, routines, interests, and home-context resources.
3. **OFOQ intelligence:** recommendations or adaptations generated by approved platform logic or AI, within defined safety and permission rules.

Content provenance should be visible where it matters. AI suggestions must not silently override professional plans or parent decisions.

## 7. Functional Product Pillars

### Pillar 1 — Communication support (AAC)

Potential capabilities:
- Pictogram and symbol-based communication.
- Organized communication categories.
- Audio playback for supported words or phrases.
- Personalized vocabulary.
- Parent/professional contributions, subject to permissions.
- Child-friendly and accessible interaction.

The precise AAC library, languages, licensing, and offline behavior remain to be validated.

### Pillar 2 — Personalized Child Worlds

Potential capabilities:
- Independent child profiles and workspaces.
- Personalized identity and accessible visual preferences.
- Child-specific activities, routines, and resources.
- Predictable navigation and interaction patterns.
- Secure separation of each child's information.

### Pillar 3 — Family management

Potential capabilities:
- Parent-owned family account.
- Multiple child profiles.
- Child-world switching.
- Parent controls and permissions.
- Family-facing activity and progress views.

### Pillar 4 — Professional collaboration

Potential capabilities:
- Professional profiles and verification.
- Parent-authorized child assignments.
- Activity/resource assignment.
- Observations and progress events.
- Parent-professional communication and collaboration.
- Reports based on recorded information.

### Pillar 5 — Responsible AI-assisted personalization

Potential future capabilities:
- Suggestions for relevant activities or resources.
- Adaptation of presentation based on approved preferences.
- A child-specific AI companion with a distinct name, avatar, voice/personality options, and limited interaction scope.

AI is an assistive feature, not a clinician or caregiver. It must not diagnose, prescribe treatment, make unsupported clinical claims, or position itself as a replacement for human relationships.

### Pillar 6 — OFOQ Academy

Potential capabilities:
- Parent educational resources.
- Professional learning resources.
- Structured courses or training content.
- Articles, guides, and practical activities.

The final content model, access rules, and monetization are not yet approved.

## 8. AI Companion — Safety and Product Boundaries

The proposed companion may have an identity and interaction configuration specific to each child. Its context must be isolated per child.

Mandatory design principles:
- Parent-controlled activation and settings.
- Age- and ability-appropriate interaction.
- Clear boundaries and transparent AI identity.
- No diagnosis, treatment prescription, or clinical decision-making.
- No manipulation, emotional dependency design, or claims that the AI is a real friend/person.
- Encourage safe participation with parents, caregivers, and professionals.
- Minimize collected data.
- Do not use identifiable child data to train models without a separately approved legal, privacy, and consent framework.
- Provide appropriate reporting, review, and disable controls.
- Apply content filtering and safeguarding appropriate to children.
- Keep professional and parent authority explicit.

This feature requires a dedicated safety, privacy, and legal review before implementation or public claims.

## 9. Platforms and Experience Direction

The current product direction includes both web and mobile experiences.

### Web

Likely priorities:
- Public website and product information.
- Professional workspace.
- Admin workspace.
- Parent account and family management where useful.
- Academy/content management.

### Mobile

Likely priorities:
- Parent account and family navigation.
- Child-world selection and entry.
- Child-facing interaction mode.
- AAC and communication support.
- Activities and optional companion.
- Parent-facing activity and progress information.

The parent and child experiences may exist in the same mobile application with distinct modes. The child does not need a separate login or separate app in the current model.

### Experience principles

- Arabic and French localization should be considered from the beginning; exact language scope and content translation workflow require approval.
- Support right-to-left and left-to-right layouts.
- Prioritize accessibility, clarity, predictable navigation, and low cognitive load.
- Avoid overstimulation and unnecessary gamification.
- Consider low-connectivity conditions and offline access for critical resources, but do not promise full offline synchronization until technically validated.

## 10. Proposed Technical Direction (Not Yet Approved)

The following is a possible architecture, not a locked technical decision:

- Web: React + TypeScript.
- Mobile: Flutter.
- Backend: Laravel REST API.
- Database: PostgreSQL.
- Authentication: secure token/session strategy appropriate to web and mobile.
- File storage: private object storage with access-controlled delivery.
- Realtime: introduce only where justified by a validated use case.
- AI: provider-independent gateway with explicit policy, audit, and data controls.

The implementation agent must inspect the cloned repository before making technology assumptions. Existing project structure and dependencies are to be preserved unless the product owner explicitly approves a change.

## 11. Core Domain Concepts (Initial)

Potential domain entities:
- User
- Family
- ChildProfile
- ChildWorld
- ProfessionalProfile
- ProfessionalAssignment
- Consent / PermissionGrant
- CommunicationCategory
- CommunicationCard
- Activity
- Goal
- Routine
- ProgressEvent / Observation
- Resource / LearningContent
- AICompanionProfile
- Subscription / Plan (if monetization is approved)
- AuditLog

These are conceptual entities, not a final database schema. Do not generate migrations or code from this list without a separately approved architecture and requirements stage.

## 12. Security, Privacy, and Safeguarding Requirements

Treat child-related information as highly sensitive.

Baseline requirements:
- Server-side role and resource authorization.
- Parent-child ownership checks on every relevant operation.
- Explicit, revocable professional-child assignments and permissions.
- Strict per-child data isolation.
- Least-privilege access for Admin and Pro users.
- Audit logs for sensitive access and permission changes.
- Secure private file access.
- Data minimization and defined retention/deletion policies.
- Parent-facing consent and access controls.
- Safe AI context isolation per child.
- No exposure of one child's data through identifiers, search, caching, logs, or analytics.
- Secure session/token handling and protection against IDOR/BOLA.
- Review applicable Algerian data protection, child protection, and other legal requirements with qualified counsel before launch.

## 13. MVP Direction — Hypothesis, Not Scope Approval

A useful first end-to-end prototype/MVP workflow:

1. A parent creates an account.
2. The parent creates two child profiles.
3. Each child receives an independent Child World.
4. The parent authorizes a professional for one child.
5. The professional sees only that assigned child and permitted data.
6. The professional assigns an activity/resource.
7. The parent contributes familiar vocabulary or a home routine.
8. The child enters their world and uses a communication resource or activity.
9. Relevant activity events are recorded.
10. The parent and authorized professional review the history.

This workflow tests the defining product proposition: one family account, multiple isolated child worlds, and permission-based collaboration.

### Suggested prioritization

**Prototype-critical:**
- Role-aware entry points.
- Parent family account.
- Multiple child profiles.
- Child-world selection and experience.
- Professional assignment and permission model.
- AAC interaction example.
- Activity assignment and progress-event example.
- Admin governance overview.

**Later / subject to validation:**
- Advanced AI companion.
- Automated recommendations.
- Full academy/course platform.
- Advanced analytics.
- Payments and subscription automation.
- Full offline synchronization.

## 14. Business Model — Unvalidated Inputs

A prior project document proposed:
- Family subscription: 1,500 DZD/month and 12,000 DZD/year.
- Professional subscription: 5,000 DZD/month.
- Paid training/course possibilities.

These are **unvalidated pricing assumptions**, not approved prices or a final business model. Validate willingness to pay, customer segments, service costs, payment feasibility, and local market conditions before using these figures in a pitch deck.

Do not treat prior market-size, cost-reduction, acquisition, churn, or revenue projections as verified unless their sources and calculations are reviewed.

## 15. Brand Identity Direction

### Confirmed product-owner choices

- Logo direction: **Hybrid** — horizon + connected worlds.
- Palette direction: **More premium** than the initial soft palette.
- Brand tone: **Balanced** — professional and friendly.

### Proposed visual direction

**Brand name:** أفق | OFOQ

**Proposed tagline:** Every child has their own horizon.

**French:** Chaque enfant a son propre horizon.  
**Arabic:** لكل طفل أفقه الخاص.

**Brand personality:** trustworthy, warm, optimistic, thoughtful, and accessible.

**Visual concept:** a shared horizon connecting multiple individual worlds.

### Proposed core palette

| Token | Color | Hex | Intended use |
|---|---|---|---|
| Deep Horizon | Deep teal | `#17464A` | Primary identity, navigation, key actions |
| Soft Sky | Muted blue-grey | `#B5CDD0` | Secondary surfaces and calm backgrounds |
| Warm Clay | Muted terracotta | `#C9826B` | Warm accents and illustrations |
| Champagne | Muted gold | `#D7BD82` | Subtle highlights and milestones |

Supporting neutrals:
- Warm Ivory `#F7F5EF`
- Pure White `#FFFFFF`
- Deep Ink `#263438`
- Muted Slate `#68777A`
- Soft Border `#E5E6DF`

These are proposed tokens and must pass contrast/accessibility review before production.

### Proposed typography

- Arabic: IBM Plex Sans Arabic.
- Latin headings: Manrope.
- Latin body/UI: Inter.

### Visual language

- Premium, calm, human-centered.
- Abstract horizon/orbit motifs.
- Rounded but restrained components.
- Institutional OFOQ layer for website and dashboards.
- Personalized child-world layer for child experiences.
- No puzzle-piece clichés, medical-cross identity, or overly childish corporate branding.

### Brand status

The strategic direction is established, but final vector logo artwork, full brand guideline, and validated design-system components remain deliverables for the design phase. Do not describe concept mockups as finalized brand assets.

## 16. Existing Figma Reference — How to Reuse It

The supplied Figma reference includes navigation concepts such as Accueil, Mission, Collaboration, Services, Équipe, Contact, language selection, and appointment/contact actions.

Potentially reusable content themes:
- Mission and purpose.
- Services and support.
- Collaboration.
- Team/professional credibility.
- Contact and appointment/contact conversion.

Reframe these for a digital ecosystem. Do not imply OFOQ is the same Moroccan physical center. Replace all Moroccan location/contact data and unsupported team claims. The final website information architecture will be decided during the design/prototype phase.

## 17. Success Criteria for the Prototype

The prototype should demonstrate that:
- A parent can manage multiple children from one account.
- Each child has a distinct, independently navigable world.
- Child data and settings are isolated.
- A professional can access only explicitly assigned children and authorized information.
- Parent and professional contributions can coexist with clear provenance.
- A child can use a simple communication/pictogram interaction.
- Activities and progress events can be represented without inventing clinical scores.
- AI companion concepts include visible safety and parent controls if shown.
- Web and mobile experiences feel like one coherent OFOQ ecosystem.
- Arabic/French and RTL/LTR considerations are reflected in the design direction.

## 18. Open Questions Requiring Product-Owner Decisions

Do not silently decide these:
1. Exact launch age ranges and supported child profiles.
2. Whether initial focus is autism only or also broader communication/speech difficulties.
3. Initial regions and languages for launch (Arabic, Algerian dialect, French, Tamazight, or phased support).
4. Professional categories and credential-verification process.
5. Whether professionals are independent practitioners, centers, or both.
6. Parent-professional communication channels and boundaries.
7. AAC symbol/content source, licensing, voice, and language coverage.
8. Which features must work offline in the first release.
9. Whether AI companion belongs in the first MVP or a later controlled release.
10. Subscription model, payment provider, and final prices.
11. Data hosting, retention, consent, deletion, and legal compliance model.
12. Clinical/advisory governance and validation process.
13. Final logo artwork and brand guideline approval.
14. Exact prototype fidelity and demonstration scenario.

## 19. Decision and Change-Control Rules

- Treat explicit product-owner decisions as confirmed.
- Treat all unapproved ideas, architecture options, pricing, and roadmap items as proposals.
- Record decisions in the project's decision log with date, rationale, impact, and status.
- Record unresolved items in the open-questions file.
- Do not invent evidence, customers, partnerships, clinical validation, market statistics, or team credentials.
- Do not start implementation, migrations, infrastructure changes, or paid integrations as part of discovery documentation work.
- Ask for approval before advancing from one project phase to another.

---

**Current baseline:** OFOQ is an Algerian digital ecosystem with three account roles (Admin, Pro, Parent), parent-owned family accounts, multiple independent Child Worlds, communication support, professional collaboration, educational resources, and carefully governed AI-assisted personalization. The hybrid premium brand direction and balanced tone are selected; final assets and product details remain subject to explicit approval.
