import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IllustrationSlot } from './IllustrationSlot';
import { 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  Award, 
  Briefcase, 
  Users, 
  FileCheck,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const SidebarNav = ({ onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const getNavItems = () => {
    if (user?.role === 'admin') {
      return [
        { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Training Centers', path: '/admin/dashboard', icon: ShieldCheck },
        { label: 'Sync Health', path: '/trainee/sync', icon: Target },
        { label: 'Issued Seals', path: '/verify/PRV-2026-7F82A1', icon: FileCheck }
      ];
    }

    if (user?.role === 'employer') {
      return [
        { label: 'Talent Dashboard', path: '/employer/dashboard', icon: LayoutDashboard },
        { label: 'Candidate Search', path: '/employer/dashboard', icon: Building2 },
        { label: 'Job Postings', path: '/trainee/jobs', icon: Briefcase },
        { label: 'Verify Credentials', path: '/verify/PRV-2026-7F82A1', icon: FileCheck }
      ];
    }

    // Trainee / Default
    return [
      { label: 'Dashboard', path: '/trainee/dashboard', icon: LayoutDashboard },
      { label: 'My Learning', path: '/trainee/learning', icon: BookOpen },
      { label: 'Skill Graph', path: '/trainee/passport', icon: Target },
      { label: 'Assessments', path: '/trainee/assessment', icon: Award },
      { label: 'Opportunities', path: '/trainee/jobs', icon: Briefcase },
      { label: 'Community', path: '/community', icon: Users },
      { label: 'Certificates', path: '/verify/PRV-2026-7F82A1', icon: FileCheck }
    ];
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    if (path === '/community') return location.pathname === '/community';
    if (path === '/trainee/dashboard') return location.pathname === '/trainee/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 h-full bg-clay-cream border-r border-clay-sand/40 flex flex-col justify-between p-5 select-none overflow-y-auto">
      
      {/* Top: Logo + Wordmark */}
      <div className="space-y-7">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2.5 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-olive rounded-full"
        >
          {/* Pravaah Flowing Leaf Logo */}
          <div className="w-9 h-9 rounded-xl bg-clay-olive text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-clay-forest">
            Pravaah
          </span>
        </Link>

        {/* Navigation Items with Olive-Tinted Active Pill */}
        <nav className="space-y-1.5" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-display font-bold text-sm transition-all ${
                  active
                    ? 'bg-clay-olive text-white shadow-warm-pill font-extrabold'
                    : 'text-clay-forest hover:bg-clay-sand/30'
                }`}
              >
                <Icon size={18} className={active ? 'text-white' : 'text-clay-forest'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: "Small Steps, Big Opportunities" Illustration Card */}
      <div className="pt-6">
        <div className="p-4 rounded-3xl bg-white border border-clay-sand/40 shadow-warm-sm flex items-center gap-3">
          <IllustrationSlot name="small-sprout" className="shrink-0" />
          <div className="min-w-0">
            <h4 className="font-display font-black text-xs text-clay-forest leading-tight">
              Small Steps
            </h4>
            <p className="font-display font-black text-xs text-clay-olive leading-tight">
              Big Opportunities
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
