import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Globe2,
  Users,
  Stethoscope,
  Sparkles,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface ServicesSectionProps {
  onOpenWaitlist: (type?: 'family' | 'companion') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenWaitlist }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const pillars = [
    {
      num: '01',
      icon: MessageSquare,
      titleKey: 'pillars.p1_title',
      descKey: 'pillars.p1_desc',
      accent: '#D58C7A', // Muted Coral
      highlight: true,
      tagAr: 'تواصل بديل',
      tagFr: 'CAA / AAC',
      tagEn: 'AAC',
    },
    {
      num: '02',
      icon: Globe2,
      titleKey: 'pillars.p2_title',
      descKey: 'pillars.p2_desc',
      accent: '#A9C5D8', // Cloud Blue
      highlight: false,
      tagAr: 'عوالم الأطفال',
      tagFr: 'Mondes Enfants',
      tagEn: 'Child Worlds',
    },
    {
      num: '03',
      icon: Users,
      titleKey: 'pillars.p3_title',
      descKey: 'pillars.p3_desc',
      accent: '#172B46', // Midnight Navy
      highlight: false,
      tagAr: 'إدارة العائلة',
      tagFr: 'Compte Famille',
      tagEn: 'Family Hub',
    },
    {
      num: '04',
      icon: Stethoscope,
      titleKey: 'pillars.p4_title',
      descKey: 'pillars.p4_desc',
      accent: '#D8BE83', // Soft Gold
      highlight: false,
      tagAr: 'بوابة الأخصائي',
      tagFr: 'Portail Spécialiste',
      tagEn: 'Pro Portal',
    },
    {
      num: '05',
      icon: Sparkles,
      titleKey: 'pillars.p5_title',
      descKey: 'pillars.p5_desc',
      accent: '#D58C7A', // Muted Coral
      highlight: false,
      tagAr: 'ذكاء اصطناعي آمن',
      tagFr: 'IA Sécurisée',
      tagEn: 'Safe AI',
    },
    {
      num: '06',
      icon: GraduationCap,
      titleKey: 'pillars.p6_title',
      descKey: 'pillars.p6_desc',
      accent: '#A9C5D8', // Cloud Blue
      highlight: false,
      tagAr: 'أكاديمية أفق',
      tagFr: 'Académie OFOQ',
      tagEn: 'OFOQ Academy',
    },
  ];

  return (
    <section id="pillars" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 scroll-mt-20">
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/50">
            {t('pillars.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172B46]">
            {t('pillars.title')}
          </h2>
          <p className="text-base text-[#5B6E85] leading-relaxed">
            {t('pillars.subtitle')}
          </p>
        </div>
      </ScrollReveal>

      {/* 6 Pillars 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <ScrollReveal key={pillar.num} delay={idx * 0.08}>
              <div
                className={`glass-card glass-card-hover p-8 rounded-3xl h-full flex flex-col justify-between transition-all duration-300 relative text-start ${
                  pillar.highlight
                    ? 'border-2 border-[#D58C7A] shadow-xl md:-translate-y-1 bg-white/90'
                    : 'border border-white/60 shadow-sm'
                }`}
              >
                {pillar.highlight && (
                  <div className="absolute -top-3.5 start-6 bg-[#D58C7A] text-white text-[11px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {isAr ? pillar.tagAr : isEn ? pillar.tagEn : pillar.tagFr}
                  </div>
                )}

                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md border border-white/40"
                      style={{
                        background: `linear-gradient(135deg, ${pillar.accent} 0%, #172B46 100%)`,
                      }}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="text-xs font-heading font-black text-[#5B6E85]/50 tracking-widest">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-[#172B46] leading-snug">
                    {t(pillar.titleKey)}
                  </h3>

                  <p className="text-sm text-[#5B6E85] leading-relaxed">
                    {t(pillar.descKey)}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#172B46]/08 flex items-center justify-between mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E85]">
                    {isAr ? pillar.tagAr : isEn ? pillar.tagEn : pillar.tagFr}
                  </span>
                  <button
                    onClick={() => onOpenWaitlist('family')}
                    className="text-xs font-bold text-[#172B46] hover:text-[#9E4E3D] inline-flex items-center gap-1.5 transition-colors cursor-pointer min-h-[48px] px-3 -me-3 focus-ring rounded-xl"
                  >
                    <span>{isAr ? 'استكشف' : isEn ? 'Explore' : 'Explorer'}</span>
                    <ArrowRight size={13} className="rtl-flip text-[#9E4E3D]" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
