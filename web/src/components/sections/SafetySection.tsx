import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, ShieldCheck, Lock, UserCheck } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const SafetySection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';

  return (
    <section id="safety" className="py-24 bg-[#F5F6F3] border-y border-[#172B46]/08 scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#A9C5D8]/15 via-[#D8BE83]/10 to-[#D58C7A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/50">
              {t('boundaries.tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#172B46]">
              {t('boundaries.title')}
            </h2>
            <p className="text-base text-[#5B6E85] leading-relaxed">
              {t('boundaries.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Two-Part Service Boundaries: Included vs Excluded */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-start">
          {/* Permitted Services */}
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/20 shadow-sm space-y-6 h-full flex flex-col justify-between bg-white/80">
              <div className="space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A58]/15 text-[#2D7A58] flex items-center justify-center font-bold shadow-xs border border-[#2D7A58]/30">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#172B46]">
                      {t('boundaries.included_title')}
                    </h3>
                    <p className="text-xs text-[#2D7A58] font-semibold mt-0.5">
                      {isAr ? 'منظومة دعم وتواصل وتنسيق تشاركي معتمد.' : 'Outils de communication et de médiation bienveillante.'}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#172B46]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#2D7A58]/15 text-[#2D7A58] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{t(`boundaries.inc_${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Strictly Excluded Clinical Acts */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-red-500/20 shadow-sm space-y-6 h-full flex flex-col justify-between bg-white/80">
              <div className="space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#BA3C3C]/15 text-[#BA3C3C] flex items-center justify-center font-bold shadow-xs border border-[#BA3C3C]/30">
                    <XCircle size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#172B46]">
                      {t('boundaries.excluded_title')}
                    </h3>
                    <p className="text-xs text-[#BA3C3C] font-semibold mt-0.5">
                      {isAr ? 'أفق ليست أداة طبية تشخيصية ولا تعوض الأخصائي المعالج.' : 'OFOQ n\'est pas un outil médical et ne remplace pas les soignants.'}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 text-sm text-[#5B6E85]">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#BA3C3C]/15 text-[#BA3C3C] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                      <span className="leading-relaxed">{t(`boundaries.exc_${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 3 Trust & Law 18-07 Privacy Pillars - Equal Height & Enhanced Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start items-stretch">
          <ScrollReveal delay={0.1} className="h-full">
            <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/80 shadow-md h-full flex flex-col justify-between hover:shadow-xl hover:border-[#172B46]/30 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center border border-[#172B46]/20 shadow-xs">
                  <ShieldCheck size={24} className="text-[#172B46]" />
                </div>
                <h4 className="text-lg font-heading font-bold text-[#172B46]">
                  {t('trust.card1_title')}
                </h4>
                <p className="text-sm text-[#5B6E85] leading-relaxed">
                  {t('trust.card1_desc')}
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-[#A9C5D8]/20 flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isAr ? 'مطابق للقانون 18-07' : 'Conformité Loi 18-07'}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="h-full">
            <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/80 shadow-md h-full flex flex-col justify-between hover:shadow-xl hover:border-[#2868C7]/30 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2868C7]/15 text-[#2868C7] flex items-center justify-center border border-[#2868C7]/30 shadow-xs">
                  <Lock size={24} className="text-[#2868C7]" />
                </div>
                <h4 className="text-lg font-heading font-bold text-[#172B46]">
                  {t('trust.card2_title')}
                </h4>
                <p className="text-sm text-[#5B6E85] leading-relaxed">
                  {t('trust.card2_desc')}
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-[#A9C5D8]/20 flex items-center gap-1.5 text-xs text-[#2868C7] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2868C7] animate-pulse" />
                <span>{isAr ? 'عزل كامل بين ملفات الإخوة' : 'Isolation étanche garantie'}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="h-full">
            <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/80 shadow-md h-full flex flex-col justify-between hover:shadow-xl hover:border-[#D58C7A]/30 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center border border-[#D58C7A]/30 shadow-xs">
                  <UserCheck size={24} className="text-[#D58C7A]" />
                </div>
                <h4 className="text-lg font-heading font-bold text-[#172B46]">
                  {t('trust.card3_title')}
                </h4>
                <p className="text-sm text-[#5B6E85] leading-relaxed">
                  {t('trust.card3_desc')}
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-[#A9C5D8]/20 flex items-center gap-1.5 text-xs text-[#D58C7A] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D58C7A] animate-pulse" />
                <span>{isAr ? 'صلاحيات قابلة للإلغاء بنقرة' : 'Révocation en 1 clic'}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
