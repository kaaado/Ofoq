import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
            aria-labelledby="privacy-modal-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#A9C5D8]/30 flex items-center justify-between bg-[#F5F6F3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A9C5D8]/20 text-[#172B46] flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 id="privacy-modal-title" className="text-lg font-bold text-[#172B46]">
                    {t('modals.privacy_title')}
                  </h3>
                  <p className="text-xs text-[#172B46]/70">
                    {t('modals.privacy_subtitle')}
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
              {/* Zero Medical Data Callout */}
              <div className="bg-[#A9C5D8]/15 p-5 rounded-2xl border border-[#A9C5D8]/30 text-xs sm:text-sm text-[#172B46] space-y-2">
                <h4 className="font-bold flex items-center gap-2 text-[#172B46]">
                  <ShieldCheck size={18} className="text-[#D58C7A]" />
                  <span>
                    {isAr
                      ? 'مبدأ التقليل الصارم من البيانات: حماية معطيات الأطفال (القانون 18-07)'
                      : isEn
                      ? 'Strict Data Minimization: Child Data Protection (Law 18-07)'
                      : 'Minimisation Stricte : Protection des Données Enfants (Loi 18-07)'}
                  </span>
                </h4>
                <p className="leading-relaxed text-[#172B46]/80">
                  {isAr
                    ? 'تلتزم أفق بعدم طلب أو تخزين أي ملف طبي أو تشخيص سريري على هذا الموقع العام. يخضع عالم كل طفل لرقابة ولي أمره الحصرية، وتخضع المعطيات لمبادئ القانون الجزائري 18-07 المتعلق بحماية المعطيات ذات الطابع الشخصي.'
                    : isEn
                    ? 'OFOQ strictly adheres to data minimization and child data isolation under Algerian Law 18-07. No medical diagnosis, clinical record, or identity document is requested on this public platform.'
                    : 'OFOQ applique scrupuleusement le principe de minimisation et d\'isolation des univers enfants sous la Loi algérienne 18-07. Aucun dossier médical ou diagnostic clinique n\'est collecté sur ce site public.'}
                </p>
              </div>

              {/* Legal Reference & Verification Notice */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#172B46] text-base">
                  {isAr ? '1. الإطار المرجعي لحماية المعطيات' : isEn ? '1. Regulatory Reference Framework' : '1. Cadre Réglementaire de Référence'}
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'صيغت هذه السياسة بالاستناد إلى المبادئ التوجيهية للتشريع الجزائري المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي (القانون رقم 18-07 المؤرخ في 10 جوان 2018)، مع التنويه بأن المطابقة القانونية الرسمية والتراخيص تخضع للإجراءات التنظيمية الجارية مع السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP).'
                    : isEn
                    ? 'This policy is designed with reference to the principles of Algerian personal data protection legislation (Law No. 18-07 of June 10, 2018). Formal regulatory filings remain subject to established procedures with the national authority (ANPDP).'
                    : 'Cette politique est conçue en référence aux principes de la législation algérienne relative à la protection des données à caractère personnel (Loi n° 18-07 du 10 juin 2018). Les formalités réglementaires officielles relèvent des démarches en cours auprès de l\'ANPDP.'}
                </p>
              </div>

              {/* Data Collected */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#172B46] text-base">
                  {isAr ? '2. المعطيات المجمعة عبر الاستمارات' : isEn ? '2. Data Collected via Forms' : '2. Données Collectées via les Formulaires'}
                </h4>
                <ul className="list-disc ps-5 space-y-1.5 text-xs sm:text-sm text-[#172B46]/70">
                  <li>{isAr ? 'الاسم واللقب للتواصل المباشر مع الأولياء والأخصائيين.' : isEn ? 'Full name for communication with parents and professionals.' : 'Nom et prénom du demandeur.'}</li>
                  <li>{isAr ? 'رقم الهاتف أو البريد الإلكتروني لإشعاركم بجاهزية المنصة ومواعيد الإطلاق.' : isEn ? 'Phone number or email address for platform onboarding notifications.' : 'Numéro de téléphone ou adresse email professionnelle/personnelle.'}</li>
                  <li>{isAr ? 'الولاية لتحديد التوزيع الجغرافي وتنسيق الربط المحلي.' : isEn ? 'Wilaya to organize regional network rollouts.' : 'Wilaya de résidence ou d\'exercice.'}</li>
                  <li>{isAr ? 'صفة الطلب (ولي أمر / عائلة، أو أخصائي / مركز تأهيل وتكفل).' : isEn ? 'Account persona (Parent / Family, or Specialist / Centre).' : 'Profil utilisateur (Parent / Famille, ou Professionnel / Centre spécialisé).'}</li>
                </ul>
              </div>

              {/* Purpose and Non-Disclosure */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#172B46] text-base">
                  {isAr ? '3. الغاية من المعالجة وعدم المشاركة' : isEn ? '3. Processing Purpose & Non-Disclosure' : '3. Finalités du Traitement'}
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'تستخدم البيانات حصراً للتواصل مع الأولياء والأخصائيين لإشعارهم بإتاحة منصة أفق وفتح حسابات العوالم الرقمية للأطفال. لا تُباع البيانات، ولا تُؤجر، ولا تُنقل لأي طرف ثالث لأغراض تجارية أو دعائية.'
                    : isEn
                    ? 'Data is used solely to notify families and professionals of OFOQ platform access and Child World workspace availability. Information is never sold, rented, or transferred to third parties.'
                    : 'Les données sont exclusivement utilisées pour informer les familles et les professionnels de la disponibilité de la plateforme OFOQ et de l\'ouverture des Mondes Enfants. Aucune cession commerciale n\'est pratiquée.'}
                </p>
              </div>

              {/* User Rights */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#172B46] text-base">
                  {isAr ? '4. حقوق الاطلاع والتصحيح والحذف' : isEn ? '4. Access, Correction, and Erasure Rights' : '4. Droits d\'Accès et de Suppression'}
                </h4>
                <p className="text-xs sm:text-sm text-[#172B46]/70">
                  {isAr
                    ? 'يحق لكل مسجل طلب الاطلاع على بياناته أو تصحيحها أو سحبها نهائياً من قائمة الانتظار في أي وقت عبر مراسلة البريد الإلكتروني: contact@ofoq.dz.'
                    : isEn
                    ? 'Registered visitors may request access, rectification, or complete erasure of their waitlist entry at any time by contacting: contact@ofoq.dz.'
                    : 'Vous pouvez exercer vos droits d\'accès, de rectification ou d\'effacement de vos données sur simple demande par email à : contact@ofoq.dz.'}
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
