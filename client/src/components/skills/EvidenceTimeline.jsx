import React from 'react';
import { 
  CheckCircle2, 
  Award, 
  FileCheck2, 
  BookOpen, 
  ShieldCheck, 
  Calendar,
  Lock
} from 'lucide-react';

export const EvidenceTimeline = ({ timeline = [], skillName = 'Accounting & Ledger Balancing' }) => {
  const getBadgeMeta = (type) => {
    switch (type) {
      case 'course':
        return { label: 'Coursework Completed', icon: <BookOpen size={13} />, color: 'text-ledger-ink bg-ledger-parchment' };
      case 'quiz':
        return { label: 'Automated Quiz Verification', icon: <FileCheck2 size={13} />, color: 'text-blue-800 bg-blue-50' };
      case 'practical':
        return { label: 'Practical Ledger Assessment', icon: <Award size={13} />, color: 'text-purple-800 bg-purple-50' };
      case 'certificate':
        return { label: 'Digitally Signed Certificate', icon: <ShieldCheck size={13} />, color: 'text-ledger-verified bg-ledger-verified-light' };
      default:
        return { label: 'System Verified Evidence', icon: <CheckCircle2 size={13} />, color: 'text-ledger-ink bg-ledger-parchment' };
    }
  };

  return (
    <div className="bg-ledger-paper rounded-lg p-5 sm:p-6 border border-ledger-border shadow-ledger-card text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-ledger-border-light mb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-ledger-ink">
            Verified Evidence Audit Trail
          </h3>
          <p className="text-xs text-ledger-ink-muted">
            Folio chain proving competency in <span className="font-serif italic font-semibold text-ledger-ink">{skillName}</span>
          </p>
        </div>
        <div className="ledger-seal-verified px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
          <Lock size={10} /> Tamper-Proof Audit
        </div>
      </div>

      {/* Vertical Ledger Flow Timeline */}
      <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-ledger-border">
        {timeline.length === 0 ? (
          <div className="font-serif italic text-sm text-ledger-ink-muted py-6 text-center">
            No verified ledger events recorded for this competency yet.
          </div>
        ) : (
          timeline.map((item, idx) => {
            const meta = getBadgeMeta(item.evidence_type);

            return (
              <div key={item.id || idx} className="relative group">
                {/* Timeline Bullet Bead */}
                <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-ledger-paper border border-ledger-ink flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-ledger-accent"></div>
                </div>

                {/* Evidence Card */}
                <div className="bg-ledger-ivory/60 hover:bg-ledger-ivory p-3.5 rounded border border-ledger-border transition">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border border-ledger-border-light ${meta.color}`}>
                        {meta.icon}
                        <span>{meta.label}</span>
                      </span>
                      <h4 className="font-serif font-semibold text-sm text-ledger-ink mt-1.5">
                        {item.title}
                      </h4>
                    </div>

                    {item.score !== undefined && (
                      <span className="font-mono font-bold text-xs text-ledger-verified bg-ledger-paper px-2 py-0.5 rounded border border-ledger-border shadow-sm">
                        {item.score}% Score
                      </span>
                    )}
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-ledger-border-light font-mono text-[10px] text-ledger-ink-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {item.verified_at ? new Date(item.verified_at).toLocaleDateString() : 'Verified'}
                    </span>
                    <span className="text-ledger-ink-soft">
                      Verifier: {item.verifier_type || 'System Engine'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
