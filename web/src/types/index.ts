export interface WaitlistSubmission {
  id?: string;
  fullName: string;
  contactValue: string; // Phone number or Email
  wilaya: string;
  interestType: 'family' | 'companion';
  message?: string;
  consentAccepted: boolean;
  submittedAt?: string;
}

export interface ContactSubmission {
  id?: string;
  fullName: string;
  contactValue: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export type FormResponseKey =
  | 'forms.success.waitlist'
  | 'forms.success.contact'
  | 'forms.errors.validation'
  | 'forms.errors.duplicate'
  | 'forms.errors.network'
  | 'forms.errors.timeout'
  | 'forms.errors.server'
  | 'forms.errors.consent_required'
  | 'forms.errors.unknown';

export type FormResponse =
  | {
      success: true;
      messageKey: 'forms.success.waitlist' | 'forms.success.contact';
      recordId?: string;
    }
  | {
      success: false;
      messageKey: FormResponseKey;
      fieldErrors?: Record<string, string>;
      rawError?: string;
    };

// Backward-compatible alias for existing imports
export type WaitlistResult = FormResponse;

export interface ContactInquiry {
  fullName: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  consentAccepted: boolean;
}

export type SupportedLanguage = 'fr' | 'ar' | 'en';
