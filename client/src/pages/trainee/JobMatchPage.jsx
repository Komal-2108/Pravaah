import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  ShieldCheck,
  Filter,
  ArrowRight
} from 'lucide-react';

export const JobMatchPage = () => {
  const { addToast } = useNotification();
  const [activeTab, setActiveTab] = useState('matches');
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  
  // Filter state
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('fresher');

  const jobs = [
    {
      id: 'job-001',
      title: 'PACS Accountant',
      organization: 'Primary Agricultural Cooperative Society',
      location: 'Anand, Gujarat',
      match: '88%',
      skills: ['Accounting', 'Excel', 'MIS'],
      type: 'Full-Time',
      salary: '₹19,500 - ₹25,000 / mo'
    },
    {
      id: 'job-002',
      title: 'Data Entry Operator',
      organization: 'District Cooperative Office',
      location: 'Vadodara, Gujarat',
      match: '78%',
      skills: ['Data Entry', 'Digital Tools'],
      type: 'Full-Time',
      salary: '₹16,000 - ₹20,000 / mo'
    },
    {
      id: 'job-003',
      title: 'Accounts Assistant',
      organization: 'Amul Dairy Cooperative Society',
      location: 'Moghar, Anand',
      match: '72%',
      skills: ['Accounting', 'Cashbook'],
      type: 'Internship',
      salary: '₹14,000 - ₹18,000 / mo'
    }
  ];

  const handleApply = (job) => {
    setAppliedJobIds(prev => [...prev, job.id]);
    addToast({
      title: 'Application Sealed with Skill Passport',
      message: `Your verified credentials & evidence confidence have been shared with ${job.organization}.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 1. Header */}
      <div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest">
          Opportunities for You
        </h1>
        <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold mt-0.5">
          Based on your skills, interests and location.
        </p>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 border-b border-clay-sand/40 pb-2 font-display font-bold text-sm">
        {[
          { id: 'matches', label: 'Job Matches' },
          { id: 'internships', label: 'Internships' },
          { id: 'field', label: 'Field Opportunities' }
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

      {/* 3. Main Row: Listings Left (8 cols) + Filters Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Job Cards List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {jobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card hover:shadow-warm-card-hover transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl text-clay-forest">
                      {job.title}
                    </h3>
                    <div className="text-xs font-display font-bold text-clay-forest">
                      {job.organization}
                    </div>
                    <div className="text-xs text-clay-olive font-display flex items-center gap-1">
                      <MapPin size={13} /> {job.location} · {job.salary}
                    </div>
                  </div>

                  {/* Green Match Badge */}
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#EEF5F1] text-clay-olive font-display font-black text-xs shadow-sm">
                      {job.match} Match
                    </span>
                    <button className="text-xs font-display font-bold text-clay-olive hover:text-clay-forest flex items-center gap-0.5">
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Skill Chips & 1-Click Passport Apply Button */}
                <div className="pt-3 border-t border-clay-sand/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-clay-cream text-clay-forest text-xs font-display font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleApply(job)}
                    disabled={isApplied}
                    className={`px-6 py-2.5 rounded-full font-display font-bold text-xs shadow-warm-pill flex items-center justify-center gap-2 transition ${
                      isApplied
                        ? 'bg-[#EEF5F1] text-clay-olive cursor-default'
                        : 'bg-clay-olive hover:bg-clay-olive-hover text-white'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={14} /> Applied with Passport
                      </>
                    ) : (
                      <>
                        <Send size={13} /> 1-Click Passport Apply
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Filters Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card space-y-4">
            <h3 className="font-display font-black text-base text-clay-forest border-b border-clay-sand/30 pb-3">
              Filters
            </h3>

            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-display font-bold text-clay-olive">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-11 px-3 rounded-2xl bg-clay-cream border border-clay-sand/40 text-xs font-display font-bold text-clay-forest focus:outline-none focus:ring-2 focus:ring-clay-olive"
              >
                <option value="all">All Locations</option>
                <option value="anand">Anand, Gujarat</option>
                <option value="vadodara">Vadodara, Gujarat</option>
                <option value="kheda">Kheda, Gujarat</option>
              </select>
            </div>

            {/* Job Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-display font-bold text-clay-olive">
                Job Type
              </label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full h-11 px-3 rounded-2xl bg-clay-cream border border-clay-sand/40 text-xs font-display font-bold text-clay-forest focus:outline-none focus:ring-2 focus:ring-clay-olive"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
                <option value="field">Field Apprentice</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-display font-bold text-clay-olive">
                Experience
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full h-11 px-3 rounded-2xl bg-clay-cream border border-clay-sand/40 text-xs font-display font-bold text-clay-forest focus:outline-none focus:ring-2 focus:ring-clay-olive"
              >
                <option value="fresher">Fresher (Skill Certified)</option>
                <option value="1yr">1+ Years Experience</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  addToast({ title: 'Filters Applied', message: 'Job listings updated.', type: 'info' });
                }}
                className="w-full py-3 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-xs shadow-warm-pill transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
