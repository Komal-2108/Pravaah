import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  BookOpen, 
  FileSpreadsheet, 
  ShieldCheck, 
  Briefcase, 
  Check, 
  Plus, 
  Lock, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { ClayCard } from '../clay/ClayCard';
import { ClayButton } from '../clay/ClayButton';
import { ClayProgress } from '../clay/ClayProgress';
import { ClayDonut } from '../clay/ClayDonut';

// Typewriter hash animation
const TypewriterHash = ({ hash, isVisible }) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setLength(0);
    const interval = setInterval(() => {
      setLength(prev => {
        if (prev < hash.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isVisible, hash]);

  return (
    <div className="font-mono text-[11px] text-clay-forest bg-[#EFE9DC] p-3 rounded-2xl shadow-clay-pressed break-all leading-relaxed">
      <span className="text-clay-copper font-bold">SHA256:</span>{' '}
      <span>{hash.slice(0, length)}</span>
      {length < hash.length && (
        <span className="inline-block w-1.5 h-3.5 bg-clay-copper ml-0.5 animate-pulse align-middle" />
      )}
    </div>
  );
};

export const PipelineStory = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 28,
    restDelta: 0.001
  });

  // Stage 2: Ledger Rows
  const [activeLedgerRows, setActiveLedgerRows] = useState([
    { id: 1, desc: 'Member KCC Loan Repay', debit: '—', credit: '₹12,500' },
    { id: 2, desc: 'IFFCO Fertilizer Stock', debit: '₹18,400', credit: '—' }
  ]);

  const addLedgerRow = () => {
    if (activeLedgerRows.length < 4) {
      setActiveLedgerRows(prev => [
        ...prev,
        { id: prev.length + 1, desc: 'SHG Weekly Deposit', debit: '—', credit: '₹4,500' }
      ]);
    } else {
      setActiveLedgerRows([
        { id: 1, desc: 'Member KCC Loan Repay', debit: '—', credit: '₹12,500' },
        { id: 2, desc: 'IFFCO Fertilizer Stock', debit: '₹18,400', credit: '—' }
      ]);
    }
  };

  // Stage 4: What-If GST Hover
  const [isGstHovered, setIsGstHovered] = useState(false);

  // In-view refs
  const stage3Ref = useRef(null);
  const isStage3InView = useInView(stage3Ref, { once: false, amount: 0.3 });

  const stages = [
    {
      step: '01',
      title: 'Train on Edge Devices',
      subtitle: 'Offline Curriculum Continuity',
      description: 'Coursework, interactive modules and field lectures are completely downloadable to smartphones. Training never pauses when rural connectivity drops.',
      tag: 'Bilingual Packs · Dexie Cache',
      preview: (
        <div className="space-y-3.5 text-left font-sans">
          <div className="flex items-center justify-between border-b border-clay-sand/50 pb-2.5">
            <span className="font-display font-bold text-xs text-clay-olive">CRS-ACC-101</span>
            <span className="px-3 py-1 rounded-full bg-clay-sage text-white text-xs font-display font-bold shadow-clay-pill flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Offline Ready
            </span>
          </div>
          <div>
            <div className="font-display font-bold text-clay-forest text-base sm:text-lg">
              Cooperative Accounting Fundamentals
            </div>
            <p className="text-xs text-clay-olive font-display mt-0.5">
              Modules 1–4 cached locally. Offline video packs in Hindi & Gujarati.
            </p>
          </div>
          
          <ClayProgress value={85} label="4 / 5 Modules Completed" showLabel />

          <div className="flex items-center justify-between text-xs font-display font-bold text-clay-olive pt-1">
            <span>Cache Size: 14.2 MB</span>
            <span className="text-clay-sage">Zero Cloud Dependency</span>
          </div>
        </div>
      )
    },
    {
      step: '02',
      title: 'Practice with Real Ledger Tasks',
      subtitle: 'Hands-On Double-Entry Accounting',
      description: 'Trainees balance daily member daybooks, milk procurement tallies and PACS fertilizer vouchers. Evaluated on Accuracy, Completeness and Time.',
      tag: 'Double Entry · Dynamic Scoring',
      preview: (
        <div className="space-y-3 text-left font-sans">
          <div className="flex items-center justify-between border-b border-clay-sand/50 pb-2.5">
            <span className="font-display font-bold text-xs text-clay-olive">Folio #Daybook-28</span>
            <button
              onClick={addLedgerRow}
              className="text-xs font-display font-bold text-white bg-clay-copper px-3 py-1 rounded-full shadow-clay-pill hover:bg-clay-copper-hover transition flex items-center gap-1"
            >
              <Plus size={12} /> {activeLedgerRows.length < 4 ? 'Add Transaction' : 'Reset'}
            </button>
          </div>

          <div className="space-y-2">
            {activeLedgerRows.map(row => (
              <div key={row.id} className="flex items-center justify-between py-2 px-3 rounded-2xl bg-[#EFE9DC] shadow-clay-pressed text-xs font-display">
                <span className="text-clay-forest font-bold">{row.desc}</span>
                <span className={row.credit !== '—' ? 'text-clay-sage font-extrabold' : 'text-clay-copper font-extrabold'}>
                  {row.credit !== '—' ? row.credit : row.debit}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-display font-bold">
            <span className="text-clay-sage flex items-center gap-1.5">
              <CheckCircle2 size={15} /> 100% Balanced Daybook
            </span>
            <span className="text-clay-olive">Score: <strong className="text-clay-forest text-sm">96/100</strong></span>
          </div>
        </div>
      )
    },
    {
      step: '03',
      title: 'Cryptographic Verification',
      subtitle: 'Tamper-Proof Proof Chain',
      description: 'Every completed assessment, quiz score and attendance session generates an immutable verification seal stored on cloud PostgreSQL.',
      tag: 'SHA-256 Signature · QR Seal',
      preview: (
        <div ref={stage3Ref} className="space-y-3 text-left font-sans">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-clay-sage text-white text-xs font-display font-bold shadow-clay-pill">
              PRV-2026-7F82A1 · VERIFIED
            </span>
            <span className="text-xs font-display font-bold text-clay-olive flex items-center gap-1">
              <Lock size={13} className="text-clay-sage" /> Immutable
            </span>
          </div>

          <TypewriterHash 
            hash="7f82a1e944bc30219aa4b7f8092d04323e449a5b4c12ef093a21" 
            isVisible={isStage3InView} 
          />

          <div className="flex items-center justify-between text-xs text-clay-olive font-display font-semibold pt-1">
            <span>Issuer: <strong className="text-clay-forest">Anand Training Academy</strong></span>
            <span className="text-clay-sage font-bold">Signed & Timestamped</span>
          </div>
        </div>
      )
    },
    {
      step: '04',
      title: 'Evidence-Based Skill Graph',
      subtitle: 'Dynamic Capability Intelligence',
      description: 'Skills are mapped in real-time. Demonstrated capability is explicitly separated from evidence confidence, allowing trainees to run What-If simulations.',
      tag: 'Weighted Scoring · What-If Simulator',
      preview: (
        <div className="space-y-3.5 text-left font-sans">
          <div className="flex items-center justify-between text-xs font-display font-bold">
            <span className="text-clay-olive">Target: <strong className="text-clay-forest">PACS Accountant</strong></span>
            <span className="text-sm font-extrabold text-clay-forest transition-all">
              {isGstHovered ? (
                <span className="text-clay-sage animate-pulse">79% Readiness</span>
              ) : (
                <span>71% Readiness</span>
              )}
            </span>
          </div>

          {/* Dynamic Animated Clay Progress Tube */}
          <ClayProgress 
            value={isGstHovered ? 79 : 71} 
            height="h-5"
          />

          <div className="grid grid-cols-2 gap-2 font-display text-xs">
            <div className="p-2.5 bg-[#E2E8E3] text-clay-forest rounded-2xl shadow-clay-pill text-center font-bold">
              Accounting (88%)
            </div>
            <div className="p-2.5 bg-[#FBE8D3] text-clay-amber rounded-2xl shadow-clay-pill text-center font-bold">
              GST Return (52%)
            </div>
          </div>

          {/* Hover Trigger for What-If simulation */}
          <div 
            onMouseEnter={() => setIsGstHovered(true)}
            onMouseLeave={() => setIsGstHovered(false)}
            className="p-3 rounded-2xl bg-[#EFE9DC] shadow-clay-pressed cursor-pointer hover:bg-white transition flex items-center justify-between text-xs font-display font-bold select-none"
          >
            <span className="text-clay-copper flex items-center gap-1.5 font-extrabold">
              <Sparkles size={14} /> + GST Course
            </span>
            <span className="text-clay-olive">
              {isGstHovered ? (
                <strong className="text-clay-sage">Previewing +8% gap boost</strong>
              ) : (
                'Hover to preview gap fill'
              )}
            </span>
          </div>
        </div>
      )
    },
    {
      step: '05',
      title: 'Connected Livelihood',
      subtitle: 'Verified Talent Matching',
      description: 'Employers like Amul and District Cooperative Banks discover candidates with verified capability proof, cutting out interview fraud and guesswork.',
      tag: 'Zero Friction Hiring · Cooperative Direct',
      preview: (
        <div className="space-y-3.5 text-left font-sans">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-extrabold text-clay-forest text-base sm:text-lg">
                Junior PACS Accountant
              </div>
              <div className="text-xs text-clay-olive font-display font-bold">
                Kashi PACS Union · Anand District
              </div>
            </div>
            <ClayDonut percentage={89} size={64} strokeWidth={8} />
          </div>

          <div className="p-3 rounded-2xl bg-[#EFE9DC] shadow-clay-pressed text-xs font-display font-bold space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-clay-olive">Monthly Stipend / Pay:</span>
              <span className="text-clay-forest">₹19,500 – ₹25,000</span>
            </div>
            <div className="flex items-center justify-between text-clay-sage text-[11px]">
              <span>Verified Proof Attached</span>
              <span>1-Click Apply Ready</span>
            </div>
          </div>

          <ClayButton variant="copper" className="w-full" size="md">
            <Briefcase size={14} />
            <span>1-Click Passport Apply</span>
          </ClayButton>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative py-6 sm:py-8">
      
      {/* Chunky Winding Path of Clay Stepping Stones */}
      <div className="absolute top-8 bottom-8 left-6 lg:left-1/2 -translate-x-1/2 w-8 flex justify-center pointer-events-none z-0">
        {/* Sand track tube */}
        <div className="w-3 h-full rounded-full bg-clay-sand shadow-clay-pressed opacity-70" />
        
        {/* Foreground Sage Fill Line */}
        <motion.div 
          className="absolute top-0 w-3 bg-clay-sage origin-top rounded-full shadow-clay-pill"
          style={{ 
            height: '100%',
            scaleY: smoothProgress 
          }}
        />
      </div>

      {/* Stepping Stone Nodes */}
      <div className="space-y-12 sm:space-y-16">
        {stages.map((stage, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-14 pl-14 lg:pl-0 ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Narrative (Always Left-Aligned) */}
              <div className={`w-full lg:w-1/2 text-left ${isEven ? 'lg:pr-14' : 'lg:pl-14'}`}>
                <div className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-clay-copper mb-1.5">
                  <span>Stage {stage.step}</span>
                  <span className="text-clay-sand font-black">·</span>
                  <span className="text-clay-olive">{stage.tag}</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-clay-forest leading-tight">
                  {stage.title}
                </h3>

                <div className="font-display font-bold text-sm sm:text-base text-clay-olive mt-1">
                  {stage.subtitle}
                </div>

                <p className="text-sm text-clay-forest mt-3 leading-relaxed max-w-[52ch] text-left">
                  {stage.description}
                </p>
              </div>

              {/* Numbered Stepping Stone Pebble */}
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 lg:top-auto w-12 h-12 rounded-full bg-clay-cream shadow-clay-pill flex items-center justify-center font-display font-extrabold text-sm text-clay-forest z-10 hover:scale-110 transition-transform">
                {stage.step}
              </div>

              {/* Raised Clay Preview Card */}
              <div className={`w-full lg:w-1/2 text-left ${isEven ? 'lg:pl-14' : 'lg:pr-14'}`}>
                <ClayCard variant="cream" className="max-w-lg">
                  {stage.preview}
                </ClayCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
