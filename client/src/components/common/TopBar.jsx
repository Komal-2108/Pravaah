import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ConnectivityPill } from './ConnectivityPill';
import { RoleMenu } from './RoleMenu';
import { CommandMenu } from './CommandMenu';
import { 
  Search, 
  Bell, 
  Flame, 
  Menu, 
  Sparkles 
} from 'lucide-react';

export const TopBar = ({ onOpenMobileSidebar }) => {
  const { user } = useAuth();
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  const getDisplayName = () => {
    if (user?.role === 'admin') return 'Dr. Arvind';
    if (user?.role === 'employer') return 'Vikram';
    return 'Aditi';
  };

  const getDisplayRole = () => {
    if (user?.role === 'admin') return 'Director';
    if (user?.role === 'employer') return 'Recruiter';
    return 'Learner';
  };

  return (
    <>
      <header className="h-18 px-4 sm:px-8 py-3.5 bg-clay-bg border-b border-clay-sand/30 flex items-center justify-between gap-4 sticky top-0 z-30">
        
        {/* Left: Mobile Hamburger + Search Input */}
        <div className="flex items-center gap-3 flex-grow max-w-md">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-clay-cream border border-clay-sand/40 text-clay-forest hover:bg-white transition"
            aria-label="Open Sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Search Box */}
          <div
            onClick={() => setCommandMenuOpen(true)}
            className="w-full h-11 px-4 rounded-full bg-clay-cream border border-clay-sand/40 shadow-sm flex items-center gap-2.5 cursor-pointer hover:bg-white transition select-none text-xs"
          >
            <Search size={16} className="text-clay-forest" />
            <span className="font-display font-medium text-clay-forest truncate">
              Search courses, skills, jobs...
            </span>
          </div>
        </div>

        {/* Right Cluster: Connectivity Pill, Notifications, Role Switcher, Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Connectivity Pill with embedded popover */}
          <ConnectivityPill />

          {/* Notification Bell */}
          <button
            onClick={() => setCommandMenuOpen(true)}
            className="w-10 h-10 rounded-full bg-clay-cream hover:bg-white border border-clay-sand/40 flex items-center justify-center text-clay-forest transition shadow-sm relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="w-2 h-2 rounded-full bg-clay-copper absolute top-2 right-2 ring-2 ring-clay-cream" />
          </button>

          {/* Role Switcher Popover (Solid Cream background, high z-index) */}
          <RoleMenu />

          {/* Learner Avatar Pill */}
          <div className="hidden sm:flex items-center gap-2.5 pl-2">
            <div className="w-10 h-10 rounded-full bg-[#E8DCC4] border border-clay-sand flex items-center justify-center text-clay-forest font-display font-bold text-sm shadow-sm">
              {getDisplayName().slice(0, 2)}
            </div>
            <div className="text-left hidden md:block">
              <div className="font-display font-black text-sm text-clay-forest leading-none">
                Hi, {getDisplayName()}
              </div>
              <div className="text-[11px] font-display font-bold text-clay-forest mt-0.5">
                {getDisplayRole()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cmd+K Palette */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
};
