/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_EMERGENCY_HOTLINE?: string;
  readonly VITE_PILOT_WILAYA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
