import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDemo } from '../../context/DemoContext';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, ChevronRight, X, Sparkles, Play } from 'lucide-react';
import { ClayButton } from '../clay/ClayButton';

export const DemoDirectorBar = () => {
  const { isDemoActive, currentStep, currentStepIndex, totalSteps, nextStep, prevStep, exitDemo, jumpToStep, steps } = useDemo();
  const { quickSwitchRole, user } = useAuth();
  const navigate = useNavigate();

  if (!isDemoActive) return null;

  const handleStepJump = (idx) => {
    jumpToStep(idx);
    const target = steps[idx];
    if (target) {
      if (target.role && target.role !== 'public' && user?.role !== target.role) {
        quickSwitchRole(target.role);
      }
      navigate(target.path);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-2xl z-50 bg-clay-forest text-clay-cream rounded-[30px] shadow-clay-dark p-4 sm:p-5 select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Step Indicator & Narrative */}
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-clay-copper to-[#A5794C] text-white flex items-center justify-center font-display font-black text-sm shrink-0 shadow-clay-pill">
            {currentStepIndex + 1}
          </div>

          <div className="min-w-0 space-y-0.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-clay-copper">
                Judge Tour · Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <span className="text-[10px] font-display font-semibold text-clay-sand">
                Role: {currentStep.role}
              </span>
            </div>

            <h4 className="font-display font-extrabold text-sm sm:text-base text-white truncate">
              {currentStep.title}
            </h4>

            <p className="text-xs text-clay-cream/80 font-sans line-clamp-1">
              {currentStep.instruction}
            </p>
          </div>
        </div>

        {/* Navigation Controls & Step Dots */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-clay-olive/40">
          {/* Step Dots */}
          <div className="flex items-center gap-1 mr-1">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => handleStepJump(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  idx === currentStepIndex
                    ? 'w-4 bg-clay-copper'
                    : idx < currentStepIndex
                    ? 'bg-clay-sage'
                    : 'bg-clay-olive/60'
                }`}
                title={`Jump to Step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (currentStepIndex > 0) handleStepJump(currentStepIndex - 1);
              }}
              disabled={currentStepIndex === 0}
              className="w-8 h-8 rounded-full bg-clay-olive hover:bg-clay-sage text-clay-cream disabled:opacity-30 flex items-center justify-center shadow-sm transition"
              title="Previous Step"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => {
                if (currentStepIndex < totalSteps - 1) {
                  handleStepJump(currentStepIndex + 1);
                } else {
                  exitDemo();
                }
              }}
              className="h-8 px-3.5 rounded-full bg-clay-copper hover:bg-clay-copper-hover text-white font-display font-bold text-xs flex items-center gap-1 shadow-clay-pill transition"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finish Tour' : 'Next'}</span>
              <ChevronRight size={14} />
            </button>

            <button
              onClick={exitDemo}
              className="w-7 h-7 rounded-full bg-clay-olive/50 hover:bg-clay-olive text-clay-sand flex items-center justify-center transition ml-0.5"
              title="Exit Tour"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
