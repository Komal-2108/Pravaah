import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useDemo } from '../context/DemoContext';
import { IllustrationSlot } from '../components/common/IllustrationSlot';
import { 
  Play, 
  ArrowRight, 
  BookOpen, 
  FileSpreadsheet, 
  ShieldCheck, 
  Briefcase, 
  Wifi, 
  Sparkles, 
  CheckCircle2,
  Compass
} from 'lucide-react';

export const LandingPage = () => {
  const { quickSwitchRole } = useAuth();
  const { startDemo } = useDemo();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    quickSwitchRole('trainee');
    navigate('/trainee/dashboard');
  };

  const handleLaunchJudgeDemo = () => {
    startDemo();
    quickSwitchRole('trainee');
    navigate('/trainee/dashboard');
  };

  return (
    <div className="min-h-screen bg-clay-bg text-clay-forest flex flex-col justify-between">
      
      {/* HERO SECTION: Full-Bleed Illustrated Valley with Floating Nav */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Full-bleed Landscape Art Background */}
        <div className="absolute inset-0 z-0">
          <IllustrationSlot name="hero-valley" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-clay-forest/40 pointer-events-none" />
        </div>

        {/* 1. Floating Top Nav over Hero */}
        <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-5">
          <div className="h-16 px-5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-warm-pill flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-clay-olive text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-clay-forest">
                Pravaah
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 font-display font-bold text-sm text-clay-forest">
              <Link to="/" className="text-clay-olive font-extrabold hover:text-clay-forest">Home</Link>
              <Link to="/trainee/learning" className="hover:text-clay-olive">Courses</Link>
              <Link to="/community" className="hover:text-clay-olive">Community</Link>
              <Link to="/trainee/jobs" className="hover:text-clay-olive">Opportunities</Link>
              <Link to="/verify/PRV-2026-7F82A1" className="hover:text-clay-olive">About</Link>
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-display font-bold text-sm text-clay-forest hover:bg-white/60 transition"
              >
                Login
              </Link>
              <button
                onClick={handleStartLearning}
                className="px-5 py-2.5 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-sm shadow-warm-pill flex items-center gap-1.5 transition"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* 2. Main Hero Content (Headline Left + Floating River Chips Right) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3-line Headline & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-clay-forest leading-[1.08] tracking-tight">
              Learning <br />
              <span className="text-clay-olive">Flows.</span> <br />
              Opportunities <span className="text-clay-olive">Follow.</span>
            </h1>

            <p className="text-base sm:text-lg text-clay-forest/90 font-sans leading-relaxed max-w-lg font-medium">
              Pravaah bridges learning, real skills and real opportunities for a stronger, self-reliant India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleStartLearning}
                className="h-13 px-8 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-extrabold text-base shadow-warm-floating flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                <span>Start Learning</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleLaunchJudgeDemo}
                className="h-13 px-6 rounded-full bg-white/80 hover:bg-white text-clay-forest border border-white/80 font-display font-bold text-base shadow-warm-sm flex items-center gap-2 transition"
              >
                <Play size={16} fill="#34483D" className="text-clay-olive" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right: 4 Floating Glass-Cream Chips along the winding river path */}
          <div className="lg:col-span-6 relative min-h-[380px] hidden sm:flex flex-col justify-between items-end pr-4 select-none">
            
            {/* Chip 1: Learn */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="floating-glass-chip px-5 py-3 flex items-center gap-3 animate-float-slow mr-12"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5ECE6] text-clay-olive flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm text-clay-forest leading-none">Learn</div>
                <div className="text-[11px] font-display text-clay-olive">Skill-based courses</div>
              </div>
            </motion.div>

            {/* Chip 2: Practice */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="floating-glass-chip px-5 py-3 flex items-center gap-3 animate-float-delay-1 mr-32 mt-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5ECE6] text-clay-olive flex items-center justify-center">
                <FileSpreadsheet size={16} />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm text-clay-forest leading-none">Practice</div>
                <div className="text-[11px] font-display text-clay-olive">Hands-on tasks</div>
              </div>
            </motion.div>

            {/* Chip 3: Get Verified */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="floating-glass-chip px-5 py-3 flex items-center gap-3 animate-float-delay-2 mr-16 mt-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5ECE6] text-clay-olive flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm text-clay-forest leading-none">Get Verified</div>
                <div className="text-[11px] font-display text-clay-olive">Earn evidence</div>
              </div>
            </motion.div>

            {/* Chip 4: Find Opportunities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="floating-glass-chip px-5 py-3 flex items-center gap-3 animate-float-delay-3 mr-2 mt-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5ECE6] text-clay-olive flex items-center justify-center">
                <Briefcase size={16} />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm text-clay-forest leading-none">Find Opportunities</div>
                <div className="text-[11px] font-display text-clay-olive">Jobs & growth</div>
              </div>
            </motion.div>

            {/* Handwritten Quote on Bottom Right */}
            <div className="font-handwritten text-2xl sm:text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] pt-6 text-right leading-tight max-w-xs">
              "Your Skills, Your Journey, <br />A Stronger Tomorrow"
            </div>
          </div>
        </div>

        {/* 3. Bottom Feature Strip (Rounded Bar Overlapping the Hero) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-6">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-warm-floating border border-clay-sand/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5ECE6] text-clay-olive flex items-center justify-center shrink-0">
                <Wifi size={22} />
              </div>
              <div>
                <h4 className="font-display font-black text-base text-clay-forest leading-snug">
                  Offline Learning
                </h4>
                <p className="text-xs text-clay-olive font-display mt-0.5">
                  Learn anytime, anywhere
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5ECE6] text-clay-olive flex items-center justify-center shrink-0">
                <Compass size={22} />
              </div>
              <div>
                <h4 className="font-display font-black text-base text-clay-forest leading-snug">
                  AI Guided Path
                </h4>
                <p className="text-xs text-clay-olive font-display mt-0.5">
                  Know what to learn next
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5ECE6] text-clay-olive flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-display font-black text-base text-clay-forest leading-snug">
                  Verified Skills
                </h4>
                <p className="text-xs text-clay-olive font-display mt-0.5">
                  Show real evidence
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EFE6] text-clay-copper flex items-center justify-center shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <h4 className="font-display font-black text-base text-clay-forest leading-snug">
                  Job Opportunities
                </h4>
                <p className="text-xs text-clay-olive font-display mt-0.5">
                  Get matched with relevant roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
