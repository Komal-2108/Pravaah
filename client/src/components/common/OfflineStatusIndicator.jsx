import React from 'react';
import { useOffline } from '../../context/OfflineContext';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const OfflineStatusIndicator = () => {
  const { isOnline, syncStatus, pendingCount, runSync, toggleNetworkSimulation } = useOffline();

  return (
    <aside aria-label="Network status and offline synchronization" className="w-full bg-pravaah-navy text-white text-xs border-b border-pravaah-navy-light/60 py-1.5 px-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
        {/* Left: Status Indicator */}
        <div className="flex items-center gap-2">
          {syncStatus === 'online' && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pravaah-emerald/20 text-pravaah-emerald border border-pravaah-emerald/30 font-medium">
              <span className="w-2 h-2 rounded-full bg-pravaah-emerald animate-pulse"></span>
              <Wifi size={13} />
              Online (Cloud Synced)
            </span>
          )}

          {syncStatus === 'offline' && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pravaah-coral/20 text-pravaah-coral border border-pravaah-coral/30 font-medium">
              <span className="w-2 h-2 rounded-full bg-pravaah-coral"></span>
              <WifiOff size={13} />
              Offline Mode — Progress saved locally on device (Dexie IndexedDB)
            </span>
          )}

          {syncStatus === 'syncing' && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pravaah-teal/20 text-pravaah-teal-light border border-pravaah-teal/30 font-medium">
              <RefreshCw size={13} className="animate-spin text-pravaah-teal" />
              Syncing {pendingCount} offline change{pendingCount !== 1 ? 's' : ''} to Supabase...
            </span>
          )}

          {syncStatus === 'synced' && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pravaah-emerald/20 text-pravaah-emerald border border-pravaah-emerald/30 font-medium">
              <CheckCircle2 size={13} />
              ✓ All local changes synchronized successfully
            </span>
          )}

          {pendingCount > 0 && syncStatus !== 'syncing' && (
            <span className="hidden sm:inline-block text-amber-300 font-medium bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              {pendingCount} item{pendingCount > 1 ? 's' : ''} queued locally
            </span>
          )}
        </div>

        {/* Right: Judge Simulation Tools */}
        <div className="flex items-center gap-2">
          {pendingCount > 0 && isOnline && (
            <button
              onClick={runSync}
              className="bg-pravaah-teal hover:bg-pravaah-teal-dark text-white px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center gap-1 shadow-sm"
            >
              <RefreshCw size={11} /> Sync Now
            </button>
          )}

          <button
            onClick={toggleNetworkSimulation}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 border ${
              isOnline
                ? 'bg-pravaah-coral/20 hover:bg-pravaah-coral text-pravaah-coral hover:text-white border-pravaah-coral/40'
                : 'bg-pravaah-emerald/20 hover:bg-pravaah-emerald text-pravaah-emerald hover:text-white border-pravaah-emerald/40'
            }`}
            title="Toggle network simulation for live hackathon evaluation"
          >
            {isOnline ? (
              <>
                <WifiOff size={11} /> Simulate Internet Drop
              </>
            ) : (
              <>
                <Wifi size={11} /> Restore Connectivity
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
