import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqKeys = [1, 2, 3, 4, 5];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/50">
            {t('faq.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172B46]">
            {t('faq.title')}
          </h2>
          <p className="text-base text-[#5B6E85] max-w-xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4 text-start">
        {faqKeys.map((num, idx) => {
          const isOpen = openIndex === idx;
          return (
            <ScrollReveal key={num} delay={idx * 0.05}>
              <div
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D58C7A]/50 bg-white shadow-md'
                    : 'border-white/70 bg-white/70 hover:bg-white/90'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-start gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#172B46]">
                    {t(`faq.q${num}`)}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#D58C7A] text-white rotate-180' : 'bg-black/05 text-[#172B46]'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5B6E85] leading-relaxed border-t border-[#172B46]/05">
                    {t(`faq.a${num}`)}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
