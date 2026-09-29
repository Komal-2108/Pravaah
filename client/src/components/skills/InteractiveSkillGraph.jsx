import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  BookOpen, 
  X,
  TrendingUp,
  ExternalLink,
  Layers
} from 'lucide-react';

export const InteractiveSkillGraph = ({ nodes = [], onSelectSkill, targetRoleTitle = 'PACS Accountant' }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return {
          bg: 'bg-ledger-verified-light text-ledger-verified',
          border: 'border-ledger-verified',
          ring: 'ring-ledger-verified/20',
          dot: 'bg-ledger-verified',
          badge: 'bg-ledger-verified-light text-ledger-verified border-ledger-verified/30',
          label: 'Verified Competency'
        };
      case 'developing':
        return {
          bg: 'bg-ledger-amber-light text-ledger-amber',
          border: 'border-ledger-amber',
          ring: 'ring-ledger-amber/20',
          dot: 'bg-ledger-amber',
          badge: 'bg-ledger-amber-light text-ledger-amber border-ledger-amber/30',
          label: 'Developing'
        };
      case 'gap':
        return {
          bg: 'bg-ledger-accent-light text-ledger-accent',
          border: 'border-ledger-accent',
          ring: 'ring-ledger-accent/20',
          dot: 'bg-ledger-accent',
          badge: 'bg-ledger-accent-light text-ledger-accent border-ledger-accent/30',
          label: 'Role Gap'
        };
      default:
        return {
          bg: 'bg-ledger-parchment text-ledger-ink',
          border: 'border-ledger-border',
          ring: 'ring-ledger-border',
          dot: 'bg-ledger-ink',
          badge: 'bg-ledger-parchment text-ledger-ink border-ledger-border',
          label: 'Recommended'
        };
    }
  };

  const nodePositions = {
    'skill-001': { x: 50, y: 20, label: 'Accounting & Daybook' },
    'skill-002': { x: 22, y: 50, label: 'Advanced Excel' },
    'skill-003': { x: 78, y: 50, label: 'GST & Taxation' },
    'skill-004': { x: 30, y: 80, label: 'Cooperative MIS' },
    'skill-005': { x: 70, y: 80, label: 'Member Advisory' },
    'skill-006': { x: 50, y: 50, label: 'Dairy Testing' }
  };

  return (
    <div className="bg-ledger-paper rounded-lg p-5 sm:p-6 border border-ledger-border shadow-ledger-card relative overflow-hidden">
      {/* Header & Small-Caps Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-ledger-border-light">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-lg text-ledger-ink">
              Evidence-Based Skill Graph
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-wider bg-ledger-parchment text-ledger-ink px-2 py-0.5 rounded border border-ledger-border font-semibold">
              Live Topology
            </span>
          </div>
          <p className="text-xs text-ledger-ink-muted mt-0.5">
            Click any node to inspect demonstrated capability and evidence confidence.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-ledger-verified">
            <span className="w-2 h-2 rounded-full bg-ledger-verified"></span> Verified
          </span>
          <span className="flex items-center gap-1.5 text-ledger-amber">
            <span className="w-2 h-2 rounded-full bg-ledger-amber"></span> Developing
          </span>
          <span className="flex items-center gap-1.5 text-ledger-accent">
            <span className="w-2 h-2 rounded-full bg-ledger-accent"></span> Role Gap
          </span>
        </div>
      </div>

      {/* SVG Canvas with Hairline Connections */}
      <div className="relative w-full h-[340px] sm:h-[370px] bg-ledger-ivory/60 rounded border border-dashed border-ledger-border p-4 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="50%" y1="20%" x2="22%" y2="50%" stroke="#DDD4C4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50%" y1="20%" x2="78%" y2="50%" stroke="#DDD4C4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="22%" y1="50%" x2="30%" y2="80%" stroke="#DDD4C4" strokeWidth="1" />
          <line x1="78%" y1="50%" x2="70%" y2="80%" stroke="#DDD4C4" strokeWidth="1" />
          <line x1="30%" y1="80%" x2="70%" y2="80%" stroke="#DDD4C4" strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        {/* Render Interactive Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id] || { x: 50, y: 50, label: node.name };
          const colorMeta = getStatusColor(node.status);
          const isSelected = selectedNode?.id === node.id;

          return (
            <motion.button
              key={node.id}
              onClick={() => {
                setSelectedNode(node);
                if (onSelectSkill) onSelectSkill(node);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute flex flex-col items-center group cursor-pointer focus:outline-none z-10"
            >
              {/* Circular Node Bubble */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center bg-ledger-paper shadow-ledger-sm transition-all duration-300 border-2 ${
                  colorMeta.border
                } ${
                  isSelected ? 'ring-2 ring-ledger-ink ring-offset-2 scale-105' : 'hover:ring-2 ' + colorMeta.ring
                }`}
              >
                <span className="font-mono font-bold text-sm text-ledger-ink">
                  {Math.round(node.current_level)}%
                </span>
                <span className="font-mono text-[8px] text-ledger-ink-muted">
                  {node.evidence_confidence}% Conf
                </span>
              </div>

              {/* Node Title Label */}
              <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-ledger-paper text-ledger-ink shadow-sm border border-ledger-border group-hover:border-ledger-ink transition whitespace-nowrap">
                {node.name.split(' ')[0]} {node.name.split(' ')[1] || ''}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 p-4 rounded-lg bg-ledger-parchment/60 border border-ledger-border text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${getStatusColor(selectedNode.status).badge}`}>
                    {getStatusColor(selectedNode.status).label}
                  </span>
                  <span className="font-mono text-[10px] text-ledger-ink-muted">Category: {selectedNode.category}</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-ledger-ink mt-1">
                  {selectedNode.name}
                </h4>
                <p className="text-xs text-ledger-ink-soft mt-0.5">
                  {selectedNode.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="text-ledger-ink-muted hover:text-ledger-ink p-1"
                aria-label="Close details"
              >
                <X size={15} />
              </button>
            </div>

            {/* Twin Metrics: Demonstrated Level vs Evidence Confidence */}
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-ledger-border-light font-mono">
              <div className="bg-ledger-paper p-3 rounded border border-ledger-border">
                <div className="text-[10px] text-ledger-ink-muted uppercase">Demonstrated Level</div>
                <div className="font-serif font-bold text-xl text-ledger-ink mt-0.5">
                  {Math.round(selectedNode.current_level)}%
                </div>
                <div className="w-full bg-ledger-parchment rounded-full h-1 mt-2 overflow-hidden">
                  <div className="bg-ledger-ink h-full rounded-full" style={{ width: `${selectedNode.current_level}%` }}></div>
                </div>
              </div>

              <div className="bg-ledger-paper p-3 rounded border border-ledger-border">
                <div className="text-[10px] text-ledger-verified uppercase flex items-center justify-between">
                  <span>Evidence Confidence</span>
                  <ShieldCheck size={12} />
                </div>
                <div className="font-serif font-bold text-xl text-ledger-verified mt-0.5">
                  {Math.round(selectedNode.evidence_confidence)}%
                </div>
                <div className="w-full bg-ledger-parchment rounded-full h-1 mt-2 overflow-hidden">
                  <div className="bg-ledger-verified h-full rounded-full" style={{ width: `${selectedNode.evidence_confidence}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
