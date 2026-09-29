import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useOffline } from '../../context/OfflineContext';
import { IllustrationSlot } from '../../components/common/IllustrationSlot';
import { 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Bookmark, 
  Star, 
  Users, 
  Play,
  Check
} from 'lucide-react';

export const TraineeDashboard = () => {
  const { user } = useAuth();
  const { isOnline } = useOffline();
  const navigate = useNavigate();

  // Interactive Checklist State
  const [goals, setGoals] = useState([
    { id: 1, title: 'Watch Module 3', done: true },
    { id: 2, title: 'Attempt Practice Quiz', done: false },
    { id: 3, title: 'Complete Assignment', done: false },
    { id: 4, title: 'Explore Job Matches', done: false }
  ]);

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const completedGoalsCount = goals.filter(g => g.done).length;

  const recommendedCourses = [
    {
      id: 'c1',
      title: 'Advanced Excel for Rural Enterprises',
      rating: 4.8,
      learners: '12.5k',
      level: 'Intermediate',
      path: '/trainee/learning'
    },
    {
      id: 'c2',
      title: 'GST Basics for PACS',
      rating: 4.6,
      learners: '8.2k',
      level: 'Beginner',
      path: '/trainee/learning'
    },
    {
      id: 'c3',
      title: 'Digital Record Keeping',
      rating: 4.7,
      learners: '6.1k',
      level: 'Beginner',
      path: '/trainee/learning'
    },
    {
      id: 'c4',
      title: 'Financial Management',
      rating: 4.5,
      learners: '4.3k',
      level: 'Intermediate',
      path: '/trainee/learning'
    }
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Welcome Header + Streak / Courses in Progress Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest flex items-center gap-2">
            <span>Welcome back, {user?.name?.split(' ')[0] || 'Aditi'}!</span>
            <span>👋</span>
          </h1>
          <p className="font-handwritten text-xl sm:text-2xl text-clay-olive font-bold mt-1">
            "Consistency today, opportunities tomorrow."
          </p>
        </div>

        {/* Top Streak + In-Progress Chips */}
        <div className="flex items-center gap-3">
          {/* 7 Day Streak */}
          <div className="px-5 py-2.5 rounded-2xl bg-[#FFF6EB] border border-[#F6D7B4] shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDE9D2] flex items-center justify-center text-clay-copper">
              <Flame size={20} className="fill-current" />
            </div>
            <div>
              <div className="font-display font-black text-lg text-clay-forest leading-none">7</div>
              <div className="text-[11px] font-display text-clay-olive font-bold">Day Streak</div>
            </div>
          </div>

          {/* 3 Courses in Progress */}
          <div className="px-5 py-2.5 rounded-2xl bg-[#EEF5F1] border border-[#CADED0] shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DCEEE3] flex items-center justify-center text-clay-olive">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="font-display font-black text-lg text-clay-forest leading-none">3</div>
              <div className="text-[11px] font-display text-clay-olive font-bold">Courses in Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Continue Learning (Desk Learner) + Today's Goal Checklist + Discipline Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Continue Learning (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-clay-sand/30 pb-3">
            <span className="font-display font-black text-base text-clay-forest">
              Continue Learning
            </span>
            <span className="text-xs font-display font-bold text-clay-olive">
              60% completed
            </span>
          </div>

          {/* Desk Learner Illustration */}
          <div className="h-36 w-full rounded-2xl overflow-hidden">
            <IllustrationSlot name="desk-learner" />
          </div>

          {/* Course Title & Progress Bar */}
          <div className="space-y-2">
            <h3 className="font-display font-black text-lg text-clay-forest">
              Basics of Cooperative Accounting
            </h3>
            {/* 60% Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#EFE9DC] overflow-hidden">
              <div className="h-full rounded-full bg-clay-olive" style={{ width: '60%' }} />
            </div>
          </div>

          <Link to="/trainee/assessment" className="pt-2">
            <button className="w-full py-3 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-sm shadow-warm-pill flex items-center justify-center gap-2 transition">
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Card 2: Today's Goal Checklist (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-clay-sand/30 pb-3">
            <span className="font-display font-black text-base text-clay-forest">
              Today's Goal
            </span>
            <span className="text-xs font-display font-bold text-clay-olive">
              {completedGoalsCount}/{goals.length} completed
            </span>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3 py-1 flex-grow">
            {goals.map((g) => (
              <div
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer select-none transition ${
                  g.done ? 'bg-[#EEF5F1] text-clay-forest' : 'hover:bg-clay-cream text-clay-forest'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                  g.done ? 'bg-clay-olive text-white' : 'border-2 border-clay-sand text-transparent'
                }`}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={`font-display font-bold text-xs sm:text-sm ${
                  g.done ? 'line-through opacity-70 text-clay-olive' : 'text-clay-forest'
                }`}>
                  {g.title}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-display text-clay-olive text-center pt-2 border-t border-clay-sand/30">
            Complete daily goals to maintain your streak!
          </div>
        </div>

        {/* Card 3: Tall Motivational Illustration Card (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-warm-card relative min-h-[280px]">
          <IllustrationSlot name="discipline-mountain" className="w-full h-full absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 flex flex-col justify-end text-left z-10">
            <h4 className="font-display font-black text-xl text-white leading-tight">
              Discipline builds skills. <br />
              Skills build freedom.
            </h4>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Recommended for you (Horizontal 4-card row) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-black text-2xl text-clay-forest">
              Recommended for you
            </h2>
            <p className="text-xs text-clay-olive font-display font-semibold">
              Based on your interests and skill goals
            </p>
          </div>

          <Link
            to="/trainee/learning"
            className="text-xs font-display font-bold text-clay-olive hover:underline"
          >
            View All
          </Link>
        </div>

        {/* 4 Horizontal Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedCourses.map((c) => (
            <Link
              key={c.id}
              to={c.path}
              className="bg-white rounded-3xl p-4 border border-clay-sand/40 shadow-warm-card hover:shadow-warm-card-hover transition flex flex-col justify-between space-y-3 group"
            >
              {/* Thumbnail with bookmark */}
              <div className="h-32 rounded-2xl bg-[#F7F2E8] relative overflow-hidden flex items-center justify-center p-3">
                <IllustrationSlot name="desk-learner" className="w-full h-full scale-90" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-clay-forest absolute top-2.5 right-2.5 flex items-center justify-center shadow-sm"
                  aria-label="Bookmark"
                >
                  <Bookmark size={14} />
                </button>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h4 className="font-display font-extrabold text-sm text-clay-forest group-hover:text-clay-olive transition-colors leading-snug line-clamp-2">
                  {c.title}
                </h4>

                {/* Rating & Learners Count */}
                <div className="flex items-center gap-2 text-xs font-display font-bold text-clay-forest">
                  <span className="flex items-center gap-1 text-[#C9822B]">
                    <Star size={13} className="fill-current" /> {c.rating}
                  </span>
                  <span className="text-clay-sand">•</span>
                  <span className="text-clay-olive">{c.learners} learners</span>
                </div>
              </div>

              {/* Level Tag Pill */}
              <div className="pt-2 border-t border-clay-sand/30 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-clay-cream text-clay-forest text-xs font-display font-bold">
                  {c.level}
                </span>
                <span className="text-xs font-display font-bold text-clay-olive group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
