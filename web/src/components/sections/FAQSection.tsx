import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

export const FAQSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { effectiveReducedMotion } = useSensoryPreferences();
  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqKeys = [1, 2, 3, 4, 5] as const;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: effectiveReducedMotion ? 'auto' : 'smooth',
      });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-4 py-1.5 rounded-full border border-[#A9C5D8]/50 shadow-sm">
            {t('faq.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#172B46] tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="text-base text-[#5B6E85] max-w-xl mx-auto leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4 text-start">
        {faqKeys.map((num, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-trigger-${num}`;
          const panelId = `faq-content-${num}`;

          return (
            <ScrollReveal key={num} delay={idx * 0.04}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#2868C7]/40 glass-surface-3 shadow-glass ring-1 ring-[#2868C7]/20'
                    : 'border-white/80 glass-surface-1 hover:border-[#2868C7]/30 hover:shadow-sm'
                }`}
              >
                <button
                  id={buttonId}
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 min-h-[56px] flex items-center justify-between text-start gap-4 cursor-pointer focus-ring rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#172B46] leading-snug">
                    {t(`faq.q${num}`)}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#2868C7] text-white rotate-180 shadow-sm'
                        : 'bg-black/05 text-[#172B46]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: effectiveReducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5B6E85] leading-relaxed border-t border-[#172B46]/08">
                        {t(`faq.a${num}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Helpful Contact Touchpoint */}
      <ScrollReveal delay={0.2}>
        <div className="pt-2 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 px-6 rounded-2xl glass-surface-1 border border-white/80 shadow-sm text-xs sm:text-sm text-[#5B6E85]">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} className="text-[#2868C7] shrink-0" />
              <span>
                {isAr
                  ? 'هل لديكم تساؤل خاص لم تجدوا إجابته هنا؟'
                  : isEn
                  ? 'Have a specific question not covered here?'
                  : 'Vous avez une question spécifique non traitée ici ?'}
              </span>
            </div>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="text-[#2868C7] hover:text-[#172B46] font-bold inline-flex items-center gap-1 transition-colors focus-ring rounded-lg px-2 py-1 min-h-[44px]"
            >
              <span>{isAr ? 'تواصلوا مباشرة مع فريقنا' : isEn ? 'Contact our team directly' : 'Contactez notre équipe directement'}</span>
              <ArrowRight size={14} className="rtl-flip text-[#9E4E3D]" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
