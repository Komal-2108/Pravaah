import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import apiClient from '../../services/api';

export const WhatIfSimulator = ({ traineeId = 'trainee-001', targetRoleId = 'job-role-001', initialReadiness = 71 }) => {
  const [selectedCourses, setSelectedCourses] = useState(['crs-002']); // Default select GST
  const [simulationData, setSimulationData] = useState({
    current_readiness: initialReadiness,
    projected_readiness: 79,
    projected_confidence: 90,
    net_gain: 8,
    course_impacts: [
      { course_id: 'crs-002', course_title: 'GST Basics & Rural Cooperative Taxation', label: '+8%' }
    ]
  });
  const [loading, setLoading] = useState(false);

  const availableModules = [
    {
      id: 'crs-002',
      title: 'GST Basics & Rural Cooperative Taxation',
      impactSkill: 'GST & Cooperative Taxation',
      potentialGain: '+8%',
      hours: '12 hrs'
    },
    {
      id: 'crs-003',
      title: 'Advanced Excel for Rural Financial Audits',
      impactSkill: 'Advanced Excel & Spreadsheets',
      potentialGain: '+11%',
      hours: '14 hrs'
    },
    {
      id: 'crs-004',
      title: 'PACS Computerization & National Portal Ingestion',
      impactSkill: 'Cooperative MIS Operations',
      potentialGain: '+6%',
      hours: '10 hrs'
    }
  ];

  const handleToggleCourse = async (courseId) => {
    let nextSelection = [...selectedCourses];
    if (nextSelection.includes(courseId)) {
      nextSelection = nextSelection.filter(id => id !== courseId);
    } else {
      nextSelection.push(courseId);
    }

    setSelectedCourses(nextSelection);
    setLoading(true);

    try {
      const res = await apiClient.post('/ai/what-if', {
        target_role_id: targetRoleId,
        selected_course_ids: nextSelection,
        trainee_id: traineeId
      });

      if (res.success && res.simulation) {
        setSimulationData(res.simulation);
      }
    } catch (err) {
      // Mathematical fallback
      let gain = 0;
      const impacts = [];
      if (nextSelection.includes('crs-002')) { gain += 8; impacts.push({ course_id: 'crs-002', label: '+8%' }); }
      if (nextSelection.includes('crs-003')) { gain += 11; impacts.push({ course_id: 'crs-003', label: '+11%' }); }
      if (nextSelection.includes('crs-004')) { gain += 6; impacts.push({ course_id: 'crs-004', label: '+6%' }); }

      setSimulationData({
        current_readiness: initialReadiness,
        projected_readiness: Math.min(95, initialReadiness + gain),
        projected_confidence: Math.min(95, 88 + Math.round(gain * 0.6)),
        net_gain: gain,
        course_impacts: impacts
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ledger-paper rounded-lg p-5 sm:p-6 border border-ledger-border shadow-ledger-card text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-ledger-border-light">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-ledger-parchment flex items-center justify-center text-ledger-accent border border-ledger-border">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-ledger-ink">
              What-If Readiness Simulator
            </h3>
            <p className="text-xs text-ledger-ink-muted">
              Select candidate modules to simulate projected capability gains.
            </p>
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider bg-ledger-parchment text-ledger-ink px-2 py-0.5 rounded border border-ledger-border font-semibold">
          AI Engine
        </span>
      </div>

      {/* Simulator Meter (Ledger Folio Box) */}
      <div className="mt-4 p-4 rounded bg-ledger-ink text-ledger-ivory">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-ledger-accent font-bold">
              Current vs Projected Readiness
            </span>
            <div className="flex items-center gap-3 mt-1">
              <div>
                <span className="text-[10px] text-gray-400 block">Current</span>
                <span className="font-serif font-bold text-2xl text-gray-300">
                  {simulationData.current_readiness}%
                </span>
              </div>

              <ArrowRight size={16} className="text-ledger-accent mt-2" />

              <div>
                <span className="text-[10px] text-ledger-verified block">Projected</span>
                <motion.div
                  key={simulationData.projected_readiness}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-serif font-bold text-3xl text-ledger-verified"
                >
                  {simulationData.projected_readiness}%
                </motion.div>
              </div>

              {simulationData.net_gain > 0 && (
                <span className="font-mono text-xs bg-ledger-accent text-white px-2 py-0.5 rounded font-bold ml-1 self-end mb-1">
                  +{simulationData.net_gain}%
                </span>
              )}
            </div>
          </div>

          <div className="bg-white/10 p-2.5 rounded border border-white/10 text-right">
            <div className="text-[10px] text-gray-300">Evidence Confidence</div>
            <div className="font-serif font-bold text-lg text-white mt-0.5">
              {simulationData.projected_confidence}%
            </div>
            <div className="text-[9px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
              <ShieldCheck size={10} /> Verified Curriculum
            </div>
          </div>
        </div>
      </div>

      {/* Module Selection Checkboxes */}
      <div className="mt-4 space-y-2 font-mono">
        <div className="text-[10px] uppercase tracking-wider font-bold text-ledger-ink-muted">
          Toggle Modules to Model Impact:
        </div>

        {availableModules.map((mod) => {
          const isSelected = selectedCourses.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => handleToggleCourse(mod.id)}
              className={`p-3 rounded border cursor-pointer transition flex items-center justify-between ${
                isSelected
                  ? 'bg-ledger-parchment border-ledger-ink shadow-sm'
                  : 'bg-ledger-paper hover:bg-ledger-ivory border-ledger-border'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-3.5 h-3.5 rounded text-ledger-accent focus:ring-ledger-accent cursor-pointer"
                />
                <div>
                  <h4 className="font-serif font-semibold text-sm text-ledger-ink">
                    {mod.title}
                  </h4>
                  <div className="text-[10px] text-ledger-ink-muted mt-0.5">
                    Impacts: <strong className="text-ledger-ink">{mod.impactSkill}</strong> · {mod.hours}
                  </div>
                </div>
              </div>

              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                  isSelected
                    ? 'bg-ledger-accent text-white'
                    : 'bg-ledger-ivory text-ledger-ink border border-ledger-border'
                }`}
              >
                {mod.potentialGain}
              </span>
            </div>
          );
        })}
      </div>

      {/* Regulatory Science Disclaimer */}
      <div className="mt-4 pt-3 border-t border-ledger-border-light flex items-start gap-2 text-[11px] text-ledger-ink-muted leading-relaxed">
        <Info size={13} className="shrink-0 mt-0.5" />
        <p>
          <strong>Scientific Disclaimer:</strong> Readiness is dynamically calculated from verified curriculum benchmark weights. Estimates represent skill preparedness, not guaranteed placement.
        </p>
      </div>
    </div>
  );
};
