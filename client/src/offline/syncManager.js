import { localDb } from './db.js';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Enqueue an offline event into IndexedDB
 */
export const queueOfflineEvent = async ({ userId, eventType, payload }) => {
  const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const deviceId = localStorage.getItem('pravaah_device_id') || `dev-browser-${Math.random().toString(36).substring(2, 8)}`;
  localStorage.setItem('pravaah_device_id', deviceId);

  const eventRecord = {
    event_id: eventId,
    user_id: userId || 'usr-trainee-001',
    device_id: deviceId,
    event_type: eventType,
    payload: payload,
    created_at: new Date().toISOString(),
    sync_status: 'pending',
    retry_count: 0
  };

  await localDb.sync_queue.put(eventRecord);
  return eventRecord;
};

/**
 * Flush and sync all pending events to the server
 */
export const syncPendingEvents = async (token) => {
  const pending = await localDb.sync_queue.where('sync_status').equals('pending').toArray();
  if (pending.length === 0) {
    return { syncedCount: 0, pendingCount: 0 };
  }

  const deviceId = localStorage.getItem('pravaah_device_id') || 'dev-browser';

  try {
    const response = await axios.post(
      `${API_BASE}/sync`,
      {
        events: pending,
        device_id: deviceId
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      }
    );

    if (response.data.success) {
      // Mark local items as synced
      for (const item of pending) {
        await localDb.sync_queue.update(item.event_id, {
          sync_status: 'synced',
          synced_at: new Date().toISOString()
        });
      }

      return {
        success: true,
        syncedCount: pending.length,
        pendingCount: 0,
        serverSummary: response.data.summary
      };
    }
  } catch (error) {
    console.error('Offline sync failed (will retry when back online):', error.message);
    return {
      success: false,
      syncedCount: 0,
      pendingCount: pending.length,
      error: error.message
    };
  }
};
