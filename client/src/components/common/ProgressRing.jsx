import React from 'react';
import { motion } from 'framer-motion';

export const ProgressRing = ({
  percentage = 60,
  size = 110,
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
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Sand track background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D8C6A5"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-40"
        />
        {/* Active Progress Fill in Olive/Sage */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#34483D"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        />
      </svg>

      {/* Center Percentage Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display font-black text-2xl text-clay-forest leading-none">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
