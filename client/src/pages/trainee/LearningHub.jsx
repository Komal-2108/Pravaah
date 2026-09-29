import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOffline } from '../../context/OfflineContext';
import { useNotification } from '../../context/NotificationContext';
import { IllustrationSlot } from '../../components/common/IllustrationSlot';
import { ProgressRing } from '../../components/common/ProgressRing';
import { 
  Play, 
  Check, 
  Lock, 
  Star, 
  Award, 
  Download, 
  FileText, 
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageSquare,
  Layers
} from 'lucide-react';

export const LearningHub = () => {
  const { isOnline } = useOffline();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('modules');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const modules = [
    {
      id: 1,
      number: '1',
      title: 'Introduction to Cooperative Accounting',
      duration: '12 min · Video',
      status: 'completed'
    },
    {
      id: 2,
      number: '2',
      title: 'Types of Accounts',
      duration: '18 min · Video',
      status: 'current'
    },
    {
      id: 3,
      number: '3',
      title: 'Recording Transactions',
      duration: '20 min · Video',
      status: 'unlocked',
      quizLink: '/trainee/assessment'
    },
    {
      id: 4,
      number: '4',
      title: 'Practical Case Study',
      duration: '15 min · Assignment',
      status: 'locked'
    }
  ];

  const handleDownloadNotes = () => {
    addToast({
      title: 'Course Notes Downloaded',
      message: 'Basics of Cooperative Accounting notes (PDF) saved for offline reading.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-display font-bold text-clay-olive">
        <Link to="/trainee/dashboard" className="hover:text-clay-forest">Courses</Link>
        <span>&gt;</span>
        <span className="hover:text-clay-forest">Cooperative Management</span>
        <span>&gt;</span>
        <span className="text-clay-forest">Basics of Cooperative Accounting</span>
      </div>

      {/* 2. Top Title Card + Big Video Player Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay-sand/40 shadow-warm-card grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Title, Description, Chips */}
        <div className="lg:col-span-6 space-y-3">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-clay-forest leading-tight">
            Basics of Cooperative Accounting
          </h1>

          <p className="text-sm text-clay-forest/85 font-sans leading-relaxed">
            Learn the fundamental concepts of accounting in cooperative societies with practical examples and real-world case studies.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="px-3.5 py-1 rounded-full bg-[#EEF5F1] text-clay-olive font-display font-bold text-xs">
              Beginner
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#FFF6EB] text-clay-copper font-display font-bold text-xs flex items-center gap-1">
              <Star size={13} className="fill-current" /> 4.8 (12.5k learners)
            </span>
            <span className="px-3.5 py-1 rounded-full bg-clay-cream text-clay-forest font-display font-bold text-xs flex items-center gap-1">
              <Award size={13} className="text-clay-olive" /> Certificate
            </span>
          </div>
        </div>

        {/* Right: Big Video Card with Play Button */}
        <div className="lg:col-span-6">
          <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden bg-[#F7F2E8] border border-clay-sand/40 shadow-sm flex items-center justify-center group cursor-pointer"
               onClick={() => setIsPlayingVideo(!isPlayingVideo)}>
            <IllustrationSlot name="desk-learner" className="w-full h-full object-cover" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition group-hover:bg-black/30">
              <div className="w-16 h-16 rounded-full bg-white text-clay-olive flex items-center justify-center shadow-warm-floating group-hover:scale-110 transition-transform">
                <Play size={24} fill="#34483D" className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tabs (Overview, Modules, Discussion, Resources) */}
      <div className="flex items-center gap-2 border-b border-clay-sand/40 pb-2 font-display font-bold text-sm">
        {['overview', 'modules', 'discussion', 'resources'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full capitalize transition ${
              activeTab === tab
                ? 'bg-clay-olive text-white shadow-warm-pill font-extrabold'
                : 'text-clay-forest hover:bg-clay-cream'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. Modules List (Left 8 cols) + Your Progress Ring (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Module List (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {modules.map((m) => {
            const isCompleted = m.status === 'completed';
            const isCurrent = m.status === 'current';
            const isUnlocked = m.status === 'unlocked';
            const isLocked = m.status === 'locked';

            return (
              <div
                key={m.id}
                onClick={() => {
                  if (m.quizLink) navigate(m.quizLink);
                }}
                className={`bg-white rounded-3xl p-5 border border-clay-sand/40 shadow-warm-card flex items-center justify-between gap-4 transition select-none ${
                  !isLocked ? 'cursor-pointer hover:shadow-warm-card-hover' : 'opacity-65'
                }`}
              >
                {/* Number circle + Title */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm shrink-0 ${
                    isCompleted
                      ? 'bg-[#EEF5F1] text-clay-olive'
                      : isCurrent
                      ? 'bg-clay-olive text-white shadow-sm'
                      : 'bg-clay-cream text-clay-forest'
                  }`}>
                    {m.number}
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-clay-forest">
                      {m.title}
                    </h4>
                    <span className="text-xs text-clay-olive font-display">
                      {m.duration}
                    </span>
                  </div>
                </div>

                {/* Right Status Icon */}
                <div>
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-[#EEF5F1] text-clay-olive flex items-center justify-center">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ) : isCurrent || isUnlocked ? (
                    <div className="w-8 h-8 rounded-full bg-clay-cream text-clay-forest flex items-center justify-center hover:bg-clay-olive hover:text-white transition">
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-clay-cream text-clay-forest flex items-center justify-center">
                      <Lock size={14} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Your Progress Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card space-y-6 text-center">
            <h3 className="font-display font-black text-lg text-clay-forest">
              Your Progress
            </h3>

            {/* Circular Progress Ring */}
            <div className="flex justify-center py-2">
              <ProgressRing percentage={60} size={130} strokeWidth={11} />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 text-left border-t border-clay-sand/30 pt-4">
              <div className="flex items-center gap-2.5 text-xs font-display font-bold text-clay-forest">
                <CheckCircle2 size={16} className="text-clay-olive shrink-0" />
                <span>3/4 Modules Completed</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-display font-bold text-clay-forest">
                <div className="w-4 h-4 rounded-full border-2 border-clay-sand shrink-0" />
                <span>1 Assignment Left</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-display font-bold text-clay-forest">
                <div className="w-4 h-4 rounded-full border-2 border-clay-sand shrink-0" />
                <span>Quiz Pending</span>
              </div>
            </div>

            {/* Download Notes Button */}
            <button
              onClick={handleDownloadNotes}
              className="w-full py-3 rounded-full bg-clay-cream hover:bg-[#EAE2D2] text-clay-forest font-display font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Download size={14} />
              <span>Download Notes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
