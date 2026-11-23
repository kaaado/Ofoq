export const ALGERIAN_WILAYAS = [
  { code: '16', nameFr: '16 - Alger (Pilote Officiel)', nameAr: '16 - الجزائر (الإطلاق التجريبي الأول)' },
  { code: '09', nameFr: '09 - Blida', nameAr: '09 - البليدة' },
  { code: '35', nameFr: '35 - Boumerdès', nameAr: '35 - بومرداس' },
  { code: '42', nameFr: '42 - Tipaza', nameAr: '42 - تيبازة' },
  { code: '31', nameFr: '31 - Oran', nameAr: '31 - وهران' },
  { code: '25', nameFr: '25 - Constantine', nameAr: '25 - قسنطينة' },
  { code: '23', nameFr: '23 - Annaba', nameAr: '23 - عنابة' },
  { code: '15', nameFr: '15 - Tizi Ouzou', nameAr: '15 - تيزي وزو' },
  { code: '06', nameFr: '06 - Béjaïa', nameAr: '06 - بجاية' },
  { code: '19', nameFr: '19 - Sétif', nameAr: '19 - سطيف' },
  { code: '13', nameFr: '13 - Tlemcen', nameAr: '13 - تلمسان' },
  { code: 'other', nameFr: 'Autre Wilaya d\'Algérie', nameAr: 'ولاية جزائرية أخرى' }
];

export function validateContact(value: string): boolean {
  if (!value || value.trim().length < 5) return false;
  const trimmed = value.trim();
  
  // Algerian phone regex (05/06/07 followed by 8 digits, or +213 format)
  const phoneRegex = /^(0|\+213)[567][0-9]{8}$/;
  // Standard email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return phoneRegex.test(trimmed.replace(/[\s-]/g, '')) || emailRegex.test(trimmed);
}
