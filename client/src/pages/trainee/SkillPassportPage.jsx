import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Layers,
  Check
} from 'lucide-react';

export const SkillPassportPage = () => {
  const [isGstCourseAdded, setIsGstCourseAdded] = useState(false);

  // Radar Chart Skills Data
  const radarData = [
    { skill: 'Accounting', userLevel: 88, requiredLevel: 80 },
    { skill: 'Excel', userLevel: 65, requiredLevel: 75 },
    { skill: 'GST', userLevel: isGstCourseAdded ? 78 : 38, requiredLevel: 70 },
    { skill: 'MIS', userLevel: 76, requiredLevel: 70 },
    { skill: 'Communication', userLevel: 70, requiredLevel: 65 },
    { skill: 'Digital Tools', userLevel: 60, requiredLevel: 60 }
  ];

  const skillGaps = [
    { name: 'Accounting', percent: 88, color: 'bg-clay-olive' },
    { name: 'Excel', percent: 65, color: 'bg-clay-sage' },
    { name: 'GST', percent: isGstCourseAdded ? 78 : 38, color: isGstCourseAdded ? 'bg-clay-olive' : 'bg-clay-copper' },
    { name: 'MIS', percent: 76, color: 'bg-clay-olive' },
    { name: 'Communication', percent: 70, color: 'bg-clay-sage' },
    { name: 'Digital Tools', percent: 60, color: 'bg-clay-sage' }
  ];

  const overallReadiness = isGstCourseAdded ? 79 : 71;

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest">
            Your Skill Graph
          </h1>
          <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold mt-0.5">
            A visual map of your current skills and what to learn next.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button className="px-4 py-2 rounded-full bg-clay-olive text-white font-display font-bold text-xs shadow-warm-pill">
            Current Skills
          </button>
          <div className="px-4 py-2 rounded-full bg-white border border-clay-sand/40 font-display font-bold text-xs text-clay-forest shadow-sm">
            Target Role: <strong>PACS Accountant</strong>
          </div>
          <button className="px-4 py-2 rounded-full bg-clay-cream hover:bg-white text-clay-forest font-display font-bold text-xs transition border border-clay-sand/40">
            Change Goal
          </button>
        </div>
      </div>

      {/* 2. Main Row: Radar Chart Left + Skill Gap Analysis Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Radar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-clay-sand/40 shadow-warm-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-clay-sand/30 pb-3">
            <span className="font-display font-black text-base text-clay-forest">
              Multidimensional Competency Polygon
            </span>
            
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-display font-bold">
              <span className="flex items-center gap-1.5 text-clay-olive">
                <span className="w-2.5 h-2.5 rounded-full bg-clay-olive" /> Your Level
              </span>
              <span className="flex items-center gap-1.5 text-clay-sand">
                <span className="w-2.5 h-2.5 rounded-full bg-clay-sand" /> Required Level
              </span>
            </div>
          </div>

          {/* Radar Canvas */}
          <div className="h-72 w-full py-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#D8C6A5" opacity={0.6} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#1F2A24', fontSize: 12, fontFamily: 'Fredoka', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                
                {/* Required Level (Sand Polygon) */}
                <Radar name="Required Level" dataKey="requiredLevel" stroke="#D8C6A5" fill="#D8C6A5" fillOpacity={0.25} />
                
                {/* User Level (Olive Polygon) */}
                <Radar name="Your Level" dataKey="userLevel" stroke="#34483D" strokeWidth={2.5} fill="#687C6B" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Skill Gap Analysis & What-If Trigger (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-clay-sand/40 shadow-warm-card flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-clay-sand/30 pb-3">
            <span className="font-display font-black text-base text-clay-forest">
              Skill Gap Analysis
            </span>
            <span className="font-display font-black text-sm text-clay-olive">
              {overallReadiness}% Readiness
            </span>
          </div>

          {/* Thick Pill Progress Bars */}
          <div className="space-y-3 flex-grow">
            {skillGaps.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-display font-bold text-clay-forest">
                  <span>{item.name}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#EFE9DC] overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive What-If Simulation Button */}
          <div className="pt-2 border-t border-clay-sand/30">
            <button
              onClick={() => setIsGstCourseAdded(!isGstCourseAdded)}
              className="w-full py-3 rounded-full bg-clay-cream hover:bg-[#EAE2D2] text-clay-forest font-display font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Sparkles size={14} className="text-clay-copper" />
              <span>
                {isGstCourseAdded ? 'Reset What-If Simulator (79% → 71%)' : '+ Simulate GST Course (71% → 79%)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Recommended Next Learning Path (3 Illustrated Cards) */}
      <div className="space-y-4">
        <h2 className="font-display font-black text-xl text-clay-forest">
          Recommended Next Learning Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: GST Basics */}
          <div
            onClick={() => setIsGstCourseAdded(true)}
            className="bg-white rounded-3xl p-5 border border-clay-sand/40 shadow-warm-card hover:shadow-warm-card-hover cursor-pointer transition flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF6EB] text-clay-copper flex items-center justify-center font-display font-black text-lg shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm text-clay-forest group-hover:text-clay-olive transition-colors">
                  GST Basics for PACS
                </h4>
                <span className="text-xs text-clay-copper font-display font-bold">
                  Start Now · +8% Boost
                </span>
              </div>
            </div>
            <ArrowRight size={18} className="text-clay-olive opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Card 2: Advanced Excel */}
          <div className="bg-white rounded-3xl p-5 border border-clay-sand/40 shadow-warm-card hover:shadow-warm-card-hover cursor-pointer transition flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-clay-olive flex items-center justify-center font-display font-black text-lg shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm text-clay-forest group-hover:text-clay-olive transition-colors">
                  Advanced Excel
                </h4>
                <span className="text-xs text-clay-olive font-display">
                  2 Weeks Course
                </span>
              </div>
            </div>
            <ArrowRight size={18} className="text-clay-olive opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Card 3: MIS for Cooperatives */}
          <div className="bg-white rounded-3xl p-5 border border-clay-sand/40 shadow-warm-card hover:shadow-warm-card-hover cursor-pointer transition flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-clay-olive flex items-center justify-center font-display font-black text-lg shrink-0">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm text-clay-forest group-hover:text-clay-olive transition-colors">
                  MIS for Cooperatives
                </h4>
                <span className="text-xs text-clay-olive font-display">
                  3 Weeks Course
                </span>
              </div>
            </div>
            <ArrowRight size={18} className="text-clay-olive opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};
