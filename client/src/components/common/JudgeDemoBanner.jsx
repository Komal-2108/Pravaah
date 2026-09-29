import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { useAuth } from '../../context/AuthContext';
import { Play, ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const JudgeDemoBanner = () => {
  const { isDemoActive, currentStep, currentStepIndex, totalSteps, nextStep, prevStep, exitDemo, jumpToStep } = useDemo();
  const { quickSwitchRole, user } = useAuth();
  const navigate = useNavigate();

  if (!isDemoActive) return null;

  const handleStepAction = (targetStep) => {
    if (targetStep.role && user?.role !== targetStep.role && targetStep.role !== 'public') {
      quickSwitchRole(targetStep.role);
    }
    navigate(targetStep.path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-pravaah-navy border-t-2 border-pravaah-teal text-white shadow-2xl px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step Progress & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pravaah-teal text-white font-bold text-sm shrink-0">
            {currentStep.step}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-pravaah-teal-light bg-pravaah-teal/30 px-1.5 py-0.5 rounded">
                SIH Judge Demo Flow ({currentStepIndex + 1}/{totalSteps})
              </span>
              <span className="text-xs text-pravaah-muted">Role: {currentStep.role}</span>
            </div>
            <h4 className="font-heading font-semibold text-sm sm:text-base text-white">
              {currentStep.title}
            </h4>
            <p className="text-xs text-gray-300 line-clamp-1 max-w-xl">
              {currentStep.instruction}
            </p>
          </div>
        </div>

        {/* Step Stepper Dots */}
        <div className="hidden lg:flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                jumpToStep(idx);
                // Handle navigation for target step
                const stp = useDemo().steps[idx];
                if (stp) {
                  if (stp.role && stp.role !== 'public') quickSwitchRole(stp.role);
                  navigate(stp.path);
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-pravaah-teal w-6'
                  : idx < currentStepIndex
                  ? 'bg-pravaah-emerald'
                  : 'bg-gray-700 hover:bg-gray-500'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              handleStepAction(currentStep);
            }}
            className="bg-pravaah-emerald hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
          >
            <Sparkles size={13} /> Go to Step View
          </button>

          <button
            onClick={() => {
              prevStep();
              // Update route
              setTimeout(() => {
                const prevIndex = Math.max(0, currentStepIndex - 1);
                const prevStp = useDemo().steps[prevIndex];
                if (prevStp) {
                  if (prevStp.role && prevStp.role !== 'public') quickSwitchRole(prevStp.role);
                  navigate(prevStp.path);
                }
              }, 50);
            }}
            disabled={currentStepIndex === 0}
            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-white p-1.5 rounded-lg transition"
            title="Previous Step"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => {
              nextStep();
              setTimeout(() => {
                const nextIndex = Math.min(totalSteps - 1, currentStepIndex + 1);
                const nextStp = useDemo().steps[nextIndex];
                if (nextStp) {
                  if (nextStp.role && nextStp.role !== 'public') quickSwitchRole(nextStp.role);
                  navigate(nextStp.path);
                }
              }, 50);
            }}
            className="bg-pravaah-teal hover:bg-pravaah-teal-dark text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
          >
            {currentStepIndex === totalSteps - 1 ? 'Finish Demo' : 'Next Step'} <ChevronRight size={14} />
          </button>

          <button
            onClick={exitDemo}
            className="text-gray-400 hover:text-white p-1 rounded-lg ml-1"
            title="Exit Demo Mode"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
