import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Mail, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenLegal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenLegal }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const brandName = isAr ? 'أفق' : 'OFOQ';
  const contactEmail = 'contact@ofoq.dz';

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <footer className="bg-[#0F1E32] text-white pt-16 pb-12 border-t border-white/10 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand & Purpose (4 cols) */}
          <div className="lg:col-span-5 space-y-4 text-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-xs border-2 border-white/20 bg-white flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="OFOQ"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-heading font-black tracking-tight text-white leading-none">{brandName}</span>
                <span className="text-[11px] text-[#A9C5D8] font-medium mt-1">
                  {isAr ? 'منظومة التخاطب والتوحد المتصلة' : 'Écosystème Numérique Pédagogique'}
                </span>
              </div>
            </div>

            <p className="text-[#D8BE83] text-sm italic font-medium leading-relaxed flex items-center gap-1.5">
              <Sparkles size={14} className="shrink-0 text-[#D8BE83]" />
              {t('brand.tagline')}
            </p>

            <p className="text-gray-300 text-xs leading-relaxed max-w-md">
              {t('footer.mission_reminder')}
            </p>

            <div className="pt-2 text-xs text-[#A9C5D8] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#D58C7A] shrink-0" />
                <span>
                  {isAr
                    ? 'سعيدة، الجزائر • انتشار تدريجي وطني'
                    : isEn
                    ? 'Saïda, Algeria • National Deployment'
                    : 'Saïda, Algérie • Déploiement national'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D58C7A] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
              </div>
            </div>
          </div>

          {/* Quick Section Anchors (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-start">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#A9C5D8]">
              {t('footer.links_title')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
              <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="hover:text-[#D58C7A] transition-colors">{t('nav.home')}</a>
              <a href="#ecosystem" onClick={(e) => handleAnchorClick(e, '#ecosystem')} className="hover:text-[#D58C7A] transition-colors">{t('nav.ecosystem')}</a>
              <a href="#child-world" onClick={(e) => handleAnchorClick(e, '#child-world')} className="hover:text-[#D58C7A] transition-colors">{t('nav.child_world')}</a>
              <a href="#pillars" onClick={(e) => handleAnchorClick(e, '#pillars')} className="hover:text-[#D58C7A] transition-colors">{t('nav.pillars')}</a>
              <a href="#families" onClick={(e) => handleAnchorClick(e, '#families')} className="hover:text-[#D58C7A] transition-colors">{t('nav.families')}</a>
              <a href="#professionals" onClick={(e) => handleAnchorClick(e, '#professionals')} className="hover:text-[#D58C7A] transition-colors">{t('nav.professionals')}</a>
              <a href="#safety" onClick={(e) => handleAnchorClick(e, '#safety')} className="hover:text-[#D58C7A] transition-colors">{t('nav.safety')}</a>
              <a href="#faq" onClick={(e) => handleAnchorClick(e, '#faq')} className="hover:text-[#D58C7A] transition-colors">{t('nav.faq')}</a>
            </div>
          </div>

          {/* Legal, Privacy & Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-start">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#A9C5D8]">
              {t('footer.legal_title')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#D58C7A] transition-colors cursor-pointer text-start"
                >
                  {t('footer.privacy')} {isAr ? '(القانون 18-07)' : isEn ? '(Law 18-07)' : '(Loi 18-07)'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLegal}
                  className="hover:text-[#D58C7A] transition-colors cursor-pointer text-start"
                >
                  {t('footer.legal')}
                </button>
              </li>
              <li>
                <a
                  href="#safety"
                  onClick={(e) => handleAnchorClick(e, '#safety')}
                  className="hover:text-[#D58C7A] transition-colors text-start block"
                >
                  {isAr ? 'الحد غير التشخيصي' : 'Cadre non-diagnostique'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner: Explicit Non-Diagnostic Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center md:text-start">
          <div className="flex items-center gap-2 max-w-2xl bg-white/05 px-3 py-2 rounded-lg border border-white/08 text-[11px] text-[#A9C5D8]">
            <ShieldAlert size={16} className="text-[#D8BE83] shrink-0" />
            <span>{t('footer.non_diagnostic_notice')}</span>
          </div>

          <div className="text-[11px] text-gray-400 whitespace-nowrap">
            {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};
