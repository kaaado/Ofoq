import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateContact } from '../../utils/validation';
import { supabaseService } from '../../services/supabaseService';
import { useToast } from '../common/Toast';
import { ScrollReveal } from '../common/ScrollReveal';

export const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';
  const { showToast } = useToast();

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@ofoq.dz';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+213 (0) 23 00 00 00';

  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

    if (!message.trim()) {
      const err = t('forms.errors.validation');
      setErrorMsg(err);
      return;
    }

    if (message.length > 2000) {
      const err = isAr
        ? 'طول الرسالة يتجاوز الحد المسموح به (2000 حرف).'
        : isEn
        ? 'Message exceeds maximum length (2000 characters).'
        : 'Votre message dépasse la longueur autorisée (2000 caractères).';
      setErrorMsg(err);
      return;
    }

    setLoading(true);

    try {
      const res = await supabaseService.submitContact({
        fullName: fullName.trim(),
        contactValue: contactValue.trim(),
        subject: subject.trim() || undefined,
        message: message.trim()
      });

      if (res.success) {
        setSubmitted(true);
        const successSubtext = isAr
          ? 'تم استلام رسالتكم وتأمينها بنجاح في منظومة أفق. سيتواصل معكم فريقنا في أقرب الآجال.'
          : isEn
          ? 'Your message has been received and secured in OFOQ. Our team will contact you shortly.'
          : 'Votre message a bien été reçu et sécurisé par OFOQ. Notre équipe vous contactera sous peu.';

        showToast({
          type: 'success',
          title: t(res.messageKey),
          message: successSubtext
        });
      } else {
        const localizedMsg = t(res.messageKey);
        setErrorMsg(localizedMsg);
        showToast({
          type: 'error',
          title: localizedMsg,
          message: isAr
            ? 'يرجى مراجعة الحقول المطلوبة والمحاولة مرة أخرى.'
            : isEn
            ? 'Please review the required fields and try again.'
            : 'Veuillez vérifier les champs requis et réessayer.'
        });
      }
    } catch (err: any) {
      const fallback = t('forms.errors.network');
      setErrorMsg(fallback);
      showToast({
        type: 'error',
        title: fallback
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 scroll-mt-20">
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46] bg-[#A9C5D8]/20 border border-[#A9C5D8]/40 px-3.5 py-1 rounded-full">
            {t('contact.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B46]">
            {t('contact.title')}
          </h2>
          <p className="text-base text-[#172B46]/70 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <div className="glass-card p-7 rounded-3xl border border-[#A9C5D8]/30 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172B46]">{t('contact.email_label')}</h3>
                <p className="text-xs text-[#172B46]/70 mt-0.5">{t('contact.email_sub')}</p>
                <a href={`mailto:${contactEmail}`} className="text-sm font-semibold text-[#172B46] hover:text-[#D58C7A] hover:underline block mt-1">
                  {contactEmail}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card p-7 rounded-3xl border border-[#A9C5D8]/30 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172B46]">{t('contact.phone_label')}</h3>
                <p className="text-xs text-[#172B46]/70 mt-0.5">{t('contact.phone_sub')}</p>
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-[#172B46] hover:text-[#D58C7A] hover:underline block mt-1" dir="ltr">
                  {contactPhone}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="glass-card p-7 rounded-3xl border border-[#A9C5D8]/30 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#172B46]/10 text-[#172B46] flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172B46]">{t('contact.area_label')}</h3>
                <p className="text-xs text-[#172B46]/70 mt-0.5">{t('contact.area_sub')}</p>
                <span className="text-xs font-semibold text-[#D58C7A] block mt-1">
                  {t('contact.area_detail')}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-8 sm:p-12 rounded-[36px] border border-[#A9C5D8]/40 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#A9C5D8]/20 text-[#172B46] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#172B46]">
                    {t('forms.success.contact')}
                  </h3>
                  <p className="text-sm text-[#172B46]/70 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? 'تم تسجيل رسالتكم بأمان في منظومة أفق. سيتواصل معكم فريقنا في أقرب الآجال.'
                      : isEn
                      ? 'Your inquiry has been safely saved in the OFOQ system. Our team will contact you shortly.'
                      : 'Votre demande a été enregistrée avec succès dans le système OFOQ. Notre équipe vous répondra dans les meilleurs délais.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setContactValue('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="text-xs font-bold text-[#D58C7A] hover:underline pt-2 cursor-pointer"
                  >
                    {t('contact.send_another')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Required Indicator helper */}
                  <p className="text-xs text-[#172B46]/70">
                    {t('forms.required_indicator')}
                  </p>

                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
                      <AlertCircle size={20} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-full-name" className="text-xs font-bold text-[#172B46] block">
                        {isAr ? 'الاسم واللقب' : isEn ? 'Full Name' : 'Nom & Prénom'}{' '}
                        <span className="text-[#D58C7A] font-bold">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t('forms.placeholders.full_name')}
                        className="w-full px-4 py-3 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 bg-white/80 outline-none text-sm text-[#172B46] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-value" className="text-xs font-bold text-[#172B46] block">
                        {isAr ? 'رقم الهاتف أو البريد الإلكتروني' : isEn ? 'Phone or Email' : 'Téléphone ou Email'}{' '}
                        <span className="text-[#D58C7A] font-bold">*</span>
                      </label>
                      <input
                        id="contact-value"
                        type="text"
                        required
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        placeholder={t('forms.placeholders.contact_value')}
                        className="w-full px-4 py-3 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 bg-white/80 outline-none text-sm text-[#172B46] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-xs font-bold text-[#172B46] block">
                      {t('forms.fields.subject')}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t('forms.placeholders.subject')}
                      className="w-full px-4 py-3 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 bg-white/80 outline-none text-sm text-[#172B46] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="contact-message" className="text-xs font-bold text-[#172B46] block">
                        {isAr ? 'نص الرسالة أو الاستفسار' : isEn ? 'Message or Inquiry' : 'Votre message'}{' '}
                        <span className="text-[#D58C7A] font-bold">*</span>
                      </label>
                      <span className="text-[11px] text-[#172B46]/70">
                        {message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      maxLength={2000}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('forms.placeholders.message')}
                      className="w-full px-4 py-3 rounded-xl border border-[#A9C5D8]/50 focus:border-[#172B46] focus:ring-2 focus:ring-[#A9C5D8]/30 bg-white/80 outline-none text-sm text-[#172B46] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#172B46] hover:bg-[#1f3757] disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('forms.fields.submitting')}</span>
                      </span>
                    ) : (
                      <>
                        <Send size={18} className="rtl-flip text-[#SoftGold]" />
                        <span>{t('forms.fields.submit_contact')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
