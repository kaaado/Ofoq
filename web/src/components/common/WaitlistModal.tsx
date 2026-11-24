import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Lock, Loader2, Sparkles, User, Phone, MapPin, MessageSquare } from 'lucide-react';
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
  const isEn = currentLang === 'en';

  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [wilaya, setWilaya] = useState('20');
  const [interestType, setInterestType] = useState<'family' | 'companion'>(defaultType);
  const [message, setMessage] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentError, setConsentError] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setConsentError(false);

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
      setConsentError(true);
      const err = t('forms.errors.consent_required');
      setErrorMsg(err);
      return;
    }

    setIsSubmitting(true);

    const selectedWilayaObj = ALGERIAN_WILAYAS.find((w) => w.code === wilaya);
    const wilayaLabel = selectedWilayaObj
      ? isAr
        ? selectedWilayaObj.nameAr
        : selectedWilayaObj.nameFr
      : wilaya;

    const submission: WaitlistSubmission = {
      fullName: fullName.trim(),
      contactValue: contactValue.trim(),
      wilaya: wilayaLabel,
      interestType,
      message: message.trim() || undefined,
      consentAccepted,
    };

    try {
      const result = await supabaseService.submitWaitlist(submission);
      if (result.success) {
        setIsSuccess(true);
        const statusMsg = isAr
          ? 'تم استلام وتأكيد تسجيلكم في قائمة الانتظار ذات الأولوية لأفق بنجاح.'
          : isFr
          ? 'Votre inscription prioritaire a été confirmée avec succès.'
          : 'Your priority waitlist registration has been confirmed successfully.';

        showToast({
          type: 'success',
          title: t(result.messageKey),
          message: statusMsg,
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
    setConsentError(false);
    setIsSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleReset();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white rounded-[28px] sm:rounded-[36px] max-w-lg sm:max-w-xl w-full max-h-[94vh] lg:max-h-none flex flex-col p-5 sm:p-6 lg:p-7 shadow-2xl relative border border-[#A9C5D8]/40 overflow-hidden my-auto mx-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Animated Brand Gradient Accent Bar */}
          <div className={`absolute top-0 inset-x-0 h-2 rounded-t-[28px] sm:rounded-t-[36px] ${isAr ? 'animate-brand-gradient-rtl' : 'animate-brand-gradient-ltr'}`} />

          {isSuccess ? (
            <div className="text-center py-6 sm:py-8 space-y-4 my-auto relative">
              <button
                type="button"
                onClick={handleReset}
                className="absolute -top-1 end-0 p-2 rounded-full text-[#172B46]/70 hover:bg-[#A9C5D8]/20 hover:text-[#172B46] transition-colors cursor-pointer"
                aria-label={t('modals.close')}
              >
                <X size={20} />
              </button>
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
            <form 
              onSubmit={handleSubmit} 
              className="flex-1 overflow-y-auto lg:overflow-visible pr-0.5 pl-0.5 space-y-3 sm:space-y-3.5 pt-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full" 
              noValidate
            >
              {/* Full-width Modal Header Top Bar */}
              <div className="w-full flex items-center justify-between gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-[#172B46]/08 via-[#2868C7]/10 to-[#D58C7A]/12 border border-[#A9C5D8]/40 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#2868C7] to-[#172B46] text-[#D8BE83] flex items-center justify-center shadow-xs shrink-0">
                    <Sparkles size={13} />
                  </div>
                  <span className={`text-xs font-black tracking-wide truncate ${isAr ? 'text-gradient-flow-rtl font-arabic' : 'text-gradient-flow-ltr'}`}>
                    {isAr ? 'أفق — قائمة الانتظار ذات الأولوية' : isEn ? 'OFOQ — Priority Early Access' : 'OFOQ — Inscription Prioritaire'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-xl text-[#172B46]/70 hover:bg-[#172B46]/10 hover:text-[#172B46] transition-colors cursor-pointer shrink-0"
                  aria-label={t('modals.close')}
                >
                  <X size={18} />
                </button>
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
                    className={`text-xs p-2.5 sm:p-3 rounded-2xl border text-start font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                      interestType === 'family'
                        ? 'border-[#172B46] bg-[#172B46]/10 text-[#172B46] font-bold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-[#172B46]/80 bg-white'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ${interestType === 'family' ? 'border-[#172B46]' : 'border-gray-300'}`}>
                      {interestType === 'family' && <div className="w-1.5 h-1.5 rounded-full bg-[#172B46]" />}
                    </div>
                    <span className="leading-snug">{t('waitlist.type_family')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestType('companion')}
                    className={`text-xs p-2.5 sm:p-3 rounded-2xl border text-start font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                      interestType === 'companion'
                        ? 'border-[#172B46] bg-[#172B46]/10 text-[#172B46] font-bold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-[#172B46]/80 bg-white'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ${interestType === 'companion' ? 'border-[#172B46]' : 'border-gray-300'}`}>
                      {interestType === 'companion' && <div className="w-1.5 h-1.5 rounded-full bg-[#172B46]" />}
                    </div>
                    <span className="leading-snug">{t('waitlist.type_companion')}</span>
                  </button>
                </div>
              </div>

              {/* Responsive Row: Full Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all text-[#172B46] bg-white/90"
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
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all text-start text-[#172B46] bg-white/90"
                  />
                </div>
              </div>

              {/* Wilaya Selection */}
              <div>
                <label className="block text-xs font-bold text-[#172B46] mb-1">
                  {t('waitlist.form_wilaya')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all bg-white text-[#172B46]"
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
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 outline-none transition-all resize-none text-[#172B46] bg-white/90"
                />
              </div>

              {/* Consent Card */}
              <div 
                onClick={() => {
                  const nextVal = !consentAccepted;
                  setConsentAccepted(nextVal);
                  if (nextVal) setConsentError(false);
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  consentAccepted 
                    ? 'border-[#172B46]/40 bg-[#172B46]/05' 
                    : consentError 
                    ? 'border-red-400 bg-red-50/70 ring-2 ring-red-200' 
                    : 'border-[#A9C5D8]/40 hover:border-[#172B46]/30 bg-white/70'
                }`}
              >
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consentAccepted}
                  onChange={(e) => {
                    setConsentAccepted(e.target.checked);
                    if (e.target.checked) setConsentError(false);
                  }}
                  className="mt-0.5 h-4 w-4 rounded text-[#172B46] focus:ring-[#172B46] border-[#A9C5D8] cursor-pointer shrink-0"
                />
                <label htmlFor="consentCheck" className="text-xs text-[#172B46]/80 leading-snug cursor-pointer font-medium">
                  {t('waitlist.form_consent')} <span className="text-[#D58C7A] font-bold">*</span>
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#172B46]/70 px-1">
                <Lock size={12} className="text-[#D58C7A] shrink-0" />
                <span>
                  {isAr
                    ? 'الالتزام بحماية معطيات الأطفال (القانون 18-07 ومبدأ عدم التشخيص الطبي).'
                    : isFr
                    ? 'Protection des données de l\'enfant (Loi 18-07 & cadre non-médical).'
                    : 'Child data protection (Law 18-07 & non-diagnostic boundary).'}
                </span>
              </div>

              <div className="pt-0.5 pb-0.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#172B46] hover:bg-[#1f3757] hover:shadow-lg disabled:opacity-60 text-white font-bold py-3 sm:py-3.5 rounded-full shadow-md transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin text-[#SoftGold]" />}
                  <span>{isSubmitting ? t('forms.fields.submitting') : t('forms.fields.submit_waitlist')}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
