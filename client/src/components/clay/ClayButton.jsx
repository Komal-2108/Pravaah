import React from 'react';
import { motion } from 'framer-motion';

export const ClayButton = ({
  children,
  variant = 'copper', // 'copper' | 'forest' | 'cream' | 'sand' | 'pressed'
  size = 'md', // 'sm' | 'md' | 'lg' | 'icon'
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'forest':
        return 'clay-button-forest text-clay-cream font-bold';
      case 'cream':
        return 'clay-button-cream text-clay-forest font-bold hover:bg-white';
      case 'sand':
        return 'bg-clay-sand text-clay-forest font-bold shadow-clay-card hover:bg-clay-sand-light';
      case 'pressed':
        return 'bg-[#EFE9DC] text-clay-forest shadow-clay-pressed font-bold';
      case 'copper':
      default:
        return 'clay-button-copper text-white font-bold';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-4 text-xs';
      case 'lg':
        return 'h-14 px-8 text-base sm:text-lg';
      case 'icon':
        return 'w-11 h-11 p-0 flex items-center justify-center';
      case 'md':
      default:
        return 'h-11 px-6 text-sm';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.96, y: 1 } : {}}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full select-none cursor-pointer tracking-wide transition-colors ${getVariantStyles()} ${getSizeStyles()} ${
        disabled ? 'opacity-50 cursor-not-allowed filter grayscale' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="shrink-0" />}
      {children}
    </motion.button>
  );
};
