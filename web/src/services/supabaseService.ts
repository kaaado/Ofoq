import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WaitlistSubmission, ContactSubmission, FormResponse } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export class SupabaseService {
  private client: SupabaseClient | null = null;

  constructor() {
    if (supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '') {
      try {
        this.client = createClient(supabaseUrl, supabaseAnonKey);
      } catch (err) {
        console.warn('OFOQ: Failed to initialize Supabase client:', err);
      }
    }
  }

  /**
   * Submit registration to waitlist_submissions table.
   */
  async submitWaitlist(submission: WaitlistSubmission): Promise<FormResponse> {
    if (!submission.consentAccepted) {
      return {
        success: false,
        messageKey: 'forms.errors.consent_required',
        fieldErrors: { consent: 'forms.errors.consent_required' }
      };
    }

    if (!submission.fullName?.trim() || !submission.contactValue?.trim()) {
      return {
        success: false,
        messageKey: 'forms.errors.validation',
        fieldErrors: {
          fullName: !submission.fullName?.trim() ? 'forms.errors.validation' : '',
          contactValue: !submission.contactValue?.trim() ? 'forms.errors.validation' : ''
        }
      };
    }

    if (!this.client) {
      return {
        success: false,
        messageKey: 'forms.errors.server'
      };
    }

    try {
      const { error } = await this.client
        .from('waitlist_submissions')
        .insert([
          {
            full_name: submission.fullName.trim(),
            contact_value: submission.contactValue.trim(),
            wilaya: submission.wilaya || 'Alger (16)',
            interest_type: submission.interestType,
            message: submission.message ? submission.message.trim() : null,
            consent_accepted: submission.consentAccepted
          }
        ]);

      if (error) {
        console.error('OFOQ Supabase waitlist error code:', error.code, error.message);
        if (error.code === '42501') {
          return {
            success: false,
            messageKey: 'forms.errors.consent_required'
          };
        }
        if (error.code === '23505') {
          return {
            success: false,
            messageKey: 'forms.errors.duplicate'
          };
        }
        return {
          success: false,
          messageKey: 'forms.errors.server',
          rawError: error.message
        };
      }

      return {
        success: true,
        messageKey: 'forms.success.waitlist'
      };
    } catch (err: unknown) {
      console.error('OFOQ Supabase network error:', err);
      return {
        success: false,
        messageKey: 'forms.errors.network'
      };
    }
  }

  /**
   * Submit message to contact_submissions table.
   */
  async submitContact(submission: ContactSubmission): Promise<FormResponse> {
    if (!submission.fullName?.trim() || !submission.contactValue?.trim() || !submission.message?.trim()) {
      return {
        success: false,
        messageKey: 'forms.errors.validation',
        fieldErrors: {
          fullName: !submission.fullName?.trim() ? 'forms.errors.validation' : '',
          contactValue: !submission.contactValue?.trim() ? 'forms.errors.validation' : '',
          message: !submission.message?.trim() ? 'forms.errors.validation' : ''
        }
      };
    }

    if (!this.client) {
      return {
        success: false,
        messageKey: 'forms.errors.server'
      };
    }

    try {
      const { error } = await this.client
        .from('contact_submissions')
        .insert([
          {
            full_name: submission.fullName.trim(),
            contact_value: submission.contactValue.trim(),
            subject: submission.subject ? submission.subject.trim() : null,
            message: submission.message.trim()
          }
        ]);

      if (error) {
        console.error('OFOQ Supabase contact error code:', error.code, error.message);
        if (error.code === '23505') {
          return {
            success: false,
            messageKey: 'forms.errors.duplicate'
          };
        }
        return {
          success: false,
          messageKey: 'forms.errors.server',
          rawError: error.message
        };
      }

      return {
        success: true,
        messageKey: 'forms.success.contact'
      };
    } catch (err: unknown) {
      console.error('OFOQ Supabase contact network error:', err);
      return {
        success: false,
        messageKey: 'forms.errors.network'
      };
    }
  }
}

export const supabaseService = new SupabaseService();
// Backward compatibility wrapper for existing waitlistService import
export const waitlistService = {
  submit: (s: WaitlistSubmission) => supabaseService.submitWaitlist(s)
};
