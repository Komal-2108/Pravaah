import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { 
  Search, 
  Compass, 
  BookOpen, 
  Target, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Building2, 
  Database, 
  Play, 
  Lock,
  ArrowRight,
  X
} from 'lucide-react';

export const CommandMenu = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user, quickSwitchRole } = useAuth();
  const { startDemo } = useDemo();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { title: 'Overview & Story', desc: 'Tactile ecosystem path & capability pipeline', path: '/', icon: Compass, role: 'all' },
    { title: "Trainee Today's Path", desc: 'Ramesh Kumar · Interactive stepping stone journey', path: '/trainee/dashboard', icon: Award, role: 'trainee' },
    { title: 'Learning Hub', desc: 'Offline-ready bilingual curriculum & packs', path: '/trainee/learning', icon: BookOpen, role: 'trainee' },
    { title: 'Skill Passport', desc: 'Verified 3D tokens & What-If gap simulator', path: '/trainee/passport', icon: Target, role: 'trainee' },
    { title: 'Practical Ledger Tasks', desc: 'Cooperative daybook balancing & vouchers', path: '/trainee/assessment', icon: Award, role: 'trainee' },
    { title: 'Job Opportunities', desc: 'Verified cooperative job matches & clay donut', path: '/trainee/jobs', icon: Briefcase, role: 'trainee' },
    { title: 'Edge Offline Sync', desc: 'Dexie IndexedDB storage ledger & queue', path: '/trainee/sync', icon: Database, role: 'trainee' },
    { title: 'Institute Admin Funnel', desc: 'Dr. Arvind Patel · Training centers & sync metrics', path: '/admin/dashboard', icon: ShieldCheck, role: 'admin' },
    { title: 'Verified Talent Search', desc: 'Amul Recruiter · Candidate filter with proof', path: '/employer/dashboard', icon: Building2, role: 'employer' },
    { title: 'Verify Credential', desc: 'Public SHA-256 registry check & stamp seal', path: '/verify/PRV-2026-7F82A1', icon: Lock, role: 'all' }
  ];

  const filtered = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (cmd) => {
    if (cmd.role !== 'all' && user?.role !== cmd.role) {
      quickSwitchRole(cmd.role);
    }
    navigate(cmd.path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-clay-forest/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="relative bg-clay-cream w-full max-w-lg rounded-[32px] shadow-clay-card overflow-hidden z-10 font-sans border-0"
      >
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-clay-sand/50 bg-[#FAF7F0]">
          <Search size={18} className="text-clay-copper mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search or jump to any page..."
            className="w-full bg-transparent text-clay-forest placeholder:text-clay-olive/60 focus:outline-none font-display font-bold text-sm"
          />
          <kbd className="px-2 py-1 rounded-full bg-clay-sand/40 text-[10px] font-mono text-clay-forest">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-clay-olive font-display text-sm">
              No matching pages or folios found.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.path}
                  onClick={() => handleSelect(cmd)}
                  className="w-full text-left flex items-center justify-between p-3 rounded-2xl hover:bg-[#EFE9DC] hover:shadow-clay-pressed transition group select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white shadow-clay-pill flex items-center justify-center text-clay-forest group-hover:text-clay-copper transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-clay-forest group-hover:text-clay-copper transition-colors">
                        {cmd.title}
                      </div>
                      <div className="text-xs text-clay-olive font-display">{cmd.desc}</div>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-clay-olive opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Quick Action */}
        <div className="p-3.5 border-t border-clay-sand/50 bg-[#FAF7F0] flex items-center justify-between text-xs font-display font-bold text-clay-olive">
          <span>Navigate with <strong>↑</strong> <strong>↓</strong> · <strong>Enter</strong></span>
          <button
            onClick={() => {
              startDemo();
              quickSwitchRole('trainee');
              onClose();
              navigate('/trainee/dashboard');
            }}
            className="text-clay-copper hover:text-clay-copper-hover flex items-center gap-1.5 font-extrabold"
          >
            <Play size={12} fill="currentColor" /> Launch Judge Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
