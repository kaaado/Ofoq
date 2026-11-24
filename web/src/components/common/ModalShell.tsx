import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';
import { getModalBackdropVariants, getModalDialogVariants } from '../../utils/motion';

export type ModalVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'consent'
  | 'companion';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  titleId?: string;
  descriptionId?: string;
  maxWidthClass?: string;
  variant?: ModalVariant;
  headerBadge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
}

const VARIANT_ACCENTS: Record<ModalVariant, string> = {
  default: 'from-[#172B46] via-[#2868C7] to-[#A9C5D8]',
  info: 'from-[#2868C7] via-[#4A85DD] to-[#A9C5D8]',
  success: 'from-[#2D7A58] via-[#A9C5D8] to-[#D8BE83]',
  warning: 'from-[#D8BE83] via-[#945F0B] to-[#D58C7A]',
  error: 'from-[#BA3C3C] via-[#D58C7A] to-[#172B46]',
  consent: 'from-[#172B46] via-[#2868C7] to-[#D58C7A]',
  companion: 'from-[#2868C7] via-[#D8BE83] to-[#D58C7A]',
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

// Module-level modal stack & scroll-lock counter so nested/concurrent dialogs never collide
const openModalStack: string[] = [];
let lockedPrevOverflow: string | null = null;

function isElementVisible(el: HTMLElement): boolean {
  if (typeof window === 'undefined') return true;
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  return el.getClientRects().length > 0;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  titleId,
  descriptionId,
  maxWidthClass = 'max-w-2xl',
  variant = 'default',
  headerBadge,
  title,
  subtitle,
  icon,
  footer,
  hideCloseButton = false,
  ariaLabel,
  children,
}) => {
  const { t } = useTranslation();
  const { effectiveReducedMotion, preferences } = useSensoryPreferences();
  const generatedId = useId();
  const modalInstanceId = `ofoq-modal-${generatedId}`;
  const resolvedTitleId = titleId || `${modalInstanceId}-title`;
  const resolvedDescId = descriptionId || `${modalInstanceId}-desc`;

  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    if (openModalStack.length === 0) {
      lockedPrevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    openModalStack.push(modalInstanceId);

    const focusTimer = window.setTimeout(() => {
      const container = dialogRef.current;
      if (!container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(isElementVisible);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Escape/Tab if this modal is at the top of the stack
      if (openModalStack[openModalStack.length - 1] !== modalInstanceId) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter(isElementVisible);

        if (focusables.length === 0) {
          e.preventDefault();
          dialogRef.current.focus();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (!dialogRef.current.contains(active) || active === dialogRef.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
          return;
        }

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);

      const idx = openModalStack.lastIndexOf(modalInstanceId);
      if (idx !== -1) openModalStack.splice(idx, 1);

      if (openModalStack.length === 0) {
        document.body.style.overflow = lockedPrevOverflow ?? '';
        lockedPrevOverflow = null;
      }

      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, modalInstanceId]);

  if (typeof document === 'undefined') return null;

  const backdropVariants = getModalBackdropVariants(effectiveReducedMotion);
  const dialogVariants = getModalDialogVariants(effectiveReducedMotion);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseRef.current();
          }}
        >
          {/* Soft Calm Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onCloseRef.current()}
            className={`fixed inset-0 bg-[#0F1E32]/55 ${
              preferences.quietMode ? '' : 'backdrop-blur-sm'
            }`}
            aria-hidden="true"
          />

          {/* Layered Level-3 Elevated Dialog / Mobile Bottom-Sheet */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? resolvedTitleId : undefined}
            aria-describedby={subtitle ? resolvedDescId : undefined}
            aria-label={!title ? ariaLabel || t('modals.close') : undefined}
            className={`relative z-10 w-full ${maxWidthClass} max-h-[92dvh] sm:max-h-[90dvh] flex flex-col glass-surface-3 rounded-t-[28px] sm:rounded-[32px] border border-[#A9C5D8]/50 shadow-glass-lg overflow-hidden my-0 sm:my-auto pb-[env(safe-area-inset-bottom)] focus:outline-none`}
          >
            {/* Subtle Horizon Top Accent Strip */}
            <div
              className={`h-1.5 w-full bg-gradient-to-r ${VARIANT_ACCENTS[variant]} shrink-0`}
              aria-hidden="true"
            />

            {/* Optional Structured Header */}
            {(title || headerBadge || !hideCloseButton) && (
              <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#172B46]/[0.08] bg-[#F5F6F3] flex items-start justify-between gap-3 shrink-0">
                <div className="flex items-start gap-3 min-w-0 flex-1 text-start">
                  {icon && (
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#A9C5D8]/40 shadow-glass-sm flex items-center justify-center shrink-0 mt-0.5">
                      {icon}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    {headerBadge && <div className="mb-1.5">{headerBadge}</div>}
                    {title && (
                      <h2
                        id={resolvedTitleId}
                        className="text-lg sm:text-xl font-heading font-extrabold text-[#172B46] leading-snug"
                      >
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p
                        id={resolvedDescId}
                        className="text-xs sm:text-sm text-ofoq-midnight-secondary mt-1 leading-relaxed"
                      >
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={() => onCloseRef.current()}
                    aria-label={t('modals.close')}
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white border border-[#A9C5D8]/50 text-[#172B46]/80 hover:text-[#172B46] hover:bg-[#A9C5D8]/20 flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-ring ofoq-interactive"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 text-start">
              {children}
            </div>

            {/* Optional Footer */}
            {footer && (
              <div className="px-5 py-4 sm:px-6 border-t border-[#172B46]/[0.08] bg-[#F5F6F3] shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
