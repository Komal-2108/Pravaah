import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { ConnectivityPill } from './ConnectivityPill';
import { ClayButton } from '../clay/ClayButton';
import { 
  Play, 
  X, 
  Compass, 
  Award, 
  BookOpen, 
  Target, 
  Briefcase, 
  Database, 
  Building2, 
  ShieldCheck, 
  Lock,
  Search
} from 'lucide-react';

export const MobileMenu = ({ isOpen, onClose, onOpenCommandMenu }) => {
  const { user, quickSwitchRole } = useAuth();
  const { startDemo } = useDemo();
  const location = useLocation();

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Overview', path: '/', icon: Compass, role: 'all' },
    { label: 'Dashboard', path: '/trainee/dashboard', icon: Award, role: 'trainee' },
    { label: 'Learning Hub', path: '/trainee/learning', icon: BookOpen, role: 'trainee' },
    { label: 'Skill Passport', path: '/trainee/passport', icon: Target, role: 'trainee' },
    { label: 'Practical Tasks', path: '/trainee/assessment', icon: Award, role: 'trainee' },
    { label: 'Job Matches', path: '/trainee/jobs', icon: Briefcase, role: 'trainee' },
    { label: 'Edge Offline Sync', path: '/trainee/sync', icon: Database, role: 'trainee' },
    { label: 'Institute Admin', path: '/admin/dashboard', icon: ShieldCheck, role: 'admin' },
    { label: 'Employer Portal', path: '/employer/dashboard', icon: Building2, role: 'employer' },
    { label: 'Verify Credential', path: '/verify/PRV-2026-7F82A1', icon: Lock, role: 'all' }
  ].filter(l => l.role === 'all' || l.role === user?.role);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-clay-forest/50 backdrop-blur-sm">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg rounded-[32px] bg-clay-cream p-6 shadow-clay-card z-10 max-h-[85vh] flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-clay-sand/50">
            <span className="font-display font-extrabold text-lg text-clay-forest">
              More Folios & Navigation
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-clay-sand/40 hover:bg-clay-sand text-clay-forest flex items-center justify-center shadow-sm"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Trigger */}
          <div className="my-4">
            <button
              onClick={() => {
                onClose();
                onOpenCommandMenu();
              }}
              className="w-full py-3 px-4 rounded-full bg-[#EFE9DC] shadow-clay-pressed text-clay-olive flex items-center justify-between font-display font-bold text-xs"
            >
              <span className="flex items-center gap-2">
                <Search size={16} className="text-clay-copper" /> Search folios & commands...
              </span>
              <kbd className="px-2 py-0.5 rounded-full bg-white text-[10px] text-clay-forest font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Nav Items Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`p-3.5 rounded-2xl flex flex-col items-start gap-1.5 transition select-none ${
                    active
                      ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper font-extrabold'
                      : 'bg-white/70 hover:bg-white shadow-clay-pill text-clay-forest font-bold'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-clay-copper text-white' : 'bg-clay-sand/40 text-clay-olive'}`}>
                    <Icon size={16} />
                  </div>
                  <span className="font-display text-xs">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-clay-sand/50 space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-clay-olive font-display font-bold">Network State:</span>
              <ConnectivityPill />
            </div>

            <ClayButton
              variant="forest"
              size="lg"
              className="w-full"
              onClick={() => {
                startDemo();
                quickSwitchRole('trainee');
                onClose();
              }}
            >
              <Play size={14} fill="#B68B5E" className="text-clay-copper" />
              <span>Launch Judge Demo (3–5 mins)</span>
            </ClayButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
