import React, { createContext, useContext, useState, useEffect } from 'react';
import { localDb } from '../offline/db';
import { syncPendingEvents } from '../offline/syncManager';

const OfflineContext = createContext(null);

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState(navigator.onLine ? 'online' : 'offline');
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Monitor Dexie pending queue count
  const refreshPendingCount = async () => {
    try {
      const count = await localDb.sync_queue.where('sync_status').equals('pending').count();
      setPendingCount(count);
    } catch (e) {
      console.warn('Dexie count error:', e);
    }
  };

  useEffect(() => {
    refreshPendingCount();
    const interval = setInterval(refreshPendingCount, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handle hardware online/offline events
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      setSyncStatus('online');
      await runSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const runSync = async () => {
    const token = localStorage.getItem('pravaah_token');
    setSyncStatus('syncing');

    try {
      const res = await syncPendingEvents(token);
      if (res && res.syncedCount > 0) {
        setSyncStatus('synced');
        setLastSyncTime(new Date());
        await refreshPendingCount();
        setTimeout(() => {
          setSyncStatus('online');
        }, 4000);
      } else {
        setSyncStatus('online');
      }
    } catch (err) {
      setSyncStatus('offline');
    }
  };

  // Toggle for Judge / Evaluator to simulate poor field connectivity
  const toggleNetworkSimulation = async () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (!nextState) {
      setSyncStatus('offline');
    } else {
      setSyncStatus('syncing');
      await runSync();
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        syncStatus,
        pendingCount,
        lastSyncTime,
        runSync,
        toggleNetworkSimulation,
        refreshPendingCount
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
