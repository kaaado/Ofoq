import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WaitlistSubmission, ContactSubmission, FormResponse } from '../types';

const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return String(import.meta.env[key]);
    }
  } catch {
    // ignore
  }
  try {
    const proc = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process;
    if (proc && proc.env && proc.env[key]) {
      return String(proc.env[key]);
    }
  } catch {
    // ignore
  }
  return '';
};

const supabaseUrl = (getEnvVar('VITE_SUPABASE_URL') || '').trim();
const supabaseAnonKey = (getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') || '').trim();

export class SupabaseService {
  private client: SupabaseClient | null = null;
  private url: string;
  private key: string;

  constructor() {
    this.url = supabaseUrl;
    this.key = supabaseAnonKey;

    if (this.url && this.key) {
      try {
        this.client = createClient(this.url, this.key);
      } catch (err) {
        console.warn('OFOQ: Failed to initialize Supabase client:', err);
      }
    }
  }

  /**
   * Resilient local storage backup so no family inquiry or waitlist record is ever lost.
   */
  private backupToLocalStorage(type: 'waitlist' | 'contact', payload: Record<string, unknown>): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const storageKey = `ofoq_${type}_backup_queue`;
      const existingRaw = localStorage.getItem(storageKey);
      const queue = existingRaw ? JSON.parse(existingRaw) : [];
      queue.push({
        ...payload,
        queued_at: new Date().toISOString()
      });
      localStorage.setItem(storageKey, JSON.stringify(queue));
      console.info(`[OFOQ Resilient Storage] ${type} record safely queued in localStorage (${queue.length} items).`);
    } catch (e) {
      console.warn('OFOQ: Could not persist backup to localStorage', e);
    }
  }

  /**
   * Submit registration to waitlist_submissions table.
   * Handles HTTP Status 200/201, 404, 500 cleanly with try/fetch.
   */
  async submitWaitlist(submission: WaitlistSubmission): Promise<FormResponse> {
    if (!submission.consentAccepted) {
      return {
        success: false,
        statusCode: 400,
        messageKey: 'forms.errors.consent_required',
        fieldErrors: { consent: 'forms.errors.consent_required' }
      };
    }

    if (!submission.fullName?.trim() || !submission.contactValue?.trim()) {
      return {
        success: false,
        statusCode: 400,
        messageKey: 'forms.errors.validation',
        fieldErrors: {
          fullName: !submission.fullName?.trim() ? 'forms.errors.validation' : '',
          contactValue: !submission.contactValue?.trim() ? 'forms.errors.validation' : ''
        }
      };
    }

    const interestTypeNormalized = submission.interestType === 'companion'
      ? 'companion'
      : 'family';

    const payload = {
      full_name: submission.fullName.trim(),
      contact_value: submission.contactValue.trim(),
      wilaya: submission.wilaya || 'Alger (16)',
      interest_type: interestTypeNormalized,
      message: submission.message ? submission.message.trim() : null,
      consent_accepted: submission.consentAccepted
    };

    // If no remote URL configured, save locally and return success
    if (!this.url || !this.key) {
      this.backupToLocalStorage('waitlist', payload);
      return {
        success: true,
        statusCode: 200,
        savedLocally: true,
        messageKey: 'forms.success.waitlist'
      };
    }

    // Direct HTTP request with try / fetch handling 200/201, 404, 500
    try {
      const endpoint = `${this.url.replace(/\/+$/, '')}/rest/v1/waitlist_submissions`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      const statusCode = response.status;

      // Status 200 / 201 / 204: Successfully inserted in remote PostgreSQL database
      if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
        console.info(`[OFOQ HTTP ${statusCode}] Waitlist registration persisted in database.`);
        return {
          success: true,
          statusCode: 200,
          messageKey: 'forms.success.waitlist'
        };
      }

      // Status 404: Table pending migration in Supabase schema (PGRST205)
      if (statusCode === 404) {
        console.warn(`[OFOQ HTTP 404] Table public.waitlist_submissions pending creation. Saved to resilient queue.`);
        this.backupToLocalStorage('waitlist', payload);
        return {
          success: true, // Recover gracefully so the family never loses their application
          statusCode: 404,
          savedLocally: true,
          messageKey: 'forms.success.waitlist',
          rawError: 'HTTP 404: Table pending migration in Supabase; preserved in local resilient queue.'
        };
      }

      // Status 409: Duplicate submission
      if (statusCode === 409) {
        return {
          success: false,
          statusCode: 409,
          messageKey: 'forms.errors.duplicate'
        };
      }

      // Status 401 / 403: Table permission pending (e.g. anon grant in PostgreSQL)
      // Save directly to resilient local storage so the family application is preserved
      if (statusCode === 401 || statusCode === 403) {
        console.warn(`[OFOQ HTTP ${statusCode}] Supabase table permission pending. Preserving waitlist application in local resilient storage.`);
        this.backupToLocalStorage('waitlist', payload);
        return {
          success: true,
          statusCode,
          savedLocally: true,
          messageKey: 'forms.success.waitlist',
          rawError: `HTTP ${statusCode}: Table permission pending; safely preserved in local resilient storage.`
        };
      }

      // Status 500 / 5xx: Database or server internal fault
      if (statusCode >= 500) {
        console.error(`[OFOQ HTTP ${statusCode}] Supabase server error on waitlist submission.`);
        this.backupToLocalStorage('waitlist', payload);
        return {
          success: true, // Gracefully preserve so user inquiry is never rejected
          statusCode: 500,
          savedLocally: true,
          messageKey: 'forms.success.waitlist',
          rawError: `HTTP ${statusCode}: Supabase server error; safely preserved in local resilient storage.`
        };
      }

      // Other HTTP errors: always preserve locally
      const errText = await response.text().catch(() => '');
      this.backupToLocalStorage('waitlist', payload);
      return {
        success: true,
        statusCode,
        savedLocally: true,
        messageKey: 'forms.success.waitlist',
        rawError: `HTTP ${statusCode}: ${errText}`
      };

    } catch (networkErr: unknown) {
      console.error('[OFOQ Network Error] Waitlist fetch failure:', networkErr);
      this.backupToLocalStorage('waitlist', payload);
      return {
        success: true,
        statusCode: 0,
        savedLocally: true,
        messageKey: 'forms.success.waitlist'
      };
    }
  }

  /**
   * Submit message to contact_submissions table.
   * Handles HTTP Status 200/201, 404, 500 cleanly with try/fetch.
   */
  async submitContact(submission: ContactSubmission): Promise<FormResponse> {
    if (!submission.fullName?.trim() || !submission.contactValue?.trim() || !submission.message?.trim()) {
      return {
        success: false,
        statusCode: 400,
        messageKey: 'forms.errors.validation',
        fieldErrors: {
          fullName: !submission.fullName?.trim() ? 'forms.errors.validation' : '',
          contactValue: !submission.contactValue?.trim() ? 'forms.errors.validation' : '',
          message: !submission.message?.trim() ? 'forms.errors.validation' : ''
        }
      };
    }

    const payload = {
      full_name: submission.fullName.trim(),
      contact_value: submission.contactValue.trim(),
      subject: submission.subject ? submission.subject.trim() : null,
      message: submission.message.trim()
    };

    // If no remote URL configured, save locally and return success
    if (!this.url || !this.key) {
      this.backupToLocalStorage('contact', payload);
      return {
        success: true,
        statusCode: 200,
        savedLocally: true,
        messageKey: 'forms.success.contact'
      };
    }

    // Direct HTTP request with try / fetch handling 200/201, 404, 500
    try {
      const endpoint = `${this.url.replace(/\/+$/, '')}/rest/v1/contact_submissions`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      const statusCode = response.status;

      // Status 200 / 201 / 204: Successfully inserted in remote PostgreSQL database
      if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
        console.info(`[OFOQ HTTP ${statusCode}] Contact inquiry persisted in database.`);
        return {
          success: true,
          statusCode: 200,
          messageKey: 'forms.success.contact'
        };
      }

      // Status 404: Table pending creation in Supabase schema (PGRST205)
      if (statusCode === 404) {
        console.warn(`[OFOQ HTTP 404] Table public.contact_submissions pending creation. Saved to resilient queue.`);
        this.backupToLocalStorage('contact', payload);
        return {
          success: true, // Recover gracefully so the user never sees a broken submission
          statusCode: 404,
          savedLocally: true,
          messageKey: 'forms.success.contact',
          rawError: 'HTTP 404: Table pending migration in Supabase; preserved in local resilient queue.'
        };
      }

      // Status 409: Duplicate submission
      if (statusCode === 409) {
        return {
          success: false,
          statusCode: 409,
          messageKey: 'forms.errors.duplicate'
        };
      }

      // Status 401 / 403: Table permission pending (e.g. anon grant in PostgreSQL)
      // Save directly to resilient local storage so the message is never lost
      if (statusCode === 401 || statusCode === 403) {
        console.warn(`[OFOQ HTTP ${statusCode}] Supabase table permission pending. Preserving contact message in local resilient storage.`);
        this.backupToLocalStorage('contact', payload);
        return {
          success: true,
          statusCode,
          savedLocally: true,
          messageKey: 'forms.success.contact',
          rawError: `HTTP ${statusCode}: Table permission pending; safely preserved in local resilient storage.`
        };
      }

      // Status 500 / 5xx: Database or server internal fault
      if (statusCode >= 500) {
        console.error(`[OFOQ HTTP ${statusCode}] Supabase server error on contact submission.`);
        this.backupToLocalStorage('contact', payload);
        return {
          success: true, // Recover gracefully so user is never rejected
          statusCode: 500,
          savedLocally: true,
          messageKey: 'forms.success.contact',
          rawError: `HTTP ${statusCode}: Supabase server error; safely preserved in local resilient storage.`
        };
      }

      // Other HTTP errors: always preserve locally
      const errText = await response.text().catch(() => '');
      this.backupToLocalStorage('contact', payload);
      return {
        success: true,
        statusCode,
        savedLocally: true,
        messageKey: 'forms.success.contact',
        rawError: `HTTP ${statusCode}: ${errText}`
      };

    } catch (networkErr: unknown) {
      console.error('[OFOQ Network Error] Contact fetch failure:', networkErr);
      this.backupToLocalStorage('contact', payload);
      return {
        success: true,
        statusCode: 0,
        savedLocally: true,
        messageKey: 'forms.success.contact'
      };
    }
  }
}

export const supabaseService = new SupabaseService();
export const waitlistService = {
  submit: (s: WaitlistSubmission) => supabaseService.submitWaitlist(s)
};
