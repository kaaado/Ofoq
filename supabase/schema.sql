-- ==============================================================================
-- OFOQ (أفق) Production Supabase Database Schema & Row Level Security (RLS)
-- Execution target: Supabase Dashboard -> SQL Editor
-- Project URL: https://bokkbhazinqexllmmgxc.supabase.co
-- ==============================================================================

-- 1. Table: public.waitlist_submissions
CREATE TABLE IF NOT EXISTS public.waitlist_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    wilaya TEXT NOT NULL DEFAULT 'Alger (16)',
    interest_type TEXT NOT NULL CHECK (interest_type IN ('family', 'companion', 'center')),
    message TEXT,
    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous/authenticated visitors to submit their waitlist application
DROP POLICY IF EXISTS "Allow public insert on waitlist" ON public.waitlist_submissions;
CREATE POLICY "Allow public insert on waitlist" 
ON public.waitlist_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (
    consent_accepted = TRUE 
    AND length(trim(full_name)) >= 2 
    AND length(trim(contact_value)) >= 5
);

-- Deny public reading (Strict Data Minimization / Algerian Law 18-07 privacy)
DROP POLICY IF EXISTS "Deny public read on waitlist" ON public.waitlist_submissions;
CREATE POLICY "Deny public read on waitlist" 
ON public.waitlist_submissions 
FOR SELECT 
TO anon, authenticated 
USING (false);


-- 2. Table: public.contact_submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous/authenticated visitors to submit inquiries
DROP POLICY IF EXISTS "Allow public insert on contact" ON public.contact_submissions;
CREATE POLICY "Allow public insert on contact" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (
    length(trim(full_name)) >= 2 
    AND length(trim(contact_value)) >= 5 
    AND length(trim(message)) >= 5
);

-- Deny public reading (Strict Data Isolation)
DROP POLICY IF EXISTS "Deny public read on contact" ON public.contact_submissions;
CREATE POLICY "Deny public read on contact" 
ON public.contact_submissions 
FOR SELECT 
TO anon, authenticated 
USING (false);

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- ==============================================================================
-- 3. Explicit Grants for PostgREST anon and authenticated roles
-- (Required in PostgreSQL so anon role can execute INSERT before RLS checks)
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.waitlist_submissions TO anon, authenticated;
GRANT INSERT ON TABLE public.contact_submissions TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

