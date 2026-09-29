import React, { useState, useEffect } from 'react';
import { useOffline } from '../../context/OfflineContext';
import { localDb } from '../../offline/db';
import { ClayCard } from '../../components/clay/ClayCard';
import { ClayButton } from '../../components/clay/ClayButton';
import { ClayChip } from '../../components/clay/ClayChip';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  Database, 
  Clock, 
  Layers,
  Lock,
  Sparkles
} from 'lucide-react';

export const OfflineSyncManager = () => {
  const { isOnline, syncStatus, pendingCount, runSync, toggleNetworkSimulation } = useOffline();
  const [queuedEvents, setQueuedEvents] = useState([]);
  const [cachedCourses, setCachedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLocalData = async () => {
    try {
      const events = await localDb.sync_queue.toArray();
      const courses = await localDb.offline_courses.toArray();
      setQueuedEvents(events.reverse());
      setCachedCourses(courses);
    } catch (e) {
      console.warn('Dexie inspect error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocalData();
    const interval = setInterval(loadLocalData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClayChip variant="copper" size="sm">
              <Database size={13} /> Dexie IndexedDB Engine
            </ClayChip>
            <span className="text-xs font-display font-bold text-clay-olive">
              Zero-Drop Learning
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-clay-forest mt-1">
            Edge Storage & Offline Queue
          </h1>
          <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold mt-0.5">
            Client-side event queue, cryptographic offline nonce keys, and atomic background sync status.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <ClayButton
            variant={isOnline ? 'sand' : 'copper'}
            size="md"
            onClick={toggleNetworkSimulation}
          >
            {isOnline ? <WifiOff size={15} /> : <Wifi size={15} />}
            <span>{isOnline ? 'Simulate Internet Drop' : 'Restore Connection'}</span>
          </ClayButton>

          <ClayButton
            variant="forest"
            size="md"
            onClick={runSync}
            disabled={!isOnline || syncStatus === 'syncing'}
          >
            <RefreshCw size={15} className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
            <span>{syncStatus === 'syncing' ? 'Syncing...' : 'Sync Pending'}</span>
          </ClayButton>
        </div>
      </div>

      {/* Sync Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ClayCard variant="cream" className="p-5 space-y-1">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-clay-olive">
            Network State
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-clay-sage animate-pulse' : 'bg-clay-amber animate-ping'}`} />
            <span className="font-display font-black text-xl text-clay-forest">
              {isOnline ? 'Online (Cloud Synced)' : 'Offline (Local Edge)'}
            </span>
          </div>
          <p className="text-xs text-clay-olive font-display pt-1">
            {isOnline ? 'Supabase cloud synchronization active.' : 'Transactions safely recorded in IndexedDB.'}
          </p>
        </ClayCard>

        <ClayCard variant="cream" className="p-5 space-y-1">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-clay-olive">
            Queued Local Folios
          </span>
          <div className="font-display font-black text-3xl text-clay-copper mt-1">
            {pendingCount} Records
          </div>
          <p className="text-xs text-clay-olive font-display pt-1">
            {pendingCount > 0 ? 'Will commit atomically upon connection.' : 'All local events synced.'}
          </p>
        </ClayCard>

        <ClayCard variant="cream" className="p-5 space-y-1">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-clay-olive">
            Offline Course Packs
          </span>
          <div className="font-display font-black text-3xl text-clay-forest mt-1">
            {cachedCourses.length} Packs Cached
          </div>
          <p className="text-xs text-clay-sage font-display font-bold pt-1">
            Available 100% offline
          </p>
        </ClayCard>
      </div>

      {/* Queued Events List */}
      <ClayCard variant="cream" className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-clay-sand/50 pb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-clay-forest">
              IndexedDB Transaction Queue
            </h3>
            <p className="text-xs text-clay-olive font-display">
              Uncommitted local activity waiting for network reconciliation
            </p>
          </div>
          <ClayChip variant="sand" size="sm">
            {queuedEvents.length} Items in Queue
          </ClayChip>
        </div>

        {queuedEvents.length === 0 ? (
          <div className="p-8 text-center bg-[#EFE9DC] rounded-2xl shadow-clay-pressed text-clay-olive font-display font-bold text-sm">
            ✓ All local events have been committed and cryptographically sealed on the cloud registry.
          </div>
        ) : (
          <div className="space-y-2.5">
            {queuedEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-white shadow-clay-pill flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FBE8D3] text-clay-copper font-display font-bold text-[10px]">
                      {evt.eventType}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-clay-forest">
                      ID: {evt.id}
                    </span>
                  </div>
                  <div className="text-xs text-clay-olive font-display">
                    Payload: {JSON.stringify(evt.payload || {}).slice(0, 80)}...
                  </div>
                </div>

                <span className="text-[11px] font-mono text-clay-olive shrink-0">
                  {new Date(evt.timestamp || Date.now()).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </ClayCard>
    </div>
  );
};
