import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ShoppingBag, XCircle } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  message: string;
  theme: 'dark' | 'light';
  type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, theme, type = 'success' }) => {
  const isDark = theme === 'dark';
  const isError = type === 'error';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[500]"
        >
          <div className={`px-8 py-5 rounded-full shadow-2xl flex items-center gap-4 border ${isError ? (isDark ? 'bg-[#2A0808] border-red-500/50 text-white' : 'bg-red-50 border-red-300 text-red-900') : (isDark ? 'bg-[#1A1A1A] border-amber-500/30 text-white' : 'bg-white border-stone-300 text-stone-900')}`}>
            <div className={`p-2 rounded-full ${isError ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
              {isError ? <XCircle className="w-5 h-5 text-red-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
            <p className="text-sm font-medium">{message}</p>
            {!isError && <ShoppingBag className="w-4 h-4 text-amber-500" />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
