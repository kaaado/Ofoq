import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const AboutSection: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-14 scroll-mt-24">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/30 px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/50">
            {isAr ? 'رسالتنا ورؤيتنا' : 'Notre Mission & Vision'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#172B46]">
            {isAr ? 'عن مبادرة أُفُـق' : 'À propos d\'OFOQ'}
          </h2>
          <p className="text-base sm:text-lg text-[#5B6E85] leading-relaxed">
            {isAr
              ? 'منظومة جزائرية متصلة تسد الفجوة بين حصص التخاطب التخصصية والروتين العائلي اليومي، لنمنح كل طفل صوتاً وأفقاً يتسع لطاقاته.'
              : 'Un écosystème numérique algérien conçu pour abolir la rupture entre les séances spécialisées et le quotidien familial, offrant à chaque enfant une voix et un horizon d\'épanouissement.'}
          </p>
        </div>
      </ScrollReveal>

      {/* Slogan Quote Glass Banner */}
      <ScrollReveal delay={0.1}>
        <div className="glass-card border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#D58C7A] p-8 rounded-3xl text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden">
          <div className="absolute top-0 end-0 p-4 text-[#D8BE83]/30">
            <Sparkles size={48} />
          </div>
          <blockquote className="text-xl sm:text-2xl font-heading font-bold text-[#172B46] italic">
            « Chaque enfant a son propre horizon. »
          </blockquote>
          <p className="text-base text-[#D58C7A] font-bold mt-2 font-arabic">
            « لكل طفل أفقه الخاص. »
          </p>
        </div>
      </ScrollReveal>

      {/* 4 Values Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
        <ScrollReveal delay={0.1}>
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center border border-[#D58C7A]/30">
              <Heart size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#172B46]">
              {isAr ? 'كرامة الطفل ووتيرته الفردية' : 'Dignité & Rythme de l\'Enfant'}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {isAr
                ? 'نرفض القوالب النمطية والرسوم السطحية. تصاميمنا هادئة حسياً، تحترم التركيز والراحة العاطفية للطفل، وتتيح له التواصل بكرامة واستقلالية.'
                : 'Nous rejetons les clichés infantilants. Notre interface est sensoriellement apaisée, respectant la concentration et la sensibilité de l\'enfant pour lui permettre de communiquer avec dignité.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#A9C5D8]/30 text-[#172B46] flex items-center justify-center border border-[#A9C5D8]/50">
              <Compass size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#172B46]">
              {isAr ? 'استمرارية البيت والعيادة' : 'Continuité Cabinet & Maison'}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {isAr
                ? 'جلسات التخاطب والتربية الخاصة محدودة بساعة أو ساعتين أسبوعياً. أفق ينقل أهداف الجلسة التخصصية إلى مواقف الحياة الواقعية في البيت بسلاسة.'
                : 'Les séances spécialisées sont souvent limitées à une ou deux heures hebdomadaires. OFOQ prolonge les acquis thérapeutiques au cœur de la vie familiale quotidienne.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D8BE83]/30 text-[#8C733E] flex items-center justify-center border border-[#D8BE83]/50">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#172B46]">
              {isAr
                ? 'حماية وخصوصية المعطيات (مبادئ القانون 18-07)'
                : isEn
                ? 'Parental Sovereignty & Law 18-07 Principles'
                : 'Souveraineté Parentale & Principes Loi 18-07'}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {isAr
                ? 'البيانات التطورية والشخصية للأطفال خط أحمر. تصميمنا مبني على مبادئ القانون 18-07: عزل تقني تام بين العوالم، تقليل البيانات، وموافقة أبوية قابلة للإلغاء فوراً.'
                : isEn
                ? 'Children developmental data is sensitive. Our architecture is aligned with Law 18-07 principles: strict minimization, child world isolation, and revocable consent.'
                : 'Les données développementales des enfants sont hautement sensibles. Notre architecture intègre les principes de la Loi 18-07 : minimisation, cloisonnement des mondes et consentement révocable.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/70 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center border border-[#172B46]/20">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#172B46]">
              {isAr ? 'نهج تشاركي غير تشخيصي' : 'Approche Non-Diagnostique'}
            </h3>
            <p className="text-sm text-[#5B6E85] leading-relaxed">
              {isAr
                ? 'أفق لا يقدم تشخيصات طبية ولا يقيم درجات الإعاقة آلياً. نحن أداة تواصل وتمكين تدعم دور الأخصائيين المعتمدين وتوطد الترابط الإنساني.'
                : 'OFOQ n\'émet aucun diagnostic médical ni score clinique automatisé. Nous sommes un outil d\'expression et de coordination qui amplifie le rôle des praticiens sans jamais s\'y substituer.'}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
