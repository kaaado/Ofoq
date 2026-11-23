# OFOQ Pre-Launch Persistence Architecture (Supabase / PostgreSQL)

**Document Identifier:** `DOC-WEB-SUPABASE`  
**Revision:** 2.0  
**Date:** November 2026  
**Status:** Pre-Launch Specification  

---

## 1. Architectural Scope & Purpose

During the pre-launch phase (Phases 01 and 02), client persistence is restricted strictly to **waitlist registrations** and **general inquiries**. No clinical child profiles, medical notes, or identity documents are collected or transmitted.

### 1.1 Dedicated Infrastructure Requirements
- **Database Engine:** PostgreSQL 15+ hosted on a dedicated Supabase project (OFOQ Production / Staging).
- **Region:** European or local data residency (e.g. `eu-west-1` / Frankfurt / Paris) to align with Law 18-07 cross-border compliance standards.
- **Security Posture:** Zero anonymous read access; Row Level Security (RLS) enabled on all public schemas.

---

## 2. Pre-Launch Schemas & RLS Policies

### 2.1 Table: `public.waitlist_submissions`

Stores early access requests from families and healthcare professionals.

```sql
CREATE TABLE public.waitlist_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    wilaya TEXT NOT NULL DEFAULT 'Alger (16)',
    interest_type TEXT NOT NULL CHECK (interest_type IN ('family', 'companion', 'center')),
    message TEXT,
    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to INSERT early access applications
CREATE POLICY "Allow public insert on waitlist" 
ON public.waitlist_submissions 
FOR INSERT 
TO anon 
WITH CHECK (
    consent_accepted = TRUE 
    AND length(full_name) >= 2 
    AND length(contact_value) >= 5
);

-- Deny public reading (only authenticated admins can inspect waitlist)
CREATE POLICY "Deny public read on waitlist" 
ON public.waitlist_submissions 
FOR SELECT 
TO anon 
USING (false);
```

### 2.2 Table: `public.contact_submissions`

Stores inquiries submitted via the contact section.

```sql
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT
CREATE POLICY "Allow public insert on contact" 
ON public.contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (
    length(full_name) >= 2 
    AND length(contact_value) >= 5 
    AND length(message) >= 5
);

-- Deny public reading
CREATE POLICY "Deny public read on contact" 
ON public.contact_submissions 
FOR SELECT 
TO anon 
USING (false);
```

---

## 3. Law 18-07 Data Governance Safeguards

1. **Minimization Enforcement:** Database rejects entries without explicit `consent_accepted = TRUE`.
2. **Pediatric Exclusion:** Schema strictly omits child names, dates of birth, medical history, or diagnosis codes.
3. **Audit Trail:** Submission timestamps are preserved for regulatory accountability with the ANPDP.
