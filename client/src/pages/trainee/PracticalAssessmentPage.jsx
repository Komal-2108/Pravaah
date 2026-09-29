import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNotification } from '../../context/NotificationContext';
import { IllustrationSlot } from '../../components/common/IllustrationSlot';
import { 
  Video, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  ArrowLeft, 
  Check, 
  X, 
  Sparkles,
  Award,
  ChevronLeft
} from 'lucide-react';

export const PracticalAssessmentPage = () => {
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [activeRail, setActiveRail] = useState('quiz');
  const [selectedOption, setSelectedOption] = useState('Member share capital');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2); // Question 3 (0-indexed 2)

  const questions = [
    {
      id: 1,
      title: 'Which voucher is prepared for daily member fertilizer purchases?',
      options: ['Payment Voucher', 'Journal Voucher', 'Receipt Voucher', 'Transfer Voucher'],
      correct: 'Payment Voucher'
    },
    {
      id: 2,
      title: 'What represents the opening cash balance in a PACS ledger?',
      options: ['Vault Cash in Hand', 'Fixed Deposit', 'Outstanding Loan', 'Share Dividend'],
      correct: 'Vault Cash in Hand'
    },
    {
      id: 3,
      title: 'Which of the following is recorded in the Cash Book?',
      options: [
        'Member share capital',
        'Land and building',
        'Loan taken from bank',
        'All of the above'
      ],
      correct: 'Member share capital',
      hint: 'Cash books capture immediate liquid cash receipts and member capital recovery.'
    }
  ];

  const currentQ = questions[currentQuestionIndex] || questions[2];

  const handleSubmitAnswer = () => {
    setIsSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    addToast({
      title: 'Correct Answer Recorded!',
      message: '+25 XP added to your Skill Passport.',
      type: 'success'
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-clay-sand/40 shadow-warm-card overflow-hidden text-left min-h-[580px] flex flex-col justify-between">
      
      {/* 1. Header Bar: Title + Progress 3/10 + Close button */}
      <div className="px-6 py-4 border-b border-clay-sand/30 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-display font-bold text-clay-olive">
            Basics of Cooperative Accounting · Module 3
          </div>
          <h2 className="font-display font-black text-xl text-clay-forest">
            Recording Transactions
          </h2>
        </div>

        {/* Progress 3/10 Bar */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-2.5 rounded-full bg-[#EFE9DC] overflow-hidden">
              <div className="h-full bg-clay-olive rounded-full" style={{ width: '30%' }} />
            </div>
            <span className="font-display font-bold text-xs text-clay-forest">
              3/10
            </span>
          </div>

          <button
            onClick={() => navigate('/trainee/dashboard')}
            className="w-9 h-9 rounded-full bg-clay-cream hover:bg-[#EAE2D2] text-clay-forest flex items-center justify-center transition shadow-sm"
            aria-label="Exit Quiz"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* 2. Main Area: Left Slim Rail + Question Card + Right Thinking Learner */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Slim Icon Rail */}
        <div className="hidden md:flex md:col-span-1 border-r border-clay-sand/30 flex-col items-center py-6 space-y-5 select-none">
          <button
            onClick={() => setActiveRail('video')}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-clay-forest hover:bg-clay-cream transition"
            title="Video Lecture"
          >
            <Video size={18} />
          </button>

          <button
            onClick={() => setActiveRail('notes')}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-clay-forest hover:bg-clay-cream transition"
            title="Study Notes"
          >
            <FileText size={18} />
          </button>

          <button
            onClick={() => setActiveRail('quiz')}
            className="w-10 h-10 rounded-2xl bg-clay-olive text-white shadow-warm-pill flex items-center justify-center"
            title="Practice Quiz"
          >
            <HelpCircle size={18} />
          </button>

          <button
            onClick={() => setActiveRail('discussion')}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-clay-forest hover:bg-clay-cream transition"
            title="Community Discussion"
          >
            <MessageSquare size={18} />
          </button>
        </div>

        {/* Center: Question & Options (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <span className="font-display font-black text-xs uppercase tracking-wider text-clay-olive">
                Question 3 of 10
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-clay-forest mt-1 leading-snug">
                {currentQ.title}
              </h3>
            </div>

            {/* Radio Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt;

                return (
                  <div
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-4 rounded-2xl border transition cursor-pointer select-none flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-[#EEF5F1] border-clay-olive text-clay-forest shadow-sm'
                        : 'border-clay-sand/40 hover:bg-clay-cream text-clay-forest'
                    }`}
                  >
                    {/* Radio circle */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition shrink-0 ${
                      isSelected ? 'bg-clay-olive text-white' : 'border-2 border-clay-sand'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>

                    <span className="font-display font-bold text-sm">
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Feedback / Gentle Hint */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-[#EEF5F1] border border-clay-olive/30 text-xs font-display text-clay-forest flex items-center gap-2">
                <Check size={16} className="text-clay-olive shrink-0" />
                <span>Great job! Member share capital is entered directly in cash receipts.</span>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-clay-sand/30">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
              }}
              className="w-10 h-10 rounded-full bg-clay-cream hover:bg-[#EAE2D2] text-clay-forest flex items-center justify-center transition"
              aria-label="Previous Question"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleSubmitAnswer}
              className="px-7 py-3 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-sm shadow-warm-pill transition"
            >
              <span>{isSubmitted ? 'Next Question →' : 'Submit Answer'}</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Illustrated Thinking Learner + Handwritten Motivation (4 cols) */}
        <div className="md:col-span-4 bg-[#FBF7EE] border-t md:border-t-0 md:border-l border-clay-sand/30 p-6 flex flex-col justify-between items-center text-center">
          {/* Thinking Learner SVG */}
          <div className="w-full flex justify-center py-2">
            <IllustrationSlot name="thinking-learner" />
          </div>

          {/* Handwritten Encouragement Note */}
          <div className="p-5 rounded-3xl bg-white border border-[#E8D9C0] shadow-warm-sm w-full space-y-1">
            <div className="font-handwritten text-xl sm:text-2xl text-clay-forest font-bold leading-snug">
              "Take your time. Learning is a process, not a race!"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
