import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useOffline } from '../../context/OfflineContext';
import { useNotification } from '../../context/NotificationContext';
import { queueOfflineEvent } from '../../offline/syncManager';
import apiClient from '../../services/api';
import { QrCode, CheckCircle2, AlertCircle, X, Camera, ShieldCheck, WifiOff } from 'lucide-react';

export const QRScannerModal = ({ isOpen, onClose, onAttendanceMarked }) => {
  const { isOnline, refreshPendingCount } = useOffline();
  const { addToast } = useNotification();
  const [isScanning, setIsScanning] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const simulateQRScan = async (sampleToken = 'PRV-QR-ANAND-20260929-SESSION-AUTH-TOKEN-A19F') => {
    setIsScanning(true);
    setErrorMsg(null);

    await new Promise(r => setTimeout(r, 600));

    if (!isOnline) {
      try {
        const queuedEvent = await queueOfflineEvent({
          userId: 'usr-trainee-001',
          eventType: 'attendance_mark',
          payload: {
            qr_token: sampleToken,
            marked_at: new Date().toISOString()
          }
        });
        await refreshPendingCount();

        const offlineFeedback = {
          message: '✓ Attendance Saved Offline in Dexie',
          topic: 'Cooperative Auditing & Field Transaction Ledger Verification',
          marked_at: new Date().toLocaleTimeString(),
          is_offline: true
        };

        setSuccessResult(offlineFeedback);
        addToast({
          title: 'Attendance Saved on Device (Offline)',
          message: 'Recorded locally in Dexie IndexedDB. Will sync automatically once internet returns.',
          type: 'warning'
        });
        if (onAttendanceMarked) onAttendanceMarked(offlineFeedback);
      } catch (e) {
        setErrorMsg('Failed to queue attendance event locally: ' + e.message);
      } finally {
        setIsScanning(false);
      }
      return;
    }

    try {
      const res = await apiClient.post('/attendance/mark', {
        qr_token: sampleToken,
        device_id: localStorage.getItem('pravaah_device_id') || 'dev-redmi-note-12-ramesh'
      });

      if (res.success) {
        setSuccessResult({
          message: res.message,
          topic: res.session_topic,
          marked_at: new Date(res.attendance.marked_at).toLocaleTimeString(),
          is_offline: false
        });
        addToast({
          title: '✓ Attendance Verified',
          message: 'Live session attendance confirmed on cloud database.',
          type: 'success'
        });
        if (onAttendanceMarked) onAttendanceMarked(res.attendance);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Attendance verification failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ledger-ink/70 backdrop-blur-sm animate-in fade-in font-mono text-xs text-left">
      <div className="bg-ledger-paper rounded-lg max-w-md w-full p-6 border border-ledger-border shadow-ledger-elevated relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ledger-ink-muted hover:text-ledger-ink p-1"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded bg-ledger-parchment text-ledger-ink border border-ledger-border">
            <QrCode size={18} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-ledger-ink">
              Mark Session Attendance
            </h3>
            <p className="text-[11px] text-ledger-ink-muted">
              Point camera at today's training academy session QR.
            </p>
          </div>
        </div>

        {!successResult ? (
          <div className="space-y-4">
            <div className="w-full h-52 bg-ledger-ink rounded flex flex-col items-center justify-center text-ledger-ivory relative overflow-hidden border border-dashed border-ledger-border">
              <div className="w-36 h-36 border border-ledger-accent rounded relative flex items-center justify-center">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-ledger-accent animate-pulse"></div>
                <Camera size={32} className="text-gray-500" />
              </div>
              <span className="text-[10px] text-gray-300 mt-2 font-mono">
                {isOnline ? 'Active Optical QR Scanner' : 'Offline Edge QR Scanner (IndexedDB Ready)'}
              </span>
            </div>

            {/* Simulated Action */}
            <div className="bg-ledger-ivory p-3.5 rounded border border-ledger-border text-center">
              <span className="text-[11px] font-bold text-ledger-ink block mb-1">
                Field Simulator Trigger
              </span>
              <p className="text-[10px] text-ledger-ink-muted mb-2">
                Simulate optical scan of Anand Center session token:
              </p>
              <button
                onClick={() => simulateQRScan()}
                disabled={isScanning}
                className="w-full bg-ledger-ink hover:bg-ledger-ink-soft text-white py-2 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <QrCode size={13} />
                {isScanning ? 'Verifying QR Token...' : 'Scan Anand Center Session QR'}
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-ledger-accent-light border border-ledger-accent/30 text-ledger-accent text-xs flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-3 font-mono">
            <div className="w-10 h-10 rounded-full bg-ledger-verified-light text-ledger-verified flex items-center justify-center mx-auto border border-ledger-verified/30">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-serif font-bold text-xl text-ledger-ink">
              {successResult.message}
            </h4>
            <div className="bg-ledger-ivory p-3 rounded text-xs text-left border border-ledger-border space-y-1">
              <div>
                <span className="text-ledger-ink-muted">Session: </span>
                <strong className="text-ledger-ink">{successResult.topic}</strong>
              </div>
              <div>
                <span className="text-ledger-ink-muted">Time: </span>
                <strong className="text-ledger-ink">{successResult.marked_at}</strong>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-ledger-verified">
                <ShieldCheck size={11} /> Cryptographic Attendance Sealed
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-ledger-ink text-white py-2 rounded font-bold uppercase tracking-wider transition hover:bg-ledger-ink-soft"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
