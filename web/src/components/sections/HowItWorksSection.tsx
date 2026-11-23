import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '../common/ScrollReveal';
import { Users, Globe2, Stethoscope, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      num: '1',
      icon: Users,
      titleKey: 'ecosystem.step1_title',
      descKey: 'ecosystem.step1_desc',
      accentColor: '#D58C7A', // Muted Coral
      bgGradient: 'from-[#D58C7A] to-[#C27765]',
    },
    {
      num: '2',
      icon: Globe2,
      titleKey: 'ecosystem.step2_title',
      descKey: 'ecosystem.step2_desc',
      accentColor: '#A9C5D8', // Cloud Blue
      bgGradient: 'from-[#172B46] to-[#223B5E]',
    },
    {
      num: '3',
      icon: Stethoscope,
      titleKey: 'ecosystem.step3_title',
      descKey: 'ecosystem.step3_desc',
      accentColor: '#D8BE83', // Soft Gold
      bgGradient: 'from-[#D8BE83] to-[#8C733E]',
    },
  ];

  return (
    <section id="ecosystem" className="bg-[#F5F6F3] py-24 border-y border-[#172B46]/08 scroll-mt-20 relative overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#A9C5D8]/20 to-[#D58C7A]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/50">
              {t('ecosystem.tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172B46]">
              {t('ecosystem.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#5B6E85] max-w-xl mx-auto leading-relaxed">
              {t('ecosystem.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={0.1 * (idx + 1)}>
                <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/60 space-y-6 h-full flex flex-col justify-between text-start relative group">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.bgGradient} text-white flex items-center justify-center font-heading font-black text-xl shadow-md border border-white/30`}>
                        {step.num}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#172B46]/10 flex items-center justify-center text-[#172B46] group-hover:scale-110 transition-transform">
                        <Icon size={20} style={{ color: step.accentColor }} />
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[#172B46] leading-snug">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-sm text-[#5B6E85] leading-relaxed">
                      {t(step.descKey)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#172B46]/08 flex items-center gap-2 text-xs font-semibold text-[#172B46]/70 group-hover:text-[#172B46]">
                    <span>{idx === 0 ? 'Compte Famille Unique' : idx === 1 ? 'Mondes 100% Isolés' : 'Permissions Révoquables'}</span>
                    <ArrowRight size={13} className="rtl-flip text-[#D58C7A]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
