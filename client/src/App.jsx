import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/common/AppShell';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { TraineeDashboard } from './pages/trainee/TraineeDashboard';
import { LearningHub } from './pages/trainee/LearningHub';
import { SkillPassportPage } from './pages/trainee/SkillPassportPage';
import { PracticalAssessmentPage } from './pages/trainee/PracticalAssessmentPage';
import { JobMatchPage } from './pages/trainee/JobMatchPage';
import { OfflineSyncManager } from './pages/trainee/OfflineSyncManager';
import { CommunityPage } from './pages/community/CommunityPage';
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PublicVerifyPage } from './pages/public/PublicVerifyPage';

export const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <LandingPage />;
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Learner Routes */}
        <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
        <Route path="/trainee/learning" element={<LearningHub />} />
        <Route path="/trainee/passport" element={<SkillPassportPage />} />
        <Route path="/trainee/assessment" element={<PracticalAssessmentPage />} />
        <Route path="/trainee/jobs" element={<JobMatchPage />} />
        <Route path="/trainee/sync" element={<OfflineSyncManager />} />

        {/* Community Route */}
        <Route path="/community" element={<CommunityPage />} />

        {/* Employer & Admin Routes */}
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public Verification / Profile Route */}
        <Route path="/verify/:certificateId" element={<PublicVerifyPage />} />
        <Route path="/verify" element={<Navigate to="/verify/PRV-2026-7F82A1" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;
