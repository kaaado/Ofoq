import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'pill' | 'expanded';
}

interface LanguageOption {
  code: 'fr' | 'ar' | 'en';
  label: string;
  nativeName: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language as 'fr' | 'ar' | 'en') || 'fr';

  const languages: LanguageOption[] = [
    { code: 'fr', label: 'Français', nativeName: 'Français' },
    { code: 'ar', label: 'Arabe', nativeName: 'العربية' },
    { code: 'en', label: 'Anglais', nativeName: 'English' },
  ];

  const handleSelect = (code: 'fr' | 'ar' | 'en') => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentOption = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Sélectionner la langue"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#172B46]/15 shadow-xs hover:shadow transition-all duration-200 text-xs font-semibold text-[#172B46] cursor-pointer"
      >
        <Globe size={14} className="text-[#D58C7A]" />
        <span>{currentOption.nativeName}</span>
        <ChevronDown
          size={13}
          className={`text-[#5B6E85] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute top-full mt-2 end-0 z-50 w-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#172B46]/10 p-1.5 space-y-1"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#A9C5D8]/25 text-[#172B46] font-bold'
                      : 'text-[#172B46] hover:bg-black/05'
                  }`}
                >
                  <span className={lang.code === 'ar' ? 'font-arabic' : ''}>
                    {lang.nativeName}
                  </span>
                  {isSelected && <Check size={14} className="text-[#D58C7A]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
