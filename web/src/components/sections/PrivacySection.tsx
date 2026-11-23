import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const PrivacySection: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="privacy" className="py-20 bg-[#F5F6F3] border-t border-[#A9C5D8]/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A9C5D8]/30 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46]">
                {isAr ? 'حماية المعطيات الشخصية للأطفال' : isEn ? 'Child Data Privacy & Rights' : 'Protection des Données Enfants'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B46] mt-1">
                {isAr ? 'سياسة حماية المعطيات والخصوصية (القانون 18-07)' : isEn ? 'Privacy Policy & Data Protection (Law 18-07)' : 'Politique de Confidentialité'}
              </h2>
              <p className="text-xs text-[#172B46]/70 mt-1">
                {isAr ? 'متطابقة مع أحكام القانون الجزائري رقم 18-07 الصادر في 10 جوان 2018' : 'Conforme à la Loi algérienne n° 18-07 du 10 juin 2018 relative à la protection des données.'}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#172B46] bg-white border border-[#A9C5D8]/40 hover:bg-[#A9C5D8]/20 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
            >
              <span>{expanded ? (isAr ? 'طي السياسة' : isEn ? 'Collapse' : 'Réduire') : (isAr ? 'عرض السياسة بالتفصيل' : isEn ? 'View Full Privacy Policy' : 'Afficher la politique complète')}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </ScrollReveal>

        {/* Highlight Card */}
        <ScrollReveal>
          <div className="bg-[#A9C5D8]/20 p-6 rounded-2xl border border-[#A9C5D8]/40 text-sm text-[#172B46] space-y-2">
            <h3 className="font-bold flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#D58C7A]" />
              <span>
                {isAr ? 'التزام صارم بحماية بيانات الأطفال وعزل عوالمهم الرقمية' : isEn ? 'Strict Child Data Isolation & Data Minimization' : 'Isolation des Données Enfants & Minimisation Stricte'}
              </span>
            </h3>
            <p className="text-xs leading-relaxed text-[#172B46]/80">
              {isAr
                ? 'تلتزم منصة أفق بعدم جمع أو تخزين أي ملف طبي، تحاليل، وصفات دوائية، أو أرقام ضمان اجتماعي على هذه المنصة. عوالم الأطفال الرقمية معزولة تماماً وتخضع لرقابة الأولياء الحصرية.'
                : isEn
                ? 'OFOQ strictly adheres to data minimization and child world isolation under Algerian Law 18-07. No medical history or clinical diagnosis is stored on this public platform.'
                : 'OFOQ applique scrupuleusement le principe de minimisation et d\'isolation des univers enfants sous la Loi algérienne 18-07. Aucun dossier médical ou diagnostic clinique n\'est collecté sur ce site public.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Expandable Policy Text */}
        {expanded && (
          <div className="space-y-6 pt-4 text-xs sm:text-sm text-[#172B46]/80 leading-relaxed border-t border-[#A9C5D8]/20">
            <div className="space-y-2">
              <h4 className="font-bold text-[#172B46] text-base">
                {isAr ? '1. الغاية من المعالجة' : isEn ? '1. Purpose of Processing' : '1. Finalités du Traitement'}
              </h4>
              <p>
                {isAr
                  ? 'تستخدم البيانات فقط للتواصل مع الأولياء والأخصائيين لتنسيق إتاحة الحسابات. لا تباع البيانات ولا تؤجر.'
                  : 'Les données sont exclusivement utilisées pour informer les familles et les professionnels de la mise en service d\'OFOQ.'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#172B46] text-base">
                {isAr ? '2. حقوق المستخدم' : isEn ? '2. User Rights' : '2. Vos Droits'}
              </h4>
              <p>
                {isAr
                  ? 'يمكنكم ممارسة حق الاطلاع أو الحذف عبر مراسلة: contact@ofoq.dz'
                  : 'Vous pouvez exercer vos droits d\'accès et de suppression en écrivant à : contact@ofoq.dz'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
