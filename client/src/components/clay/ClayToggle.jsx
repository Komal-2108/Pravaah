import React from 'react';
import { motion } from 'framer-motion';

export const ClayToggle = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = ''
}) => {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={`w-14 h-8 rounded-full p-1 transition-colors relative flex items-center shadow-clay-pressed ${
          checked ? 'bg-clay-sage' : 'bg-clay-sand'
        }`}
      >
        <motion.div
          className={`w-6 h-6 rounded-full shadow-clay-pill ${
            checked
              ? 'bg-white'
              : 'bg-clay-cream'
          }`}
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            marginLeft: checked ? 'auto' : '0'
          }}
        />
      </button>
      {label && (
        <span className="text-sm font-bold font-display text-clay-forest">
          {label}
        </span>
      )}
    </label>
  );
};
