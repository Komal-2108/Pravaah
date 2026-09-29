import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Award, 
  ShieldCheck, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Lock, 
  Search,
  Check
} from 'lucide-react';

export const PublicVerifyPage = () => {
  const { certificateId = 'PRV-2026-7F82A1' } = useParams();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('certificates');
  const [searchInput, setSearchInput] = useState(certificateId);
  const [isCopied, setIsCopied] = useState(false);

  const certData = {
    title: 'Basics of Cooperative Accounting',
    certificate_number: 'PRV-2026-7F82A1',
    candidate_name: 'Aditi Sharma',
    issuer: 'Pravaah National Skill Registry',
    issue_date: '12 Oct 2025',
    hash: 'SHA256:7f82a1e944bc30219aa4b7f8092d04323e449a5b4c12',
    skills: ['Accounting & Ledger Balancing', 'Cooperative MIS', 'Member Cashbook Auditing']
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    addToast({
      title: 'Verification Link Copied',
      message: 'Tamper-proof certificate link copied to clipboard.',
      type: 'success'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/verify/${searchInput.trim()}`);
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Header: My Profile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold mt-0.5">
            Verified learning journey and cryptographic credentials.
          </p>
        </div>

        {/* Search Credential Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Certificate ID..."
            className="h-10 px-4 rounded-full bg-white border border-clay-sand/40 text-xs font-display font-bold text-clay-forest focus:outline-none focus:ring-2 focus:ring-clay-olive"
          />
          <button
            type="submit"
            className="h-10 px-5 rounded-full bg-clay-olive text-white font-display font-bold text-xs shadow-warm-pill hover:bg-clay-olive-hover transition"
          >
            Verify
          </button>
        </form>
      </div>

      {/* 2. Profile Card with Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay-sand/40 shadow-warm-card grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 flex items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#F3E7D5] border-2 border-clay-sand flex items-center justify-center font-display font-black text-2xl text-clay-forest shadow-sm shrink-0">
            AS
          </div>
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-clay-forest">
              Aditi Sharma
            </h2>
            <p className="text-xs sm:text-sm font-display font-bold text-clay-olive mt-0.5">
              Learner · Anand Cooperative Skill Development Institute
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-4 flex items-center justify-around md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-clay-sand/30">
          <div className="text-center">
            <div className="font-display font-black text-2xl text-clay-forest">12</div>
            <div className="text-xs text-clay-olive font-display font-bold">Courses</div>
          </div>
          <div className="text-center">
            <div className="font-display font-black text-2xl text-clay-olive">8</div>
            <div className="text-xs text-clay-olive font-display font-bold">Certificates</div>
          </div>
          <div className="text-center">
            <div className="font-display font-black text-2xl text-clay-copper">5</div>
            <div className="text-xs text-clay-olive font-display font-bold">Projects</div>
          </div>
        </div>
      </div>

      {/* 3. Tabs (Profile, Achievements, Certificates, Settings) */}
      <div className="flex items-center gap-2 border-b border-clay-sand/40 pb-2 font-display font-bold text-sm">
        {[
          { id: 'profile', label: 'Profile' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'settings', label: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === tab.id
                ? 'bg-clay-olive text-white shadow-warm-pill font-extrabold'
                : 'text-clay-forest hover:bg-clay-cream'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. My Certificates Section */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-xl text-clay-forest">
          My Certificates
        </h3>

        {/* Certificate Card matching Screen 8 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay-sand/40 shadow-warm-card grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Gold Seal Thumbnail */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-36 h-48 rounded-2xl bg-[#FCFAF5] border-2 border-[#D8C6A5] p-3 flex flex-col items-center justify-between shadow-sm relative">
              <div className="w-full text-center border-b border-[#D8C6A5]/50 pb-1">
                <span className="text-[8px] font-display font-bold uppercase tracking-widest text-clay-olive">
                  Pravaah Certificate
                </span>
              </div>

              {/* Gold Ribbon Medal Icon */}
              <div className="w-14 h-14 rounded-full bg-[#E5B560] text-white flex items-center justify-center shadow-md my-auto">
                <Award size={28} />
              </div>

              <div className="text-[9px] font-mono text-clay-olive text-center">
                PRV-2026-7F82A1
              </div>
            </div>
          </div>

          {/* Center Details */}
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-clay-olive">
              Certificate of Completion
            </span>
            <h4 className="font-display font-black text-2xl text-clay-forest">
              {certData.title}
            </h4>

            <div className="text-xs text-clay-olive font-display flex items-center gap-4 pt-1">
              <span className="font-bold text-clay-forest">Pravaah</span>
              <span>Issued on {certData.issue_date}</span>
            </div>

            {/* Verified Skills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {certData.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-clay-cream text-clay-forest font-display font-bold text-xs"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Cryptographic SHA-256 Hash */}
            <div className="pt-2 font-mono text-[11px] text-clay-olive truncate max-w-md">
              {certData.hash}
            </div>
          </div>

          {/* Right Actions */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-center gap-3 justify-center">
            <button
              onClick={() => {
                addToast({ title: 'Certificate Verified', message: 'Cryptographic proof is 100% valid.', type: 'success' });
              }}
              className="w-full py-2.5 rounded-full bg-[#EEF5F1] text-clay-olive font-display font-bold text-xs shadow-sm hover:bg-[#DCEEE3] transition"
            >
              ✓ View Match Proof
            </button>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-xs shadow-warm-pill transition"
            >
              View Certificate
            </button>

            <button
              onClick={handleShare}
              className="w-full py-2 rounded-full bg-clay-cream hover:bg-white text-clay-forest font-display font-bold text-xs flex items-center justify-center gap-1.5 transition border border-clay-sand/40"
            >
              {isCopied ? <Check size={14} className="text-clay-olive" /> : <Share2 size={14} />}
              <span>{isCopied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
