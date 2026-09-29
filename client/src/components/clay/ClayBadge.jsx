import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const ClayBadge = ({
  title,
  level = 'Proficient',
  score = 88,
  hash = '7f82a1e944bc30219aa4b7f8092d04323e449a5b4c12',
  issuer = 'Anand Training Academy',
  date = '2026-09-15',
  earned = true,
  icon: Icon = Award,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!earned) {
    return (
      <div
        className={`w-full p-5 rounded-[28px] bg-[#ECE4D4] shadow-clay-pressed flex flex-col items-center justify-center text-center opacity-70 cursor-not-allowed select-none ${className}`}
      >
        <div className="w-14 h-14 rounded-full bg-[#DFD5C2] shadow-inner flex items-center justify-center text-clay-sage mb-3">
          <Lock size={22} className="text-clay-olive/60" />
        </div>
        <div className="font-display font-bold text-clay-olive text-sm sm:text-base">{title}</div>
        <div className="text-xs text-clay-olive/70 font-display mt-0.5">Unearned · Complete Task to Unlock</div>
      </div>
    );
  }

  return (
    <div
      className={`perspective-1000 cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative min-h-[190px] w-full rounded-[28px] p-5 sm:p-6 bg-clay-cream shadow-clay-card flex flex-col justify-between select-none"
      >
        {!isFlipped ? (
          /* Front: Tactile Clay Token */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-clay-copper to-[#A5794C] shadow-clay-pill flex items-center justify-center text-white">
                <Icon size={24} />
              </div>
              <span className="px-3 py-1 rounded-full bg-clay-sage text-white text-xs font-bold font-display shadow-sm flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified {score}%
              </span>
            </div>

            <div>
              <div className="font-display font-bold text-clay-forest text-base sm:text-lg leading-snug">
                {title}
              </div>
              <div className="text-xs text-clay-olive font-display mt-0.5">
                {level} · Tap to flip seal
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-clay-olive font-mono border-t border-clay-sand/50">
              <span className="truncate max-w-[120px]">SHA256:{hash.slice(0, 8)}...</span>
              <span className="text-clay-copper font-bold font-display">Flip ↺</span>
            </div>
          </div>
        ) : (
          /* Back: SHA-256 Tamper-Proof Credential Details */
          <div className="space-y-2 text-left bg-clay-sand/30 p-3.5 rounded-2xl border border-clay-sand/60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-clay-copper font-display">
                Cryptographic Proof
              </span>
              <ShieldCheck size={14} className="text-clay-sage" />
            </div>

            <div className="font-mono text-[10px] text-clay-forest bg-white/70 p-2 rounded-xl shadow-inner break-all leading-tight">
              SHA256:{hash}
            </div>

            <div className="text-[11px] font-sans text-clay-forest space-y-0.5 pt-1">
              <div><strong>Issuer:</strong> {issuer}</div>
              <div><strong>Sealed On:</strong> {date}</div>
            </div>
            
            <div className="text-[10px] text-center text-clay-copper font-bold pt-1">
              Tap to flip back
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
