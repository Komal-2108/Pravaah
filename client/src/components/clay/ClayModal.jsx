import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const ClayModal = ({
  isOpen = false,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clay-forest/50 backdrop-blur-sm">
        {/* Backdrop click dismiss */}
        <div
          className="absolute inset-0"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`relative w-full ${maxWidth} rounded-[32px] bg-clay-cream p-6 sm:p-8 shadow-clay-card z-10 border-0 ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="clay-modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-clay-sand/50">
            {title && (
              <h3 id="clay-modal-title" className="font-display font-bold text-xl text-clay-forest">
                {title}
              </h3>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-clay-sand/40 hover:bg-clay-sand/70 text-clay-forest flex items-center justify-center transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-copper"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="text-clay-forest">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
