import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, HeartHandshake, Lock, Loader2, Sparkles, User, Mail, MapPin, MessageSquare } from 'lucide-react';
import { ALGERIAN_WILAYAS, validateContact } from '../../utils/validation';
import { supabaseService } from '../../services/supabaseService';
import { useToast } from './Toast';
import { WaitlistSubmission } from '../../types';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'family' | 'companion';
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'family',
}) => {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isFr = currentLang === 'fr';

  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [wilaya, setWilaya] = useState('16');
  const [interestType, setInterestType] = useState<'family' | 'companion'>(defaultType);
  const [message, setMessage] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      const err = t('forms.errors.validation');
      setErrorMsg(err);
      return;
    }

    if (!validateContact(contactValue)) {
      const err = t('forms.errors.validation');
      setErrorMsg(err);
      return;
    }

    if (!consentAccepted) {
      const err = t('forms.errors.consent_required');
      setErrorMsg(err);
      return;
    }

    setIsSubmitting(true);

    const submission: WaitlistSubmission = {
      fullName: fullName.trim(),
      contactValue: contactValue.trim(),
      wilaya: `Alger (${wilaya})`,
      interestType,
      message: message.trim() || undefined,
      consentAccepted,
    };

    try {
      const result = await supabaseService.submitWaitlist(submission);
      if (result.success) {
        setIsSuccess(true);
        showToast({
          type: 'success',
          title: t(result.messageKey),
          message: isAr
            ? 'تم حفظ طلبكم في قاعدة بيانات أفق الرسمية.'
            : isFr
            ? 'Votre demande a bien été enregistrée sur la plateforme OFOQ.'
            : 'Your request has been successfully registered on OFOQ.',
        });
      } else {
        const localizedMsg = t(result.messageKey);
        setErrorMsg(localizedMsg);
        showToast({
          type: 'error',
          title: localizedMsg,
        });
      }
    } catch (err: unknown) {
      console.error(err);
      const errTxt = t('forms.errors.network');
      setErrorMsg(errTxt);
      showToast({
        type: 'error',
        title: errTxt,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setContactValue('');
    setMessage('');
    setConsentAccepted(false);
    setIsSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-[32px] sm:rounded-[36px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#A9C5D8]/40 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle Top Gradient Accent bar */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#172B46] via-[#A9C5D8] to-[#D58C7A]" />

          {/* Close Button */}
          <button
            onClick={handleReset}
            className="absolute top-5 end-5 p-2 rounded-full text-[#172B46]/70 hover:bg-[#A9C5D8]/20 hover:text-[#172B46] transition-colors cursor-pointer"
            aria-label={t('modals.close')}
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#A9C5D8]/20 text-[#172B46] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172B46]">
                {t('waitlist.success_title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#172B46]/70 leading-relaxed max-w-sm mx-auto">
                {t('waitlist.success_desc')}
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#172B46] hover:bg-[#1f3757] text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors cursor-pointer shadow-md"
                >
                  {t('modals.close')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 pt-1" noValidate>
              {/* Header Badge */}
              <div className="flex items-center gap-2 text-[#172B46]">
                <div className="w-8 h-8 rounded-xl bg-[#A9C5D8]/20 flex items-center justify-center text-[#172B46]">
                  <Sparkles size={18} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'أفق — قائمة الانتظار ذات الأولوية' : 'OFOQ — Inscription Prioritaire'}
                </span>
              </div>

              <div>
                <h3 className={`font-black text-[#172B46] leading-tight ${isFr ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                  {t('waitlist.title')}
                </h3>
                <p className={`text-[#172B46]/70 mt-1 leading-relaxed ${isFr ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                  {t('waitlist.subtitle')}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex gap-2.5 items-start">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* Dual Selector: Family vs Pro */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172B46]">
                  {t('waitlist.form_type')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterestType('family')}
                    className={`text-xs p-3 rounded-2xl border text-start font-medium transition-all cursor-pointer ${
                      interestType === 'family'
                        ? 'border-[#172B46] bg-[#172B46]/10 text-[#172B46] font-bold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-[#172B46]/80 bg-white'
                    }`}
                  >
                    {t('waitlist.type_family')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestType('companion')}
                    className={`text-xs p-3 rounded-2xl border text-start font-medium transition-all cursor-pointer ${
                      interestType === 'companion'
                        ? 'border-[#172B46] bg-[#172B46]/10 text-[#172B46] font-bold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-[#172B46]/80 bg-white'
                    }`}
                  >
                    {t('waitlist.type_companion')}
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#172B46] mb-1">
                  {t('waitlist.form_name')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('forms.placeholders.full_name')}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all text-[#172B46] bg-white/90"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-xs font-bold text-[#172B46] mb-1">
                  {t('waitlist.form_contact')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={t('forms.placeholders.contact_value')}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all text-start text-[#172B46] bg-white/90"
                />
              </div>

              {/* Wilaya Selection */}
              <div>
                <label className="block text-xs font-bold text-[#172B46] mb-1">
                  {t('waitlist.form_wilaya')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all bg-white text-[#172B46]"
                >
                  {ALGERIAN_WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {currentLang === 'ar' ? w.nameAr : w.nameFr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-bold text-[#172B46] mb-1">
                  {t('waitlist.form_message')}
                </label>
                <textarea
                  rows={2}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('forms.placeholders.message')}
                  className="w-full text-xs sm:text-sm px-4 py-2 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all resize-none text-[#172B46] bg-white/90"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <input
                  type="checkbox"
                  id="consentCheck"
                  required
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded text-[#172B46] focus:ring-[#172B46] border-[#A9C5D8] cursor-pointer"
                />
                <label htmlFor="consentCheck" className="text-xs text-[#172B46]/70 leading-snug cursor-pointer select-none">
                  {t('waitlist.form_consent')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#172B46]/70">
                <Lock size={12} className="text-[#D58C7A] shrink-0" />
                <span>
                  {isAr
                    ? 'الالتزام بحماية معطيات الأطفال (القانون 18-07 ومبدأ عدم التشخيص الطبي).'
                    : isFr
                    ? 'Protection des données de l\'enfant (Loi 18-07 & cadre non-médical).'
                    : 'Child data protection (Law 18-07 & non-diagnostic boundary).'}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#172B46] hover:bg-[#1f3757] hover:shadow-lg disabled:opacity-60 text-white font-bold py-3.5 rounded-full shadow-md transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isSubmitting && <Loader2 size={18} className="animate-spin text-[#SoftGold]" />}
                <span>{isSubmitting ? t('forms.fields.submitting') : t('forms.fields.submit_waitlist')}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
