import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col z-10 overflow-hidden border border-[#A9C5D8]/40"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#A9C5D8]/30 flex items-center justify-between bg-[#F5F6F3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 id="legal-modal-title" className="text-lg font-bold text-[#172B46]">
                    {t('modals.legal_title')}
                  </h3>
                  <p className="text-xs text-[#172B46]/70">
                    {t('modals.legal_subtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label={t('modals.close')}
                className="w-9 h-9 rounded-full bg-white border border-[#A9C5D8]/40 text-[#172B46]/70 hover:text-[#172B46] hover:bg-[#A9C5D8]/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#172B46] leading-relaxed">
              {/* Mandatory Non-Medical Disclaimer */}
              <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
                <h4 className="font-bold flex items-center gap-2 text-amber-950">
                  <ShieldAlert size={18} className="text-amber-700" />
                  <span>
                    {isAr
                      ? 'تنبيه جوهري: الطبيعة التمكينية غير التشخيصية لمنصة أفق'
                      : isEn
                      ? 'Essential Disclaimer: Non-Diagnostic & Non-Medical Nature'
                      : 'Avertissement Essentiel : Nature Non-Diagnostique et Non-Médicale'}
                  </span>
                </h4>
                <p className="leading-relaxed text-[#172B46]">
                  {isAr
                    ? 'منصة أفق (OFOQ) منظومة رقمية متصلة لتعزيز التواصل البديل والتنسيق التربوي والأسري للأطفال ذوي طيف التوحد. أفق ليست أداة تشخيصية طبية ولا عيادة علاجية ولا بديلاً عن الطبيب أو الأخصائي الأرطوفوني أو النفسي أو الحركي العصبي. لا تقدم المنصة أو مساعدها الذكي تشخيصات سريرية أو وصفات علاجية، ولا تحل محل الرعاية الطبية أو العلاقات الإنسانية والروابط الأسرية الحقيقية.'
                    : isEn
                    ? 'OFOQ is a connected digital ecosystem designed to bridge communication continuity and AAC resources for autistic children and children with communication difficulties, their families, and specialists. OFOQ is strictly not a medical diagnostic tool, clinical facility, or substitute for qualified speech therapists, neurologists, or healthcare professionals. The platform and its AI companion do not provide clinical diagnoses, treatments, or prescriptions, nor do they replace human relationships.'
                    : 'La plateforme OFOQ est un écosystème numérique connecté dédié à la continuité de la communication (CAA), au soutien éducatif et à la coordination entre parents et spécialistes pour les enfants autistes ou présentant des troubles de la communication. OFOQ n\'est ni un outil de diagnostic médical, ni une clinique, ni un substitut aux professionnels de santé qualifiés (orthophonistes, neuropsychiatres, pédiatres). La plateforme et son compagnon IA ne posent aucun diagnostic médical et ne remplacent jamais les relations humaines.'}
                </p>
              </div>

              {/* Platform Identity */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#172B46] text-base flex items-center gap-2">
                  <FileText size={16} className="text-[#D58C7A]" />
                  <span>{isAr ? '1. تعريف المبادرة والناشر' : isEn ? '1. Platform & Initiative Identity' : '1. Identité de l\'Initiative'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'هذا الموقع الرسمي منشور باسم مشروع منظومة أفق (OFOQ) الرقمية في الجمهورية الجزائرية الديمقراطية الشعبية.'
                    : isEn
                    ? 'This official website is published for the OFOQ digital ecosystem initiative in the People\'s Democratic Republic of Algeria.'
                    : 'Le présent site officiel est édité dans le cadre de l\'écosystème numérique OFOQ en République Algérienne Démocratique et Populaire.'}
                </p>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  Email : <strong className="text-[#172B46]">contact@ofoq.dz</strong> | {isAr ? 'الهاتف:' : 'Téléphone :'} <strong className="text-[#172B46]" dir="ltr">+213 (0) 23 00 00 00</strong>
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#172B46] text-base flex items-center gap-2">
                  <FileText size={16} className="text-[#D58C7A]" />
                  <span>{isAr ? '2. الملكية الفكرية والعلامة' : isEn ? '2. Intellectual Property' : '2. Propriété Intellectuelle'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'جميع عناصر الهوية البصرية، الشعار، التصاميم، بطاقات التواصل البديل، والنصوص والشعار اللفظي «لكل طفل أُفقه الخاص» تمثل مصنفات فكرية محمية بالتشريعات المعمول بها.'
                    : isEn
                    ? 'All graphic assets, brand logo, designs, AAC pictogram assets, content, and the motto "Chaque enfant a son propre horizon" (Every child has their own horizon) are intellectual property protected under applicable law.'
                    : 'L\'ensemble des éléments graphiques, logo, pictogrammes de communication alternative, textes et le slogan « Chaque enfant a son propre horizon » sont des œuvres protégées au titre des droits de propriété intellectuelle.'}
                </p>
              </div>

              {/* Pilot Terms & Waitlist Disclaimer */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#172B46] text-base flex items-center gap-2">
                  <FileText size={16} className="text-[#D58C7A]" />
                  <span>{isAr ? '3. طبيعة التسجيل في قائمة الانتظار' : isEn ? '3. Nature of Waitlist Registration' : '3. Nature de l\'Inscription'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'التسجيل في قائمة الانتظار هو إبداء اهتمام أولي مجاني، ولا يمثل التزاماً تعاقدياً ملزماً أو حجزاً نهائياً للخدمة. يتم فتح حسابات الأولياء والأخصائيين وربط العوالم الرقمية للأطفال تدريجياً وفق مراحل الإطلاق المعتمدة.'
                    : isEn
                    ? 'Waitlist registration constitutes a free initial expression of interest and does not establish a binding contract. Accounts for parents, specialists, and Child World workspaces will be onboarded gradually according to the rollout schedule.'
                    : 'L\'inscription sur la liste d\'attente est une simple manifestation d\'intérêt préliminaire et gratuite. L\'ouverture des accès parents, professionnels et la création des Mondes Enfants s\'effectueront progressivement selon les phases de déploiement.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#A9C5D8]/30 bg-[#F5F6F3] flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#172B46] hover:bg-[#1f3757] text-white font-bold text-xs px-6 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                {t('modals.close')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
