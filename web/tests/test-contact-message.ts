import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function getEnv(key: string): string {
  const envPath = path.resolve(process.cwd(), 'web/.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([\w.-]+)\s*=\s*(.*)?$/);
      if (match && match[1] === key) {
        return (match[2] || '').trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  return '';
}

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://bokkbhazinqexllmmgxc.supabase.co';
const supabaseKey = getEnv('VITE_SUPABASE_PUBLISHABLE_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');

async function testContactForm() {
  console.log('=== OFOQ CONTACT MESSAGE SENDING VERIFICATION ===');
  console.log('Supabase Target URL:', supabaseUrl);
  console.log('API Key Present:', Boolean(supabaseKey));

  const supabase = createClient(supabaseUrl, supabaseKey);

  const payload = {
    full_name: 'أمينة منصوري',
    contact_value: '0550000000',
    subject: 'استفسار حول عيادتي في القبة',
    message: 'وضح استفسارك أو الاحتياج الخاص - استفسار حول عيادتي في القبة وتدريب النطق لأطفال التوحد.'
  };

  console.log('\nSubmitting message to Supabase table: public.contact_submissions...');
  console.log(JSON.stringify(payload, null, 2));

  const { data, error, status } = await supabase
    .from('contact_submissions')
    .insert([payload])
    .select();

  console.log('\n--- HTTP RESPONSE STATUS:', status, '---');
  if (error) {
    console.log('❌ Result: Message was NOT stored in database.');
    console.log('Error Code:', error.code);
    console.log('Error Message:', error.message);
    console.log('Reason: The table "public.contact_submissions" does not exist yet in the Supabase schema.');
  } else {
    console.log('✅ Result: Message was successfully SENT and PERSISTED!');
    console.log('Inserted Record Data:', data);
  }
}

testContactForm().catch(console.error);
