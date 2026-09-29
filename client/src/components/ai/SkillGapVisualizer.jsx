import React from 'react';
import { Target, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export const SkillGapVisualizer = ({ analysis }) => {
  if (!analysis) return null;

  const { target_role, overall_readiness, overall_evidence_confidence, skill_breakdown, major_gaps } = analysis;

  return (
    <div className="bg-ledger-paper rounded-lg p-5 sm:p-6 border border-ledger-border shadow-ledger-card text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ledger-border-light">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-ledger-parchment flex items-center justify-center text-ledger-ink border border-ledger-border">
            <Target size={16} />
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-ledger-ink-muted">
              Role Benchmark
            </span>
            <h3 className="font-serif font-bold text-lg text-ledger-ink">
              {target_role.title}
            </h3>
          </div>
        </div>

        {/* Dual Scores */}
        <div className="flex items-center gap-3 font-mono">
          <div className="text-right">
            <div className="text-[10px] text-ledger-ink-muted uppercase">Readiness</div>
            <div className="font-serif font-bold text-xl text-ledger-ink">
              {overall_readiness}%
            </div>
          </div>
          <div className="text-right pl-3 border-l border-ledger-border">
            <div className="text-[10px] text-ledger-verified uppercase">Confidence</div>
            <div className="font-serif font-bold text-xl text-ledger-verified">
              {overall_evidence_confidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Major Gaps Warning Box */}
      {major_gaps.length > 0 && (
        <div className="mt-4 p-3 rounded bg-ledger-accent-light border border-ledger-accent/20">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-ledger-accent">
            <AlertTriangle size={13} />
            <span>Critical Curricular Gaps Identified ({major_gaps.length}):</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {major_gaps.map((gap, i) => (
              <span
                key={i}
                className="font-mono text-[10px] bg-ledger-paper text-ledger-accent px-2 py-0.5 rounded border border-ledger-accent/30 font-semibold"
              >
                {gap.skill_name} (-{gap.gap_amount} pts · {gap.weight_percentage}% Weight)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skill Matrix Rows (Ledger Table Style) */}
      <div className="mt-5 space-y-3 font-mono">
        <div className="text-[10px] uppercase tracking-wider font-bold text-ledger-ink-muted">
          Weighted Capability Breakdown:
        </div>

        <div className="space-y-2">
          {skill_breakdown.map((item, idx) => {
            const isMet = item.current_level >= item.required_level;
            const isGap = item.gap_amount > 20;

            return (
              <div key={idx} className="p-3 rounded bg-ledger-ivory/50 border border-ledger-border/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-sm text-ledger-ink">{item.skill_name}</span>
                    <span className="text-[10px] text-ledger-ink-muted bg-ledger-paper px-1.5 py-0.2 rounded border border-ledger-border">
                      {item.weight_percentage}% Wt
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-ledger-ink">{Math.round(item.current_level)}%</span>
                    <span className="text-ledger-ink-muted text-[10px]"> / Req: {item.required_level}%</span>
                  </div>
                </div>

                {/* Hairline Sparkline Gauge */}
                <div className="relative w-full bg-ledger-parchment rounded-full h-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMet ? 'bg-ledger-verified' : isGap ? 'bg-ledger-accent' : 'bg-ledger-amber'
                    }`}
                    style={{ width: `${Math.min(100, item.current_level)}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between mt-1 text-[10px] text-ledger-ink-muted">
                  <span>Confidence: <strong className="text-ledger-ink">{item.evidence_confidence}%</strong></span>
                  <span>
                    {item.gap_amount > 0 ? (
                      <span className="text-ledger-accent font-semibold">Gap: -{item.gap_amount} pts</span>
                    ) : (
                      <span className="text-ledger-verified font-semibold flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Benchmark Met
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
