import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, Check, GraduationCap, ShieldCheck, Building2 } from 'lucide-react';

export const RoleMenu = () => {
  const { user, quickSwitchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close popover on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const roles = [
    {
      id: 'trainee',
      label: 'Trainee',
      name: 'Ramesh Kumar',
      meta: 'PACS Accountant · Anand Center',
      initials: 'RK',
      icon: GraduationCap,
      path: '/trainee/dashboard',
      badgeBg: 'bg-clay-copper text-white'
    },
    {
      id: 'admin',
      label: 'Institute',
      name: 'Dr. Arvind Patel',
      meta: 'Regional Director · Anand Center',
      initials: 'AP',
      icon: ShieldCheck,
      path: '/admin/dashboard',
      badgeBg: 'bg-clay-forest text-clay-cream'
    },
    {
      id: 'employer',
      label: 'Employer',
      name: 'Vikram Mehta',
      meta: 'Recruiter · Amul GCMMF',
      initials: 'VM',
      icon: Building2,
      path: '/employer/dashboard',
      badgeBg: 'bg-clay-sage text-white'
    }
  ];

  const currentRole = roles.find(r => r.id === user?.role) || roles[0];

  const handleSelectRole = (role) => {
    quickSwitchRole(role.id);
    setIsOpen(false);
    navigate(role.path);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current persona: ${currentRole.label}. Click to switch role`}
        className="flex items-center gap-2 h-10 px-3 rounded-full bg-clay-cream hover:bg-white text-clay-forest font-display font-bold text-xs shadow-clay-pill select-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-copper"
      >
        {/* Avatar Initials Badge */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] shadow-sm ${currentRole.badgeBg}`}>
          {currentRole.initials}
        </div>
        <span className="hidden sm:inline-block capitalize">{currentRole.label}</span>
        <ChevronDown size={12} className={`text-clay-olive transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-0 mt-3 w-72 bg-clay-cream rounded-[24px] shadow-clay-popover p-3 z-50 text-left border-0"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-3 py-1.5 text-[10px] font-display uppercase tracking-wider text-clay-olive font-bold border-b border-clay-sand/50 mb-1">
              Switch Evaluator Persona
            </div>

            {roles.map((r) => {
              const isSelected = user?.role === r.id;

              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r)}
                  role="menuitem"
                  className={`w-full text-left flex items-center justify-between p-2.5 rounded-2xl text-xs transition ${
                    isSelected
                      ? 'bg-[#EFE9DC] shadow-clay-pressed font-bold text-clay-forest'
                      : 'hover:bg-clay-sand/40 text-clay-forest'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs shadow-sm ${r.badgeBg}`}>
                      {r.initials}
                    </div>
                    <div>
                      <div className="font-display font-bold text-clay-forest flex items-center gap-1">
                        <span>{r.label}</span>
                        <span className="font-normal text-clay-olive text-[11px]">({r.name.split(' ')[0]})</span>
                      </div>
                      <div className="text-[10px] text-clay-olive">{r.meta}</div>
                    </div>
                  </div>

                  {isSelected && <Check size={16} className="text-clay-copper shrink-0 ml-1" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
