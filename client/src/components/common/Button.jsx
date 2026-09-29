import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'copper'
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
      case 'secondary':
        return 'bg-cream text-forest border border-sand hover:bg-sand/40 active:bg-sand/60 shadow-button-secondary font-bold focus-visible:ring-2 focus-visible:ring-copper';
      case 'ghost':
        return 'bg-transparent text-forest hover:bg-sand/30 active:bg-sand/50 font-bold focus-visible:ring-2 focus-visible:ring-copper';
      case 'copper':
        return 'bg-copper hover:bg-copper-hover active:bg-copper-dark text-white shadow-button-copper font-bold focus-visible:ring-2 focus-visible:ring-olive';
      case 'primary':
      default:
        return 'bg-olive hover:bg-forest active:bg-forest-dark text-cream shadow-button-primary font-bold focus-visible:ring-2 focus-visible:ring-copper';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-4 text-xs';
      case 'lg':
        return 'h-13 px-8 text-base';
      case 'icon':
        return 'w-10 h-10 p-0 flex items-center justify-center';
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
      whileHover={!disabled ? { y: -1.5, scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-display select-none cursor-pointer tracking-wide transition-colors outline-none ${getVariantStyles()} ${getSizeStyles()} ${
        disabled ? 'opacity-50 cursor-not-allowed filter grayscale' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />}
      {children}
    </motion.button>
  );
};
