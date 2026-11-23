import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import ar from './locales/ar.json';
import en from './locales/en.json';

const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const urlLang = urlParams?.get('lang');
const validLang = urlLang && ['ar', 'fr', 'en'].includes(urlLang) ? urlLang : null;
const savedLang = validLang || localStorage.getItem('ofoq_language') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      ar: { translation: ar },
      en: { translation: en }
    },
    lng: savedLang,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

// Apply document direction and tab title whenever language changes
export function applyLanguageSettings(lang: string) {
  const isRTL = lang === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  localStorage.setItem('ofoq_language', lang);

  const titles: Record<string, string> = {
    ar: 'أفق | منظومة متصلة للأطفال ذوي التوحد وصعوبات النطق',
    fr: 'OFOQ | Écosystème connecté pour l\'autisme & troubles du langage',
    en: 'OFOQ | Connected Ecosystem for Autism & Speech Difficulties'
  };

  const descriptions: Record<string, string> = {
    ar: 'أفق (OFOQ) - منظومة رقمية متصلة لتعزيز التواصل البديل والتنسيق بين الأولياء والأخصائيين للأطفال ذوي التوحد وصعوبات النطق في الجزائر.',
    fr: 'OFOQ - Écosystème numérique connecté dédié à la CAA, à la continuité éducative et à la coordination familles-spécialistes en Algérie.',
    en: 'OFOQ - Connected digital ecosystem for AAC, educational continuity, and parent-specialist collaboration in Algeria.'
  };

  document.title = titles[lang] || titles.fr;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', descriptions[lang] || descriptions.fr);
  }
}

// Initial application
applyLanguageSettings(savedLang);

i18n.on('languageChanged', (lng) => {
  applyLanguageSettings(lng);
});

export default i18n;
