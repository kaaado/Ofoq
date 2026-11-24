import React, { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  /** Duration in ms; 0 = persistent until dismissed. Critical errors default to persistent. */
  duration?: number;
  persistent?: boolean;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => string;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { effectiveReducedMotion, preferences } = useSensoryPreferences();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());
  const idSeqRef = useRef<number>(0);

  // Clean up all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const hideToast = useCallback((id: string) => {
    const existingTimer = timersRef.current.get(id);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration, persistent }: Omit<Toast, 'id'>): string => {
      idSeqRef.current += 1;
      const id = `toast_${Date.now()}_${idSeqRef.current}`;

      // Critical errors and active loading states persist unless explicitly timed
      const isPersistent = persistent ?? (type === 'error' || type === 'loading');
      const resolvedDuration =
        typeof duration === 'number'
          ? duration
          : isPersistent
          ? 0
          : type === 'warning'
          ? 7000
          : 5000;

      const nextToast: Toast = {
        id,
        type,
        title,
        message,
        duration: resolvedDuration,
        persistent: isPersistent,
      };

      setToasts((prev) => {
        const combined = [...prev, nextToast];
        if (combined.length <= 4) return combined;

        // Preserve persistent error toasts ahead of transient notifications
        const persistentErrors = combined.filter((item) => item.type === 'error' && item.persistent);
        const others = combined.filter((item) => !(item.type === 'error' && item.persistent));
        const maxOthers = Math.max(0, 4 - persistentErrors.length);
        const keptOthers = maxOthers > 0 ? others.slice(-maxOthers) : [];
        const keptSet = new Set([...persistentErrors.slice(-4), ...keptOthers]);
        const nextList = combined.filter((item) => keptSet.has(item));

        // Cancel timers for any evicted toasts
        combined.forEach((item) => {
          if (!keptSet.has(item)) {
            const evictedTimer = timersRef.current.get(item.id);
            if (evictedTimer) {
              window.clearTimeout(evictedTimer);
              timersRef.current.delete(item.id);
            }
          }
        });

        return nextList;
      });

      if (resolvedDuration > 0) {
        const timerId = window.setTimeout(() => {
          hideToast(id);
        }, resolvedDuration);
        timersRef.current.set(id, timerId);
      }

      return id;
    },
    [hideToast]
  );

  const contextValue = useMemo(
    () => ({ showToast, hideToast }),
    [showToast, hideToast]
  );

  const politeToasts = toasts.filter((item) => item.type !== 'error');
  const assertiveToasts = toasts.filter((item) => item.type === 'error');

  const renderToast = (toast: Toast) => {
    const icons: Record<ToastType, React.ReactNode> = {
      success: <CheckCircle2 className="text-ofoq-success shrink-0 mt-0.5" size={20} />,
      error: <AlertCircle className="text-ofoq-error shrink-0 mt-0.5" size={20} />,
      warning: <AlertTriangle className="text-ofoq-warning shrink-0 mt-0.5" size={20} />,
      info: <Info className="text-ofoq-info shrink-0 mt-0.5" size={20} />,
      loading: (
        <Loader2
          className={`text-ofoq-info shrink-0 mt-0.5 ${effectiveReducedMotion ? '' : 'animate-spin'}`}
          size={20}
        />
      ),
    };

    const styles: Record<ToastType, string> = {
      success: 'border-ofoq-success/30 bg-white',
      error: 'border-ofoq-error/35 bg-ofoq-error-soft',
      warning: 'border-ofoq-warning/35 bg-ofoq-warning-soft',
      info: 'border-ofoq-info/30 bg-white',
      loading: 'border-ofoq-cloud/60 bg-white',
    };

    return (
      <motion.div
        key={toast.id}
        layout={!effectiveReducedMotion}
        initial={effectiveReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={effectiveReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: effectiveReducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
        className={`pointer-events-auto p-3.5 sm:p-4 rounded-2xl shadow-glass-lg border ${
          preferences.quietMode ? '' : 'backdrop-blur-md'
        } flex items-start gap-3 ${styles[toast.type]}`}
        role={toast.type === 'error' ? 'alert' : 'status'}
        aria-atomic="true"
      >
        {icons[toast.type]}
        <div className="flex-1 min-w-0 text-start">
          <h4 className="text-xs sm:text-sm font-bold text-ofoq-midnight leading-snug">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-xs text-ofoq-midnight-secondary mt-1 leading-relaxed break-words">
              {toast.message}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => hideToast(toast.id)}
          className="w-12 h-12 min-w-[48px] min-h-[48px] -my-1.5 -me-1.5 rounded-xl text-ofoq-midnight-secondary hover:text-ofoq-midnight hover:bg-ofoq-cloud/25 transition-colors cursor-pointer flex items-center justify-center shrink-0 focus-ring ofoq-interactive"
          aria-label={t('modals.close')}
        >
          <X size={16} />
        </button>
      </motion.div>
    );
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Responsive viewport-safe Toast container above modals (z-[60], zero overflow on 375px RTL/LTR) */}
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-5 sm:end-5 z-[60] flex flex-col gap-2.5 sm:w-full sm:max-w-sm pointer-events-none">
        <div aria-live="assertive" className="flex flex-col gap-2.5">
          <AnimatePresence>{assertiveToasts.map(renderToast)}</AnimatePresence>
        </div>
        <div aria-live="polite" className="flex flex-col gap-2.5">
          <AnimatePresence>{politeToasts.map(renderToast)}</AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
