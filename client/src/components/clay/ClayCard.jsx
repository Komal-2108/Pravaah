import React from 'react';
import { motion } from 'framer-motion';

export const ClayCard = ({
  children,
  variant = 'cream', // 'cream' | 'dark' | 'sand' | 'pressed'
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'bg-clay-forest text-clay-cream shadow-clay-dark';
      case 'sand':
        return 'bg-clay-sand text-clay-forest shadow-clay-card';
      case 'pressed':
        return 'bg-[#EFE9DC] text-clay-forest shadow-clay-pressed';
      case 'cream':
      default:
        return 'bg-clay-cream text-clay-forest shadow-clay-card';
    }
  };

  const Component = onClick || hoverEffect ? motion.div : 'div';

  return (
    <Component
      onClick={onClick}
      whileHover={hoverEffect && onClick ? { y: -3, scale: 1.01 } : hoverEffect ? { y: -2 } : {}}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 relative overflow-hidden ${getVariantStyles()} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
