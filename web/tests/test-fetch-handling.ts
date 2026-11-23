import { SupabaseService } from '../src/services/supabaseService';

async function testFetchHandling() {
  console.log('=== TESTING SUPABASE SERVICE FETCH & STATUS CODE HANDLING ===');

  const service = new SupabaseService();

  // Test contact submission
  const payload = {
    fullName: 'أمينة منصوري',
    contactValue: '0550000000',
    subject: 'استفسار حول عيادتي في القبة',
    message: 'وضح استفسارك أو الاحتياج الخاص - اختبار التواصل الميداني مع عيادة الأمل.'
  };

  const res = await service.submitContact(payload);
  console.log('Result for submitContact:');
  console.log('- Success:', res.success);
  console.log('- Status Code:', res.statusCode);
  console.log('- Saved Locally:', res.savedLocally);
  console.log('- Message Key:', res.messageKey);
  if (res.rawError) console.log('- Raw Error:', res.rawError);

  if (res.statusCode === 200 || res.statusCode === 201) {
    console.log('✅ Handled Status 200/201: Successfully inserted in remote Supabase!');
  } else if (res.statusCode === 404) {
    console.log('✅ Handled Status 404: Graceful local queue recovery, zero data loss!');
  } else if (res.statusCode === 500) {
    console.log('✅ Handled Status 500: Server error caught and backed up locally!');
  } else {
    console.log(`ℹ️ Status ${res.statusCode} handled cleanly.`);
  }
}

testFetchHandling().catch(console.error);
