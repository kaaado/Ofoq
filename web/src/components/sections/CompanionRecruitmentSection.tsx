import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stethoscope, CheckCircle2, ArrowRight, Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface CompanionRecruitmentSectionProps {
  onOpenWaitlist: (type?: 'family' | 'companion') => void;
}

export const CompanionRecruitmentSection: React.FC<CompanionRecruitmentSectionProps> = ({ onOpenWaitlist }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';

  const steps = [
    {
      num: 1,
      title: isAr ? 'التسجيل وتقديم الاعتماد' : 'Inscription & Titre Pro',
      desc: isAr ? 'إدخال بيانات الممارسة، التخصص (أرطفونيا، تربية خاصة)، والولاية.' : 'Renseignement du profil, diplôme, spécialité et wilaya d\'exercice.',
    },
    {
      num: 2,
      title: isAr ? 'التحقق الإداري المعتمد' : 'Vérification Administrative',
      desc: isAr ? 'مراجعة المؤهلات الرسمية من طرف فريق أفق لمنح شارة الأخصائي المعتمد.' : 'Validation des diplômes et de l\'exercice légal par l\'administration OFOQ.',
    },
    {
      num: 3,
      title: isAr ? 'ربط الأطفال بإذن الولي' : 'Liaison sous Accord Parental',
      desc: isAr ? 'ربط ملفات الأطفال برمز تفعيل آمن يمنحه الولي مع صلاحيات محددة.' : 'Connexion aux profils d\'enfants via code sécurisé généré par les parents.',
    },
    {
      num: 4,
      title: isAr ? 'المتابعة وتعيين التمارين' : 'Suivi & Tâches Ciblées',
      desc: isAr ? 'تعيين بطاقات تواصل، متابعة الأنشطة وتسجيل ملاحظات الجلسات بمرونة.' : 'Attribution d\'activités, cartes CAA et consignation d\'observations régulières.',
    },
  ];

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
              className="bg-gradient-to-r from-[#172B46] to-[#223B5E] hover:from-[#0F1E32] hover:to-[#172B46] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 inline-flex items-center gap-2.5 cursor-pointer border border-[#A9C5D8]/30"
            >
              <span>{isAr ? 'الانضمام كأخصائي معتمد' : 'Rejoindre en tant que spécialiste'}</span>
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

      {/* 4-Step Practitioner Journey - Equal Height & Sleek Visuals */}
      <div className="bg-[#172B46] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-10 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 bg-[#A9C5D8]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="text-center space-y-2 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#F5F6F3]">
            {isAr ? 'مراحل انضمام الأخصائي إلى شبكة أفق' : 'Comment se déroule l\'intégration professionnelle ?'}
          </h3>
          <p className="text-sm text-[#A9C5D8] max-w-xl mx-auto">
            {isAr ? 'مسار واضح وسريع يضمن الأمان والمصداقية لجميع الأطراف.' : 'Un parcours rigoureux assurant la qualification des praticiens et la sérénité des familles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start relative z-10 items-stretch">
          {steps.map((st) => (
            <div key={st.num} className="bg-white/05 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between h-full hover:bg-white/10 hover:border-[#D8BE83]/40 transition-all shadow-md group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D58C7A] to-[#C27765] text-white font-black flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform">
                  {st.num}
                </div>
                <h4 className="font-heading font-bold text-base text-[#F5F6F3]">
                  {st.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
              <div className="pt-2 text-[10px] text-[#A9C5D8] font-bold uppercase tracking-wider">
                {isAr ? `المرحلة 0${st.num}` : `Étape 0${st.num}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
