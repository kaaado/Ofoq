---
name: Engineering Task
about: Software architecture or engineering specification for OFOQ
title: "[ENG]: "
labels: ["engineering", "architecture"]
assignees: ''
---

### Module & Task ID
- **Task ID:** `TASK-XXX`
- **Domain Module:** (IAM & Accounts / Child Worlds & AAC / Family Management / Professional Collaboration / OFOQ Academy / Privacy & Security)
- **Priority:** (P0 / P1 / P2)

### Technical Description
<!-- Detail endpoints, data schemas, authorization rules, or component logic -->

### Security & Privacy Considerations
- [ ] Algerian Law 18-07 data protection compliance verified
- [ ] Three account roles strictly enforced (Admin, Pro, Parent — no child login credentials)
- [ ] Child World tenant isolation guard implemented (prevention of BOLA/IDOR)
- [ ] Explicit, revocable professional assignment permission verified
- [ ] Immutable audit trail event emitted for sensitive operations
- [ ] Absolute prohibition of client-side secret leakage

### Acceptance Criteria
- [ ] Unit & integration tests pass with $\ge 80\%$ coverage
- [ ] Three-Face engineering review completed (Architect, QA, AppSec)
- [ ] Documentation updated in repository
