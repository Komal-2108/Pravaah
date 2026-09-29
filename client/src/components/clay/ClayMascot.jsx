import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon } from 'lucide-react';

export const ClayMascot = ({
  mood = 'happy', // 'happy' | 'sleeping' | 'cheering' | 'thinking'
  size = 48,
  className = '',
  speechBubble
}) => {
  const isSleeping = mood === 'sleeping';
  const isCheering = mood === 'cheering';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <motion.div
        animate={
          isSleeping
            ? { y: [0, 3, 0], rotate: [-2, 2, -2] }
            : isCheering
            ? { y: [0, -8, 0], scale: [1, 1.08, 1], rotate: [-4, 4, -4] }
            : { y: [0, -3, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isSleeping ? 4 : isCheering ? 0.8 : 2.5,
          ease: 'easeInOut'
        }}
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Clay Pebble Body (Sage Green Leaf/Seed) */}
        <div
          className={`w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-clay-card relative flex items-center justify-center transition-colors ${
            isSleeping ? 'bg-[#98A79B]' : 'bg-clay-sage'
          }`}
        >
          {/* Highlight sheen */}
          <div className="absolute top-1.5 left-2 w-3 h-2 bg-white/40 rounded-full rotate-[-20deg]" />

          {/* Eyes */}
          <div className="flex items-center gap-2 z-10">
            {isSleeping ? (
              <>
                <div className="w-2.5 h-1 border-b-2 border-clay-forest rounded-full" />
                <div className="w-2.5 h-1 border-b-2 border-clay-forest rounded-full" />
              </>
            ) : isCheering ? (
              <>
                <div className="w-2.5 h-2.5 bg-clay-forest rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full -mt-0.5 -ml-0.5" />
                </div>
                <div className="w-2.5 h-2.5 bg-clay-forest rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full -mt-0.5 -ml-0.5" />
                </div>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-clay-forest rounded-full" />
                <div className="w-2 h-2 bg-clay-forest rounded-full" />
              </>
            )}
          </div>

          {/* Smile / Expression */}
          <div className="absolute bottom-2.5 flex items-center justify-center">
            {isSleeping ? (
              <span className="text-[10px] text-clay-forest font-bold font-mono">zZ</span>
            ) : isCheering ? (
              <div className="w-2.5 h-1.5 bg-clay-copper rounded-b-full" />
            ) : (
              <div className="w-2 h-1 border-b-2 border-clay-forest rounded-full" />
            )}
          </div>
        </div>

        {/* Small floating reaction icon */}
        {isSleeping && (
          <motion.div
            animate={{ y: [-2, -8], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-1 text-clay-olive"
          >
            <Moon size={12} />
          </motion.div>
        )}
        {isCheering && (
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-2 -right-2 text-clay-copper"
          >
            <Sparkles size={14} />
          </motion.div>
        )}
      </motion.div>

      {speechBubble && (
        <div className="bg-clay-cream px-3 py-1.5 rounded-2xl shadow-clay-pill text-xs font-bold text-clay-forest font-display">
          {speechBubble}
        </div>
      )}
    </div>
  );
};
