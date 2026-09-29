import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X, Clock, ShieldCheck, Copy, Check } from 'lucide-react';

export const QRGeneratorModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Cooperative Accounting & Field Transaction Ledger Verification');
  const [sessionToken, setSessionToken] = useState('PRV-QR-ANAND-20260929-SESSION-AUTH-TOKEN-A19F');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ledger-ink/70 backdrop-blur-sm animate-in fade-in font-mono text-xs text-center">
      <div className="bg-ledger-paper rounded-lg max-w-md w-full p-6 border border-ledger-border shadow-ledger-elevated relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ledger-ink-muted hover:text-ledger-ink p-1"
        >
          <X size={16} />
        </button>

        <div className="flex items-center justify-center gap-1.5 mb-1">
          <div className="p-1.5 rounded bg-ledger-parchment text-ledger-ink border border-ledger-border">
            <QrCode size={16} />
          </div>
          <h3 className="font-serif font-bold text-lg text-ledger-ink">
            Training Session QR Terminal
          </h3>
        </div>
        <p className="text-[11px] text-ledger-ink-muted mb-4">
          Project this QR on the classroom screen. Trainees scan via their smartphone camera.
        </p>

        {/* QR Display */}
        <div className="bg-white p-4 rounded border border-ledger-border inline-block shadow-sm">
          <QRCodeSVG
            value={sessionToken}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Session Details */}
        <div className="mt-4 p-3 rounded bg-ledger-ivory text-left text-xs border border-ledger-border space-y-1">
          <div className="font-serif font-semibold text-ledger-ink">{topic}</div>
          <div className="flex items-center justify-between text-ledger-ink-muted text-[10px] pt-1">
            <span className="flex items-center gap-1"><Clock size={11} /> Valid for today's batch</span>
            <span className="text-ledger-verified font-semibold flex items-center gap-0.5">
              <ShieldCheck size={11} /> Signed JWT Token
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2 font-mono">
          <button
            onClick={handleCopy}
            className="flex-1 bg-ledger-parchment hover:bg-ledger-parchment-light text-ledger-ink py-2 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-ledger-border transition"
          >
            {copied ? <Check size={13} className="text-ledger-verified" /> : <Copy size={13} />}
            {copied ? 'Copied Token' : 'Copy Session Token'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-ledger-ink hover:bg-ledger-ink-soft text-white py-2 rounded text-[11px] font-bold uppercase tracking-wider transition"
          >
            Close Display
          </button>
        </div>
      </div>
    </div>
  );
};
