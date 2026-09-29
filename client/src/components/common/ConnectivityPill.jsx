import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffline } from '../../context/OfflineContext';
import { Wifi, WifiOff, RefreshCw, ChevronDown, Sliders, CheckCircle2 } from 'lucide-react';
import { ClayToggle } from '../clay/ClayToggle';

export const ConnectivityPill = () => {
  const { isOnline, syncStatus, pendingCount, runSync, toggleNetworkSimulation } = useOffline();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pillRef = useRef(null);

  // Close popover on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) {
        setIsPopoverOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsPopoverOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={pillRef}>
      {/* Live Tactile Clay Connectivity Pill */}
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        aria-expanded={isPopoverOpen}
        aria-haspopup="dialog"
        aria-label={`Connectivity Status: ${isOnline ? 'Online Synced' : `Offline with ${pendingCount} queued records`}. Click for demo controls`}
        className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full text-xs font-display font-bold tracking-wide transition-all shadow-clay-pill select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-copper ${
          isOnline
            ? syncStatus === 'syncing'
              ? 'bg-[#E2E8E3] text-clay-forest'
              : 'bg-clay-cream hover:bg-white text-clay-forest'
            : 'bg-[#FBE8D3] text-clay-amber'
        }`}
      >
        {isOnline ? (
          syncStatus === 'syncing' ? (
            <>
              <RefreshCw size={13} className="animate-spin text-clay-sage" />
              <span aria-live="polite">Syncing...</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-clay-sage shadow-sm animate-pulse" />
              <span aria-live="polite">Online · Synced</span>
            </>
          )
        ) : (
          <>
            <span className="w-2.5 h-2.5 rounded-full bg-clay-amber animate-ping" />
            <span aria-live="polite">
              Offline {pendingCount > 0 ? `· ${pendingCount} Queued` : '· Local'}
            </span>
          </>
        )}
        <ChevronDown size={12} className={`text-clay-olive transition-transform ${isPopoverOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Demo Controls Popover (Solid Cream, z-50, 24px radius, raised clay shadow) */}
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-0 mt-3 w-80 bg-clay-cream rounded-[24px] shadow-clay-popover p-5 z-50 text-left border-0"
            role="dialog"
            aria-label="Demo controls for internet simulation"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-clay-sand/50">
              <span className="text-xs uppercase font-bold tracking-wider text-clay-forest flex items-center gap-1.5 font-display">
                <Sliders size={14} className="text-clay-copper" /> Demo Controls
              </span>
              <span className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full font-bold font-display ${
                isOnline ? 'bg-[#E2E8E3] text-clay-sage' : 'bg-[#FBE8D3] text-clay-amber'
              }`}>
                {isOnline ? 'Cloud Synced' : 'Edge Local'}
              </span>
            </div>

            <p className="text-xs font-sans text-clay-olive leading-relaxed mb-4">
              Simulate edge disconnection to test Dexie IndexedDB offline caching and zero-drop learning.
            </p>

            {/* Offline Simulator Switch */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  toggleNetworkSimulation();
                  setIsPopoverOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-clay-pill ${
                  isOnline
                    ? 'bg-clay-amber hover:bg-amber-600 text-white'
                    : 'bg-clay-sage hover:bg-emerald-700 text-white'
                }`}
              >
                {isOnline ? (
                  <>
                    <WifiOff size={14} /> Simulate Internet Drop
                  </>
                ) : (
                  <>
                    <Wifi size={14} /> Restore Connection
                  </>
                )}
              </button>

              {/* Force Manual Sync Button */}
              {isOnline && pendingCount > 0 && (
                <button
                  onClick={() => {
                    runSync();
                    setIsPopoverOpen(false);
                  }}
                  className="w-full py-2 px-4 rounded-full text-xs font-bold bg-[#EFE9DC] hover:bg-white text-clay-forest shadow-clay-pill flex items-center justify-center gap-1.5 transition"
                >
                  <RefreshCw size={12} /> Force Sync ({pendingCount} pending)
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
