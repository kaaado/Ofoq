import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 5000 }: Omit<Toast, 'id'>) => {
      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, duration);
      }
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const icons = {
              success: <CheckCircle2 className="text-[#172B46] shrink-0" size={20} />,
              error: <AlertCircle className="text-red-600 shrink-0" size={20} />,
              warning: <AlertTriangle className="text-amber-500 shrink-0" size={20} />,
              info: <Info className="text-[#172B46] shrink-0" size={20} />,
            };

            const borders = {
              success: 'border-[#A9C5D8]/50 bg-white/95',
              error: 'border-red-200 bg-white/95',
              warning: 'border-amber-200 bg-white/95',
              info: 'border-[#A9C5D8]/40 bg-white/95',
            };

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3 ${borders[toast.type]}`}
                role="alert"
              >
                {icons[toast.type]}
                <div className="flex-1 text-start">
                  <h4 className="text-sm font-bold text-[#172B46]">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-xs text-[#172B46]/70 mt-0.5 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => hideToast(toast.id)}
                  className="p-1 rounded-lg text-[#172B46]/70 hover:text-[#172B46] hover:bg-[#A9C5D8]/20 transition-colors cursor-pointer"
                  aria-label="Fermer la notification"
                >
                  <X size={15} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
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
