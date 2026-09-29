import React from 'react';
import { motion } from 'framer-motion';

export const ClayProgress = ({
  value = 0, // 0 to 100
  targetValue, // optional target goal line or indicator in copper
  height = 'h-5',
  showLabel = false,
  label,
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-bold text-clay-forest font-display">
          <span>{label || 'Progress'}</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      
      {/* Thick Clay Progress Tube (Sand Track + Sage Fill + Inset Shadow) */}
      <div className={`w-full ${height} rounded-full bg-clay-sand/70 p-1 shadow-clay-pressed relative overflow-hidden flex items-center`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-clay-sage to-[#54735B] shadow-clay-pill relative"
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {/* Subtle glossy clay highlight on top */}
          <div className="absolute inset-x-1 top-0.5 h-[2px] bg-white/40 rounded-full pointer-events-none" />
        </motion.div>

        {/* Optional Target Goal Marker */}
        {targetValue && (
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-clay-copper rounded-full shadow-md z-10"
            style={{ left: `${targetValue}%` }}
            title={`Goal: ${targetValue}%`}
          />
        )}
      </div>
    </div>
  );
};
