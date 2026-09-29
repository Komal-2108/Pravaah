import React from 'react';
import { motion } from 'framer-motion';

export const ClayDonut = ({
  percentage = 85,
  size = 80,
  strokeWidth = 10,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer shadow / soft clay ring container */}
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Sand Inset Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D8C6A5"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-60"
        />
        {/* Sage/Copper Clay Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#687C6B"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </svg>

      {/* Center Percentage Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display font-bold text-clay-forest text-sm sm:text-base leading-none">
          {percentage}%
        </span>
        <span className="text-[9px] font-bold text-clay-olive uppercase tracking-tight">
          Match
        </span>
      </div>
    </div>
  );
};
