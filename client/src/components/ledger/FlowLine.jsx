import React from 'react';
import { useOffline } from '../../context/OfflineContext';

export const FlowLine = ({ className = '', variant = 'vertical', height = 400 }) => {
  const { isOnline, syncStatus } = useOffline();

  const isOffline = !isOnline;
  const isSyncing = syncStatus === 'syncing';

  return (
    <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
      {variant === 'vertical' ? (
        <svg
          width="24"
          height={height}
          viewBox={`0 0 24 ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Background Track Line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2={height}
            stroke="#DDD4C4"
            strokeWidth="1"
          />

          {/* Active Living Ledger Line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2={height}
            stroke={isOffline ? '#B87314' : isSyncing ? '#2F6B4F' : '#14181F'}
            strokeWidth="1.5"
            className={isOffline ? 'flow-line-offline' : isSyncing ? 'flow-line-syncing' : 'flow-line-online'}
          />

          {/* Flow Indicator Beads */}
          <circle cx="12" cy="12" r="3.5" fill="#F6F1E7" stroke={isOffline ? '#B87314' : '#14181F'} strokeWidth="1.5" />
          <circle cx="12" cy={height / 2} r="3.5" fill="#F6F1E7" stroke={isOffline ? '#B87314' : isSyncing ? '#2F6B4F' : '#D9482B'} strokeWidth="1.5" />
          <circle cx="12" cy={height - 12} r="3.5" fill="#F6F1E7" stroke={isOffline ? '#B87314' : '#2F6B4F'} strokeWidth="1.5" />
        </svg>
      ) : (
        <svg
          width="100%"
          height="24"
          viewBox="0 0 600 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="12"
            x2="600"
            y2="12"
            stroke="#DDD4C4"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="12"
            x2="600"
            y2="12"
            stroke={isOffline ? '#B87314' : isSyncing ? '#2F6B4F' : '#14181F'}
            strokeWidth="1.5"
            className={isOffline ? 'flow-line-offline' : isSyncing ? 'flow-line-syncing' : 'flow-line-online'}
          />
        </svg>
      )}
    </div>
  );
};
