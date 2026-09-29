import React from 'react';
import { motion } from 'framer-motion';

export const ClayChip = ({
  children,
  variant = 'cream', // 'cream' | 'copper' | 'sage' | 'sand' | 'forest' | 'pressed'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
  onClick,
  active = false,
  ...props
}) => {
  const getVariantStyles = () => {
    if (active) {
      return 'bg-[#E5DDCB] text-clay-copper shadow-clay-pressed font-extrabold';
    }
    switch (variant) {
      case 'copper':
        return 'bg-clay-copper text-white shadow-clay-pill font-bold';
      case 'sage':
        return 'bg-clay-sage text-white shadow-clay-pill font-bold';
      case 'sand':
        return 'bg-clay-sand text-clay-forest shadow-clay-pill font-bold';
      case 'forest':
        return 'bg-clay-forest text-clay-cream shadow-clay-pill font-bold';
      case 'pressed':
        return 'bg-[#EFE9DC] text-clay-forest shadow-clay-pressed font-bold';
      case 'cream':
      default:
        return 'bg-clay-cream text-clay-forest shadow-clay-pill font-bold';
    }
  };

  const Component = onClick ? motion.button : 'span';

  return (
    <Component
      onClick={onClick}
      whileHover={onClick ? { scale: 1.04 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      className={`inline-flex items-center gap-1.5 rounded-full select-none ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
      } ${getVariantStyles()} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 15} className="shrink-0" />}
      <span>{children}</span>
    </Component>
  );
};
