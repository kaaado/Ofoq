import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, FileText, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const LegalSection: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="legal" className="py-20 bg-white border-t border-[#A9C5D8]/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A9C5D8]/30 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46]">
                {isAr ? 'الإطار القانوني والتنظيمي' : isEn ? 'Legal & Regulatory Notice' : 'Mentions Légales & Avertissements'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B46] mt-1">
                {isAr ? 'المعلومات القانونية وشروط الاستخدام' : isEn ? 'Legal Information & Service Conditions' : 'Mentions Légales & Conditions'}
              </h2>
              <p className="text-xs text-[#172B46]/70 mt-1">
                {isAr ? 'آخر تحديث: 2026 • منظومة أفق (OFOQ) (الجزائر العاصمة، الجزائر)' : 'Dernière révision : 2026 • Écosystème OFOQ (Alger, Algérie)'}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#172B46] bg-[#A9C5D8]/20 hover:bg-[#A9C5D8]/30 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>{expanded ? (isAr ? 'طي التفاصيل' : isEn ? 'Collapse' : 'Réduire') : (isAr ? 'عرض التفاصيل القانونية' : isEn ? 'View Full Legal Details' : 'Afficher les mentions complètes')}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </ScrollReveal>

        {/* Essential Notice Always Visible */}
        <ScrollReveal>
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 text-sm text-amber-900 space-y-2">
            <h3 className="font-bold flex items-center gap-2 text-amber-950">
              <ShieldAlert size={20} className="text-amber-700" />
              <span>
                {isAr ? 'تنبيه جوهري: الطبيعة التمكينية غير التشخيصية لمنصة أفق' : isEn ? 'Essential Disclaimer: Non-Diagnostic & Non-Medical Nature' : 'Avertissement Essentiel : Nature Non-Diagnostique et Non-Médicale'}
              </span>
            </h3>
            <p className="text-xs leading-relaxed text-[#172B46]">
              {isAr
                ? 'منصة أفق (OFOQ) منظومة رقمية متصلة لتعزيز التواصل البديل والتنسيق التربوي والأسري للأطفال ذوي التوحد وصعوبات النطق. أفق ليست أداة تشخيصية طبية ولا عيادة علاجية ولا بديلاً عن الطبيب أو الأخصائي الأرطوفوني أو النفسي العصبي. لا تقدم المنصة أو مساعدها الذكي تشخيصات سريرية أو وصفات علاجية، ولا تحل محل الرعاية الطبية أو العلاقات الإنسانية.'
                : isEn
                ? 'OFOQ is a connected digital ecosystem designed to support AAC communication and family-professional collaboration for children with autism and speech difficulties. OFOQ is strictly not a medical diagnostic tool or clinic. It does not provide clinical diagnoses or prescriptions, nor does it replace human medical care.'
                : 'La plateforme OFOQ est un écosystème numérique connecté dédié à la CAA et à la continuité éducative pour les enfants autistes ou présentant des troubles de la communication. OFOQ n\'est ni un outil de diagnostic médical, ni une clinique, ni un substitut aux professionnels de santé qualifiés. La plateforme ne pose aucun diagnostic médical et ne remplace jamais les relations humaines.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Collapsible Details */}
        {expanded && (
          <div className="space-y-6 pt-4 text-xs sm:text-sm text-[#172B46]/80 leading-relaxed border-t border-[#A9C5D8]/20">
            <div className="space-y-2">
              <h4 className="font-bold text-[#172B46] text-base flex items-center gap-2">
                <FileText size={18} className="text-[#D58C7A]" />
                <span>{isAr ? '1. هوية المنصة والمبادرة' : isEn ? '1. Platform & Initiative Identity' : '1. Identité de l\'Initiative'}</span>
              </h4>
              <p>
                {isAr
                  ? 'هذا الموقع الرسمي منشور باسم مشروع منظومة أفق (OFOQ) في الجمهورية الجزائرية الديمقراطية الشعبية.'
                  : 'Le présent site officiel est édité dans le cadre du projet d\'écosystème numérique OFOQ en Algérie.'}
              </p>
              <p>
                Email : <strong className="text-[#172B46]">contact@ofoq.dz</strong>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#172B46] text-base flex items-center gap-2">
                <FileText size={18} className="text-[#D58C7A]" />
                <span>{isAr ? '2. الملكية الفكرية' : isEn ? '2. Intellectual Property' : '2. Propriété Intellectuelle'}</span>
              </h4>
              <p>
                {isAr
                  ? 'جميع عناصر الهوية البصرية، الشعار، بطاقات التواصل البديل، والنصوص محمية بموجب التشريعات الوطنية والدولية للملكية الفكرية.'
                  : 'L\'ensemble des éléments graphiques, marques, pictogrammes CAA et contenus sont protégés par le droit de la propriété intellectuelle.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
