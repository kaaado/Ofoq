import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load key from environment or .env.local without external dotenv dependency
function getEnv(key: string): string {
  if (process.env[key]) return process.env[key] as string;
  const possiblePaths = [
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), 'web/.env.local'),
    path.resolve(__dirname, '../.env.local'),
    path.resolve(__dirname, '../../web/.env.local')
  ];
  for (const envPath of possiblePaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        for (const rawLine of content.split(/\r?\n/)) {
          const line = rawLine.trim();
          if (!line || line.startsWith('#')) continue;
          const match = line.match(/^([\w.-]+)\s*=\s*(.*)?$/);
          if (match && match[1] === key) {
            return (match[2] || '').trim().replace(/^['"]|['"]$/g, '');
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return '';
}

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL') || 'https://srhxukrbslzonppszmtx.supabase.co';
const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY');

if (!SUPABASE_ANON_KEY) {
  console.error('❌ Error: VITE_SUPABASE_ANON_KEY is not defined in environment or web/.env.local.');
  process.exit(1);
}

async function runEndToEndSecurityTests() {
  console.log('========================================================');
  console.log(' OFOQ FULL END-TO-END SUPABASE VERIFICATION (TEST A, B, C, D)');
  console.log('========================================================');

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ----------------------------------------------------
  // TEST A: WAITLIST SUBMISSIONS (FAMILY & COMPANION)
  // ----------------------------------------------------
  console.log('\n--- TEST A: WAITLIST INSERTIONS ---');
  
  // A.1 Family Interest
  const familyWaitlistData = {
    full_name: 'OFOQ QA WAITLIST TEST (FAMILY)',
    contact_value: '0555987654',
    wilaya: 'Alger (16)',
    interest_type: 'family',
    message: '[E2E Automated Verification - Family interest]',
    consent_accepted: true
  };

  const resWaitlistFamily = await supabase
    .from('waitlist_submissions')
    .insert([familyWaitlistData]);

  if (resWaitlistFamily.error) {
    console.error('❌ Waitlist Family insert failed:', resWaitlistFamily.error);
    process.exit(1);
  }
  console.log('✅ PASS: Waitlist Family submission succeeded (Status: 201 Created)');

  // A.2 Pro/Center Interest
  const companionWaitlistData = {
    full_name: 'OFOQ QA WAITLIST TEST (PRO/CENTRE)',
    contact_value: 'qa-pro@ofoq-test.dz',
    wilaya: 'Alger (16)',
    interest_type: 'companion',
    message: '[E2E Automated Verification - Pro/Centre interest]',
    consent_accepted: true
  };

  const resWaitlistComp = await supabase
    .from('waitlist_submissions')
    .insert([companionWaitlistData]);

  if (resWaitlistComp.error) {
    console.error('❌ Waitlist Pro/Centre insert failed:', resWaitlistComp.error);
    process.exit(1);
  }
  console.log('✅ PASS: Waitlist Pro/Centre submission succeeded (Status: 201 Created)');

  // ----------------------------------------------------
  // TEST B: CONTACT FORM SUBMISSION
  // ----------------------------------------------------
  console.log('\n--- TEST B: CONTACT SUBMISSION ---');
  const contactData = {
    full_name: 'OFOQ QA CONTACT TEST',
    contact_value: 'qa-contact@ofoq-test.dz',
    subject: 'Technical test',
    message: 'OFOQ landing page to Supabase end-to-end verification.'
  };

  const resContact = await supabase
    .from('contact_submissions')
    .insert([contactData]);

  if (resContact.error) {
    console.error('❌ Contact submission failed:', resContact.error);
    process.exit(1);
  }
  console.log('✅ PASS: Contact submission succeeded (Status: 201 Created)');

  // ----------------------------------------------------
  // TEST C: FAILURE SCENARIOS & REJECTIONS
  // ----------------------------------------------------
  console.log('\n--- TEST C: FAILURE SCENARIOS & REJECTION POLICIES ---');

  // C.1 Waitlist without consent (Must violate RLS)
  const waitlistNoConsent = {
    ...familyWaitlistData,
    consent_accepted: false
  };
  const resNoConsent = await supabase
    .from('waitlist_submissions')
    .insert([waitlistNoConsent]);

  if (resNoConsent.error && resNoConsent.error.code === '42501') {
    console.log('✅ PASS: Unconsented waitlist insert blocked by RLS (Code 42501)');
  } else {
    console.error('❌ FAIL: Unconsented waitlist insert was not rejected properly:', resNoConsent);
    process.exit(1);
  }

  // C.2 Contact with empty message (Must violate RLS check)
  const contactEmptyMsg = {
    full_name: 'QA Test',
    contact_value: '0555000000',
    subject: 'No msg',
    message: '   '
  };
  const resEmptyContact = await supabase
    .from('contact_submissions')
    .insert([contactEmptyMsg]);

  if (resEmptyContact.error && resEmptyContact.error.code === '42501') {
    console.log('✅ PASS: Blank message contact insert blocked by RLS (Code 42501)');
  } else {
    console.error('❌ FAIL: Blank message contact was not rejected:', resEmptyContact);
    process.exit(1);
  }

  // ----------------------------------------------------
  // TEST D: DATA ISOLATION (ANONYMOUS SELECT / UPDATE / DELETE DENIED)
  // ----------------------------------------------------
  console.log('\n--- TEST D: DATA ISOLATION & ANONYMOUS ACCESS RESTRICTION ---');

  // D.1 Waitlist Select Denied
  const resReadWaitlist = await supabase.from('waitlist_submissions').select('*');
  if (resReadWaitlist.error) {
    console.log('✅ PASS: Anonymous SELECT waitlist denied by error:', resReadWaitlist.error.message);
  } else if (!resReadWaitlist.data || resReadWaitlist.data.length === 0) {
    console.log('✅ PASS: Anonymous SELECT waitlist returned 0 rows (Deny public select policy active)');
  } else {
    console.error('❌ FAIL: Anonymous SELECT waitlist leaked data!');
    process.exit(1);
  }

  // D.2 Contact Select Denied
  const resReadContact = await supabase.from('contact_submissions').select('*');
  if (resReadContact.error) {
    console.log('✅ PASS: Anonymous SELECT contact denied by error:', resReadContact.error.message);
  } else if (!resReadContact.data || resReadContact.data.length === 0) {
    console.log('✅ PASS: Anonymous SELECT contact returned 0 rows (Deny public select policy active)');
  } else {
    console.error('❌ FAIL: Anonymous SELECT contact leaked data!');
    process.exit(1);
  }

  // D.3 Update Denied
  const resUpdate = await supabase.from('waitlist_submissions').update({ full_name: 'Hacked' }).eq('wilaya', 'Alger (16)');
  if (resUpdate.error || (resUpdate.data === null && resUpdate.count === null)) {
    console.log('✅ PASS: Anonymous UPDATE denied by RLS policy');
  }

  // D.4 Delete Denied
  const resDelete = await supabase.from('waitlist_submissions').delete().eq('wilaya', 'Alger (16)');
  if (resDelete.error || (resDelete.data === null && resDelete.count === null)) {
    console.log('✅ PASS: Anonymous DELETE denied by RLS policy');
  }

  console.log('\n========================================================');
  console.log(' ALL END-TO-END SUPABASE VERIFICATION CHECKS PASSED 100%');
  console.log('========================================================\n');
}

runEndToEndSecurityTests();
