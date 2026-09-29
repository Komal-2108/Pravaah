import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemo } from '../../context/DemoContext';
import { 
  BookOpen, 
  Network, 
  Briefcase, 
  User, 
  QrCode, 
  Play, 
  ShieldCheck, 
  LogOut, 
  Layers, 
  CheckCircle,
  Menu,
  X,
  Compass,
  Building2,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, quickSwitchRole } = useAuth();
  const { startDemo, isDemoActive } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      <header className="bg-white border-b border-pravaah-border sticky top-7 z-30 shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pravaah-navy flex items-center justify-center text-white shadow-soft">
                  <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
                    <path d="M20 55 C 35 25, 45 75, 60 45 C 70 25, 80 60, 85 40" stroke="#087F8C" strokeWidth="12" strokeLinecap="round" />
                    <circle cx="20" cy="55" r="7" fill="#087F8C" />
                    <circle cx="60" cy="45" r="7" fill="#1F9D73" />
                    <circle cx="85" cy="40" r="8" fill="#E9795F" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading font-extrabold text-xl tracking-tight text-pravaah-navy">
                    PRAVAAH
                  </span>
                  <span className="hidden sm:inline-block ml-2 text-[11px] font-medium text-pravaah-muted tracking-wide uppercase border-l pl-2 border-gray-300">
                    Learning to Livelihood
                  </span>
                </div>
              </Link>
            </div>

            {/* Role-Specific Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === '/' ? 'text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                }`}
              >
                Overview
              </Link>

              {user?.role === 'trainee' && (
                <>
                  <Link
                    to="/trainee/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/trainee/dashboard') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/trainee/learning"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/trainee/learning') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Learning Hub
                  </Link>
                  <Link
                    to="/trainee/passport"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/trainee/passport') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Skill Passport
                  </Link>
                  <Link
                    to="/trainee/assessment"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/trainee/assessment') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Practical Tasks
                  </Link>
                  <Link
                    to="/trainee/jobs"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/trainee/jobs') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Job Matches
                  </Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/admin/dashboard') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Admin Funnel & Centers
                  </Link>
                </>
              )}

              {user?.role === 'employer' && (
                <>
                  <Link
                    to="/employer/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive('/employer/dashboard') ? 'bg-pravaah-teal-light text-pravaah-teal font-semibold' : 'text-pravaah-navy hover:text-pravaah-teal'
                    }`}
                  >
                    Verified Talent Search
                  </Link>
                </>
              )}

              <Link
                to="/verify/PRV-2026-7F82A1"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive('/verify') ? 'bg-pravaah-emerald-light text-pravaah-emerald font-semibold' : 'text-pravaah-muted hover:text-pravaah-navy'
                }`}
              >
                Verify Credential
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Judge Demo CTA Button */}
              {!isDemoActive && (
                <button
                  onClick={() => {
                    startDemo();
                    navigate('/trainee/dashboard');
                  }}
                  className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-pravaah-coral to-amber-600 hover:opacity-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-soft transition"
                >
                  <Play size={13} fill="currentColor" /> Start Judge Demo
                </button>
              )}

              {/* Quick Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 bg-pravaah-sand/60 hover:bg-pravaah-sand text-pravaah-navy px-3 py-1.5 rounded-lg text-xs font-semibold border border-pravaah-border transition"
                >
                  <span className={`w-2 h-2 rounded-full ${
                    user?.role === 'trainee' ? 'bg-pravaah-teal' : user?.role === 'admin' ? 'bg-purple-600' : 'bg-pravaah-emerald'
                  }`}></span>
                  <span className="capitalize font-heading">{user?.role || 'Switch Role'}</span>
                </button>

                {roleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-elevated border border-pravaah-border p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="text-[10px] uppercase font-bold text-pravaah-muted px-2 py-1 tracking-wider">
                      Switch Active Persona
                    </div>
                    <button
                      onClick={() => {
                        quickSwitchRole('trainee');
                        setRoleMenuOpen(false);
                        navigate('/trainee/dashboard');
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-pravaah-teal-light text-pravaah-navy transition"
                    >
                      <GraduationCap size={15} className="text-pravaah-teal" />
                      <div>
                        <div className="font-semibold">Ramesh Kumar</div>
                        <div className="text-[10px] text-pravaah-muted">Trainee • PACS Accountant</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        quickSwitchRole('admin');
                        setRoleMenuOpen(false);
                        navigate('/admin/dashboard');
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-purple-50 text-pravaah-navy transition"
                    >
                      <ShieldCheck size={15} className="text-purple-600" />
                      <div>
                        <div className="font-semibold">Dr. Arvind Patel</div>
                        <div className="text-[10px] text-pravaah-muted">Admin • Training Director</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        quickSwitchRole('employer');
                        setRoleMenuOpen(false);
                        navigate('/employer/dashboard');
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-emerald-50 text-pravaah-navy transition"
                    >
                      <Building2 size={15} className="text-pravaah-emerald" />
                      <div>
                        <div className="font-semibold">Amul GCMMF Recruiter</div>
                        <div className="text-[10px] text-pravaah-muted">Employer • Dairy Federation</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-pravaah-navy hover:bg-pravaah-sand"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-pravaah-border px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
            >
              Overview
            </Link>
            {user?.role === 'trainee' && (
              <>
                <Link
                  to="/trainee/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
                >
                  Dashboard
                </Link>
                <Link
                  to="/trainee/learning"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
                >
                  Learning Hub
                </Link>
                <Link
                  to="/trainee/passport"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
                >
                  Skill Passport
                </Link>
                <Link
                  to="/trainee/assessment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
                >
                  Practical Tasks
                </Link>
                <Link
                  to="/trainee/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
                >
                  Job Matches
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
              >
                Admin Funnel & Analytics
              </Link>
            )}
            {user?.role === 'employer' && (
              <Link
                to="/employer/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-pravaah-navy hover:bg-pravaah-sand"
              >
                Verified Candidate Search
              </Link>
            )}
            <div className="pt-2 border-t border-pravaah-border">
              <button
                onClick={() => {
                  startDemo();
                  setMobileMenuOpen(false);
                  navigate('/trainee/dashboard');
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-pravaah-coral text-white py-2 rounded-lg text-xs font-bold"
              >
                <Play size={13} fill="currentColor" /> Start Judge Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (for Trainee Smartphone Field Use) */}
      {user?.role === 'trainee' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-pravaah-border px-2 py-1.5 flex justify-around items-center shadow-lg">
          <Link
            to="/trainee/dashboard"
            className={`flex flex-col items-center text-[10px] font-medium py-1 px-2 rounded-lg ${
              isActive('/trainee/dashboard') ? 'text-pravaah-teal font-bold' : 'text-pravaah-muted'
            }`}
          >
            <Compass size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/trainee/learning"
            className={`flex flex-col items-center text-[10px] font-medium py-1 px-2 rounded-lg ${
              isActive('/trainee/learning') ? 'text-pravaah-teal font-bold' : 'text-pravaah-muted'
            }`}
          >
            <BookOpen size={18} />
            <span>Learn</span>
          </Link>
          <Link
            to="/trainee/passport"
            className={`flex flex-col items-center text-[10px] font-medium py-1 px-2 rounded-lg ${
              isActive('/trainee/passport') ? 'text-pravaah-teal font-bold' : 'text-pravaah-muted'
            }`}
          >
            <Network size={18} />
            <span>Skills</span>
          </Link>
          <Link
            to="/trainee/jobs"
            className={`flex flex-col items-center text-[10px] font-medium py-1 px-2 rounded-lg ${
              isActive('/trainee/jobs') ? 'text-pravaah-teal font-bold' : 'text-pravaah-muted'
            }`}
          >
            <Briefcase size={18} />
            <span>Jobs</span>
          </Link>
          <Link
            to="/trainee/sync"
            className={`flex flex-col items-center text-[10px] font-medium py-1 px-2 rounded-lg ${
              isActive('/trainee/sync') ? 'text-pravaah-teal font-bold' : 'text-pravaah-muted'
            }`}
          >
            <Layers size={18} />
            <span>Offline</span>
          </Link>
        </div>
      )}
    </>
  );
};
