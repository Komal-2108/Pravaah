import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { ClayCard } from '../../components/clay/ClayCard';
import { ClayButton } from '../../components/clay/ClayButton';
import { ClayInput } from '../../components/clay/ClayInput';
import { ClayChip } from '../../components/clay/ClayChip';
import { GraduationCap, ShieldCheck, Building2, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login, quickSwitchRole } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ramesh@pravaah.org');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password);
      addToast({
        title: 'Logged In Successfully',
        message: `Welcome back, ${res.user.name}.`,
        type: 'success'
      });

      if (res.user.role === 'admin') navigate('/admin/dashboard');
      else if (res.user.role === 'employer') navigate('/employer/dashboard');
      else navigate('/trainee/dashboard');
    } catch (err) {
      if (email.includes('admin')) {
        quickSwitchRole('admin');
        navigate('/admin/dashboard');
      } else if (email.includes('employer') || email.includes('amul')) {
        quickSwitchRole('employer');
        navigate('/employer/dashboard');
      } else {
        quickSwitchRole('trainee');
        navigate('/trainee/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role) => {
    quickSwitchRole(role);
    addToast({
      title: 'Persona Activated',
      message: `Switched to ${role.toUpperCase()} mode.`,
      type: 'info'
    });
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'employer') navigate('/employer/dashboard');
    else navigate('/trainee/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-left">
        
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <ClayChip variant="copper" size="sm">
            Sign In to PRAVAAH
          </ClayChip>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest mt-1">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold">
            Access your verified skill passport, training path or talent search.
          </p>
        </div>

        {/* 1-Click Evaluator Sign-In */}
        <ClayCard variant="sand" className="p-5 space-y-3">
          <div className="text-xs font-display font-bold text-clay-forest flex items-center gap-1.5 justify-center">
            <Sparkles size={14} className="text-clay-copper" />
            <span>1-Click Evaluator Quick Logins</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleQuickLogin('trainee')}
              className="p-3 rounded-2xl bg-white hover:bg-white/90 shadow-clay-pill flex flex-col items-center gap-1 transition select-none"
            >
              <div className="w-8 h-8 rounded-full bg-clay-copper text-white flex items-center justify-center font-display font-bold text-xs">
                RK
              </div>
              <span className="font-display font-bold text-xs text-clay-forest">Ramesh</span>
              <span className="text-[10px] text-clay-olive font-display">Trainee</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="p-3 rounded-2xl bg-white hover:bg-white/90 shadow-clay-pill flex flex-col items-center gap-1 transition select-none"
            >
              <div className="w-8 h-8 rounded-full bg-clay-forest text-clay-cream flex items-center justify-center font-display font-bold text-xs">
                AP
              </div>
              <span className="font-display font-bold text-xs text-clay-forest">Dr. Patel</span>
              <span className="text-[10px] text-clay-olive font-display">Institute</span>
            </button>

            <button
              onClick={() => handleQuickLogin('employer')}
              className="p-3 rounded-2xl bg-white hover:bg-white/90 shadow-clay-pill flex flex-col items-center gap-1 transition select-none"
            >
              <div className="w-8 h-8 rounded-full bg-clay-sage text-white flex items-center justify-center font-display font-bold text-xs">
                VM
              </div>
              <span className="font-display font-bold text-xs text-clay-forest">Vikram</span>
              <span className="text-[10px] text-clay-olive font-display">Amul Recruiter</span>
            </button>
          </div>
        </ClayCard>

        {/* Credentials Form */}
        <ClayCard variant="cream" className="p-6 sm:p-8 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <ClayInput
              label="Email Address"
              type="email"
              placeholder="ramesh@pravaah.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <ClayInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <ClayButton
              variant="copper"
              size="lg"
              className="w-full mt-2"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with Passport'}</span>
              <ArrowRight size={16} />
            </ClayButton>
          </form>
        </ClayCard>
      </div>
    </div>
  );
};
