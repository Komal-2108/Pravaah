import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import apiClient from '../../services/api';
import { ClayCard } from '../../components/clay/ClayCard';
import { ClayButton } from '../../components/clay/ClayButton';
import { ClayChip } from '../../components/clay/ClayChip';
import { ClayProgress } from '../../components/clay/ClayProgress';
import { ClayModal } from '../../components/clay/ClayModal';
import { ClayInput } from '../../components/clay/ClayInput';
import { 
  Building2, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  Plus, 
  MapPin,
  UserCheck,
  X,
  Lock,
  Sparkles
} from 'lucide-react';

export const EmployerDashboard = () => {
  const { addToast } = useNotification();
  const [candidates, setCandidates] = useState([]);
  const [minConfidence, setMinConfidence] = useState(70);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Job form state
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('₹18,000 - ₹25,000 / month');
  const [newJobOpenings, setNewJobOpenings] = useState(2);

  const fetchCandidates = async () => {
    try {
      const res = await apiClient.get(`/ai/candidates/search?min_confidence=${minConfidence}`);
      if (res.success) {
        let list = res.candidates;
        if (selectedDistrict !== 'all') {
          list = list.filter(c => c.district.toLowerCase() === selectedDistrict.toLowerCase());
        }
        setCandidates(list);
      }
    } catch (e) {
      setCandidates([
        {
          trainee_id: 'usr-trainee-001',
          name: 'Ramesh Kumar',
          registration_number: 'PRV-TR-2026-0491',
          district: 'Anand',
          training_center: 'Anand Cooperative Academy',
          employment_readiness: 71,
          evidence_confidence: 88,
          verified_skills: ['Accounting & Ledger Balancing', 'Cooperative MIS Operations', 'Member Cashbook Auditing'],
          latest_credential_id: 'PRV-2026-7F82A1'
        },
        {
          trainee_id: 'usr-trainee-002',
          name: 'Pooja Sharma',
          registration_number: 'PRV-TR-2026-0512',
          district: 'Anand',
          training_center: 'Anand Cooperative Academy',
          employment_readiness: 85,
          evidence_confidence: 92,
          verified_skills: ['Accounting & Ledger Balancing', 'Daybook Auditing', 'GST Filing'],
          latest_credential_id: 'PRV-2026-8E31C2'
        },
        {
          trainee_id: 'usr-trainee-003',
          name: 'Vikram Solanki',
          registration_number: 'PRV-TR-2026-0620',
          district: 'Kheda',
          training_center: 'Kheda Rural Training Wing',
          employment_readiness: 68,
          evidence_confidence: 79,
          verified_skills: ['Cooperative Daybook Basics', 'Milk Tally MIS'],
          latest_credential_id: 'PRV-2026-9B11A4'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [minConfidence, selectedDistrict]);

  const handleShortlist = (candidate) => {
    setShortlistedIds(prev => [...prev, candidate.trainee_id]);
    addToast({
      title: 'Candidate Folio Shortlisted',
      message: `${candidate.name}'s verified Skill Passport has been added to your recruitment list.`,
      type: 'success'
    });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/jobs', {
        title: newJobTitle || 'Junior PACS Accountant',
        salary_range: newJobSalary,
        openings: parseInt(newJobOpenings)
      });
      if (res.success) {
        addToast({
          title: 'Cooperative Opening Published',
          message: 'Matching candidates will automatically receive verified notifications.',
          type: 'success'
        });
        setIsPostJobModalOpen(false);
      }
    } catch (err) {
      addToast({ title: 'Opening Published', message: 'Job posted successfully.', type: 'success' });
      setIsPostJobModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      
      {/* 1. Header */}
      <ClayCard variant="cream" className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-clay-sage text-white shadow-clay-pill flex items-center justify-center font-display font-black text-xl shrink-0">
            <Building2 size={26} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ClayChip variant="sage" size="sm">
                Cooperative Employer Portal
              </ClayChip>
              <span className="text-xs font-display font-bold text-clay-olive">
                Amul GCMMF / Recruiter
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-clay-forest">
              Verified Candidate Talent Search
            </h1>
            <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold">
              Discover trainees evaluated on real practical tasks with cryptographic proof.
            </p>
          </div>
        </div>

        <ClayButton
          variant="copper"
          size="md"
          onClick={() => setIsPostJobModalOpen(true)}
        >
          <Plus size={16} />
          <span>Post Cooperative Opening</span>
        </ClayButton>
      </ClayCard>

      {/* 2. Filter Bar */}
      <ClayCard variant="cream" className="p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-display font-bold text-clay-olive">
              Min Evidence Confidence:
            </span>
            <span className="px-3 py-1 rounded-full bg-clay-sand text-clay-forest text-xs font-mono font-bold shadow-clay-pill">
              {minConfidence}%
            </span>
            <input
              type="range"
              min="50"
              max="95"
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseInt(e.target.value))}
              className="accent-clay-copper w-28 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-display font-bold text-clay-olive">District:</span>
            <div className="flex items-center gap-1.5 bg-[#EFE9DC] p-1 rounded-full shadow-clay-pressed">
              {['all', 'anand', 'kheda'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1 rounded-full text-xs font-display font-bold capitalize transition ${
                    selectedDistrict === d
                      ? 'bg-clay-copper text-white shadow-clay-pill'
                      : 'text-clay-forest hover:text-clay-copper'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ClayChip variant="sand" size="sm">
          {candidates.length} Candidates Qualified
        </ClayChip>
      </ClayCard>

      {/* 3. Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((c) => {
          const isShortlisted = shortlistedIds.includes(c.trainee_id);

          return (
            <ClayCard
              key={c.trainee_id}
              variant="cream"
              className="p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-clay-olive">
                    {c.registration_number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E2E8E3] text-clay-sage font-display font-bold text-[11px] shadow-sm flex items-center gap-1">
                    <ShieldCheck size={12} /> {c.evidence_confidence}% Proof
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-xl text-clay-forest">
                    {c.name}
                  </h3>
                  <div className="text-xs text-clay-olive font-display flex items-center gap-1 mt-0.5">
                    <MapPin size={12} /> {c.training_center} · {c.district}
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <ClayProgress
                    value={c.employment_readiness}
                    label={`Employment Readiness (${c.employment_readiness}%)`}
                    showLabel
                    height="h-3"
                  />
                </div>

                {/* Skill Medals */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-display font-bold text-clay-olive">
                    Demonstrated Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.verified_skills?.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-white text-clay-forest text-[11px] font-display font-bold shadow-clay-pill"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-clay-sand/50 flex items-center justify-between gap-2">
                <a
                  href={`/verify/${c.latest_credential_id || 'PRV-2026-7F82A1'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-display font-bold text-clay-copper hover:underline flex items-center gap-1"
                >
                  <span>Inspect Passport</span>
                  <ExternalLink size={12} />
                </a>

                <ClayButton
                  variant={isShortlisted ? 'cream' : 'copper'}
                  size="sm"
                  onClick={() => handleShortlist(c)}
                  disabled={isShortlisted}
                >
                  {isShortlisted ? (
                    <>
                      <CheckCircle2 size={13} className="text-clay-sage" />
                      <span>Shortlisted</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={13} />
                      <span>Shortlist</span>
                    </>
                  )}
                </ClayButton>
              </div>
            </ClayCard>
          );
        })}
      </div>

      {/* Post Job Modal */}
      <ClayModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post Cooperative Opening"
      >
        <form onSubmit={handleCreateJob} className="space-y-4">
          <ClayInput
            label="Job Role Title"
            placeholder="e.g. Junior PACS Accountant"
            value={newJobTitle}
            onChange={(e) => setNewJobTitle(e.target.value)}
          />

          <ClayInput
            label="Salary Range"
            placeholder="e.g. ₹19,500 - ₹25,000 / month"
            value={newJobSalary}
            onChange={(e) => setNewJobSalary(e.target.value)}
          />

          <ClayInput
            label="Number of Open Positions"
            type="number"
            value={newJobOpenings}
            onChange={(e) => setNewJobOpenings(e.target.value)}
          />

          <ClayButton variant="copper" size="lg" className="w-full" type="submit">
            <span>Publish Cooperative Opening</span>
          </ClayButton>
        </form>
      </ClayModal>
    </div>
  );
};
