import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { useOffline } from '../../context/OfflineContext';
import { ConnectivityPill } from './ConnectivityPill';
import { RoleMenu } from './RoleMenu';
import { MobileMenu } from './MobileMenu';
import { CommandMenu } from './CommandMenu';
import { 
  Play, 
  Flame, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Target, 
  Award, 
  Briefcase, 
  MoreHorizontal,
  Lock,
  Search
} from 'lucide-react';

export const Header = () => {
  const { user } = useAuth();
  const { startDemo } = useDemo();
  const { isOnline } = useOffline();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Clean single-line links
  const getNavLinks = () => {
    const base = [
      { label: 'Overview', path: '/', role: 'all' }
    ];

    if (user?.role === 'admin') {
      base.push({ label: 'Dashboard', path: '/admin/dashboard', role: 'admin' });
    } else if (user?.role === 'employer') {
      base.push({ label: 'Dashboard', path: '/employer/dashboard', role: 'employer' });
    } else {
      // Trainee role
      base.push(
        { label: 'Dashboard', path: '/trainee/dashboard', role: 'trainee' },
        { label: 'Learn', path: '/trainee/learning', role: 'trainee' },
        { label: 'Passport', path: '/trainee/passport', role: 'trainee' },
        { label: 'Tasks', path: '/trainee/assessment', role: 'trainee' },
        { label: 'Jobs', path: '/trainee/jobs', role: 'trainee' }
      );
    }

    base.push({ label: 'Verify', path: '/verify/PRV-2026-7F82A1', role: 'all' });
    return base;
  };

  const navLinks = getNavLinks();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 1. Floating Pill Header (72px, 16px margins, raised clay on cream) */}
      <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <div className="max-w-7xl mx-auto h-[72px] rounded-full bg-clay-cream shadow-clay-card px-4 sm:px-6 flex items-center justify-between gap-3 pointer-events-auto transition-all">
          
          {/* Left: Logo Pebble + Wordmark + Tagline */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-copper rounded-full p-1"
              aria-label="PRAVAAH - Return to homepage"
            >
              {/* Soft Clay Pebble Logo */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clay-copper to-[#A5794C] shadow-clay-pill flex items-center justify-center text-white font-display font-black text-lg group-hover:scale-105 transition-transform">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-clay-forest group-hover:text-clay-copper transition-colors leading-none">
                  PRAVAAH
                </span>
                <span className="hidden xl:block text-[10px] font-display font-bold uppercase tracking-widest text-clay-olive leading-tight mt-0.5">
                  Learning to Livelihood
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Single-line Links with Pressed Clay Pill for Active State */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 whitespace-nowrap"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-full font-display text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-copper ${
                    active
                      ? 'text-clay-copper font-extrabold'
                      : 'text-clay-forest font-bold hover:bg-clay-sand/30'
                  }`}
                >
                  {/* Sliding Inset Pressed Clay Indicator */}
                  {active && (
                    <motion.div
                      layoutId="active-clay-nav"
                      className="absolute inset-0 rounded-full bg-[#EFE9DC] shadow-clay-pressed z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Cluster: Connectivity Pill + Role Switcher + Streak/XP + Judge Demo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Connectivity Status Pill */}
            <ConnectivityPill />

            {/* Streak & XP Chip (Tasteful Gamification) */}
            <div 
              onClick={() => setCommandMenuOpen(true)}
              className="hidden md:flex items-center gap-1.5 h-10 px-3.5 rounded-full bg-clay-cream shadow-clay-pill font-display font-bold text-xs text-clay-forest cursor-pointer hover:bg-white transition"
              title="Click to search or open shortcuts"
            >
              <Flame size={15} className="text-clay-copper animate-pulse" />
              <span>5d</span>
              <span className="text-clay-sand font-normal">|</span>
              <Sparkles size={13} className="text-clay-copper" />
              <span className="text-clay-copper font-extrabold">420 XP</span>
            </div>

            {/* Role Dropdown */}
            <RoleMenu />

            {/* Primary Judge Demo Button (SOLID Forest fill, cream text, copper play icon) */}
            <button
              onClick={() => {
                startDemo();
                if (location.pathname === '/') {
                  navigate('/trainee/dashboard');
                }
              }}
              className="clay-button-forest h-10 px-4 rounded-full flex items-center gap-2 text-xs font-display font-bold tracking-wide transition shrink-0 select-none shadow-clay-pill"
              title="Start guided 10-step evaluator tour"
              aria-label="Start Judge Demo"
            >
              <Play size={13} fill="#B68B5E" className="text-clay-copper shrink-0" />
              <span className="hidden sm:inline">Judge Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Below 1024px: Bottom Tab Bar of Clay Icon Buttons */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="max-w-md mx-auto h-16 rounded-full bg-clay-cream shadow-clay-card px-4 flex items-center justify-around">
          <Link
            to="/"
            className={`p-2.5 rounded-full flex flex-col items-center transition ${
              isActive('/') ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper' : 'text-clay-forest'
            }`}
          >
            <Compass size={18} />
          </Link>
          <Link
            to="/trainee/dashboard"
            className={`p-2.5 rounded-full flex flex-col items-center transition ${
              isActive('/trainee/dashboard') ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper' : 'text-clay-forest'
            }`}
          >
            <Award size={18} />
          </Link>
          <Link
            to="/trainee/learning"
            className={`p-2.5 rounded-full flex flex-col items-center transition ${
              isActive('/trainee/learning') ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper' : 'text-clay-forest'
            }`}
          >
            <BookOpen size={18} />
          </Link>
          <Link
            to="/trainee/passport"
            className={`p-2.5 rounded-full flex flex-col items-center transition ${
              isActive('/trainee/passport') ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper' : 'text-clay-forest'
            }`}
          >
            <Target size={18} />
          </Link>
          <Link
            to="/trainee/jobs"
            className={`p-2.5 rounded-full flex flex-col items-center transition ${
              isActive('/trainee/jobs') ? 'bg-[#EFE9DC] shadow-clay-pressed text-clay-copper' : 'text-clay-forest'
            }`}
          >
            <Briefcase size={18} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-full text-clay-forest hover:bg-clay-sand/40"
            aria-label="More navigation options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Mobile "More" Sheet Modal */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenCommandMenu={() => {
          setMobileMenuOpen(false);
          setCommandMenuOpen(true);
        }}
      />

      {/* Global Cmd+K Command Palette */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
};
