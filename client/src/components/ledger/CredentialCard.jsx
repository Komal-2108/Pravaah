import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Calendar, ExternalLink, Lock, Sparkles } from 'lucide-react';

export const CredentialCard = ({
  candidateName = 'Ramesh Kumar',
  registrationNumber = 'PRV-TR-2026-0491',
  certificateNumber = 'PRV-2026-7F82A1',
  courseTitle = 'Cooperative Accounting & Daybook Fundamentals',
  issueDate = '28 September 2026',
  trainingCenter = 'Anand Cooperative Skill Development Institute',
  digitalSignatureHash = 'SHA256:7f82a1e944bc30219aa4b7f8092d04323e449a5b4c12',
  skills = ['Accounting & Ledger Balancing', 'Cooperative MIS Operations', 'Member Cashbook Auditing'],
  isInteractive = true
}) => {
  const verifyUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${certificateNumber}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="relative bg-clay-cream p-7 rounded-[32px] shadow-clay-card max-w-md mx-auto select-none border-0 text-left"
    >
      {/* Registry Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-clay-sand/50">
        <div>
          <span className="font-display text-[10px] uppercase font-bold tracking-widest text-clay-olive block">
            National Skill Registry · Verified Tile
          </span>
          <span className="font-mono text-xs font-bold text-clay-forest">
            {certificateNumber}
          </span>
        </div>

        {/* Tactile Verified Pill Badge */}
        <div className="px-3 py-1 rounded-full bg-clay-sage text-white text-xs font-display font-bold flex items-center gap-1.5 shadow-clay-pill shrink-0">
          <ShieldCheck size={14} />
          <span>Verified Seal</span>
        </div>
      </div>

      {/* Main Recipient Details */}
      <div className="space-y-1">
        <span className="text-[11px] font-display font-bold uppercase tracking-wider text-clay-olive">
          Credential Awarded To
        </span>
        <h3 className="font-display font-extrabold text-2xl text-clay-forest leading-tight">
          {candidateName}
        </h3>
        <p className="font-mono text-xs text-clay-olive font-medium">
          Reg: {registrationNumber}
        </p>
      </div>

      {/* Competency Info Box */}
      <div className="my-4 p-4 rounded-2xl bg-[#EFE9DC] shadow-clay-pressed space-y-1.5">
        <div className="text-[10px] font-display uppercase tracking-wider text-clay-olive font-bold">
          Certified Capability
        </div>
        <div className="font-display font-bold text-sm sm:text-base text-clay-forest leading-snug">
          {courseTitle}
        </div>
        <div className="text-xs text-clay-olive flex items-center gap-1.5 font-display font-semibold pt-1">
          <Calendar size={13} className="text-clay-copper" /> Issued: {issueDate}
        </div>
      </div>

      {/* Skills Chip Medals */}
      <div className="space-y-2 mb-4">
        <div className="text-[10px] font-display font-bold uppercase tracking-wider text-clay-olive">
          Demonstrated Capabilities
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 text-xs font-display font-bold bg-white text-clay-forest px-3 py-1 rounded-full shadow-clay-pill"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-clay-sage" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Cryptographic Hash & Verification QR */}
      <div className="pt-3 border-t border-clay-sand/50 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-display font-bold uppercase tracking-wider text-clay-olive flex items-center gap-1">
            <Lock size={12} className="text-clay-sage" /> Tamper-Proof Signature
          </div>
          <div className="font-mono text-[10px] text-clay-olive truncate max-w-[200px] mt-0.5" title={digitalSignatureHash}>
            {digitalSignatureHash}
          </div>
          <a
            href={verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-display font-bold text-clay-copper hover:text-clay-copper-hover mt-1.5"
          >
            <span>Public Registry Check</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="p-2 bg-white rounded-2xl shadow-clay-pill shrink-0">
          <QRCodeSVG
            value={verifyUrl}
            size={52}
            level="M"
          />
        </div>
      </div>
    </motion.div>
  );
};
