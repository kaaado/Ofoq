import fs from 'fs';
import path from 'path';
import { validateContact } from '../src/utils/validation';

console.log('--- STARTING OFOQ TEST SUITE (PARITY & VALIDATION) ---');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✅ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${msg}`);
    failed++;
  }
}

// 1. Phone validation
assert(validateContact('0555123456') === true, 'Valid Mobilis 05 format');
assert(validateContact('0661123456') === true, 'Valid Djezzy 06 format');
assert(validateContact('0770123456') === true, 'Valid Ooredoo 07 format');
assert(validateContact('+213555123456') === true, 'Valid Algerian E.164 +213 format');
assert(validateContact('contact@ofoq.dz') === true, 'Valid email format');
assert(validateContact('0555') === false, 'Reject invalid short phone');
assert(validateContact('invalid_string') === false, 'Reject arbitrary string');
assert(validateContact('') === false, 'Reject empty string');

// 2. i18n Parity Check across AR, FR, EN
const localesDir = fs.existsSync(path.resolve('web/src/i18n/locales'))
  ? path.resolve('web/src/i18n/locales')
  : path.resolve('src/i18n/locales');
const fr = JSON.parse(fs.readFileSync(path.join(localesDir, 'fr.json'), 'utf-8'));
const ar = JSON.parse(fs.readFileSync(path.join(localesDir, 'ar.json'), 'utf-8'));
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8'));

function getNestedKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const k of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getNestedKeys(obj[k], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const frKeys = new Set(getNestedKeys(fr));
const arKeys = new Set(getNestedKeys(ar));
const enKeys = new Set(getNestedKeys(en));

// Check parity bidirectionally
const missingInAr = [...frKeys].filter((k) => !arKeys.has(k));
const missingInEn = [...frKeys].filter((k) => !enKeys.has(k));
const extraInAr = [...arKeys].filter((k) => !frKeys.has(k));
const extraInEn = [...enKeys].filter((k) => !frKeys.has(k));

assert(missingInAr.length === 0, `All FR keys present in AR (missing: ${missingInAr.join(', ') || 'none'})`);
assert(missingInEn.length === 0, `All FR keys present in EN (missing: ${missingInEn.join(', ') || 'none'})`);
assert(extraInAr.length === 0, `All AR keys present in FR (extra in AR: ${extraInAr.join(', ') || 'none'})`);
assert(extraInEn.length === 0, `All EN keys present in FR (extra in EN: ${extraInEn.join(', ') || 'none'})`);

// 2b. Check that all t('key') calls in src/ exist in locales
function getSourceFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(getSourceFiles(full));
    else if (full.endsWith('.tsx') || full.endsWith('.ts')) results.push(full);
  }
  return results;
}

const srcDir = fs.existsSync(path.resolve('web/src')) ? path.resolve('web/src') : path.resolve('src');
const srcFiles = getSourceFiles(srcDir);
const keyRegex = /\bt\(['"]([a-zA-Z0-9_.]+)['"]/g;
const usedKeysInCode = new Set<string>();

srcFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = keyRegex.exec(content)) !== null) {
    usedKeysInCode.add(match[1]);
  }
});

const missingUsedInFr = [...usedKeysInCode].filter((k) => !frKeys.has(k));
assert(missingUsedInFr.length === 0, `All code t() keys (${usedKeysInCode.size}) exist in locales (missing: ${missingUsedInFr.join(', ') || 'none'})`);

// 3. Form response contract keys presence
const requiredFormKeys = [
  'forms.success.waitlist',
  'forms.success.contact',
  'forms.errors.validation',
  'forms.errors.duplicate',
  'forms.errors.network',
  'forms.errors.timeout',
  'forms.errors.server',
  'forms.errors.consent_required',
  'forms.errors.unknown'
];

requiredFormKeys.forEach((key) => {
  assert(frKeys.has(key), `FR has form key ${key}`);
  assert(arKeys.has(key), `AR has form key ${key}`);
  assert(enKeys.has(key), `EN has form key ${key}`);
});

// 4. Verification of single brand dynamic names
assert(ar.brand.name === 'أفق', 'Arabic brand name is purely أفق without Latin');
assert(fr.brand.name === 'OFOQ', 'French brand name is purely OFOQ without Arabic');
assert(en.brand.name === 'OFOQ', 'English brand name is purely OFOQ without Arabic');

// 5. Non-diagnostic boundary & safety notice in all 3 languages
assert(ar.boundaries.title.includes('تشخيصية') && ar.footer.non_diagnostic_notice.includes('تشخيص'), 'Arabic declares non-diagnostic boundary');
assert(fr.boundaries.title.toLowerCase().includes('non-diagnostique') && fr.footer.non_diagnostic_notice.includes('diagnostic'), 'French declares non-diagnostic boundary');
assert(en.boundaries.title.toLowerCase().includes('non-diagnostic') && en.footer.non_diagnostic_notice.includes('diagnos'), 'English declares non-diagnostic boundary');

console.log(`--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
if (failed > 0) process.exit(1);
