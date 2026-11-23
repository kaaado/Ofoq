import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stethoscope, CheckCircle2, ArrowRight, Clock, ShieldCheck, TrendingUp, UserCheck, FileText, Lock } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface CompanionRecruitmentSectionProps {
  onOpenWaitlist: (type?: 'family' | 'companion') => void;
}

export const CompanionRecruitmentSection: React.FC<CompanionRecruitmentSectionProps> = ({ onOpenWaitlist }) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const stepNumbers = [1, 2, 3, 4] as const;

  const getStepIcon = (num: number) => {
    switch (num) {
      case 1:
        return <FileText size={18} />;
      case 2:
        return <UserCheck size={18} />;
      case 3:
        return <CheckCircle2 size={18} />;
      case 4:
        return <Lock size={18} />;
      default:
        return <ShieldCheck size={18} />;
    }
  };

  return (
    <section id="professionals" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 scroll-mt-20">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#D8BE83]/30 px-3.5 py-1.5 rounded-full border border-[#D8BE83]/50">
            {t('for_professionals.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172B46]">
            {t('for_professionals.title')}
          </h2>
          <p className="text-base text-[#5B6E85] leading-relaxed">
            {t('for_professionals.subtitle')}
          </p>
          <div className="pt-4">
            <button
              onClick={() => onOpenWaitlist('companion')}
              className="bg-gradient-to-r from-[#172B46] to-[#223B5E] hover:from-[#0F1E32] hover:to-[#172B46] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 inline-flex items-center gap-2.5 cursor-pointer border border-[#A9C5D8]/30 focus-ring-dark"
            >
              <span>{isAr ? 'الانضمام كأخصائي معتمد' : isEn ? 'Join as a Specialist' : 'Rejoindre en tant que spécialiste'}</span>
              <ArrowRight size={18} className="rtl-flip text-[#D8BE83]" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 Value Cards - Equal Height & Enhanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start items-stretch">
        <ScrollReveal delay={0.1} className="h-full">
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4 h-full flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center border border-[#172B46]/20 shrink-0">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#172B46]">
              {t('for_professionals.card1_title')}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {t('for_professionals.card1_desc')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="h-full">
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4 h-full flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center border border-[#D58C7A]/30 shrink-0">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#172B46]">
              {t('for_professionals.card2_title')}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {t('for_professionals.card2_desc')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="h-full">
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4 h-full flex flex-col justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#D8BE83]/30 text-[#8C733E] flex items-center justify-center border border-[#D8BE83]/50 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#172B46]">
              {t('for_professionals.card3_title')}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {t('for_professionals.card3_desc')}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* 4-Step Practitioner Journey - Connected Timeline & Verified Copy */}
      <div className="bg-gradient-to-br from-[#172B46] via-[#1C3556] to-[#0F1E32] text-white p-8 sm:p-12 lg:p-14 rounded-3xl shadow-2xl space-y-10 border border-white/15 relative overflow-hidden">
        {/* Subtle radial ambient glows */}
        <div className="absolute top-0 end-0 w-96 h-96 bg-[#2868C7]/20 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 start-0 w-80 h-80 bg-[#D8BE83]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="text-center space-y-2 relative z-10 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#F5F6F3]">
            {t('for_professionals.steps_title')}
          </h3>
          <p className="text-sm text-[#A9C5D8] leading-relaxed">
            {t('for_professionals.steps_subtitle')}
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start relative z-10 items-stretch">
          {stepNumbers.map((num) => {
            const isLastStep = num === 4;
            return (
              <div
                key={num}
                className={`glass-surface-navy p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full group hover:shadow-xl ${
                  isLastStep
                    ? 'border-[#D58C7A]/50 bg-white/10 hover:border-[#D58C7A]'
                    : 'border-white/10 hover:bg-white/10 hover:border-[#D8BE83]/40'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl text-white font-black flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform ${
                        isLastStep
                          ? 'bg-gradient-to-br from-[#D58C7A] to-[#C27765]'
                          : 'bg-gradient-to-br from-[#2868C7] to-[#172B46]'
                      }`}
                    >
                      {getStepIcon(num)}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isLastStep
                          ? 'bg-[#D58C7A]/20 text-[#D58C7A] border-[#D58C7A]/30'
                          : 'bg-white/10 text-[#A9C5D8] border-white/15'
                      }`}
                    >
                      {isAr ? `المرحلة 0${num}` : isEn ? `Step 0${num}` : `Étape 0${num}`}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#F5F6F3]">
                    {t(`for_professionals.step${num}_title`)}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {t(`for_professionals.step${num}_desc`)}
                  </p>
                </div>

                {isLastStep && (
                  <div className="pt-4 mt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#D58C7A] font-bold">
                    <Lock size={12} className="shrink-0" />
                    <span>{isAr ? 'حماية مشددة: ترخيص الولي حصري' : isEn ? 'Strict: Parent Consent Required' : 'Strict : Accord Parental Requis'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
